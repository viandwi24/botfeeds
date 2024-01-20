import express from 'express'
import { sequelize, Bot, Trigger, Feed } from '@/lib/db';
import { ApiResponse } from '@/utils/api';
import { TriggerRuntime, type TriggerConfig } from '@/foundations/trigger-runtime';
import type { ServerEngine } from '@/foundations/engine';

export default function (server: express.Router, se: ServerEngine) {
  server.get("/triggers", async (req, res) => {
    const triggers = await Trigger.findAll({
      // include: [Bot]
    })
    ApiResponse.Custom(res, 200, true, "🚀", triggers)
  })
  server.post("/triggers/test-runtime", async (req, res) => {
    // const { triggerId } = req.params as { triggerId: string }
    const { config } = req.body as { config: TriggerConfig }

    // const trigger = await Trigger.findOne({
    //   where: {
    //     id: triggerId
    //   },
    //   // include: [Bot]
    // })
    // if (!trigger) return ApiResponse.Custom(res, 404, false, "❌", "trigger not found")

    const runtime = new TriggerRuntime(
      config,
      [
        ['ContentRaw', 'string', '<div>example content</div>'],
        ['ContentText', 'string', 'example content'],
        ['ContentUrl', 'string', 'https://example.com'],
        ['ContentByline', 'string', 'example byline'],
        ['ContentDir', 'string', 'example dir'],
        ['ContentExcerpt', 'string', 'example excerpt'],
        ['ContentLang', 'string', 'example lang'],
        ['ContentLength', 'number', 123],
        ['ContentSiteName', 'string', 'example site name'],
        ['ContentTitle', 'string', 'example title'],
      ],
      se
    )
    const context = runtime.parseToContext()

    ApiResponse.Custom(res, 200, true, "🚀", { context: { preparedPipes: context.preparedPipes } })
  })
  server.put("/triggers/:triggerId", async (req, res) => {
    const { triggerId } = req.params as { triggerId: string }

    const trigger = await Trigger.findOne({
      where: {
        id: triggerId
      },
      // include: [Bot]
    })
    if (!trigger) return ApiResponse.Custom(res, 404, false, "❌", "trigger not found")

    const { name, config } = req.body as { name: string, config: TriggerConfig }
    await trigger.update({
      name,
      config,
    })

    return ApiResponse.Custom(res, 200, true, "🚀", { ...req.body })
  })
  server.post("/triggers", async (req, res) => {
    const { name, config } = req.body as { name: string, config: TriggerConfig }
    // await trigger.update({
    //   name,
    //   config,
    // })
    const trigger = await Trigger.create({
      name,
      config,
    })

    return ApiResponse.Custom(res, 201, true, "🚀", { ...req.body, trigger })
  })
  server.delete("/triggers/:triggerId", async (req, res) => {
    const { triggerId } = req.params as { triggerId: string }

    const trigger = await Trigger.findOne({
      where: {
        id: triggerId
      },
    })
    if (!trigger) return ApiResponse.Custom(res, 404, false, "❌", "trigger not found")

    await trigger.destroy()

    return ApiResponse.Custom(res, 200, true, "🚀", { ...req.body })
  })
  server.get("/triggers/:triggerId", async (req, res) => {
    const { triggerId } = req.params as { triggerId: string }
    const triggers = await Trigger.findOne({
      where: {
        id: triggerId
      },
      // include: [Bot]
    })
    // const runtime = new TriggerRuntime(
    //   triggers?.config as TriggerConfig,
    //   [
    //     ['ContentText', 'string']
    //   ]
    // )
    // ApiResponse.Custom(res, 200, true, "🚀", { context: runtime.contexts.map(item => ({
    //   preparedPipes: item[1].preparedPipes,
    // })) })
    // ApiResponse.Custom(res, 200, true, "🚀", triggers)
  })
}