"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Reveal from "./Reveal";
import { useLocale, type Locale } from "./LocaleProvider";

const ease = [0.22, 1, 0.36, 1] as const;
const TOTAL = 15;
const TICK_MS = 900;
const HEADLINE_MS = 3200;

const headlinesByLocale: Record<
  Locale,
  { line: string; accent: string }[]
> = {
  tr: [
    { line: "Önce görün.", accent: "Sonra karar verin." },
    { line: "Taahhüt yok.", accent: "Net cevap var." },
    { line: "15 dakikada panel.", accent: "Karar sizin." },
  ],
  en: [
    { line: "See it first.", accent: "Decide after." },
    { line: "No commitment.", accent: "Clear answer." },
    { line: "Panel in 15 minutes.", accent: "Your call." },
  ],
};

const copy = {
  tr: {
    eyebrow: "Net karar",
    remaining: "kalan",
    dialSub: "dakikada net",
    body: "Omnichannel paneli bağlayın, Birleşik Gelen Kutusu’nu canlı görün. Kararı ürünü gördükten sonra verin.",
    cta: "Ücretsiz demo talep et",
    secondary: "Paketlere bak",
    assurances: [
      "Kart gerekmez",
      "Kurulum ~15 dk",
      "Satın alma baskısı yok",
    ],
    headlineAria: (n: number) => `Başlık ${n}`,
  },
  en: {
    eyebrow: "Clear call",
    remaining: "left",
    dialSub: "minutes to clarity",
    body: "Connect the omnichannel panel and see the Unified Inbox live. Decide after you’ve felt the product.",
    cta: "Request a free demo",
    secondary: "See packages",
    assurances: ["No card required", "Setup ~15 min", "No purchase pressure"],
    headlineAria: (n: number) => `Headline ${n}`,
  },
};

const SIZE = 320;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 128;
const STROKE = 6;
const CIRC = 2 * Math.PI * R;

