import express from 'express'
import { sequelize, Bot, Trigger, Feed } from '@/lib/db'
import { ApiResponse } from '@/utils/api'
import { getBotFromService, type ServerEngine } from '@/foundations/engine'

export default function (server: express.Router, se: ServerEngine) {
  server.get("/bots", async (req, res) => {
    const bots = await Bot.findAll()
    ApiResponse.Custom(res, 200, true, "🚀", bots.map(item => {
      let status = 'unknown'

      try {
        const getted = getBotFromService(item, se)
        status = getted.status
      } catch (error) {}

      return {
        ...(item.toJSON()),
        status
      }
    }))
  })
  server.get("/bots/:service", async (req, res) => {
    const bots = await Bot.findAll({
      where: {
        service: req.params.service
      }
    })
    ApiResponse.Custom(res, 200, true, "🚀", bots.map(item => {
      let status = 'unknown'

      try {
        const getted = getBotFromService(item, se)
        status = getted.status
      } catch (error) {
        
      }

      return {
        ...(item.toJSON()),
        status
      }
    }))
  })
  server.put("/bots/:botId", async (req, res) => {
    const bot = await Bot.findOne({
      where: {
        id: req.params.botId
      }
    })
    if (!bot) return ApiResponse.Custom(res, 404, false, "🚀", "Bot not found")

    const { name, config } = req.body
    if (name) bot.name = name
    if (config) bot.config = config
    await bot.save()

    const botNode = se.services[bot.service].manager.get(bot)
    if (botNode) {
      await botNode.restart()
    }

    ApiResponse.Custom(res, 200, true, "🚀", bot)
  })
  server.post("/bots/:botId/action/:action", async (req, res) => {
    const { action } = req.params as { action: string }
    const allowedActions = ['start', 'stop', 'restart']
    
    const bot = await Bot.findOne({
      where: {
        id: req.params.botId
      }
    })
    if (!bot) return ApiResponse.Custom(res, 404, false, "🚀", "Bot not found")

    let botNode = se.services[bot.service].manager.get(bot)
    if (!botNode) {
      await se.services[bot.service].manager.run(bot)
      botNode = se.services[bot.service].manager.get(bot)
    }

    if (botNode) {
      if (action === 'start') {
        await botNode.start()
      } else if (action === 'stop') {
        await botNode.stop()
      } else if (action === 'restart') {
        await botNode.restart()
      }
    }

    ApiResponse.Custom(res, 200, true, "🚀", bot)
  })
  server.post("/bots", async (req, res) => {
    const { name, service, config } = req.body as { name: string, service: string, config: any }
    const allowedServices = ['telegram', 'twitter']

    if (!name) return ApiResponse.Custom(res, 400, false, "🚀", "Name is required")
    if (!service) return ApiResponse.Custom(res, 400, false, "🚀", "Service is required")
    if (!config) return ApiResponse.Custom(res, 400, false, "🚀", "Config is required")
    if (!allowedServices.includes(service)) return ApiResponse.Custom(res, 400, false, "🚀", "Service not allowed")

    const bot = await Bot.create({
      name,
      service: service as any,
      config
    })

    ApiResponse.Custom(res, 200, true, "🚀", bot)
  })
  server.delete("/bots/:botId", async (req, res) => {
    const bot = await Bot.findOne({
      where: {
        id: req.params.botId
      }
    })
    if (!bot) return ApiResponse.Custom(res, 404, false, "🚀", "Bot not found")

    try {
      // stop node 
      const botNode = se.services[bot.service].manager.get(bot)
      if (botNode) {
        await botNode.stop()
      }
    } catch (error) {
      console.error(error)
    }

    await bot.destroy()

    ApiResponse.Custom(res, 200, true, "🚀", bot)
  })
  server.get("/bots/tool/:botId/:toolName?", async (req, res) => {
    const bot = await Bot.findOne({
      where: {
        id: req.params.botId
      }
    })
    if (!bot) return ApiResponse.Custom(res, 404, false, "🚀", "Bot not found")

    try {
      const getted = getBotFromService(bot, se)

      const toolName = req.params.toolName
      if (toolName) {
        if (bot.service === 'telegram' && toolName === 'list-chat-ids') {
          const chatIds: string[] = []

          const node = se.services.telegram.manager.get(bot)
          if (!node) return ApiResponse.Custom(res, 404, false, "🚀", "Bot node not running")
          if (!node.tg) return ApiResponse.Custom(res, 404, false, "🚀", "Bot node not running")

          return ApiResponse.Custom(res, 200, true, "🚀", { chatIds })
        }
      }

      return ApiResponse.Custom(res, 200, true, "🚀", {
        ...(bot.toJSON()),
        status: getted.status,
      })      
    } catch (error) {
      return ApiResponse.Custom(res, 500, false, "🚀", error)
    }
  })
}