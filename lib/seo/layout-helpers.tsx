import type { ReactNode } from 'react'
import { JsonLd } from '@/components/json-ld'
import { createPageMetadata } from '@/lib/seo/metadata'
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/seo/schema'
import { PAGE_SEO } from '@/lib/seo/pages'

type SeoLayoutProps = {
  configKey: keyof typeof PAGE_SEO
  children: ReactNode
  extraSchema?: Record<string, unknown> | Record<string, unknown>[]
}

export function createLayoutMetadata(configKey: keyof typeof PAGE_SEO) {
  const config = PAGE_SEO[configKey]
  return createPageMetadata({
    title: config.title,
    description: config.description,
    path: config.path,
    keywords: config.keywords,
  })
}

export function SeoLayout({ configKey, children, extraSchema }: SeoLayoutProps) {
  const config = PAGE_SEO[configKey]

  const schemas: Record<string, unknown>[] = [
    getWebPageSchema({
      path: config.path,
      name: config.title,
      description: config.description,
    }),
    getBreadcrumbSchema(config.breadcrumbs),
  ]

  if (extraSchema) {
    const extras = Array.isArray(extraSchema) ? extraSchema : [extraSchema]
    schemas.push(...extras)
  }

  return (
    <>
      <JsonLd data={schemas} />
      {children}
    </>
  )
}
