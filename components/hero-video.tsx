'use client'
import { useEffect, useState, useRef } from 'react'

interface HeroVideoProps {
   contentKey?: string
   fallback?: string
   className?: string
}

const DEFAULT_HERO_MEDIA =
   '/videos/homeHeroBackgroundImage-simple-cms-lv-1763580311317.mp4'

function normalizeMediaUrl(url: string, fallback: string): string {
   if (!url) return fallback
   if (
      url.startsWith('/') ||
      url.startsWith('data:') ||
      url.startsWith('http://') ||
      url.startsWith('https://')
   ) {
      return url
   }
   return `/${url}`
}

export default function HeroVideo({
   contentKey,
   fallback = DEFAULT_HERO_MEDIA,
   className = '',
}: HeroVideoProps) {
   const [src, setSrc] = useState<string>(fallback)
   const [isReady, setIsReady] = useState(false)
   const currentUrlRef = useRef<string | null>(null)

   const isVideo = (url: string): boolean => {
      if (!url) return false
      return (
         /\.(mp4|webm|mov|ogg)$/i.test(url) ||
         url.includes('/videos/') ||
         url.startsWith('data:video/')
      )
   }

   const applySrc = (value?: string | null) => {
      const next = normalizeMediaUrl(value || fallback, fallback)
      if (next !== currentUrlRef.current) {
         currentUrlRef.current = next
         setIsReady(false)
         setSrc(next)
      }
   }

   useEffect(() => {
      const updateMedia = () => {
         if (!contentKey) {
            applySrc(fallback)
            return
         }
         try {
            applySrc(localStorage.getItem(`content_${contentKey}`) || fallback)
         } catch {
            applySrc(fallback)
         }
      }

      updateMedia()

      const loadFromApi = async () => {
         if (!contentKey) return
         try {
            const response = await fetch(
               '/api/content?page=simple-cms&language=lv',
            )
            if (!response.ok) return
            const data = await response.json()
            const value = data.content?.[contentKey]
            if (typeof value === 'string' && value) {
               applySrc(value)
            }
         } catch {
            // Keep the published fallback if the API is unavailable.
         }
      }

      loadFromApi()

      window.addEventListener('storage', updateMedia)
      window.addEventListener('contentUpdated', updateMedia)
      window.addEventListener('cmsContentUpdated', updateMedia)

      return () => {
         window.removeEventListener('storage', updateMedia)
         window.removeEventListener('contentUpdated', updateMedia)
         window.removeEventListener('cmsContentUpdated', updateMedia)
      }
   }, [contentKey, fallback])

   return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
         {isVideo(src) ? (
            <video
               key={src}
               className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
               autoPlay
               muted
               loop
               playsInline
               preload='auto'
               src={src}
               onCanPlay={() => setIsReady(true)}
               onError={() => {
                  if (src !== fallback) applySrc(fallback)
                  else setIsReady(true)
               }}
            />
         ) : (
            <img
               key={src}
               src={src}
               alt='Hero background'
               className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
               onLoad={() => setIsReady(true)}
               onError={() => {
                  if (src !== fallback) applySrc(fallback)
                  else setIsReady(true)
               }}
            />
         )}
         <div
            className='absolute inset-0 bg-black/80 pointer-events-none'
            aria-hidden='true'
         />
      </div>
   )
}
