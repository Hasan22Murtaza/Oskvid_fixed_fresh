'use client'

import { useEffect, useState } from 'react'
import { extractYouTubeId, getYouTubeEmbedSrc } from '@/lib/youtube'

type YouTubeEmbedProps = {
   url?: string
   videoId?: string
   title?: string
   className?: string
   autoplay?: boolean
}

export function YouTubeEmbed({
   url,
   videoId,
   title = 'YouTube video player',
   className = 'w-full h-full border-0',
   autoplay = false,
}: YouTubeEmbedProps) {
   const [origin, setOrigin] = useState('')

   useEffect(() => {
      setOrigin(window.location.origin)
   }, [])

   const id = videoId || extractYouTubeId(url || '')
   if (!id || !origin) {
      return <div className={className} aria-hidden />
   }

   return (
      <iframe
         src={getYouTubeEmbedSrc(id, { origin, autoplay })}
         title={title}
         className={className}
         allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
         allowFullScreen
         referrerPolicy='strict-origin-when-cross-origin'
      />
   )
}
