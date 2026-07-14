"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  CalendarCheck,
  Check,
  FileText,
  LayoutDashboard,
  Mail,
  Megaphone,
  UserPlus,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import AppointmentMock from "@/components/features/mocks/AppointmentMock";
import AdsMock from "@/components/features/mocks/AdsMock";
import AiAgentMock from "@/components/features/mocks/AiAgentMock";
import ContentMock from "@/components/features/mocks/ContentMock";
import CrmMock from "@/components/features/mocks/CrmMock";
import EmailMarketingMock from "@/components/features/mocks/EmailMarketingMock";
import OmnichannelMock from "@/components/features/mocks/OmnichannelMock";
import ReportingMock from "@/components/features/mocks/ReportingMock";
import {
  FEATURE_PAGES,
  featureHref,
  type FeaturePageContent,
  type FeatureSlug,
} from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;
const HERO_CYCLE_MS = 3200;

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

const ACCENTS: Record<FeatureSlug, string> = {
  "gelen-kutusu": "#25D366",
  "yapay-zeka": "#188347",
  "ai-reklam": "#F59E0B",
  isbirligi: "#0EA5E9",
  crm: "#0F766E",
  randevu: "#D97706",
  icerik: "#BE185D",
  "email-marketing": "#0284C7",
  raporlama: "#2DB56A",
};

const copy = {
  tr: {
    eyebrow: "Ürün haritası",
    title: "Tüm özellikler.",
    titleAccent: "Bir operasyon.",
    lead: "Her katman günlük operasyonunuzun farklı bir gerçeğine cevap verir. Sahneleri izleyin, detaya girin.",
    explore: "Detayı aç",
    cta: "Hemen Başlayın",
    outcome: "Sonuç",
    scene: "Sahne",
    scroll: "Aşağı kaydır",
    valueTitle: "Ne kazanırsınız",
    scenariosTitle: "Günlük senaryolar",
    mapEyebrow: "Operasyon haritası",
    mapTitle: "Tüm katmanlar.",
    mapAccent: "Tek akış.",
    mapLead:
      "Herhangi bir katmana girin — veya günlük operasyonunuzda nasıl bağlandıklarını görün.",
    pricingHint: "Önce paketlere mi bakmak istersiniz?",
    pricingLink: "Paketleri gör",
    live: "canlı",
    moreScenarios: "senaryo daha",
  },
  en: {
    eyebrow: "Product map",
    title: "All features.",
    titleAccent: "One operation.",
    lead: "Each layer answers a different truth in your daily operations. Watch the stages, open the detail.",
    explore: "Open detail",
    cta: "Get Started",
    outcome: "Outcome",
    scene: "Scene",
    scroll: "Scroll down",
    valueTitle: "What you gain",
    scenariosTitle: "Daily scenarios",
    mapEyebrow: "Operation map",
    mapTitle: "Every layer.",
    mapAccent: "One flow.",
    mapLead:
      "Jump into any layer — or see how they connect in a normal workday.",
    pricingHint: "Prefer pricing first?",
    pricingLink: "View plans",
    live: "live",
    moreScenarios: "more scenarios",
  },
};

type StageProps = { active: boolean; isEn: boolean };

/* ── Light-theme animated stages ───────────────────────── */

function StageInbox({ active, isEn }: StageProps) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center p-3 sm:p-4">
      <OmnichannelMock active={active} isEn={isEn} />
    </div>
  );
}

function StageAI({ active, isEn }: StageProps) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center p-3 sm:p-4">
      <AiAgentMock active={active} isEn={isEn} />
    </div>
  );
}

function StageAds({ active, isEn }: StageProps) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center p-3 sm:p-4">
      <AdsMock active={active} isEn={isEn} />
    </div>
  );
}

