"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock, TrendingUp, Users } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

const copy = {
  tr: {
    eyebrow: "Başarı Hikayesi",
    agency: "Pulse Agency",
    headline: "Aynı kadro.",
    headlineAccent: "İki kat hesap.",
    lead:
      "Onay süreleri yarıya indi. Operasyon omurgası Bonero olunca ekip, müşteri sayısını büyüttü — kadro büyütmeden.",
    quote:
      "Bonero operasyonumuzun omurgası oldu. Onaylar hızlandı, ekip aynı tempoda daha fazla hesabı taşıyabiliyor.",
    name: "Ayşe Kaya",
    role: "Operasyon Müdürü",
    chapters: [
      {
        k: "01",
        title: "Önce",
        body: "Beş panel, geciken onaylar, dolan müşteri kuyruğu.",
      },
      {
        k: "02",
        title: "Geçiş",
        body: "Kanallar tek inbox’ta birleşti; rol ve onay hattı netleşti.",
      },
      {
        k: "03",
        title: "Sonra",
        body: "Yanıt temposu yükseldi; aynı ekip iki kat hesabı yönetiyor.",
      },
    ],
    metrics: [
      { value: 30, suffix: "%", label: "verim artışı", icon: TrendingUp },
      { value: 50, suffix: "%", label: "daha kısa onay", icon: Clock },
      { value: 2, suffix: "×", label: "daha fazla hesap", icon: Users },
    ],
  },
  en: {
    eyebrow: "Case Study",
    agency: "Pulse Agency",
    headline: "Same team.",
    headlineAccent: "Twice the accounts.",
    lead:
      "Approvals halved. Once Bonero became the ops backbone, the team grew client load — without growing headcount.",
    quote:
      "Bonero became the backbone of our operations. Approvals sped up, and the same team carries more accounts at the same pace.",
    name: "Ayşe Kaya",
    role: "Operations Manager",
    chapters: [
      {
        k: "01",
        title: "Before",
        body: "Five panels, slow approvals, a growing client backlog.",
      },
      {
        k: "02",
        title: "Shift",
        body: "Channels landed in one inbox; roles and approvals clarified.",
      },
      {
        k: "03",
        title: "After",
        body: "Reply tempo rose; the same team runs twice the accounts.",
      },
    ],
    metrics: [
      { value: 30, suffix: "%", label: "efficiency gain", icon: TrendingUp },
      { value: 50, suffix: "%", label: "faster approvals", icon: Clock },
      { value: 2, suffix: "×", label: "more accounts", icon: Users },
    ],
  },
};

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
const CHAPTER_HOLD = 2800;

export default function CaseStudy() {
  const { locale } = useLocale();
  const t = copy[locale];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      setChapter((p) => (p + 1) % t.chapters.length);
    }, CHAPTER_HOLD);
    return () => clearInterval(id);
  }, [inView, t.chapters.length]);

  return (
    <section
      ref={ref}
      id="basari-hikayesi"
      className="relative overflow-hidden py-16 sm:py-24"
      style={{
        background:
          "linear-gradient(165deg, #f7faf8 0%, #eef5f0 42%, #f5f8f6 100%)",
      }}
    >
      {/* Soft brand wash */}
      <div
        className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(24,131,71,0.14), transparent 68%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 lg:items-start">
          {/* Story column */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-sm font-medium tracking-wide text-bonero-dark/40 uppercase">
                {t.eyebrow}
              </p>
              <p className="font-heading mt-4 text-sm font-bold tracking-[0.2em] text-bonero-green uppercase">
                {t.agency}
              </p>
              <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
                {t.headline}{" "}
                <span className="text-bonero-green">{t.headlineAccent}</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-bonero-dark/55">
                {t.lead}
              </p>
            </Reveal>

            {/* Chapter rail */}
            <div className="mt-10 space-y-2">
              {t.chapters.map((c, i) => {
                const on = chapter === i;
                return (
                  <button
                    key={c.k}
                    type="button"
                    onClick={() => setChapter(i)}
                    className={`group flex w-full items-start gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors ${
                      on
                        ? "bg-bonero-dark text-white shadow-lg shadow-bonero-dark/10"
                        : "bg-white/70 text-bonero-dark/50 ring-1 ring-bonero-dark/6 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`font-heading text-lg tabular-nums ${
                        on ? "text-bonero-green" : "text-bonero-dark/20"
                      }`}
                    >
                      {c.k}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-sm font-bold ${
                            on ? "text-white" : "text-bonero-dark/70"
                          }`}
                        >
                          {c.title}
                        </p>
                        {on && i < t.chapters.length - 1 && (
                          <ArrowRight
                            size={14}
                            className="text-bonero-green"
                          />
                        )}
                      </div>
                      <AnimatePresence mode="wait">
                        {on && (
                          <motion.p
                            key={c.k}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease }}
                            className="mt-1 text-sm leading-relaxed text-white/65"
                          >
                            {c.body}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={chapter}
              className="mt-3 h-0.5 origin-left rounded-full bg-bonero-green"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: CHAPTER_HOLD / 1000, ease: "linear" }}
            />
          </div>

          {/* Results dossier */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="overflow-hidden rounded-[1.5rem] border border-bonero-dark/8 bg-white shadow-[0_24px_60px_-32px_rgba(30,41,59,0.35)]">
              <div className="border-b border-bonero-dark/6 bg-bonero-dark px-6 py-5">
                <p className="text-[11px] font-bold tracking-wide text-white/40 uppercase">
                  {t.agency}
                </p>
                <p className="font-heading mt-1 text-xl tracking-wide text-white">
                  {locale === "tr" ? "Sonuç panosu" : "Results board"}
                </p>
              </div>

              <div className="divide-y divide-bonero-dark/6">
                {t.metrics.map((m, i) => {
                  const MIcon = m.icon;
                  return (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={
                        inView
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: 16 }
                      }
                      transition={{
                        delay: 0.2 + i * 0.12,
                        duration: 0.45,
                        ease,
                      }}
                      className="flex items-center gap-4 px-6 py-5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green">
                        <MIcon size={18} strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-heading text-3xl tracking-wide text-bonero-dark tabular-nums">
                          <CountUp
                            target={m.value}
                            active={inView}
                            duration={1200 + i * 200}
                          />
                          <span className="text-bonero-green">{m.suffix}</span>
                        </p>
                        <p className="text-sm text-bonero-dark/45">{m.label}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="border-t border-bonero-dark/6 bg-[#f8faf9] px-6 py-5">
                <p className="text-sm leading-relaxed text-bonero-dark/60">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(145deg, #2a9d5c, #188347 55%, #0f172a)",
                    }}
                  >
                    AK
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-bonero-dark">
                      {t.name}
                    </p>
                    <p className="text-xs text-bonero-dark/45">
                      {t.role} · {t.agency}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
