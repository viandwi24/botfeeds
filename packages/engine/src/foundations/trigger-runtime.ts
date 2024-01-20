import { Bot } from "@/lib/db"
import { ServerEngine, getBotFromService } from "./engine"
import bigInt from "big-integer"
import type { EntityLike } from "telegram/define"
import { Api } from "telegram"
import OpenAI from "openai"

type TriggerConfigPipeOption<T = { [key: string]: any }> = T

export interface TriggerConfig {
  pipes: {
    name: string
    option: TriggerConfigPipeOption
  }[]
}

export interface ChatGptCommanderPipeConfig {
  input: string
  prompt: string
  output: [string, OptionValueType]
}

export interface FilterSimplePipeOption {
  input: string
  blacklistWords: string[]
  output: [string, OptionValueType]
}

export interface OutputPipeOption {
  bots: {
    id: number
    content: string
    telegram?: {
      chatIds: string|number[]
    }
  }[]
}

type OptionValueType = 'string' | 'number' | 'boolean'

export interface TriggerProcessProps {
  runtime: TriggerRuntime,
  context: TriggerRuntimeContext,
  getInput: (name: string) => [string, OptionValueType, any]|undefined,
  setOutput: (value: any) => void
  parseStringFromInputs: (value: string) => string
}

export function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export class Pipe {
  id: string = ''
  name: string = ''

  constructor(config: any, id: string) {
    this.id = id
  }

  async run(context: TriggerRuntimeContext) {
    console.log(`[PIPE] run ${this.name}`)
    const getInput = (name: string) => {
      const currPipe = context.preparedPipes.find(item => item.name === this.name && this.id === item.id)
      const currPipeIndex = context.preparedPipes.findIndex(item => item.name === this.name && this.id === item.id)
      // console.log('getInput', this.id, currPipe?.id, currPipe?.inputs.map(item => item[0]))
      if (!currPipe) return undefined
      const p = currPipe.inputs.find(item => item[0] === name)
      return p
    }
    const setOutput = (value: any) => {
      const currPipe = context.preparedPipes.find(item => item.name === this.name && this.id === item.id)
      if (!currPipe) return
      if (currPipe.outputs[0]) currPipe.outputs[0][2] = value
      for (const pipeInput of context.preparedPipes) {
        const input = pipeInput.inputs.find(item => item[0] === currPipe.outputs[0][0])
        if (!input) continue
        input[2] = value
      }
    }
    const parseStringFromInputs = (value: string) => {
      // parse all {{variable}} from inputs context
      const regex = /{{(.*?)}}/g
      const matches = value.matchAll(regex);
      for (const match of matches) {
        const input = getInput(match[1])
        if (!input) continue
        value = value.replace(match[0], input[2])
      }
      // console.log('value', value)
      return value
    }
    await this.process({ context, runtime: context.runtime, getInput, setOutput, parseStringFromInputs })
  }

  async process(props: TriggerProcessProps) {}
}

export class ChatGptCommanderPipe extends Pipe {
  name = "chatgpt.commander"
  config!: ChatGptCommanderPipeConfig

  constructor(config: ChatGptCommanderPipeConfig, id: string) {
    super(config, id)
    this.config = config
  }

  async get(command: string) {
    const secret = "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"

    // // console.log('command', command)
    const openai = new OpenAI({
      apiKey: secret,
    })
    const stream = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: command,
        },
      ],
      model: "gpt-3.5-turbo",
      stream: true,
    })
    let result: string = ""
    // console.log(`[${this.name}]`, 'streaming chatgpt response...')
    for await (const text of stream) {
      const txt = text.choices[0]?.delta?.content || ""
      result += txt
      // Bun.write(Bun.stdout, txt)
    }
    // console.log(`[${this.name}]`, 'streaming chatgpt response done')
    return result
  }

  async process(props: TriggerProcessProps) {
    console.log('---')
    console.log(`[CHAT.GPT] [${this.id}] pipe input : ${this.config.input} | pipe output : ${this.config.output[0]}`)
    const propmt = props.parseStringFromInputs(this.config.prompt)
    console.log(`[CHAT.GPT] from : ${propmt}`)
    // console.log('propmt', this.config.prompt, 'result', propmt)

    const result = await this.get(propmt)

    props.setOutput(result)
    console.log(`[CHAT.GPT] to : ${result}`)
    console.log('---')
  }
}

export class FilterSimplePipe extends Pipe {
  name = "filter.simple"
  config!: FilterSimplePipeOption

  constructor(config: FilterSimplePipeOption, id: string) {
    super(config, id)
    this.config = config
  }

  async process(props: TriggerProcessProps) {
    console.log('---')
    console.log(`[FILTER.SIMPLE] [${this.id}] pipe input : ${this.config.input} | pipe output : ${this.config.output[0]}`)
    const inputValue = props.getInput(this.config.input)
    console.log(`[FILTER.SIMPLE] from : ${inputValue ? inputValue[2] : 'undefined'}`)
    if (!inputValue) return // console.log('input not found', this.config.input)
    // console.log('input', this.config.input, 'inputValue', inputValue)
    const output = props.parseStringFromInputs(inputValue[2])
    props.setOutput(output)
    console.log(`[FILTER.SIMPLE] to : ${output}`)
    console.log('---')
  }
}

