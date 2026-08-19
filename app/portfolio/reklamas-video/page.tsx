'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { YouTubeEmbed } from '@/components/youtube-embed'

const PROMO_VIDEO_DEFAULTS = {
   featuredVideoUrl: 'https://www.youtube.com/embed/1Y47gZu8GNs',
   featuredVideoTitle: 'Maratonu Rokzvaigzne',
   video1Url: 'https://youtu.be/cB7tR9HuTcY',
   video1Title: 'Nordic Homes',
   video2Url: 'https://youtu.be/-J8WlbZP7AQ',
   video2Title: 'Cakes n Bakes Lidosta',
   video3Url: 'https://youtu.be/M0RgMD6B200',
   video3Title: 'Adventure Ride',
   pageTitle: 'Pasākumu video | Osk Vid',
   rightSideText:
      'Mūsu 2025. gada reklāmas video demonstrācijas video, kurā redzami efektīvākie un radošākie reklāmas video, ko esam ražojuši gada laikā. Profesionāla reklāmas video ražošana, kas palīdz uzņēmumiem pārdot savus produktus un pakalpojumus efektīvi un radoši.',
}

function readCmsValue(key: string, fallback: string): string {
   if (typeof window === 'undefined') return fallback
   try {
      return localStorage.getItem(`content_${key}`) || fallback
   } catch {
      return fallback
   }
}

