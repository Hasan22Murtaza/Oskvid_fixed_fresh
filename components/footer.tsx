"use client"

import { usePathname } from "next/navigation"
import { Facebook, Youtube, Linkedin, Instagram, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { DynamicImage } from "@/components/dynamic-content"
import { AgencyButton, BulletDots, Eyebrow } from "@/components/agency/agency-ui"

const PARTNER_LOGO_FILES: Record<number, string> = {
  1: "rsu-logo-color.svg",
  2: "zanel-logo-color.svg",
  3: "skudras-metropole-logo-color.svg",
  4: "tv3-group-logo-color.svg",
  5: "marupes-novads-logo-color.svg",
  6: "hanseatic-logo-color.svg",
  7: "dole-kravas-auto-logo-color.svg",
  8: "compensa-logo-color.svg",
}

export default function Footer() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const isHome = pathname === "/"

  // Static partner structure - content will be loaded via DynamicContent
  const partners = [
    { id: 1, nameKey: "partner1Name", logoKey: "partner1Logo" },
    { id: 2, nameKey: "partner2Name", logoKey: "partner2Logo" },
    { id: 3, nameKey: "partner3Name", logoKey: "partner3Logo" },
    { id: 4, nameKey: "partner4Name", logoKey: "partner4Logo" },
    { id: 5, nameKey: "partner5Name", logoKey: "partner5Logo" },
    { id: 6, nameKey: "partner6Name", logoKey: "partner6Logo" },
    { id: 7, nameKey: "partner7Name", logoKey: "partner7Logo" },
    { id: 8, nameKey: "partner8Name", logoKey: "partner8Logo" },
  ]

  const partnerLogos = partners.map((partner) => (
    <span
      key={partner.id}
      className="relative inline-flex h-10 w-32 items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12 sm:w-40"
    >
      <DynamicImage
        contentKey={partner.logoKey}
        fallback={`/partners/${PARTNER_LOGO_FILES[partner.id]}`}
        alt={`Partner ${partner.id}`}
        fill
        className="object-contain"
        objectFit="contain"
      />
    </span>
  ))

  return (
    <footer className="relative bg-gray-50">
      {/* Call-to-action band (home page only) */}
      {isHome && (
        <div className="px-3 pb-12 sm:px-5">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#cc5339] to-[#a23d28] px-6 py-12 text-center sm:px-12 sm:py-16">
            <div className="flex justify-center pb-4">
              <BulletDots white size="lg" />
            </div>
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              Veidosim lieliskas lietas kopā
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Sazinies ar mums jau šodien, lai pārrunātu tava projekta iespējas.
              Tava ideja ir tikai viena ziņa attālumā.
            </p>
            <div className="mt-6 flex justify-center">
              <AgencyButton href="/oskvid-kontakti" variant="outline-white">
                Sazināties
              </AgencyButton>
            </div>
          </div>
        </div>
      )}

      {/* Partners / Clients */}
      <div className="border-b border-gray-200 py-12">
        <div className="container-mobile-padding mx-auto max-w-8xl">
          <div className="mb-8 flex flex-col items-center text-center">
            <Eyebrow center>Sadarbības partneri</Eyebrow>
            <h3 className="mt-3 font-display text-2xl font-semibold text-gray-900 sm:text-3xl">
              Mums uzticas
            </h3>
          </div>

          <div className="relative overflow-hidden">
            {/* edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-gray-50 to-transparent sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-gray-50 to-transparent sm:w-24" />

            <div className="agency-marquee">
              <div
                className="agency-marquee__track"
                style={{ ["--marquee-duration" as string]: "35s" }}
              >
                {partnerLogos.map((logo, i) => (
                  <span key={`a-${i}`} className="mx-8 flex flex-shrink-0 items-center sm:mx-10">
                    {logo}
                  </span>
                ))}
              </div>
              <div
                className="agency-marquee__track"
                aria-hidden="true"
                style={{ ["--marquee-duration" as string]: "35s" }}
              >
                {partnerLogos.map((logo, i) => (
                  <span key={`b-${i}`} className="mx-8 flex flex-shrink-0 items-center sm:mx-10">
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Content */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-semibold text-gray-900">Kontakti</h3>
              <div className="space-y-2">
                <a href="mailto:info@oskvid.com" className="flex items-center gap-2 text-gray-600 hover:text-[#cc5339] transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@oskvid.com</span>
                </a>
                <a href="tel:+37123304329" className="flex items-center gap-2 text-gray-600 hover:text-[#cc5339] transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+371 23304329</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-semibold text-gray-900">Sociālie tīkli</h3>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/Oskvidcinematography/?locale=lv_LV" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#cc5339] hover:text-white transition-all duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/osk_vid/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#cc5339] hover:text-white transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.youtube.com/@OskarsAndersons" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#cc5339] hover:text-white transition-all duration-300">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://lv.linkedin.com/in/oskvid" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#cc5339] hover:text-white transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Brand/Logo */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-semibold text-gray-900">Osk Vid</h3>
              <p className="text-gray-600 text-sm">
                Profesionāla kāzu un korporatīvo video filmēšana
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 Osk Vid. Visas tiesības aizsargātas.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
