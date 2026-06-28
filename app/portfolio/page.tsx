"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AgencyButton,
  BulletDots,
  Eyebrow,
  GradientText,
  Marquee,
} from "@/components/agency/agency-ui"

/* ------------------------------------------------------------------ */
/* Types & helpers                                                     */
/* ------------------------------------------------------------------ */
interface PortfolioItem {
  id: string
  title: string
  category: string
  videoUrl: string
  thumbnail: string
  description: string
}

const extractYouTubeId = (url: string): string => {
  if (!url) return ""
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return url
}

const youTubeThumb = (url: string, fallback = "/placeholder.svg"): string => {
  const id = extractYouTubeId(url)
  if (id && id !== url) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  return fallback
}

/* ------------------------------------------------------------------ */
/* Source records – aggregated from every former portfolio page so     */
/* that NO record is missed. All keys stay CMS-compatible.             */
/* ------------------------------------------------------------------ */
type Source = {
  id: string
  titleKey: string
  titleFallback: string
  category: string
  urlKey: string
  urlFallback: string
  descKey?: string
  descFallback?: string
  imgFallback?: string
}

const SOURCES: Source[] = [
  /* --- Main showcase grid (6) ----------------------------------- */
  {
    id: "mg1",
    titleKey: "portfolioVideo1Title",
    titleFallback: "EVENT SHOWREEL 2024",
    category: "Pasākumu Filmas",
    urlKey: "portfolioVideo1Url",
    urlFallback: "https://www.youtube.com/watch?v=0pHoVAbAizc",
    descKey: "portfolioVideo1ShortDescription",
    descFallback:
      "Profesionāls pasākumu showreel, kas demonstrē OSK VID komandas prasmes dažādu pasākumu filmēšanā. Iekļauj labākos mirkļus no 2024. gada projektiem.",
    imgFallback: "/images/videographer-sunset.jpeg",
  },
  {
    id: "mg2",
    titleKey: "portfolioVideo2Title",
    titleFallback: "WEDDING SHOWREEL 2025",
    category: "Kāzu Filmas",
    urlKey: "portfolioVideo2Url",
    urlFallback: "https://www.youtube.com/watch?v=b60K5KRpeBQ",
    descKey: "portfolioVideo2ShortDescription",
    descFallback:
      "Emocionāls kāzu showreel ar skaistākajiem mirkļiem no kāzu filmēšanas. Parāda kinematogrāfisko pieeju un profesionālo kvalitāti kāzu video ražošanā.",
    imgFallback: "/images/wedding-couple-church.jpeg",
  },
  {
    id: "mg3",
    titleKey: "portfolioVideo3Title",
    titleFallback: "KREATĪVS PROJEKTS",
    category: "Māksliniecisks Saturs",
    urlKey: "portfolioVideo3Url",
    urlFallback: "https://www.youtube.com/watch?v=0a7bQ0wcJf8",
    descKey: "portfolioVideo3ShortDescription",
    descFallback:
      "Inovatīvs un kreatīvs video projekts, kas demonstrē unikālu vizuālo stilu un tehniskās prasmes. Eksperimentāla pieeja video ražošanā.",
    imgFallback: "/images/studio-purple-lighting.jpeg",
  },
  {
    id: "mg4",
    titleKey: "portfolioVideo4Title",
    titleFallback: "KOMERCIĀLA RAŽOŠANA",
    category: "Reklāmas Video",
    urlKey: "portfolioVideo4Url",
    urlFallback: "https://www.youtube.com/watch?v=FXIDrbybF74",
    descKey: "portfolioVideo4ShortDescription",
    descFallback:
      "Profesionāla komerciāla video ražošana ar augstu kvalitāti un radošu pieeju. Parāda spēju strādāt ar korporatīviem klientiem un radīt efektīvu saturu.",
    imgFallback: "/images/professional-camera.jpg",
  },
  {
    id: "mg5",
    titleKey: "portfolioVideo5Title",
    titleFallback: "DOKUMENTĀLĀ FILMA",
    category: "Dokumentāls Saturs",
    urlKey: "portfolioVideo5Url",
    urlFallback: "https://www.youtube.com/watch?v=AHy_pX_4fLU",
    descKey: "portfolioVideo5ShortDescription",
    descFallback:
      "Autentiska dokumentālā filma ar dziļu stāstījumu un profesionālu kinematogrāfiju. Demonstrē spēju strādāt ar sarežģītiem naratīviem.",
    imgFallback: "/images/camera-viewfinder.jpeg",
  },
  {
    id: "mg6",
    titleKey: "portfolioVideo6Title",
    titleFallback: "MŪZIKAS VIDEO",
    category: "Mūzikas Video",
    urlKey: "portfolioVideo6Url",
    urlFallback: "https://www.youtube.com/watch?v=Bp3V-cXNZJI",
    descKey: "portfolioVideo6ShortDescription",
    descFallback:
      "Dinamisks mūzikas video ar kreatīvu vizuālo stilu un profesionālu montāžu. Parāda spēju strādāt ar mūzikas industrijā un radīt vizuāli pievilcīgu saturu.",
    imgFallback: "/images/videographer-silhouette.jpeg",
  },

  /* --- Wedding page records (4) --------------------------------- */
  {
    id: "w0",
    titleKey: "portfolioWeddingFeaturedVideoTitle",
    titleFallback: "Wedding showreel 2025",
    category: "Kāzu Filmas",
    urlKey: "portfolioWeddingFeaturedVideoUrl",
    urlFallback: "",
    descKey: "portfolioWeddingsPageRightText",
    descFallback:
      "Mūsu kāzu video pakalpojumi ietver pilnu kāzu dienas dokumentēšanu — no sagatavošanās mirkļiem līdz vēlām vakara svinībām.",
  },
  {
    id: "w1",
    titleKey: "portfolioWeddingVideo1Title",
    titleFallback: "Destination Wedding in Spain",
    category: "Kāzu Filmas",
    urlKey: "portfolioWeddingVideo1Url",
    urlFallback: "",
    descKey: "portfolioWeddingVideo1Description",
    descFallback:
      "A beautiful destination wedding capturing the romantic moments of Laura and Lucas in the stunning Spanish countryside.",
  },
  {
    id: "w2",
    titleKey: "portfolioWeddingVideo2Title",
    titleFallback: "Wedding Highlights",
    category: "Kāzu Filmas",
    urlKey: "portfolioWeddingVideo2Url",
    urlFallback: "",
    descKey: "portfolioWeddingVideo2Description",
    descFallback:
      "A cinematic highlight reel showcasing the most emotional and beautiful moments of this special day.",
  },
  {
    id: "w3",
    titleKey: "portfolioWeddingVideo3Title",
    titleFallback: "Wedding Film",
    category: "Kāzu Filmas",
    urlKey: "portfolioWeddingVideo3Url",
    urlFallback: "",
    descKey: "portfolioWeddingVideo3Description",
    descFallback:
      "A complete wedding film telling the love story from preparation to celebration in artistic detail.",
  },

  /* --- Promotional page records (4) ----------------------------- */
  {
    id: "p0",
    titleKey: "portfolioPromoFeaturedVideoTitle",
    titleFallback: "Promotional showreel 2025",
    category: "Reklāmas Video",
    urlKey: "portfolioPromoFeaturedVideoUrl",
    urlFallback: "https://www.youtube.com/embed/0pHoVAbAizc",
    descKey: "portfolioPromoPageRightText",
    descFallback:
      "Mūsu 2025. gada reklāmas video demonstrācijas video, kurā redzami efektīvākie un radošākie reklāmas video, ko esam ražojuši gada laikā.",
  },
  {
    id: "p1",
    titleKey: "portfolioPromoVideo1Title",
    titleFallback: "Cakes n Bakes",
    category: "Reklāmas Video",
    urlKey: "portfolioPromoVideo1Url",
    urlFallback: "https://www.youtube.com/embed/gLUmzmxgkqw",
    descKey: "portfolioPromoVideo1Description",
    descFallback:
      "Professional promotional video showcasing artisanal bakery products with stunning visual storytelling and appetizing cinematography.",
  },
  {
    id: "p2",
    titleKey: "portfolioPromoVideo2Title",
    titleFallback: "Promotional Video",
    category: "Reklāmas Video",
    urlKey: "portfolioPromoVideo2Url",
    urlFallback: "https://www.youtube.com/embed/624qTZkRjoQ",
    descKey: "portfolioPromoVideo2Description",
    descFallback:
      "Dynamic commercial content designed to engage audiences and effectively communicate brand values through compelling visual narrative.",
  },
  {
    id: "p3",
    titleKey: "portfolioPromoVideo3Title",
    titleFallback: "Commercial Promo",
    category: "Reklāmas Video",
    urlKey: "portfolioPromoVideo3Url",
    urlFallback: "https://www.youtube.com/embed/INuvMNyhzeo",
    descKey: "portfolioPromoVideo3Description",
    descFallback:
      "High-impact commercial promotional video crafted to maximize brand exposure and drive customer engagement through creative storytelling.",
  },
]

