'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Play, X } from 'lucide-react'
import {
   extractYouTubeId,
   getYouTubeEmbedSrc,
   getYouTubeThumbnailUrl,
} from '@/lib/youtube'
import { cn } from '@/lib/utils'

type YouTubeEmbedProps = {
   url?: string
   videoId?: string
   title?: string
   description?: string
   className?: string
   autoplay?: boolean
   clickToPlay?: boolean
}

export function YouTubeEmbed({
   url,
   videoId,
   title = 'YouTube video player',
   description,
   className = 'w-full h-full border-0',
   autoplay = false,
   clickToPlay = false,
}: YouTubeEmbedProps) {
   const [origin, setOrigin] = useState('')
   const [isPlaying, setIsPlaying] = useState(false)

   useEffect(() => {
      setOrigin(window.location.origin)
   }, [])

   useEffect(() => {
      if (!clickToPlay || !isPlaying) return

      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      const onKeyDown = (event: KeyboardEvent) => {
         if (event.key === 'Escape') setIsPlaying(false)
      }
      document.addEventListener('keydown', onKeyDown)

      return () => {
         document.body.style.overflow = previousOverflow
         document.removeEventListener('keydown', onKeyDown)
      }
   }, [clickToPlay, isPlaying])

   const id = videoId || extractYouTubeId(url || '')
   if (!id) {
      return <div className={className} aria-hidden />
   }

   const player = origin ? (
      <iframe
         src={getYouTubeEmbedSrc(id, {
            origin,
            autoplay: clickToPlay || autoplay,
         })}
         title={title}
         className={clickToPlay ? 'h-full w-full border-0' : className}
         allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
         allowFullScreen
         referrerPolicy='strict-origin-when-cross-origin'
      />
   ) : (
      <div className={clickToPlay ? 'h-full w-full' : className} aria-hidden />
   )

   if (!clickToPlay) {
      return player
   }

   const showLabel = title && title !== 'YouTube video player'

   return (
      <>
         <button
            type='button'
            onClick={() => setIsPlaying(true)}
            className={cn(
               'relative block overflow-hidden rounded-lg bg-neutral-800 shadow-lg cursor-pointer group',
               className,
            )}
            aria-label={showLabel ? `Play ${title}` : 'Play video'}
         >
            <img
               src={getYouTubeThumbnailUrl(id)}
               alt={title}
               className='absolute inset-0 h-full w-full object-cover'
            />
            <div className='absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all'>
               <div className='bg-white/90 group-hover:bg-white rounded-full p-4 transition-all group-hover:scale-110'>
                  <Play className='h-8 w-8 text-black ml-1' />
               </div>
            </div>
            {showLabel && (
               <div className='absolute bottom-4 left-4 right-4'>
                  <h3 className='text-white font-semibold text-lg drop-shadow-lg truncate'>
                     {title}
                  </h3>
               </div>
            )}
         </button>

         {isPlaying &&
            createPortal(
               <div
                  className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'
                  onClick={() => setIsPlaying(false)}
               >
                  <div
                     className='bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 max-w-5xl w-full max-h-[90vh] overflow-y-auto'
                     onClick={(event) => event.stopPropagation()}
                  >
                     <div className='flex justify-end p-4'>
                        <button
                           type='button'
                           onClick={() => setIsPlaying(false)}
                           className='text-gray-600 hover:text-[#cc5339] hover:bg-orange-50 rounded-md p-2'
                           aria-label='Close video'
                        >
                           <X className='w-6 h-6' />
                        </button>
                     </div>
                     <div className='px-6 pb-6'>
                        <div className='relative aspect-video mb-6 rounded-xl overflow-hidden bg-black shadow-lg'>
                           {player}
                        </div>
                        {showLabel && (
                           <h3 className='text-2xl font-bold text-gray-800'>
                              {title}
                           </h3>
                        )}
                        {description ? (
                           <p className='mt-3 text-gray-600 leading-relaxed whitespace-pre-wrap'>
                              {description}
                           </p>
                        ) : null}
                     </div>
                  </div>
               </div>,
               document.body,
            )}
      </>
   )
}
