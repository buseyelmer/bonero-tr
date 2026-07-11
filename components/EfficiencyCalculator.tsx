"use client";

import { useId, useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, TimerReset } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

const copy = {
  tr: {
    eyebrow: "Verim Hesaplama",
    title: "Harcanan saati,",
    titleAccent: "geri alın.",
    subtitle:
      "Onay ve içerik döngüsüne ayırdığınız haftalık saati kaydırın — Bonero’nun geri getirebileceği zamanı anında görün.",
    question: "Haftalık onay & operasyon saati",
    hours: "saat / hafta",
    now: "Şimdi",
    withBonero: "Bonero ile",
    saved: "Geri alınan",
    week: "hafta",
    month: "ay",
    year: "yıl",
    workDays: "iş günü / yıl",
    presets: "Hızlı seç",
    hint: "Model: onay döngülerinin ~%55’inin AI + tek panel ile geri kazanıldığı varsayımı.",
    cta: "Ücretsiz demo talep et",
    secondary: "hello@bonero.tr",
    weekVisual: "Haftalık tempo",
  },
  en: {
    eyebrow: "Efficiency Calculator",
    title: "Take back",
    titleAccent: "the hours.",
    subtitle:
      "Slide the weekly hours you burn on approvals — see what Bonero can return, instantly.",
    question: "Weekly approval & ops hours",
    hours: "hrs / week",
    now: "Now",
    withBonero: "With Bonero",
    saved: "Reclaimed",
    week: "week",
    month: "month",
    year: "year",
    workDays: "work days / year",
    presets: "Quick pick",
    hint: "Model: ~55% of approval-cycle time recovered via AI + one panel.",
    cta: "Request a free demo",
    secondary: "hello@bonero.tr",
    weekVisual: "Weekly tempo",
  },
};

const PRESETS = [6, 12, 20, 30];
const MIN = 2;
const MAX = 40;
const ease = [0.22, 1, 0.36, 1] as const;

function estimateSavings(hours: number) {
  return Math.max(1, Math.round(hours * 0.55));
}

