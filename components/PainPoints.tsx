"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Check,
  FileWarning,
  Inbox,
  Mail,
  MessageCircle,
  Timer,
} from "lucide-react";
import Reveal from "./Reveal";

type Pain = {
  id: string;
  tag: string;
  beforeTitle: string;
  beforeLine: string;
  afterTitle: string;
  afterLine: string;
  cost: string;
  wins: string[];
};

const pains: Pain[] = [
  {
    id: "revizyon",
    tag: "Revizyon",
    beforeTitle: "Hangisi final?",
    beforeLine: "v3_final, CC zinciri, Drive linki — onay kayıp.",
    afterTitle: "Tek onay hattı",
    afterLine: "Her revizyon izlenebilir. Kim neyi onayladı net.",
    cost: "Geciken teslimat",
    wins: ["Versiyon net", "Onay kaydı", "Müşteri güvende"],
  },
  {
    id: "rapor",
    tag: "Rapor",
    beforeTitle: "Cuma gece Excel",
    beforeLine: "Screenshot, kopyala-yapıştır, PDF avı.",
    afterTitle: "Otomatik özet",
    afterLine: "Veri akar, rapor dakikalar içinde hazır.",
    cost: "Saatlerce manuel iş",
    wins: ["Veri otomatik", "Dakikalar içinde", "Ekip rahat"],
  },
  {
    id: "kanal",
    tag: "Kanal",
    beforeTitle: "3 uygulama, 1 ekip",
    beforeLine: "IG, WhatsApp, mail ayrı — mesaj kaçar.",
    afterTitle: "Tek gelen kutusu",
    afterLine: "Tüm kanallar bir panel. Tek yerden yanıt.",
    cost: "Kaçan mesajlar",
    wins: ["Tek panel", "Hiç kaçmaz", "Hızlı yanıt"],
  },
];

const HOLD_BEFORE = 3000;
const HOLD_AFTER = 3600;
const CYCLE = HOLD_BEFORE + HOLD_AFTER;
const ease = [0.22, 1, 0.36, 1] as const;

