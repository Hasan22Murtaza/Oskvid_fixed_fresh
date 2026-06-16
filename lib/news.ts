import { loadNewsDataSync, NewsArticle } from "@/lib/news-storage"

function sortArticles(articles: NewsArticle[]): NewsArticle[] {
  return [...articles].sort((a, b) => {
    const dateA = a.updatedAt || a.date || a.createdAt || ''
    const dateB = b.updatedAt || b.date || b.createdAt || ''
    return dateB.localeCompare(dateA)
  })
}

export function getNewsArticles(): NewsArticle[] {
  const { news_articles: articles } = loadNewsDataSync()
  return sortArticles(articles)
}

export function getNewsArticle(id: string): NewsArticle | undefined {
  return getNewsArticles().find((article) => article.id === id)
}
