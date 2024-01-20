import Readability from "@/lib/Readability";
import jsdom from "jsdom";
import axios from "axios"
import { runWithTimeout } from "./wait";

export const extractContentFromHtml = async (data: string) => {
  const dom = new jsdom.JSDOM(data, {})
  // log.info("html parsed to dom")/
  const reader = new Readability(
    {
      spec: dom.window.location.href,
      host: dom.window.location.host,
      prePath: dom.window.location.protocol + '//' + dom.window.location.host,
      scheme: dom.window.location.protocol.substr(0, dom.window.location.protocol.indexOf(':')),
      pathBase:
        dom.window.location.protocol +
        '//' +
        dom.window.location.host +
        dom.window.location.pathname.substr(0, dom.window.location.pathname.lastIndexOf('/') + 1),
    } as any,
    dom.window.document.cloneNode(true),
  )
  // log.info("dom readed")
  const article = reader.parse()
  
  return {
    article,
    dom,
  }
}

export const extractContentFromURL = async (
  url: string,
  options: {
    timeout?: number
    maxTry?: number
  } = {
    timeout: 7000,
    maxTry: 3,
  }
) => {
  const maxTry = options.maxTry || 5
  const timeout = options.timeout || 5000
  let tryCount = 0
  while (tryCount < maxTry) {
    try {
      const proc = axios({
        method: 'GET',
        url,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
          "Content-Type": "text/html; charset=utf-8",
        },
      })
      const res = await runWithTimeout(proc, timeout)
      if (!res.data) throw new Error("data is undefined")
      return await extractContentFromHtml(res.data)
    } catch (error) {
      tryCount++
      console.log(`extract failed, retrying... (${tryCount}/${maxTry} on ${timeout}) - cause ${error}`)
    }
  }
}

