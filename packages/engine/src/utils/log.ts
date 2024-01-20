import { createConsola } from "consola"
import chalk from "chalk"

export const logger = createConsola({
  formatOptions: {
    compact: false,
    date: true,
  },
  // all logs, including debug
  level: 5,
})

export const log = {
  info: (msg: any, ...args: any) => {
    return logger.info(chalk.blue(`[LOG]`), msg, ...args)
    if (args.length > 0) {
      logger.info(chalk.blue(`[LOG]`) + msg, ...args)
    } else {
      logger.info(chalk.blue(`[LOG]`), msg)
    }
  },
  debug: (msg: any, ...args: any) => {
    return logger.debug(chalk.yellow(`[DEBUG]`), msg, ...args)
    if (args.length > 0) {
      logger.debug(chalk.yellow(`[DEBUG]`) + msg, ...args)
    } else {
      logger.debug(chalk.yellow(`[DEBUG]`), msg)
    }
  }
}