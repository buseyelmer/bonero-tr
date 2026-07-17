"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, Filter, Mail, MousePointerClick, Send, TrendingUp } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const ease = [0.22, 1, 0.36, 1] as const;
const STEP = 3800;

const copy = {
  tr: {
    studio: "Kampanya stüdyosu",
    live: "Zamanlandı · Cum 10:00",
    badgeOpen: "Açılma %42",
    badgeAb: "Konu A kazanıyor",
    badgeSend: "Gönderim · 2 dk",
    segments: "Segmentler",
    body: "Gövde",
    cta: "Randevu al",
    steps: [
      {
        id: "who",
        label: "Kime",
        title: "Aktif müşteriler",
        meta: "1.860",
        rows: [
          { label: "Aktif müşteriler", meta: "1.860", on: true },
          { label: "Yeni lead’ler", meta: "410", on: false },
          { label: "Gelmedi 30g", meta: "124", on: false },
        ],
      },
      {
        id: "what",
        label: "Ne",
        title: "A/B konu",
        meta: "test",
        rows: [
          { label: "A · Bu haftayı kaçırma", meta: "kazanıyor", on: true },
          { label: "B · Senin için 3 ipucu", meta: "test", on: false },
          { label: "CTA · Randevu al", meta: "buton", on: false },
        ],
      },
      {
        id: "when",
        label: "Ne zaman",
        title: "Cuma 10:00",
        meta: "slot",
        rows: [
          { label: "Cuma 10:00", meta: "slot", on: true },
          { label: "Açılma %42", meta: "sonuç", on: true },
          { label: "Tıklama %8,6", meta: "sonuç", on: false },
        ],
      },
    ],
    subjects: {
      a: "Bu haftayı kaçırma",
      b: "Senin için 3 ipucu",
    },
    stats: [
      { v: "1.860", l: "alıcı" },
      { v: "%42", l: "açılma" },
      { v: "A/B", l: "konu" },
    ],
  },
  en: {
    studio: "Campaign studio",
    live: "Scheduled · Fri 10:00",
    badgeOpen: "Open 42%",
    badgeAb: "Subject A winning",
    badgeSend: "Send · 2 min",
    segments: "Segments",
    body: "Body",
    cta: "Book",
    steps: [
      {
        id: "who",
        label: "Who",
        title: "Active customers",
        meta: "1,860",
        rows: [
          { label: "Active customers", meta: "1,860", on: true },
          { label: "New leads", meta: "410", on: false },
          { label: "No-show 30d", meta: "124", on: false },
        ],
      },
      {
        id: "what",
        label: "What",
        title: "A/B subject",
        meta: "test",
        rows: [
          { label: "A · Don’t miss this week", meta: "winning", on: true },
          { label: "B · 3 tips for you", meta: "test", on: false },
          { label: "CTA · Book", meta: "button", on: false },
        ],
      },
      {
        id: "when",
        label: "When",
        title: "Friday 10:00",
        meta: "slot",
        rows: [
          { label: "Friday 10:00", meta: "slot", on: true },
          { label: "Open 42%", meta: "result", on: true },
          { label: "Click 8.6%", meta: "result", on: false },
        ],
      },
    ],
    subjects: {
      a: "Don’t miss this week",
      b: "3 tips for you",
    },
    stats: [
      { v: "1,860", l: "recipients" },
      { v: "42%", l: "open" },
      { v: "A/B", l: "subject" },
    ],
  },
};

const stepIcons = [Filter, Mail, Send] as const;

