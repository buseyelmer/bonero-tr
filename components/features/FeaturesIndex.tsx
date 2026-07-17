"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  CalendarCheck,
  FileText,
  LayoutDashboard,
  Mail,
  Megaphone,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import { useLocale } from "@/components/LocaleProvider";
import AppointmentMock from "@/components/features/mocks/AppointmentMock";
import AdsMock from "@/components/features/mocks/AdsMock";
import AiAgentMock from "@/components/features/mocks/AiAgentMock";
import ContentMock from "@/components/features/mocks/ContentMock";
import CrmMock from "@/components/features/mocks/CrmMock";
import EmailMarketingMock from "@/components/features/mocks/EmailMarketingMock";
import OmnichannelMock from "@/components/features/mocks/OmnichannelMock";
import ReportingMock from "@/components/features/mocks/ReportingMock";
import CollabMock from "@/components/features/mocks/CollabMock";
import {
  FEATURE_PAGES,
  featureHref,
  type FeatureSlug,
} from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;
const HOLD = 4500;

const ICONS: Record<FeatureSlug, LucideIcon> = {
  "gelen-kutusu": LayoutDashboard,
  "yapay-zeka": Bot,
  "ai-reklam": Megaphone,
  isbirligi: Users,
  crm: UsersRound,
  randevu: CalendarCheck,
  icerik: FileText,
  "email-marketing": Mail,
  raporlama: BarChart3,
};

/** Asymmetric bento spans for visual rhythm */
const BENTO: Record<FeatureSlug, string> = {
  "gelen-kutusu": "sm:col-span-2 sm:row-span-2",
  "yapay-zeka": "sm:col-span-1",
  "ai-reklam": "sm:col-span-1",
  isbirligi: "sm:col-span-1",
  crm: "sm:col-span-2",
  randevu: "sm:col-span-1",
  icerik: "sm:col-span-1",
  "email-marketing": "sm:col-span-1",
  raporlama: "sm:col-span-2",
};

const DAY = {
  tr: [
    { time: "09:10", slug: "gelen-kutusu" as FeatureSlug, beat: "Gelen kutusu açılır — gece birikenler üstte." },
    { time: "10:40", slug: "yapay-zeka" as FeatureSlug, beat: "AI Agent SSS’yi cevaplar; zor olan ekibe düşer." },
    { time: "13:00", slug: "crm" as FeatureSlug, beat: "Yeni lead kartı pipeline’a girer." },
    { time: "15:20", slug: "randevu" as FeatureSlug, beat: "Hatırlatma gider; no-show azalır." },
    { time: "17:00", slug: "raporlama" as FeatureSlug, beat: "Günün nabzı — hangi kanal iş getirdi?" },
  ],
  en: [
    { time: "09:10", slug: "gelen-kutusu" as FeatureSlug, beat: "Inbox opens — overnight backlog on top." },
    { time: "10:40", slug: "yapay-zeka" as FeatureSlug, beat: "AI Agent handles FAQs; hard cases go to the team." },
    { time: "13:00", slug: "crm" as FeatureSlug, beat: "A new lead card enters the pipeline." },
    { time: "15:20", slug: "randevu" as FeatureSlug, beat: "Reminder goes out; no-shows drop." },
    { time: "17:00", slug: "raporlama" as FeatureSlug, beat: "Day’s pulse — which channel brought work?" },
  ],
};

const copy = {
  tr: {
    eyebrow: "Özellikler",
    title: "Bir gün,",
    titleAccent: "tek panel.",
    lead: "Mesajdan rapora kadar her katman aynı Bonero’da. Sahneyi çevirin — detaya girin.",
    cta: "Hemen başla",
    explore: "Detayı aç",
    live: "CANLI",
    pick: "Katmanı seçin",
    dayTitle: "Bir iş günü böyle akar",
    dayLead: "Saatler değişir, ekran aynı kalır.",
    mosaicTitle: "Hepsine tek bakış",
    mosaicLead: "Büyük kutu = sık kullanılan. Küçük = bir tık uzağınızda.",
    closingTitle: "Hangi katmandan başlarsınız?",
    closingBody: "Kaydolun veya bir özelliğin detayına girin.",
    closingSecondary: "Paketlere bak",
    outcome: "Sonuç",
  },
  en: {
    eyebrow: "Features",
    title: "One day,",
    titleAccent: "one panel.",
    lead: "From messages to reports — every layer in Bonero. Flip the stage, open the detail.",
    cta: "Get started",
    explore: "Open detail",
    live: "LIVE",
    pick: "Pick a layer",
    dayTitle: "A workday flows like this",
    dayLead: "The clock changes; the screen stays the same.",
    mosaicTitle: "Everything at a glance",
    mosaicLead: "Large tile = used most. Small = one tap away.",
    closingTitle: "Which layer do you start with?",
    closingBody: "Sign up or open a feature detail.",
    closingSecondary: "View plans",
    outcome: "Outcome",
  },
};

