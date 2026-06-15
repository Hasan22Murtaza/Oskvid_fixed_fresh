import type { BreadcrumbItem } from './schema'

export type PageSeoConfig = {
  title: string
  description: string
  path: string
  keywords?: string[]
  breadcrumbs: BreadcrumbItem[]
}

export const PAGE_SEO: Record<string, PageSeoConfig> = {
  home: {
    title: 'Osk Vid - Video Filmēšanas Pakalpojumi Kāzām, Pasākumiem un Uzņēmumiem',
    description:
      'Mēs piedāvājam plašu video pakalpojumu klāstu, tostarp video filmēšanu, montāžu, producēšanu uzņēmumiem visā Latvijā.',
    path: '/',
    breadcrumbs: [{ name: 'Sākums', path: '/' }],
  },
  about: {
    title: 'Par mani',
    description:
      'Uzzini par Osk Vid komandas stāstu, radošo pieeju un uzticamiem partneriem, kas rada kino kvalitātes video Latvijā.',
    path: '/par-oskvid',
    breadcrumbs: [
      { name: 'Sākums', path: '/' },
      { name: 'Par mani', path: '/par-oskvid' },
    ],
  },
  services: {
    title: 'Pakalpojumi',
    description:
      'Pilna servisa video producēšana Latvijā – kāzas, reklāma, korporatīvie un pasākumu projekti ar profesionālu komandu.',
    path: '/video-filmesana',
    keywords: [
      'video filmēšanas pakalpojumi',
      'video producēšana Latvijā',
      'kāzu video pakalpojumi',
    ],
    breadcrumbs: [
      { name: 'Sākums', path: '/' },
      { name: 'Pakalpojumi', path: '/video-filmesana' },
    ],
  },
  portfolio: {
    title: 'Portfolio',
    description:
      'Ieskaties Osk Vid portfolio ar spilgtākajiem kāzu, promo, mūzikas un showcase video projektiem, kas stāsta klientu stāstus.',
    path: '/portfolio',
    breadcrumbs: [
      { name: 'Sākums', path: '/' },
      { name: 'Portfolio', path: '/portfolio' },
    ],
  },
  portfolioWeddings: {
    title: 'Kāzu video',
    description:
      'Emocionāli kāzu video ar dokumentālu sajūtu, radošu montāžu un kino kvalitāti katram pārim visā Latvijā.',
    path: '/portfolio/kazu-video-latvija',
    keywords: ['kāzu video Latvijā', 'kāzu videogrāfija', 'kāzu video producēšana'],
    breadcrumbs: [
      { name: 'Sākums', path: '/' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Kāzu video', path: '/portfolio/kazu-video-latvija' },
    ],
  },
  portfolioPromo: {
    title: 'Pasākumu video',
    description:
      'Korporatīvie un reklāmas video, kas skaidri izstāsta zīmola vērtību, piesaista auditoriju un stiprina pārdošanu.',
    path: '/portfolio/reklamas-video',
    keywords: ['reklāmas video', 'korporatīvie video', 'pasākumu video Latvijā'],
    breadcrumbs: [
      { name: 'Sākums', path: '/' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Pasākumu video', path: '/portfolio/reklamas-video' },
    ],
  },
  portfolioMusic: {
    title: 'Mūzikas video',
    description:
      'Mūzikas video producēšana ar dinamisku stāstījumu, gaismu dizainu un vizuāliem efektiem, kas pastiprina dziesmas emocijas.',
    path: '/portfolio/music',
    keywords: ['mūzikas video producēšana', 'mūzikas video Latvijā'],
    breadcrumbs: [
      { name: 'Sākums', path: '/' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Mūzikas video', path: '/portfolio/music' },
    ],
  },
  portfolioShowcase: {
    title: 'Showcase video',
    description:
      'Showcase un produktu demonstrāciju video, kas izceļ detaļas, struktūru un padara piedāvājumu saprotamu klientiem.',
    path: '/portfolio/showcase',
    keywords: ['showcase video', 'produktu video', 'demonstrācijas video'],
    breadcrumbs: [
      { name: 'Sākums', path: '/' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Showcase video', path: '/portfolio/showcase' },
    ],
  },
  reviews: {
    title: 'Atsauksmes',
    description:
      'Klientu atsauksmes par sadarbību ar Osk Vid – kvalitāte, radošums un uzticamība katrā video projektā.',
    path: '/atsauksmes',
    breadcrumbs: [
      { name: 'Sākums', path: '/' },
      { name: 'Atsauksmes', path: '/atsauksmes' },
    ],
  },
  blog: {
    title: 'Blogs',
    description:
      'Jaunākie Osk Vid projekti, ziņas un padomi par profesionālu video producēšanu un saturu Latvijā.',
    path: '/kazu-blogs',
    breadcrumbs: [
      { name: 'Sākums', path: '/' },
      { name: 'Blogs', path: '/kazu-blogs' },
    ],
  },
  contact: {
    title: 'Kontakti',
    description:
      'Sazinies ar Osk Vid, lai rezervētu filmēšanu vai saņemtu piedāvājumu – e-pasts, tālrunis un ērta kontaktforma.',
    path: '/oskvid-kontakti',
    keywords: ['Osk Vid kontakti', 'video producēšana kontakti Latvijā'],
    breadcrumbs: [
      { name: 'Sākums', path: '/' },
      { name: 'Kontakti', path: '/oskvid-kontakti' },
    ],
  },
}
