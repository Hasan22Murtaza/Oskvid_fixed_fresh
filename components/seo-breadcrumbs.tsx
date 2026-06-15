import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { BreadcrumbItem } from '@/lib/seo/schema'

type SeoBreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

export function SeoBreadcrumbs({ items, className = '' }: SeoBreadcrumbsProps) {
  if (items.length <= 1) return null

  return (
    <nav aria-label='Breadcrumb' className={`text-sm text-gray-500 ${className}`}>
      <ol className='flex flex-wrap items-center gap-1.5'>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.path} className='inline-flex items-center gap-1.5'>
              {index > 0 && (
                <ChevronRight className='h-3.5 w-3.5 shrink-0' aria-hidden='true' />
              )}
              {isLast ? (
                <span aria-current='page' className='font-medium text-gray-700'>
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className='transition-colors hover:text-[#cc5339]'
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
