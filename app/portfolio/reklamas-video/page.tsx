"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Portfolio is now a single, filterable page. This route redirects to it so
// existing links and bookmarks keep working (all records are aggregated there).
export default function PromoRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/portfolio")
  }, [router])
  return null
}