type StageProps = { active: boolean; isEn: boolean };

function Mock({ slug, active, isEn }: { slug: FeatureSlug; active: boolean; isEn: boolean }) {
  const map: Record<FeatureSlug, ReactNode> = {
    "gelen-kutusu": <OmnichannelMock active={active} isEn={isEn} />,
    "yapay-zeka": <AiAgentMock active={active} isEn={isEn} />,
    "ai-reklam": <AdsMock active={active} isEn={isEn} />,
    isbirligi: <CollabMock active={active} isEn={isEn} />,
    crm: <CrmMock active={active} isEn={isEn} />,
    randevu: <AppointmentMock active={active} isEn={isEn} />,
    icerik: <ContentMock active={active} isEn={isEn} />,
    "email-marketing": <EmailMarketingMock active={active} isEn={isEn} variant="letter" />,
    raporlama: <ReportingMock active={active} isEn={isEn} variant="hero" />,
  };
  return <div className="h-full min-h-0 p-3 sm:p-4">{map[slug]}</div>;
}

export default function FeaturesIndex() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const t = copy[locale];
  const day = DAY[locale];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dayBeat, setDayBeat] = useState(0);

  const feature = FEATURE_PAGES[active];
  const Icon = ICONS[feature.slug];
  const points = isEn ? feature.valuePointsEn : feature.valuePoints;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setActive((p) => (p + 1) % FEATURE_PAGES.length),
      HOLD,
    );
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const id = window.setInterval(
      () => setDayBeat((p) => (p + 1) % day.length),
      3200,
    );
    return () => clearInterval(id);
  }, [day.length]);

  return (
    <div className="overflow-x-clip bg-background">
      {/* ── Theater hero ── */}
      <section className="relative min-h-[min(100svh,900px)] overflow-hidden bg-bonero-dark pt-24 text-white sm:pt-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 70% 40%, rgba(24,131,71,0.28), transparent 55%), radial-gradient(ellipse 40% 40% at 10% 80%, rgba(255,255,255,0.04), transparent 50%)",
          }}
        />
        <motion.div
          className="pointer-events-none absolute -top-20 right-1/4 h-64 w-64 rounded-full bg-bonero-green/20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[calc(min(100svh,900px)-6rem)] max-w-6xl flex-col px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid flex-1 gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.22fr)] lg:items-stretch lg:gap-10">
            {/* Sol — üstten hizalı, liste sahne yüksekliğine sığar */}
            <div className="flex min-h-0 flex-col">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-bold tracking-[0.16em] text-bonero-green uppercase"
              >
                {t.eyebrow}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, ease }}
                className="font-heading mt-3 text-3xl tracking-wide sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
              >
                {t.title}{" "}
                <span className="text-bonero-green">{t.titleAccent}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, ease }}
                className="mt-3 max-w-md text-sm leading-relaxed text-white/55 sm:text-base"
              >
                {t.lead}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, ease }}
                className="mt-5"
              >
                <Link
                  href={PANEL_REGISTER_URL}
                  className="group inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-bonero-green/30 hover:bg-bonero-green/90"
                >
                  {t.cta}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              <div className="mt-6 flex min-h-0 flex-1 flex-col lg:mt-7">
                <p className="shrink-0 text-[10px] font-bold tracking-[0.14em] text-white/30 uppercase">
                  {t.pick}
                </p>
                <ul
                  className="mt-2 max-h-[280px] space-y-0.5 overflow-y-auto overscroll-contain pr-1 [-ms-overflow-style:none] [scrollbar-width:thin] sm:max-h-[320px] lg:max-h-none lg:flex-1 lg:min-h-0"
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  {FEATURE_PAGES.map((f, i) => {
                    const on = i === active;
                    const FIcon = ICONS[f.slug];
                    return (
                      <li key={f.slug}>
                        <button
                          type="button"
                          onClick={() => setActive(i)}
                          className={`group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors ${
                            on ? "bg-white/10" : "hover:bg-white/5"
                          }`}
                        >
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                              on ? "bg-bonero-green text-white" : "bg-white/5 text-white/40"
                            }`}
                          >
                            <FIcon size={13} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className={`block truncate text-[13px] font-semibold ${
                                on ? "text-white" : "text-white/50"
                              }`}
                            >
                              {isEn ? f.navLabelEn : f.navLabel}
                            </span>
                          </span>
                          <span className="font-mono text-[10px] text-white/25">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {on && (
                            <motion.span
                              layoutId="feat-live"
                              className="h-1 w-1 rounded-full bg-bonero-green"
                            />
                          )}
                        </button>
                        {on && (
                          <motion.div
                            className="ml-10 h-0.5 overflow-hidden rounded-full bg-white/10"
                            initial={false}
                          >
                            <motion.div
                              key={active}
                              className="h-full bg-bonero-green"
                              initial={{ width: "0%" }}
                              animate={{ width: paused ? "0%" : "100%" }}
                              transition={{
                                duration: paused ? 0 : HOLD / 1000,
                                ease: "linear",
                              }}
                            />
                          </motion.div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Sağ — soldan aynı yükseklikte başlar, sahne dolar */}
            <div
              className="relative flex min-h-0 flex-col"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={feature.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="min-w-0"
                  >
                    <p className="text-[11px] font-bold tracking-wide text-bonero-green uppercase">
                      {isEn ? feature.eyebrowEn : feature.eyebrow}
                    </p>
                    <h2 className="font-heading mt-0.5 truncate text-xl text-white sm:text-2xl">
                      {isEn ? feature.titleEn : feature.title}
                    </h2>
                  </motion.div>
                </AnimatePresence>
                <motion.span
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-bonero-green/40 bg-bonero-green/15 px-2.5 py-1 font-mono text-[9px] font-bold text-bonero-green"
                  animate={{ opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-bonero-green" />
                  {t.live}
                </motion.span>
              </div>

              <div className="relative flex min-h-[320px] flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#f6f8f7] shadow-[0_40px_80px_rgba(0,0,0,0.35)] sm:min-h-[380px] lg:min-h-0">
                <div className="flex shrink-0 items-center gap-2 border-b border-bonero-dark/8 bg-white px-4 py-2.5">
                  <Icon size={14} className="text-bonero-green" />
                  <span className="text-xs font-semibold text-bonero-dark">
                    {isEn ? feature.navLabelEn : feature.navLabel}
                  </span>
                  <Link
                    href={featureHref(feature.slug)}
                    className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-bonero-green"
                  >
                    {t.explore}
                    <ArrowUpRight size={11} />
                  </Link>
                </div>
                <div className="relative min-h-[260px] flex-1 sm:min-h-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={feature.slug}
                      className="absolute inset-0"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      <Mock slug={feature.slug} active isEn={isEn} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={feature.slug + "-out"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 shrink-0 text-sm leading-relaxed text-white/45"
                >
                  <span className="font-semibold text-bonero-green">{t.outcome}: </span>
                  {isEn ? feature.outcomeEn : feature.outcome}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Day timeline (horizontal story, not a table) ── */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-12deg, transparent, transparent 40px, rgba(24,131,71,0.03) 40px, rgba(24,131,71,0.03) 41px)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.dayTitle}
            </h2>
            <p className="mt-2 text-sm text-bonero-dark/50">{t.dayLead}</p>
          </Reveal>

          <div className="relative mt-12">
            {/* curved path line */}
            <div className="absolute top-8 right-4 left-4 hidden h-px bg-gradient-to-r from-transparent via-bonero-green/30 to-transparent sm:block" />

            <div className="flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
              {day.map((beat, i) => {
                const on = i === dayBeat;
                const FIcon = ICONS[beat.slug];
                const f = FEATURE_PAGES.find((x) => x.slug === beat.slug)!;
                return (
                  <button
                    key={beat.time}
                    type="button"
                    onClick={() => {
                      setDayBeat(i);
                      setActive(FEATURE_PAGES.findIndex((x) => x.slug === beat.slug));
                    }}
                    className="relative w-[min(220px,70vw)] shrink-0 text-left sm:w-auto"
                  >
                    <motion.div
                      className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors ${
                        on
                          ? "border-bonero-green bg-bonero-green text-white shadow-lg shadow-bonero-green/30"
                          : "border-bonero-dark/10 bg-white text-bonero-dark/40"
                      }`}
                      animate={on ? { y: [0, -4, 0] } : { y: 0 }}
                      transition={{ duration: 2, repeat: on ? Infinity : 0 }}
                    >
                      <FIcon size={20} />
                    </motion.div>
                    <p className="mt-4 text-center font-mono text-[11px] font-bold text-bonero-green">
                      {beat.time}
                    </p>
                    <p className="mt-1 text-center text-xs font-semibold text-bonero-dark">
                      {isEn ? f.navLabelEn : f.navLabel}
                    </p>
                    <AnimatePresence>
                      {on && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 text-center text-[11px] leading-relaxed text-bonero-dark/50"
                        >
                          {beat.beat}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Asymmetric mosaic (not equal cards / not table) ── */}
      <section className="border-t border-bonero-dark/8 bg-[#f3f6f4] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.mosaicTitle}
            </h2>
            <p className="mt-2 text-sm text-bonero-dark/50">{t.mosaicLead}</p>
          </Reveal>

          <div className="mt-10 grid auto-rows-[minmax(140px,auto)] gap-3 sm:grid-cols-3 sm:gap-4">
            {FEATURE_PAGES.map((f, i) => {
              const FIcon = ICONS[f.slug];
              const span = BENTO[f.slug];
              const large = span.includes("row-span-2") || span.includes("col-span-2");
              const pts = isEn ? f.valuePointsEn : f.valuePoints;

              return (
                <Reveal key={f.slug} delay={i * 0.04} className={span}>
                  <Link
                    href={featureHref(f.slug)}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-bonero-dark/8 bg-white p-5 shadow-sm transition-all hover:border-bonero-green/30 hover:shadow-xl hover:shadow-bonero-green/10 sm:p-6 ${
                      large ? "min-h-[220px]" : ""
                    }`}
                  >
                    <motion.div
                      className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-bonero-green/5"
                      whileHover={{ scale: 1.4 }}
                      aria-hidden
                    />
                    <div className="relative flex items-start justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-bonero-green/10 text-bonero-green transition-colors group-hover:bg-bonero-green group-hover:text-white">
                        <FIcon size={18} />
                      </span>
                      <span className="font-mono text-[10px] text-bonero-dark/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      className={`relative mt-4 font-heading tracking-wide text-bonero-dark ${
                        large ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
                      }`}
                    >
                      {isEn ? f.navLabelEn : f.navLabel}
                    </h3>
                    <p
                      className={`relative mt-2 flex-1 text-sm leading-relaxed text-bonero-dark/50 ${
                        large ? "line-clamp-3" : "line-clamp-2"
                      }`}
                    >
                      {isEn ? f.headlineEn : f.headline}
                    </p>
                    {large && pts[0] && (
                      <p className="relative mt-3 text-xs font-medium text-bonero-green">
                        {pts[0].title}
                      </p>
                    )}
                    <span className="relative mt-4 inline-flex items-center gap-1 text-xs font-semibold text-bonero-green">
                      {t.explore}
                      <ArrowUpRight
                        size={12}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Active feature deep strip (single column story, not split table) ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={feature.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease }}
            >
              <p className="text-xs font-bold tracking-[0.14em] text-bonero-green uppercase">
                {isEn ? feature.eyebrowEn : feature.eyebrow}
              </p>
              <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
                {isEn ? feature.titleEn : feature.title}
              </h2>
              <p className="mt-4 text-lg font-semibold text-bonero-dark/80">
                {isEn ? feature.headlineEn : feature.headline}
              </p>
              <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
                {isEn ? feature.leadEn : feature.lead}
              </p>

              <ol className="mt-10 space-y-0">
                {points.map((vp, i) => (
                  <li
                    key={vp.title}
                    className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-t border-bonero-dark/8 py-5"
                  >
                    <span className="font-mono text-sm font-bold text-bonero-green">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-semibold text-bonero-dark">{vp.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-bonero-dark/50">{vp.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={featureHref(feature.slug)}
                  className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white shadow-md shadow-bonero-green/20"
                >
                  {t.explore}
                  <ArrowUpRight size={15} />
                </Link>
                <button
                  type="button"
                  onClick={() => setActive((p) => (p + 1) % FEATURE_PAGES.length)}
                  className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 px-5 py-3 text-sm font-medium text-bonero-dark/60"
                >
                  {isEn ? "Next layer" : "Sonraki katman"}
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bonero-dark py-14 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-2xl tracking-wide sm:text-3xl">{t.closingTitle}</h2>
              <p className="mt-2 text-sm text-white/45">{t.closingBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <CtaButton href={PANEL_REGISTER_URL} variant="inverse" size="md" icon={<ArrowUpRight size={15} />}>
                {t.cta}
              </CtaButton>
              <CtaButton href="/paketler" variant="outline-light" size="md">
                {t.closingSecondary}
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
