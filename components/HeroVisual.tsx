"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  CheckCheck,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useLocale, type Locale } from "./LocaleProvider";

const ease = [0.22, 1, 0.36, 1] as const;
const CYCLE = 4200;

type ChannelId = "wa" | "ig" | "mail";

const channelMeta: {
  id: ChannelId;
  icon: LucideIcon;
  color: string;
  ink: string;
  short: string;
  label: Record<Locale, string>;
}[] = [
  {
    id: "wa",
    icon: MessageCircle,
    color: "#25D366",
    ink: "#128C7E",
    short: "WA",
    label: { tr: "WhatsApp", en: "WhatsApp" },
  },
  {
    id: "ig",
    icon: Camera,
    color: "#E1306C",
    ink: "#C13584",
    short: "IG",
    label: { tr: "Instagram", en: "Instagram" },
  },
  {
    id: "mail",
    icon: Mail,
    color: "#0EA5E9",
    ink: "#0369A1",
    short: "Mail",
    label: { tr: "E-posta", en: "Email" },
  },
];

const feedByLocale: Record<
  Locale,
  { channelKey: ChannelId; name: string; preview: string; time: string }[]
> = {
  tr: [
    {
      channelKey: "wa",
      name: "Ayşe Yılmaz",
      preview: "Rezervasyon onayı alabilir miyiz?",
      time: "şimdi",
    },
    {
      channelKey: "ig",
      name: "nova.brand",
      preview: "Story linkini paylaşır mısınız?",
      time: "2 dk",
    },
    {
      channelKey: "mail",
      name: "mehmet@atlas.co",
      preview: "Q3 brief ektedir — yorumlarınız?",
      time: "8 dk",
    },
  ],
  en: [
    {
      channelKey: "wa",
      name: "Ayse Yilmaz",
      preview: "Can we get reservation confirmation?",
      time: "now",
    },
    {
      channelKey: "ig",
      name: "nova.brand",
      preview: "Could you share the story link?",
      time: "2m",
    },
    {
      channelKey: "mail",
      name: "mehmet@atlas.co",
      preview: "Q3 brief attached — your notes?",
      time: "8m",
    },
  ],
};

const repliesByLocale: Record<
  Locale,
  { channelKey: ChannelId; channel: string; text: string }[]
> = {
  tr: [
    {
      channelKey: "wa",
      channel: "WhatsApp",
      text: "Tabii Ayşe! Onayı hemen işliyorum — tüm kanallar tek panelde.",
    },
    {
      channelKey: "ig",
      channel: "Instagram",
      text: "Story linkini DM’den paylaşıyorum, teşekkürler!",
    },
    {
      channelKey: "mail",
      channel: "E-posta",
      text: "Brief’i aldık; yorumlarımızı bugün içinde iletiyoruz.",
    },
  ],
  en: [
    {
      channelKey: "wa",
      channel: "WhatsApp",
      text: "Of course Ayse! Processing confirmation now — all channels in one panel.",
    },
    {
      channelKey: "ig",
      channel: "Instagram",
      text: "Sharing the story link via DM, thanks!",
    },
    {
      channelKey: "mail",
      channel: "Email",
      text: "Got the brief — sending our notes later today.",
    },
  ],
};

const ui = {
  tr: {
    merge: "3 kanal → 1 inbox",
    title: "Birleşik Gelen Kutusu",
    subtitle: "app.bonero.tr · canlı operasyon",
    live: "Canlı",
    incoming: "Gelen mesajlar",
    newCount: (n: number) => `+${n} yeni`,
    editOrSend: "Düzenle veya gönder",
    sent: "Gönderildi",
    send: "Gönder",
    metricFast: "daha hızlı yanıt",
    metricOne: "Tek panel · tüm kanallar",
    ai: "AI",
  },
  en: {
    merge: "3 channels → 1 inbox",
    title: "Unified Inbox",
    subtitle: "app.bonero.tr · live ops",
    live: "Live",
    incoming: "Incoming messages",
    newCount: (n: number) => `+${n} new`,
    editOrSend: "Edit or send",
    sent: "Sent",
    send: "Send",
    metricFast: "faster replies",
    metricOne: "One panel · all channels",
    ai: "AI",
  },
};