function DecisionDial({
  tick,
  inView,
  remainingLabel,
  dialSub,
}: {
  tick: number;
  inView: boolean;
  remainingLabel: string;
  dialSub: string;
}) {
  const uid = useId().replace(/:/g, "");
  const progress = (TOTAL - tick) / TOTAL;
  const dashOffset = CIRC * (1 - progress);
  const angle = -90 + progress * 360;

  return (
    <div className="relative mx-auto aspect-square w-[min(88vw,20rem)] sm:w-[20rem]">
      <motion.div
        className="pointer-events-none absolute inset-[12%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(232,240,235,0.9) 45%, rgba(24,131,71,0.12) 100%)",
          boxShadow:
            "0 30px 60px -28px rgba(24,131,71,0.35), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
        initial={{ scale: 0.88, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.75, ease }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute inset-[6%] rounded-full border border-bonero-green/15"
        animate={
          inView
            ? { scale: [1, 1.04, 1], opacity: [0.5, 0.85, 0.5] }
            : { scale: 1, opacity: 0 }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="relative h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`arc-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a9d5c" />
            <stop offset="100%" stopColor="#188347" />
          </linearGradient>
          <filter id={`glow-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="rgba(30,41,59,0.08)"
          strokeWidth={STROKE}
        />

        <motion.circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke={`url(#arc-${uid})`}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          initial={{ strokeDashoffset: CIRC }}
          animate={{ strokeDashoffset: inView ? dashOffset : CIRC }}
          transition={{ duration: 0.55, ease }}
          transform={`rotate(-90 ${CX} ${CY})`}
          filter={`url(#glow-${uid})`}
        />

        {Array.from({ length: TOTAL }, (_, i) => {
          const a = ((i / TOTAL) * 360 - 90) * (Math.PI / 180);
          const outer = R + 18;
          const inner = R + (i % 5 === 0 ? 8 : 12);
          const consumed = i < Math.round(progress * TOTAL);
          return (
            <line
              key={i}
              x1={CX + Math.cos(a) * inner}
              y1={CY + Math.sin(a) * inner}
              x2={CX + Math.cos(a) * outer}
              y2={CY + Math.sin(a) * outer}
              stroke={consumed ? "#188347" : "rgba(30,41,59,0.18)"}
              strokeWidth={i % 5 === 0 ? 2.5 : 1.5}
              strokeLinecap="round"
            />
          );
        })}

        <motion.g
          animate={{ rotate: inView ? angle : -90 }}
          transition={{ duration: 0.55, ease }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle
            cx={CX}
            cy={CY - R}
            r={7}
            fill="#188347"
            filter={`url(#glow-${uid})`}
          />
          <circle cx={CX} cy={CY - R} r={2.5} fill="white" />
        </motion.g>

        <motion.g
          animate={inView ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 56, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle
            cx={CX}
            cy={CY}
            r={R - 22}
            fill="none"
            stroke="rgba(30,41,59,0.1)"
            strokeWidth={1}
            strokeDasharray="3 10"
          />
        </motion.g>
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[10px] font-bold tracking-[0.28em] text-bonero-dark/35 uppercase">
          {remainingLabel}
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={tick}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease }}
            className="font-heading text-[clamp(4.5rem,18vw,6.5rem)] leading-none !font-extrabold tracking-tight text-bonero-dark tabular-nums"
          >
            {String(tick).padStart(2, "0")}
            <span className="text-bonero-green">′</span>
          </motion.p>
        </AnimatePresence>
        <p className="mt-1 text-[11px] font-semibold tracking-[0.22em] text-bonero-dark/40 uppercase">
          {dialSub}
        </p>
      </div>
    </div>
  );
}

export default function SoftDemoCta() {
  const { locale } = useLocale();
  const t = copy[locale];
  const headlines = headlinesByLocale[locale];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [tick, setTick] = useState(TOTAL);
  const [hi, setHi] = useState(0);

  useEffect(() => {
    setHi(0);
  }, [locale]);

  useEffect(() => {
    if (!inView) return;
    setTick(TOTAL);
    const id = window.setInterval(() => {
      setTick((n) => (n <= 1 ? TOTAL : n - 1));
    }, TICK_MS);
    return () => clearInterval(id);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      setHi((p) => (p + 1) % headlines.length);
    }, HEADLINE_MS);
    return () => clearInterval(id);
  }, [inView, headlines.length]);

  return (
    <section
      ref={ref}
      id="demo-teklifi"
      aria-labelledby="demo-teklifi-baslik"
      className="relative overflow-x-clip py-20 sm:py-28"
      style={{ background: "#f3f6f4" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 18%, rgba(24,131,71,0.14), transparent 58%), linear-gradient(180deg, #e8f0eb 0%, #f3f6f4 40%, #f7f9f8 100%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-medium tracking-[0.22em] text-bonero-green uppercase">
              {t.eyebrow}
            </p>

            <div className="mt-8">
              <DecisionDial
                tick={tick}
                inView={inView}
                remainingLabel={t.remaining}
                dialSub={t.dialSub}
              />
            </div>

            <div className="mx-auto mt-10 min-h-[6.5rem] sm:min-h-[6.25rem]">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`${locale}-${hi}`}
                  id="demo-teklifi-baslik"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease }}
                  className="font-heading mx-auto max-w-xl px-1 text-2xl tracking-wide break-words text-bonero-dark sm:text-4xl lg:text-[2.65rem]"
                >
                  {headlines[hi].line}
                  <span className="mt-1 block text-bonero-green">
                    {headlines[hi].accent}
                  </span>
                </motion.h2>
              </AnimatePresence>
            </div>

            <div
              className="mx-auto mt-2 flex justify-center gap-1.5"
              aria-hidden="true"
            >
              {headlines.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setHi(i)}
                  className={`h-1 rounded-full transition-all ${
                    hi === i
                      ? "w-6 bg-bonero-green"
                      : "w-1.5 bg-bonero-dark/15 hover:bg-bonero-dark/30"
                  }`}
                  aria-label={t.headlineAria(i + 1)}
                />
              ))}
            </div>

            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-bonero-dark/55">
              {t.body}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/iletisim"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-bonero-green px-9 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(24,131,71,0.7)] transition-transform hover:scale-[1.03]"
              >
                {t.cta}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <a
                href="#paketler"
                className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-bonero-dark/55 underline-offset-4 transition-colors hover:text-bonero-dark hover:underline"
              >
                {t.secondary}
              </a>
            </div>

            <ul className="mx-auto mt-10 flex max-w-lg flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-medium tracking-wide text-bonero-dark/40 uppercase">
              {t.assurances.map((a, i) => (
                <li key={a} className="inline-flex items-center gap-3">
                  {i > 0 && (
                    <span
                      className="hidden h-1 w-1 rounded-full bg-bonero-dark/20 sm:inline-block"
                      aria-hidden="true"
                    />
                  )}
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
