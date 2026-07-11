"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Check,
  Inbox,
  Mail,
  MessageCircle,
  Reply,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";

/** 0 chaos → 1 merging → 2 unified */
type Phase = 0 | 1 | 2;

const PHASE_MS = [3200, 2400, 3800] as const;

const phaseMeta = [
  {
    badge: "Sorun",
    title: "Üç ayrı uygulama",
    hint: "Instagram, WhatsApp ve e-posta ayrı ayrı.",
  },
  {
    badge: "Bonero",
    title: "Kanallar birleşiyor",
    hint: "Mesajlar tek akışa çekiliyor…",
  },
  {
    badge: "Çözüm",
    title: "Tek panelden yanıt",
    hint: "Hepsi aynı kutuda — ekip buradan cevaplar.",
  },
];

const stepLabels = ["Dağınık", "Birleşir", "Yanıtla"];

type AppPanel = {
  id: string;
  icon: LucideIcon;
  name: string;
  bar: string;
  badge: string;
  msgs: string[];
  color: string;
};

const panels: AppPanel[] = [
  {
    id: "ig",
    icon: Camera,
    name: "Instagram",
    bar: "from-[#E1306C] to-[#F77737]",
    badge: "12",
    msgs: ["Yeni DM · marka onayı", "Yorum · #kampanya"],
    color: "#E1306C",
  },
  {
    id: "wa",
    icon: MessageCircle,
    name: "WhatsApp",
    bar: "from-[#128C7E] to-[#25D366]",
    badge: "5",
    msgs: ["Acil onay bekliyor", "Müşteri · dosya gönderdi"],
    color: "#25D366",
  },
  {
    id: "mail",
    icon: Mail,
    name: "E-posta",
    bar: "from-[#0284C7] to-[#38BDF8]",
    badge: "23",
    msgs: ["CC · revizyon v4", "Konu: Rapor nerede?"],
    color: "#0EA5E9",
  },
];