export default function HeroVisual() {
  const { locale } = useLocale();
  const t = ui[locale];
  const feed = feedByLocale[locale];
  const replies = repliesByLocale[locale];

  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<"type" | "ready" | "sent">("type");
  const [typed, setTyped] = useState("");

  const reply = replies[active] ?? replies[0];

  useEffect(() => {
    setActive(0);
  }, [locale]);

  useEffect(() => {
    setPhase("type");
    setTyped("");
    const full = replies[active]?.text ?? "";
    let i = 0;
    const typeTimer = window.setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(typeTimer);
        setPhase("ready");
      }
    }, 22);

    const sentTimer = window.setTimeout(() => setPhase("sent"), 2600);
    const nextTimer = window.setTimeout(() => {
      setActive((n) => (n + 1) % replies.length);
    }, CYCLE);

    return () => {
      clearInterval(typeTimer);
      clearTimeout(sentTimer);
      clearTimeout(nextTimer);
    };
  }, [active, locale, replies]);

  const activeKey = reply.channelKey;
  const chMeta = useMemo(
    () => channelMeta.find((c) => c.id === activeKey)!,
    [activeKey],
  );

  return (
    <div
      className="relative mx-auto w-full max-w-[460px] min-w-0 overflow-x-clip select-none px-1 sm:max-w-none sm:px-0"
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute top-[8%] left-1/2 h-[75%] w-[95%] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(24,131,71,0.18), transparent 68%)",
        }}
      />

      <div className="relative z-20 mb-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-3">
        {channelMeta.map((ch, i) => {
          const Icon = ch.icon;
          const on = activeKey === ch.id;
          return (
            <motion.div
              key={ch.id}
              className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-2 py-1.5 shadow-md backdrop-blur-md sm:gap-2 sm:px-2.5"
              initial={{ opacity: 0, y: -12 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: on ? 1.06 : 1,
                boxShadow: on
                  ? `0 10px 28px ${ch.color}40`
                  : "0 6px 16px rgba(30,41,59,0.08)",
              }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.45, ease }}
            >
              <span
                className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm"
                style={{ color: ch.ink }}
              >
                <Icon size={13} strokeWidth={1.75} />
                {on && (
                  <motion.span
                    layoutId="hero-ch-dot"
                    className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-white bg-bonero-green"
                  />
                )}
              </span>
              <span className="hidden pr-1 text-[11px] font-semibold text-bonero-dark sm:inline">
                {ch.label[locale]}
              </span>
              <span className="pr-0.5 text-[10px] font-bold text-bonero-dark sm:hidden">
                {ch.short}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="relative z-20 mx-auto mb-3 flex w-fit items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-bonero-green/50 sm:w-12" />
        <span className="rounded-full bg-bonero-green/10 px-3 py-1 text-[10px] font-bold tracking-wide text-bonero-green uppercase">
          {t.merge}
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-bonero-green/50 sm:w-12" />
      </motion.div>

      <motion.div
        className="relative z-20"
        initial={{ opacity: 0, y: 28, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease }}
        style={{ transformPerspective: 900 }}
      >
        <div className="absolute inset-x-3 top-4 -bottom-3 rounded-[1.35rem] bg-bonero-dark/[0.06]" />
        <div className="absolute inset-x-1.5 top-2 -bottom-1.5 rounded-[1.35rem] border border-white/70 bg-white/40 backdrop-blur-sm" />

        <div className="relative overflow-hidden rounded-[1.35rem] border border-bonero-dark/10 bg-white shadow-[0_28px_60px_-24px_rgba(30,41,59,0.45)]">
          <div className="flex items-center justify-between gap-3 border-b border-white/5 bg-[#0f1612] px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {t.title}
                </p>
                <p className="text-[10px] text-white/40">{t.subtitle}</p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-bonero-green/15 px-2.5 py-1 text-[10px] font-bold text-bonero-green">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green opacity-70" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-bonero-green" />
              </span>
              {t.live}
            </span>
          </div>

          <div className="bg-gradient-to-b from-[#fbfcfc] to-[#f4f7f5] p-3.5 sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] font-bold tracking-[0.14em] text-bonero-dark/35 uppercase">
                {t.incoming}
              </p>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${locale}-${active}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-full bg-bonero-green px-2 py-0.5 text-[10px] font-bold text-white"
                >
                  {t.newCount(active + 2)}
                </motion.span>
              </AnimatePresence>
            </div>

            <ul className="space-y-2">
              {feed.map((item, i) => {
                const meta = channelMeta.find((c) => c.id === item.channelKey)!;
                const on = active === i;
                return (
                  <motion.li
                    key={`${locale}-${item.name}`}
                    animate={{
                      backgroundColor: on
                        ? "rgba(255,255,255,1)"
                        : "rgba(255,255,255,0.55)",
                      borderColor: on
                        ? "rgba(24,131,71,0.45)"
                        : "rgba(30,41,59,0.06)",
                      x: on ? 4 : 0,
                      scale: on ? 1.01 : 1,
                    }}
                    transition={{ duration: 0.35, ease }}
                    className="flex items-center gap-2.5 rounded-xl border px-2.5 py-2.5 shadow-sm"
                    style={{
                      boxShadow: on
                        ? "0 8px 20px rgba(24,131,71,0.12)"
                        : "0 1px 2px rgba(30,41,59,0.04)",
                    }}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold text-white"
                      style={{ backgroundColor: meta.color }}
                    >
                      {meta.short}
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
                    {on && (
                      <motion.span
                        layoutId="hero-row-glow"
                        className="h-2 w-2 shrink-0 rounded-full bg-bonero-green"
                      />
                    )}
                  </motion.li>
                );
              })}
            </ul>

            <div className="relative mt-3.5 overflow-hidden rounded-xl bg-[#0f1612] p-3.5">
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(24,131,71,0.25), transparent 55%)",
                }}
              />

              <div className="relative flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-bonero-green uppercase">
                  <Sparkles size={12} />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${locale}-${reply.channel}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                    >
                      {t.ai} · {reply.channel}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span
                  className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase"
                  style={{
                    backgroundColor: `${chMeta.color}22`,
                    color: chMeta.color,
                  }}
                >
                  {chMeta.short}
                </span>
              </div>

              <div className="relative mt-2 min-h-[2.75rem]">
                <p
                  className={`text-[12px] leading-relaxed text-white/90 transition-opacity ${
                    phase === "sent" ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {typed}
                  {phase === "type" && (
                    <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-bonero-green align-middle" />
                  )}
                </p>
              </div>

              <div className="relative mt-3 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] text-white/35">
                  {phase === "sent" ? (
                    <>
                      <CheckCheck size={12} className="text-bonero-green" />
                      {t.sent} · {chMeta.label[locale]}
                    </>
                  ) : (
                    t.editOrSend
                  )}
                </span>
                <motion.span
                  animate={
                    phase === "sent" ? { scale: [1, 1.05, 1] } : { scale: 1 }
                  }
                  className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[11px] font-semibold text-white ${
                    phase === "sent"
                      ? "bg-bonero-green/75"
                      : "bg-bonero-green shadow-lg shadow-bonero-green/30"
                  }`}
                >
                  {phase === "sent" ? t.sent : t.send}
                  <Send size={11} />
                </motion.span>
              </div>

              <motion.div
                key={`${locale}-${active}`}
                className="absolute right-0 bottom-0 left-0 h-0.5 origin-left bg-bonero-green"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: CYCLE / 1000, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="relative z-20 mt-4 flex flex-wrap items-center justify-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.45 }}
      >
        <span className="rounded-full border border-bonero-dark/8 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-bonero-dark shadow-sm backdrop-blur-md">
          <span className="text-bonero-green">%40</span> {t.metricFast}
        </span>
        <span className="rounded-full bg-bonero-dark px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm">
          {t.metricOne}
        </span>
      </motion.div>
    </div>
  );
}
