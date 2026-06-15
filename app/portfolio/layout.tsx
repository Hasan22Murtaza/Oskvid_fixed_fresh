import type { ReactNode } from 'react'
import { SeoLayout, createLayoutMetadata } from '@/lib/seo/layout-helpers'

export const metadata = createLayoutMetadata('portfolio')

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return <SeoLayout configKey='portfolio'>{children}</SeoLayout>
}
