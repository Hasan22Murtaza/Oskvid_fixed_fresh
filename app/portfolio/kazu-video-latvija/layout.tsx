import type { ReactNode } from 'react'
import { SeoLayout, createLayoutMetadata } from '@/lib/seo/layout-helpers'

export const metadata = createLayoutMetadata('portfolioWeddings')

export default function WeddingsLayout({ children }: { children: ReactNode }) {
  return <SeoLayout configKey='portfolioWeddings'>{children}</SeoLayout>
}
