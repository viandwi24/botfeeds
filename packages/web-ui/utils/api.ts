export const parseApiURL = (url: string) => {
  // return `https://a2d9-2001-448a-50e0-3ef2-5533-6ad8-22f6-6c74.ngrok-free.app${url}`
  // return `http://localhost:51143${url}`
  return `${useRuntimeConfig().public.engineApiUrl}${url}`
}
// declare types globally
declare global {
  export namespace ApiV1 {
    export interface BaseResponse<T = any> {
      ok: boolean
      message: string
      data: T | undefined
    }

    export namespace Model {
      export interface TriggerConfigPipe {
        name: string
      }
      export interface TriggerConfigPipeWithDefaultOption {
        option: {
          input?: string
          output?: [string, TriggerConfigPipeOptionOutput]
        }
      }
      export interface TriggerConfig {
        pipes: TriggerConfigPipe[]
      }
      export type TriggerConfigPipeOptionOutput = 'string' | 'number' | 'boolean'
      export namespace TriggerPipe {
        export interface ChatGptCommander extends TriggerConfigPipe {
          option: {
            output: [string, TriggerConfigPipeOptionOutput]
            prompt: string
          }
        }
        export interface FilterSimple extends TriggerConfigPipe {
          option: {
            output: [string, TriggerConfigPipeOptionOutput]
            input: string
            blacklistWords: string[]
          }
        }
        export interface Output extends TriggerConfigPipe {
          option: {
            bots: TriggerConfigPipeOptionBot[]
          }
        }
        export interface TriggerConfigPipeOptionBot {
          id: number
          content: string
          telegram?: {
            chatIds: string[]
          }
          twitter?: {}
        }
      }
      export interface TriggerRuntimeContext {
        preparedPipes: {
          name: string
          inputs: [string, TriggerConfigPipeOptionOutput, any][]
          outputs: [string, TriggerConfigPipeOptionOutput, any][]
        }[]
      }
      export interface Trigger {
        id: number
        name: string
        config: TriggerConfig
        // Bots: {
        //   id: number
        //   name: string
        //   service: 'twitter' | 'telegram'
        // }[]
      }
      export interface Feed {
        id: number
        name: string
        url: string
        config: {
          maxItemGet: number
          forceSameItem: boolean
        }
        Triggers: Trigger[]
      }
      export interface Bot {
        id: number
        name: string
        service: 'twitter' | 'telegram'
        status?: 'connected' | 'stopped' | 'started' | 'disconnected'
        config: {
          telegram?: {
            apiHash?: string
            apiId?: number
            botApiToken?: string
            session?: string
          }
          twitter?: {
            apiKey?: string
            apiSecret?: string
            accessToken?: string
            accessTokenSecret?: string
          }
        }
      }
    }


    // 
    export namespace Bot {
      export type GetBots = BaseResponse<ApiV1.Model.Bot[]>
      export type GetTwitterBots = BaseResponse<ApiV1.Model.Bot[]>
    }
    export namespace Trigger {
      export type GetTrigger = BaseResponse<ApiV1.Model.Trigger>
      export type GetTriggers = BaseResponse<ApiV1.Model.Trigger[]>
    }
    export namespace Feed {
      export type GetFeeds = BaseResponse<ApiV1.Model.Feed[]>
    }
  }
}