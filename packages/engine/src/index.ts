import path from 'path'
import chalk from "chalk"
import { Command } from 'commander'
import { sequelize, Bot, Trigger, Feed } from '@/lib/db'
import { ServerEngine } from "@/foundations/engine"
import { log } from "@/utils/log"

// 
const APP_COMMAND = process.env.APP_COMMAND || 'noname'
const APP_DESCRIPTION = process.env.APP_DESCRIPTION || 'nodesc'
const APP_VERSION = process.env.APP_VERSION || '0.0.0'
const LOG_PREFIX = `[${APP_COMMAND?.toString()?.toUpperCase()}]`

const app = new Command(APP_COMMAND)
app
  .name(APP_COMMAND)
  .version(APP_VERSION)
  .description(APP_DESCRIPTION)
  .action(() => app.help())
  .command('run')
  .description('run with web gui')
  .option('-g, --gui', 'run with web gui', false)
  .option('-p, --port <port>', 'specific web port', '7152')
  .option('-sp, --server-port <port>', 'specific server port', '51143')
  .action(async (args) => {
    console.log(args)
    const runWebGUI = async () => new Promise<number>((resolve, reject) => {
      const proc = Bun.spawn({
        cwd: path.resolve(import.meta.dir, '../../web-ui'),
        cmd: ['bun', '--bun', '--watch', 'dev'],
        env: {
          PORT: args.port || undefined,
          NUXT_TELEMETRY_DISABLED: '1',
          FORCE_COLOR: 'true',
          ENGINE_API_URL: `http://localhost:${args.serverPort}`,
        },
        onExit: (code) => {
          resolve(code.exitCode || 0)
        },
        ipc(message, subprocess) {
            console.log(message)
        },
      });

      (async () => {
        try {
          for await (const chunk of (proc as any).stdout) {
            const str = new TextDecoder().decode(chunk)
            str.replace('\n', '')
            log.info(chalk.blue(`[WEB]`), str)
          }
        } catch (error) {
          
        }
      })()
    })

    // args
    log.info(`[SERVER] Starting server on ${args.serverPort}`)
    const server = new ServerEngine({
      sequelize,
      options: {
        serverPort: args.serverPort,
        guiPort: args.port,
      }
    })

    // init
    await server.init()

    // start web gui
    if (args.gui) {
      log.info(`Starting web gui on ${args.port}`)
      const exitcode = runWebGUI()
    }

    // run server
    await server.run()
  })

app.parse()