export class OutputPipe extends Pipe {
  name = "output"
  config!: OutputPipeOption

  constructor(config: OutputPipeOption, id: string) {
    super(config, id)
    this.config = config
  }

  async process(props: TriggerProcessProps) {
    const { bots } = this.config
    console.log('---')
    console.log(`[OUTPUT] [${this.id}]`)
    console.log(`[OUTPUT] to : ${bots.map(item => item.id).join(', ')}`)
    console.log(`[OUTPUT] context: ${JSON.stringify(props.context.preparedPipes)}`)
    console.log('---')
    for (const botItem of bots) {
      // console.log('botItem', botItem.id, botItem)
      const botData = await Bot.findOne({
        where: {
          id: botItem.id
        }
      })
      if (!botData) continue

      // const { status } = getBotFromService(botData, props.runtime.serverEngine)
      if (botData.service === 'telegram') {
        // const 
        const { telegram } = props.runtime.serverEngine.services
        const node = telegram.manager.get(botData)
        // console.log('node', botData.name)
        if (!node) continue

        for (const chatId of botItem?.telegram?.chatIds || []) {
          // console.log('chatId', chatId)
          const chatIdParsed: bigInt.BigInteger = bigInt(`${chatId}`)
          const chatIdParsedStr = chatIdParsed.toString()
          try {
            // if chatId start with -100, or 100, or 1, -1, it's channel
            let entity: EntityLike
            if (
              chatIdParsedStr.startsWith('-100')
              || chatIdParsedStr.startsWith('100')
              || chatIdParsedStr.startsWith('1')
              || chatIdParsedStr.startsWith('-1')
            ) {
              entity = (new Api.PeerChannel({ channelId: chatIdParsed }))
            } else {
              entity = (new Api.PeerChat({ chatId: chatIdParsed }))
            }
            const content = botItem.content
            const msg = props.parseStringFromInputs(content)
            // console.log('awoekowke', content, msg)
            await node.botSendMessage(msg, entity)
          } catch (error) {
            // console.log('error', error)
          }
        }
      } else if (botData.service === 'twitter') {
        const { twitter } = props.runtime.serverEngine.services
        const node = twitter.manager.get(botData)
        if (!node) continue

        const content = botItem.content
        const msg = props.parseStringFromInputs(content)
        await node.botSendTweet(msg)
      }
    }


    // console.log('aweae', JSON.stringify(props.context.preparedPipes))
  }
}

export class TriggerRuntimeContext {
  preparedPipes: {
    id: string
    name: string
    config: TriggerConfigPipeOption
    inputs: [string, OptionValueType, any][]
    outputs: [string, OptionValueType, any][]
  }[] = []
  
  constructor(public runtime: TriggerRuntime) {
    // prepared
    const { pipes } = runtime.rawConfig

    let currentInputs = [...runtime.initialInput]
    for (const pipe of pipes) {
      const { name, option } = pipe
      
      // outputs
      let rawOutputNames: [string, OptionValueType]|[string, OptionValueType, any] = (option as any)?.output
      if (rawOutputNames && Array.isArray(rawOutputNames) && rawOutputNames.length == 2) {
        rawOutputNames = [rawOutputNames[0], rawOutputNames[1], undefined]
      }
      
      this.preparedPipes.push({
        id: generateId(),
        name,
        config: option,
        inputs: [...currentInputs],
        outputs: rawOutputNames ? [rawOutputNames] : []
      })

      // outputs
      const rawOutputName: undefined|[string, OptionValueType] = (option as any)?.output
      if (rawOutputName) {
        // // console.log('aw', rawOutputNames)
        const input = currentInputs.find(item => item[0] === rawOutputName[0])
        if (!input) {
          currentInputs.push([rawOutputName[0], rawOutputName[1], undefined])
        }
      }
    }
  }
}

export class TriggerRuntime {
  // [datetime, context]
  contexts: [number, TriggerRuntimeContext][] = []

  constructor(
    public rawConfig: TriggerConfig,
    public initialInput: [string, OptionValueType, any][],
    public serverEngine: ServerEngine
  ) {
    this.parseToContext()
  }

  parseToContext() {
    const context = new TriggerRuntimeContext(this)
    this.contexts.push([Date.now(), context])
    return context
  }

  async run() {
    const context = this.parseToContext()
    const { preparedPipes } = context

    const REGISTERED_PIPES: [string, typeof Pipe][] = [
      ['chatgpt.commander', ChatGptCommanderPipe],
      ['filter.simple', FilterSimplePipe],
      ['output', OutputPipe]
    ]

    // console.log('PREPARE CONTEXT', context.preparedPipes.map(item => [item.name, item.id]), '\n\n\n')
    for (const pipeData of preparedPipes) {
      // run
      const pipe = REGISTERED_PIPES.find(item => item[0] === pipeData.name)
      if (!pipe) break

      const pipeInstance = new pipe[1](pipeData.config, pipeData.id)
      // console.log('PREPARE CONTEXT', pipeData.id, pipeInstance.id, '\n\n\n')
      await pipeInstance.run(context)
    }

    // // console.log('context', JSON.stringify(context.preparedPipes.map(item => [item.name, item.outputs])), 'aweokawoekoawe\n\n')

    return context
  }
}