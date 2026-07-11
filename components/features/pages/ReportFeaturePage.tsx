"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Camera,
  ChevronLeft,
  ChevronRight,
  Download,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FeatureBackLink,
  FeatureBottomStrip,
  FeatureCtaButton,
} from "../FeaturePageChrome";
import { useLocale } from "@/components/LocaleProvider";
import type { FeaturePageContent } from "@/lib/features";

const ease = [0.22, 1, 0.36, 1] as const;

const bars = [32, 48, 44, 62, 58, 78, 72, 90];

function ReportHeroVisual({ isEn }: { isEn: boolean }) {
  const [ready, setReady] = useState(false);
  const [metricFocus, setMetricFocus] = useState(0);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 160);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = window.setInterval(
      () => setMetricFocus((p) => (p + 1) % 3),
      2600,
    );
    return () => clearInterval(t);
  }, []);

  const metrics = [
    {
      k: isEn ? "Response" : "Yanıt",
      v: "−42%",
      up: true,
    },
    {
      k: isEn ? "Open" : "Açık",
      v: "18",
      up: false,
    },
    {
      k: "NPS",
      v: "4.8",
      up: true,
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 60% 30%, rgba(45,181,106,0.25), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#070c12] shadow-[0_32px_64px_-36px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green opacity-35" />
              <span className="relative h-2 w-2 rounded-full bg-bonero-green" />
            </span>
            <span className="text-xs font-semibold text-white/70">
              {isEn ? "Client dossier" : "Müşteri dosyası"}
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#2DB56A]">LIVE</span>
        </div>

        <div className="grid grid-cols-3 gap-px border-b border-white/8 bg-white/[0.04]">
          {metrics.map((m, i) => (
            <motion.div
              key={m.k}
              className="bg-[#070c12] px-2.5 py-3 sm:px-3"
              animate={{
                backgroundColor:
                  metricFocus === i
                    ? "rgba(24,131,71,0.1)"
                    : "rgba(7,12,18,1)",
              }}
            >
              <p className="text-[9px] font-medium uppercase tracking-wider text-white/35">
                {m.k}
              </p>
              <div className="mt-0.5 flex items-baseline gap-1">
                <p className="font-heading text-lg font-bold text-white sm:text-xl">
                  {m.v}
                </p>
                {m.up && (
                  <TrendingUp
                    size={11}
                    className={
                      metricFocus === i ? "text-[#2DB56A]" : "text-white/25"
                    }
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-white/50">
              {isEn ? "Weekly performance" : "Haftalık performans"}
            </p>
            <span className="inline-flex items-center gap-1 text-[10px] text-white/35">
              <Download size={10} />
              PDF
            </span>
          </div>

          <div className="mt-3 flex h-24 items-end gap-1.5 sm:h-28 sm:gap-2">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-md"
                style={{
                  background:
                    i === bars.length - 1
                      ? "linear-gradient(180deg, #2DB56A 0%, #188347 100%)"
                      : "linear-gradient(180deg, rgba(24,131,71,0.5) 0%, rgba(24,131,71,0.15) 100%)",
                }}
                initial={{ height: "10%" }}
                animate={{ height: ready ? `${h}%` : "10%" }}
                transition={{
                  duration: 0.65,
                  delay: 0.08 + i * 0.03,
                  ease,
                }}
              />
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-white/8 pt-3">
            {[
              { name: "Instagram", Icon: Camera, color: "#E1306C", share: 46 },
              {
                name: "WhatsApp",
                Icon: MessageCircle,
                color: "#25D366",
                share: 34,
              },
            ].map((ch, i) => (
              <div key={ch.name} className="flex items-center gap-2.5">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                  style={{ background: `${ch.color}22`, color: ch.color }}
                >
                  <ch.Icon size={12} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex justify-between text-[10px]">
                    <span className="text-white/55">{ch.name}</span>
                    <span className="font-mono text-white/30">{ch.share}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: ch.color }}
                      initial={{ width: 0 }}
                      animate={{ width: ready ? `${ch.share}%` : 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.35 + i * 0.08,
                        ease,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/8 px-4 py-2.5">
          <p className="text-[10px] text-white/35">
            {isEn ? "Ready for Monday deck" : "Pazartesi sunumuna hazır"}
          </p>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#2DB56A]">
            {isEn ? "Share" : "Paylaş"}
            <ArrowUpRight size={11} />
          </span>
        </div>
      </div>
    </div>
  );
}

function ClientDeckStage({
  scenarios,
  outcome,
  isEn,
}: {
  scenarios: { label: string; text: string }[];
  outcome: string;
  isEn: boolean;
}) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = window.setInterval(
      () => setSlide((p) => (p + 1) % scenarios.length),
      4000,
    );
    return () => clearInterval(t);
  }, [scenarios.length]);

  const visuals = [
    {
      kpis: [
        { l: isEn ? "Response" : "Yanıt", v: "1.2s", d: "−42%" },
        { l: isEn ? "Resolved" : "Çözülen", v: "94%", d: "+8%" },
        { l: "NPS", v: "4.8", d: "+0.3" },
      ],
    },
    {
      channels: [
        { n: "IG", p: 46, c: "#E1306C" },
        { n: "WA", p: 34, c: "#25D366" },
        { n: "Mail", p: 20, c: "#0EA5E9" },
      ],
    },
    {
      trend: [40, 48, 45, 58, 62, 70, 68, 82, 88, 94],
    },
  ];

  const current = scenarios[slide];
  const visual = visuals[slide] ?? visuals[0];

  return (
    <section className="relative border-t border-white/8 bg-[#070b10]">
      <div className="page-pad mx-auto max-w-6xl py-14 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
              {isEn ? "Client deck" : "Müşteri sunumu"}
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {isEn
                ? "Three slides. Zero screenshot hunt."
                : "Üç slayt. Sıfır ekran görüntüsü."}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() =>
                setSlide((p) => (p - 1 + scenarios.length) % scenarios.length)
              }
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/50 transition-colors hover:text-white"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-mono text-xs text-white/40">
              0{slide + 1} / 0{scenarios.length}
            </span>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setSlide((p) => (p + 1) % scenarios.length)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/50 transition-colors hover:text-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_220px]">
          {/* Stage */}
          <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0c1218] shadow-[0_28px_60px_-30px_rgba(0,0,0,0.85)]">
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
              <span className="font-mono text-[10px] text-[#2DB56A]">
                SLIDE 0{slide + 1}
              </span>
              <span className="text-[11px] font-semibold text-white/50">
                {current.label}
              </span>
              <BarChart3 size={14} className="text-white/25" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.35, ease }}
              >
                <div className="flex flex-col justify-center">
                  <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
                    {current.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50 sm:text-base">
                    {current.text}
                  </p>
                  <p className="mt-5 text-[11px] font-medium text-[#2DB56A]/90">
                    {isEn
                      ? "Exported from live panel · no screenshots"
                      : "Canlı panelden · ekran görüntüsü yok"}
                  </p>
                </div>

                <div className="rounded-xl border border-white/8 bg-[#070b10] p-4">
                  {"kpis" in visual && visual.kpis && (
                    <div className="grid gap-3">
                      {visual.kpis.map((k) => (
                        <div
                          key={k.l}
                          className="flex items-center justify-between rounded-lg border border-white/6 bg-white/[0.03] px-3 py-2.5"
                        >
                          <span className="text-[11px] text-white/40">{k.l}</span>
                          <div className="text-right">
                            <p className="font-heading text-lg font-bold text-white">
                              {k.v}
                            </p>
                            <p className="text-[10px] font-semibold text-[#2DB56A]">
                              {k.d}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {"channels" in visual && visual.channels && (
                    <div className="space-y-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
                        {isEn ? "Channel mix" : "Kanal kırılımı"}
                      </p>
                      {visual.channels.map((ch) => (
                        <div key={ch.n}>
                          <div className="mb-1 flex justify-between text-[11px]">
                            <span className="text-white/55">{ch.n}</span>
                            <span className="font-mono text-white/35">{ch.p}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/8">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: ch.c }}
                              initial={{ width: 0 }}
                              animate={{ width: `${ch.p}%` }}
                              transition={{ duration: 0.6, ease }}
                            />
                          </div>
                        </div>
                      ))}
                      <p className="text-[11px] text-white/40">
                        {isEn
                          ? "Shift spend → Instagram"
                          : "Bütçeyi Instagram’a kaydır"}
                      </p>
                    </div>
                  )}

                  {"trend" in visual && visual.trend && (
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
                        {isEn ? "90-day trend" : "90 günlük trend"}
                      </p>
                      <div className="mt-4 flex h-28 items-end gap-1.5">
                        {visual.trend.map((h, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 rounded-t-sm bg-[#2DB56A]/75"
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{
                              duration: 0.45,
                              delay: i * 0.04,
                              ease,
                            }}
                          />
                        ))}
                      </div>
                      <p className="mt-3 text-[11px] text-white/40">
                        {isEn
                          ? "Value story for renewal"
                          : "Yenileme için değer hikâyesi"}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="h-1 bg-white/5">
              <motion.div
                key={slide}
                className="h-full bg-[#2DB56A]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
            {scenarios.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setSlide(i)}
                className={`min-w-[160px] flex-1 rounded-xl border p-3 text-left transition-colors lg:min-w-0 ${
                  slide === i
                    ? "border-[#2DB56A]/50 bg-[#2DB56A]/10"
                    : "border-white/8 bg-white/[0.02] hover:border-white/15"
                }`}
              >
                <span className="font-mono text-[9px] text-[#2DB56A]/80">
                  0{i + 1}
                </span>
                <p className="mt-1 text-xs font-semibold text-white">{s.label}</p>
                <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-white/35">
                  {s.text}
                </p>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm font-medium text-white/55">{outcome}</p>
      </div>
    </section>
  );
}

export default function ReportFeaturePage({
  feature,
}: {
  feature: FeaturePageContent;
}) {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const points = isEn ? feature.valuePointsEn : feature.valuePoints;

  return (
    <div className="relative overflow-x-clip bg-[#070b10] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 85% 10%, rgba(45,181,106,0.2), transparent 55%), radial-gradient(ellipse 40% 35% at 10% 55%, rgba(14,165,233,0.06), transparent 50%)",
        }}
      />

      {/* Compact hero — fits desktop viewport */}
      <section className="relative pt-20 pb-10 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-16 lg:pb-8">
        <div className="page-pad relative mx-auto w-full max-w-6xl">
          <FeatureBackLink />

          <div className="mt-6 grid items-center gap-8 lg:mt-5 lg:grid-cols-2 lg:gap-10">
            <div className="max-w-xl">
              <motion.p
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#2DB56A] uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <BarChart3 size={13} />
                {isEn ? feature.eyebrowEn : feature.eyebrow}
              </motion.p>

              <h1 className="font-heading mt-3 text-[1.9rem] !font-extrabold leading-[1.08] tracking-wide sm:text-4xl lg:text-[2.55rem]">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  {isEn ? "No more screenshots." : "Ekran görüntüsü bitsin."}
                </motion.span>
                <motion.span
                  className="mt-1 block text-white/40"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease }}
                >
                  {isEn ? (
                    <>
                      Numbers arrive{" "}
                      <span className="text-[#2DB56A]">deck-ready.</span>
                    </>
                  ) : (
                    <>
                      Rakamlar{" "}
                      <span className="text-[#2DB56A]">sunuma hazır</span>{" "}
                      gelsin.
                    </>
                  )}
                </motion.span>
              </h1>

              <motion.p
                className="mt-4 max-w-md text-sm leading-relaxed text-white/50 sm:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {isEn ? feature.leadEn : feature.lead}
              </motion.p>

              <motion.div
                className="mt-6 flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
              >
                <FeatureCtaButton />
                <p className="text-xs text-white/35">
                  {isEn
                    ? "Live KPIs → channel mix → share"
                    : "Canlı KPI → kanal kırılımı → paylaş"}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease }}
            >
              <ReportHeroVisual isEn={isEn} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/8">
        <div className="page-pad mx-auto max-w-6xl py-14 sm:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#2DB56A]">
            {isEn ? "KPI ledger" : "KPI defteri"}
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {isEn
              ? "Rows that defend the retainer."
              : "Retainer’ı savunan satırlar."}
          </h2>
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-[56px_1fr] border-b border-white/10 bg-white/[0.04] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-white/30 sm:grid-cols-[72px_1.2fr_1fr]">
              <span>§</span>
              <span>{isEn ? "Finding" : "Bulgu"}</span>
              <span className="hidden sm:block">
                {isEn ? "Why it matters" : "Neden önemli"}
              </span>
            </div>
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                className="grid grid-cols-[56px_1fr] border-b border-white/8 last:border-b-0 sm:grid-cols-[72px_1.2fr_1fr]"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.35, ease }}
              >
                <div className="border-r border-white/8 px-4 py-5 font-mono text-sm text-[#2DB56A]">
                  {i + 1}.{i + 1}
                </div>
                <div className="border-r border-white/8 px-4 py-5 sm:px-5">
                  <p className="text-sm font-semibold text-white">{p.title}</p>
                  <p className="mt-1 text-sm text-white/45 sm:hidden">{p.body}</p>
                </div>
                <div className="hidden px-5 py-5 sm:block">
                  <p className="text-sm leading-relaxed text-white/45">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ClientDeckStage
        scenarios={isEn ? feature.scenariosEn : feature.scenarios}
        outcome={isEn ? feature.outcomeEn : feature.outcome}
        isEn={isEn}
      />

      <FeatureBottomStrip feature={feature} />
    </div>
  );
}
