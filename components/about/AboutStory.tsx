"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Mail,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";

type StoryCard = {
  icon: LucideIcon;
  step: string;
  label: string;
  title: string;
  description: string;
  keyword: string;
  beats: string[];
  impact: string;
};

const cards: StoryCard[] = [
  {
    icon: Mail,
    step: "01",
    label: "Sorun",
    title: "E-posta Karmaşası",
    description:
      "İçerik e-posta zincirinde kaybolur. Onay süreci günlerce sürer. Müşteri teslimatı her seferinde gecikir.",
    keyword: "e-posta zinciri",
    beats: ["23 mail · 1 içerik", "CC kaos", "Onay kayıp"],
    impact: "Ortalama 4.2 gün onay gecikmesi",
  },
  {
    icon: Workflow,
    step: "02",
    label: "Sorun",
    title: "Operasyonel Sürtünme",
    description:
      "Dağınık kanallar, tekrarlayan takip, belirsiz sorumluluk. Her müşteri teslimatı ayrı bir kriz gibi işler.",
    keyword: "onay süreci",
    beats: ["3 araç · 0 sahiplik", "Takip döngüsü", "Geciken yayın"],
    impact: "Ekip zamanının %35’i takipte kaybolur",
  },
  {
    icon: Sparkles,
    step: "03",
    label: "Çözüm",
    title: "Bonero Basitliği",
    description:
      "Tek panel. Net onay süreci. Şeffaf müşteri teslimatı. Bağlan, üret, yayına al — öğrenme eğrisi yok.",
    keyword: "müşteri teslimatı",
    beats: ["Tek panel", "Anlık onay", "Şeffaf teslimat"],
    impact: "Tek akış · sıfır sürtünme · ölçülebilir teslimat",
  },
];