function StageCollab({ active, isEn }: StageProps) {
  const [step, setStep] = useState(1);
  const roles = isEn
    ? [
        { label: "Account", task: "Brief uploaded", Icon: Users },
        { label: "Editor", task: "Creative ready", Icon: UserPlus },
        { label: "Client", task: "Approval pending", Icon: Check },
      ]
    : [
        { label: "Hesap", task: "Brief yüklendi", Icon: Users },
        { label: "Editör", task: "Kreatif hazır", Icon: UserPlus },
        { label: "Müşteri", task: "Onay bekleniyor", Icon: Check },
      ];

  useEffect(() => {
    if (!active) return;
    const t = window.setInterval(() => setStep((p) => (p >= 2 ? 0 : p + 1)), 2000);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div className="flex h-full min-h-0 flex-col justify-center gap-3 overflow-hidden p-4 sm:p-5">
      <div className="flex shrink-0 items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-bonero-dark/35">
          {isEn ? "Approval flow" : "Onay hattı"}
        </p>
        <span className="font-mono text-[10px] text-bonero-green">{step + 1}/3</span>
      </div>
      <div className="h-1 shrink-0 overflow-hidden rounded-full bg-bonero-dark/8">
        <motion.div
          className="h-full rounded-full bg-bonero-green"
          animate={{ width: active ? `${((step + 1) / 3) * 100}%` : "33%" }}
          transition={{ duration: 0.4, ease }}
        />
      </div>
      <div className="space-y-2">
        {roles.map((r, i) => (
          <motion.div
            key={r.label}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
              active && i === step
                ? "border-bonero-green/30 bg-bonero-green/5"
                : "border-bonero-dark/8 bg-white"
            }`}
            animate={{ opacity: active ? (i <= step ? 1 : 0.45) : 0.5 }}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                i < step && active
                  ? "bg-bonero-green text-white"
                  : i === step && active
                    ? "border border-bonero-green text-bonero-green"
                    : "bg-bonero-dark/5 text-bonero-dark/40"
              }`}
            >
              {i < step && active ? (
                <Check size={13} strokeWidth={2.5} />
              ) : (
                <r.Icon size={14} />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-bonero-dark">{r.label}</p>
              <p className="text-[10px] text-bonero-dark/40">{r.task}</p>
            </div>
            {active && i === step && (
              <span className="text-[9px] font-bold tracking-wider text-bonero-green uppercase">
                {isEn ? "Now" : "Şimdi"}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StageReport({ active, isEn }: StageProps) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center p-3 sm:p-4">
      <ReportingMock active={active} isEn={isEn} />
    </div>
  );
}

function StageCrm({ active, isEn }: StageProps) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center p-3 sm:p-4">
      <CrmMock active={active} isEn={isEn} />
    </div>
  );
}

function StageAppointment({ active, isEn }: StageProps) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center p-3 sm:p-4">
      <AppointmentMock active={active} isEn={isEn} />
    </div>
  );
}

function StageContent({ active, isEn }: StageProps) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center p-3 sm:p-4">
      <ContentMock active={active} isEn={isEn} />
    </div>
  );
}

function StageEmail({ active, isEn }: StageProps) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center p-3 sm:p-4">
      <EmailMarketingMock active={active} isEn={isEn} />
    </div>
  );
}

const STAGES: Record<FeatureSlug, (p: StageProps) => ReactNode> = {
  "gelen-kutusu": StageInbox,
  "yapay-zeka": StageAI,
  "ai-reklam": StageAds,
  isbirligi: StageCollab,
  crm: StageCrm,
  randevu: StageAppointment,
  icerik: StageContent,
  "email-marketing": StageEmail,
  raporlama: StageReport,
};

