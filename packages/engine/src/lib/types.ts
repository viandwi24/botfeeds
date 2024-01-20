export interface RssParsed {
  copyright: string
  description: string
  feedUrl: string
  generator: string
  image: {
    link: string
    url: string
    title: string
  }
  items: {
    creator: string
    title: string
    link: string
    pubDate: string
    content: string
    contentSnippet: string
    guid: string
    isoDate: string
    "dc:creator": string
  }[]
  language: string
  lastBuildDate: string
  link: string
  paginationLinks: {
    self: string
  }
  title: string
}