import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { JsonLd } from '@/components/json-ld'
import { getNewsArticle } from '@/lib/news'
import { createPageMetadata } from '@/lib/seo/metadata'
import {
  getArticleSchema,
  getBreadcrumbSchema,
  getWebPageSchema,
} from '@/lib/seo/schema'
import { PAGE_SEO } from '@/lib/seo/pages'

type Props = {
  params: { id: string }
  children: ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getNewsArticle(params.id)

  if (!article) {
    return createPageMetadata({
      title: 'Raksts nav atrasts',
      description: 'Meklētais bloga raksts nav atrasts.',
      path: `/kazu-blogs/${params.id}`,
      noIndex: true,
    })
  }

  const description =
    article.excerpt.length > 160
      ? `${article.excerpt.slice(0, 157)}...`
      : article.excerpt

  return createPageMetadata({
    title: article.title,
    description,
    path: `/kazu-blogs/${article.id}`,
    image: article.image,
    type: 'article',
    publishedTime: article.date,
    modifiedTime: article.updatedAt || article.date,
    keywords: article.category ? [article.category, 'Osk Vid blogs'] : undefined,
  })
}

export default function BlogArticleLayout({ params, children }: Props) {
  const article = getNewsArticle(params.id)

  if (!article) {
    return <>{children}</>
  }

  const breadcrumbs = [
    ...PAGE_SEO.blog.breadcrumbs,
    { name: article.title, path: `/kazu-blogs/${article.id}` },
  ]

  return (
    <>
      <JsonLd
        data={[
          getArticleSchema(article),
          getWebPageSchema({
            path: `/kazu-blogs/${article.id}`,
            name: article.title,
            description: article.excerpt.slice(0, 300),
          }),
          getBreadcrumbSchema(breadcrumbs),
        ]}
      />
      {children}
    </>
  )
}
