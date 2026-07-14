"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Gauge, Layers, Timer, Zap } from "lucide-react";
import Reveal from "./Reveal";

type Metric = {
  value: number;
  suffix: string;
  label: string;
  detail: string;
  story: string;
  icon: typeof Zap;
  compare?: { before: string; after: string };
};

const metrics: Metric[] = [
  {
    value: 50,
    suffix: "+",
    label: "mesaj / dakika",
    detail: "Tek panelde akan operasyon hızı",
    story: "Dağınık sekmeler yerine tek akış — ekip dakikada daha çok iş bitirir.",
    icon: Zap,
  },
  {
    value: 40,
    suffix: "%",
    label: "daha hızlı yanıt",
    detail: "Ortalama yanıt süresinde iyileşme",
    story: "Müşteri beklemez. Ekip aynı anda üç kanalı tek yerden yönetir.",
    icon: Timer,
    compare: { before: "18 dk", after: "11 dk" },
  },
  {
    value: 3,
    suffix: "→1",
    label: "kanal birleşimi",
    detail: "WhatsApp, IG ve mail tek inbox",
    story: "Üç uygulama, bir ekran. Kaçan DM ve mail zinciri biter.",
    icon: Layers,
  },
  {
    value: 15,
    suffix: " dk",
    label: "kurulum",
    detail: "Hesap dakikalar içinde hazır",
    story: "Haftalar süren entegrasyon yok — bağla ve operasyona başla.",
    icon: Gauge,
  },
];

const outcomes = [
  "Daha az sekme",
  "Daha hızlı ekip",
  "Daha net rapor",
  "Daha mutlu müşteri",
];

function CountUp({
  target,
  active,
  duration = 1400,
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

function Ring({ progress, active }: { progress: number; active: boolean }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" className="absolute top-6 right-6 opacity-90">
      <circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="8"
      />
      <motion.circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke="#188347"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: active ? c * (1 - progress) : c }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        transform="rotate(-90 70 70)"
      />
    </svg>
  );
}

export default function MetricsStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [active, setActive] = useState(1);
  const current = metrics[active];
  const Icon = current.icon;
  const ringProgress =
    current.suffix === "%"
      ? current.value / 100
      : current.suffix === "→1"
        ? 1
        : Math.min(current.value / 60, 1);

  useEffect(() => {
    if (!inView) return;
    const t = window.setInterval(() => {
      setActive((s) => (s + 1) % metrics.length);
    }, 3200);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section
      ref={ref}
      id="metrikler"
      aria-label="Bonero’nun sağladığı verim"
      className="relative overflow-x-clip py-16 sm:py-24"
      style={{
        background:
          "linear-gradient(145deg, #0a1210 0%, #122018 45%, #0b1411 100%)",
      }}
    >
      <motion.div
        className="pointer-events-none absolute top-1/4 left-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(24,131,71,0.32), transparent 68%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-medium tracking-wide text-white/40 uppercase">
                Bonero’nun sağladığı verim
              </p>
              <h2 className="font-heading mt-3 text-3xl !font-extrabold tracking-wide text-white sm:text-4xl lg:text-[2.6rem]">
                Ölçülebilir hız.
                <span className="mt-1 block text-bonero-green">
                  Görünür fark.
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/45 lg:text-right">
              Her metrik bir operasyon gerçeği — daha az dağınıklık, daha çok teslimat.
            </p>
          </div>
        </Reveal>

        {/* Hero metric stage — swaps with active */}
        <div className="relative mt-12 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03]">
          <div className="grid lg:grid-cols-12">
            <div className="relative flex min-h-[420px] flex-col border-b border-white/8 p-8 sm:min-h-[440px] sm:p-10 lg:col-span-7 lg:border-r lg:border-b-0">
              <Ring progress={ringProgress} active={inView} />

              <div className="relative flex h-9 items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bonero-green/20 text-bonero-green">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <div className="relative h-4 min-w-0 flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={current.label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute inset-0 text-[11px] font-semibold tracking-[0.16em] text-bonero-green uppercase"
                    >
                      {current.label}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Fixed-height content — no layout jump */}
              <div className="relative mt-6 min-h-[168px] sm:min-h-[180px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <p className="font-heading text-6xl !font-extrabold tracking-tight text-white tabular-nums sm:text-7xl lg:text-[5rem] lg:leading-none">
                      {current.suffix === "→1" ? (
                        <>
                          <CountUp target={3} active={inView} />
                          <span className="text-bonero-green">→1</span>
                        </>
                      ) : (
                        <>
                          <CountUp
                            target={current.value}
                            active={inView}
                            key={active}
                          />
                          <span className="text-bonero-green">{current.suffix}</span>
                        </>
                      )}
                    </p>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-white/55 sm:text-lg">
                      {current.story}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Always reserved compare slot */}
              <div className="relative mt-8 flex min-h-[76px] items-center">
                <AnimatePresence mode="wait">
                  {current.compare ? (
                    <motion.div
                      key={`cmp-${active}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4"
                    >
                      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                        <p className="text-[10px] font-semibold tracking-wide text-white/35 uppercase">
                          Önce
                        </p>
                        <p className="mt-1 text-xl font-bold text-white/45 line-through decoration-white/30">
                          {current.compare.before}
                        </p>
                      </div>
                      <span className="text-bonero-green">→</span>
                      <div className="rounded-xl border border-bonero-green/40 bg-bonero-green/15 px-4 py-3">
                        <p className="text-[10px] font-semibold tracking-wide text-bonero-green uppercase">
                          Bonero
                        </p>
                        <p className="mt-1 text-xl font-bold text-white">
                          {current.compare.after}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.p
                      key={`det-${active}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-white/40"
                    >
                      {current.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-auto pt-8">
                <motion.div
                  key={`prog-${active}`}
                  className="h-1 origin-left rounded-full bg-bonero-green"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3.2, ease: "linear" }}
                />
              </div>
            </div>

            {/* Selector column */}
            <div className="flex flex-col justify-center gap-2 p-4 sm:p-5 lg:col-span-5">
              {metrics.map((m, i) => {
                const on = active === i;
                const MIcon = m.icon;
                return (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative flex items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-colors sm:px-5 ${
                      on
                        ? "border-bonero-green/40 bg-bonero-green/15"
                        : "border-white/8 bg-white/[0.02] hover:border-white/15"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        on
                          ? "bg-bonero-green text-white"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      <MIcon size={18} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-heading text-xl !font-extrabold ${
                          on ? "text-white" : "text-white/45"
                        }`}
                      >
                        {m.suffix === "→1" ? "3→1" : `${m.value}${m.suffix}`}
                      </p>
                      <p
                        className={`truncate text-xs ${
                          on ? "text-white/60" : "text-white/30"
                        }`}
                      >
                        {m.label}
                      </p>
                    </div>
                    {on && (
                      <motion.span
                        layoutId="verim-dot"
                        className="h-2 w-2 rounded-full bg-bonero-green"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Outcome marquee strip */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03]">
          <div className="animate-marquee flex gap-10 whitespace-nowrap py-4 pl-6">
            {[...outcomes, ...outcomes, ...outcomes].map((o, i) => (
              <span
                key={`${o}-${i}`}
                className="inline-flex items-center gap-3 text-sm font-semibold text-white/50"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-bonero-green" />
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
