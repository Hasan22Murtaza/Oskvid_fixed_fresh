import fs from "node:fs"
import fsp from "node:fs/promises"
import path from "node:path"
import seedContent from "@/data/content.json"

export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  image: string
  category?: string
  date?: string
  readtime?: string
  createdAt?: string
  updatedAt?: string
}

type NewsData = {
  news_articles: NewsArticle[]
}

const NEWS_JSON_PATH = path.join(process.cwd(), "data", "kazu-blogs.json")

function getSeedArticles(): NewsArticle[] {
  const seed = seedContent as unknown as Partial<NewsData>
  const articles = seed?.news_articles
  return Array.isArray(articles) ? (articles as NewsArticle[]) : []
}

export function loadNewsDataSync(): NewsData {
  try {
    const raw = fs.readFileSync(NEWS_JSON_PATH, "utf8")
    const parsed = JSON.parse(raw) as Partial<NewsData>
    return {
      news_articles: Array.isArray(parsed?.news_articles)
        ? (parsed.news_articles as NewsArticle[])
        : [],
    }
  } catch {
    return { news_articles: getSeedArticles() }
  }
}

export async function loadNewsData(): Promise<NewsData> {
  try {
    const raw = await fsp.readFile(NEWS_JSON_PATH, "utf8")
    const parsed = JSON.parse(raw) as Partial<NewsData>
    return {
      news_articles: Array.isArray(parsed?.news_articles)
        ? (parsed.news_articles as NewsArticle[])
        : [],
    }
  } catch {
    return loadNewsDataSync()
  }
}

export async function saveNewsData(data: NewsData): Promise<void> {
  const dir = path.dirname(NEWS_JSON_PATH)
  await fsp.mkdir(dir, { recursive: true })
  await fsp.writeFile(NEWS_JSON_PATH, JSON.stringify(data, null, 2), "utf8")
}

