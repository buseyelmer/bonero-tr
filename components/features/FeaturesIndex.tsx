"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Camera,
  Check,
  LayoutDashboard,
  Mail,
  Megaphone,
  MessageCircle,
  Sparkles,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useLocale } from "@/components/LocaleProvider";
import {
  FEATURE_PAGES,
  featureHref,
  type FeaturePageContent,
  type FeatureSlug,
} from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;

const ICONS: Record<FeatureSlug, LucideIcon> = {
  "gelen-kutusu": LayoutDashboard,
  "yapay-zeka": Sparkles,
  "ai-reklam": Megaphone,
  isbirligi: Users,
  raporlama: BarChart3,
};

const THEMES: Record<
  FeatureSlug,
  { glow: string; tint: string; chip: string }
> = {
  "gelen-kutusu": {
    glow: "rgba(37,211,102,0.2)",
    tint: "#25D366",
    chip: "from-[#0d1f16] to-[#0b1220]",
  },
  "yapay-zeka": {
    glow: "rgba(24,131,71,0.28)",
    tint: "#188347",
    chip: "from-[#07110c] to-[#0b1220]",
  },
  "ai-reklam": {
    glow: "rgba(245,158,11,0.14)",
    tint: "#F59E0B",
    chip: "from-[#1a140c] to-[#0b1220]",
  },
  isbirligi: {
    glow: "rgba(56,189,248,0.12)",
    tint: "#38BDF8",
    chip: "from-[#0c1218] to-[#0b1220]",
  },
  raporlama: {
    glow: "rgba(24,131,71,0.22)",
    tint: "#2DB56A",
    chip: "from-[#0a0f14] to-[#0b1220]",
  },
};

const copy = {
  tr: {
    eyebrow: "Ürün haritası",
    title: "Beş özellik.",
    titleAccent: "Bir operasyon.",
    lead: "Her katman ajans gününün farklı bir gerçeğine cevap verir. Sahneleri izleyin, detaya girin.",
    explore: "Detayı aç",
    cta: "Hemen Başlayın",
    outcome: "Sonuç",
    scene: "Sahne",
    scroll: "Aşağı kaydır",
  },
  en: {
    eyebrow: "Product map",
    title: "Five features.",
    titleAccent: "One operation.",
    lead: "Each layer answers a different agency-day truth. Watch the stages, open the detail.",
    explore: "Open detail",
    cta: "Get Started",
    outcome: "Outcome",
    scene: "Scene",
    scroll: "Scroll",
  },
};

/* ── Per-feature animated stages ───────────────────────── */

