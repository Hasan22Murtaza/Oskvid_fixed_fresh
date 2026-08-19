'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/language-context'
import { DynamicContent } from '@/components/dynamic-content'
import { YouTubeEmbed } from '@/components/youtube-embed'

export default function WeddingsPage() {
   const { t } = useLanguage()
   const [videoData, setVideoData] = useState({
      featuredVideoUrl: '',
      video1Url: '',
      video2Url: '',
      video3Url: '',
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
      const featuredVideoTitle =
         localStorage.getItem('content_portfolioWeddingFeaturedVideoTitle') ||
         'Wedding showreel 2025'
      const video1Title =
         localStorage.getItem('content_portfolioWeddingVideo1Title') ||
         'Destination Wedding in Spain'
      const video1Description =
         localStorage.getItem('content_portfolioWeddingVideo1Description') ||
         'A beautiful destination wedding capturing the romantic moments of Laura and Lucas in the stunning Spanish countryside.'
      const video2Title =
         localStorage.getItem('content_portfolioWeddingVideo2Title') ||
         'Wedding Highlights'
      const video2Description =
         localStorage.getItem('content_portfolioWeddingVideo2Description') ||
         'A cinematic highlight reel showcasing the most emotional and beautiful moments of this special day.'
      const video3Title =
         localStorage.getItem('content_portfolioWeddingVideo3Title') ||
         'Wedding Film'
      const video3Description =
         localStorage.getItem('content_portfolioWeddingVideo3Description') ||
         'A complete wedding film telling the love story from preparation to celebration in artistic detail.'

      setContentData({
         featuredVideoTitle,
         video1Title,
         video1Description,
         video2Title,
         video2Description,
         video3Title,
         video3Description,
      })
   }

   // Handle content updates
   const handleContentUpdate = () => {
      console.log('🔄 Content update detected in weddings page!')
      // Reload video data
      const extractYouTubeId = (url: string): string => {
         if (!url) return ''
         const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /^([a-zA-Z0-9_-]{11})$/, // Direct YouTube ID
         ]
         for (const pattern of patterns) {
            const match = url.match(pattern)
            if (match) return match[1]
         }
         return url
      }

      const featuredUrl =
         localStorage.getItem('content_portfolioWeddingFeaturedVideoUrl') || ''
      const video1Url =
         localStorage.getItem('content_portfolioWeddingVideo1Url') || ''
      const video2Url =
         localStorage.getItem('content_portfolioWeddingVideo2Url') || ''
      const video3Url =
         localStorage.getItem('content_portfolioWeddingVideo3Url') || ''

      setVideoData({
         featuredVideoUrl:
            featuredUrl && featuredUrl.includes('embed')
               ? featuredUrl
               : featuredUrl
                 ? `https://www.youtube.com/embed/${extractYouTubeId(featuredUrl)}`
                 : '',
         video1Url:
            video1Url && video1Url.includes('embed')
               ? video1Url
               : video1Url
                 ? `https://www.youtube.com/embed/${extractYouTubeId(video1Url)}`
                 : '',
         video2Url:
            video2Url && video2Url.includes('embed')
               ? video2Url
               : video2Url
                 ? `https://www.youtube.com/embed/${extractYouTubeId(video2Url)}`
                 : '',
         video3Url:
            video3Url && video3Url.includes('embed')
               ? video3Url
               : video3Url
                 ? `https://www.youtube.com/embed/${extractYouTubeId(video3Url)}`
                 : '',
      })

      loadContentData()

      // Reload page title and right side text
      const savedPageTitle = localStorage.getItem(
         'content_portfolioWeddingsTitle',
      )
      if (savedPageTitle) {
         setPageTitle(savedPageTitle)
      }

      const savedRightSideText = localStorage.getItem(
         'content_portfolioWeddingsPageRightText',
      )
      if (savedRightSideText) {
         setRightSideText(savedRightSideText)
      }
   }

   useEffect(() => {
      // Load video data from admin CMS
      const loadVideoData = () => {
         const extractYouTubeId = (url: string): string => {
            if (!url) return ''
            const patterns = [
               /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
               /^([a-zA-Z0-9_-]{11})$/, // Direct YouTube ID
            ]
            for (const pattern of patterns) {
               const match = url.match(pattern)
               if (match) return match[1]
            }
            return url
         }

         const featuredUrl =
            localStorage.getItem('content_portfolioWeddingFeaturedVideoUrl') ||
            ''
         const video1Url =
            localStorage.getItem('content_portfolioWeddingVideo1Url') || ''
         const video2Url =
            localStorage.getItem('content_portfolioWeddingVideo2Url') || ''
         const video3Url =
            localStorage.getItem('content_portfolioWeddingVideo3Url') || ''

         setVideoData({
            featuredVideoUrl:
               featuredUrl && featuredUrl.includes('embed')
                  ? featuredUrl
                  : featuredUrl
                    ? `https://www.youtube.com/embed/${extractYouTubeId(featuredUrl)}`
                    : '',
            video1Url:
               video1Url && video1Url.includes('embed')
                  ? video1Url
                  : video1Url
                    ? `https://www.youtube.com/embed/${extractYouTubeId(video1Url)}`
                    : '',
            video2Url:
               video2Url && video2Url.includes('embed')
                  ? video2Url
                  : video2Url
                    ? `https://www.youtube.com/embed/${extractYouTubeId(video2Url)}`
                    : '',
            video3Url:
               video3Url && video3Url.includes('embed')
                  ? video3Url
                  : video3Url
                    ? `https://www.youtube.com/embed/${extractYouTubeId(video3Url)}`
                    : '',
         })
      }

      // Load right-side text content
      const savedRightSideText = localStorage.getItem(
         'content_portfolioWeddingsPageRightText',
      )
      if (savedRightSideText) {
         setRightSideText(savedRightSideText)
      }

      // Load page title from CMS
      const savedPageTitle = localStorage.getItem(
         'content_portfolioWeddingsTitle',
      )
      if (savedPageTitle) {
         setPageTitle(savedPageTitle)
      } else {
         // Fallback to translation if CMS value not set
         setPageTitle(t('portfolio.weddings.title'))
      }

      // Load video data and content data
      loadVideoData()
      loadContentData()

      // Add event listeners for content updates
      window.addEventListener('contentUpdated', handleContentUpdate)
      window.addEventListener('storage', handleContentUpdate)

      return () => {
         window.removeEventListener('contentUpdated', handleContentUpdate)
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
