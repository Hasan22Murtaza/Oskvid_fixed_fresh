import type { MetadataRoute } from 'next'
import { getNewsArticles } from '@/lib/news'
import { absoluteUrl } from '@/lib/site-url'
import { PAGE_SEO } from '@/lib/seo/pages'

type SitemapPageConfig = {
  path: string
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
  priority: number
}

/** All public static routes — keep in sync with app/ page structure */
export const PUBLIC_STATIC_PAGES: SitemapPageConfig[] = [
  { path: PAGE_SEO.home.path, changeFrequency: 'weekly', priority: 1.0 },
  { path: PAGE_SEO.about.path, changeFrequency: 'monthly', priority: 0.8 },
  { path: PAGE_SEO.services.path, changeFrequency: 'monthly', priority: 0.9 },
  { path: PAGE_SEO.portfolio.path, changeFrequency: 'weekly', priority: 0.8 },
  { path: PAGE_SEO.portfolioWeddings.path, changeFrequency: 'monthly', priority: 0.8 },
  { path: PAGE_SEO.portfolioPromo.path, changeFrequency: 'monthly', priority: 0.8 },
  { path: PAGE_SEO.portfolioMusic.path, changeFrequency: 'monthly', priority: 0.7 },
  { path: PAGE_SEO.portfolioShowcase.path, changeFrequency: 'monthly', priority: 0.7 },
  { path: PAGE_SEO.reviews.path, changeFrequency: 'weekly', priority: 0.8 },
  { path: PAGE_SEO.blog.path, changeFrequency: 'weekly', priority: 0.8 },
  { path: PAGE_SEO.contact.path, changeFrequency: 'monthly', priority: 0.8 },
]

function toSitemapUrl(path: string): string {
  if (path === '/') return absoluteUrl('/')
  return absoluteUrl(path)
}

/** Build the full sitemap — static pages + dynamic blog articles from CMS */
export function getSitemapEntries(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = PUBLIC_STATIC_PAGES.map((page) => ({
    url: toSitemapUrl(page.path),
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = getNewsArticles().map((article) => ({
    url: absoluteUrl(`/kazu-blogs/${article.id}`),
    lastModified: new Date(
      article.updatedAt || article.date || article.createdAt || Date.now(),
    ),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticEntries, ...blogEntries]
}