function MiniScene({ step, lit }: { step: string; lit: boolean }) {
  if (step === "01") {
    return (
      <div
        className={`relative h-[128px] overflow-hidden rounded-2xl p-3 ${
          lit
            ? "border border-white/10 bg-black/25"
            : "border border-bonero-dark/8 bg-[#f0f2f1]"
        }`}
      >
        <div
          className={`absolute top-2 right-3 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
            lit
              ? "bg-white/10 text-white/70"
              : "bg-red-500/10 text-red-500/80"
          }`}
        >
          +19 okunmamış
        </div>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`absolute left-3 right-3 rounded-lg px-3 py-2.5 shadow-sm ${
              lit
                ? "border border-white/10 bg-white/5"
                : "border border-bonero-dark/8 bg-white"
            }`}
            style={{ top: 28 + i * 26 }}
            animate={{
              x: [0, i % 2 === 0 ? 8 : -6, 0],
              rotate: [0, i === 1 ? -2 : 1.5, 0],
            }}
            transition={{ duration: 3.2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-400/70" />
              <span
                className={`h-1.5 flex-1 rounded-full ${
                  lit ? "bg-white/15" : "bg-bonero-dark/10"
                }`}
              />
              <span
                className={`h-1.5 w-10 rounded-full ${
                  lit ? "bg-white/10" : "bg-bonero-dark/8"
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (step === "02") {
    return (
      <div
        className={`relative h-[128px] overflow-hidden rounded-2xl p-3 ${
          lit
            ? "border border-white/10 bg-black/25"
            : "border border-bonero-dark/8 bg-[#f0f2f1]"
        }`}
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 128" aria-hidden="true">
          <motion.path
            d="M15 40 C55 8, 85 110, 125 48 S175 18, 190 78"
            fill="none"
            stroke={lit ? "rgba(255,255,255,0.2)" : "rgba(30,41,59,0.18)"}
            strokeWidth="1.5"
            strokeDasharray="5 5"
            animate={{ strokeDashoffset: [0, -30] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M20 95 C60 120, 95 25, 135 88 S170 110, 192 42"
            fill="none"
            stroke="rgba(24,131,71,0.45)"
            strokeWidth="1.6"
            animate={{ pathLength: [0.15, 1, 0.25] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center gap-2.5">
          {["WA", "IG", "Mail"].map((c, i) => (
            <motion.span
              key={c}
              className={`rounded-full border px-2.5 py-1.5 text-[10px] font-semibold shadow-sm ${
                lit
                  ? "border-white/15 bg-white/10 text-white/70"
                  : "border-bonero-dark/10 bg-white text-bonero-dark/50"
              }`}
              animate={{ y: [0, i === 1 ? -8 : 6, 0] }}
              transition={{ duration: 2.6 + i * 0.35, repeat: Infinity }}
            >
              {c}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative h-[128px] overflow-hidden rounded-2xl p-3 ${
        lit ? "bg-bonero-green/20" : "bg-bonero-green/10"
      }`}
    >
      <div
        className={`flex h-full flex-col justify-between rounded-xl p-3.5 ${
          lit ? "bg-black/30" : "bg-bonero-dark/30"
        }`}
      >
        <div className="flex items-center gap-2">
          <motion.span
            className="h-2 w-2 rounded-full bg-bonero-green"
            animate={{ scale: [1, 1.45, 1], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="text-[10px] font-medium text-white/65">Akış aktif</span>
        </div>
        <div className="space-y-2">
          {["Bağlan", "Üret", "Yayına al"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <motion.span
                className="h-1 flex-1 origin-left rounded-full bg-bonero-green/50"
                animate={{ scaleX: [0.35, 1, 0.55, 1] }}
                transition={{ duration: 3, delay: i * 0.25, repeat: Infinity }}
              />
              <span className="text-[10px] font-semibold text-white/85">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StoryCardItem({
  card,
  index,
  active,
  onActivate,
}: {
  card: StoryCard;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const Icon = card.icon;

  return (
    <Reveal delay={0.08 * index} className="h-full">
      <motion.article
        onMouseEnter={onActivate}
        onFocus={onActivate}
        tabIndex={0}
        whileHover={{ y: -14 }}
        animate={{
          y: active ? -6 : 0,
          backgroundColor: active ? "#1e293b" : "#ffffff",
          boxShadow: active
            ? "0 32px 64px rgba(24,131,71,0.32)"
            : "0 10px 28px rgba(30,41,59,0.05)",
        }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        className={`group relative flex h-full min-h-[460px] cursor-default flex-col overflow-hidden rounded-[1.75rem] p-6 sm:p-7 ${
          active
            ? "text-white ring-1 ring-bonero-green/30"
            : "border border-bonero-dark/8 text-bonero-dark"
        }`}
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: active ? 1 : 0 }}
          style={{
            background:
              "radial-gradient(circle at 100% 0%, rgba(24,131,71,0.35), transparent 55%)",
          }}
          aria-hidden="true"
        />

        <div className="relative flex items-start justify-between gap-3">
          <div>
            <motion.span
              className={`font-heading block text-6xl !font-extrabold leading-none tracking-tight sm:text-7xl ${
                active ? "text-white/15" : "text-bonero-dark/[0.07]"
              }`}
              animate={{ y: active ? -6 : 0, scale: active ? 1.04 : 1 }}
            >
              {card.step}
            </motion.span>
            <span
              className={`mt-2 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase ${
                active ? "text-bonero-green" : "text-bonero-dark/40"
              }`}
            >
              <motion.span
                className={`h-1.5 w-1.5 rounded-full ${
                  active ? "bg-bonero-green" : "bg-bonero-dark/25"
                }`}
                animate={active ? { scale: [1, 1.6, 1] } : {}}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              {card.label}
            </span>
          </div>
          <motion.span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              active
                ? "bg-bonero-green text-white"
                : "bg-bonero-dark/5 text-bonero-dark/65"
            }`}
            animate={{ rotate: active ? 14 : 0, scale: active ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 16 }}
          >
            <Icon size={22} strokeWidth={1.4} />
          </motion.span>
        </div>

        <div className="relative mt-5">
          <MiniScene step={card.step} lit={active} />
        </div>

        <div className="relative mt-6 flex flex-1 flex-col">
          <h3
            className={`font-heading text-xl !font-extrabold sm:text-2xl ${
              active ? "text-white" : "text-bonero-dark"
            }`}
          >
            {card.title}
          </h3>
          <p
            className={`mt-3 text-sm leading-relaxed ${
              active ? "text-white/65" : "text-bonero-dark/60"
            }`}
          >
            {card.description}
          </p>

          <AnimatePresence>
            {active && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden text-xs font-semibold text-bonero-green"
              >
                → {card.impact}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-auto pt-5">
            <div className="flex flex-wrap gap-2">
              {card.beats.map((beat) => (
                <span
                  key={beat}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide ${
                    active
                      ? "bg-white/10 text-white/70"
                      : "bg-bonero-dark/5 text-bonero-dark/50"
                  }`}
                >
                  {beat}
                </span>
              ))}
            </div>
            <p
              className={`mt-4 text-[11px] font-medium tracking-[0.14em] uppercase ${
                active ? "text-white/35" : "text-bonero-dark/30"
              }`}
            >
              {card.keyword}
            </p>
          </div>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 origin-left bg-bonero-green"
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        />
      </motion.article>
    </Reveal>
  );
}

export default function AboutStory() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      className="relative overflow-hidden border-t border-bonero-dark/6 py-20 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 35% at 50% -5%, rgba(24,131,71,0.08), transparent 50%), #f7f8f7",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              Hikayemiz
            </p>
            <h2 className="font-heading mt-4 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
              Neden Bonero?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-bonero-dark/55">
              Üzerine geldiğiniz kart yeşile döner — sorun veya çözüm, aktif olan
              öne çıkar.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="w-full max-w-sm lg:w-auto">
            <div className="flex items-center gap-2">
              {cards.map((c, i) => (
                <button
                  key={c.step}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group flex flex-1 items-center gap-2 lg:flex-none"
                  aria-label={`${c.step} ${c.title}`}
                  aria-pressed={active === i}
                >
                  <span
                    className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-xs font-bold transition-colors ${
                      active === i
                        ? "bg-bonero-green text-white"
                        : "bg-bonero-dark/5 text-bonero-dark/40 group-hover:bg-bonero-dark/10"
                    }`}
                  >
                    {c.step}
                    {active === i && !paused && (
                      <motion.span
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-white/70"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 4.2, ease: "linear" }}
                        style={{ transformOrigin: "left" }}
                      />
                    )}
                  </span>
                  {i < cards.length - 1 && (
                    <span
                      className={`hidden h-px w-10 transition-colors sm:block ${
                        active > i ? "bg-bonero-green" : "bg-bonero-dark/15"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2 rounded-2xl border border-bonero-green/25 bg-bonero-dark px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold tracking-[0.16em] text-bonero-green uppercase">
                  {cards[active].step} · {cards[active].label}
                </span>
                <span className="font-heading text-base !font-extrabold sm:text-lg">
                  {cards[active].title}
                </span>
              </div>
              <p className="text-sm font-medium text-bonero-green">
                {cards[active].impact}
              </p>
            </motion.div>
          </AnimatePresence>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-3 md:gap-6">
          {cards.map((card, index) => (
            <StoryCardItem
              key={card.title}
              card={card}
              index={index}
              active={active === index}
              onActivate={() => setActive(index)}
            />
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-bonero-green/90"
          >
            Bizimle tanışın
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
