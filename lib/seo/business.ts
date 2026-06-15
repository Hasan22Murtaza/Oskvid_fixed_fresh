import { absoluteUrl, SITE_URL } from '@/lib/site-url'

export const BUSINESS = {
  name: 'Osk Vid',
  description:
    'Profesionāli video producēšanas pakalpojumi Latvijā. Specializējamies kāzās, reklāmas saturā un pasākumos. Premium kino kvalitāte ar 14+ gadu pieredzi un 800+ paveiktiem projektiem.',
  url: SITE_URL,
  email: 'info@oskvid.com',
  telephone: '+37123304329',
  telephoneDisplay: '+371 23304329',
  logo: absoluteUrl('/logo-gold.png'),
  image: absoluteUrl('/og-image.png'),
  priceRange: '€€',
  address: {
    streetAddress: 'Anniņas',
    addressLocality: 'Tomes pagasts',
    addressRegion: 'Ogres novads',
    postalCode: 'LV-5020',
    addressCountry: 'LV',
  },
  geo: {
    latitude: 56.748,
    longitude: 24.652,
  },
  hasMap:
    'https://maps.google.com/?q=Anni%C5%86as,+Tomes+pagasts,+Ogres+novads,+LV-5020,+Latvia',
  sameAs: [
    'https://www.facebook.com/Oskvidcinematography/?locale=lv_LV',
    'https://www.instagram.com/osk_vid/',
    'https://www.youtube.com/@OskarsAndersons',
    'https://lv.linkedin.com/in/oskvid',
  ],
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '15:00',
    },
  ],
  serviceTypes: [
    'Kāzu videogrāfija',
    'Reklāmas video',
    'Pasākumu videogrāfija',
    'Komerciālā video producēšana',
  ],
  areaServed: [
    { name: 'Latvia', type: 'Country' as const },
    { name: 'Rīga', type: 'City' as const },
    { name: 'Ogres novads', type: 'AdministrativeArea' as const },
  ],
  offerCatalog: [
    'Kāzu videogrāfija',
    'Reklāmas video',
    'Pasākumu videogrāfija',
    'Komerciālā video producēšana',
  ],
} as const

export const DEFAULT_OG_IMAGE = '/og-image.png'

export const SITE_KEYWORDS = [
  'video producēšana Latvijā',
  'kāzu videogrāfija',
  'reklāmas video',
  'pasākumu videogrāfija',
  'kinematogrāfiski video',
  'profesionāls videogrāfs',
  'video montāžas pakalpojumi',
  'korporatīvie video',
  'komerciālā video producēšana',
] as const
