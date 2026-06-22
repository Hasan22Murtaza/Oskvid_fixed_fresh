"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import PortfolioGrid from "@/components/portfolio-grid"
import { useState, useEffect } from "react"
import { DynamicContent, DynamicImage } from "@/components/dynamic-content"
import {
  AgencyButton,
  BulletDots,
  Eyebrow,
  GradientText,
  Marquee,
} from "@/components/agency/agency-ui"

export default function PortfolioPage() {
  const { t } = useLanguage()
  const [refreshKey, setRefreshKey] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Get content directly from localStorage like PortfolioGrid does
  const getContent = (key: string, fallback: string) => {
    if (typeof window === "undefined") return fallback
    return localStorage.getItem(key) || fallback
  }

  // Listen for content updates like PortfolioGrid does
  useEffect(() => {
    const handleContentUpdate = () => {
      console.log("Portfolio page content updated")
      setRefreshKey(prev => prev + 1)
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key && event.key.startsWith("content_portfolio")) {
        handleContentUpdate()
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("contentUpdated", handleContentUpdate)
      window.addEventListener("storage", handleStorageChange)
    }

    return () => {
      if (typeof window !== "undefined") {
        try {
          window.removeEventListener("contentUpdated", handleContentUpdate)
          window.removeEventListener("storage", handleStorageChange)
        } catch (error) {
          console.warn("Error removing event listeners:", error)
        }
      }
    }
  }, [])

  const categoryCards = [
    {
      href: "/portfolio/kazu-video-latvija",
      img: getContent("content_portfolioWeddingImage", "/images/wedding-couple-church.jpeg"),
      titleKey: "portfolioWeddingsTitle",
      titleFallback: "Kāzu Filmas",
      tag: "Kāzas",
    },
    {
      href: "/portfolio/reklamas-video",
      img: getContent("content_portfolioPromoImage", "/images/promotional-production.jpeg"),
      titleKey: "portfolioPromoTitle",
      titleFallback: "Reklāmas Video",
      tag: "Reklāma",
    },
  ]

  return (
    <div className="pb-20 pt-24">
      {/* Agency banner */}
      <section className="px-3 sm:px-5">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-6 pb-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Eyebrow>Portfolio</Eyebrow>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                <DynamicContent contentKey="portfolioTitle" fallback="Mūsu projekti" as="span" />
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:pb-2 lg:pl-6"
            >
              <p className="text-lg text-gray-700">
                Apskati dažus no mūsu <GradientText>jaunākajiem darbiem</GradientText> — no
                kāzām līdz uzņēmumu reklāmām.
              </p>
              <div className="mt-5">
                <AgencyButton href="/oskvid-kontakti">Sāc savu projektu</AgencyButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee keyword strip */}
      <section className="py-8">
        <div className="bg-gradient-to-r from-[#cc5339] to-[#a23d28] py-2 text-white">
          <Marquee
            items={["Kāzas", "Reklāma", "Pasākumi", "Korporatīvie video", "Drons", "Montāža"].map(
              (w) => (
                <span key={w}>{w}</span>
              ),
            )}
          />
        </div>
      </section>

      <div className="container mx-auto max-w-8xl px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Interactive Portfolio Grid with YouTube Videos */}
        <PortfolioGrid />

        <div className="flex justify-center pb-6 pt-4">
          <BulletDots size="lg" />
        </div>
        <h2 className="mb-10 text-center font-display text-3xl font-semibold text-gray-900 sm:text-4xl">
          Kategorijas
        </h2>

        <div
          key={`${refreshKey}-${mounted}`}
          className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
        >
          {categoryCards.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
              className="group cursor-pointer"
            >
              <Link href={card.href} className="block">
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={card.img}
                    alt={card.titleFallback}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#a23d28]">
                    {card.tag}
                  </span>
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
                    <h3 className="font-display text-2xl font-semibold">
                      <DynamicContent contentKey={card.titleKey} fallback={card.titleFallback} as="span" />
                    </h3>
                    <span className="text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      VAIRĀK INFO →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
