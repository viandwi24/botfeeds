import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize";
import { ApiResponse } from '@/utils/api';
import { sequelize, Bot, Trigger, Feed, FeedHistory, FeedItem, TriggerHistory } from '@/lib/db';
import { TriggerRuntime, type TriggerConfig } from "@/foundations/trigger-runtime";

import FeedsRoutes from "@/handlers/http/feeds"
import TriggersRoutes from "@/handlers/http/triggers"
import BotsRoutes from "@/handlers/http/bots"
import { extractContentFromHtml, extractContentFromURL } from "@/utils/content";
import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { UpdateConnectionState } from "telegram/network";
import { EventBuilder, EventCommon, type DefaultEventInterface } from "telegram/events/common";
import type { EntityLike } from "telegram/define";
import bigInt from "big-integer";
import { TwitterApi } from "twitter-api-v2";
import { createProxyMiddleware } from "http-proxy-middleware";
import request from 'request'


// RUNTIME
export class FeedRuntime {
  options = {
    itemProcessWaitInterval: 1000,
    itemsProcessParallel: 5
  }
  runnedIds: number[] = []

  constructor(
    public engine: ServerEngine
  ) {
  }

  async run(feedHistory: FeedHistory) {
    // running
    if (this.runnedIds.includes(feedHistory.id)) throw new Error('already running')
    this.runnedIds.push(feedHistory.id)

    // 
    const feed = await Feed.findOne({
      where: {
        id: feedHistory.feedId
      },
      include: [Trigger]
    })
    if (!feed) throw new Error('feed not found')

    try {
      // config
      const items = feedHistory.rssParsedRaw.items || []
      const itemsMax = feed.config.maxItemGet || 0
      const forceSameItem = feed.config.forceSameItem || false

      // prepared
      if (itemsMax > 0) items.splice(itemsMax, items.length - itemsMax)
      console.log(`[FEED] [RUN] ${items.length} items`)

      const itemsProcess = items.map((item, index) => {
        return async () => {
          const logs: string[] = []
          const procLog = async (message: string, ...args: any[]) => {
            const log = `[FEED] [RUN] [ITEM] ${index}/${items.length} - ${message}`
            console.log(log, ...args)
            logs.push(`${log} ${args.join(' ')}`)
            await feedHistory.update({
              logs: (await feedHistory.reload()).logs + `${log} ${args.join(' ')}` + '\n'
            })
          }

          const url = item.link || ''
          procLog(`url: ${url}`)
          if (!url) return procLog(`failed: url not found`)


          // duplicate check
          const existingItem = await FeedItem.findOne({
            where: {
              url
            }
          })
          if (existingItem) {
            if (!forceSameItem) {
              return procLog(`failed: item already exist`)
            } else {
              procLog(`duplicate item, but forceSameItem is true, so continue`)
            }
          }


          // extract content
          const content = await extractContentFromURL(url, {
            timeout: 1000 * 30,
            maxTry: 5,
          })
          if (!content) return procLog(`failed: content not found`)

          // check if content is empty
          const isValidContent = (art?: string|undefined) => {
            return (!art || art.length === 0 || typeof art !== 'string' || art === '')
          }
          if (isValidContent(content.article?.content)) {
            procLog(`failed: content is empty, so use from rss item`)
            if (isValidContent(item.contentSnippet)) {
              if (content['article']) content['article']['content'] = item.contentSnippet
              else content['article'] = { content: item.contentSnippet } as any
            } else {
              const parsed = await extractContentFromHtml(item.content || '')
              if (content['article']) content['article']['content'] = parsed.article?.content
              else content['article'] = { content: parsed.article?.content, ...parsed.article } as any
            }
          }

          // add to feeds items
          procLog(`${content.article?.title}`)
          const feedItem = await FeedItem.create({
            feedHistoryId: feedHistory.id,
            url,
            rssItem: item as any,
            byline: content.article?.byline,
            content: content.article?.content,
            dir: content.article?.dir,
            excerpt: content.article?.excerpt,
            lang: content.article?.lang,
            contentLength: content.article?.length,
            siteName: content.article?.siteName,
            textContent: content.article?.textContent || '',
            title: content.article?.title,
          })

          // run trigger
          for (const trigger of ((feed as any)?.Triggers as Trigger[])) {
            // create trigger item
            const triggerItem = await TriggerHistory.create({
              feedHistoryId: feedHistory.id,
              status: 'pending',
              triggerId: trigger.id,
              feedItemId: feedItem.id,
              logs: ''
            })

            const logs: string[] = []
            const triggerLog = async (message: string, ...args: any[]) => {
              const log = `[TRIGGER] ${trigger.name} for ${feedItem.id} - ${message}`
              console.log(log, ...args)
              logs.push(`${log} ${args.join(' ')}`)
              await triggerItem.update({
                logs: (await triggerItem.reload()).logs + `${log} ${args.join(' ')}` + '\n'
              })
            }

            await triggerLog(`[TRIGGER] ${trigger.name} for ${feedItem.id}`)
          
            const runtime = new TriggerRuntime(trigger.config, [
              ['ContentRaw', 'string', feedItem.content],
              ['ContentText', 'string', feedItem.textContent],
              ['ContentUrl', 'string', feedItem.url],
              ['ContentByline', 'string', feedItem.byline],
              ['ContentDir', 'string', feedItem.dir],
              ['ContentExcerpt', 'string', feedItem.excerpt],
              ['ContentLang', 'string', feedItem.lang],
              ['ContentLength', 'number', feedItem.contentLength],
              ['ContentSiteName', 'string', feedItem.siteName],
              ['ContentTitle', 'string', feedItem.title],
            ], this.engine)

            await triggerLog(`[TRIGGER] ${trigger.name} for ${feedItem.id} - running`)
            runtime.run()
          }
        }
      })

      // run parallel depending on config
      const itemsProcessParallel = this.options.itemsProcessParallel
      const itemsProcessWaitInterval = this.options.itemProcessWaitInterval
      let itemsProcessed = 0
      for (let i = 0; i < itemsProcess.length; i += itemsProcessParallel) {
        const itemsProcessParallelChunk = itemsProcess.slice(i, i + itemsProcessParallel)
        await Promise.all(itemsProcessParallelChunk.map(async (itemProcess) => {
          try {
            // process
            await itemProcess()
          } catch (error) {
            console.log(error)
          }
        }))
        itemsProcessed += itemsProcessParallelChunk.length
        await feedHistory.update({
          itemsProcessed
        })
        // waiting
        await new Promise((resolve) => setTimeout(resolve, itemsProcessWaitInterval));
      }

      // set success
      await feedHistory.update({
        status: 'success'
      })
    } catch (error) {
      console.log(error)
      // set fail
      await feedHistory.update({
        status: 'failed'
      })
    }

    // done
    this.runnedIds.splice(this.runnedIds.indexOf(feedHistory.id), 1)
    console.log(`[FEED] [RUN] run done`)
  }
}



