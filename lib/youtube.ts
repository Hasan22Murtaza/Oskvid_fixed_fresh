export function extractYouTubeId(url: string): string {
   if (!url) return ''

   const trimmed = url.trim()
   if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed

   const patterns = [
      /(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /[?&]v=([a-zA-Z0-9_-]{11})/,
   ]

   for (const pattern of patterns) {
      const match = trimmed.match(pattern)
      if (match?.[1]) return match[1]
   }

   return ''
}

export function getYouTubeThumbnailUrl(videoUrl: string): string {
   const id = extractYouTubeId(videoUrl)
   if (!id) return '/placeholder.svg'
   return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

export function getYouTubeEmbedSrc(
   videoUrlOrId: string,
   options?: { origin?: string; autoplay?: boolean },
): string {
   const id = extractYouTubeId(videoUrlOrId)
   if (!id) return ''

   const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      autoplay: options?.autoplay ? '1' : '0',
   })

   if (options?.origin) {
      params.set('origin', options.origin)
   }

   return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`
}