export default function PromoPage() {
   const [pageTitle, setPageTitle] = useState(PROMO_VIDEO_DEFAULTS.pageTitle)
   const [rightSideText, setRightSideText] = useState(
      PROMO_VIDEO_DEFAULTS.rightSideText,
   )
   const [videoData, setVideoData] = useState({
      featuredVideoUrl: PROMO_VIDEO_DEFAULTS.featuredVideoUrl,
      featuredVideoTitle: PROMO_VIDEO_DEFAULTS.featuredVideoTitle,
      video1Url: PROMO_VIDEO_DEFAULTS.video1Url,
      video2Url: PROMO_VIDEO_DEFAULTS.video2Url,
      video3Url: PROMO_VIDEO_DEFAULTS.video3Url,
   })
   const [video1Title, setVideo1Title] = useState(PROMO_VIDEO_DEFAULTS.video1Title)
   const [video2Title, setVideo2Title] = useState(PROMO_VIDEO_DEFAULTS.video2Title)
   const [video3Title, setVideo3Title] = useState(PROMO_VIDEO_DEFAULTS.video3Title)

   const applyVideoUrls = (urls: {
      featuredVideoUrl?: string
      featuredVideoTitle?: string
      video1Url?: string
      video2Url?: string
      video3Url?: string
   }) => {
      setVideoData({
         featuredVideoUrl:
            urls.featuredVideoUrl || PROMO_VIDEO_DEFAULTS.featuredVideoUrl,
         featuredVideoTitle:
            urls.featuredVideoTitle || PROMO_VIDEO_DEFAULTS.featuredVideoTitle,
         video1Url: urls.video1Url || PROMO_VIDEO_DEFAULTS.video1Url,
         video2Url: urls.video2Url || PROMO_VIDEO_DEFAULTS.video2Url,
         video3Url: urls.video3Url || PROMO_VIDEO_DEFAULTS.video3Url,
      })
   }

   const loadFromStorage = () => {
      applyVideoUrls({
         featuredVideoUrl: readCmsValue(
            'portfolioPromoFeaturedVideoUrl',
            PROMO_VIDEO_DEFAULTS.featuredVideoUrl,
         ),
         featuredVideoTitle: readCmsValue(
            'portfolioPromoFeaturedVideoTitle',
            PROMO_VIDEO_DEFAULTS.featuredVideoTitle,
         ),
         video1Url: readCmsValue(
            'portfolioPromoVideo1Url',
            PROMO_VIDEO_DEFAULTS.video1Url,
         ),
         video2Url: readCmsValue(
            'portfolioPromoVideo2Url',
            PROMO_VIDEO_DEFAULTS.video2Url,
         ),
         video3Url: readCmsValue(
            'portfolioPromoVideo3Url',
            PROMO_VIDEO_DEFAULTS.video3Url,
         ),
      })
      setVideo1Title(
         readCmsValue('portfolioPromoVideo1Title', PROMO_VIDEO_DEFAULTS.video1Title),
      )
      setVideo2Title(
         readCmsValue('portfolioPromoVideo2Title', PROMO_VIDEO_DEFAULTS.video2Title),
      )
      setVideo3Title(
         readCmsValue('portfolioPromoVideo3Title', PROMO_VIDEO_DEFAULTS.video3Title),
      )
      setPageTitle(
         readCmsValue('portfolioPromoTitle', PROMO_VIDEO_DEFAULTS.pageTitle),
      )
      setRightSideText(
         readCmsValue(
            'portfolioPromoPageRightText',
            PROMO_VIDEO_DEFAULTS.rightSideText,
         ),
      )
   }

   useEffect(() => {
      loadFromStorage()

      const loadFromApi = async () => {
         try {
            const response = await fetch(
               '/api/content?page=simple-cms&language=lv',
            )
            if (!response.ok) return
            const data = await response.json()
            const content = data.content || {}
            applyVideoUrls({
               featuredVideoUrl: content.portfolioPromoFeaturedVideoUrl,
               featuredVideoTitle: content.portfolioPromoFeaturedVideoTitle,
               video1Url: content.portfolioPromoVideo1Url,
               video2Url: content.portfolioPromoVideo2Url,
               video3Url: content.portfolioPromoVideo3Url,
            })
            if (content.portfolioPromoVideo1Title) {
               setVideo1Title(content.portfolioPromoVideo1Title)
            }
            if (content.portfolioPromoVideo2Title) {
               setVideo2Title(content.portfolioPromoVideo2Title)
            }
            if (content.portfolioPromoVideo3Title) {
               setVideo3Title(content.portfolioPromoVideo3Title)
            }
            if (content.portfolioPromoTitle) {
               setPageTitle(content.portfolioPromoTitle)
            }
            if (content.portfolioPromoPageRightText) {
               setRightSideText(content.portfolioPromoPageRightText)
            }
         } catch {
            // Keep published defaults if the API is unavailable.
         }
      }

      loadFromApi()

      window.addEventListener('contentUpdated', loadFromStorage)
      window.addEventListener('cmsContentUpdated', loadFromStorage)
      window.addEventListener('storage', loadFromStorage)

      return () => {
         window.removeEventListener('contentUpdated', loadFromStorage)
         window.removeEventListener('cmsContentUpdated', loadFromStorage)
         window.removeEventListener('storage', loadFromStorage)
      }
   }, [])

   const promoVideos = [
      { id: 1, title: video1Title, videoUrl: videoData.video1Url },
      { id: 2, title: video2Title, videoUrl: videoData.video2Url },
      { id: 3, title: video3Title, videoUrl: videoData.video3Url },
   ]

   return (
      <div className='pt-32 pb-20'>
         <div className='container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl'>
            <motion.div
               initial={{ opacity: 1, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className='text-center mb-8'
            >
               <h1 className='text-3xl md:text-4xl font-bold mb-6'>
                  {pageTitle}
               </h1>
               <div className='w-40 h-0.5 bg-primary mx-auto mb-8'></div>
            </motion.div>

            <motion.div
               initial={{ opacity: 1, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className='mb-16'
            >
               <div className='grid px-8 grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
                  <YouTubeEmbed
                     url={videoData.featuredVideoUrl}
                     title={videoData.featuredVideoTitle}
                     clickToPlay
                     className='aspect-video w-full border-0'
                  />
                  <div className='space-y-4 prose prose-lg'>
                     <p
                        style={{
                           whiteSpace: 'pre-wrap',
                           wordBreak: 'break-word',
                           fontFamily: 'inherit',
                        }}
                     >
                        {rightSideText}
                     </p>
                  </div>
               </div>
            </motion.div>

            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'>
               {promoVideos.map((video, index) => (
                  <motion.div
                     key={video.id}
                     initial={{ opacity: 1, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: index * 0.1 }}
                     className='overflow-hidden rounded-lg border bg-card shadow-sm'
                  >
                     <YouTubeEmbed
                        url={video.videoUrl}
                        title={video.title}
                        clickToPlay
                        className='aspect-video w-full border-0 rounded-none shadow-none'
                     />
                  </motion.div>
               ))}
            </div>
         </div>
      </div>
   )
}
