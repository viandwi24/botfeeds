import express from 'express'
import { sequelize, Bot, Trigger, Feed, FeedHistory, FeedItem } from '@/lib/db';
import { ApiResponse } from '@/utils/api';
import { extractContentFromURL } from '@/utils/content';
import rssparser from "rss-parser";
import dayjs from 'dayjs';
import type { ServerEngine } from '@/foundations/engine';
import axios from 'axios';

export default function (server: express.Router, se: ServerEngine) {
  server.get("/feeds", async (req, res) => {
    const feeds = await Feed.findAll({
      // include relation feed.trigger and feed.trigger.bot
      include: [Trigger]
    })
    ApiResponse.Custom(res, 200, true, "🚀", feeds)
  })

  server.get("/feeds/histories", async (req, res) => {
    const histories = await FeedHistory.findAll({
      order: [
        ['date', 'DESC']
      ],
      include: [Feed]
    })

    ApiResponse.Custom(res, 200, true, "🚀", histories)
  })

  server.get("/feeds/items", async (req, res) => {
    const items = await FeedItem.findAll({
      include: [FeedHistory, { model: FeedHistory, include: [Feed] }]
    })

    ApiResponse.Custom(res, 200, true, "🚀", items)
  })

  server.post("/feeds/:feedId/run", async (req, res) => {
    const { feedId } = req.params as { feedId: string }
    const feed = await Feed.findOne({
      where: {
        id: feedId
      },
      include: [Trigger]
    })

    if (!feed) return ApiResponse.Custom(res, 404, false, "❌", "feed not found")

    // run
    try {
      const headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) snap Chromium/90.0.4430.212 Chrome/90.0.4430.212 Safari/537.36',
        // 'Accept-Encoding': 'gzip, deflate',
      }
      // const test = await axios.get(feed.url as string, {
      //   headers,
      // })
      // console.log('test', test.data)
      const parser = new rssparser({
        headers
      })
      const feeds = await parser.parseURL(feed.url as string)

      try {
        // save to history
        const history = await FeedHistory.create({
          feedId: feed.id,
          date: dayjs().toDate(),
          itemsCount: feeds.items?.length || 0,
          rssParsedRaw: feeds as any,
          rssUrl: feed.url as string,
          itemsProcessed: 0,
          status: 'pending',
          logs: '',
        })
    
        // running in background
        se.feedRuntime.run(history)
    
        return ApiResponse.Custom(res, 200, true, "🚀", { feeds, history })
      } catch (error) {
        console.error(error)
        return ApiResponse.Custom(res, 500, false, "❌", "error while running trigger")
      }
    } catch (error) {
      console.error(error)
      return ApiResponse.Custom(res, 500, false, "❌", "error while fetching feed")
    }
  })

  server.post("/feeds", async (req, res) => {
    // get triggers
    const triggersIds = req.body.triggers as number[]
    const triggers = await Trigger.findAll({
      where: {
        id: triggersIds
      }
    })

    const { name, url, config } = req.body as {
      name: string,
      url: string,
      config: {
        maxItemGet: number,
        forceSameItem: boolean,
      }
    }
    const feed = await Feed.create({
      name,
      url,
      config,
    })
    await feed.setTriggers(triggers)
    
    return ApiResponse.Custom(res, 200, true, "🚀", { ...req.body, feed })
  })


  server.put("/feeds/:feedId", async (req, res) => {
    const feed = await Feed.findOne({
      where: {
        id: req.params.feedId
      }
    })
    if (!feed) return ApiResponse.Custom(res, 404, false, "❌", "feed not found")

    // get triggers
    const triggersIds = req.body.triggers as number[]
    const triggers = await Trigger.findAll({
      where: {
        id: triggersIds
      }
    })

    const { name, url, config } = req.body as {
      name: string,
      url: string,
      config: {
        maxItemGet: number,
        forceSameItem: boolean,
      }
    }
    await feed.update({
      name,
      url,
      config,
    })
    await feed.setTriggers(triggers)
    
    return ApiResponse.Custom(res, 200, true, "🚀", { ...req.body })
  })

  server.delete("/feeds/:feedId", async (req, res) => {
    const feed = await Feed.findOne({
      where: {
        id: req.params.feedId
      }
    })
    if (!feed) return ApiResponse.Custom(res, 404, false, "❌", "feed not found")

    await feed.destroy()

    return ApiResponse.Custom(res, 200, true, "🚀", { ...req.body })
  })

  server.post("/feeds/:feedId/reset", async (req, res) => {
    const feed = await Feed.findOne({
      where: {
        id: req.params.feedId
      }
    })
    if (!feed) return ApiResponse.Custom(res, 404, false, "❌", "feed not found")

    const histories = await FeedHistory.findAll({
      where: {
        feedId: feed.id
      }
    })
    await Promise.all(histories.map(async (history) => {
      try {
        await history.destroy()
        await FeedItem.destroy({
          where: {
            feedHistoryId: history.id
          }
        })
      } catch (error) {
        console.error(error)
      }
    }))

    return ApiResponse.Custom(res, 200, true, "🚀", { ...req.body })
  })

  server.post("/contents/parser", async (req, res) => {
    const { url } = req.body as { url: string }
    try {
      const httpres = await extractContentFromURL(url, {
        timeout: 10000,
        maxTry: 5,
      })
      if (!httpres) return ApiResponse.Custom(res, 500, false, "❌", "error while fetching feed")
      const { article, dom } = httpres

      ApiResponse.Custom(res, 200, true, "🚀", article)
    } catch (error) {
      ApiResponse.Custom(res, 500, false, "❌", error)
    }
  })
}