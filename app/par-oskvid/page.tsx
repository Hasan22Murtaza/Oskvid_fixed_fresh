"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import { DynamicImage, DynamicContent } from "@/components/dynamic-content"
import { ArrowUpRight } from "lucide-react"
import {
  AgencyButton,
  BulletDots,
  Eyebrow,
  GradientText,
} from "@/components/agency/agency-ui"

export default function AboutPage() {
  const [content, setContent] = useState({
    aboutPageTitle: "Par Oskvid",
    aboutPageBio:
      "Vajadzētu mazu biogrāfiju par Oskaru un sadarbības partneri, lai klientiem ir interesanti lasīt, kas tad ir Oskars, kas viņam patīk, kas nepatīk, kas aizrauj un protams klāt viņa bildes, lai veidotu uzticamību potenciālajiem klientiem un nerastos jautājumi, kas viņš ir.",
    aboutPageHeroTitle: "MĒS ESAM ŠEIT, LAI PALĪDZĒTU JUMS",
    aboutPageHeroSubtitle: "Jūsu radošo mediju partneris",
    aboutPageContactTitle: "Kontaktinformācija",
    aboutPageContactEmail: "info@oskvid.lv",
    aboutPageContactPhone: "+371 20 123 456",
    aboutPageContactAddress: "Rīga, Latvija",
    aboutPageContactHours: "P-Pk: 9:00 - 18:00",
    aboutPageHeroImage: "/images/videographer-studio.jpeg",
    aboutPageMainImage: "/images/videographer-studio.jpeg",
    aboutPageLogo: "/oskvid-logo-new.png",
    aboutPageClickableImage1: "/images/videographer-tower.jpeg",
    aboutPageClickableImage2: "/images/videographer-studio.jpeg",
    aboutPageClickableImage3: "/images/videographer-studio.jpeg",
  })

  useEffect(() => {
    // Load content from localStorage
    const keys = Object.keys(content)
    const loadedContent = { ...content }

    keys.forEach((key) => {
      const saved = localStorage.getItem(`content_${key}`)
      if (saved) {
        loadedContent[key as keyof typeof content] = saved
      }
    })

    setContent(loadedContent)

    // Listen for content updates
    const handleContentUpdate = (event: CustomEvent) => {
      const { key, value } = event.detail
      if (key.startsWith("aboutPage")) {
        setContent((prev) => ({ ...prev, [key]: value }))
      }
    }

    window.addEventListener("contentUpdated", handleContentUpdate as EventListener)
    window.addEventListener("imageUpdated", handleContentUpdate as EventListener)

    return () => {
      window.removeEventListener("contentUpdated", handleContentUpdate as EventListener)
      window.removeEventListener("imageUpdated", handleContentUpdate as EventListener)
    }
  }, [])

  const cards = [
    {
      href: "/video-filmesana",
      key: "aboutPageClickableImage1",
      fallback: "/images/videographer-tower.jpeg",
      title: "Pakalpojumi",
      subtitle: "Apskatīt mūsu darbus",
    },
    {
      href: "/kazu-blogs",
      key: "aboutPageClickableImage2",
      fallback: "/images/videographer-studio.jpeg",
      title: "Blogs",
      subtitle: "Uzzināt vairāk par komandu",
    },
    {
      href: "/oskvid-kontakti",
      key: "aboutPageClickableImage3",
      fallback: "/images/videographer-studio.jpeg",
      title: "Kontakti",
      subtitle: "Sazināties ar mums",
    },
  ]

  return (
    <div className="pb-20 pt-24">
      {/* Agency banner */}
      <section className="px-3 sm:px-5">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-6 pb-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 1, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Eyebrow>Par mums</Eyebrow>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                <DynamicContent contentKey="aboutPageTitle" fallback={content.aboutPageTitle} as="span" />
              </h1>
              <p className="mt-2 font-display text-2xl">
                <GradientText>
                  <DynamicContent
                    contentKey="aboutPageHeroSubtitle"
                    fallback={content.aboutPageHeroSubtitle}
                    as="span"
                  />
                </GradientText>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:pl-6"
            >
              <p
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                className="text-lg leading-relaxed text-gray-700"
              >
                <DynamicContent contentKey="aboutPageBio" fallback={content.aboutPageBio} as="span" />
              </p>
              <div className="mt-6">
                <AgencyButton href="/oskvid-kontakti">Sazināties</AgencyButton>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[320px] w-full overflow-hidden rounded-[20px] sm:h-[460px] lg:h-[560px]"
          >
            <DynamicImage
              contentKey="aboutPageHeroImage"
              alt="Video production behind the scenes"
              fill
              className="object-cover"
              objectFit="cover"
              fallback="/images/videographer-studio.jpeg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Clickable cards */}
      <section className="px-3 pt-16 sm:px-5">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-center pb-6">
            <BulletDots size="lg" />
          </div>
          <h2 className="mb-10 text-center font-display text-3xl font-semibold text-gray-900 sm:text-4xl">
            Iepazīsti <GradientText>Oskvid</GradientText>
          </h2>
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {cards.map((card) => (
              <Link key={card.href} href={card.href} className="group block">
                <div className="relative h-72 overflow-hidden rounded-3xl">
                  <DynamicImage
                    contentKey={card.key}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    objectFit="cover"
                    fallback={card.fallback}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                  <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#cc5339] transition-transform duration-300 group-hover:-rotate-12">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <div className="absolute inset-x-5 bottom-5 text-white">
                    <h3 className="font-display text-2xl font-semibold">{card.title}</h3>
                    <p className="text-white/85">{card.subtitle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
