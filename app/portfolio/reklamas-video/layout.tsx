import type { ReactNode } from 'react'
import { SeoLayout, createLayoutMetadata } from '@/lib/seo/layout-helpers'

export const metadata = createLayoutMetadata('portfolioPromo')

export default function PromoLayout({ children }: { children: ReactNode }) {
  return <SeoLayout configKey='portfolioPromo'>{children}</SeoLayout>
}
