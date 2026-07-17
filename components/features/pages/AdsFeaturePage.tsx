"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  FileText,
  Layers,
  Megaphone,
  PenLine,
  Rocket,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import AdsMock from "@/components/features/mocks/AdsMock";
import { useLocale } from "@/components/LocaleProvider";
import { featureHref } from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;
const FRAME_HOLD = 4000;

const platformColors = {
  Meta: "#1877F2",
  Google: "#EA4335",
  TikTok: "#010101",
};

const copy = {
  tr: {
    back: "Tüm özellikler",
    heroEyebrow: "Reklam masası",
    heroTitle: "Brief gir.",
    heroAccent: "Kampanya çıksın.",
    heroLead:
      "Meta, Google, TikTok — üç panel, üç sekme, üç export. Bonero’da harcama, ROAS ve kreatif aynı masada; brief’ten varyasyona, yayına kadar tek akış.",
    heroCtaPrimary: "Reklam masasını aç",
    heroCtaSecondary: "Günün akışına bak",
    heroMetrics: [
      { value: "3", suffix: "", label: "platform bir arada" },
      { value: "A/B", suffix: "", label: "kreatif varyasyon" },
      { value: "1", suffix: "", label: "ekran, sıfır sekme" },
    ],
    chaosTitle: "Sekmeler arası ping-pong",
    chaosLead: "Her platform kendi penceresinde — bütçe bir yerde, kreatif başka yerde, rapor üçüncü sekmede.",
    chaosTabs: ["Meta Ads", "Google Ads", "TikTok", "Sheets", "Mail"],
    chaosItems: [
      "Hangi kreatif kazandı — hâlâ belirsiz",
      "Bütçe bir panelde eridi, fırsat diğerinde kaldı",
      "Müşteri raporu için manuel export",
      "Toplantıya yetişmek için veri toplama",
    ],
    chaosAfter: "Bonero’da harcama, varyasyon ve yayın aynı masada.",
    framesTitle: "Kreatif çerçeveleri",
    framesLead: "Brief’ten üç varyasyon — hangisi kazanırsa tek tıkla tüm platformlara.",
    frames: [
      {
        id: "a",
        label: "A",
        hook: "Stok bitmeden randevu al.",
        tag: "Aciliyet",
        ctr: "2.8%",
        platforms: ["Meta", "TikTok"] as const,
      },
      {
        id: "b",
        label: "B",
        hook: "Bu hafta %20 — sadece sen.",
        tag: "Teklif",
        ctr: "3.4%",
        platforms: ["Meta", "Google"] as const,
      },
      {
        id: "c",
        label: "C",
        hook: "Bir şeyler seni bekliyor.",
        tag: "Retarget",
        ctr: "2.1%",
        platforms: ["Google", "TikTok"] as const,
      },
    ],
    routineTitle: "Gün boyunca masa",
    routineLead: "Sabah harcama, öğle kreatif, öğleden sonra bütçe — tek ekrandan.",
    routine: [
      {
        time: "09:15",
        title: "Harcama özeti",
        body: "Meta, Google, TikTok yan yana — hangisi bütçe yiyor, hangisi dönüştürüyor net.",
        pill: "₺25b · 3 platform",
      },
      {
        time: "10:40",
        title: "Yeni varyasyon",
        body: "Brief’ten üç hook; kazananı seç, Meta ve TikTok’a aynı anda uygula.",
        pill: "A/B/C hazır",
      },
      {
        time: "14:00",
        title: "Bütçe kaydırma",
        body: "Google ROAS düşmüş, TikTok yükselmiş — sinyal net, kaydırma tek tık.",
        pill: "Meta → TikTok %12",
      },
    ],
    flowTitle: "Masayı kur",
    flowLead: "Bağla, brief ver, varyasyon seç, yayınla — dört adım.",
    flow: [
      {
        n: "01",
        icon: Layers,
        title: "Platformları bağla",
        body: "Meta, Google, TikTok hesapları tek masada. Durum ve bütçe yan yana.",
      },
      {
        n: "02",
        icon: PenLine,
        title: "Brief ver",
        body: "Ürün, hedef kitle, teklif — kısa brief yeter; marka tonu korunur.",
      },
      {
        n: "03",
        icon: Zap,
        title: "Varyasyon seç",
        body: "Başlık ve hook kombinasyonları hazır; kazananı onayla.",
      },
      {
        n: "04",
        icon: Rocket,
        title: "Yayınla ve izle",
        body: "Kampanyayı aç, ROAS ve CTR’yi aynı ekranda takip et.",
      },
    ],
    relatedTitle: "Stack’e ekle",
    related: [
      {
        href: featureHref("raporlama"),
        icon: BarChart3,
        label: "Raporlama",
        body: "Kampanya sonuçları müşteri raporuna hazır.",
        accent: "from-emerald-500/10 to-bonero-green/5",
      },
      {
        href: featureHref("icerik"),
        icon: FileText,
        label: "İçerik",
        body: "Kreatif metinler içerik stüdyosuyla uyumlu.",
        accent: "from-sky-500/10 to-bonero-green/5",
      },
      {
        href: featureHref("crm"),
        icon: Users,
        label: "CRM",
        body: "Reklamdan gelen lead kart olarak düşer.",
        accent: "from-violet-500/10 to-bonero-green/5",
      },
    ],
    ctaTitle: "Reklam masanı bugün aç.",
    ctaBody: "Platformları bağla — brief’ten varyasyona aynı gün.",
    ctaEyebrow: "7 gün ücretsiz",
    ctaHint: "Kart gerekmez · Meta + Google + TikTok",
    ctaSignals: ["7 gün ücretsiz", "Çoklu platform", "A/B hazır"],
    ctaPrimary: "Ücretsiz dene",
    ctaSecondary: "Paketlere bak",
    ctaBullets: [
      "Meta, Google ve TikTok tek masada",
      "Brief’ten varyasyona dakikalar içinde",
      "ROAS ve bütçe sinyali net görünür",
    ],
  },
  en: {
    back: "All features",
    heroEyebrow: "Ad desk",
    heroTitle: "Drop a brief.",
    heroAccent: "Ship the campaign.",
    heroLead:
      "Meta, Google, TikTok — three consoles, three tabs, three exports. On Bonero, spend, ROAS, and creatives sit on one desk — from brief to variant to launch in one flow.",
    heroCtaPrimary: "Open ad desk",
    heroCtaSecondary: "See the day flow",
    heroMetrics: [
      { value: "3", suffix: "", label: "platforms together" },
      { value: "A/B", suffix: "", label: "creative variants" },
      { value: "1", suffix: "", label: "screen, zero tabs" },
    ],
    chaosTitle: "Tab ping-pong",
    chaosLead: "Every platform in its own window — budget in one place, creative in another, report in a third tab.",
    chaosTabs: ["Meta Ads", "Google Ads", "TikTok", "Sheets", "Mail"],
    chaosItems: [
      "Still unclear which creative won",
      "Budget burned in one panel, opportunity stuck in another",
      "Manual export for the client report",
      "Scrambling data before the meeting",
    ],
    chaosAfter: "On Bonero: spend, variants, and launch on one desk.",
    framesTitle: "Creative frames",
    framesLead: "Three variants from one brief — winner goes to every platform in one click.",
    frames: [
      {
        id: "a",
        label: "A",
        hook: "Stock won't last — book now.",
        tag: "Urgency",
        ctr: "2.8%",
        platforms: ["Meta", "TikTok"] as const,
      },
      {
        id: "b",
        label: "B",
        hook: "20% off this week only.",
        tag: "Offer",
        ctr: "3.4%",
        platforms: ["Meta", "Google"] as const,
      },
      {
        id: "c",
        label: "C",
        hook: "You left something waiting.",
        tag: "Retarget",
        ctr: "2.1%",
        platforms: ["Google", "TikTok"] as const,
      },
    ],
    routineTitle: "Your desk all day",
    routineLead: "Morning spend, midday creative, afternoon budget — one screen.",
    routine: [
      {
        time: "9:15am",
        title: "Spend summary",
        body: "Meta, Google, TikTok side by side — which burns budget, which converts.",
        pill: "₺25k · 3 platforms",
      },
      {
        time: "10:40am",
        title: "New variants",
        body: "Three hooks from the brief; pick the winner, push to Meta and TikTok at once.",
        pill: "A/B/C ready",
      },
      {
        time: "2:00pm",
        title: "Budget shift",
        body: "Google ROAS dipped, TikTok rose — signal is clear, shift in one click.",
        pill: "Meta → TikTok 12%",
      },
    ],
    flowTitle: "Set up the desk",
    flowLead: "Connect, brief, pick a variant, launch — four steps.",
    flow: [
      {
        n: "01",
        icon: Layers,
        title: "Connect platforms",
        body: "Meta, Google, TikTok accounts on one desk. Status and budget side by side.",
      },
      {
        n: "02",
        icon: PenLine,
        title: "Drop a brief",
        body: "Product, audience, offer — a short brief is enough; brand tone stays intact.",
      },
      {
        n: "03",
        icon: Zap,
        title: "Pick a variant",
        body: "Headline and hook combos ready; approve the winner.",
      },
      {
        n: "04",
        icon: Rocket,
        title: "Launch and watch",
        body: "Go live and track ROAS and CTR on the same screen.",
      },
    ],
    relatedTitle: "Add to your stack",
    related: [
      {
        href: featureHref("raporlama"),
        icon: BarChart3,
        label: "Reporting",
        body: "Campaign results ready for client decks.",
        accent: "from-emerald-500/10 to-bonero-green/5",
      },
      {
        href: featureHref("icerik"),
        icon: FileText,
        label: "Content",
        body: "Creative copy aligned with the content studio.",
        accent: "from-sky-500/10 to-bonero-green/5",
      },
      {
        href: featureHref("crm"),
        icon: Users,
        label: "CRM",
        body: "Ad leads land as ready cards.",
        accent: "from-violet-500/10 to-bonero-green/5",
      },
    ],
    ctaTitle: "Open your ad desk today.",
    ctaBody: "Connect platforms — brief to variant the same day.",
    ctaEyebrow: "7-day free trial",
    ctaHint: "No card required · Meta + Google + TikTok",
    ctaSignals: ["7-day free trial", "Multi-platform", "A/B ready"],
    ctaPrimary: "Try free",
    ctaSecondary: "View plans",
    ctaBullets: [
      "Meta, Google, and TikTok on one desk",
      "Brief to variant in minutes",
      "ROAS and budget signals stay visible",
    ],
  },
};

