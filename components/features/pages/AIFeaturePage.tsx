"use client";

import { useEffect, useState } from "react";
import { Check, LayoutGrid, PenLine, Sparkles, Type } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FeatureBackLink,
  FeatureBottomStrip,
  FeatureCtaButton,
} from "../FeaturePageChrome";
import { useLocale } from "@/components/LocaleProvider";
import type { FeaturePageContent } from "@/lib/features";

const ease = [0.22, 1, 0.36, 1] as const;

const tonesTr = ["Kibar", "Satış", "Kısa"] as const;
const tonesEn = ["Polite", "Sales", "Short"] as const;

const draftsTr = [
  {
    tone: 0,
    text: "Merhaba! Onayınızı aldık — kampanyayı takvime ekledik. Ek bir notunuz olursa hemen işleriz.",
  },
  {
    tone: 1,
    text: "Harika haber: stok bu hafta sınırlı. Erken rezervasyon için linki şimdi paylaşabiliriz.",
  },
  {
    tone: 2,
    text: "Onay geldi ✓ Takvimde. Link hazır — gönderelim mi?",
  },
];

const draftsEn = [
  {
    tone: 0,
    text: "Hi! We’ve got your approval — the campaign is on the calendar. Any notes and we’ll move fast.",
  },
  {
    tone: 1,
    text: "Good news: stock is limited this week. We can share the booking link now.",
  },
  {
    tone: 2,
    text: "Approved ✓ On calendar. Link ready — send?",
  },
];