export default function EmailHeroVisual() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [step, setStep] = useState(0);
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), {
    stiffness: 90,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), {
    stiffness: 90,
    damping: 22,
  });

  useEffect(() => {
    if (hovering) return;
    const id = window.setInterval(
      () => setStep((p) => (p + 1) % t.steps.length),
      STEP,
    );
    return () => clearInterval(id);
  }, [hovering, t.steps.length]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    setHovering(false);
    mx.set(0);
    my.set(0);
  };

  const active = t.steps[step];
  const StepIcon = stepIcons[step];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <motion.div
        className="pointer-events-none absolute -left-3 top-10 z-20 hidden rounded-xl border border-bonero-green/25 bg-white px-3 py-2 shadow-lg sm:block"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="flex items-center gap-1.5 text-[10px] font-bold text-bonero-green">
          <TrendingUp size={12} />
          {t.badgeOpen}
        </p>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -right-2 top-[22%] z-20 hidden rounded-xl border border-bonero-dark/10 bg-white px-3 py-2 shadow-lg sm:block"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <p className="flex items-center gap-1.5 text-[10px] font-bold text-bonero-dark/70">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green/45" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-bonero-green" />
          </span>
          {t.badgeAb}
        </p>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute right-8 -bottom-1 z-20 hidden rounded-xl border border-bonero-dark/10 bg-white px-3 py-2 shadow-lg sm:block"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <p className="flex items-center gap-1.5 text-[10px] font-bold text-bonero-dark/65">
          <Send size={12} className="text-bonero-green" />
          {t.badgeSend}
        </p>
      </motion.div>

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="relative overflow-hidden rounded-[1.4rem] border border-bonero-dark/10 bg-white shadow-[0_28px_70px_rgba(24,131,71,0.14)]"
      >
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-bonero-green/60 to-transparent"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(24,131,71,0.1), transparent 55%)",
          }}
          aria-hidden
        />

        <div className="relative flex items-center justify-between border-b border-bonero-dark/8 bg-bonero-dark px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-bonero-green text-white">
              <Mail size={13} />
            </span>
            <span className="text-xs font-semibold text-white/80">{t.studio}</span>
          </div>
          <motion.span
            className="inline-flex items-center gap-1.5 rounded-full border border-bonero-green/35 bg-bonero-green/15 px-2.5 py-1 text-[10px] font-bold text-bonero-green"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green/40" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-bonero-green" />
            </span>
            {t.live}
          </motion.span>
        </div>

        <div className="relative grid sm:grid-cols-[132px_minmax(0,1fr)]">
          <div className="hidden border-r border-bonero-dark/8 bg-[#f6f8f7] p-3 sm:block">
            <p className="text-[9px] font-bold tracking-wide text-bonero-dark/35 uppercase">
              {t.segments}
            </p>
            <div className="mt-2 space-y-1.5">
              {t.steps[0].rows.map((row, i) => (
                <motion.div
                  key={row.label}
                  animate={{
                    backgroundColor: i === 0 ? "rgb(24, 131, 71)" : "rgb(255, 255, 255)",
                    color: i === 0 ? "rgb(255, 255, 255)" : "rgba(30, 41, 59, 0.5)",
                  }}
                  className="rounded-lg px-2 py-1.5 text-[10px] font-semibold"
                >
                  <p className="truncate">{row.label}</p>
                  <p
                    className={`font-mono text-[9px] ${
                      i === 0 ? "text-white/70" : "text-bonero-dark/30"
                    }`}
                  >
                    {row.meta}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="min-w-0 p-3.5 sm:p-4">
            <div className="mb-3 flex gap-1.5">
              {t.steps.map((s, i) => {
                const Icon = stepIcons[i];
                const on = i === step;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStep(i)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-[10px] font-bold transition-colors ${
                      on
                        ? "border-bonero-green/35 bg-bonero-green/[0.08] text-bonero-green"
                        : "border-bonero-dark/8 bg-white text-bonero-dark/40 hover:border-bonero-dark/15"
                    }`}
                  >
                    <Icon size={11} />
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-bonero-green text-white shadow-md shadow-bonero-green/25">
                    <StepIcon size={14} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold tracking-wide text-bonero-dark/35 uppercase">
                      {active.label}
                    </p>
                    <p className="font-heading text-sm text-bonero-dark">{active.title}</p>
                  </div>
                  <span className="ml-auto font-mono text-[11px] font-bold text-bonero-green">
                    {active.meta}
                  </span>
                </div>

                {step === 1 ? (
                  <div className="space-y-2">
                    <div className="rounded-xl border border-bonero-green/30 bg-bonero-green/[0.06] px-3 py-2.5">
                      <p className="text-[9px] font-bold tracking-wide text-bonero-green uppercase">
                        A · {locale === "en" ? "winning" : "kazanıyor"}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-bonero-dark">
                        {t.subjects.a}
                      </p>
                    </div>
                    <div className="rounded-xl border border-bonero-dark/8 bg-white px-3 py-2.5">
                      <p className="text-[9px] font-bold tracking-wide text-bonero-dark/35 uppercase">
                        B · test
                      </p>
                      <p className="mt-1 text-sm text-bonero-dark/50">{t.subjects.b}</p>
                    </div>
                  </div>
                ) : step === 2 ? (
                  <div className="rounded-xl border border-bonero-dark/8 bg-[#f8faf9] p-3">
                    <div className="flex items-end gap-1.5">
                      {[28, 34, 31, 38, 42, 22, 18].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t-sm bg-bonero-green origin-bottom"
                          initial={{ height: 8 }}
                          animate={{
                            height: Math.max(10, Math.round((h / 50) * 56)),
                            opacity: i === 4 ? 1 : 0.35 + i * 0.06,
                          }}
                          transition={{ delay: i * 0.04, ease }}
                        />
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-bonero-green">
                        <MousePointerClick size={11} />
                        {locale === "en" ? "Click 8.6%" : "Tıklama %8,6"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-bonero-dark/45">
                        <Check size={11} className="text-bonero-green" />
                        {active.title}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {active.rows.map((row, i) => (
                      <motion.div
                        key={row.label}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, ease }}
                        className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${
                          row.on
                            ? "border-bonero-green/30 bg-white shadow-sm"
                            : "border-bonero-dark/6 bg-white/60"
                        }`}
                      >
                        <span
                          className={`text-xs font-semibold ${
                            row.on ? "text-bonero-dark" : "text-bonero-dark/40"
                          }`}
                        >
                          {row.label}
                        </span>
                        <span
                          className={`font-mono text-[10px] ${
                            row.on ? "text-bonero-green" : "text-bonero-dark/30"
                          }`}
                        >
                          {row.meta}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="mt-3 rounded-xl border border-dashed border-bonero-dark/12 bg-[#f9fafb] p-3">
                    <p className="text-[9px] font-bold tracking-wide text-bonero-dark/35 uppercase">
                      {t.body}
                    </p>
                    <div className="mt-2 space-y-1.5">
                      <div className="h-1.5 w-3/4 rounded bg-bonero-dark/10" />
                      <div className="h-1.5 w-full rounded bg-bonero-dark/8" />
                      <div className="h-1.5 w-5/6 rounded bg-bonero-dark/8" />
                    </div>
                    <div className="mt-3 inline-flex rounded-lg bg-bonero-green px-3 py-1.5 text-[10px] font-semibold text-white">
                      {t.cta}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {t.stats.map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl border border-bonero-dark/8 bg-white px-2 py-2 text-center"
                >
                  <p className="font-heading text-sm font-bold text-bonero-dark">{s.v}</p>
                  <p className="text-[9px] text-bonero-dark/40">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-bonero-dark/8">
              {!hovering && (
                <motion.div
                  key={step}
                  className="h-full rounded-full bg-bonero-green"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: STEP / 1000, ease: "linear" }}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
