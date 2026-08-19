'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DynamicContent } from '@/components/dynamic-content'
import { YouTubeEmbed } from '@/components/youtube-embed'

const WEDDING_VIDEO_DEFAULTS = {
   featuredVideoUrl: 'https://www.youtube.com/embed/8a_XpfUVUP8',
   featuredVideoTitle: 'Kāzu apskats 2025',
   video1Url: 'https://youtu.be/oWJXGnwS9nQ',
   video1Title: 'Oksana un Ruslans  Tīzeris',
   video2Url: 'https://youtu.be/-y7btCaSARM',
   video2Title: 'Kāzas Igates Pilī',
   video3Url: 'https://youtu.be/GmWyD6va0gk',
   video3Title: 'Wedding Film',
}

function readCmsValue(key: string, fallback: string): string {
   if (typeof window === 'undefined') return fallback
   try {
      return localStorage.getItem(`content_${key}`) || fallback
   } catch {
      return fallback
   }
}

export default function WeddingsPage() {
   const [videoData, setVideoData] = useState({
      featuredVideoUrl: WEDDING_VIDEO_DEFAULTS.featuredVideoUrl,
      video1Url: WEDDING_VIDEO_DEFAULTS.video1Url,
      video2Url: WEDDING_VIDEO_DEFAULTS.video2Url,
      video3Url: WEDDING_VIDEO_DEFAULTS.video3Url,
   })

   const [contentData, setContentData] = useState({
      featuredVideoTitle: 'Wedding showreel 2025',
      video1Title: 'Destination Wedding in Spain',
      video1Description:
         'A beautiful destination wedding capturing the romantic moments of Laura and Lucas in the stunning Spanish countryside.',
      video2Title: 'Wedding Highlights',
      video2Description:
         'A cinematic highlight reel showcasing the most emotional and beautiful moments of this special day.',
      video3Title: 'Wedding Film',
      video3Description:
         'A complete wedding film telling the love story from preparation to celebration in artistic detail.',
   })

   const [rightSideText, setRightSideText] = useState(
      'Mūsu kāzu video pakalpojumi ietver pilnu kāzu dienas dokumentēšanu - no sagatavošanās mirkļiem līdz vēlām vakara svinībām. Mēs izmantojam profesionālu aprīkojumu un kinematogrāfiskās tehnikas, lai radītu māksliniecisku un emocionālu stāstījumu par jūsu īpašo dienu.',
   )

   const [pageTitle, setPageTitle] = useState('Kāzu Filmas')

   // Extract YouTube ID from URL if needed
   // Load content data from admin CMS
   const loadContentData = () => {
      setContentData({
         featuredVideoTitle: readCmsValue(
            'portfolioWeddingFeaturedVideoTitle',
            WEDDING_VIDEO_DEFAULTS.featuredVideoTitle,
         ),
         video1Title: readCmsValue(
            'portfolioWeddingVideo1Title',
            WEDDING_VIDEO_DEFAULTS.video1Title,
         ),
         video1Description: readCmsValue(
            'portfolioWeddingVideo1Description',
            contentData.video1Description,
         ),
         video2Title: readCmsValue(
            'portfolioWeddingVideo2Title',
            WEDDING_VIDEO_DEFAULTS.video2Title,
         ),
         video2Description: readCmsValue(
            'portfolioWeddingVideo2Description',
            contentData.video2Description,
         ),
         video3Title: readCmsValue(
            'portfolioWeddingVideo3Title',
            WEDDING_VIDEO_DEFAULTS.video3Title,
         ),
         video3Description: readCmsValue(
            'portfolioWeddingVideo3Description',
            contentData.video3Description,
         ),
      })
   }

   const applyVideoUrls = (urls: {
      featuredVideoUrl?: string
      video1Url?: string
      video2Url?: string
      video3Url?: string
   }) => {
      setVideoData({
         featuredVideoUrl:
            urls.featuredVideoUrl || WEDDING_VIDEO_DEFAULTS.featuredVideoUrl,
         video1Url: urls.video1Url || WEDDING_VIDEO_DEFAULTS.video1Url,
         video2Url: urls.video2Url || WEDDING_VIDEO_DEFAULTS.video2Url,
         video3Url: urls.video3Url || WEDDING_VIDEO_DEFAULTS.video3Url,
      })
   }

   const loadVideoData = () => {
      applyVideoUrls({
         featuredVideoUrl: readCmsValue(
            'portfolioWeddingFeaturedVideoUrl',
            WEDDING_VIDEO_DEFAULTS.featuredVideoUrl,
         ),
         video1Url: readCmsValue(
            'portfolioWeddingVideo1Url',
            WEDDING_VIDEO_DEFAULTS.video1Url,
         ),
         video2Url: readCmsValue(
            'portfolioWeddingVideo2Url',
            WEDDING_VIDEO_DEFAULTS.video2Url,
         ),
         video3Url: readCmsValue(
            'portfolioWeddingVideo3Url',
            WEDDING_VIDEO_DEFAULTS.video3Url,
         ),
      })
   }

   const handleContentUpdate = () => {
      loadVideoData()
      loadContentData()

      const savedPageTitle = readCmsValue(
         'portfolioWeddingsTitle',
         '',
      )
      if (savedPageTitle) setPageTitle(savedPageTitle)

      const savedRightSideText = readCmsValue(
         'portfolioWeddingsPageRightText',
         '',
      )
      if (savedRightSideText) setRightSideText(savedRightSideText)
   }

   useEffect(() => {
      handleContentUpdate()

      const loadFromApi = async () => {
         try {
            const response = await fetch(
               '/api/content?page=simple-cms&language=lv',
            )
            if (!response.ok) return
            const data = await response.json()
            const content = data.content || {}
            applyVideoUrls({
               featuredVideoUrl: content.portfolioWeddingFeaturedVideoUrl,
               video1Url: content.portfolioWeddingVideo1Url,
               video2Url: content.portfolioWeddingVideo2Url,
               video3Url: content.portfolioWeddingVideo3Url,
            })
            setContentData((prev) => ({
               featuredVideoTitle:
                  content.portfolioWeddingFeaturedVideoTitle ||
                  prev.featuredVideoTitle,
               video1Title:
                  content.portfolioWeddingVideo1Title || prev.video1Title,
               video1Description:
                  content.portfolioWeddingVideo1Description ||
                  prev.video1Description,
               video2Title:
                  content.portfolioWeddingVideo2Title || prev.video2Title,
               video2Description:
                  content.portfolioWeddingVideo2Description ||
                  prev.video2Description,
               video3Title:
                  content.portfolioWeddingVideo3Title || prev.video3Title,
               video3Description:
                  content.portfolioWeddingVideo3Description ||
                  prev.video3Description,
            }))
            if (content.portfolioWeddingsTitle) {
               setPageTitle(content.portfolioWeddingsTitle)
            }
            if (content.portfolioWeddingsPageRightText) {
               setRightSideText(content.portfolioWeddingsPageRightText)
            }
         } catch {
            // Keep published defaults if the API is unavailable.
         }
      }

      loadFromApi()

      window.addEventListener('contentUpdated', handleContentUpdate)
      window.addEventListener('cmsContentUpdated', handleContentUpdate)
      window.addEventListener('storage', handleContentUpdate)

      return () => {
         window.removeEventListener('contentUpdated', handleContentUpdate)
         window.removeEventListener('cmsContentUpdated', handleContentUpdate)
         window.removeEventListener('storage', handleContentUpdate)
      }
   }, [])

   // Galvenais video
   const featuredVideo = {
      id: 0,
      title: contentData.featuredVideoTitle,
      videoUrl: videoData.featuredVideoUrl,
   }

   // Pārējie video
   const weddingVideos = [
      {
         id: 1,
         title: contentData.video1Title,
         videoUrl: videoData.video1Url,
      },
      {
         id: 2,
         title: contentData.video2Title,
         videoUrl: videoData.video2Url,
      },
      {
         id: 3,
         title: contentData.video3Title,
         videoUrl: videoData.video3Url,
      },
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

            {/* Featured Wedding Video Section */}
            <motion.div
               initial={{ opacity: 1, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className='mb-16'
            >
               <div className='grid grid-cols-1 px-8 lg:grid-cols-2 gap-8 items-center'>
                  <YouTubeEmbed
                     url={featuredVideo.videoUrl}
                     title={featuredVideo.title}
                     clickToPlay
                     className='aspect-video w-full border-0'
                  />
                  <div className='space-y-4'>
                     <div className='prose prose-lg' style={{ 
                       whiteSpace: 'pre-wrap', 
                       wordBreak: 'break-word',
                       fontFamily: 'inherit'
                     }}>
                        <DynamicContent
                           contentKey={'portfolioWeddingsPageRightText'}
                           fallback={rightSideText}
                        />
                     </div>
                  </div>
               </div>
            </motion.div>

            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'>
               {weddingVideos.map((video, index) => (
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
