import type { Metadata } from 'next'
import { absoluteUrl, SITE_URL } from '@/lib/site-url'
import { BUSINESS, DEFAULT_OG_IMAGE, SITE_KEYWORDS } from './business'

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
  noIndex?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path)
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image)
  const fullTitle = title.includes('Osk Vid') ? title : `${title} | Osk Vid`

  return {
    title: fullTitle,
    description,
    keywords: keywords ?? [...SITE_KEYWORDS],
    alternates: {
      canonical,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      type,
      locale: 'lv_LV',
      url: canonical,
      siteName: BUSINESS.name,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(type === 'article' && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [BUSINESS.name],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  }
}

export function getRootMetadata(): Metadata {
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default:
        'Osk Vid - Video Filmēšanas Pakalpojumi Kāzām, Pasākumiem un Uzņēmumiem',
      template: '%s',
    },
    description: BUSINESS.description,
    keywords: [...SITE_KEYWORDS],
    authors: [{ name: BUSINESS.name }],
    creator: BUSINESS.name,
    publisher: BUSINESS.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'lv_LV',
      url: SITE_URL,
      siteName: BUSINESS.name,
      title: 'Osk Vid | Video Filmēšanas Pakalpojumi',
      description: BUSINESS.description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'Osk Vid - Video Filmēšanas Pakalpojumi Kāzām, Pasākumiem un Uzņēmumiem',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Osk Vid - Video Filmēšanas Pakalpojumi Kāzām, Pasākumiem un Uzņēmumiem',
      description: BUSINESS.description,
      images: [DEFAULT_OG_IMAGE],
    },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
    alternates: {
      canonical: SITE_URL,
      languages: {
        'lv-LV': SITE_URL,
      },
    },
    formatDetection: {
      telephone: true,
      date: false,
      email: true,
      address: true,
    },
  }
}
