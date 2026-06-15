import type { ReactNode } from 'react'
import { SeoLayout, createLayoutMetadata } from '@/lib/seo/layout-helpers'

export const metadata = createLayoutMetadata('contact')

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <SeoLayout configKey='contact'>{children}</SeoLayout>
}
