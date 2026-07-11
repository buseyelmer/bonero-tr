"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Megaphone,
  Sparkles,
  Target,
  Zap,
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

type Variant = {
  letter: string;
  hook: string;
  body: string;
  angle: string;
};

const variantsTr: Variant[] = [
  {
    letter: "A",
    hook: "Stok bitmeden yakala.",
    body: "Bu hafta sınırlı adet — erken gelen kazanır.",
    angle: "Aciliyet",
  },
  {
    letter: "B",
    hook: "Bu hafta %20 — sadece sen.",
    body: "Sepetine özel indirim. Bugün kullan, yarın yok.",
    angle: "Kişisel teklif",
  },
  {
    letter: "C",
    hook: "Sepette bıraktın. Biz hatırlattık.",
    body: "Ürün seni bekliyor. Tek tıkla tamamla.",
    angle: "Retarget",
  },
];

const variantsEn: Variant[] = [
  {
    letter: "A",
    hook: "Grab it before it’s gone.",
    body: "Limited stock this week — early birds win.",
    angle: "Urgency",
  },
  {
    letter: "B",
    hook: "20% this week — just for you.",
    body: "Cart-only discount. Use today, gone tomorrow.",
    angle: "Personal offer",
  },
  {
    letter: "C",
    hook: "You left it. We reminded you.",
    body: "Your product is waiting. Finish in one tap.",
    angle: "Retarget",
  },
];

const pipelineTr = [
  { t: "Brief", d: "Hedef + ton + kanal" },
  { t: "Üretim", d: "3 varyasyon bir anda" },
  { t: "Seçim", d: "A/B/C karşılaştır" },
  { t: "Onay", d: "Ekip / müşteri" },
];

const pipelineEn = [
  { t: "Brief", d: "Goal + tone + channel" },
  { t: "Generate", d: "3 variants at once" },
  { t: "Pick", d: "Compare A/B/C" },
  { t: "Approve", d: "Team / client" },
];

const frameVisuals = [
  {
    dayTr: "Pzt",
    dayEn: "Mon",
    hookTr: "Sepette bıraktın.",
    hookEn: "You left it.",
    ctaTr: "Tamamla",
    ctaEn: "Checkout",
    metric: "CTR 2.4%",
    letters: ["A", "B", "C"],
  },
  {
    dayTr: "Çar",
    dayEn: "Wed",
    hookTr: "Stok bitmeden.",
    hookEn: "Before it’s gone.",
    ctaTr: "Al",
    ctaEn: "Buy",
    metric: "ROAS 3.1×",
    letters: ["A", "B"],
  },
  {
    dayTr: "Cum",
    dayEn: "Fri",
    hookTr: "Kazanan hook.",
    hookEn: "Winning hook.",
    ctaTr: "Ölçekle",
    ctaEn: "Scale",
    metric: "+18% CVR",
    letters: ["A"],
  },
];

