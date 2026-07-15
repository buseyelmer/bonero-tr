"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Check,
  Megaphone,
  Sparkles,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";
import { FEATURE_PAGES, featureHref } from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

type Feature = {
  id: string;
  icon: LucideIcon;
  name: { tr: string; en: string };
  tag: { tr: string; en: string };
  pain: { tr: string; en: string };
  solution: { tr: string; en: string };
  points: { tr: string[]; en: string[] };
  detailSlug?: (typeof FEATURE_PAGES)[number]["slug"];
};

const features: Feature[] = [
  {
    id: "ai",
    icon: Sparkles,
    name: { tr: "AI İçerik Asistanı", en: "AI Content Assistant" },
    tag: { tr: "Yapay zeka", en: "AI" },
    pain: {
      tr: "Her müşteri için taslak üretmek günü yiyor.",
      en: "Drafting for every customer eats the day.",
    },
    solution: {
      tr: "Marka sesine uygun taslak ve yanıt önerileri — dakikalar içinde.",
      en: "Brand-voice drafts and reply suggestions — in minutes.",
    },
    points: {
      tr: ["Yanıt önerisi", "Marka tonu", "Hızlı taslak"],
      en: ["Reply suggestions", "Brand tone", "Fast drafts"],
    },
    detailSlug: "yapay-zeka",
  },
  {
    id: "ads",
    icon: Megaphone,
    name: { tr: "AI Reklam Üretimi", en: "AI Ad Generation" },
    tag: { tr: "AI Reklam", en: "AI Ads" },
    pain: {
      tr: "Kampanya metni, varyasyon ve hook’lar manuel yazılıyor; tempo düşüyor.",
      en: "Campaign copy, variants, and hooks are written by hand — tempo drops.",
    },
    solution: {
      tr: "Hedefe ve marka tonuna göre reklam metni + varyasyon — onay hattına hazır.",
      en: "Ad copy + variants for your goal and brand tone — ready for approval.",
    },
    points: {
      tr: ["Meta / IG taslağı", "A/B varyasyon", "Onaya düşen kreatif"],
      en: ["Meta / IG drafts", "A/B variants", "Creatives into approval"],
    },
    detailSlug: "ai-reklam",
  },
  {
    id: "team",
    icon: Users,
    name: { tr: "Ekip Yönetimi", en: "Team Management" },
    tag: { tr: "İşbirliği", en: "Collaboration" },
    pain: {
      tr: "Onaylar ve görevler e-posta zincirinde kayboluyor.",
      en: "Approvals and tasks get lost in email threads.",
    },
    solution: {
      tr: "Rol bazlı onay ve görev atama — net sorumluluk, hızlı yayına çıkış.",
      en: "Role-based approvals and task assignment — clear ownership, faster publish.",
    },
    points: {
      tr: ["Rol & yetki", "Görev ata", "Onay hattı"],
      en: ["Roles & permissions", "Assign tasks", "Approval line"],
    },
    detailSlug: "isbirligi",
  },
  {
    id: "analytics",
    icon: BarChart3,
    name: { tr: "Analitik & Raporlama", en: "Analytics & Reporting" },
    tag: { tr: "Rapor", en: "Reports" },
    pain: {
      tr: "Müşteri sunumu için veri toplamak zorlaşıyor.",
      en: "Pulling data for client presentations gets painful.",
    },
    solution: {
      tr: "Performans tek panelde — sunuma hazır, ölçülebilir raporlar.",
      en: "Performance in one panel — presentation-ready, measurable reports.",
    },
    points: {
      tr: ["Canlı metrik", "Müşteri özeti", "PDF’ye hazır"],
      en: ["Live metrics", "Client summary", "PDF-ready"],
    },
    detailSlug: "raporlama",
  },
];

const CYCLE_MS = 5500;
const ease = [0.22, 1, 0.36, 1] as const;

function VisualAI({ isEn }: { isEn: boolean }) {
  const lines = isEn
    ? [
        "Hi! We’ve got your approval…",
        "Added to the campaign calendar.",
        "Sharing the extra file now.",
      ]
    : [
        "Merhaba! Onayınızı aldık…",
        "Kampanya takvimine ekledik.",
        "Ek dosyayı paylaşıyorum.",
      ];
  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <motion.div
        className="w-full max-w-[260px] overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white shadow-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
      >
        <div className="flex items-center gap-2 border-b border-bonero-dark/6 bg-bonero-dark/[0.03] px-3 py-2">
          <Sparkles size={14} className="text-bonero-green" />
          <span className="text-[11px] font-semibold text-bonero-dark">
            {isEn ? "AI suggestion" : "AI öneri"}
          </span>
        </div>
        <div className="space-y-2 p-3">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              className="rounded-lg bg-bonero-dark/[0.04] px-2.5 py-2 text-[11px] text-bonero-dark/65"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.2, duration: 0.35, ease }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
      <motion.span
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-bonero-green/10 px-3 py-1 text-[10px] font-bold text-bonero-green"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.35 }}
      >
        <Check size={11} strokeWidth={2.5} />
        {isEn ? "Matches brand tone" : "Marka tonuna uygun"}
      </motion.span>
    </div>
  );
}