const ALL = "Visi"

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [activeCategory, setActiveCategory] = useState<string>(ALL)
  const [selected, setSelected] = useState<PortfolioItem | null>(null)

  /* ---- Load all records from the CMS (localStorage) ----------- */
  useEffect(() => {
    const read = (key: string, fallback = "") =>
      (typeof window !== "undefined" && localStorage.getItem(`content_${key}`)) || fallback

    const buildItems = () => {
      const built: PortfolioItem[] = SOURCES.map((s) => {
        const videoUrl = read(s.urlKey, s.urlFallback)
        return {
          id: s.id,
          title: read(s.titleKey, s.titleFallback),
          category: s.category,
          videoUrl,
          thumbnail: youTubeThumb(videoUrl, s.imgFallback || "/placeholder.svg"),
          description: read(s.descKey || "", s.descFallback || ""),
        }
      }).filter((item) => item.videoUrl) // never show empty/broken records

      setItems(built)
    }

    buildItems()

    const onUpdate = () => buildItems()
    window.addEventListener("contentUpdated", onUpdate)
    window.addEventListener("storage", onUpdate)
    return () => {
      window.removeEventListener("contentUpdated", onUpdate)
      window.removeEventListener("storage", onUpdate)
    }
  }, [])

  /* ---- Derive category chips (with counts) -------------------- */
  const categories = useMemo(() => {
    const order: string[] = []
    const counts: Record<string, number> = {}
    items.forEach((it) => {
      if (!order.includes(it.category)) order.push(it.category)
      counts[it.category] = (counts[it.category] || 0) + 1
    })
    return [
      { name: ALL, count: items.length },
      ...order.map((name) => ({ name, count: counts[name] })),
    ]
  }, [items])

  const filtered = useMemo(
    () =>
      activeCategory === ALL
        ? items
        : items.filter((it) => it.category === activeCategory),
    [items, activeCategory],
  )

  /* ---- Lock body scroll while modal open ---------------------- */
  useEffect(() => {
    if (typeof document === "undefined") return
    document.body.style.overflow = selected ? "hidden" : "unset"
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null)
    }
    document.addEventListener("keydown", onEsc)
    return () => {
      document.body.style.overflow = "unset"
      document.removeEventListener("keydown", onEsc)
    }
  }, [selected])

  return (
    <div className="pb-24 pt-24">
      {/* ---------------------------------------------------------- */}
      {/* Hero banner                                                */}
      {/* ---------------------------------------------------------- */}
      <section className="px-3 sm:px-5">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-6 pb-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Eyebrow>Portfolio</Eyebrow>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Mūsu <GradientText>projekti</GradientText>
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:pb-2 lg:pl-6"
            >
              <p className="text-lg text-gray-700">
                Apskati visus mūsu{" "}
                <GradientText>jaunākos darbus</GradientText> vienkopus — filtrē
                pēc kategorijas no kāzām līdz uzņēmumu reklāmām.
              </p>
              <div className="mt-5">
                <AgencyButton href="/oskvid-kontakti">
                  Sāc savu projektu
                </AgencyButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <section className="py-8">
        <div className="bg-gradient-to-r from-[#cc5339] to-[#a23d28] py-2 text-white">
          <Marquee
            items={[
              "Kāzas",
              "Reklāma",
              "Pasākumi",
              "Korporatīvie video",
              "Drons",
              "Montāža",
              "Mūzika",
            ].map((w) => (
              <span key={w}>{w}</span>
            ))}
          />
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* -------------------------------------------------------- */}
        {/* Category filter bar                                      */}
        {/* -------------------------------------------------------- */}
        <div className="sticky top-20 z-30 -mx-4 mb-10 bg-white/80 px-4 py-4 backdrop-blur-md md:top-24">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.name
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveCategory(cat.name)}
                  className={`group relative rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-5 ${
                    isActive
                      ? "border-transparent bg-[#cc5339] text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#cc5339] hover:text-[#cc5339]"
                  }`}
                >
                  {cat.name}
                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-[#cc5339]/10 group-hover:text-[#cc5339]"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* Filterable video grid                                    */}
        {/* -------------------------------------------------------- */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: (index % 3) * 0.05 }}
                onClick={() => setSelected(item)}
                className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-900">
                  <Image
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Category chip */}
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#a23d28]">
                    {item.category}
                  </span>

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-1 h-7 w-7 text-[#cc5339]" />
                    </span>
                  </div>

                  {/* Title */}
                  <div className="absolute inset-x-4 bottom-4">
                    <h3 className="font-display text-lg font-semibold text-white drop-shadow-md line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            Šajā kategorijā pagaidām nav video.
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* Closing CTA                                              */}
        {/* -------------------------------------------------------- */}
        <div className="mt-20 flex flex-col items-center text-center">
          <BulletDots size="lg" />
          <h2 className="mt-4 font-display text-3xl font-semibold text-gray-900 sm:text-4xl">
            Vai gatavs radīt savu <GradientText>stāstu?</GradientText>
          </h2>
          <p className="mt-3 max-w-xl text-gray-700">
            Pastāsti par savu ideju — palīdzēsim to pārvērst aizraujošā video,
            kas atstāj iespaidu.
          </p>
          <div className="mt-6">
            <AgencyButton href="/oskvid-kontakti">Sazināties</AgencyButton>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Video modal                                                */}
      {/* ---------------------------------------------------------- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm "
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative top-9  flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end py-2 px-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelected(null)}
                  className="text-gray-600 hover:bg-orange-50 hover:text-[#cc5339]"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="overflow-y-auto px-4 pb-6">
                <div className="relative mb-6 aspect-video overflow-hidden rounded-xl bg-black shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(
                      selected.videoUrl,
                    )}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`}
                    title={selected.title}
                    className="h-full w-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold uppercase tracking-wide text-[#cc5339]">
                    {selected.category}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gray-800">
                    {selected.title}
                  </h3>
                  {selected.description && (
                    <p
                      className="leading-relaxed text-gray-600"
                      style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                    >
                      {selected.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
