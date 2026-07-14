"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "./LocaleProvider";

const copy = {
  tr: {
    manual: "Manuel gün",
    bonero: "Bonero günü",
    daily: "günlük süre",
    reclaim: "Ayda geri kazandığınız",
    hours: "saat",
    blocks: [
      { label: "Sabah inbox", manual: 45, bonero: 8 },
      { label: "Öğlen onaylar", manual: 40, bonero: 4 },
      { label: "Akşam rapor", manual: 35, bonero: 3 },
    ],
  },
  en: {
    manual: "Manual day",
    bonero: "Bonero day",
    daily: "daily time",
    reclaim: "Reclaimed monthly",
    hours: "hours",
    blocks: [
      { label: "Morning inbox", manual: 45, bonero: 8 },
      { label: "Midday approvals", manual: 40, bonero: 4 },
      { label: "Evening report", manual: 35, bonero: 3 },
    ],
  },
};

function CountUp({
  target,
  active,
  duration = 1200,
}: {
  target: number;
  active: boolean;
  duration?: number;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) {
      setV(0);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);
  return <>{v}</>;
}

const ease = [0.22, 1, 0.36, 1] as const;

const AUTO_MS = 3400;

export default function HeroTimeVisual() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [mode, setMode] = useState<"manual" | "bonero">("manual");
  const [ready, setReady] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const isBonero = mode === "bonero";

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setMode((m) => (m === "manual" ? "bonero" : "manual"));
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [cycleKey]);

  const selectMode = (m: "manual" | "bonero") => {
    if (m === mode) return;
    setMode(m);
    setCycleKey((k) => k + 1);
  };

  return (
    <div className="relative w-full">
      <div className="mb-3 inline-flex rounded-full border border-bonero-dark/10 bg-white p-1 shadow-sm">
        {(["manual", "bonero"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => selectMode(m)}
            className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
              mode === m
                ? m === "bonero"
                  ? "text-white"
                  : "text-bonero-dark"
                : "text-bonero-dark/40 hover:text-bonero-dark/70"
            }`}
          >
            {mode === m && (
              <motion.span
                layoutId="hero-vs-mode"
                className={`absolute inset-0 rounded-full ${
                  m === "bonero" ? "bg-bonero-green" : "bg-bonero-dark/10"
                }`}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {m === "manual" ? t.manual : t.bonero}
            </span>
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-[1.5rem] border border-bonero-dark/8 bg-white p-5 shadow-[0_24px_60px_rgba(30,41,59,0.1)] sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <p
            className={`text-[10px] font-semibold tracking-[0.14em] uppercase transition-colors sm:text-xs ${
              isBonero ? "text-bonero-green" : "text-bonero-dark"
            }`}
          >
            {isBonero ? t.bonero : t.manual}
          </p>
          <span className="rounded-full bg-bonero-dark/[0.04] px-2.5 py-1 text-[10px] font-medium text-bonero-dark/45">
            {t.daily}
          </span>
        </div>

        <div className="mt-4 flex items-end gap-2 sm:mt-5 sm:gap-3">
          <motion.p
            key={mode}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4, ease }}
            className={`font-heading text-6xl !font-extrabold tracking-tight tabular-nums sm:text-7xl lg:text-[5.5rem] lg:leading-none ${
              isBonero ? "text-bonero-green" : "text-bonero-dark"
            }`}
          >
            {isBonero ? (
              <CountUp target={15} active={ready} key="b" />
            ) : (
              <CountUp target={120} active={ready} key="m" />
            )}
          </motion.p>
          <span
            className={`mb-1.5 text-base font-semibold sm:mb-2 sm:text-lg ${
              isBonero ? "text-bonero-green/70" : "text-bonero-dark/70"
            }`}
          >
            {locale === "tr" ? "dk" : "min"}
          </span>
        </div>

        <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-3.5">
          {t.blocks.map((block, i) => {
            const mins = isBonero ? block.bonero : block.manual;
            const widthPct = isBonero
              ? (block.bonero / 50) * 100
              : (block.manual / 50) * 100;
            return (
              <div key={block.label}>
                <div className="mb-1 flex items-center justify-between gap-3 text-[11px] sm:text-xs">
                  <span
                    className={`font-medium ${
                      isBonero ? "text-bonero-dark/50" : "text-bonero-dark"
                    }`}
                  >
                    {block.label}
                  </span>
                  <span
                    className={`font-semibold tabular-nums ${
                      isBonero ? "text-bonero-green" : "text-bonero-dark"
                    }`}
                  >
                    {mins} {locale === "tr" ? "dk" : "min"}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-bonero-dark/[0.05] sm:h-3.5">
                  <motion.div
                    className={`h-full rounded-full ${
                      isBonero ? "bg-bonero-green" : "bg-bonero-dark"
                    }`}
                    initial={false}
                    animate={{ width: `${Math.min(widthPct, 100)}%` }}
                    transition={{ duration: 0.65, delay: i * 0.06, ease }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-end justify-between gap-3 border-t border-bonero-dark/8 pt-5 sm:mt-7">
          <div>
            <p className="text-[10px] font-semibold tracking-wide text-bonero-dark/35 uppercase">
              {t.reclaim}
            </p>
            <p className="font-heading mt-0.5 text-2xl !font-extrabold text-bonero-dark tabular-nums sm:text-3xl">
              ~<CountUp target={35} active={ready} />
              <span className="ml-1 text-base font-semibold text-bonero-green sm:text-lg">
                {t.hours}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-wide uppercase sm:gap-3 sm:text-[11px]">
            <span
              className={`transition-colors ${
                !isBonero ? "text-bonero-dark" : "text-bonero-dark/30"
              }`}
            >
              120
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bonero-dark text-[9px] font-bold text-white">
              VS
            </span>
            <span
              className={`transition-colors ${
                isBonero ? "text-bonero-green" : "text-bonero-dark/30"
              }`}
            >
              15
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