function VisualAds({ isEn }: { isEn: boolean }) {
  const variants = isEn
    ? [
        { label: "A", hook: "Grab it before stock runs out." },
        { label: "B", hook: "20% this week — just for you." },
        { label: "C", hook: "You left it in the cart. We reminded you." },
      ]
    : [
        { label: "A", hook: "Stok bitmeden yakala." },
        { label: "B", hook: "Bu hafta %20 — sadece sen." },
        { label: "C", hook: "Sepette bıraktın. Biz hatırlattık." },
      ];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-5">
      <motion.div
        className="w-full max-w-[270px] overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white shadow-lg"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
      >
        <div className="flex items-center justify-between border-b border-bonero-dark/6 bg-bonero-dark/[0.03] px-3 py-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-bonero-dark">
            <Megaphone size={13} className="text-bonero-green" />
            {isEn ? "AI ads" : "AI reklam"}
          </span>
          <span className="text-[10px] font-medium text-bonero-dark/35">
            {isEn ? "3 variants" : "3 varyasyon"}
          </span>
        </div>
        <div className="space-y-2 p-3">
          {variants.map((v, i) => (
            <motion.div
              key={v.label}
              className="flex items-start gap-2.5 rounded-xl border border-bonero-dark/6 bg-bonero-dark/[0.03] px-2.5 py-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.18, duration: 0.35, ease }}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-bonero-green/15 text-[10px] font-bold text-bonero-green">
                {v.label}
              </span>
              <p className="text-[11px] leading-snug text-bonero-dark/70">
                {v.hook}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.span
        className="inline-flex items-center gap-1.5 rounded-full bg-bonero-green/10 px-3 py-1 text-[10px] font-bold text-bonero-green"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.35 }}
      >
        <Check size={11} strokeWidth={2.5} />
        {isEn ? "Creative ready for approval" : "Onaya hazır kreatif"}
      </motion.span>
    </div>
  );
}

