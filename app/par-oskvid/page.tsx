"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect } from "react"
import { DynamicImage, DynamicContent } from "@/components/dynamic-content"

const ABOUT_DEFAULTS = {
  aboutPageTitle: "Par Osk vid",
  aboutPageBio:
    "Sveiki! \nEsmu Oskars Andersons, profesionāls videogrāfs ar vairāk nekā 14 gadu pieredzi video nozarē. Šajā laikā esmu pārliecinājies par vienu – labs video nav tikai skaista kadru virkne. Tas ir stāsts, tās ir patiesas emocijas un mirkļi, kas palīdz saglabāt atmiņā to, kas patiešām ir svarīgs.\n\nKino kvalitāte un stāsta spēks\nMans līdz šim lielākais profesionālais izaicinājums un lepnums ir pilnmetrāžas filma, ko vienatnē gan nofilmēju, gan samontēju demonstrēšanai kinoteātrī Splendid Palace. Radīt attēlu un izcilu akustisko skaņu, kas atbilst augstākajiem kino standartiem un ir baudāma uz milzīga ekrāna, bija sarežģīts, bet gandarījumu nesošs process. Šī pieredze man ir iemācījusi no nekā radīt aizraujošu saturu un piesaistīt skatītāju uzmanību no pirmajām sekundēm.\n\nMani pakalpojumi\nEs ticu, ka no visa, kas aizrauj, var izveidot jēgpilnu stāstu. Piedāvāju pilna cikla video pakalpojumus – no idejas līdz gatavam rezultātam:\n\nKāzu video un filmēšana: Radu emocionālus un kinematogrāfiskus kāzu stāstus. Mans mērķis ir iemūžināt jūsu īpašās dienas atmosfēru un patiesās emocijas, radot paliekošu vērtību, kas priecēs gadiem ilgi.\n\nReklāmas video uzņēmumiem: Palīdzu zīmoliem izcelties, veidojot vizuāli pievilcīgus un pārdomātus video projektus.\n\nPasākumu filmēšana: Koncertu, sporta spēļu un korporatīvo notikumu iemūžināšana dinamiskos video.\n\nDrona pakalpojumi un filmēšana no gaisa: Efektīvi un plaši kadri, kas piešķir video pavisam citu mērogu.\n\nKāpēc izvēlēties mani?\nSavā darbā es apvienoju tehnisko precizitāti ar radošumu. Nodrošinu ne tikai pašu filmēšanu, bet arī augstākā līmeņa video montāžu, skaņas apstrādi un krāsu korekciju\n. Katram projektam meklēju īsto noskaņu, lai gala rezultāts būtu ne tikai vizuāli pievilcīgs, bet arī emocionāli spēcīgs.\n\nTrendi mainās, bet īsti mirkļi un emocijas paliek. Ja meklē videogrāfu, kurš pieiet darbam ar sirdi, atbildību un kino nozares standartiem atbilstošu profesionalitāti, ar prieku kļūšu par daļu no tava stāsta!\nVideogrāfs Oskars Andersons  ",
  aboutPageHeroImage: "/images/aboutPageHeroImage-simple-cms-lv.webp",
  aboutPageClickableImage1: "/images/aboutPageClickableImage1-simple-cms-lv-compressed.png",
  aboutPageClickableImage2: "/images/aboutPageClickableImage2-simple-cms-lv-compressed.jpg",
  aboutPageClickableImage3: "/images/aboutPageClickableImage3-simple-cms-lv-compressed.jpg",
}

export default function AboutPage() {
  useEffect(() => {
    const loadFromApi = async () => {
      try {
        const response = await fetch("/api/content?page=simple-cms&language=lv")
        if (!response.ok) return
        const data = await response.json()
        const content = data.content || {}
        Object.entries(content).forEach(([key, value]) => {
          if (key.startsWith("aboutPage") && typeof value === "string") {
            try {
              localStorage.setItem(`content_${key}`, value)
            } catch {
              // Ignore storage quota in private browsing.
            }
          }
        })
        window.dispatchEvent(new CustomEvent("cmsContentUpdated"))
      } catch {
        // Keep published defaults if the API is unavailable.
      }
    }

    loadFromApi()
  }, [])

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center gap-10 mb-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 1, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center w-full"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#cc5339] mb-8">
              <DynamicContent
                contentKey="aboutPageTitle"
                fallback={ABOUT_DEFAULTS.aboutPageTitle}
              />
            </h1>
            <div className="prose prose-lg text-gray-700 leading-relaxed mx-auto max-w-3xl">
              <p
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily: "inherit",
                }}
                className="text-xl mb-6 text-center"
              >
                <DynamicContent
                  contentKey="aboutPageBio"
                  fallback={ABOUT_DEFAULTS.aboutPageBio}
                />
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-4xl"
          >
            <div className="relative h-96 lg:h-[550px] w-full rounded-2xl overflow-hidden">
              <DynamicImage
                contentKey="aboutPageHeroImage"
                alt="Video production behind the scenes"
                fill
                className="object-cover"
                objectFit="cover"
                fallback={ABOUT_DEFAULTS.aboutPageHeroImage}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          <Link href="/video-filmesana" className="group block">
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <DynamicImage
                contentKey="aboutPageClickableImage1"
                alt="Video production services"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                objectFit="cover"
                fallback={ABOUT_DEFAULTS.aboutPageClickableImage1}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl mb-2 font-bold text-[#cc5339] drop-shadow-lg">
                    Pakalpojumi
                  </h3>
                  <p className="text-white drop-shadow-md font-medium">
                    Apskatīt mūsu darbus
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/kazu-blogs" className="group block">
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <DynamicImage
                contentKey="aboutPageClickableImage2"
                alt="About our team"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                objectFit="cover"
                fallback={ABOUT_DEFAULTS.aboutPageClickableImage2}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2 text-[#cc5339] drop-shadow-lg">
                    Blogs
                  </h3>
                  <p className="text-white drop-shadow-md font-medium">
                    Uzzināt vairāk par komandu
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/oskvid-kontakti" className="group block">
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <DynamicImage
                contentKey="aboutPageClickableImage3"
                alt="Contact us"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                objectFit="cover"
                fallback={ABOUT_DEFAULTS.aboutPageClickableImage3}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2 text-[#cc5339] drop-shadow-lg">
                    Kontakti
                  </h3>
                  <p className="text-white drop-shadow-md font-medium">
                    Sazināties ar mums
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
