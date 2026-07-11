"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Check,
  Inbox,
  Link2,
  Mail,
  MessageCircle,
  MessageCircleReply,
  Send,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";

type Step = {
  n: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    n: "01",
    title: "Bağla",
    description:
      "Instagram, WhatsApp ve e-postayı tek tıkla entegre edin. Dakikalar içinde kanallar Bonero’da hazır.",
    icon: Link2,
  },
  {
    n: "02",
    title: "Birleştir",
    description:
      "Tüm mesajlar AI destekli gelen kutusuna düşer. Dağınık paneller biter; tek akış başlar.",
    icon: Sparkles,
  },
  {
    n: "03",
    title: "Yanıtla",
    description:
      "Tek panelden tüm kanallara yanıt verin. Müşteri nerede yazarsa yazsın, ekip aynı yerden konuşur.",
    icon: MessageCircleReply,
  },
];

const HOLD = 3400;
const ease = [0.22, 1, 0.36, 1] as const;

const channels = [
  { Icon: Camera, name: "Instagram", color: "#E1306C" },
  { Icon: MessageCircle, name: "WhatsApp", color: "#25D366" },
  { Icon: Mail, name: "E-posta", color: "#0EA5E9" },
];

function StageBagla({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm items-center justify-between gap-2">
        {channels.map(({ Icon, name, color }, i) => (
          <motion.div
            key={name}
            className="flex flex-col items-center gap-2"
            initial={false}
            animate={
              active
                ? { opacity: 1, y: 0 }
                : { opacity: 0.35, y: 8 }
            }
            transition={{ delay: active ? i * 0.12 : 0, duration: 0.4 }}
          >
            <motion.div
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-bonero-dark/8 bg-white shadow-md"
              animate={
                active
                  ? { scale: [1, 1.06, 1], boxShadow: "0 10px 28px rgba(30,41,59,0.1)" }
                  : { scale: 1 }
              }
              transition={{ duration: 2, repeat: active ? Infinity : 0, delay: i * 0.2 }}
            >
              <Icon size={22} style={{ color }} strokeWidth={1.75} />
            </motion.div>
            <span className="text-[10px] font-semibold text-bonero-dark/45">{name}</span>
          </motion.div>
        ))}
      </div>

      {/* Connecting beams */}
      <div className="relative my-5 h-12 w-full max-w-xs">
        {channels.map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 h-full w-px origin-top bg-gradient-to-b from-bonero-dark/15 to-bonero-green"
            style={{ left: `${16 + i * 34}%` }}
            animate={
              active
                ? { scaleY: [0, 1], opacity: [0, 1] }
                : { scaleY: 0, opacity: 0 }
            }
            transition={{ duration: 0.55, delay: active ? 0.35 + i * 0.12 : 0, ease }}
          />
        ))}
        {active &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={`d-${i}`}
              className="absolute h-1.5 w-1.5 rounded-full bg-bonero-green"
              style={{ left: `${16 + i * 34}%`, marginLeft: -3 }}
              animate={{ y: [0, 48], opacity: [0, 1, 0] }}
              transition={{
                duration: 1.1,
                delay: 0.6 + i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
      </div>

      <motion.div
        className="flex items-center gap-2 rounded-2xl bg-bonero-green px-5 py-3 text-white shadow-lg shadow-bonero-green/25"
        animate={
          active
            ? { scale: 1, opacity: 1 }
            : { scale: 0.92, opacity: 0.4 }
        }
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
      >
        <Link2 size={18} strokeWidth={2} />
        <span className="text-sm font-semibold">Bonero’ya bağlandı</span>
        <motion.span
          animate={active ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          <Check size={16} strokeWidth={2.5} />
        </motion.span>
      </motion.div>
    </div>
  );
}

function StageBirlestir({ active }: { active: boolean }) {
  const msgs = [
    { ch: "IG", text: "Yeni DM · onay", tone: "text-pink-500" },
    { ch: "WA", text: "Acil mesaj", tone: "text-emerald-600" },
    { ch: "Mail", text: "Revizyon v4", tone: "text-sky-600" },
  ];
  return (
    <div className="relative flex h-full items-center justify-center px-4">
      <motion.div
        className="w-full max-w-[280px] overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white shadow-xl"
        animate={active ? { scale: 1, opacity: 1 } : { scale: 0.94, opacity: 0.45 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="flex items-center gap-2 border-b border-bonero-dark/6 bg-bonero-green px-3 py-2.5">
          <Sparkles size={15} className="text-white" strokeWidth={1.75} />
          <span className="text-xs font-semibold text-white">Akıllı Gelen Kutusu</span>
          <motion.span
            className="ml-auto rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold text-white"
            animate={active ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            AI
          </motion.span>
        </div>
        <ul className="divide-y divide-bonero-dark/6">
          {msgs.map((m, i) => (
            <motion.li
              key={m.text}
              className="flex items-center gap-2.5 px-3 py-2.5"
              initial={false}
              animate={
                active
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0.3, x: -12 }
              }
              transition={{ delay: active ? 0.2 + i * 0.15 : 0, duration: 0.4, ease }}
            >
              <span className={`w-8 text-[10px] font-bold ${m.tone}`}>{m.ch}</span>
              <span className="truncate text-[11px] font-medium text-bonero-dark/65">
                {m.text}
              </span>
              <Inbox size={12} className="ml-auto text-bonero-green/70" />
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Incoming chips flying in */}
      {active &&
        channels.map(({ Icon, color }, i) => (
          <motion.div
            key={color}
            className="pointer-events-none absolute flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-md"
            style={{ top: `${22 + i * 22}%`, left: i % 2 === 0 ? "8%" : "auto", right: i % 2 ? "8%" : "auto" }}
            animate={{
              x: i % 2 === 0 ? [0, 40] : [0, -40],
              opacity: [0.8, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 1.4,
              delay: i * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={14} style={{ color }} strokeWidth={1.75} />
          </motion.div>
        ))}
    </div>
  );
}

function StageYanitla({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-full items-center justify-center px-4">
      <motion.div
        className="w-full max-w-[300px] overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white shadow-xl"
        animate={active ? { y: 0, opacity: 1 } : { y: 12, opacity: 0.4 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="flex items-center gap-2 border-b border-bonero-dark/6 px-3 py-2.5">
          <MessageCircleReply size={15} className="text-bonero-green" strokeWidth={1.75} />
          <span className="text-xs font-semibold text-bonero-dark">Yanıt · WhatsApp</span>
          <span className="ml-auto text-[10px] font-medium text-bonero-dark/35">canlı</span>
        </div>
        <div className="space-y-2.5 p-3">
          <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-bonero-dark/[0.05] px-3 py-2 text-[11px] text-bonero-dark/65">
            Merhaba, kampanya onayı geldi mi?
          </div>
          <motion.div
            className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-bonero-green px-3 py-2 text-[11px] text-white"
            initial={false}
            animate={
              active
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 8, scale: 0.96 }
            }
            transition={{ delay: active ? 0.45 : 0, duration: 0.4, ease }}
          >
            Evet — brief onaylandı, yayına alıyoruz.
          </motion.div>
        </div>
        <div className="flex items-center gap-2 border-t border-bonero-dark/6 px-3 py-2.5">
          <div className="h-8 flex-1 rounded-full bg-bonero-dark/[0.04] px-3 text-[11px] leading-8 text-bonero-dark/30">
            Mesaj yaz…
          </div>
          <motion.span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-bonero-green text-white"
            animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
            transition={{ duration: 1.2, repeat: active ? Infinity : 0, delay: 0.8 }}
          >
            <Send size={13} strokeWidth={2} />
          </motion.span>
        </div>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 18 }}
            className="absolute bottom-6 flex items-center gap-1.5 rounded-full bg-bonero-green px-3 py-1.5 text-[10px] font-bold text-white shadow-lg shadow-bonero-green/30 sm:bottom-8"
          >
            <Check size={12} strokeWidth={2.5} />
            3 kanaldan yanıtlandı
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const stages = [StageBagla, StageBirlestir, StageYanitla];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const current = steps[active];
  const Stage = stages[active];
  const StepIcon = current.icon;

  useEffect(() => {
    const el = document.getElementById("nasil-calisir");
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
    if (!inView) return;
    const t = window.setTimeout(() => {
      setActive((p) => (p + 1) % steps.length);
    }, HOLD);
    return () => clearTimeout(t);
  }, [active, inView]);

  return (
    <section
      id="nasil-calisir"
      className="relative overflow-x-clip bg-background py-16 sm:py-24"
    >
      <div
        className="pointer-events-none absolute top-0 right-0 h-[420px] w-[420px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(24,131,71,0.08), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            Nasıl Çalışır?
          </p>
          <h2 className="font-heading mt-3 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
            Omnichannel süreç
            <span className="mt-1 block text-bonero-dark/35">üç adımda biter.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
            Karmaşık değil. Bağla, birleştir, yanıtla — öğrenme eğrisi olmadan.
          </p>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Steps — auto highlight */}
          <div className="lg:col-span-5">
            <ol className="space-y-3">
              {steps.map((step, i) => {
                const on = active === i;
                const Icon = step.icon;
                return (
                  <li key={step.n}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={`relative w-full overflow-hidden rounded-2xl border px-4 py-4 text-left transition-colors sm:px-5 sm:py-5 ${
                        on
                          ? "border-bonero-green/30 bg-white shadow-lg shadow-bonero-green/10"
                          : "border-bonero-dark/8 bg-white/60 hover:border-bonero-dark/15"
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="how-active"
                          className="absolute inset-y-0 left-0 w-1 bg-bonero-green"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <div className="flex items-start gap-3.5">
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                            on
                              ? "bg-bonero-green text-white"
                              : "bg-bonero-dark/[0.04] text-bonero-dark/45"
                          }`}
                        >
                          <Icon size={20} strokeWidth={1.75} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[11px] font-bold tracking-wide ${
                                on ? "text-bonero-green" : "text-bonero-dark/30"
                              }`}
                            >
                              {step.n}
                            </span>
                            <h3
                              className={`font-heading text-lg !font-extrabold tracking-wide sm:text-xl ${
                                on ? "text-bonero-dark" : "text-bonero-dark/50"
                              }`}
                            >
                              {step.title}
                            </h3>
                          </div>
                          <AnimatePresence initial={false}>
                            {on && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35, ease }}
                                className="mt-2 overflow-hidden text-sm leading-relaxed text-bonero-dark/55"
                              >
                                {step.description}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      {on && (
                        <motion.div
                          key={`prog-${active}`}
                          className="absolute right-0 bottom-0 left-0 h-0.5 origin-left bg-bonero-green/70"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: HOLD / 1000, ease: "linear" }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>

            <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-bonero-dark/45">
              <span className="font-medium text-bonero-dark/60">Akış:</span>
              Bağla
              <span className="text-bonero-dark/25">→</span>
              Birleştir
              <span className="text-bonero-dark/25">→</span>
              Yanıtla
              <span className="rounded-full bg-bonero-green/10 px-2.5 py-0.5 text-xs font-semibold text-bonero-green">
                ~15 dk kurulum
              </span>
            </p>
          </div>

          {/* Live stage */}
          <div className="lg:col-span-7">
            <div className="relative h-[340px] overflow-hidden rounded-[1.75rem] border border-bonero-dark/8 bg-[#f3f6f4] shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:h-[400px]">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 50% at 50% 45%, rgba(24,131,71,0.1), transparent 65%)",
                }}
              />

              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 sm:top-5 sm:left-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bonero-green text-white">
                  <StepIcon size={16} strokeWidth={1.75} />
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-sm font-semibold text-bonero-dark"
                  >
                    {current.title}
                  </motion.span>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease }}
                  className="absolute inset-0 pt-12"
                >
                  <Stage active />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
