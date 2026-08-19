'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { JSX } from 'react/jsx-runtime'

function readStorage(key: string): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(`content_${key}`)
  } catch {
    return null
  }
}

interface DynamicContentProps {
  contentKey: string
  fallback: string
  className?: string
  as?: keyof JSX.IntrinsicElements
}

interface DynamicImageProps {
  contentKey: string
  fallback: string
  alt: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  objectPosition?: string
  priority?: boolean
}

export function DynamicContent({
  contentKey,
  fallback,
  className = '',
  as: Component = 'span',
}: DynamicContentProps) {
  const [content, setContent] = useState(fallback)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = readStorage(contentKey)
    setContent(saved || fallback)
    setMounted(true)

    const handleContentUpdate = (event: CustomEvent) => {
      if (event.detail?.key === contentKey && event.detail.value != null) {
        setContent(event.detail.value)
        return
      }
      const updated = readStorage(contentKey)
      setContent(updated || fallback)
    }
    const handleStorageChange = () => {
      const updated = readStorage(contentKey)
      if (updated) setContent(updated)
    }

    window.addEventListener('contentUpdated' as any, handleContentUpdate)
    window.addEventListener('cmsContentUpdated', handleStorageChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('contentUpdated' as any, handleContentUpdate)
      window.removeEventListener('cmsContentUpdated', handleStorageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [contentKey, fallback])

  return (
    <Component className={className} suppressHydrationWarning>
      {mounted ? content : fallback}
    </Component>
  )
}

export function DynamicImage({
  contentKey,
  fallback,
  alt,
  className = '',
  width,
  height,
  fill,
  objectFit,
  priority = false,
  objectPosition,
}: DynamicImageProps) {
  const [imageSrc, setImageSrc] = useState(fallback)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const applySrc = (value?: string | null) => {
      const src = value || fallback
      if (!src) {
        setReady(true)
        return
      }

      const img = new window.Image()
      img.src = src
      img.onload = () => {
        setImageSrc(src)
        setReady(true)
      }
      img.onerror = () => {
        setImageSrc(fallback || '/placeholder.svg')
        setReady(true)
      }
    }

    applySrc(readStorage(contentKey))

    const handleImageUpdate = (event: CustomEvent) => {
      if (event.detail?.key === contentKey && event.detail.value) {
        applySrc(event.detail.value)
        return
      }
      applySrc(readStorage(contentKey))
    }
    const handleStorageChange = () => {
      applySrc(readStorage(contentKey))
    }

    window.addEventListener('imageUpdated' as any, handleImageUpdate)
    window.addEventListener('contentUpdated', handleStorageChange)
    window.addEventListener('cmsContentUpdated', handleStorageChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('imageUpdated' as any, handleImageUpdate)
      window.removeEventListener('contentUpdated', handleStorageChange)
      window.removeEventListener('cmsContentUpdated', handleStorageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [contentKey, fallback])

  const sizes = fill
    ? '(max-width: 475px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw'
    : '(max-width: 475px) 100vw, (max-width: 768px) 50vw, 33vw'

  if (!ready) {
    if (fill) {
      return (
        <div
          className={`image-mobile ${className}`}
          style={{ position: 'absolute', inset: 0, background: '#1a1a1a' }}
        />
      )
    }
    return (
      <div style={{ width: width || 400, height: height || 300, background: '#1a1a1a' }} />
    )
  }

  if (fill) {
    return (
      <Image
        src={imageSrc || fallback || '/placeholder.svg'}
        alt={alt}
        fill
        sizes={sizes}
        quality={85}
        priority={priority}
        loading='eager'
        className={`image-mobile ${className}`}
        style={{ objectFit: objectFit || 'cover', objectPosition: objectPosition || 'center' }}
      />
    )
  }

  return (
    <Image
      src={imageSrc || '/placeholder.svg'}
      alt={alt}
      width={width || 400}
      height={height || 300}
      sizes={sizes}
      quality={85}
      priority={priority}
      loading='eager'
      className={`image-mobile ${className}`}
      style={{ height: 'auto', maxWidth: '100%' }}
    />
  )
}