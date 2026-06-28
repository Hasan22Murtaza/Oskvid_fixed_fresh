"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Two-dot bullet marker                                               */
/* ------------------------------------------------------------------ */
export function BulletDots({
  white = false,
  size = "md",
  filledFirst = true,
  className,
}: {
  white?: boolean
  size?: "md" | "lg" | "xl"
  filledFirst?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "agency-bullets",
        white && "is-white",
        size === "lg" && "is-lg",
        size === "xl" && "is-28",
        className,
      )}
      aria-hidden="true"
    >
      <span className={filledFirst ? "is-filled" : undefined} />
      <span className={!filledFirst ? "is-filled" : undefined} />
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Eyebrow label (bullets + small caps text)                           */
/* ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  white = false,
  center = false,
  className,
}: {
  children?: React.ReactNode
  white?: boolean
  center?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        center && "justify-center",
        className,
      )}
    >
      <BulletDots white={white} />
      {children ? (
        <span
          className={cn(
            "font-semibold tracking-wide",
            white ? "text-white" : "text-gray-900",
          )}
        >
          {children}
        </span>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Gradient text                                                       */
/* ------------------------------------------------------------------ */
export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <span className={cn("agency-gradient-text", className)}>{children}</span>
}

/* ------------------------------------------------------------------ */
/* Pill button with expanding circle + arrow                           */
/* ------------------------------------------------------------------ */
type AgencyButtonProps = {
  children: React.ReactNode
  href?: string
  variant?: "primary" | "outline" | "outline-white"
  className?: string
  onClick?: () => void
  type?: "button" | "submit"
}

export function AgencyButton({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  type = "button",
}: AgencyButtonProps) {
  const isPrimary = variant === "primary"
  const classes = cn(
    isPrimary ? "agency-btn" : "agency-btn-outline",
    variant === "outline-white" && "is-white",
    "touch-target",
    className,
  )

  const inner = (
    <>
      <span className="agency-btn__icon">
        <ArrowRight className="relative h-[18px] w-[18px]" />
      </span>
      {isPrimary ? <span className="agency-btn__circle" /> : null}
      <span className="relative z-[11]">{children}</span>
    </>
  )

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")
    if (external) {
      return (
        <a href={href} className={classes} onClick={onClick}>
          {inner}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {inner}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {inner}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Infinite marquee strip                                              */
/* ------------------------------------------------------------------ */
export function Marquee({
  items,
  duration = 40,
  className,
  itemClassName,
}: {
  items: React.ReactNode[]
  duration?: number
  className?: string
  itemClassName?: string
}) {
  const track = (
    <div
      className="agency-marquee__track"
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className={cn(
            "mx-6 inline-flex items-center gap-5 text-sm font-medium uppercase tracking-wide",
            itemClassName,
          )}
        >
          {item}
          <span aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={cn("agency-marquee", className)}>
      {track}
      {/* duplicate for seamless loop */}
      <div
        className="agency-marquee__track"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
        aria-hidden="true"
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={cn(
              "mx-6 inline-flex items-center gap-5 text-sm font-medium uppercase tracking-wide",
              itemClassName,
            )}
          >
            {item}
            <span aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