function BigNum({ value, className }: { value: number; className?: string }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
        transition={{ duration: 0.28, ease }}
        className={className}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

function RecoveryRing({ pct }: { pct: number }) {
  const uid = useId().replace(/:/g, "");
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.min(pct, 100) / 100);

  return (
    <div className="relative h-[132px] w-[132px] shrink-0">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id={`ring-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a9d5c" />
            <stop offset="100%" stopColor="#188347" />
          </linearGradient>
        </defs>
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="9"
        />
        <motion.circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke={`url(#ring-${uid})`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.55, ease }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-heading text-3xl tracking-tight text-white tabular-nums">
          <BigNum value={Math.round(pct)} />
          <span className="text-bonero-green">%</span>
        </p>
      </div>
    </div>
  );
}

type Period = "week" | "month" | "year";

export default function EfficiencyCalculator() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [hours, setHours] = useState(12);
  const [period, setPeriod] = useState<Period>("year");

  const stats = useMemo(() => {
    const week = estimateSavings(hours);
    const remain = Math.max(0, hours - week);
    const month = week * 4;
    const year = week * 52;
    const workDays = Math.round(year / 8);
    return {
      week,
      month,
      year,
      remain,
      workDays,
      burnPct: (hours / MAX) * 100,
      savePct: hours > 0 ? (week / hours) * 100 : 0,
      hero:
        period === "week" ? week : period === "month" ? month : year,
    };
  }, [hours, period]);

  const periods: { id: Period; label: string }[] = [
    { id: "week", label: t.week },
    { id: "month", label: t.month },
    { id: "year", label: t.year },
  ];

  const blocks = 10;
  const savedBlocks = Math.round((stats.savePct / 100) * blocks);

  return (
    <section
      id="verim-hesaplama"
      className="relative overflow-hidden py-16 sm:py-24"
      style={{
        background:
          "linear-gradient(155deg, #070b09 0%, #0c1410 42%, #0a1012 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 72% 28%, rgba(24,131,71,0.3), transparent 60%), radial-gradient(ellipse 40% 35% at 12% 85%, rgba(24,131,71,0.1), transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="text-sm font-medium tracking-[0.2em] text-bonero-green uppercase">
              {t.eyebrow}
            </p>
            <h2 className="font-heading mt-4 text-3xl tracking-wide text-white sm:text-4xl lg:text-[2.85rem]">
              {t.title}
              <span className="mt-1 block text-bonero-green">
                {t.titleAccent}
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/45">
              {t.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <div
                className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1"
                role="tablist"
                aria-label={t.saved}
              >
                {periods.map((p) => {
                  const on = period === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setPeriod(p.id)}
                      className={`rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase transition-colors ${
                        on
                          ? "bg-bonero-green text-white"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>

              <div className="w-full lg:text-right">
                <p className="text-[11px] font-bold tracking-[0.22em] text-white/30 uppercase">
                  {t.saved} · {periods.find((p) => p.id === period)?.label}
                </p>
                <div className="mt-2 flex items-baseline gap-2 lg:justify-end">
                  <BigNum
                    value={stats.hero}
                    className="font-heading text-[clamp(4.5rem,14vw,7.5rem)] leading-none !font-extrabold tracking-tight text-white tabular-nums"
                  />
                  <span className="pb-2 text-lg font-semibold text-bonero-green sm:text-xl">
                    {locale === "tr" ? "saat" : "hrs"}
                  </span>
                </div>
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-white/40 lg:justify-end">
                  <CalendarDays size={14} className="text-bonero-green" />
                  ≈ {stats.workDays} {t.workDays}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-12 grid overflow-hidden rounded-[1.75rem] border border-white/10 lg:grid-cols-12">
            {/* Control */}
            <div className="border-b border-white/8 bg-white/[0.03] p-6 sm:p-8 lg:col-span-5 lg:border-r lg:border-b-0">
              <label
                htmlFor="approval-hours"
                className="block text-sm font-semibold text-white/70"
              >
                {t.question}
              </label>

              <div className="mt-7 flex items-end gap-3">
                <BigNum
                  value={hours}
                  className="font-heading text-6xl leading-none tracking-tight text-white tabular-nums sm:text-7xl"
                />
                <span className="pb-2 text-sm text-white/35">{t.hours}</span>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-[10px] font-bold tracking-[0.16em] text-white/30 uppercase">
                  {t.presets}
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((p) => {
                    const on = hours === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setHours(p)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-bold tabular-nums transition-colors ${
                          on
                            ? "bg-bonero-green text-white"
                            : "bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/70"
                        }`}
                      >
                        {p}h
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7">
                <input
                  id="approval-hours"
                  type="range"
                  min={MIN}
                  max={MAX}
                  step={1}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="bonero-slider bonero-slider--on-dark w-full"
                  aria-valuemin={MIN}
                  aria-valuemax={MAX}
                  aria-valuenow={hours}
                  aria-label={t.question}
                />
                <div className="mt-2 flex justify-between text-[11px] font-medium text-white/25">
                  <span>{MIN}</span>
                  <span>{MAX}</span>
                </div>
              </div>

              {/* Dual tempo bars */}
              <div className="mt-9 space-y-5">
                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="font-medium text-white/40">{t.now}</span>
                    <span className="tabular-nums text-white/55">{hours}h</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className="h-full rounded-full bg-white/35"
                      animate={{ width: `${stats.burnPct}%` }}
                      transition={{ duration: 0.35, ease }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 font-medium text-bonero-green">
                      <TimerReset size={12} />
                      {t.withBonero}
                    </span>
                    <span className="tabular-nums text-bonero-green">
                      {stats.remain}h
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className="h-full rounded-full bg-bonero-green"
                      animate={{ width: `${(stats.remain / MAX) * 100}%` }}
                      transition={{ duration: 0.35, ease }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Scoreboard */}
            <div className="relative flex flex-col justify-between gap-8 bg-[#0a0f0c] p-6 sm:p-8 lg:col-span-7">
              <div
                className="pointer-events-none absolute top-0 right-0 h-56 w-56 rounded-full opacity-45"
                style={{
                  background:
                    "radial-gradient(circle, rgba(24,131,71,0.4), transparent 70%)",
                }}
                aria-hidden="true"
              />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <RecoveryRing pct={stats.savePct} />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold tracking-[0.18em] text-white/35 uppercase">
                    {t.weekVisual}
                  </p>
                  <div className="mt-3 flex gap-1.5">
                    {Array.from({ length: blocks }, (_, i) => {
                      const reclaimed = i < savedBlocks;
                      return (
                        <motion.span
                          key={i}
                          className={`h-10 flex-1 rounded-md ${
                            reclaimed ? "bg-bonero-green" : "bg-white/10"
                          }`}
                          initial={{ opacity: 0, scaleY: 0.6 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          transition={{
                            delay: 0.03 * i,
                            duration: 0.3,
                            ease,
                          }}
                          style={{ transformOrigin: "bottom" }}
                        />
                      );
                    })}
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] font-medium text-white/30">
                    <span>{t.saved}</span>
                    <span>{t.now}</span>
                  </div>
                </div>
              </div>

              <div className="relative grid gap-3 sm:grid-cols-3">
                {(
                  [
                    { id: "week" as const, label: t.week, value: stats.week },
                    { id: "month" as const, label: t.month, value: stats.month },
                    { id: "year" as const, label: t.year, value: stats.year },
                  ]
                ).map((cell) => {
                  const on = period === cell.id;
                  return (
                    <button
                      key={cell.id}
                      type="button"
                      onClick={() => setPeriod(cell.id)}
                      className={`rounded-2xl px-4 py-4 text-left transition-colors ${
                        on
                          ? "bg-bonero-green/15 ring-1 ring-bonero-green/35"
                          : "bg-white/[0.04] hover:bg-white/[0.06]"
                      }`}
                    >
                      <p className="text-[10px] font-bold tracking-[0.16em] text-white/35 uppercase">
                        / {cell.label}
                      </p>
                      <p
                        className={`font-heading mt-1.5 text-3xl tracking-tight tabular-nums ${
                          on ? "text-bonero-green" : "text-white"
                        }`}
                      >
                        <BigNum value={cell.value} />
                      </p>
                      <p className="mt-0.5 text-xs text-white/30">
                        {locale === "tr" ? "saat" : "hrs"}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="relative">
                <p className="max-w-md text-xs leading-relaxed text-white/35">
                  {t.hint}
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/iletisim"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-bonero-green px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-bonero-green/25 transition-transform hover:scale-[1.02]"
                  >
                    {t.cta}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                  <a
                    href="mailto:hello@bonero.tr"
                    className="inline-flex items-center justify-center px-2 text-sm font-medium text-white/40 transition-colors hover:text-white/70"
                  >
                    {t.secondary}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
