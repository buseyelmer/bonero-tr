"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  CheckCheck,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";

const channels = [
  {
    id: "wa",
    label: "WhatsApp",
    icon: MessageCircle,
    color: "#128C7E",
    bg: "bg-[#25D366]/15",
    ring: "ring-[#25D366]/35",
    pos: "left-0 top-14 sm:-left-1 sm:top-12",
    delay: 0,
  },
  {
    id: "ig",
    label: "Instagram",
    icon: Camera,
    color: "#C13584",
    bg: "bg-[#E1306C]/12",
    ring: "ring-[#E1306C]/30",
    pos: "right-0 top-10 sm:-right-1 sm:top-8",
    delay: 0.45,
  },
  {
    id: "mail",
    label: "E-posta",
    icon: Mail,
    color: "#475569",
    bg: "bg-bonero-dark/8",
    ring: "ring-bonero-dark/20",
    pos: "left-0 top-[58%] sm:-left-2",
    delay: 0.9,
  },
] as const;

const feed = [
  {
    channelKey: "wa",
    short: "WA",
    badge: "bg-[#25D366]/15 text-[#128C7E]",
    name: "Ayşe Yılmaz",
    preview: "Rezervasyon onayı alabilir miyiz?",
    time: "şimdi",
  },
  {
    channelKey: "ig",
    short: "IG",
    badge: "bg-[#E1306C]/12 text-[#C13584]",
    name: "nova.brand",
    preview: "Story linkini paylaşır mısınız?",
    time: "2 dk",
  },
  {
    channelKey: "mail",
    short: "Mail",
    badge: "bg-bonero-dark/8 text-bonero-dark/55",
    name: "mehmet@atlas.co",
    preview: "Q3 brief ektedir — yorumlarınız?",
    time: "8 dk",
  },
];

const replies = [
  {
    channel: "WhatsApp",
    channelKey: "wa",
    text: "Tabii Ayşe! Onayı hemen işliyorum — tüm kanallarınızı tek panelden görüyorum.",
  },
  {
    channel: "Instagram",
    channelKey: "ig",
    text: "Story linkini DM’den paylaşıyorum, teşekkürler!",
  },
  {
    channel: "E-posta",
    channelKey: "mail",
    text: "Brief’i aldık; yorumlarımızı bugün içinde iletiyoruz.",
  },
];

