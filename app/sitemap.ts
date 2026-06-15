import type { MetadataRoute } from 'next'
import { getSitemapEntries } from '@/lib/seo/sitemap-routes'

/** Regenerate on each request so new CMS blog posts appear immediately */
export const dynamic = 'force-dynamic'

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries()
}