// TELEGRAM SERVICES
interface EventCommonInterface {
  chatPeer?: EntityLike;
  msgId?: number;
  broadcast?: boolean;
}

export class Event extends EventCommon {
  constructor(args: EventCommonInterface) {
    super(args)
    // console.log('aaweawe Event', args)
  }
}

export class EventHandler extends EventBuilder {
  constructor(args: DefaultEventInterface) {
    super(args)
    // console.log('aaweawe EventHandler', args)
  }
}

export class BotTelegramNode {
  logs: string[] = []
  tg?: TelegramClient
  tg_state: number = 0

  constructor(public bot: Bot) {}

  getStatus() {
    if (!this.tg) return 'stopped'
    if (this.tg && this.tg.connected) return 'connected'
    if (this.tg && !this.tg.connected) return 'started'
    return 'disconnected'
  }

  async stop() {
    if (this.tg) {
      try {
        console.log('Disconnecting telegram client...')
        await this.tg.disconnect()
        console.log('Telegram client disconnected')
      } catch (error) {}
      try {
        await this.tg.destroy()
        console.log('Telegram client destroyed')
      } catch (error) {}
      this.tg = undefined as any
    }

    console.log('Node stopped')
  }

  async start() {
    const status = this.getStatus()
    if (status === 'connected') return console.log('Node already started and telegram client connected')
    if (status === 'started') return console.log('Node already started')

    // security
    if (this.tg) {
      console.log('Destroying old telegram client...')
      try {
        await this.stop()
      } catch (error) {}
    }

    try {
      console.log(`Starting node... (${this.bot.name} - ${this.bot.id})`)
      const stringSession = new StringSession(this?.bot?.config?.telegram?.session || "");
      
      const api_id = this.bot.config.telegram?.apiId || 0
      const api_hash = this.bot.config.telegram?.apiHash || ""
      console.log('api_id', api_id, 'api_hash', api_hash)

      const tg = new TelegramClient(
        stringSession,
        api_id,
        api_hash,
        {
          connectionRetries: 5,
        }
      )
      this.tg = tg

      // add handler
      this.tg.addEventHandler(
        (event: Event) => {
          if (event instanceof UpdateConnectionState) {
            // this.eventTriggerUpdateState(event.state)
          } else {
            // log.info('Event', event)
          }
        },
        new EventHandler({}),
      )

      // start
      await this.tg.start({
        botAuthToken: this?.bot?.config?.telegram?.botApiToken || "",
      })

      // save session
      await this.bot.update({
        config: {
          telegram: {
            ...this.bot.config.telegram,
            session: stringSession.save(),
          }
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  async restart() {
    await this.stop()
    await this.start()
  }


  // actions
  async botSendMessage(
    content: string,
    to: EntityLike = (new Api.PeerChannel({ channelId: bigInt("1979978607") }))
  ) {
    // get info str
    let to_str = ''
    if (to instanceof Api.PeerChannel) {
      to_str = `channel ${to.channelId}`
    } else if (to instanceof Api.PeerUser) {
      to_str = `user ${to.userId}`
    } else if (to instanceof Api.PeerChat) {
      to_str = `chat ${to.chatId}`
    } else {
      to_str = `unknown`
    }

    if (!this.tg) throw new Error(`Send message to ${to_str} failed, telegram client disconnected`)


    // split message
    const maxCharPerMessage = 4096
    const messages_splitted: string[] = []
    let message = ""
    let message_length = 0
    for (let i = 0; i < content.length; i++) {
      message += content[i]
      message_length += 1

      if (message_length >= maxCharPerMessage) {
        messages_splitted.push(message)
        message = ""
        message_length = 0
      }
    }
    if (message_length > 0) {
      messages_splitted.push(message)
    }

    // sending
    console.log(`Sending message to ${to_str}... splitted into ${messages_splitted.length} messages`)
    for (let i = 0; i < messages_splitted.length; i++) {
      console.log(`message: ${messages_splitted[i]}`)
      await this.tg?.sendMessage(
        to,
        {
          message: messages_splitted[i],
        }
      )
    }
    console.log(`Message sent to ${to_str}`)
  }
}

export class BotTelegramManager {
  nodes: BotTelegramNode[] = []

  constructor(public service: ServiceBotTelegram) {
  }

  get(bot: Bot) {
    const existingNode = this.nodes.find((node) => node.bot.id === bot.id)
    return existingNode
  }

  async run(bot: Bot) {
    console.log(`[BOT] [TELEGRAM] [RUN] ${bot.name}`)

    if (bot.service !== 'telegram') throw new Error('invalid service')

    // check if already running
    const existingNode = this.nodes.find((node) => node.bot.id === bot.id)
    if (existingNode) {
      await existingNode.start()
    } else {
      // create node
      const node = new BotTelegramNode(bot)
      this.nodes.push(node)
      await node.start()
    }
  }
}

export class ServiceBotTelegram {  
  manager: BotTelegramManager

  constructor(public engine: ServerEngine) {
    this.manager = new BotTelegramManager(this)
  }

  async onInit() {
    // run bot on database
    const bots = await Bot.findAll({
      where: {
        service: 'telegram'
      }
    })
    for (const bot of bots) {
      this.manager.run(bot)
    }
  }


}


// TWITTER SERVICES
export class BotTwitterNode {
  twitterApi!: TwitterApi

  constructor(public bot: Bot) {}

  getStatus() {
    if (!this.twitterApi) return 'disconnected'
    return 'connected'
  }

  async stop() {
    if (this.getStatus() === 'disconnected') return
    this.twitterApi = undefined as any
  }

  async start () {
    const { bot } = this

    if (this.getStatus() === 'connected') return
    const userClient = new TwitterApi({
      appKey: bot.config.twitter?.apiKey || '',
      appSecret: bot.config.twitter?.apiSecret || '',
      accessToken: bot.config.twitter?.accessToken || '',
      accessSecret: bot.config.twitter?.accessTokenSecret || '',
    })
    this.twitterApi = userClient

    try {
      // const rwUserClient = userClient.readWrite
      // const result = await rwUserClient.v2.tweet({
      //   text: 'My tweet text with two images!',
      // });
    } catch (error) {
      // return ApiResponse.Custom(res, 500, false, "❌", error)
    }
  }

  async restart() {
    await this.stop()
    await this.start()
  }

  async botSendTweet(content: string) {
    const { bot } = this

    if (this.getStatus() === 'disconnected') throw new Error('disconnected')

    try {
      const rwUserClient = this.twitterApi.readWrite
      console.log(`[BOT] [TWITTER] [SEND] sending tweet for ${bot.name}`)


      // split message limit per tweet
      const maxCharPerMessage = 280
      const messages_splitted: string[] = []
      const interval = 1000
      let message = ""
      let message_length = 0
      for (let i = 0; i < content.length; i++) {
        message += content[i]
        message_length += 1

        if (message_length >= maxCharPerMessage) {
          messages_splitted.push(message)
          message = ""
          message_length = 0
        }
      }
      if (message_length > 0) {
        messages_splitted.push(message)
      }

      let previousTweetId = null;
      let i = 0
      for (const message of messages_splitted) {
        i += 1
        console.log(`[BOT] [TWITTER] [SEND] sending tweet for ${bot.name}... ${i}/${messages_splitted.length}`)
        const data: any = {
          text: message,
        }
        if (previousTweetId) {
          data['reply'] = {
            in_reply_to_tweet_id: previousTweetId
          }
        }
        const resTweet = await rwUserClient.v2.tweet(data);
        previousTweetId = resTweet.data.id
        await Bun.sleep(interval)
      }
    } catch (error) {
      throw error
    }
  }
}
export class BotTwitterManager {
  nodes: BotTwitterNode[] = []

  constructor(public service: ServiceBotTwitter) {
  }

  get(bot: Bot) {
    const existingNode = this.nodes.find((node) => node.bot.id === bot.id)
    return existingNode
  }

  run(bot: Bot) {
    console.log(`[BOT] [TWITTER] [RUN] ${bot.name}`)

    if (bot.service !== 'twitter') throw new Error('invalid service')

    // check if already running
    const existingNode = this.nodes.find((node) => node.bot.id === bot.id)
    if (existingNode) {
      existingNode.start()
    } else {
      // create node
      const node = new BotTwitterNode(bot)
      this.nodes.push(node)
      node.start()
    }
  }
}
export class ServiceBotTwitter {
  manager: BotTwitterManager

  constructor(public engine: ServerEngine) {
    this.manager = new BotTwitterManager(this)
  }

  async onInit() {
    console.log(`[BOT] [TWITTER] [INIT]`)

    // run bot on database
    const bots = await Bot.findAll({
      where: {
        service: 'twitter'
      }
    })
    for (const bot of bots) {
      this.manager.run(bot)
    }
  }
}

export function getBotFromService(item: Bot, se: ServerEngine) {
  if (item.service === 'telegram') {
    return {
      status: se.services.telegram.manager.nodes.find((node) => node.bot.id === item.id)?.getStatus() || 'unknown',
    }
  } else if (item.service === 'twitter') {
    return {
      status: se.services.twitter.manager.nodes.find((node) => node.bot.id === item.id)?.getStatus() || 'unknown',
    }
  } else {
    throw new Error('invalid service')
  }
}

// 
export class ServerEngine {
  options = {
    serverPort: 51143,
    guiPort: 3000
  }
  server!: express.Express;
  sequelize!: Sequelize;


  // context
  feedRuntime: FeedRuntime
  services: {
    telegram: ServiceBotTelegram
    twitter: ServiceBotTwitter
  }
  

  constructor(
    props: {
      sequelize: Sequelize,
      options: {
        serverPort: number
        guiPort: number
      }
    }
  ) {
    this.sequelize = props.sequelize;
    this.options = props.options

    this.feedRuntime = new FeedRuntime(this)
    this.services = {
      telegram: new ServiceBotTelegram(this),
      twitter: new ServiceBotTwitter(this),
    }
  }

  async init() {
    // connect
    await sequelize.authenticate({})
    console.log(`[SERVER] [DB] Connected to database`);

    this.setupDB();
    this.setupServer();
    
    // loop
    for (const service of Object.values(this.services)) {
      service.onInit()
    }
  }

  async setupDB() {
    return
    // db reset
    await sequelize.sync({ force: true })
    const bottelegram1 = await Bot.create({
      name: 'test bot telegram 1',
      service: 'telegram',
      config: {
        telegram: {
          apiId: 14918673,
          apiHash: "74108560b2db6266c7faed0080d94e1f",
          session: "1BQANOTEuMTA4LjU2LjE2OQG7dt2ta+2PE+AgG4HtWKWuSVlsNo4EEpjaduHA6ciAYiAJbsmm4wsfzm6hNPurNL70Tbn6DTnbw6Bod7InwcV9okyO9bi4H8vIGQQ2pc70+L5XMWhPvbMaXUhTn4D2h\/TzzoTNBt40FA5LNtQtoIv9ivv7kwNnWEbk9nvuTLN7M3brp7KkcBvUsFxOY\/xsChbTjha3+Tb6mCHvNqd1AgYIlrUedK8t9EJv1wHiJBdUGAzobKvKNoMkk6dOJYDWsDaQ3bIabF0LEUOV62+HPCCGDfehMYGoAKUw5ucV3rGBrKF4PEhiTOLTdHlPobSv33ASZCNG2w5mGz\/wlCqFKZ9ovw==",
          botApiToken: "6074173327:AAEDCoMa9V2yNwcW5_kqS0gYsSecD3EDxPY"
        }
      }
    })
    const bottelegram2 = await Bot.create({
      name: 'test bot telegram 2',
      service: 'telegram',
      config: {
        telegram: {
          apiId: 14918673,
          apiHash: "74108560b2db6266c7faed0080d94e1f",
          session: "1BQANOTEuMTA4LjU2LjE2OQG7R8IYO6Vg+c6bq42bvzEUODP5XtTYpvzgaiVpRGOH\/yqr4s5ph73rV2Xhe5VRz3aZzdJsyoObQ7cGoGy5I4l+gv9eNi8WSf+RtOLpHMoGMi6S76n6zsE54yx4QcA4Sir6bZHb6Sth2cv\/XtS5hYoZ8WdTtCs1PbFy5MsW7A9jBOMNPUmjmcG6nppiGaJNnpj5dOP3S9U5jMDiRG54GiTWdoCzUyPx53GZ1eebAQyo4QWkhL97Hia9JvITFOMEVMZYWgynWZsp7fAMdPA7mQwIcRSGpvtY6kW0UMF4RQFyC1e5PrRA3W7LJxZkYLSfB8nNcUB9+9PddMUN8wZZ\/EADMg==",
          botApiToken: "6912828793:AAGdP71mrIqDy4YvB2ZOoWE8kRk0M8FkkdU"
        }
      }
    })
    const bottweet1 = await Bot.create({
      name: 'test bot tweet 1',
      service: 'twitter',
      config: {
        twitter: {
          // appKey: bot.config.twitter?.apiKey || '',
          // appSecret: bot.config.twitter?.apiSecret || '',
          // accessToken: bot.config.twitter?.accessToken || '',
          // accessSecret: bot.config.twitter?.accessTokenSecret || '',
          accessToken: "1096252307753189376-iM45v9WbzmauLG34X78zLHqTh0Q3Bo",
          accessTokenSecret: "txukxyG7pDJu9MVBPPeWH7Zbx6MJC56ox036JnHBVZ0VX",
          apiKey: "FMNpMiL9kjuBZxgTmtw8ZhlyT",
          apiSecret: "Y5QYDAVZwD1GkPj2ZAseIbkRFvIVPV9Hcpwp06jY9xouaK9v9u",
          
          bearerToken: "AAAAAAAAAAAAAAAAAAAAAK4wjAEAAAAA%2F7ggacK8fc4o%2BDjBdogBGE30Lc8%3DfUBY0fiabrx2SXZF4Ay499mI8szLJPHCYFhwgi3MIq5wGEsZCg",
          clientId: "WllUbm5JZnB5N0IyREhPbXJzYng6MTpjaQ",
          clientSecret: "EZaKSPrSJLsNQwqqgOTbexGN5FuvCtOwiYA8TX-KLzHEDCn8hD",
        }
      }
    }, { returning: true })
    // await Bot.create({ name: 'test bot tweet 2', service: 'twitter', config: {} })

    const config: TriggerConfig = {
      pipes: [
        { name: 'chatgpt.commander', option: { input: 'ContentText', prompt: 'summarize this:\n```{{ContentText}}```', output: ['ContentTextSummarized', 'string'] } },
        { name: 'filter.simple', option: { input: 'ContentTextSummarized', blacklistWords: ['ngentod'], output: ['ContentTextFiltered', 'string'] } },
        { name: 'filter.simple', option: { input: 'ContentTitle', blacklistWords: ['ngentod'], output: ['ContentTitleFiltered', 'string'] } },
        // 1979978607
        {
          name: 'output',
          option: {
            bots: [
              { id: 1, content: 'Title:\n-{{ContentTitle}}\n-{{ContentTitleFiltered}}\n\n\n\nContent:\n-{{ContentTextSummarized}}\n\n\n-{{ContentTextFiltered}}', telegram: { chatIds: ['4118146535'] } },
              // { id: 2, content: '{{ContentTextFiltered}}', telegram: { chatIds: [1979978607] } },
              // { id: 3, content: '{{ContentTextFiltered}}' },
            ]
          }
        }
      ]
    }
    const bottrigger1 = await Trigger.create({
      name: 'Group Trigger 1 (Telegram 1, Telegram 2, Twitter 1)',
      config
    })
    // bottrigger1.addBot([bottelegram1, bottelegram2, bottweet1])
    // const bottrigger2 = await Trigger.create({
    //   name: 'test trigger to telegram',
    //   config
    // })
    const botfeed1 = await Feed.create({
      name: 'test feed from thewest',
      url: 'https://thewest.com.au/rss',
      config: {
        maxItemGet: 1,
        forceSameItem: true,
      }
    })
    botfeed1.addTrigger([bottrigger1])
    // const botfeed2 = await Feed.create({
    //   name: 'test feed from thewest 2',
    //   url: 'https://thewest.com.au/rss',
    //   config: {
    //     maxItemGet: 1
    //   }
    // })
    // botfeed2.addTrigger([bottrigger1, bottrigger2])
  }

  setupServer() {
    const server = express();
    const app = express.Router();
    // server:middlewares
    // cors
    var allowedOrigins = ['http://localhost:3000', 'http://localhost:7152'];
    app.use(cors({
      origin: '*'
    }))
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    app.use(bodyParser.json())
    
    
    // server:routes
    
    app.get("/", (req, res) => ApiResponse.Custom(res, 200, true, "🚀"));
    FeedsRoutes(app, this)
    TriggersRoutes(app, this)
    BotsRoutes(app, this)

    server.use('/webui', createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {
        '^/webui': '/webui'
      },
    }))
    
    server.get("/test", async (req, res) => {
      // const trigger =  await Trigger.findAll()
      // const runtime = new TriggerRuntime(trigger[0].config, [
      //   ['ContentTexta', 'string', "ASLINYA"],
      // ], this)
      // const result = await runtime.run()
      // return ApiResponse.Custom(res, 200, true, "🚀", result.preparedPipes)

      const bot = await Bot.findOne({
        where: {
          id: 3
        }
      })
      if (!bot) return ApiResponse.Custom(res, 404, false, "❌", "bot not found")
      // const userClient = new TwitterApi(bot.config?.twitter?.bearerToken || '')
      try {
        const userClient = new TwitterApi({
          appKey: bot.config.twitter?.apiKey || '',
          appSecret: bot.config.twitter?.apiSecret || '',
          accessToken: bot.config.twitter?.accessToken || '',
          accessSecret: bot.config.twitter?.accessTokenSecret || '',
        })
        const rwUserClient = userClient.readWrite
        const result = await rwUserClient.v2.tweet({
          text: 'My tweet text with two images!',
        });
        ApiResponse.Custom(res, 200, true, "🚀", { bot, userClient, result })
      } catch (error) {
        return ApiResponse.Custom(res, 500, false, "❌", error)
      }
    })

    server.use('/api', app);

    // set
    this.server = server;
  }

  async run() {
    const { options } = this;

    // listen
    this.server.listen(options.serverPort, () => {
      console.log(`[SERVER] [API] Listening on port ${options.serverPort}`);
    });
  }
}