function FeatureStage({
  feature,
  index,
  active,
  sceneLabel,
  isEn,
}: {
  feature: FeaturePageContent;
  index: number;
  active: boolean;
  sceneLabel: string;
  isEn: boolean;
}) {
  const Icon = ICONS[feature.slug];
  const accent = ACCENTS[feature.slug];
  const Stage = STAGES[feature.slug];

  return (
    <div
      className="relative min-h-[320px] overflow-hidden rounded-[1.5rem] border border-bonero-dark/8 bg-[#f3f6f4] shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:min-h-[360px]"
      role="img"
      aria-label={isEn ? feature.mockCaptionEn : feature.mockCaption}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 80% 0%, ${accent}22, transparent 55%)`,
          opacity: active ? 1 : 0.6,
        }}
      />
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-bonero-dark/8 bg-white shadow-sm"
          style={{ color: accent }}
        >
          <Icon size={16} strokeWidth={1.75} />
        </span>
        <span className="rounded-full border border-bonero-dark/8 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-bonero-dark/45 backdrop-blur-sm">
          {sceneLabel} {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="relative h-full min-h-[280px] pt-12 pb-10">
        <Stage active={active} isEn={isEn} />
      </div>
      <p className="pointer-events-none absolute right-4 bottom-3 left-4 z-10 text-[10px] text-bonero-dark/35 sm:left-auto sm:max-w-[55%]">
        {isEn ? feature.mockCaptionEn : feature.mockCaption}
      </p>
      <span
        className="pointer-events-none absolute -right-1 bottom-6 font-mono text-[4.5rem] font-bold leading-none text-bonero-dark/[0.04] sm:text-[6rem]"
        aria-hidden
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function FeatureSection({
  feature,
  index,
  isEn,
  t,
}: {
  feature: FeaturePageContent;
  index: number;
  isEn: boolean;
  t: (typeof copy)["tr"];
}) {
  const [inView, setInView] = useState(false);
  const reverse = index % 2 === 1;
  const valuePoints = isEn ? feature.valuePointsEn : feature.valuePoints;
  const scenarios = isEn ? feature.scenariosEn : feature.scenarios;
  const accent = ACCENTS[feature.slug];
  const extraScenarios = scenarios.slice(1);

  return (
    <motion.article
      id={`feature-${feature.slug}`}
      className="scroll-mt-32 border-b border-bonero-dark/6 last:border-b-0 sm:scroll-mt-36"
      onViewportEnter={() => setInView(true)}
      viewport={{ amount: 0.15, margin: "-80px 0px -20% 0px" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div
          className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <FeatureStage
            feature={feature}
            index={index}
            active={inView}
            sceneLabel={t.scene}
            isEn={isEn}
          />

          <Reveal delay={0.05}>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              {isEn ? feature.eyebrowEn : feature.eyebrow}
            </p>
            <h2 className="font-heading mt-3 text-2xl tracking-wide text-bonero-dark sm:text-3xl lg:text-4xl">
              {isEn ? feature.titleEn : feature.title}
            </h2>
            <p className="mt-3 text-lg font-semibold leading-snug text-bonero-dark/80">
              {isEn ? feature.headlineEn : feature.headline}
            </p>
            <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
              {isEn ? feature.leadEn : feature.lead}
            </p>

            <p className="mt-8 text-[11px] font-bold tracking-wide text-bonero-dark/35 uppercase">
              {t.valueTitle}
            </p>
            <ul className="mt-3 space-y-3">
              {valuePoints.map((vp) => (
                <li key={vp.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bonero-green text-white">
                    <Check size={11} strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-bonero-dark">{vp.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-bonero-dark/50">
                      {vp.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[11px] font-bold tracking-wide text-bonero-dark/35 uppercase">
              {t.scenariosTitle}
            </p>
            {scenarios[0] && (
              <div
                className="mt-3 rounded-xl border border-bonero-dark/8 bg-white/80 px-4 py-3"
                style={{ borderLeftWidth: 3, borderLeftColor: `${accent}88` }}
              >
                <p className="text-sm font-semibold text-bonero-dark">
                  {scenarios[0].label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-bonero-dark/50">
                  {scenarios[0].text}
                </p>
              </div>
            )}
            {extraScenarios.length > 0 && (
              <details className="group mt-3 rounded-xl border border-bonero-dark/8 bg-white/60">
                <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-bonero-dark/70 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="text-bonero-green">
                    +{extraScenarios.length}
                  </span>{" "}
                  {t.moreScenarios}
                </summary>
                <ul className="space-y-2 border-t border-bonero-dark/6 px-4 py-3">
                  {extraScenarios.map((s) => (
                    <li
                      key={s.label}
                      className="rounded-lg border border-bonero-dark/6 bg-white px-3 py-2.5"
                    >
                      <p className="text-sm font-semibold text-bonero-dark">
                        {s.label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-bonero-dark/50">
                        {s.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <div className="mt-8 rounded-xl border border-bonero-green/20 bg-bonero-green/5 px-4 py-3">
              <p className="text-[10px] font-bold tracking-wide text-bonero-green uppercase">
                {t.outcome}
              </p>
              <p className="mt-1 text-sm font-semibold text-bonero-dark">
                {isEn ? feature.outcomeEn : feature.outcome}
              </p>
            </div>

            <Link
              href={featureHref(feature.slug)}
              className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white shadow-md shadow-bonero-green/20 transition-colors hover:bg-bonero-green/90"
            >
              {t.explore}
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturesIndex() {
  const { locale } = useLocale();
  const t = copy[locale];
  const isEn = locale === "en";
  const [heroCycle, setHeroCycle] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);
  const [activeSlug, setActiveSlug] = useState<FeatureSlug>(FEATURE_PAGES[0].slug);
  const [pastHero, setPastHero] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const heroFeature = FEATURE_PAGES[heroCycle];
  const HeroIcon = ICONS[heroFeature.slug];
  const HeroStage = STAGES[heroFeature.slug];
  const heroAccent = ACCENTS[heroFeature.slug];

  useEffect(() => {
    if (heroPaused) return;
    setHeroProgress(0);
    const start = Date.now();
    const id = window.setInterval(() => {
      const p = Math.min((Date.now() - start) / HERO_CYCLE_MS, 1);
      setHeroProgress(p);
    }, 32);
    return () => clearInterval(id);
  }, [heroCycle, heroPaused]);

  useEffect(() => {
    if (heroPaused) return;
    const id = window.setInterval(
      () => setHeroCycle((p) => (p + 1) % FEATURE_PAGES.length),
      HERO_CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [heroPaused]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setPastHero(!e.isIntersecting),
      { threshold: 0, rootMargin: "-8% 0px 0px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    FEATURE_PAGES.forEach((f) => {
      const el = document.getElementById(`feature-${f.slug}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActiveSlug(f.slug);
        },
        { rootMargin: "-35% 0px -45% 0px", threshold: 0.1 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="bg-background">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16"
        style={{
          background:
            "linear-gradient(180deg, #f9fafb 0%, #f4f7f5 55%, #f9fafb 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 75% 20%, rgba(24,131,71,0.08), transparent 60%)",
          }}
        />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <Reveal>
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              {t.eyebrow}
            </p>
            <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.65rem]">
              {t.title}
              <span className="mt-1 block text-bonero-green">{t.titleAccent}</span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-bonero-dark/55">
              {t.lead}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={PANEL_REGISTER_URL}
                className="group inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-bonero-green/20 transition-colors hover:bg-bonero-green/90"
              >
                {t.cta}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href={`#feature-${FEATURE_PAGES[0].slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-bonero-dark/45 transition-colors hover:text-bonero-dark"
              >
                {t.scroll}
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ↓
                </motion.span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="relative overflow-hidden rounded-[1.5rem] border border-bonero-dark/8 bg-white shadow-[0_24px_60px_rgba(30,41,59,0.1)]"
              style={{
                background: `linear-gradient(135deg, #ffffff 0%, #f3f6f4 100%)`,
              }}
              onMouseEnter={() => setHeroPaused(true)}
              onMouseLeave={() => setHeroPaused(false)}
              onFocus={() => setHeroPaused(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setHeroPaused(false);
                }
              }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden
                style={{
                  background: `radial-gradient(ellipse at 70% 0%, ${heroAccent}18, transparent 55%)`,
                }}
              />
              <div className="relative flex items-center justify-between gap-3 border-b border-bonero-dark/6 px-4 py-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bonero-green/10"
                    style={{ color: heroAccent }}
                  >
                    <HeroIcon size={15} strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={heroFeature.slug}
                        className="truncate text-sm font-semibold text-bonero-dark"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isEn ? heroFeature.navLabelEn : heroFeature.navLabel}
                      </motion.p>
                    </AnimatePresence>
                    <p className="font-mono text-[10px] text-bonero-dark/35">
                      {String(heroCycle + 1).padStart(2, "0")} / 05 · {t.live}
                    </p>
                  </div>
                </div>
                <Link
                  href={featureHref(heroFeature.slug)}
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-bonero-dark/10 px-2.5 py-1.5 text-[11px] font-semibold text-bonero-green transition-colors hover:border-bonero-green/30 hover:bg-bonero-green/5"
                >
                  {t.explore}
                  <ArrowUpRight size={12} />
                </Link>
              </div>

              <div className="relative min-h-[280px] overflow-hidden sm:min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroFeature.slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <HeroStage active isEn={isEn} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="border-t border-bonero-dark/6 px-2 py-2 sm:px-3">
                <div className="flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {FEATURE_PAGES.map((f, i) => {
                    const on = heroCycle === i;
                    const Icon = ICONS[f.slug];
                    return (
                      <button
                        key={f.slug}
                        type="button"
                        onClick={() => setHeroCycle(i)}
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
                          on
                            ? "bg-bonero-dark text-white"
                            : "text-bonero-dark/45 hover:bg-bonero-dark/5 hover:text-bonero-dark"
                        }`}
                      >
                        <Icon size={12} strokeWidth={2} />
                        <span className="hidden sm:inline">
                          {isEn ? f.navLabelEn : f.navLabel}
                        </span>
                        <span className="font-mono sm:hidden">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="h-0.5 bg-bonero-dark/5">
                <div
                  className="h-full origin-left bg-bonero-green transition-[width] duration-75 ease-linear"
                  style={{ width: `${heroProgress * 100}%` }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sticky nav */}
      <nav
        className={`sticky top-16 z-40 overflow-hidden border-b bg-white/90 backdrop-blur-xl transition-[max-height,opacity,border-color] duration-300 sm:top-[4.5rem] ${
          pastHero
            ? "max-h-16 border-bonero-dark/8 opacity-100 shadow-sm"
            : "pointer-events-none max-h-0 border-transparent opacity-0"
        }`}
        aria-label={isEn ? "Feature sections" : "Özellik bölümleri"}
        aria-hidden={!pastHero}
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FEATURE_PAGES.map((f, i) => {
            const on = activeSlug === f.slug;
            const Icon = ICONS[f.slug];
            return (
              <a
                key={f.slug}
                href={`#feature-${f.slug}`}
                tabIndex={pastHero ? 0 : -1}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                  on
                    ? "bg-bonero-green text-white"
                    : "text-bonero-dark/50 hover:bg-bonero-dark/5 hover:text-bonero-dark"
                }`}
              >
                <Icon size={13} strokeWidth={2} />
                <span className="font-mono opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="max-w-[5.5rem] truncate sm:max-w-none">
                  {isEn ? f.navLabelEn : f.navLabel}
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Feature chapters */}
      <div className="relative">
        {FEATURE_PAGES.map((f, i) => (
          <FeatureSection key={f.slug} feature={f} index={i} isEn={isEn} t={t} />
        ))}
      </div>

      {/* Operation map */}
      <section
        className="relative overflow-hidden py-16 sm:py-24"
        style={{
          background:
            "linear-gradient(180deg, #f4f7f5 0%, #eef3f0 50%, #f7f9f8 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 70% 0%, rgba(24,131,71,0.1), transparent)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              {t.mapEyebrow}
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {t.mapTitle}
              <span className="mt-1 block text-bonero-green">{t.mapAccent}</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
              {t.mapLead}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {FEATURE_PAGES.map((f, i) => {
              const Icon = ICONS[f.slug];
              const accent = ACCENTS[f.slug];
              return (
                <Reveal key={f.slug} delay={i * 0.05}>
                  <Link
                    href={featureHref(f.slug)}
                    className="group glass-panel flex h-full flex-col rounded-2xl p-5 transition-[border-color,box-shadow] hover:border-bonero-green/25 hover:shadow-md"
                  >
                    <span className="font-mono text-[10px] text-bonero-dark/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="mt-3 flex h-10 w-10 items-center justify-center rounded-xl bg-bonero-green/10"
                      style={{ color: accent }}
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <span className="mt-3 text-sm font-semibold text-bonero-dark group-hover:text-bonero-green">
                      {isEn ? f.navLabelEn : f.navLabel}
                    </span>
                    <span className="mt-1 line-clamp-2 flex-1 text-[11px] leading-snug text-bonero-dark/45">
                      {isEn ? f.headlineEn : f.headline}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-bonero-green">
                      {t.explore}
                      <ArrowUpRight size={12} />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-8 text-sm text-bonero-dark/45">
            {t.pricingHint}{" "}
            <Link
              href="/paketler"
              className="font-semibold text-bonero-green transition-opacity hover:opacity-80"
            >
              {t.pricingLink} →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