const inboxRows = [
  { ch: "IG", text: "Yeni DM · marka onayı", tone: "text-pink-500" },
  { ch: "WA", text: "Acil onay bekliyor", tone: "text-emerald-600" },
  { ch: "Mail", text: "CC · revizyon v4", tone: "text-sky-600" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function ChannelCard({ panel }: { panel: AppPanel }) {
  const Icon = panel.icon;
  return (
    <div className="overflow-hidden rounded-xl border border-black/8 bg-white shadow-md">
      <div
        className={`flex items-center gap-1.5 bg-gradient-to-r px-2 py-1.5 ${panel.bar}`}
      >
        <Icon size={11} className="text-white" strokeWidth={2} />
        <span className="truncate text-[10px] font-semibold text-white">
          {panel.name}
        </span>
        <span className="ml-auto rounded-full bg-white/25 px-1.5 py-0.5 text-[8px] font-bold text-white">
          {panel.badge}
        </span>
      </div>
      <ul className="space-y-0.5 p-1.5">
        {panel.msgs.map((msg) => (
          <li
            key={msg}
            className="truncate rounded-md bg-bonero-dark/[0.04] px-1.5 py-1 text-[8px] font-medium text-bonero-dark/65"
          >
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>(0);
  const [inView, setInView] = useState(false);

  const meta = phaseMeta[phase];
  const merging = phase === 1;
  const unified = phase === 2;
  const chaos = phase === 0;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => {
      setPhase((p) => ((p + 1) % 3) as Phase);
    }, PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [inView, phase]);

  return (
    <section
      ref={ref}
      id="sosyal-kanit"
      className="relative overflow-x-clip border-y border-bonero-dark/6 bg-[#eef1ef] py-10 sm:py-14"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            Bonero’yu görün
          </p>
          <h2 className="font-heading mt-2 text-2xl !font-extrabold tracking-wide text-bonero-dark sm:text-3xl lg:text-[2.35rem]">
            Dağınık kanallar
            <span className="mt-0.5 block text-bonero-green">tek panele iner.</span>
          </h2>
        </Reveal>

        {/* Steps + caption */}
        <div className="mx-auto mt-5 max-w-md">
          <div className="flex items-center justify-center gap-2">
            {stepLabels.map((label, i) => {
              const on = phase === i;
              const done = phase > i;
              return (
                <div
                  key={label}
                  className="flex min-w-0 flex-1 flex-col items-center gap-1"
                >
                  <div className="flex w-full items-center gap-1">
                    {i > 0 && (
                      <div
                        className={`h-px flex-1 transition-colors duration-500 ${
                          done || on ? "bg-bonero-green/50" : "bg-bonero-dark/10"
                        }`}
                      />
                    )}
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold transition-all duration-500 ${
                        on
                          ? "scale-110 bg-bonero-green text-white shadow-md shadow-bonero-green/30"
                          : done
                            ? "bg-bonero-green/20 text-bonero-green"
                            : "bg-bonero-dark/8 text-bonero-dark/35"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < 2 && (
                      <div
                        className={`h-px flex-1 transition-colors duration-500 ${
                          done ? "bg-bonero-green/50" : "bg-bonero-dark/10"
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-semibold transition-colors duration-500 ${
                      on ? "text-bonero-dark" : "text-bonero-dark/35"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 min-h-[3.25rem] text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase ${
                    unified
                      ? "bg-bonero-green text-white"
                      : merging
                        ? "bg-bonero-dark text-white"
                        : "border border-amber-500/30 bg-amber-50 text-amber-700"
                  }`}
                >
                  {meta.badge}
                </span>
                <p className="mt-1 text-sm font-semibold text-bonero-dark">
                  {meta.title}
                </p>
                <p className="text-xs text-bonero-dark/50">{meta.hint}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Stage — content always fits inside */}
        <Reveal delay={0.06} className="mt-4">
          <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-bonero-dark/10 shadow-[0_20px_50px_rgba(30,41,59,0.08)] sm:rounded-[1.5rem]">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: unified
                  ? "linear-gradient(145deg, #f4faf6 0%, #ffffff 55%, #eef8f1 100%)"
                  : merging
                    ? "linear-gradient(145deg, #f0f4f1 0%, #ffffff 60%, #e8efe9 100%)"
                    : "linear-gradient(145deg, #f3f0ee 0%, #ebe6e2 50%, #e8e4e0 100%)",
              }}
              transition={{ duration: 0.55 }}
            />

            <div className="relative flex min-h-[240px] items-center justify-center p-4 sm:min-h-[280px] sm:p-6">
              {/* Chaos: 3 cards in a row that fit */}
              <AnimatePresence mode="wait">
                {chaos && (
                  <motion.div
                    key="chaos"
                    className="grid w-full grid-cols-3 gap-2 sm:gap-3"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    {panels.map((panel, i) => (
                      <motion.div
                        key={panel.id}
                        animate={{
                          y: [0, i === 1 ? -4 : 3, 0],
                          rotate: i === 0 ? -2 : i === 2 ? 2 : 0,
                        }}
                        transition={{
                          y: {
                            duration: 2.8 + i * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                      >
                        <ChannelCard panel={panel} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {merging && (
                  <motion.div
                    key="merge"
                    className="flex flex-col items-center gap-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <div className="flex items-end justify-center -space-x-3">
                      {panels.map((panel, i) => {
                        const Icon = panel.icon;
                        return (
                          <motion.div
                            key={panel.id}
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white bg-white shadow-lg sm:h-12 sm:w-12"
                            initial={{ x: (i - 1) * 48, opacity: 0.5, scale: 0.8 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            transition={{
                              delay: i * 0.1,
                              duration: 0.55,
                              ease,
                            }}
                            style={{ zIndex: 3 - i }}
                          >
                            <Icon size={18} style={{ color: panel.color }} strokeWidth={1.75} />
                          </motion.div>
                        );
                      })}
                    </div>
                    <motion.div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bonero-green text-white shadow-lg shadow-bonero-green/35"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.25, type: "spring", stiffness: 220, damping: 18 }}
                    >
                      <Inbox size={24} strokeWidth={1.5} />
                    </motion.div>
                    <p className="text-[11px] font-semibold text-bonero-green">
                      Toplanıyor…
                    </p>
                  </motion.div>
                )}

                {unified && (
                  <motion.div
                    key="inbox"
                    className="w-full max-w-[300px]"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  >
                    <div className="overflow-hidden rounded-2xl border border-bonero-green/25 bg-white shadow-[0_16px_40px_rgba(24,131,71,0.18)]">
                      <div className="flex items-center gap-2 bg-bonero-green px-3 py-2">
                        <Inbox size={14} className="text-white" strokeWidth={1.75} />
                        <span className="text-[11px] font-semibold text-white">
                          Birleşik Gelen Kutusu
                        </span>
                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[9px] font-bold text-white">
                          3
                        </span>
                      </div>
                      <ul className="divide-y divide-bonero-dark/6">
                        {inboxRows.map((row, i) => (
                          <motion.li
                            key={row.text}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.08 }}
                            className="flex items-center gap-2 px-3 py-2"
                          >
                            <span
                              className={`w-7 shrink-0 text-[9px] font-bold ${row.tone}`}
                            >
                              {row.ch}
                            </span>
                            <span className="truncate text-[10px] font-medium text-bonero-dark/70">
                              {row.text}
                            </span>
                            <Check
                              size={11}
                              className="ml-auto shrink-0 text-bonero-green"
                              strokeWidth={2.5}
                            />
                          </motion.li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-center gap-1.5 border-t border-bonero-dark/6 bg-bonero-green/5 px-3 py-1.5 text-[9px] font-semibold text-bonero-green">
                        <Reply size={11} strokeWidth={2} />
                        Üç kanal · tek ekran
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-bonero-dark/5">
              <motion.div
                key={phase}
                className="h-full bg-bonero-green"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: PHASE_MS[phase] / 1000,
                  ease: "linear",
                }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
