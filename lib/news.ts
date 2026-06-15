import { getContentData } from '@/lib/db'

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

const NEWS_KEY = 'news_articles'

function sortArticles(articles: NewsArticle[]): NewsArticle[] {
  return [...articles].sort((a, b) => {
    const dateA = a.updatedAt || a.date || a.createdAt || ''
    const dateB = b.updatedAt || b.date || b.createdAt || ''
    return dateB.localeCompare(dateA)
  })
}

export function getNewsArticles(): NewsArticle[] {
  const allContent = getContentData()
  const articles: NewsArticle[] = allContent[NEWS_KEY] || []
  return sortArticles(articles)
}

export function getNewsArticle(id: string): NewsArticle | undefined {
  return getNewsArticles().find((article) => article.id === id)
}
