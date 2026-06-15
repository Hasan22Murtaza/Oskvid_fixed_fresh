import type { ReactNode } from 'react'
import { SeoLayout, createLayoutMetadata } from '@/lib/seo/layout-helpers'

export const metadata = createLayoutMetadata('portfolioShowcase')

export default function ShowcaseLayout({ children }: { children: ReactNode }) {
  return <SeoLayout configKey='portfolioShowcase'>{children}</SeoLayout>
}
