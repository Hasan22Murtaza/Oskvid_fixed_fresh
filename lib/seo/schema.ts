import { absoluteUrl, SITE_URL } from '@/lib/site-url'
import { BUSINESS } from './business'

export type BreadcrumbItem = {
  name: string
  path: string
}

export type NewsArticleSchemaInput = {
  id: string
  title: string
  excerpt: string
  image: string
  category?: string
  date?: string
  updatedAt?: string
}

function postalAddress() {
  return {
    '@type': 'PostalAddress' as const,
    streetAddress: BUSINESS.address.streetAddress,
    addressLocality: BUSINESS.address.addressLocality,
    addressRegion: BUSINESS.address.addressRegion,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.addressCountry,
  }
}

function openingHoursSpecification() {
  return BUSINESS.openingHours.map((hours) => ({
    '@type': 'OpeningHoursSpecification' as const,
    dayOfWeek: hours.dayOfWeek,
    opens: hours.opens,
    closes: hours.closes,
  }))
}

function areaServed() {
  return BUSINESS.areaServed.map((area) => ({
    '@type': area.type,
    name: area.name,
  }))
}

/** ProfessionalService with LocalBusiness properties for local SEO */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    description: BUSINESS.description,
    url: BUSINESS.url,
    logo: BUSINESS.logo,
    image: BUSINESS.image,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: openingHoursSpecification(),
    hasMap: BUSINESS.hasMap,
    sameAs: [...BUSINESS.sameAs],
    serviceType: [...BUSINESS.serviceTypes],
    areaServed: areaServed(),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.telephoneDisplay,
        contactType: 'customer service',
        email: BUSINESS.email,
        areaServed: 'LV',
        availableLanguage: ['Latvian', 'English'],
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Video producēšanas pakalpojumi',
      itemListElement: BUSINESS.offerCatalog.map((name) => ({
        '@type': 'Offer',
        itemOffered: {
        '@type': 'Service',
          name,
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: areaServed(),
        },
      })),
    },
    potentialAction: {
      '@type': 'ContactAction',
      target: absoluteUrl('/oskvid-kontakti'),
      name: 'Sazināties ar mums',
    },
  }
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: BUSINESS.name,
    url: SITE_URL,
    description: BUSINESS.description,
    inLanguage: 'lv-LV',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/kazu-blogs?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function getArticleSchema(article: NewsArticleSchemaInput) {
  const articleUrl = absoluteUrl(`/kazu-blogs/${article.id}`)
  const imageUrl = article.image.startsWith('http')
    ? article.image
    : absoluteUrl(article.image)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    headline: article.title,
    description: article.excerpt.slice(0, 300),
    image: [imageUrl],
    datePublished: article.date,
    dateModified: article.updatedAt || article.date,
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: BUSINESS.name,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: BUSINESS.name,
      logo: {
        '@type': 'ImageObject',
        url: BUSINESS.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    inLanguage: 'lv-LV',
    ...(article.category
      ? { articleSection: article.category, keywords: article.category }
      : {}),
  }
}

export function getReviewsSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '7',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Linda' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody:
          'Milzīgs paldies par mūsu īpašās dienas iemūžināšanu. Video atspoguļo mūsu kāzu dienas spilgtākos momentus un sajūtas.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Ieva' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody:
          'Milzīgs paldies Aināram par mūsu kāzu īpašo mirkļu iemūžināšanu! Vētrainais 29.jūlijs noteikti bija izaicinājums ikvienam.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Mārtiņš' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody:
          'Plānojot mūsu kāzu dienu, meklējām cilvēkus, kas padarītu mūsu īpašo dienu krāšņāku un kolorītu.',
      },
    ],
  }
}

export function getWebPageSchema({
  path,
  name,
  description,
}: {
  path: string
  name: string
  description: string
}) {
  const url = absoluteUrl(path)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'lv-LV',
  }
}