export default function HeroVisual() {
  const [active, setActive] = useState(0);
  const [sent, setSent] = useState(false);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setTyping(true);
    const typeEnd = setTimeout(() => setTyping(false), 1200);

    const cycle = setInterval(() => {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setActive((i) => (i + 1) % replies.length);
        setTyping(true);
        setTimeout(() => setTyping(false), 1200);
      }, 650);
    }, 4000);

    return () => {
      clearTimeout(typeEnd);
      clearInterval(cycle);
    };
  }, []);

  const activeChannel = replies[active].channelKey;

  return (
    <div
      className="relative mx-auto w-full max-w-[440px] px-3 pt-12 pb-14 sm:max-w-none sm:px-4 sm:pt-14 sm:pb-16"
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute top-[18%] left-1/2 h-[70%] w-[90%] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(24,131,71,0.16), transparent 70%)",
        }}
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />

      {/* Caption */}
      <motion.div
        className="relative z-20 mb-5 flex justify-center"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="rounded-full border border-bonero-dark/10 bg-white/95 px-3.5 py-1.5 text-[11px] font-medium text-bonero-dark/55 shadow-md backdrop-blur-md">
          Dağınık kanallar →{" "}
          <span className="font-semibold text-bonero-green">
            Birleşik Gelen Kutusu
          </span>
        </span>
      </motion.div>

      {/* Channel pills */}
      {channels.map(({ id, label, icon: Icon, bg, ring, pos, delay, color }) => {
        const isLit = activeChannel === id;
        return (
          <motion.div
            key={id}
            className={`absolute z-30 ${pos}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + delay * 0.12, duration: 0.45 }}
          >
            <motion.div
              className={`flex items-center gap-2 rounded-2xl border border-white/90 ${bg} px-2.5 py-2 shadow-lg ring-1 backdrop-blur-md transition-shadow ${ring}`}
              animate={{
                y: [0, -7, 0],
                scale: isLit ? 1.05 : 1,
                boxShadow: isLit
                  ? `0 8px 24px ${color}33`
                  : "0 8px 20px rgba(30,41,59,0.08)",
              }}
              transition={{
                y: {
                  duration: 3.5 + delay * 0.35,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                scale: { duration: 0.35 },
              }}
            >
              <span
                className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm"
                style={{ color }}
              >
                <Icon size={15} strokeWidth={1.75} />
                {isLit && (
                  <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-bonero-green" />
                )}
              </span>
              <span className="pr-0.5 text-[11px] font-semibold text-bonero-dark">
                {label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Flow lines */}
      <svg
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        viewBox="0 0 440 560"
        fill="none"
      >
        <motion.path
          d="M55 105 C130 175 175 230 220 270"
          stroke="#25D366"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          strokeOpacity="0.55"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.65, duration: 1 }}
        />
        <motion.path
          d="M385 85 C300 155 255 220 220 270"
          stroke="#E1306C"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          strokeOpacity="0.45"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        />
        <motion.path
          d="M50 330 C120 310 170 290 220 285"
          stroke="#64748b"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          strokeOpacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.95, duration: 1 }}
        />
      </svg>

      {/* Card stack */}
      <motion.div
        className="relative z-20 mx-auto w-[90%] sm:w-[84%]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-x-1 top-5 -bottom-3 -rotate-[2.5deg] rounded-2xl bg-bonero-dark/[0.045]" />
        <div className="absolute inset-x-0.5 top-2.5 -bottom-1.5 rotate-[1.5deg] rounded-2xl border border-white/60 bg-white/50" />

        <div className="relative overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white shadow-2xl shadow-bonero-dark/15">
          <div className="flex items-center justify-between gap-2 bg-[#111827] px-3.5 py-3 sm:px-4">
            <div className="flex min-w-0 items-center gap-2.5">
              <motion.span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-bonero-green text-xs font-bold text-white"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(24,131,71,0.55)",
                    "0 0 0 9px rgba(24,131,71,0)",
                    "0 0 0 0 rgba(24,131,71,0.55)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                B
              </motion.span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  Bonero · Birleşik Gelen Kutusu
                </p>
                <p className="text-[10px] text-white/45">
                  Çok kanallı · tek operasyon
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green opacity-70" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-bonero-green" />
              </span>
              <span className="text-[10px] font-medium text-bonero-green">
                Canlı
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-b from-white via-white to-[#f8fafc] p-3 sm:p-3.5">
            <div className="mb-2.5 flex items-center justify-between gap-2 px-0.5">
              <p className="text-[10px] font-medium tracking-wide text-bonero-dark/40 uppercase">
                Gelen mesajlar — tüm kanallar
              </p>
              <motion.span
                key={active}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-full bg-bonero-green/10 px-2 py-0.5 text-[10px] font-semibold text-bonero-green"
              >
                +{active + 2} yeni
              </motion.span>
            </div>

            <ul className="space-y-1.5">
              {feed.map((item, i) => {
                const isActive = active === i;
                return (
                  <motion.li
                    key={item.name}
                    animate={{
                      borderColor: isActive
                        ? "rgba(24,131,71,0.5)"
                        : "rgba(30,41,59,0.08)",
                      backgroundColor: isActive ? "#ffffff" : "rgba(248,250,252,0.9)",
                      x: isActive ? 3 : 0,
                    }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-2.5 rounded-xl border px-2.5 py-2"
                    style={{
                      boxShadow: isActive
                        ? "0 4px 14px rgba(24,131,71,0.1)"
                        : "none",
                    }}
                  >
                    <span
                      className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-bold ${item.badge}`}
                    >
                      {item.short}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-xs font-semibold text-bonero-dark">
                          {item.name}
                        </p>
                        <span className="shrink-0 text-[9px] text-bonero-dark/35">
                          {item.time}
                        </span>
                      </div>
                      <p className="truncate text-[11px] text-bonero-dark/50">
                        {item.preview}
                      </p>
                    </div>
                    {isActive && (
                      <motion.span
                        layoutId="hero-active-dot"
                        className="h-2 w-2 shrink-0 rounded-full bg-bonero-green"
                      />
                    )}
                  </motion.li>
                );
              })}
            </ul>

            {/* AI reply */}
            <div className="relative mt-3 overflow-hidden rounded-xl border border-bonero-green/30 bg-[#111827] p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-bonero-green uppercase">
                  <Sparkles size={12} />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={replies[active].channel}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      AI · {replies[active].channel} yanıtı
                    </motion.span>
                  </AnimatePresence>
                </div>
                {typing && (
                  <span className="flex gap-0.5">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1 w-1 rounded-full bg-bonero-green/70"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: d * 0.15,
                        }}
                      />
                    ))}
                  </span>
                )}
              </div>

              <div className="mt-1.5 min-h-[3rem]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={replies[active].text}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: sent ? 0.45 : 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="text-[12px] leading-relaxed text-white/88"
                  >
                    {replies[active].text}
                    {typing && !sent && (
                      <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-bonero-green align-middle" />
                    )}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] text-white/35">
                  {sent ? (
                    <>
                      <CheckCheck size={12} className="text-bonero-green" />
                      Gönderildi
                    </>
                  ) : (
                    "Düzenle veya gönder"
                  )}
                </span>
                <motion.span
                  animate={sent ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                  className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[11px] font-semibold text-white shadow-md ${
                    sent
                      ? "bg-bonero-green/80 shadow-bonero-green/20"
                      : "bg-bonero-green shadow-bonero-green/35"
                  }`}
                >
                  {sent ? "Gönderildi" : "Gönder"}
                  <Send size={12} />
                </motion.span>
              </div>

              <motion.div
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
                animate={{ left: ["-35%", "135%"] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1.8,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <motion.div
        className="absolute top-[46%] right-0 z-30 sm:right-1"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="rounded-2xl border border-white/95 bg-white/95 px-3 py-2.5 shadow-xl backdrop-blur-md"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bonero-green/10 text-bonero-green">
              <Zap size={14} />
            </span>
            <div>
              <p className="font-heading text-lg leading-none text-bonero-dark">
                %40
              </p>
              <p className="text-[10px] text-bonero-dark/45">daha hızlı yanıt</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-3 bottom-2 z-30 sm:right-5 sm:bottom-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15 }}
      >
        <motion.div
          className="rounded-2xl bg-[#111827] px-3.5 py-2.5 shadow-xl"
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 4.4,
            delay: 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <p className="font-heading text-base leading-none text-white">3 → 1</p>
          <p className="mt-0.5 text-[10px] text-white/50">kanal · tek inbox</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
