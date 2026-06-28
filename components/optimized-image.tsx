"use client"

import type React from "react"

import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  quality?: number
  sizes?: string
  className?: string
  style?: React.CSSProperties
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  quality = 85,
  sizes,
  className,
  style,
}: OptimizedImageProps) {
  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || (
    fill
      ? "(max-width: 475px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
      : "(max-width: 475px) 100vw, (max-width: 768px) 50vw, 33vw"
  )

  const mobileOptimizedClassName = `image-mobile ${className || ""}`

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      quality={quality}
      sizes={responsiveSizes}
      className={mobileOptimizedClassName}

    />
  )
}
