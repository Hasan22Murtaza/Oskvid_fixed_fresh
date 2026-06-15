import type { ReactNode } from 'react'
import { SeoLayout, createLayoutMetadata } from '@/lib/seo/layout-helpers'

export const metadata = createLayoutMetadata('blog')

export default function NewsLayout({ children }: { children: ReactNode }) {
  return <SeoLayout configKey='blog'>{children}</SeoLayout>
}
