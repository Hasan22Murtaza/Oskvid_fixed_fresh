import type { ReactNode } from 'react'
import { SeoLayout, createLayoutMetadata } from '@/lib/seo/layout-helpers'
import { getReviewsSchema } from '@/lib/seo/schema'

export const metadata = createLayoutMetadata('reviews')

export default function ReviewsLayout({ children }: { children: ReactNode }) {
  return (
    <SeoLayout configKey='reviews' extraSchema={getReviewsSchema()}>
      {children}
    </SeoLayout>
  )
}
