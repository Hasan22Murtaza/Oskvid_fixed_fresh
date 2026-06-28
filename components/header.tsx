"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { OptimizedImage } from "@/components/optimized-image"
import { AgencyButton } from "@/components/agency/agency-ui"

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const pathname = usePathname()

  // Mark as mounted so scroll-dependent classes only apply client-side
  React.useEffect(() => {
    setMounted(true)
    // Set initial scroll state after mount
    setScrolled(window.scrollY > 20)
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const routes = [
    { href: "/", label: "Sākums" },
    { href: "/kazu-blogs", label: "Blogs" },
    { href: "/video-filmesana", label: "Pakalpojumi" },
    { href: "/par-oskvid", label: "Par mums" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/atsauksmes", label: "Atsauksmes" },
    { href: "/oskvid-kontakti", label: "Kontakti" },
  ]

  // Use a stable class before mount to match server render (scrolled=false)
  const isScrolled = mounted && scrolled

  const navLinkClass = (isActive: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
      isActive
        ? "bg-[#cc5339] text-white"
        : "text-gray-900 hover:bg-[#cc5339] hover:text-white",
    )

  return (
    <header
      className={cn(
        "fixed z-50 left-3 right-3 top-3 rounded-full border border-white/40 backdrop-blur-md transition-all duration-300 ease-in-out lg:left-10 lg:right-10",
        isScrolled
          ? "bg-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.10)]"
          : "bg-white/60 shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between transition-all duration-300 max-w-8xl",
          isScrolled ? "h-16 px-4 sm:px-6" : "h-16 px-4 sm:h-[72px] sm:px-6",
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-10 touch-target">
          <div className="relative h-10 w-24 sm:h-11 sm:w-28 md:h-12 md:w-32 lg:h-12 lg:w-36 overflow-visible">
            <OptimizedImage
              src="/oskvid-logo-new.png"
              alt="OSKVID Videography Logo"
              width={50}
              height={50}
              priority
              className="object-contain transition-all duration-300"
              style={{
                filter: "contrast(1.1) brightness(1.05)",
              }}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {routes.map((route) => {
              const isActive = pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href))

              return (
                <li key={route.href}>
                  <Link href={route.href} className={navLinkClass(isActive)}>
                    {route.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <AgencyButton href="/oskvid-kontakti">Sazināties</AgencyButton>
          </div>
          <LanguageSwitcher />

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="transition-colors duration-200 touch-target h-11 w-11 sm:h-12 sm:w-12 text-gray-700 hover:text-[#cc5339]"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:w-80 border-l border-gray-200 bg-white p-0 safe-area-top safe-area-right safe-area-bottom">
              {/* Mobile Menu Header */}
              <div className="flex h-16 sm:h-18 items-center justify-between px-4 sm:px-6 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-2 touch-target" onClick={() => setIsOpen(false)}>
                  <div className="relative h-10 sm:h-12 w-24 sm:w-32 overflow-visible">
                    <OptimizedImage
                      src="/oskvid-logo-new.png"
                      alt="OSKVID Videography Logo"
                      width={128}
                      height={56}
                      priority
                      className="object-contain"
                    />
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-[#cc5339] touch-target h-11 w-11"
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex flex-col px-4 sm:px-6 py-6 scroll-smooth-mobile overflow-y-auto max-h-[calc(100vh-100px)]">
                <nav className="flex flex-col gap-1">
                  {routes.map((route) => {
                    const isActive = pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href))

                    return (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "rounded-lg px-4 py-4 text-base font-medium transition-colors duration-150 touch-target min-h-[56px] flex items-center",
                          isActive
                            ? "text-[#cc5339] bg-orange-50 border-l-4 border-[#cc5339]"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#cc5339]",
                        )}
                      >
                        {route.label}
                      </Link>
                    )
                  })}
                </nav>

                {/* Mobile CTA Button */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Button asChild className="w-full bg-[#cc5339] hover:bg-[#b8472f] text-white font-medium touch-target-large min-h-[56px] text-base">
                    <Link href="/oskvid-kontakti" onClick={() => setIsOpen(false)}>
                      Sākt projektu
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}