function StageInbox({ active }: { active: boolean }) {
  const [i, setI] = useState(0);
  const rows = [
    { c: "#25D366", Icon: MessageCircle, t: "WhatsApp · stok sorusu", sub: "Acme Beauty" },
    { c: "#E1306C", Icon: Camera, t: "IG · story onayı", sub: "Brand Co." },
    { c: "#0EA5E9", Icon: Mail, t: "Mail · brief eki", sub: "Q3 kampanya" },
  ];

  useEffect(() => {
    if (!active) return;
    const t = window.setInterval(() => setI((p) => (p + 1) % rows.length), 2200);
    return () => clearInterval(t);
  }, [active, rows.length]);

  return (
    <div className="flex h-full min-h-0 flex-col justify-center gap-2 overflow-hidden p-4 sm:gap-2.5 sm:p-5">
      <div className="flex shrink-0 items-center justify-between gap-2">
        <p className="text-[10px] font-medium text-white/35">
          WhatsApp · IG · Mail
        </p>
        <span className="rounded-md bg-bonero-green/20 px-2 py-0.5 text-[10px] font-bold text-bonero-green">
          3 {active ? "yeni" : "…"}
        </span>
      </div>

      <div className="flex min-h-0 flex-col gap-2">
        {rows.map((r, idx) => (
          <motion.div
            key={r.t}
            className="flex items-center gap-3 rounded-xl border px-3 py-2.5 sm:px-3.5"
            animate={{
              borderColor:
                active && idx === i
                  ? "rgba(24,131,71,0.45)"
                  : "rgba(255,255,255,0.08)",
              backgroundColor:
                active && idx === i
                  ? "rgba(24,131,71,0.12)"
                  : "rgba(255,255,255,0.03)",
              x: active && idx === i ? 3 : 0,
              opacity: active ? (idx === i ? 1 : 0.45) : 0.55,
            }}
            transition={{ duration: 0.35, ease }}
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: `${r.c}22`, color: r.c }}
            >
              <r.Icon size={14} />
            </span>
            <div className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium text-white/80">
                {r.t}
              </span>
              <span className="text-[10px] text-white/30">{r.sub}</span>
            </div>
            {active && idx === i && (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-bonero-green" />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg bg-bonero-green px-2.5 py-1.5 text-[10px] font-semibold text-white"
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 2 }}
      >
        <Check size={11} strokeWidth={2.5} />
        Tek kutuda birleşti
      </motion.div>
    </div>
  );
}

function StageAI({ active }: { active: boolean }) {
  const lines = [
    { k: "Ton", v: "Marka · kibar" },
    { k: "Taslak", v: "Merhaba! Onayınızı aldık — kampanyayı takvime ekledik…" },
    { k: "Aksiyon", v: "Onayla & gönder" },
  ];
  return (
    <div className="flex h-full min-h-0 flex-col justify-center gap-2.5 overflow-hidden p-4 sm:gap-3 sm:p-5">
      <div className="flex shrink-0 items-center gap-2 text-bonero-green">
        <motion.span
          animate={active ? { rotate: [0, 12, -8, 0] } : {}}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={16} />
        </motion.span>
        <span className="text-xs font-semibold sm:text-sm">AI asistan</span>
        <span className="ml-auto font-mono text-[10px] text-white/30">
          {active ? "yazıyor…" : "hazır"}
        </span>
      </div>
      {lines.map((line, i) => (
        <motion.div
          key={line.k}
          className="shrink-0 rounded-xl border border-white/8 bg-white/[0.04] px-3.5 py-2.5"
          initial={false}
          animate={
            active ? { opacity: 1, x: 0 } : { opacity: 0.35, x: -6 }
          }
          transition={{ delay: active ? 0.12 + i * 0.1 : 0, duration: 0.4, ease }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
            {line.k}
          </p>
          <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-white/70">
            {line.v}
            {i === lines.length - 1 && active && (
              <motion.span
                className="ml-1 inline-block h-3 w-[2px] bg-bonero-green align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            )}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function StageAds({ active }: { active: boolean }) {
  const [focus, setFocus] = useState(0);
  const cards = [
    { l: "A", h: "Stok bitmeden yakala.", angle: "Aciliyet", m: "CTR 2.4%" },
    { l: "B", h: "Bu hafta %20 — sadece sen.", angle: "Teklif", m: "ROAS 3.1×" },
    { l: "C", h: "Sepette bıraktın.", angle: "Retarget", m: "+18% CVR" },
  ];

  useEffect(() => {
    if (!active) return;
    const t = window.setInterval(() => setFocus((p) => (p + 1) % 3), 2400);
    return () => clearInterval(t);
  }, [active]);

  const current = cards[focus];

  return (
    <div className="relative flex h-full min-h-0 flex-col justify-center overflow-hidden p-4 sm:p-5">
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
          Kreatif
        </p>
        <div className="flex gap-1.5">
          {cards.map((c, i) => (
            <span
              key={c.l}
              className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold ${
                i === focus
                  ? "bg-bonero-green text-white"
                  : "bg-white/8 text-white/35"
              }`}
            >
              {c.l}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.l}
          className="shrink-0 rounded-xl border border-bonero-green/35 bg-[#14110f] p-4 sm:p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease }}
        >
          <div className="flex items-start justify-between gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-bonero-green text-base font-bold text-white">
              {current.l}
            </span>
            <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-300/90">
              {current.angle}
            </span>
          </div>
          <p className="mt-3 font-heading text-xl font-bold leading-snug text-white sm:text-2xl">
            {current.h}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="rounded-lg bg-bonero-green px-2.5 py-1 text-[10px] font-bold text-white">
              Onaya hazır
            </span>
            <span className="font-mono text-[10px] text-bonero-green">{current.m}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-2.5 flex shrink-0 gap-2">
        {cards
          .filter((_, i) => i !== focus)
          .map((c) => (
            <div
              key={c.l}
              className="min-w-0 flex-1 rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1.5"
            >
              <span className="text-[10px] font-bold text-white/30">{c.l}</span>
              <p className="truncate text-[11px] text-white/40">{c.h}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

function StageCollab({ active }: { active: boolean }) {
  const [step, setStep] = useState(1);
  const roles = [
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
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
          Onay hattı
        </p>
        <span className="font-mono text-[10px] text-bonero-green">
          {step + 1}/3
        </span>
      </div>
      <div className="h-1 shrink-0 overflow-hidden rounded-full bg-white/10">
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
                ? "border-bonero-green/40 bg-bonero-green/10"
                : "border-white/8 bg-white/[0.03]"
            }`}
            animate={{
              opacity: active ? (i <= step ? 1 : 0.4) : 0.5,
            }}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                i < step && active
                  ? "bg-bonero-green text-white"
                  : i === step && active
                    ? "border border-bonero-green text-bonero-green"
                    : "bg-white/5 text-white/35"
              }`}
            >
              {i < step && active ? (
                <Check size={13} strokeWidth={2.5} />
              ) : (
                <r.Icon size={14} />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-white">{r.label}</p>
              <p className="text-[10px] text-white/35">{r.task}</p>
            </div>
            {active && i === step && (
              <span className="text-[9px] font-bold tracking-wider text-bonero-green uppercase">
                Şimdi
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StageReport({ active }: { active: boolean }) {
  const bars = [32, 48, 40, 62, 54, 78, 70, 88];
  return (
    <div className="flex h-full min-h-0 flex-col justify-center gap-3 overflow-hidden p-4 sm:gap-4 sm:p-5">
      <div className="grid shrink-0 grid-cols-3 gap-2">
        {[
          { k: "Yanıt", v: "−42%" },
          { k: "Açık", v: "18" },
          { k: "NPS", v: "4.8" },
        ].map((m) => (
          <div
            key={m.k}
            className="rounded-xl border border-white/8 bg-white/[0.03] px-2.5 py-2"
          >
            <p className="text-[9px] uppercase tracking-wider text-white/30">{m.k}</p>
            <p className="mt-0.5 font-heading text-base font-bold text-white sm:text-lg">
              {m.v}
            </p>
          </div>
        ))}
      </div>
      <div className="flex shrink-0 items-end justify-between">
        <span className="text-[11px] font-medium text-white/40">Haftalık</span>
        <motion.span
          className="font-mono text-[10px] text-bonero-green"
          animate={active ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.5 }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          LIVE
        </motion.span>
      </div>
      <div className="flex h-24 min-h-0 items-end gap-1.5 sm:h-28 sm:gap-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-bonero-green"
            style={{
              opacity: i === bars.length - 1 ? 1 : 0.55,
            }}
            initial={{ height: "12%" }}
            animate={{ height: active ? `${h}%` : "20%" }}
            transition={{ duration: 0.6, delay: active ? i * 0.05 : 0, ease }}
          />
        ))}
      </div>
    </div>
  );
}

const STAGES: Record<FeatureSlug, (p: { active: boolean }) => ReactNode> = {
  "gelen-kutusu": StageInbox,
  "yapay-zeka": StageAI,
  "ai-reklam": StageAds,
  isbirligi: StageCollab,
  raporlama: StageReport,
};

function FeatureChapter({
  feature,
  index,
  isEn,
  explore,
  outcomeLabel,
  sceneLabel,
}: {
  feature: FeaturePageContent;
  index: number;
  isEn: boolean;
  explore: string;
  outcomeLabel: string;
  sceneLabel: string;
}) {
  const [inView, setInView] = useState(false);
  const Icon = ICONS[feature.slug];
  const theme = THEMES[feature.slug];
  const Stage = STAGES[feature.slug];
  const scenario = (isEn ? feature.scenariosEn : feature.scenarios)[0];
  const reverse = index % 2 === 1;

  return (
    <motion.article
      id={`feature-${feature.slug}`}
      className="scroll-mt-32"
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      viewport={{ amount: 0.45 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
    >
      <div
        className={`page-pad mx-auto grid max-w-6xl items-center gap-8 py-14 sm:py-20 lg:grid-cols-2 lg:gap-14 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Stage */}
        <Link
          href={featureHref(feature.slug)}
          className={`group relative block min-h-[280px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${theme.chip} shadow-[0_40px_80px_-48px_rgba(0,0,0,0.9)] transition-[border-color,transform] duration-300 hover:border-bonero-green/35 sm:min-h-[320px]`}
        >
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
            aria-hidden
            style={{
              background: `radial-gradient(ellipse 70% 60% at 80% 0%, ${theme.glow}, transparent 55%)`,
              opacity: inView ? 1 : 0.5,
            }}
          />
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm"
              style={{ color: theme.tint }}
            >
              <Icon size={16} strokeWidth={1.75} />
            </span>
            <span className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/45 backdrop-blur-sm">
              {sceneLabel} {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="relative h-full pt-12">
            <Stage active={inView} />
          </div>
          <motion.span
            className="pointer-events-none absolute -bottom-2 -right-1 font-mono text-[5.5rem] font-bold leading-none text-white/[0.04] sm:text-[7rem]"
            animate={inView ? { opacity: 0.07, y: 0 } : { opacity: 0.03, y: 8 }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        </Link>

        {/* Copy */}
        <div className={reverse ? "lg:text-right" : ""}>
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: theme.tint }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {isEn ? feature.eyebrowEn : feature.eyebrow}
          </motion.p>
          <h2 className="mt-3 font-heading text-[1.75rem] font-bold leading-[1.15] tracking-tight text-white sm:text-4xl">
            {isEn ? feature.titleEn : feature.title}
          </h2>
          <p
            className={`mt-4 max-w-md text-base leading-relaxed text-white/50 ${
              reverse ? "lg:ml-auto" : ""
            }`}
          >
            {isEn ? feature.headlineEn : feature.headline}
          </p>

          {scenario && (
            <motion.blockquote
              className={`mt-6 max-w-md border-white/10 py-1 text-sm leading-relaxed text-white/40 ${
                reverse
                  ? "border-r-2 pr-4 lg:ml-auto lg:border-r-0 lg:border-l-2 lg:pr-0 lg:pl-4"
                  : "border-l-2 pl-4"
              }`}
              style={{ borderColor: `${theme.tint}55` }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <span className="font-semibold text-white/55">{scenario.label} — </span>
              {scenario.text}
            </motion.blockquote>
          )}

          <p
            className={`mt-5 max-w-md text-xs font-medium uppercase tracking-wider text-white/30 ${
              reverse ? "lg:ml-auto" : ""
            }`}
          >
            {outcomeLabel}
          </p>
          <p
            className={`mt-1 max-w-md text-sm font-medium text-white/65 ${
              reverse ? "lg:ml-auto" : ""
            }`}
          >
            {isEn ? feature.outcomeEn : feature.outcome}
          </p>

          <Link
            href={featureHref(feature.slug)}
            className={`group mt-8 inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-bonero-green/40 hover:bg-bonero-green/15 ${
              reverse ? "lg:flex-row-reverse" : ""
            }`}
          >
            {explore}
            <ArrowUpRight
              size={15}
              className="text-bonero-green transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturesIndex() {
  const { locale } = useLocale();
  const t = copy[locale];
  const isEn = locale === "en";
  const [activeSlug, setActiveSlug] = useState<FeatureSlug>(FEATURE_PAGES[0].slug);
  const [heroCycle, setHeroCycle] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  useEffect(() => {
    if (heroPaused) return;
    const id = window.setInterval(
      () => setHeroCycle((p) => (p + 1) % FEATURE_PAGES.length),
      3200,
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

  const heroFeature = FEATURE_PAGES[heroCycle];
  const HeroIcon = ICONS[heroFeature.slug];
  const HeroStage = STAGES[heroFeature.slug];
  const heroTheme = THEMES[heroFeature.slug];

  const pickHero = (i: number) => {
    setHeroPaused(true);
    setHeroCycle(i);
  };

  return (
    <div className="relative overflow-x-clip bg-bonero-dark text-white">
      <motion.div
        className="pointer-events-none fixed top-0 right-0 left-0 z-[90] h-[2px] origin-left bg-bonero-green"
        style={{ scaleX: progress }}
      />

      {/* Hero — brand + live product stage in one viewport */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-20 pb-8 sm:pt-24 sm:pb-10"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
      >
        <div
          className="pointer-events-none absolute inset-0 transition-[background] duration-700"
          aria-hidden
          style={{
            background: `
              radial-gradient(ellipse 55% 50% at 82% 45%, ${heroTheme.glow}, transparent 58%),
              radial-gradient(ellipse 40% 35% at 12% 70%, rgba(24,131,71,0.14), transparent 55%),
              linear-gradient(165deg, #070d16 0%, #0a1410 48%, #061018 100%)
            `,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.28]"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 70% 45%, black 15%, transparent 72%)",
          }}
        />

        <div className="page-pad relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.92fr_1.18fr] lg:gap-12">
          {/* Copy */}
          <div className="max-w-xl">
            <motion.p
              className="font-heading text-[clamp(2.5rem,5.5vw,3.75rem)] font-extrabold leading-none tracking-tight text-white"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              Bonero
            </motion.p>

            <h1 className="mt-4 font-heading text-[clamp(1.7rem,3.6vw,2.45rem)] font-bold leading-[1.08] tracking-tight text-white/90">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06, ease }}
              >
                {t.title}
              </motion.span>
              <motion.span
                className="mt-1 block text-bonero-green"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14, ease }}
              >
                {t.titleAccent}
              </motion.span>
            </h1>

            <motion.p
              className="mt-4 max-w-md text-sm leading-relaxed text-white/45 sm:text-[15px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.4, ease }}
            >
              {t.lead}
            </motion.p>

            <motion.div
              className="mt-7 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease }}
            >
              <Link
                href={PANEL_REGISTER_URL}
                className="group inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_48px_-18px_rgba(24,131,71,0.95)] transition-colors hover:bg-[#1a9a52]"
              >
                {t.cta}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <a
                href={`#feature-${FEATURE_PAGES[0].slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-white/35 transition-colors hover:text-white"
              >
                {t.scroll}
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ↓
                </motion.span>
              </a>
            </motion.div>
          </div>

          {/* Dominant stage panel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
          >
            <div
              className="pointer-events-none absolute -inset-5 rounded-[2rem] opacity-80"
              style={{
                background: `radial-gradient(ellipse at 50% 40%, ${heroTheme.glow}, transparent 65%)`,
              }}
              aria-hidden
            />

            <div
              className={`relative flex h-[min(440px,54svh)] flex-col overflow-hidden rounded-[1.5rem] border border-white/12 bg-gradient-to-br shadow-[0_40px_80px_-40px_rgba(0,0,0,0.95)] sm:h-[min(480px,58svh)] ${heroTheme.chip}`}
            >
              {/* Stage chrome */}
              <div className="relative z-10 flex shrink-0 items-center justify-between gap-3 border-b border-white/8 bg-black/20 px-4 py-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/25"
                    style={{ color: heroTheme.tint }}
                  >
                    <HeroIcon size={15} strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={heroFeature.slug}
                        className="truncate text-sm font-semibold text-white"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isEn ? heroFeature.navLabelEn : heroFeature.navLabel}
                      </motion.p>
                    </AnimatePresence>
                    <p className="font-mono text-[10px] text-white/30">
                      {String(heroCycle + 1).padStart(2, "0")} / 05 · live
                    </p>
                  </div>
                </div>
                <Link
                  href={featureHref(heroFeature.slug)}
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-semibold text-bonero-green transition-colors hover:border-bonero-green/40 hover:bg-bonero-green/15"
                >
                  {t.explore}
                  <ArrowUpRight size={12} />
                </Link>
              </div>

              {/* Animated stage body — clipped so content never overlaps chrome/tabs */}
              <div className="relative z-0 min-h-0 flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroFeature.slug}
                    className="absolute inset-0 overflow-hidden"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <HeroStage active />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Feature tabs inside panel */}
              <div className="relative z-10 shrink-0 border-t border-white/8 bg-black/35 px-2 py-2 sm:px-3">
                <div className="flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {FEATURE_PAGES.map((f, i) => {
                    const on = heroCycle === i;
                    const Icon = ICONS[f.slug];
                    return (
                      <button
                        key={f.slug}
                        type="button"
                        onClick={() => pickHero(i)}
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
                          on
                            ? "bg-bonero-green text-white"
                            : "text-white/40 hover:bg-white/5 hover:text-white"
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

              {/* Auto-progress */}
              <motion.div
                key={heroCycle}
                className="relative z-10 h-0.5 origin-left bg-bonero-green"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: heroPaused ? 0 : 1 }}
                transition={{
                  duration: heroPaused ? 0.2 : 3.2,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky chapter nav — appears after hero leaves */}
      <div
        className={`sticky top-16 z-40 overflow-hidden border-b bg-bonero-dark/92 backdrop-blur-xl transition-[max-height,opacity,border-color] duration-300 sm:top-[4.5rem] ${
          pastHero
            ? "max-h-16 border-white/8 opacity-100"
            : "pointer-events-none max-h-0 border-transparent opacity-0"
        }`}
        aria-hidden={!pastHero}
      >
        <div className="page-pad mx-auto flex max-w-6xl gap-1 overflow-x-auto py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                    : "text-white/45 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={13} strokeWidth={2} />
                <span className="font-mono opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {isEn ? f.navLabelEn : f.navLabel}
              </a>
            );
          })}
        </div>
      </div>

      {/* Chapters */}
      <div className="relative divide-y divide-white/8">
        {FEATURE_PAGES.map((f, i) => (
          <FeatureChapter
            key={f.slug}
            feature={f}
            index={i}
            isEn={isEn}
            explore={t.explore}
            outcomeLabel={t.outcome}
            sceneLabel={t.scene}
          />
        ))}
      </div>

      {/* Close — stack map (footer already owns register CTA) */}
      <section className="relative border-t border-white/8">
        <div className="page-pad mx-auto max-w-6xl py-14 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
              {isEn ? "Operation map" : "Operasyon haritası"}
            </p>
            <h2 className="mt-2 max-w-lg font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {isEn ? "Five layers. One flow." : "Beş katman. Tek akış."}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/45">
              {isEn
                ? "Jump into any layer — or see how they connect in a normal agency day."
                : "Herhangi bir katmana girin — veya ajans gününde nasıl bağlandıklarını görün."}
            </p>
          </motion.div>

          <div className="mt-10 flex flex-col gap-0 sm:flex-row sm:items-stretch">
            {FEATURE_PAGES.map((f, i) => {
              const Icon = ICONS[f.slug];
              const theme = THEMES[f.slug];
              return (
                <motion.div
                  key={f.slug}
                  className="flex min-w-0 flex-1 items-stretch"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35, ease }}
                >
                  <Link
                    href={featureHref(f.slug)}
                    className="group flex min-w-0 flex-1 flex-col border border-white/10 bg-white/[0.02] px-4 py-5 transition-colors hover:border-bonero-green/35 hover:bg-bonero-green/[0.06] sm:border-l-0 sm:first:border-l sm:first:rounded-l-2xl sm:last:rounded-r-2xl"
                  >
                    <span className="font-mono text-[10px] text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="mt-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20"
                      style={{ color: theme.tint }}
                    >
                      <Icon size={16} strokeWidth={1.75} />
                    </span>
                    <span className="mt-3 text-sm font-semibold text-white group-hover:text-bonero-green">
                      {isEn ? f.navLabelEn : f.navLabel}
                    </span>
                    <span className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/35">
                      {isEn ? f.headlineEn : f.headline}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-white/40 transition-colors group-hover:text-bonero-green">
                      {t.explore}
                      <ArrowUpRight size={12} />
                    </span>
                  </Link>
                  {i < FEATURE_PAGES.length - 1 && (
                    <div
                      className="hidden w-px shrink-0 self-center sm:block"
                      aria-hidden
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          <p className="mt-8 text-sm text-white/40">
            {isEn ? "Prefer pricing first?" : "Önce paketlere mi bakmak istersiniz?"}{" "}
            <Link
              href="/paketler"
              className="font-semibold text-bonero-green transition-opacity hover:opacity-80"
            >
              {isEn ? "View plans" : "Paketleri gör"} →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
