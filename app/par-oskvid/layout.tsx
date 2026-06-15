import type { ReactNode } from 'react'
import { SeoLayout, createLayoutMetadata } from '@/lib/seo/layout-helpers'

export const metadata = createLayoutMetadata('about')

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <SeoLayout configKey='about'>{children}</SeoLayout>
}
