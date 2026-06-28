"use client";

import { DynamicContent, DynamicImage } from "@/components/dynamic-content";
import {
  AgencyButton,
  BulletDots,
  Eyebrow,
  GradientText,
  Marquee,
} from "@/components/agency/agency-ui";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  Sparkles,
  MonitorSmartphone,
  Search,
  Users,
  Clock,
  Film,
  Copy,
  ThumbsDown,
  EyeOff,
  Frown,
  CalendarX,
  UserX,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

/* Marquee keywords */
const MARQUEE_WORDS = [
  "Kāzu video",
  "Reklāmas video",
  "Korporatīvie video",
  "Drona uzņēmumi",
  "Montāža",
  "Pasākumi",
  "Sociālie tīkli",
  "Reels",
  "Stāstījums",
];

/* ------------------------------------------------------------------ */
/* Parallax "Our Work" section                                         */
/* ------------------------------------------------------------------ */
const LEFT_IMAGES = [
  "/images/wedding-couple-church.jpeg",
  "/images/studio-filming.jpeg",
  "/images/camera-closeup.jpeg",
];
const RIGHT_IMAGES = [
  "/images/videographer-sunset.jpeg",
  "/images/professional-equipment.jpeg",
  "/images/drone-shot.png",
];

function ParallaxWork() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const leftX = useTransform(scrollYProgress, [0.1, 0.9], ["6%", "-22%"]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.9], ["-6%", "22%"]);
  const leftRotate = useTransform(scrollYProgress, [0.1, 0.9], [0, -12]);
  const rightRotate = useTransform(scrollYProgress, [0.1, 0.9], [0, 12]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    >
      {/* Left drifting column */}
      <motion.div
        style={{ x: leftX, rotate: leftRotate }}
        className="pointer-events-none absolute left-[4%] top-1/2 hidden -translate-y-1/2 flex-col gap-6 lg:flex"
      >
        {LEFT_IMAGES.map((src, i) => (
          <div
            key={i}
            className="h-[300px] w-[340px] overflow-hidden rounded-3xl shadow-xl xl:h-[360px] xl:w-[400px]"
          >
            <Image
              src={src}
              alt=""
              width={400}
              height={360}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </motion.div>

      {/* Right drifting column */}
      <motion.div
        style={{ x: rightX, rotate: rightRotate }}
        className="pointer-events-none absolute right-[4%] top-1/2 hidden -translate-y-1/2 flex-col gap-6 lg:flex"
      >
        {RIGHT_IMAGES.map((src, i) => (
          <div
            key={i}
            className="h-[300px] w-[340px] overflow-hidden rounded-3xl shadow-xl xl:h-[360px] xl:w-[400px]"
          >
            <Image
              src={src}
              alt=""
              width={400}
              height={360}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </motion.div>

      {/* Center text */}
      <div className="relative z-10 mx-auto max-w-xl px-6 text-center">
        <div className="flex justify-center pb-4">
          <BulletDots size="lg" filledFirst={false} />
        </div>
        <h2 className="font-display text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl">
          Daļa no <br />
          <GradientText>mūsu darbiem</GradientText>
        </h2>
        <p className="py-6 font-medium text-gray-700">
          Katrs projekts mūsu kolekcijā atspoguļo aizraušanos un radošumu, ko
          ieguldām katrā video. No kāzu filmām līdz korporatīvajiem stāstiem —
          mūsu portfolio parāda mūsu pieredzes daudzpusību.
        </p>
        <div className="flex justify-center">
          <AgencyButton href="/portfolio">Skatīt portfolio</AgencyButton>
        </div>

        {/* Mobile fallback grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:hidden">
          {[...LEFT_IMAGES, ...RIGHT_IMAGES].slice(0, 4).map((src, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-2xl shadow-md"
            >
              <Image
                src={src}
                alt=""
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* "Let's tell better stories" expanding sticky panel                  */
/* ------------------------------------------------------------------ */
function ExpandingPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const width = useTransform(scrollYProgress, [0, 0.5], ["52%", "100%"]);
  const radius = useTransform(scrollYProgress, [0, 0.5], ["100px", "0px"]);
  const height = useTransform(scrollYProgress, [0, 0.5], ["52vh", "92vh"]);

  return (
    <section className="bg-[#f4f4f4] pt-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="flex justify-center pb-4">
          <BulletDots size="xl" />
        </div>
        <h2 className="font-display text-3xl font-semibold text-gray-900 sm:text-4xl">
          Mēs radām video
        </h2>
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          <GradientText>kas atstāj iespaidu</GradientText>
        </h2>
        <p className="pt-4 font-medium text-gray-700">
          Mēs koncentrējamies uz video, kas stāsta patiesus stāstus un rezonē ar
          auditoriju. Ar profesionālu pieeju un radošu vīziju veidojam saturu,
          kas paliek atmiņā.
        </p>
      </div>

      <div ref={ref} className="flex items-start justify-center pt-12">
        <motion.div
          style={{ width, height, borderRadius: radius }}
          className="sticky top-24 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/videographer-studio.jpeg"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>
          <div className="relative z-10 mx-auto max-w-xl px-6 text-center text-white">
            <div className="flex justify-center pb-4">
              <BulletDots white />
            </div>
            <h3 className="font-display text-3xl font-semibold sm:text-4xl">
              Veidosim labāku <br />
              stāstu kopā
            </h3>
            <p className="py-4 font-medium text-white/85">
              Mēs radām video risinājumus, kas palīdz jūsu stāstam sasniegt
              auditoriju un veido patiesu saikni.
            </p>
            <div className="flex justify-center">
              <AgencyButton href="/par-oskvid">Par mums</AgencyButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Drifting "behind the scenes" gallery                                */
/* ------------------------------------------------------------------ */
const GALLERY_ROW_A = [
  "/images/studio-filming.jpeg",
  "/images/camera-setup-blue.jpeg",
  "/images/videographer-tower.jpeg",
  "/images/wedding-preparation.jpeg",
  "/images/professional-camera.jpg",
  "/images/camera-viewfinder.jpeg",
];
const GALLERY_ROW_B = [
  "/images/studio-purple-lighting.jpeg",
  "/images/videographer-silhouette.jpeg",
  "/images/groom-preparation.png",
  "/images/wedding-dramatic.png",
  "/images/camera-closeup.jpeg",
  "/images/drone-shot.png",
];

function GalleryRow({
  images,
  fromX,
  toX,
}: {
  images: string[];
  fromX: string;
  toX: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [fromX, toX]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ x }} className="flex gap-4">
        {images.map((src, i) => (
          <div
            key={i}
            className="h-44 w-72 flex-shrink-0 overflow-hidden rounded-lg sm:h-52 sm:w-96"
          >
            <Image
              src={src}
              alt=""
              width={384}
              height={208}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function DriftGallery() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <div className="flex justify-center">
          <BulletDots size="lg" />
        </div>
        <h2 className="pt-4 font-display text-3xl font-semibold text-gray-900 sm:text-4xl">
          Ikdiena <GradientText>aiz kadra</GradientText>
        </h2>
        <p className="pt-3 font-medium text-gray-700">
          Radošums un sadarbība virza mūsu ikdienu. Ieskaties mūsu darba procesā
          un komandā, kas iedveš dzīvību tavā vīzijā.
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        <GalleryRow images={GALLERY_ROW_A} fromX="-10%" toX="6%" />
        <GalleryRow images={GALLERY_ROW_B} fromX="6%" toX="-12%" />
        <GalleryRow images={GALLERY_ROW_A} fromX="-8%" toX="8%" />
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-10 text-center">
        <p className="font-medium text-gray-700">
          Mēs ticam caurspīdīgumam — tāpēc labprāt parādām savu ikdienu. Mūsu
          augošā komanda ir gatava īstenot tavu vīziju.
        </p>
        <div className="flex justify-center pt-6">
          <AgencyButton href="/atsauksmes">Uzzināt vairāk</AgencyButton>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Do / Don't toggle cards                                             */
/* ------------------------------------------------------------------ */
const DO_CARDS = [
  {
    icon: Sparkles,
    titleKey: "homeFeatureCreativeTitle",
    title: "Radoša pieeja",
    descriptionKey: "homeFeatureCreativeDescription",
    description:
      "Katrs projekts tiek veidots ar individuālu pieeju un radošu vīziju.",
  },
  {
    icon: MonitorSmartphone,
    titleKey: "homeFeatureQualityTitle",
    title: "Augsta kvalitāte",
    descriptionKey: "homeFeatureQualityDescription",
    description:
      "Izmantojam profesionālu aprīkojumu un jaunākās tehnoloģijas.",
  },
  {
    icon: Search,
    titleKey: "homeFeaturePersonalizedTitle",
    title: "Personalizēts serviss",
    descriptionKey: "homeFeaturePersonalizedDescription",
    description:
      "Katrs klients saņem individuālu uzmanību un personalizētu servisu.",
  },
  {
    icon: Users,
    titleKey: "homeFeatureExperienceTitle",
    title: "Pieredze",
    descriptionKey: "homeFeatureExperienceDescription",
    description: "Vairāk nekā 8 gadu pieredze video ražošanas jomā.",
  },
  {
    icon: Clock,
    titleKey: "homeFeatureTimelyTitle",
    title: "Precīzs grafiks",
    descriptionKey: "homeFeatureTimelyDescription",
    description:
      "Visi projekti tiek nodoti laikā, bez kompromisiem kvalitātē.",
  },
  {
    icon: Film,
    titleKey: "homeFeatureStorytellingTitle",
    title: "Stāstījums",
    descriptionKey: "homeFeatureStorytellingDescription",
    description: "Katrs video stāsta unikālu stāstu, kas rezonē ar auditoriju.",
  },
];

const DONT_CARDS = [
  {
    icon: Copy,
    title: "Šabloniski risinājumi",
    description:
      "Vienveidīgs, neiedvesmojošs saturs, kas neizceļ jūsu zīmolu konkurences vidē.",
  },
  {
    icon: ThumbsDown,
    title: "Vāja pieredze",
    description:
      "Slikta komunikācija un haotisks process, kas traucē sasniegt mērķi.",
  },
  {
    icon: EyeOff,
    title: "Zema redzamība",
    description:
      "Saturs, kas nesasniedz auditoriju un nepalīdz augt jūsu zīmolam.",
  },
  {
    icon: Frown,
    title: "Ierobežotas iespējas",
    description:
      "Tehniski ierobežojumi, kas neļauj realizēt patieso ideju potenciālu.",
  },
  {
    icon: CalendarX,
    title: "Nokavēti termiņi",
    description:
      "Slikti plānoti procesi, kas tērē laiku un budžetu bez rezultāta.",
  },
  {
    icon: UserX,
    title: "Nepietiekams atbalsts",
    description:
      "Atstāti vieni paši pēc projekta — bez konsultācijām un servisa.",
  },
];

function DoDontCards() {
  const [showDo, setShowDo] = useState(true);
  const cards = showDo ? DO_CARDS : DONT_CARDS;

  return (
    <section className="bg-[#f4f4f4] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Kāda ir atšķirība?</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold text-gray-900 sm:text-4xl">
              Kad cilvēki <br />
              <span className="flex flex-wrap items-center gap-3">
                <span
                  className={
                    showDo ? "text-gray-400 line-through" : "text-red-500"
                  }
                >
                  ne
                </span>
                <span className={showDo ? "agency-gradient-text" : "text-gray-400 line-through"}>
                  strādā
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={showDo}
                  onClick={() => setShowDo((v) => !v)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    showDo ? "bg-[#cc5339]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                      showDo ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
                <span>ar mums.</span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg text-gray-700">
              Sadarbojoties ar mums sagaidi radošus risinājumus, skaidru
              komunikāciju un rezultātus, kas pielāgoti tavai vīzijai.
            </p>
          </div>
          <div className="lg:col-span-3">
            <AgencyButton href="/oskvid-kontakti">Sāc projektu</AgencyButton>
          </div>
        </div>

        <motion.div
          key={showDo ? "do" : "dont"}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="agency-card">
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${
                    showDo
                      ? "bg-[#cc5339]/10 text-[#cc5339]"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                {showDo && "titleKey" in card ? (
                  <DynamicContent
                    contentKey={(card as (typeof DO_CARDS)[number]).titleKey}
                    fallback={card.title}
                    as="h3"
                    className="font-display text-xl font-semibold text-gray-900"
                  />
                ) : (
                  <h3 className="font-display text-xl font-semibold text-gray-900">
                    {card.title}
                  </h3>
                )}
                {showDo && "descriptionKey" in card ? (
                  <DynamicContent
                    contentKey={(card as (typeof DO_CARDS)[number]).descriptionKey}
                    fallback={card.description}
                    as="p"
                    className="mt-2 text-gray-600"
                  />
                ) : (
                  <p className="mt-2 text-gray-600">{card.description}</p>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Horizontal pinned project slider                                    */
/* ------------------------------------------------------------------ */
const PROJECTS = [
  {
    title: "Kāzu video",
    image: "/images/wedding-couple-church.jpeg",
    href: "/portfolio",
    tags: ["Filmēšana", "Montāža"],
    desc: "Emocionāli kāzu stāsti, iemūžināti kino kvalitātē.",
  },
  {
    title: "Reklāmas video",
    image: "/images/professional-equipment.jpeg",
    href: "/portfolio",
    tags: ["Reklāma", "Koncepts"],
    desc: "Pārdodoši reklāmas video zīmoliem un produktiem.",
  },
  {
    title: "Pasākumi",
    image: "/images/studio-filming.jpeg",
    href: "/portfolio",
    tags: ["Pasākumi", "Tiešraides"],
    desc: "Pasākumu un konferenču profesionāla iemūžināšana.",
  },
  {
    title: "Drona uzņēmumi",
    image: "/images/drone.jpg",
    href: "/portfolio",
    tags: ["Drons", "Aerial"],
    desc: "Iespaidīgi skati no putna lidojuma visā Latvijā.",
  },
];

function HorizontalProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-62%"]);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <div>
            <Eyebrow>Mūsu pakalpojumi</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold text-gray-900 sm:text-4xl">
              Video risinājumi, kas <br />
              <GradientText>atstāj iespaidu</GradientText>
            </h2>
          </div>
          <div className="flex items-end gap-4">
            <p className="text-lg text-gray-700">
              Katru dienu veidojam video, kas palīdz mūsu klientiem izcelties —
              gan privātos, gan biznesa projektos.
            </p>
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#cc5339] text-white">
              <Film className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>

      {/* Pinned horizontal scroll */}
      <div ref={ref} className="relative mt-12 h-[260vh] hidden lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 pl-[max(1rem,calc((100vw-80rem)/2))]">
            {PROJECTS.map((p, i) => (
              <Link
                key={i}
                href={p.href}
                className="group relative h-[440px] w-[420px] flex-shrink-0 overflow-hidden rounded-3xl"
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                <div className="absolute right-3 top-3 flex gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/70 bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
                  <h3 className="font-display text-2xl font-semibold">
                    {p.title}
                  </h3>
                  <p className="max-w-[180px] text-sm text-white/85">{p.desc}</p>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile stacked */}
      <div className="mt-10 grid gap-6 px-4 sm:grid-cols-2 lg:hidden">
        {PROJECTS.map((p, i) => (
          <Link
            key={i}
            href={p.href}
            className="group relative aspect-square overflow-hidden rounded-3xl"
          >
            <Image src={p.image} alt={p.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
            <div className="absolute inset-x-4 bottom-4 text-white">
              <h3 className="font-display text-xl font-semibold">{p.title}</h3>
              <p className="text-sm text-white/85">{p.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Newsletter / contact section                                        */
/* ------------------------------------------------------------------ */
function NewsletterSection() {
  return (
    <section className="bg-white pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl font-semibold text-gray-900 sm:text-4xl">
              Nepaliec <br />
              <GradientText>iepakaļ</GradientText>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Vairāk nekā 8 gadu pieredze un 800+ pabeigti projekti — palīdzam
              zīmoliem un pāriem parādīt savu stāstu vislabākajā gaismā.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-[#f4f4f4] p-5 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Image card */}
            <div className="relative lg:col-span-8">
              <div className="h-[340px] overflow-hidden rounded-2xl sm:h-[64vh]">
                <DynamicImage
                  contentKey="homeCtaBackgroundImage"
                  fallback="/images/professional-equipment.jpeg"
                  alt="Oskvid komanda"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="rounded-tr-2xl bg-[#f4f4f4] p-6 sm:absolute sm:bottom-0 sm:left-0 sm:max-w-md">
                <h3 className="font-display text-2xl font-semibold text-gray-900 sm:text-3xl">
                  Radīsim <GradientText>lieliskas lietas</GradientText> kopā
                </h3>
                <p className="mt-2 text-gray-700">
                  Sazinies ar mums jau šodien, lai pārrunātu tava projekta
                  iespējas. Tava ideja ir tikai viena ziņa attālumā.
                </p>
              </div>
            </div>

            {/* Detail column */}
            <div className="lg:col-span-4 lg:pl-6">
              <div className="flex flex-wrap justify-between gap-6">
                <div>
                  <h4 className="pb-3 font-medium text-gray-900">Pakalpojumi</h4>
                  <ul className="space-y-2">
                    {[
                      { label: "Kāzu video", href: "/portfolio" },
                      { label: "Reklāmas video", href: "/portfolio" },
                      { label: "Korporatīvie video", href: "/video-filmesana" },
                      { label: "Drona uzņēmumi", href: "/video-filmesana" },
                    ].map((s) => (
                      <li key={s.label}>
                        <Link
                          href={s.href}
                          className="font-medium text-gray-500 transition-colors hover:text-[#cc5339]"
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="pb-3 font-medium text-gray-900">Saites</h4>
                  <ul className="space-y-2">
                    {[
                      { label: "Portfolio", href: "/portfolio" },
                      { label: "Par mums", href: "/par-oskvid" },
                      { label: "Atsauksmes", href: "/atsauksmes" },
                      { label: "Blogs", href: "/kazu-blogs" },
                    ].map((s) => (
                      <li key={s.label}>
                        <Link
                          href={s.href}
                          className="font-medium text-gray-500 transition-colors hover:text-[#cc5339]"
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-display text-2xl font-semibold text-gray-900">
                  Sāksim sarunu
                </h3>
                <p className="mt-1 text-gray-700">
                  Pastāsti par savu ideju — atbildēsim 24 stundu laikā.
                </p>
                <div className="mt-4">
                  <AgencyButton href="/oskvid-kontakti">
                    Sazināties
                  </AgencyButton>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                <li>
                  <a
                    href="tel:+37123304329"
                    className="flex items-center justify-between text-gray-900 transition-colors hover:text-[#cc5339]"
                  >
                    <Phone className="h-5 w-5" />
                    <span className="font-semibold">+371 23304329</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@oskvid.com"
                    className="flex items-center justify-between text-gray-900 transition-colors hover:text-[#cc5339]"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="font-semibold">info@oskvid.com</span>
                  </a>
                </li>
                <li>
                  <span className="flex items-center justify-between text-gray-900">
                    <MapPin className="h-5 w-5" />
                    <span className="font-semibold">Rīga, Latvija</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Page                                                                */
/* ================================================================== */
export default function Home() {
  return (
    <div className="relative bg-white">
      {/* ---------------------------------------------------------- */}
      {/* Hero banner (rounded, with marquee)                         */}
      {/* ---------------------------------------------------------- */}
      <section className="px-3 pt-20 sm:px-5 sm:pt-24">
        <div className="relative h-[78vh] min-h-[560px] overflow-hidden rounded-[20px]">
          {/* Background */}
          <div className="absolute inset-0">
            <video
              src="/videos/homeHeroBackgroundImage-simple-cms-compressed.webm"
              poster="/images/videographer-sunset.jpeg"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Hero content */}
          <div className="absolute inset-x-0 bottom-0 px-5 pb-10 sm:px-8 sm:pb-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="pb-4">
                  <BulletDots white />
                </div>
                <DynamicContent
                  contentKey="homeHeroMainTitle"
                  fallback="Mēs veidojam stāstus kopā"
                  as="h1"
                  className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
                />
                <DynamicContent
                  contentKey="homeHeroDescription"
                  fallback="Kāzu video, pasākumi un saturs sociālajiem tīkliem — drona pakalpojumi visā Latvijā."
                  as="p"
                  className="mt-4 max-w-xl text-lg text-white/90"
                />
                <div className="mt-6 flex flex-wrap gap-3">
                  <AgencyButton href="/video-filmesana">
                    Pakalpojumi
                  </AgencyButton>
                  <AgencyButton href="/par-oskvid" variant="outline-white">
                    Par mums
                  </AgencyButton>
                </div>
              </div>

              {/* Description card */}
              <div className="flex w-full items-center gap-4 rounded-xl bg-white p-4 sm:w-72">
                <p className="font-semibold text-gray-900">
                  Mēs veidojam aizraujošus video, kas sniedz reālus rezultātus
                  tavam zīmolam.
                </p>
                <Link
                  href="/oskvid-kontakti"
                  aria-label="Sazināties"
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#cc5339] text-2xl text-white transition-colors hover:bg-black"
                >
                  →
                </Link>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-[#cc5339] to-[#a23d28] py-2 text-white">
            <Marquee
              items={MARQUEE_WORDS.map((w) => (
                <span key={w}>{w}</span>
              ))}
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Who are we                                                  */}
      {/* ---------------------------------------------------------- */}
      <section className="px-4 pb-12 pt-24 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center pb-4">
            <BulletDots size="xl" />
          </div>
          <DynamicContent
            contentKey="homeServicesTitle"
            fallback="Kas mēs esam?"
            as="h2"
            className="font-display text-4xl font-semibold text-gray-900 sm:text-5xl"
          />
          <DynamicContent
            contentKey="homeServicesDescription"
            fallback="Esam saliedēta komanda ar vairāk nekā 8 gadu pieredzi video ražošanā. Neatkarīgi no tā, vai gatavojies kāzām vai veido biznesa saturu — mums ir zināšanas un radošums, lai parādītu tavu stāstu vislabākajā gaismā."
            as="p"
            className="mx-auto pt-3 text-xl font-medium text-gray-700"
          />
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            <AgencyButton href="/par-oskvid">Par mums</AgencyButton>
            <AgencyButton href="/portfolio" variant="outline">
              Mūsu darbi
            </AgencyButton>
          </div>
        </div>
      </section>

      <ParallaxWork />
      <ExpandingPanel />
      <DriftGallery />
      <DoDontCards />
      <HorizontalProjects />
      <NewsletterSection />
    </div>
  );
}
