import type { ReactNode } from 'react'
import { SeoLayout, createLayoutMetadata } from '@/lib/seo/layout-helpers'

export const metadata = createLayoutMetadata('portfolioMusic')

export default function MusicLayout({ children }: { children: ReactNode }) {
  return <SeoLayout configKey='portfolioMusic'>{children}</SeoLayout>
}