function HeroHeadline({ title, accent }: { title: string; accent: string }) {
  return (
    <h1 className="font-heading text-3xl leading-[1.15] tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
      <motion.span
        className="block"
        initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.55, ease }}
      >
        {title}
      </motion.span>
      <motion.span
        className="relative mt-1 inline-block pb-1 text-bonero-green"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease }}
      >
        <span className="relative z-[1]">{accent}</span>
        <motion.span
          className="pointer-events-none absolute inset-y-0 -inset-x-1 overflow-hidden rounded-sm"
          aria-hidden
        >
          <motion.span
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-bonero-green/20 to-transparent"
            initial={{ left: "-50%" }}
            animate={{ left: "150%" }}
            transition={{
              duration: 2.2,
              delay: 0.8,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          />
        </motion.span>
      </motion.span>
    </h1>
  );
}

function TabChaosVisual({ tabs, isEn }: { tabs: string[]; isEn: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-bonero-dark/10 bg-[#0f1c17] p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] text-white/35">
          {isEn ? "9 tabs open" : "9 sekme açık"}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tabs.map((tab, i) => (
          <motion.span
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, ease }}
            className={`rounded-t-lg border border-b-0 px-2.5 py-1.5 text-[10px] font-semibold sm:text-[11px] ${
              i === 0
                ? "border-white/15 bg-white/10 text-white"
                : "border-white/8 bg-white/[0.04] text-white/45"
            }`}
            style={{ transform: `rotate(${(i - 2) * 1.5}deg)` }}
          >
            {tab}
          </motion.span>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-dashed border-white/10 bg-white/[0.03] px-4 py-8 text-center">
        <p className="text-xs text-white/30">
          {isEn ? "Which tab had the winning creative?" : "Kazanan kreatif hangi sekmedeydi?"}
        </p>
      </div>
      <motion.div
        className="absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-red-500/10 blur-2xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}

function HeroDeskVisual({ isEn }: { isEn: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [2.5, -2.5]), {
    stiffness: 90,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), {
    stiffness: 90,
    damping: 22,
  });

  const chips = [
    { name: "Meta", color: platformColors.Meta, x: -72, y: -48 },
    { name: "Google", color: platformColors.Google, x: 68, y: -42 },
    { name: "TikTok", color: platformColors.TikTok, x: 0, y: 58 },
  ];

  return (
    <div
      ref={ref}
      className="relative flex min-h-[360px] items-center lg:min-h-[400px]"
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(24,131,71,0.12), transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {chips.map((chip, i) => (
        <motion.span
          key={chip.name}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 inline-flex items-center gap-1.5 rounded-full border border-bonero-dark/8 bg-white px-2.5 py-1 text-[10px] font-bold shadow-md sm:text-[11px]"
          style={{ marginLeft: chip.x, marginTop: chip.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, i % 2 === 0 ? -4 : 4, 0],
          }}
          transition={{
            opacity: { delay: 0.2 + i * 0.1, duration: 0.4 },
            scale: { delay: 0.2 + i * 0.1, duration: 0.4 },
            y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: chip.color }} />
          {chip.name}
        </motion.span>
      ))}

      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 w-full [perspective:1200px] [transform-style:preserve-3d]"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white shadow-[0_32px_80px_rgba(30,41,59,0.14)] ring-1 ring-bonero-dark/[0.04]"
        >
          <div className="flex items-center gap-2 border-b border-bonero-dark/6 bg-[#f8faf9] px-3 py-2.5 sm:px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-1 truncate text-[10px] font-medium text-bonero-dark/40 sm:text-[11px]">
              Bonero · {isEn ? "Ad desk" : "Reklam masası"}
            </span>
            <motion.span
              className="ml-auto flex items-center gap-1 text-[9px] font-bold text-bonero-green"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingUp size={10} />
              ROAS
            </motion.span>
          </div>
          <div className="p-2 sm:p-3">
            <AdsMock active isEn={isEn} variant="full" highlight={0} />
          </div>
        </motion.div>

        <motion.div
          className="absolute -bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-bonero-green/20 bg-white px-3 py-1.5 text-[10px] font-semibold text-bonero-green shadow-[0_8px_24px_rgba(24,131,71,0.18)] sm:text-[11px]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5, ease }}
        >
          <Megaphone size={11} />
          {isEn ? "3 platforms · 1 desk" : "3 platform · 1 masa"}
        </motion.div>
      </motion.div>
    </div>
  );
}

function CreativeFrame({
  frame,
  active,
  isEn,
}: {
  frame: (typeof copy.tr.frames)[number];
  active: boolean;
  isEn: boolean;
}) {
  return (
    <motion.article
      layout
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all ${
        active
          ? "border-bonero-green/35 bg-white shadow-lg shadow-bonero-green/10 ring-1 ring-bonero-green/15"
          : "border-bonero-dark/8 bg-white/80 opacity-80 hover:opacity-100"
      }`}
      whileHover={active ? undefined : { y: -3 }}
    >
      <div
        className={`relative px-4 py-5 sm:px-5 sm:py-6 ${
          active ? "bg-gradient-to-br from-bonero-green/[0.06] to-transparent" : "bg-[#f8faf9]"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${
              active ? "bg-bonero-green text-white" : "bg-bonero-dark/8 text-bonero-dark/45"
            }`}
          >
            {frame.label}
          </span>
          <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-bonero-dark/45">
            CTR {frame.ctr}
          </span>
        </div>
        <p className="font-heading mt-4 text-lg leading-snug text-bonero-dark sm:text-xl">
          {frame.hook}
        </p>
        <p className="mt-2 text-[10px] font-bold tracking-wide text-bonero-green uppercase">
          {frame.tag}
        </p>
      </div>

      <div className="mt-auto border-t border-bonero-dark/6 px-4 py-3 sm:px-5">
        <p className="mb-2 text-[9px] font-semibold tracking-wide text-bonero-dark/35 uppercase">
          {isEn ? "Platforms" : "Platformlar"}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {frame.platforms.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-1 rounded-md border border-bonero-dark/8 bg-white px-2 py-1 text-[10px] font-semibold text-bonero-dark/65"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: platformColors[p] }}
              />
              {p}
            </span>
          ))}
        </div>
      </div>

      {active && (
        <motion.div
          layoutId="frame-active-bar"
          className="absolute bottom-0 left-0 h-0.5 bg-bonero-green"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: FRAME_HOLD / 1000, ease: "linear" }}
        />
      )}
    </motion.article>
  );
}

function AdsClosingCta({ t, isEn }: { t: (typeof copy)["tr"]; isEn: boolean }) {
  return (
    <section className="border-t border-bonero-dark/6 bg-[#f6f8f7] py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-[1.75rem] border border-bonero-dark/8 bg-white shadow-[0_24px_60px_rgba(30,41,59,0.08)]">
            <div className="grid lg:grid-cols-[1fr_auto]">
              {/* Green accent rail */}
              <div className="relative p-6 sm:p-8 lg:p-10">
                <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-bonero-green via-bonero-green/70 to-bonero-green/30 lg:w-1.5" />
                <p className="pl-4 text-[11px] font-bold tracking-[0.16em] text-bonero-green uppercase sm:pl-5">
                  {t.ctaEyebrow}
                </p>
                <h2 className="font-heading mt-3 max-w-lg pl-4 text-2xl tracking-wide text-bonero-dark sm:pl-5 sm:text-3xl">
                  {t.ctaTitle}
                </h2>
                <p className="mt-3 max-w-md pl-4 text-sm leading-relaxed text-bonero-dark/55 sm:pl-5 sm:text-base">
                  {t.ctaBody}
                </p>

                <ul className="mt-6 space-y-2.5 pl-4 sm:pl-5">
                  {t.ctaBullets.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-bonero-dark/70"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bonero-green/10">
                        <Check size={11} className="text-bonero-green" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2 pl-4 sm:pl-5">
                  {t.ctaSignals.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full border border-bonero-dark/8 bg-[#f6f8f7] px-3 py-1 text-[11px] font-semibold text-bonero-dark/55"
                    >
                      {signal}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3 pl-4 sm:pl-5">
                  <CtaButton
                    href={PANEL_REGISTER_URL}
                    variant="primary"
                    size="md"
                    icon={<ArrowUpRight size={15} />}
                  >
                    {t.ctaPrimary}
                  </CtaButton>
                  <CtaButton href="/paketler" variant="secondary" size="md">
                    {t.ctaSecondary}
                  </CtaButton>
                </div>
                <p className="mt-4 pl-4 text-xs text-bonero-dark/40 sm:pl-5">{t.ctaHint}</p>
              </div>

              {/* Mock panel */}
              <div className="border-t border-bonero-dark/6 bg-[#f3f6f4] p-5 sm:p-6 lg:w-[340px] lg:border-t-0 lg:border-l">
                <p className="mb-3 text-[10px] font-semibold tracking-wide text-bonero-dark/35 uppercase">
                  {isEn ? "Preview" : "Önizleme"}
                </p>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="overflow-hidden rounded-xl border border-bonero-dark/8 bg-white p-2 shadow-sm"
                >
                  <AdsMock active isEn={isEn} variant="compact" highlight={1} />
                </motion.div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(["Meta", "Google", "TikTok"] as const).map((name) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-1 rounded-md border border-bonero-dark/8 bg-white px-2 py-1 text-[10px] font-medium text-bonero-dark/55"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: platformColors[name] }}
                      />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function AdsFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const t = copy[locale];
  const [activeFrame, setActiveFrame] = useState(0);
  const [framesInView, setFramesInView] = useState(false);
  const framesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = framesRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setFramesInView(e.isIntersecting), {
      threshold: 0.35,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!framesInView) return;
    const id = window.setInterval(() => {
      setActiveFrame((p) => (p + 1) % t.frames.length);
    }, FRAME_HOLD);
    return () => clearInterval(id);
  }, [framesInView, t.frames.length]);

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden py-10 sm:py-14">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 15% 20%, rgba(24,131,71,0.1), transparent 55%), radial-gradient(ellipse 45% 40% at 90% 70%, rgba(24,119,242,0.06), transparent 50%)",
          }}
        />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-bonero-dark/45 hover:text-bonero-dark"
          >
            <ArrowLeft size={14} />
            {t.back}
          </Link>

          <div className="mt-6 grid items-center gap-10 lg:mt-8 lg:grid-cols-2 lg:gap-14">
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease }}
                className="inline-flex items-center gap-2 rounded-full border border-bonero-green/15 bg-bonero-green/[0.06] px-3 py-1 text-xs font-semibold tracking-wide text-bonero-green uppercase"
              >
                <Megaphone size={12} />
                {t.heroEyebrow}
              </motion.p>

              <div className="mt-4">
                <HeroHeadline title={t.heroTitle} accent={t.heroAccent} />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, ease }}
                className="mt-5 text-base leading-relaxed text-bonero-dark/55 sm:text-lg"
              >
                {t.heroLead}
              </motion.p>

              <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-3">
                {t.heroMetrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 + i * 0.07, ease }}
                    whileHover={{ y: -2 }}
                    className="rounded-xl border border-bonero-dark/8 bg-white/90 px-2 py-3 text-center shadow-sm backdrop-blur-sm sm:px-3"
                  >
                    <p className="font-heading text-xl text-bonero-dark sm:text-2xl">
                      {m.value}
                      {m.suffix && (
                        <span className="text-sm text-bonero-green">{m.suffix}</span>
                      )}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-tight text-bonero-dark/45 sm:text-[11px]">
                      {m.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, ease }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  href={PANEL_REGISTER_URL}
                  className="group inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-bonero-green/25 transition-all hover:scale-[1.02] hover:bg-bonero-green/90"
                >
                  {t.heroCtaPrimary}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
                <a
                  href="#rutin"
                  className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70 shadow-sm hover:border-bonero-dark/20"
                >
                  {t.heroCtaSecondary}
                  <motion.span
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-bonero-dark/35"
                  >
                    ↓
                  </motion.span>
                </a>
              </motion.div>
            </div>

            <HeroDeskVisual isEn={isEn} />
          </div>
        </div>
      </section>

      {/* Tab chaos */}
      <section className="border-y border-bonero-dark/6 bg-[#fafbfa] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <TabChaosVisual tabs={t.chaosTabs} isEn={isEn} />
            </Reveal>

            <Reveal delay={0.06}>
              <p className="text-sm font-semibold tracking-wide text-bonero-green uppercase">
                {isEn ? "The old way" : "Eski yol"}
              </p>
              <h2 className="font-heading mt-2 text-2xl tracking-wide text-bonero-dark sm:text-3xl">
                {t.chaosTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
                {t.chaosLead}
              </p>
              <ul className="mt-6 space-y-2">
                {t.chaosItems.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, ease }}
                    className="flex items-start gap-2.5 border-b border-bonero-dark/6 py-2.5 text-sm text-bonero-dark/65 last:border-0"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bonero-dark/25" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-bonero-green/20 bg-bonero-green/[0.05] px-4 py-3">
                <p className="flex items-start gap-2 text-sm font-semibold text-bonero-dark/75">
                  <Check size={16} className="mt-0.5 shrink-0 text-bonero-green" strokeWidth={2.5} />
                  {t.chaosAfter}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Creative frames */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.framesTitle}
            </h2>
            <p className="mt-2 text-sm text-bonero-dark/50 sm:text-base">{t.framesLead}</p>
          </Reveal>

          <div
            ref={framesRef}
            className="mt-10"
            onMouseEnter={() => setFramesInView(false)}
            onMouseLeave={() => setFramesInView(true)}
          >
            <div className="mb-4 flex flex-wrap gap-2">
              {t.frames.map((frame, i) => (
                <button
                  key={frame.id}
                  type="button"
                  onClick={() => setActiveFrame(i)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    activeFrame === i
                      ? "bg-bonero-dark text-white shadow-md"
                      : "border border-bonero-dark/10 bg-white text-bonero-dark/50 hover:border-bonero-dark/20"
                  }`}
                >
                  {isEn ? "Variant" : "Varyasyon"} {frame.label}
                </button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {t.frames.map((frame, i) => (
                  <motion.div
                    key={frame.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, ease }}
                    onClick={() => setActiveFrame(i)}
                    className="cursor-pointer"
                  >
                    <CreativeFrame frame={frame} active={activeFrame === i} isEn={isEn} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Day timeline */}
      <section
        id="rutin"
        className="scroll-mt-24 border-t border-bonero-dark/6 py-14 sm:py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-wide text-bonero-green uppercase">
                {isEn ? "Daily rhythm" : "Günlük ritim"}
              </p>
              <h2 className="font-heading mt-1 text-2xl tracking-wide text-bonero-dark sm:text-3xl">
                {t.routineTitle}
              </h2>
            </div>
            <p className="max-w-sm text-sm text-bonero-dark/50">{t.routineLead}</p>
          </Reveal>

          <ol className="relative mt-10 space-y-0">
            <div className="absolute top-3 bottom-3 left-[4.5rem] hidden w-px bg-bonero-dark/10 md:block" />
            {t.routine.map((entry, i) => (
              <Reveal key={entry.time} delay={i * 0.06}>
                <li className="grid gap-4 py-5 md:grid-cols-[5rem_1fr] md:gap-8 md:py-6">
                  <div className="relative md:text-right">
                    <p className="font-mono text-sm font-bold text-bonero-green">{entry.time}</p>
                    <span className="absolute top-1.5 -right-[calc(2rem+5px)] hidden h-2 w-2 rounded-full border-2 border-white bg-bonero-green md:block" />
                  </div>
                  <article className="rounded-xl border border-bonero-dark/8 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-heading text-lg text-bonero-dark">{entry.title}</h3>
                      <span className="rounded-full bg-[#f6f8f7] px-2.5 py-0.5 text-[10px] font-semibold text-bonero-dark/50">
                        {entry.pill}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">{entry.body}</p>
                  </article>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Setup flow — vertical rail */}
      <section className="border-t border-bonero-dark/6 bg-[#f6f8f7] py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-sm font-semibold tracking-wide text-bonero-green uppercase">
              {isEn ? "Setup" : "Kurulum"}
            </p>
            <h2 className="font-heading mt-1 text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.flowTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-bonero-dark/50">{t.flowLead}</p>
          </Reveal>

          <ol className="relative mt-10 space-y-0">
            <div className="absolute top-4 bottom-4 left-[1.35rem] w-px bg-bonero-green/20" />
            {t.flow.map((step, i) => {
              const Icon = step.icon;
              const last = i === t.flow.length - 1;
              return (
                <Reveal key={step.n} delay={i * 0.05}>
                  <li className={`relative flex gap-5 pb-8 ${last ? "pb-0" : ""}`}>
                    <span className="relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-white bg-bonero-green text-white shadow-sm shadow-bonero-green/20">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0 flex-1 rounded-xl border border-bonero-dark/8 bg-white px-5 py-4 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-bonero-green">
                          {step.n}
                        </span>
                        <h3 className="font-heading text-lg text-bonero-dark">{step.title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Related stack */}
      <section className="border-t border-bonero-dark/6 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-xl tracking-wide text-bonero-dark sm:text-2xl">
              {t.relatedTitle}
            </h2>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {t.related.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.href} delay={i * 0.06}>
                  <Link
                    href={r.href}
                    className="group relative block overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-bonero-green/25 hover:shadow-lg hover:shadow-bonero-green/5"
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${r.accent} opacity-0 transition-opacity group-hover:opacity-100`}
                    />
                    <div className="relative">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green transition-colors group-hover:bg-bonero-green group-hover:text-white">
                        <Icon size={18} strokeWidth={1.5} />
                      </span>
                      <p className="font-heading mt-3 text-lg text-bonero-dark group-hover:text-bonero-green">
                        {r.label}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-bonero-dark/55">
                        {r.body}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-bonero-green">
                        {isEn ? "Open" : "Detayı aç"}
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <AdsClosingCta t={t} isEn={isEn} />
    </div>
  );
}
