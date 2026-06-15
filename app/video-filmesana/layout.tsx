import type { ReactNode } from 'react'
import { SeoLayout, createLayoutMetadata } from '@/lib/seo/layout-helpers'

export const metadata = createLayoutMetadata('services')

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <SeoLayout configKey='services'>{children}</SeoLayout>
}