function FlowDots({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 hidden h-8 w-28 -translate-x-1/2 -translate-y-1/2 lg:block">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-bonero-green"
          animate={
            active
              ? { x: [-40, 40], opacity: [0, 1, 0], scale: [0.5, 1.1, 0.5] }
              : { x: 0, opacity: 0 }
          }
          transition={{
            duration: 1,
            delay: i * 0.18,
            repeat: active ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function PainPoints() {
  const [active, setActive] = useState(0);
  const [showAfter, setShowAfter] = useState(false);
  const [inView, setInView] = useState(false);
  const current = pains[active];

  useEffect(() => {
    const el = document.getElementById("cozumler");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    setShowAfter(false);
  }, [active]);

  // Continuous auto loop — no hover pause, always flows
  useEffect(() => {
    if (!inView) return;
    const t1 = window.setTimeout(() => setShowAfter(true), HOLD_BEFORE);
    const t2 = window.setTimeout(
      () => setActive((p) => (p + 1) % pains.length),
      CYCLE,
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active, inView]);

  return (
    <section
      id="cozumler"
      className="relative overflow-x-clip py-16 sm:py-24"
      style={{ background: "#0b1210" }}
    >
      <motion.div
        className="pointer-events-none absolute top-[35%] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(24,131,71,0.28), transparent 68%)",
        }}
        animate={{
          scale: showAfter ? [1, 1.12, 1] : [1, 1.04, 1],
          opacity: showAfter ? [0.45, 0.75, 0.45] : [0.25, 0.4, 0.25],
          x: showAfter ? ["-50%", "-42%", "-50%"] : "-50%",
        }}
        transition={{ duration: showAfter ? 4 : 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 45%, black, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-xl">
            <p className="text-sm font-medium tracking-wide text-white/40 uppercase">
              Ajans operasyonu
            </p>
            <h2 className="font-heading mt-3 text-3xl !font-extrabold tracking-wide text-white sm:text-4xl lg:text-[2.75rem]">
              Her ajansın
              <span className="mt-1 block text-white/35">bildiği kaos.</span>
              <span className="mt-1 block text-bonero-green">
                Bonero’nun bitirdiği.
              </span>
            </h2>
          </Reveal>

          {/* Auto tabs with live progress ring */}
          <div className="flex gap-2 lg:pb-1">
            {pains.map((pain, i) => {
              const on = active === i;
              return (
                <button
                  key={pain.id}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setShowAfter(false);
                  }}
                  className={`relative overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    on
                      ? "bg-white text-bonero-dark shadow-lg"
                      : "bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/80"
                  }`}
                >
                  {on && (
                    <motion.span
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-bonero-green"
                      key={`tab-${active}-${showAfter}`}
                      initial={{ scaleX: showAfter ? 0.45 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: showAfter
                          ? HOLD_AFTER / 1000
                          : HOLD_BEFORE / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                  <span className="relative z-10">{pain.tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated theater */}
        <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
          <div className="relative grid min-h-[360px] sm:min-h-[400px] lg:min-h-[420px] lg:grid-cols-2">
            {/* BEFORE */}
            <motion.div
              className="relative flex flex-col justify-between overflow-hidden p-7 sm:p-9"
              animate={{
                backgroundColor: showAfter
                  ? "rgba(18, 24, 22, 1)"
                  : "rgba(36, 28, 22, 1)",
              }}
              transition={{ duration: 0.8, ease }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0"
                animate={{
                  opacity: showAfter ? 0.15 : 0.5,
                }}
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(251,191,36,0.16), transparent 60%)",
                }}
              />

              {/* Drift particles */}
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="pointer-events-none absolute h-1 w-1 rounded-full bg-amber-400/40"
                  style={{ left: `${18 + i * 28}%`, top: `${55 + i * 10}%` }}
                  animate={{
                    y: [0, -18, 0],
                    opacity: showAfter ? 0.1 : [0.2, 0.7, 0.2],
                  }}
                  transition={{
                    duration: 2.5 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}

              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <motion.span
                    className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-amber-300 uppercase"
                    animate={{ opacity: showAfter ? 0.4 : 1 }}
                  >
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-amber-400"
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    Şimdi
                  </motion.span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={current.cost}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      className="text-[11px] font-medium text-white/35"
                    >
                      {current.cost}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`b-${active}`}
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    animate={{
                      opacity: showAfter ? 0.35 : 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease }}
                    className="mt-8"
                  >
                    <p className="font-heading text-[2rem] leading-[1.1] !font-extrabold tracking-wide text-white sm:text-[2.4rem]">
                      {current.beforeTitle}
                    </p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50 sm:text-base">
                      {current.beforeLine}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative mt-10 min-h-[44px] sm:mt-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`cue-${active}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: showAfter ? 0.2 : 1,
                      y: 0,
                      x: showAfter ? -12 : 0,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-wrap items-center gap-2"
                  >
                    {active === 0 &&
                      ["v2", "final?", "v3"].map((l, i) => (
                        <motion.span
                          key={l}
                          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-bold text-white/40"
                          animate={{
                            y: [0, -6, 0],
                            rotate: [-4 + i * 4, 2, -4 + i * 4],
                          }}
                          transition={{
                            duration: 2 + i * 0.25,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <FileWarning
                            size={10}
                            className="mr-1 inline text-amber-400/60"
                          />
                          {l}
                        </motion.span>
                      ))}
                    {active === 1 && (
                      <motion.span
                        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/40"
                        animate={{ opacity: [0.45, 1, 0.45] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      >
                        <Timer size={13} className="text-amber-400/70" />
                        23:00 · hâlâ toplanıyor
                      </motion.span>
                    )}
                    {active === 2 &&
                      [
                        { Icon: Camera, c: "#E1306C" },
                        { Icon: MessageCircle, c: "#25D366" },
                        { Icon: Mail, c: "#0EA5E9" },
                      ].map(({ Icon, c }, i) => (
                        <motion.span
                          key={c}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5"
                          animate={{ y: [0, -7, 0], rotate: [0, i % 2 ? 6 : -6, 0] }}
                          transition={{
                            duration: 2.1,
                            delay: i * 0.12,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <Icon size={15} style={{ color: c }} strokeWidth={1.75} />
                        </motion.span>
                      ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* AFTER — blooms with wipe energy */}
            <motion.div
              className="relative flex flex-col justify-between overflow-hidden p-7 sm:p-9"
              animate={{
                backgroundColor: showAfter
                  ? "rgba(24,131,71,1)"
                  : "rgba(14, 32, 24, 0.9)",
              }}
              transition={{ duration: 0.85, ease }}
            >
              {/* Sweep light when solution activates */}
              <AnimatePresence>
                {showAfter && (
                  <motion.div
                    initial={{ x: "-120%", opacity: 0.6 }}
                    animate={{ x: "120%", opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease }}
                    className="pointer-events-none absolute inset-y-0 w-1/2 skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  />
                )}
              </AnimatePresence>

              <motion.div
                className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full"
                animate={{
                  opacity: showAfter ? [0.25, 0.45, 0.25] : 0.08,
                  scale: showAfter ? [1, 1.15, 1] : 0.85,
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)",
                }}
              />

              <div className="relative">
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.16em] uppercase"
                  animate={{
                    backgroundColor: showAfter
                      ? "rgba(255,255,255,1)"
                      : "rgba(255,255,255,0.06)",
                    color: showAfter ? "#188347" : "rgba(255,255,255,0.45)",
                    scale: showAfter ? [1, 1.06, 1] : 1,
                  }}
                  transition={{ duration: 0.55 }}
                >
                  <Check size={11} strokeWidth={3} />
                  Bonero
                </motion.span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`a-${active}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: showAfter ? 1 : 0.4,
                      y: 0,
                    }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease }}
                    className="mt-8"
                  >
                    <motion.p
                      className="font-heading text-[2rem] leading-[1.1] !font-extrabold tracking-wide text-white sm:text-[2.4rem]"
                      animate={{
                        opacity: showAfter ? 1 : 0.4,
                      }}
                    >
                      {current.afterTitle}
                    </motion.p>
                    <p
                      className={`mt-3 max-w-sm text-sm leading-relaxed sm:text-base ${
                        showAfter ? "text-white/85" : "text-white/35"
                      }`}
                    >
                      {current.afterLine}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative mt-8 min-h-[88px] sm:mt-10">
                <AnimatePresence>
                  {showAfter && (
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-2"
                    >
                      {current.wins.map((win, i) => (
                        <motion.li
                          key={win}
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.15 + i * 0.12,
                            duration: 0.45,
                            ease,
                          }}
                          className="flex items-center gap-2.5 text-sm font-semibold text-white"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                            <Check size={12} strokeWidth={2.5} />
                          </span>
                          {win}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {!showAfter && (
                  <motion.div
                    className="flex items-center gap-2 text-xs font-medium tracking-wide text-white/30 uppercase"
                    animate={{ opacity: [0.3, 0.65, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Inbox size={14} />
                    Çözüm yaklaşıyor…
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Center flow hub */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
              <motion.div
                className="relative flex h-14 w-14 items-center justify-center rounded-full border bg-[#0b1210] text-sm font-bold text-white shadow-2xl"
                animate={{
                  scale: showAfter ? 1.1 : [1, 1.05, 1],
                  borderColor: showAfter
                    ? "rgba(24,131,71,1)"
                    : "rgba(255,255,255,0.2)",
                  boxShadow: showAfter
                    ? "0 0 32px rgba(24,131,71,0.55)"
                    : "0 8px 30px rgba(0,0,0,0.4)",
                }}
                transition={{
                  scale: showAfter
                    ? { duration: 0.45 }
                    : { duration: 2.2, repeat: Infinity },
                }}
              >
                <motion.span
                  animate={{ rotate: showAfter ? 0 : [0, 8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.div>
            </div>

            <FlowDots active={showAfter} />
          </div>

          {/* Continuous progress */}
          <div className="h-1.5 bg-white/5">
            <motion.div
              key={active}
              className="h-full origin-left bg-gradient-to-r from-amber-400 via-bonero-green to-emerald-300"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: CYCLE / 1000, ease: "linear" }}
            />
          </div>
        </div>

        {/* Step dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {pains.map((pain, i) => (
            <button
              key={pain.id}
              type="button"
              aria-label={pain.tag}
              onClick={() => {
                setActive(i);
                setShowAfter(false);
              }}
              className={`h-1.5 rounded-full transition-all ${
                active === i
                  ? "w-8 bg-bonero-green"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
