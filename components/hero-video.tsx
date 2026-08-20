'use client'
import { useEffect, useState, useRef } from 'react'

interface HeroVideoProps {
   contentKey?: string
   fallback?: string
   className?: string
}

export default function HeroVideo({
   contentKey,
   fallback = '/images/videographer-sunset.jpeg',
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

   useEffect(() => {
      const applySrc = (next: string) => {
         const normalized =
            next.startsWith('/') || next.startsWith('data:') || next.startsWith('http')
               ? next
               : `/${next}`
         if (normalized !== currentUrlRef.current) {
            currentUrlRef.current = normalized
            setIsReady(false)
            setSrc(normalized)
         }
      }

      const updateMedia = () => {
         const saved = contentKey
            ? localStorage.getItem(`content_${contentKey}`)
            : null
         applySrc(saved || fallback)
      }

      updateMedia()
      window.addEventListener('storage', updateMedia)
      window.addEventListener('contentUpdated', updateMedia)
      window.addEventListener('cmsContentUpdated', updateMedia)
      const interval = setInterval(updateMedia, 1000)
      return () => {
         window.removeEventListener('storage', updateMedia)
         window.removeEventListener('contentUpdated', updateMedia)
         window.removeEventListener('cmsContentUpdated', updateMedia)
         clearInterval(interval)
      }
   }, [contentKey, fallback])

   if (!src) return null

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
               preload="auto"
               src={src}
               onCanPlay={() => setIsReady(true)}
               onError={() => {
                  if (src !== fallback) {
                     currentUrlRef.current = fallback
                     setIsReady(false)
                     setSrc(fallback)
                  }
               }}
            />
         ) : (
            <img
               key={src}
               src={src}
               alt="Hero background"
               className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
               onLoad={() => setIsReady(true)}
               onError={() => {
                  if (src !== fallback) {
                     currentUrlRef.current = fallback
                     setIsReady(false)
                     setSrc(fallback)
                  }
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
