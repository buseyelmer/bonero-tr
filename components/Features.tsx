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
import { FEATURE_PAGES, featureHref } from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

type Feature = {
  id: string;
  icon: LucideIcon;
  name: string;
  tag: string;
  pain: string;
  solution: string;
  points: string[];
  detailSlug?: (typeof FEATURE_PAGES)[number]["slug"];
};

const features: Feature[] = [
  {
    id: "ai",
    icon: Sparkles,
    name: "AI İçerik Asistanı",
    tag: "Yapay zeka",
    pain: "Her müşteri için taslak üretmek günü yiyor.",
    solution: "Marka sesine uygun taslak ve yanıt önerileri — dakikalar içinde.",
    points: ["Yanıt önerisi", "Marka tonu", "Hızlı taslak"],
    detailSlug: "yapay-zeka",
  },
  {
    id: "ads",
    icon: Megaphone,
    name: "AI Reklam Üretimi",
    tag: "AI Reklam",
    pain: "Kampanya metni, varyasyon ve hook’lar manuel yazılıyor; tempo düşüyor.",
    solution:
      "Hedefe ve marka tonuna göre reklam metni + varyasyon — onay hattına hazır.",
    points: ["Meta / IG taslağı", "A/B varyasyon", "Onaya düşen kreatif"],
    detailSlug: "ai-reklam",
  },
  {
    id: "team",
    icon: Users,
    name: "Ekip Yönetimi",
    tag: "İşbirliği",
    pain: "Onaylar ve görevler e-posta zincirinde kayboluyor.",
    solution: "Rol bazlı onay ve görev atama — net sorumluluk, hızlı yayına çıkış.",
    points: ["Rol & yetki", "Görev ata", "Onay hattı"],
    detailSlug: "isbirligi",
  },
  {
    id: "analytics",
    icon: BarChart3,
    name: "Analitik & Raporlama",
    tag: "Rapor",
    pain: "Müşteri sunumu için veri toplamak zorlaşıyor.",
    solution: "Performans tek panelde — sunuma hazır, ölçülebilir raporlar.",
    points: ["Canlı metrik", "Müşteri özeti", "PDF’ye hazır"],
    detailSlug: "raporlama",
  },
];

/** One complete beat per feature — no mid-cycle phase flip */
const CYCLE_MS = 5500;
const ease = [0.22, 1, 0.36, 1] as const;

function VisualAI() {
  const lines = [
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
          <span className="text-[11px] font-semibold text-bonero-dark">AI öneri</span>
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
        Marka tonuna uygun
      </motion.span>
    </div>
  );
}

function VisualAds() {
  const variants = [
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
            AI reklam
          </span>
          <span className="text-[10px] font-medium text-bonero-dark/35">
            3 varyasyon
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
        Onaya hazır kreatif
      </motion.span>
    </div>
  );
}

function VisualTeam() {
  return (
    <div className="flex h-full items-center justify-center gap-3 px-4 sm:gap-5">
      {["Sen", "Editör", "Müşteri"].map((role, i) => (
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

function VisualAnalytics() {
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
        Haftalık performans · hazır
      </motion.p>
    </div>
  );
}

const visuals = [VisualAI, VisualAds, VisualTeam, VisualAnalytics];

export default function Features() {
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
    const t = window.setTimeout(() => {
      setActive((p) => (p + 1) % features.length);
    }, CYCLE_MS);
    return () => clearTimeout(t);
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
            Özellikler & Çözümler
          </p>
          <h2 className="font-heading mt-3 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
            Operasyon sorunlarına
            <span className="mt-1 block text-bonero-green">net cevaplar.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-bonero-dark/55">
            Özellik listesi değil — günlük operasyonunuzdaki gerçek sorunlara
            canlı çözüm.
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
                {f.tag}
              </button>
            );
          })}
        </div>

        <div className="mt-8 w-full min-w-0 overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:rounded-[1.5rem]">
          <div className="grid w-full min-w-0 lg:grid-cols-2 lg:items-stretch">
            {/* Visual fills full left column height */}
            <div className="relative flex min-h-[240px] min-w-0 flex-col border-b border-bonero-dark/6 bg-[#f3f6f4] lg:min-h-full lg:border-r lg:border-b-0">
              <div className="flex shrink-0 items-center gap-2 px-4 pt-4 sm:px-5 sm:pt-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bonero-green text-white">
                  <Icon size={15} strokeWidth={1.75} />
                </span>
                <span className="truncate text-sm font-semibold text-bonero-dark">
                  {current.name}
                </span>
              </div>

              <div className="relative min-h-[200px] flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Visual />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Copy — compact, no overflow */}
            <div className="flex min-w-0 flex-col justify-between gap-5 p-5 sm:gap-6 sm:p-6 lg:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease }}
                  className="min-w-0"
                >
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-amber-600/70 uppercase">
                    Sorun
                  </p>
                  <p className="mt-1 text-sm leading-snug text-bonero-dark/45">
                    {current.pain}
                  </p>

                  <p className="mt-4 text-[10px] font-semibold tracking-[0.18em] text-bonero-green uppercase">
                    Bonero ile
                  </p>
                  <h3 className="font-heading mt-1 text-xl !font-extrabold tracking-wide break-words text-bonero-dark sm:text-[1.35rem] sm:leading-snug">
                    {current.solution}
                  </h3>

                  <ul className="mt-4 space-y-2">
                    {current.points.map((p, i) => (
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
                    Detayı gör
                  </Link>
                ) : (
                  <a
                    href="/paketler"
                    className="inline-flex items-center justify-center rounded-lg border border-bonero-dark/12 bg-white px-4 py-2 text-sm font-medium text-bonero-dark transition-colors hover:border-bonero-dark/25"
                  >
                    Paketlere bak
                  </a>
                )}
                <Link
                  href={PANEL_REGISTER_URL}
                  className="inline-flex items-center justify-center rounded-lg bg-bonero-green px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-bonero-green/90"
                >
                  Hemen Başlayın
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