function CampaignWeekStrip({
  scenarios,
  outcome,
  isEn,
}: {
  scenarios: { label: string; text: string }[];
  outcome: string;
  isEn: boolean;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = window.setInterval(
      () => setActive((p) => (p + 1) % scenarios.length),
      3200,
    );
    return () => clearInterval(t);
  }, [scenarios.length]);

  return (
    <section className="relative border-t border-white/8 bg-[#0a0806]">
      <div className="page-pad mx-auto max-w-6xl py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
              {isEn ? "Campaign week" : "Kampanya haftası"}
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {isEn
                ? "Frames from a campaign week."
                : "Bir kampanya haftasından kareler."}
            </h2>
          </div>
          <p className="font-mono text-[11px] text-amber-400/70">
            {isEn ? "Mon → Fri · live" : "Pzt → Cum · canlı"}
          </p>
        </div>

        {/* Film strip */}
        <div className="relative mt-10 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#120e0c]">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-[repeating-linear-gradient(180deg,#1a1612_0_10px,transparent_10px_18px)] opacity-80"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-3 bg-[repeating-linear-gradient(180deg,#1a1612_0_10px,transparent_10px_18px)] opacity-80"
            aria-hidden
          />

          <div className="grid gap-0 sm:grid-cols-3">
            {scenarios.map((s, i) => {
              const v = frameVisuals[i] ?? frameVisuals[0];
              const lit = active === i;
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative border-b border-white/8 p-4 text-left transition-colors last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0 sm:p-5 ${
                    lit ? "bg-bonero-green/[0.08]" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-amber-400/80">
                      {isEn ? v.dayEn : v.dayTr} · F{i + 1}
                    </span>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        lit
                          ? "bg-bonero-green text-white"
                          : "bg-white/5 text-white/35"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>

                  {/* Mini ad creative */}
                  <div
                    className={`relative overflow-hidden rounded-xl border p-4 transition-colors ${
                      lit
                        ? "border-bonero-green/40 bg-[#0c1610]"
                        : "border-white/8 bg-[#0c0a09]"
                    }`}
                  >
                    <div className="flex gap-1.5">
                      {v.letters.map((letter) => (
                        <span
                          key={letter}
                          className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold ${
                            letter === "A" && lit
                              ? "bg-bonero-green text-white"
                              : "bg-white/8 text-white/40"
                          }`}
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 font-heading text-lg font-bold leading-snug text-white sm:text-xl">
                      {isEn ? v.hookEn : v.hookTr}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="rounded-lg bg-bonero-green px-2.5 py-1 text-[10px] font-bold text-white">
                        {isEn ? v.ctaEn : v.ctaTr}
                      </span>
                      <span className="font-mono text-[10px] text-bonero-green/80">
                        {v.metric}
                      </span>
                    </div>
                    <motion.div
                      className="mt-3 h-0.5 rounded-full bg-white/10"
                      initial={false}
                    >
                      <motion.div
                        className="h-full rounded-full bg-bonero-green"
                        animate={{ width: lit ? "100%" : "0%" }}
                        transition={{ duration: lit ? 3.1 : 0.3, ease: "linear" }}
                      />
                    </motion.div>
                  </div>

                  <p className="mt-3 text-[12px] leading-relaxed text-white/45">
                    {s.text}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-sm font-medium text-white/55">{outcome}</p>
      </div>
    </section>
  );
}

export default function AdsFeaturePage({
  feature,
}: {
  feature: FeaturePageContent;
}) {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const variants = isEn ? variantsEn : variantsTr;
  const pipeline = isEn ? pipelineEn : pipelineTr;
  const points = isEn ? feature.valuePointsEn : feature.valuePoints;
  const [focus, setFocus] = useState(0);
  const [pipeStep, setPipeStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(
      () => setFocus((p) => (p + 1) % variants.length),
      3400,
    );
    return () => clearInterval(t);
  }, [paused, variants.length]);

  useEffect(() => {
    const t = window.setInterval(
      () => setPipeStep((p) => (p + 1) % pipeline.length),
      2200,
    );
    return () => clearInterval(t);
  }, [pipeline.length]);

  const current = variants[focus];

  return (
    <div className="relative overflow-x-clip bg-[#0c0a09] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 85% 5%, rgba(24,131,71,0.22), transparent 50%), radial-gradient(ellipse 45% 35% at 5% 70%, rgba(245,158,11,0.1), transparent 50%), radial-gradient(ellipse 30% 25% at 50% 100%, rgba(24,131,71,0.08), transparent 50%)",
        }}
      />

      {/* Hero — full studio */}
      <section className="relative page-pad mx-auto max-w-6xl pt-28 pb-10 sm:pt-32 sm:pb-14">
        <FeatureBackLink />

        <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.p
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/85"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Megaphone size={13} />
              {isEn ? feature.eyebrowEn : feature.eyebrow}
            </motion.p>
            <motion.h1
              className="mt-4 max-w-2xl font-heading text-[2rem] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3rem]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5, ease }}
            >
              {isEn ? feature.headlineEn : feature.headline}
            </motion.h1>
            <motion.p
              className="mt-5 max-w-xl text-base leading-relaxed text-white/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45, ease }}
            >
              {isEn ? feature.leadEn : feature.lead}
            </motion.p>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
            >
              <FeatureCtaButton />
            </motion.div>
          </div>

          <motion.div
            className="flex gap-3 lg:flex-col lg:items-end"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {[
              { Icon: Zap, l: isEn ? "Faster cycle" : "Hızlı döngü" },
              { Icon: Target, l: isEn ? "Test-ready" : "Teste hazır" },
              { Icon: Sparkles, l: isEn ? "On-brand" : "Marka tonu" },
            ].map(({ Icon, l }) => (
              <div
                key={l}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/55"
              >
                <Icon size={12} className="text-bonero-green" />
                {l}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live creative studio */}
      <section className="relative page-pad mx-auto max-w-6xl pb-8">
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#100e0c]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-3.5 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-bonero-green" />
              <span className="text-xs font-semibold text-white/60">
                {isEn ? "Creative studio · live" : "Kreatif stüdyo · canlı"}
              </span>
            </div>
            <div className="flex gap-1.5">
              {variants.map((v, i) => (
                <button
                  key={v.letter}
                  type="button"
                  onClick={() => {
                    setFocus(i);
                    setPaused(true);
                  }}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition-colors ${
                    focus === i
                      ? "bg-bonero-green text-white"
                      : "bg-white/5 text-white/40 hover:text-white"
                  }`}
                >
                  {v.letter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Brief rail */}
            <div className="space-y-5 border-b border-white/8 p-5 sm:p-6 lg:border-r lg:border-b-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                Brief
              </p>
              <dl className="space-y-3 text-sm">
                {(isEn
                  ? [
                      ["Goal", "Retarget / conversion"],
                      ["Tone", "Direct, urgent, friendly"],
                      ["Channel", "Meta / Instagram"],
                      ["Output", "3 variants · approval-ready"],
                    ]
                  : [
                      ["Hedef", "Retarget / dönüşüm"],
                      ["Ton", "Direkt, acil, samimi"],
                      ["Kanal", "Meta / Instagram"],
                      ["Çıktı", "3 varyasyon · onaya hazır"],
                    ]
                ).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-b border-white/6 pb-2.5"
                  >
                    <dt className="text-white/30">{k}</dt>
                    <dd className="text-right font-medium text-white/70">{v}</dd>
                  </div>
                ))}
              </dl>

              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                  {isEn ? "Pipeline" : "Akış"}
                </p>
                <ol className="space-y-2">
                  {pipeline.map((s, i) => (
                    <li
                      key={s.t}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                        pipeStep === i
                          ? "bg-bonero-green/15 text-white"
                          : "text-white/40"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          pipeStep === i
                            ? "bg-bonero-green text-white"
                            : pipeStep > i
                              ? "bg-bonero-green/30 text-bonero-green"
                              : "bg-white/10 text-white/35"
                        }`}
                      >
                        {pipeStep > i ? <Check size={11} strokeWidth={2.5} /> : i + 1}
                      </span>
                      <span>
                        <span className="block text-xs font-semibold">{s.t}</span>
                        <span className="block text-[11px] opacity-60">{s.d}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Billboard */}
            <div
              className="relative min-h-[360px] p-5 sm:min-h-[400px] sm:p-7"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(24,131,71,0.18), transparent 60%)",
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.letter}
                  className="relative flex h-full flex-col justify-between"
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bonero-green text-xl font-bold text-white shadow-lg shadow-bonero-green/30">
                      {current.letter}
                    </span>
                    <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-300/90">
                      {current.angle}
                    </span>
                  </div>

                  <div className="my-8">
                    <p className="font-heading text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                      {current.hook}
                    </p>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-white/45">
                      {current.body}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-bonero-green">
                      <Check size={13} strokeWidth={2.5} />
                      {isEn ? "Approval-ready creative" : "Onaya hazır kreatif"}
                    </span>
                    <div className="flex gap-1.5">
                      {variants.map((v, i) => (
                        <button
                          key={v.letter}
                          type="button"
                          aria-label={`Variant ${v.letter}`}
                          onClick={() => {
                            setFocus(i);
                            setPaused(true);
                          }}
                          className={`h-1.5 rounded-full transition-all ${
                            focus === i ? "w-7 bg-bonero-green" : "w-1.5 bg-white/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Stack peek */}
              <div className="pointer-events-none absolute right-4 bottom-4 hidden flex-col gap-1.5 sm:flex">
                {variants
                  .filter((_, i) => i !== focus)
                  .map((v) => (
                    <div
                      key={v.letter}
                      className="rounded-lg border border-white/8 bg-black/40 px-2.5 py-1.5 text-[10px] font-bold text-white/30 backdrop-blur-sm"
                    >
                      {v.letter}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1 — Value as stacked creative posters */}
      <section className="relative border-t border-white/8 py-16 sm:py-20">
        <div className="page-pad mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-400/80">
            {isEn ? "Creative leverage" : "Kreatif kaldıraç"}
          </p>
          <h2 className="mt-2 max-w-lg font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {isEn ? "Why agencies ship more ads." : "Ajanslar neden daha çok reklam çıkarır."}
          </h2>
          <div className="relative mt-12 flex min-h-[340px] flex-col items-center justify-center gap-4 sm:min-h-[380px]">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/12 bg-[#14110f] p-5 shadow-2xl sm:p-6"
                style={{
                  rotate: `${(i - 1) * 2.5}deg`,
                  zIndex: 10 - i,
                  marginTop: i === 0 ? 0 : -28,
                }}
                initial={{ opacity: 0, y: 30, rotate: (i - 1) * 4 }}
                whileInView={{ opacity: 1, y: 0, rotate: (i - 1) * 2.5 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 200, damping: 22 }}
                whileHover={{ y: -6, rotate: 0, zIndex: 20 }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bonero-green/20 text-sm font-bold text-bonero-green">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400/60">
                    {isEn ? "Poster" : "Afiş"} 0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — Campaign week as live ad film strip */}
      <CampaignWeekStrip
        scenarios={isEn ? feature.scenariosEn : feature.scenarios}
        outcome={isEn ? feature.outcomeEn : feature.outcome}
        isEn={isEn}
      />

      <FeatureBottomStrip feature={feature} />
    </div>
  );
}
