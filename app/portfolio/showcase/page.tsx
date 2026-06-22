"use client"

import PortfolioGrid from "@/components/portfolio-grid"
import { motion } from "framer-motion"
import { Eyebrow, GradientText } from "@/components/agency/agency-ui"

export default function PortfolioShowcasePage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <Eyebrow center>Portfolio</Eyebrow>
          <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900">
            Mūsu <GradientText>darbi</GradientText>
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-gray-600">
            Ieskats mūsu jaunākajos video projektos.
          </p>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <PortfolioGrid />
      </motion.div>
    </div>
  )
}