function VisualTeam({ isEn }: { isEn: boolean }) {
  const roles = isEn ? ["You", "Editor", "Client"] : ["Sen", "Editör", "Müşteri"];
  return (
    <div className="flex h-full items-center justify-center gap-3 px-4 sm:gap-5">
      {roles.map((role, i) => (
        <motion.div
          key={role}
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.15, duration: 0.4, ease }}
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border sm:h-14 sm:w-14 ${
              i === 1
                ? "border-bonero-green bg-bonero-green text-white shadow-lg shadow-bonero-green/30"
                : "border-bonero-dark/10 bg-white text-bonero-dark/50"
            }`}
          >
            {i === 1 ? <UserPlus size={18} /> : <Users size={16} />}
          </div>
          <span className="text-[10px] font-semibold text-bonero-dark/45">
            {role}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function VisualAnalytics({ isEn }: { isEn: boolean }) {
  const bars = [35, 55, 42, 70, 58, 88];
  return (
    <div className="flex h-full flex-col items-center justify-center px-8">
      <div className="flex h-28 w-full max-w-[240px] items-end gap-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-bonero-green"
            initial={{ height: "12%" }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.7, delay: 0.25 + i * 0.08, ease }}
          />
        ))}
      </div>
      <motion.p
        className="mt-4 text-xs font-semibold text-bonero-dark/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {isEn ? "Weekly performance · ready" : "Haftalık performans · hazır"}
      </motion.p>
    </div>
  );
}

const visuals = [VisualAI, VisualAds, VisualTeam, VisualAnalytics];

const chrome = {
  tr: {
    eyebrow: "Özellikler & Çözümler",
    title: "Operasyon sorunlarına",
    accent: "net cevaplar.",
    lead: "Özellik listesi değil — günlük operasyonunuzdaki gerçek sorunlara canlı çözüm.",
    pain: "Sorun",
    withBonero: "Bonero ile",
    detail: "Detayı gör",
    packages: "Paketlere bak",
    cta: "Hemen Başlayın",
  },
  en: {
    eyebrow: "Features & solutions",
    title: "Clear answers to",
    accent: "ops problems.",
    lead: "Not a feature list — live solutions for the real problems in your day-to-day operations.",
    pain: "Problem",
    withBonero: "With Bonero",
    detail: "See details",
    packages: "View packages",
    cta: "Get Started",
  },
};

export default function Features() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const t = chrome[locale];
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const current = features[active];
  const Icon = current.icon;
  const Visual = visuals[active];

  useEffect(() => {
    const el = document.getElementById("cozumler");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timer = window.setTimeout(() => {
      setActive((p) => (p + 1) % features.length);
    }, CYCLE_MS);
    return () => clearTimeout(timer);
  }, [active, inView]);

  return (
    <section
      id="cozumler"
      className="relative overflow-x-clip bg-background py-16 sm:py-24"
    >
      <div
        className="pointer-events-none absolute top-0 left-0 h-80 w-80 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(24,131,71,0.07), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
            {t.title}
            <span className="mt-1 block text-bonero-green">{t.accent}</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-bonero-dark/55">
            {t.lead}
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {features.map((f, i) => {
            const on = active === i;
            const FIcon = f.icon;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(i)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                  on
                    ? "bg-bonero-dark text-white shadow-md"
                    : "bg-bonero-dark/[0.04] text-bonero-dark/50 hover:bg-bonero-dark/[0.08] hover:text-bonero-dark/80"
                }`}
              >
                <FIcon size={15} strokeWidth={1.75} />
                {f.tag[locale]}
              </button>
            );
          })}
        </div>

        <div className="mt-8 w-full min-w-0 overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:rounded-[1.5rem]">
          <div className="grid w-full min-w-0 lg:grid-cols-2 lg:items-stretch">
            <div className="relative flex min-h-[240px] min-w-0 flex-col border-b border-bonero-dark/6 bg-[#f3f6f4] lg:min-h-full lg:border-r lg:border-b-0">
              <div className="flex shrink-0 items-center gap-2 px-4 pt-4 sm:px-5 sm:pt-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bonero-green text-white">
                  <Icon size={15} strokeWidth={1.75} />
                </span>
                <span className="truncate text-sm font-semibold text-bonero-dark">
                  {current.name[locale]}
                </span>
              </div>

              <div className="relative min-h-[200px] flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${active}-${locale}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Visual isEn={isEn} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-between gap-5 p-5 sm:gap-6 sm:p-6 lg:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${active}-${locale}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease }}
                  className="min-w-0"
                >
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-amber-600/70 uppercase">
                    {t.pain}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-bonero-dark/45">
                    {current.pain[locale]}
                  </p>

                  <p className="mt-4 text-[10px] font-semibold tracking-[0.18em] text-bonero-green uppercase">
                    {t.withBonero}
                  </p>
                  <h3 className="font-heading mt-1 text-xl !font-extrabold tracking-wide break-words text-bonero-dark sm:text-[1.35rem] sm:leading-snug">
                    {current.solution[locale]}
                  </h3>

                  <ul className="mt-4 space-y-2">
                    {current.points[locale].map((p, i) => (
                      <motion.li
                        key={p}
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.08, duration: 0.3 }}
                        className="flex items-center gap-2 text-sm font-medium text-bonero-dark/70"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bonero-green text-white">
                          <Check size={11} strokeWidth={2.5} />
                        </span>
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap gap-2">
                {current.detailSlug ? (
                  <Link
                    href={featureHref(current.detailSlug)}
                    className="inline-flex items-center justify-center rounded-lg border border-bonero-dark/12 bg-white px-4 py-2 text-sm font-medium text-bonero-dark transition-colors hover:border-bonero-dark/25"
                  >
                    {t.detail}
                  </Link>
                ) : (
                  <a
                    href="/paketler"
                    className="inline-flex items-center justify-center rounded-lg border border-bonero-dark/12 bg-white px-4 py-2 text-sm font-medium text-bonero-dark transition-colors hover:border-bonero-dark/25"
                  >
                    {t.packages}
                  </a>
                )}
                <Link
                  href={PANEL_REGISTER_URL}
                  className="inline-flex items-center justify-center rounded-lg bg-bonero-green px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-bonero-green/90"
                >
                  {t.cta}
                </Link>
              </div>
            </div>
          </div>

          <div className="h-0.5 w-full bg-bonero-dark/5">
            <motion.div
              key={`bar-${active}`}
              className="h-full origin-left bg-bonero-green"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