function AIHeroVisual({ isEn }: { isEn: boolean }) {
  const drafts = isEn ? draftsEn : draftsTr;
  const tones = isEn ? tonesEn : tonesTr;
  const [phase, setPhase] = useState<"idle" | "typing" | "ready">("idle");
  const [draftIdx, setDraftIdx] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setPhase("idle");
    setTyped("");
    const start = window.setTimeout(() => setPhase("typing"), 600);
    return () => clearTimeout(start);
  }, [draftIdx]);

  useEffect(() => {
    if (phase !== "typing") return;
    const full = drafts[draftIdx].text;
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setTyped(full.slice(0, n));
      if (n >= full.length) {
        window.clearInterval(id);
        setPhase("ready");
        window.setTimeout(
          () => setDraftIdx((p) => (p + 1) % drafts.length),
          2200,
        );
      }
    }, 22);
    return () => clearInterval(id);
  }, [phase, draftIdx, drafts]);

  const activeTone = drafts[draftIdx].tone;

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Soft orbit glow — contained, not flashy */}
      <motion.div
        className="pointer-events-none absolute -inset-8 rounded-[2.5rem] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(24,131,71,0.28), transparent 65%)",
        }}
        animate={{ opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#0a1610] shadow-[0_40px_80px_-36px_rgba(0,0,0,0.85)]">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green opacity-35" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-bonero-green" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-white/70">
              {isEn ? "AI Content Studio" : "AI İçerik Stüdyosu"}
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/30">
            {phase === "idle"
              ? isEn
                ? "listening…"
                : "dinliyor…"
              : phase === "typing"
                ? isEn
                  ? "writing…"
                  : "yazıyor…"
                : isEn
                  ? "ready"
                  : "hazır"}
          </span>
        </div>

        {/* Tone chips */}
        <div className="flex flex-wrap gap-2 border-b border-white/8 px-5 py-3">
          {tones.map((tone, ti) => (
            <motion.span
              key={tone}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                ti === activeTone
                  ? "bg-bonero-green text-white"
                  : "bg-white/[0.05] text-white/35"
              }`}
              animate={{
                scale: ti === activeTone ? 1 : 0.98,
              }}
              transition={{ duration: 0.25 }}
            >
              {tone}
            </motion.span>
          ))}
        </div>

        {/* Draft canvas */}
        <div className="relative min-h-[200px] px-5 py-7 sm:min-h-[220px] sm:px-6 sm:py-8">
          <AnimatePresence mode="wait">
            {phase === "idle" ? (
              <motion.div
                key="idle"
                className="flex h-full min-h-[140px] flex-col items-start justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-sm text-white/25">
                  {isEn ? "Blank page…" : "Boş sayfa…"}
                </p>
                <motion.span
                  className="mt-3 h-5 w-[2px] bg-bonero-green"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.75, repeat: Infinity }}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`draft-${draftIdx}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease }}
              >
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-bonero-green/15 px-2.5 py-1 text-[10px] font-bold tracking-wide text-bonero-green uppercase">
                  <Sparkles size={11} />
                  {isEn ? "Suggested reply" : "Yanıt önerisi"}
                </div>
                <p className="text-[15px] leading-relaxed text-white/85 sm:text-base">
                  {typed}
                  {phase === "typing" && (
                    <motion.span
                      className="ml-0.5 inline-block h-4 w-[2px] bg-bonero-green align-middle"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.55, repeat: Infinity }}
                    />
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-white/8 px-5 py-3.5">
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold transition-colors ${
              phase === "ready" ? "text-bonero-green" : "text-white/25"
            }`}
          >
            <Check size={12} strokeWidth={2.5} />
            {isEn ? "On-brand" : "Marka tonuna uygun"}
          </span>
          <motion.span
            className="rounded-lg bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-white/50"
            animate={
              phase === "ready"
                ? {
                    backgroundColor: "rgba(24,131,71,0.9)",
                    color: "#fff",
                  }
                : {
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.5)",
                  }
            }
            transition={{ duration: 0.35 }}
          >
            {isEn ? "Approve & send" : "Onayla & gönder"}
          </motion.span>
        </div>
      </div>
    </div>
  );
}

export default function AIFeaturePage({
  feature,
}: {
  feature: FeaturePageContent;
}) {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const points = isEn ? feature.valuePointsEn : feature.valuePoints;

  return (
    <div className="relative overflow-x-clip bg-[#07110c] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 85% 18%, rgba(24,131,71,0.32), transparent 55%), radial-gradient(ellipse 45% 40% at 8% 70%, rgba(255,255,255,0.04), transparent 50%)",
        }}
      />
      <div
        className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.2] mix-blend-soft-light"
        aria-hidden
      />

      {/* Hero — one composition */}
      <section className="relative min-h-[min(100svh,900px)] pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="page-pad relative mx-auto max-w-6xl">
          <FeatureBackLink />

          <div className="mt-8 grid items-center gap-12 lg:mt-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative max-w-xl">
              <div
                className="absolute top-1 bottom-2 left-0 hidden w-[3px] origin-top rounded-full bg-gradient-to-b from-bonero-green via-bonero-green/40 to-transparent sm:block"
                aria-hidden
              />
              <div className="sm:pl-6">
                <motion.p
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-bonero-green uppercase"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <Sparkles size={13} />
                  {isEn ? feature.eyebrowEn : feature.eyebrow}
                </motion.p>

                <h1 className="font-heading mt-4 text-[2.15rem] !font-extrabold leading-[1.08] tracking-wide sm:text-5xl lg:text-[3rem]">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.65, delay: 0.05, ease }}
                  >
                    {isEn ? "Blank page ends." : "Boş sayfa bitsin."}
                  </motion.span>
                  <motion.span
                    className="mt-1.5 block text-white/40"
                    initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.65, delay: 0.16, ease }}
                  >
                    {isEn ? (
                      <>
                        AI writes in{" "}
                        <span className="text-bonero-green">your brand voice.</span>
                      </>
                    ) : (
                      <>
                        AI{" "}
                        <span className="text-bonero-green">marka dilinde</span>{" "}
                        yazsın.
                      </>
                    )}
                  </motion.span>
                </h1>

                <motion.p
                  className="mt-5 max-w-md text-base leading-relaxed text-white/50 sm:text-lg"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease }}
                >
                  {isEn ? feature.leadEn : feature.lead}
                </motion.p>

                <motion.div
                  className="mt-8 flex flex-wrap items-center gap-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.4, ease }}
                >
                  <FeatureCtaButton />
                  <p className="text-xs text-white/35">
                    {isEn
                      ? "Draft → review → send"
                      : "Taslak → onay → gönder"}
                  </p>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease }}
            >
              <AIHeroVisual isEn={isEn} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 1 — Memorable value stage */}
      <section className="relative border-t border-white/8">
        <AIValueStage points={points} isEn={isEn} />
      </section>

      {/* 2 — Day scenes as typewriter manifesto (not cards) */}
      <section className="relative border-t border-white/8">
        <div className="page-pad mx-auto max-w-3xl py-16 sm:py-20">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-bonero-green">
            {isEn ? "In the agency day" : "Ajans gününde"}
          </p>
          <h2 className="mt-3 text-center font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {isEn ? "Where the draft appears" : "Taslak nerede doğar"}
          </h2>
          <ul className="mt-12 space-y-0">
            {(isEn ? feature.scenariosEn : feature.scenarios).map((s, i) => (
              <motion.li
                key={s.label}
                className="grid gap-3 border-t border-white/10 py-8 sm:grid-cols-[120px_1fr] sm:gap-10"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4, ease }}
              >
                <p className="font-mono text-xs font-semibold text-bonero-green">
                  {s.label}
                </p>
                <p className="text-base leading-relaxed text-white/55">{s.text}</p>
              </motion.li>
            ))}
          </ul>
          <p className="mt-4 border-t border-white/10 pt-8 text-center text-sm font-medium text-white/65">
            {isEn ? feature.outcomeEn : feature.outcome}
          </p>
        </div>
      </section>

      <FeatureBottomStrip feature={feature} />
    </div>
  );
}

function AIValueStage({
  points,
  isEn,
}: {
  points: { title: string; body: string }[];
  isEn: boolean;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const visuals = [
    {
      Icon: PenLine,
      word: isEn ? "BLANK" : "BOŞ",
      sub: isEn ? "page → draft" : "sayfa → taslak",
      Visual: BlankVisual,
    },
    {
      Icon: Type,
      word: isEn ? "VOICE" : "TON",
      sub: isEn ? "locked per brand" : "markaya kilitli",
      Visual: VoiceVisual,
    },
    {
      Icon: LayoutGrid,
      word: isEn ? "MORE" : "DAHA",
      sub: isEn ? "accounts, same team" : "çok hesap, aynı ekip",
      Visual: CapacityVisual,
    },
  ] as const;

  useEffect(() => {
    if (paused || points.length === 0) return;
    const t = window.setInterval(
      () => setActive((p) => (p + 1) % points.length),
      3800,
    );
    return () => clearInterval(t);
  }, [paused, points.length]);

  const current = points[active];
  const meta = visuals[active] ?? visuals[0];
  const V = meta.Visual;

  return (
    <div
      className="page-pad mx-auto max-w-6xl py-16 sm:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bonero-green">
            {isEn ? "Why it sticks" : "Neden kalır"}
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {isEn ? "Three shifts. One assistant." : "Üç dönüşüm. Bir asistan."}
          </h2>
        </div>
        <div className="flex gap-2">
          {points.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}`}
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
              className={`h-1.5 rounded-full transition-all ${
                active === i ? "w-8 bg-bonero-green" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a1610]">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          {/* Giant word + visual */}
          <div className="relative min-h-[280px] border-b border-white/8 p-6 sm:min-h-[320px] sm:p-8 lg:border-r lg:border-b-0">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(24,131,71,0.22), transparent 60%)",
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative flex h-full flex-col justify-between"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-bonero-green/30 bg-bonero-green/15 text-bonero-green">
                    <meta.Icon size={16} strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[11px] text-white/35">
                    0{active + 1} / 0{points.length}
                  </span>
                </div>

                <div className="py-6">
                  <p className="font-heading text-[clamp(3.5rem,12vw,6.5rem)] font-extrabold leading-[0.9] tracking-tight text-white">
                    {meta.word}
                  </p>
                  <p className="mt-3 text-sm font-medium tracking-wide text-bonero-green">
                    {meta.sub}
                  </p>
                </div>

                <div className="relative h-16">
                  <V active />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Copy + selector */}
          <div className="flex flex-col justify-between p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current?.title}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.35, ease }}
              >
                <h3 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {current?.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/50">
                  {current?.body}
                </p>
              </motion.div>
            </AnimatePresence>

            <ul className="mt-10 space-y-1">
              {points.map((p, i) => {
                const on = i === active;
                const M = visuals[i];
                return (
                  <li key={p.title}>
                    <button
                      type="button"
                      onClick={() => {
                        setActive(i);
                        setPaused(true);
                      }}
                      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                        on
                          ? "bg-bonero-green/15 text-white"
                          : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                          on
                            ? "border-bonero-green/40 bg-bonero-green/20 text-bonero-green"
                            : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <M.Icon size={14} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">
                          {p.title}
                        </span>
                      </span>
                      {on && (
                        <motion.span
                          layoutId="ai-value-bar"
                          className="h-8 w-1 rounded-full bg-bonero-green"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Progress */}
            <div className="mt-6 h-0.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                key={`${active}-${paused}`}
                className="h-full origin-left bg-bonero-green"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={
                  paused
                    ? { duration: 0.15 }
                    : { duration: 3.8, ease: "linear" }
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlankVisual({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        className="h-10 flex-1 max-w-[140px] rounded-md border border-dashed border-white/15 bg-white/[0.02]"
        animate={active ? { opacity: [0.35, 0.1, 0.35], x: [0, -4, 0] } : {}}
        transition={{ duration: 2.4, repeat: Infinity }}
      />
      <motion.span
        className="text-bonero-green"
        animate={active ? { x: [0, 4, 0] } : {}}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        →
      </motion.span>
      <motion.div
        className="space-y-1.5"
        animate={active ? { opacity: 1 } : { opacity: 0.5 }}
      >
        <div className="h-1.5 w-28 rounded-full bg-bonero-green/80" />
        <div className="h-1.5 w-20 rounded-full bg-bonero-green/40" />
        <div className="h-1.5 w-24 rounded-full bg-bonero-green/25" />
      </motion.div>
    </div>
  );
}

function VoiceVisual({ active }: { active: boolean }) {
  const bars = [40, 70, 55, 90, 60, 80, 45];
  return (
    <div className="flex h-10 items-end gap-1">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-2 rounded-t-sm bg-bonero-green"
          animate={
            active
              ? { height: [`${h * 0.4}%`, `${h}%`, `${h * 0.55}%`] }
              : { height: `${h * 0.5}%` }
          }
          transition={{
            duration: 1.1,
            repeat: Infinity,
            delay: i * 0.08,
            ease: "easeInOut",
          }}
          style={{ height: `${h}%` }}
        />
      ))}
      <span className="ml-3 self-center text-[10px] font-semibold uppercase tracking-wider text-white/35">
        brand lock
      </span>
    </div>
  );
}

function CapacityVisual({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="h-8 w-8 rounded-lg border border-white/10 bg-white/[0.04]"
          animate={
            active
              ? {
                  borderColor:
                    i < 3
                      ? "rgba(24,131,71,0.5)"
                      : "rgba(255,255,255,0.1)",
                  backgroundColor:
                    i < 3
                      ? "rgba(24,131,71,0.15)"
                      : "rgba(255,255,255,0.04)",
                  y: [0, -3, 0],
                }
              : {}
          }
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.12,
          }}
        />
      ))}
      <span className="ml-1 text-[10px] font-semibold text-bonero-green">
        +cap
      </span>
    </div>
  );
}
