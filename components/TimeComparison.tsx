"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

const copy = {
  tr: {
    eyebrow: "Manuel vs. Bonero",
    title: "Aynı iş.",
    titleLine2: "İki tempo.",
    subtitle:
      "Beş panelde geçen gün ile tek panelde geçen gün — fark, faturalanabilir saattir.",
    manual: "Manuel gün",
    bonero: "Bonero günü",
    reclaim: "Ayda geri kazandığınız",
    hours: "saat",
    blocks: [
      { label: "Sabah inbox", manual: 45, bonero: 8 },
      { label: "Öğlen onaylar", manual: 40, bonero: 4 },
      { label: "Akşam rapor", manual: 35, bonero: 3 },
    ],
    math: "5 platform × ~24 dk ≈ 120 dk/gün. Bonero ≈ 15 dk. Fark: 105 dk/gün → ~35 saat/ay.",
  },
  en: {
    eyebrow: "Manual vs. Bonero",
    title: "Same work.",
    titleLine2: "Two tempos.",
    subtitle:
      "A day across five panels versus one panel — the gap is billable hours.",
    manual: "Manual day",
    bonero: "Bonero day",
    reclaim: "Reclaimed monthly",
    hours: "hours",
    blocks: [
      { label: "Morning inbox", manual: 45, bonero: 8 },
      { label: "Midday approvals", manual: 40, bonero: 4 },
      { label: "Evening report", manual: 35, bonero: 3 },
    ],
    math: "5 platforms × ~24 min ≈ 120 min/day. Bonero ≈ 15 min. Gap: 105 min/day → ~35 hrs/month.",
  },
};

function CountUp({
  target,
  active,
  duration = 1500,
}: {
  target: number;
  active: boolean;
  duration?: number;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
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

export default function TimeComparison() {
  const { locale } = useLocale();
  const t = copy[locale];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [mode, setMode] = useState<"manual" | "bonero">("manual");

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      setMode((m) => (m === "manual" ? "bonero" : "manual"));
    }, 3400);
    return () => clearInterval(id);
  }, [inView]);

  const isBonero = mode === "bonero";

  return (
    <section
      ref={ref}
      id="zaman-karsilastirma"
      className="relative overflow-hidden bg-[#f0f3f1] py-16 sm:py-24"
    >
      {/* Soft grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,41,59,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/40 uppercase">
              {t.eyebrow}
            </p>
            <h2 className="font-heading mt-3 text-4xl !font-extrabold tracking-wide text-bonero-dark sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
              {t.title}
              <span className="mt-1 block text-bonero-green">{t.titleLine2}</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-bonero-dark/55">
              {t.subtitle}
            </p>

            {/* Mode toggle */}
            <div className="mt-8 inline-flex rounded-full border border-bonero-dark/10 bg-white p-1 shadow-sm">
              {(["manual", "bonero"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    mode === m
                      ? m === "bonero"
                        ? "text-white"
                        : "text-bonero-dark"
                      : "text-bonero-dark/40 hover:text-bonero-dark/70"
                  }`}
                >
                  {mode === m && (
                    <motion.span
                      layoutId="vs-mode"
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
          </Reveal>

          {/* Big day number */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-bonero-dark/8 bg-white p-8 shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <p
                  className={`text-xs font-semibold tracking-[0.16em] uppercase transition-colors ${
                    isBonero ? "text-bonero-green" : "text-bonero-dark/40"
                  }`}
                >
                  {isBonero ? t.bonero : t.manual}
                </p>
                <motion.span
                  key={mode}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-full bg-bonero-dark/[0.04] px-3 py-1 text-[11px] font-medium text-bonero-dark/45"
                >
                  {locale === "tr" ? "günlük süre" : "daily time"}
                </motion.span>
              </div>

              <div className="mt-6 flex items-end gap-3">
                <motion.p
                  key={mode}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.45, ease }}
                  className={`font-heading text-7xl !font-extrabold tracking-tight tabular-nums sm:text-8xl lg:text-[7.5rem] lg:leading-none ${
                    isBonero ? "text-bonero-green" : "text-bonero-dark/25"
                  }`}
                >
                  {isBonero ? (
                    <CountUp target={15} active={inView} key="b" />
                  ) : (
                    <CountUp target={120} active={inView} key="m" />
                  )}
                </motion.p>
                <span
                  className={`mb-3 text-lg font-semibold sm:mb-4 sm:text-xl ${
                    isBonero ? "text-bonero-green/70" : "text-bonero-dark/30"
                  }`}
                >
                  {locale === "tr" ? "dk" : "min"}
                </span>
              </div>

              {/* Day blocks as horizontal rhythm */}
              <div className="mt-10 space-y-4">
                {t.blocks.map((block, i) => {
                  const mins = isBonero ? block.bonero : block.manual;
                  const widthPct = isBonero
                    ? (block.bonero / 50) * 100
                    : (block.manual / 50) * 100;
                  return (
                    <div key={block.label}>
                      <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                        <span className="font-medium text-bonero-dark/50">
                          {block.label}
                        </span>
                        <span
                          className={`font-semibold tabular-nums ${
                            isBonero ? "text-bonero-green" : "text-bonero-dark/35"
                          }`}
                        >
                          {mins} {locale === "tr" ? "dk" : "min"}
                        </span>
                      </div>
                      <div className="h-4 overflow-hidden rounded-full bg-bonero-dark/[0.05]">
                        <motion.div
                          className={`h-full rounded-full ${
                            isBonero ? "bg-bonero-green" : "bg-bonero-dark/20"
                          }`}
                          initial={false}
                          animate={{ width: `${Math.min(widthPct, 100)}%` }}
                          transition={{
                            duration: 0.7,
                            delay: i * 0.08,
                            ease,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <motion.div
                className="mt-8 flex items-center justify-between gap-4 border-t border-bonero-dark/8 pt-6"
                animate={{ opacity: isBonero ? 1 : 0.45 }}
              >
                <div>
                  <p className="text-[10px] font-semibold tracking-wide text-bonero-dark/35 uppercase">
                    {t.reclaim}
                  </p>
                  <p className="font-heading mt-1 text-3xl !font-extrabold text-bonero-dark tabular-nums">
                    ~<CountUp target={35} active={inView} />
                    <span className="ml-1 text-lg font-semibold text-bonero-green">
                      {t.hours}
                    </span>
                  </p>
                </div>
                <div className="hidden text-right text-xs leading-relaxed text-bonero-dark/40 sm:block sm:max-w-[200px]">
                  {t.math}
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>

        {/* Tiny VS strip */}
        <div className="mt-8 flex items-center justify-center gap-4 text-xs font-semibold tracking-wide uppercase">
          <span
            className={`transition-colors ${
              !isBonero ? "text-bonero-dark" : "text-bonero-dark/30"
            }`}
          >
            120 {locale === "tr" ? "dk" : "min"}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bonero-dark text-[10px] font-bold text-white">
            VS
          </span>
          <span
            className={`transition-colors ${
              isBonero ? "text-bonero-green" : "text-bonero-dark/30"
            }`}
          >
            15 {locale === "tr" ? "dk" : "min"}
          </span>
        </div>
      </div>
    </section>
  );
}
