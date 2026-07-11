"use client";

import { useEffect, useState } from "react";
import {
  AtSign,
  Camera,
  Check,
  CheckCheck,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Search,
  Send,
  type LucideIcon,
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

type ChannelDef = {
  Icon: LucideIcon;
  color: string;
  labelTr: string;
  labelEn: string;
};

const channelDefs: ChannelDef[] = [
  {
    Icon: MessageCircle,
    color: "#25D366",
    labelTr: "WhatsApp",
    labelEn: "WhatsApp",
  },
  {
    Icon: Camera,
    color: "#E1306C",
    labelTr: "Instagram",
    labelEn: "Instagram",
  },
  {
    Icon: Mail,
    color: "#0EA5E9",
    labelTr: "E-posta",
    labelEn: "Email",
  },
  {
    Icon: AtSign,
    color: "#F59E0B",
    labelTr: "Web form",
    labelEn: "Web form",
  },
];

type Thread = {
  id: string;
  channel: number;
  name: string;
  preview: string;
  time: string;
  unread: boolean;
};

const threadsTr: Thread[] = [
  {
    id: "1",
    channel: 0,
    name: "Ayşe Yılmaz",
    preview: "Rezervasyon onayı alabilir miyiz?",
    time: "şimdi",
    unread: true,
  },
  {
    id: "2",
    channel: 1,
    name: "nova.brand",
    preview: "Story’deki ürün linkini paylaşır mısınız?",
    time: "2 dk",
    unread: true,
  },
  {
    id: "3",
    channel: 2,
    name: "mehmet@atlas.co",
    preview: "Q3 brief ektedir — yorumlarınızı bekliyoruz.",
    time: "8 dk",
    unread: false,
  },
  {
    id: "4",
    channel: 0,
    name: "Pulse Agency",
    preview: "Müşteri onayı geldi, yayına alabiliriz.",
    time: "14 dk",
    unread: false,
  },
];

const threadsEn: Thread[] = [
  {
    id: "1",
    channel: 0,
    name: "Ayse Yilmaz",
    preview: "Can we get confirmation for our reservation?",
    time: "now",
    unread: true,
  },
  {
    id: "2",
    channel: 1,
    name: "nova.brand",
    preview: "Could you share the product link from the story?",
    time: "2m",
    unread: true,
  },
  {
    id: "3",
    channel: 2,
    name: "mehmet@atlas.co",
    preview: "Q3 brief attached — looking forward to your notes.",
    time: "8m",
    unread: false,
  },
  {
    id: "4",
    channel: 0,
    name: "Pulse Agency",
    preview: "Client approved — we can go live.",
    time: "14m",
    unread: false,
  },
];

const chatTr = [
  { from: "them" as const, text: "Merhaba, rezervasyonumuz için onay alabilir miyiz?" },
  { from: "us" as const, text: "Tabii — müsaitlik kontrol ediyorum, bir saniye." },
  { from: "them" as const, text: "Cumartesi 20:00 için 4 kişilik." },
];

const chatEn = [
  { from: "them" as const, text: "Hi, can we get confirmation for our reservation?" },
  { from: "us" as const, text: "Of course — checking availability, one moment." },
  { from: "them" as const, text: "Saturday 8pm, table for four." },
];

function InboxHeroVisual({ isEn }: { isEn: boolean }) {
  const threads = isEn ? threadsEn : threadsTr;
  const chat = isEn ? chatEn : chatTr;
  const [selected, setSelected] = useState(0);
  const [visibleMsgs, setVisibleMsgs] = useState(1);
  const [arrivePulse, setArrivePulse] = useState(false);

  useEffect(() => {
    const t = window.setInterval(() => {
      setSelected((p) => {
        const next = (p + 1) % threads.length;
        setVisibleMsgs(1);
        setArrivePulse(true);
        window.setTimeout(() => setArrivePulse(false), 600);
        return next;
      });
    }, 4200);
    return () => clearInterval(t);
  }, [threads.length]);

  useEffect(() => {
    if (visibleMsgs >= chat.length) return;
    const t = window.setTimeout(() => setVisibleMsgs((n) => n + 1), 900);
    return () => clearTimeout(t);
  }, [selected, visibleMsgs, chat.length]);

  const active = threads[selected];
  const ch = channelDefs[active.channel];

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <motion.div
        className="pointer-events-none absolute -inset-10 rounded-[2.5rem]"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(37,211,102,0.22), transparent 55%), radial-gradient(ellipse at 85% 30%, rgba(225,48,108,0.16), transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(14,165,233,0.12), transparent 55%)",
        }}
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Incoming channel rivers — ambient, not overlays on the panel */}
      <div
        className="pointer-events-none absolute -top-2 right-4 left-4 flex justify-between sm:right-8 sm:left-8"
        aria-hidden
      >
        {channelDefs.slice(0, 3).map((c, i) => (
          <motion.div
            key={c.labelEn}
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease }}
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-[#0b1220]/90"
              style={{ color: c.color, boxShadow: `0 0 24px -8px ${c.color}` }}
            >
              <c.Icon size={14} />
            </span>
            <motion.span
              className="h-6 w-px origin-top"
              style={{
                background: `linear-gradient(to bottom, ${c.color}, transparent)`,
              }}
              animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.35, 0.8, 0.35] }}
              transition={{
                duration: 2.4,
                delay: i * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#0a1018] shadow-[0_40px_80px_-36px_rgba(0,0,0,0.9)]">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-bonero-green"
                animate={{ opacity: arrivePulse ? [0.6, 0] : 0, scale: arrivePulse ? [1, 2.2] : 1 }}
                transition={{ duration: 0.55 }}
              />
              <span className="relative h-2 w-2 rounded-full bg-bonero-green" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-white/70">
              {isEn ? "Unified Inbox" : "Birleşik Gelen Kutusu"}
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/30">
            app.bonero.tr
          </span>
        </div>

        <div className="grid sm:grid-cols-[0.95fr_1.15fr]">
          {/* Thread list */}
          <div className="border-b border-white/8 sm:border-r sm:border-b-0">
            <div className="flex items-center gap-2 border-b border-white/6 px-3 py-2.5">
              <Search size={12} className="text-white/25" />
              <span className="text-[11px] text-white/25">
                {isEn ? "Search conversations…" : "Konuşma ara…"}
              </span>
            </div>
            <ul className="max-h-[280px] overflow-hidden sm:max-h-none">
              {threads.map((t, i) => {
                const def = channelDefs[t.channel];
                const isActive = i === selected;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(i);
                        setVisibleMsgs(1);
                      }}
                      className={`flex w-full items-start gap-2.5 px-3 py-3 text-left transition-colors ${
                        isActive
                          ? "bg-bonero-green/12"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          background: `${def.color}18`,
                          color: def.color,
                        }}
                      >
                        <def.Icon size={13} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span
                            className={`truncate text-[12px] font-semibold ${
                              t.unread ? "text-white" : "text-white/70"
                            }`}
                          >
                            {t.name}
                          </span>
                          {t.unread && (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-bonero-green" />
                          )}
                          <span className="ml-auto shrink-0 text-[10px] text-white/25">
                            {t.time}
                          </span>
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] text-white/35">
                          {t.preview}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Conversation */}
          <div className="flex min-h-[280px] flex-col">
            <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
              <ch.Icon size={14} style={{ color: ch.color }} />
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-white">
                  {active.name}
                </p>
                <p className="text-[10px] text-white/30">
                  {isEn ? ch.labelEn : ch.labelTr}
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-end gap-2.5 px-4 py-4">
              <AnimatePresence mode="popLayout">
                {chat.slice(0, visibleMsgs).map((m, i) => (
                  <motion.div
                    key={`${selected}-${i}`}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease }}
                    className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-[12px] leading-relaxed sm:text-[13px] ${
                      m.from === "us"
                        ? "ml-auto rounded-br-md bg-bonero-green text-white"
                        : "rounded-bl-md bg-white/[0.06] text-white/75"
                    }`}
                  >
                    {m.text}
                    {m.from === "us" && (
                      <CheckCheck
                        size={11}
                        className="ml-1.5 inline opacity-70"
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 border-t border-white/8 px-3 py-2.5">
              <div className="flex-1 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-[11px] text-white/25">
                {isEn ? "Reply from one place…" : "Tek yerden yanıtla…"}
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bonero-green text-white">
                <Send size={13} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InboxFeaturePage({
  feature,
}: {
  feature: FeaturePageContent;
}) {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const points = isEn ? feature.valuePointsEn : feature.valuePoints;

  return (
    <div className="relative overflow-x-clip bg-[#070b12] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 12% 12%, rgba(37,211,102,0.16), transparent 50%), radial-gradient(ellipse 45% 40% at 88% 8%, rgba(225,48,108,0.12), transparent 48%), radial-gradient(ellipse 50% 45% at 70% 75%, rgba(14,165,233,0.08), transparent 55%), radial-gradient(ellipse 40% 35% at 40% 95%, rgba(24,131,71,0.14), transparent 50%)",
        }}
      />
      <div
        className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light"
        aria-hidden
      />

      {/* Hero — one composition */}
      <section className="relative min-h-[min(100svh,920px)] pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="page-pad relative mx-auto max-w-6xl">
          <FeatureBackLink />

          <div className="mt-8 grid items-center gap-12 lg:mt-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative max-w-xl">
              <div
                className="absolute top-1 bottom-2 left-0 hidden w-[3px] origin-top rounded-full bg-gradient-to-b from-[#25D366] via-bonero-green/50 to-transparent sm:block"
                aria-hidden
              />
              <div className="sm:pl-6">
                <motion.p
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-bonero-green uppercase"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <LayoutDashboard size={13} />
                  {isEn ? feature.eyebrowEn : feature.eyebrow}
                </motion.p>

                <h1 className="font-heading mt-4 text-[2.15rem] !font-extrabold leading-[1.08] tracking-wide sm:text-5xl lg:text-[3rem]">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.65, delay: 0.05, ease }}
                  >
                    {isEn ? "Scattered channels end." : "Dağınık kanallar bitsin."}
                  </motion.span>
                  <motion.span
                    className="mt-1.5 block text-white/40"
                    initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.65, delay: 0.16, ease }}
                  >
                    {isEn ? (
                      <>
                        One{" "}
                        <span className="text-bonero-green">inbox</span> for
                        every lead.
                      </>
                    ) : (
                      <>
                        Her lead için{" "}
                        <span className="text-bonero-green">tek kutu.</span>
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
                      ? "WhatsApp · IG · Mail · Forms"
                      : "WhatsApp · IG · Mail · Form"}
                  </p>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease }}
            >
              <InboxHeroVisual isEn={isEn} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 1 — Value as channel signal rows (not a 3-col grid) */}
      <section className="relative border-t border-white/8">
        <div className="page-pad mx-auto max-w-6xl py-14 sm:py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#25D366]">
            {isEn ? "Signal → action" : "Sinyal → aksiyon"}
          </p>
          <h2 className="mt-2 max-w-lg font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {isEn
              ? "Three reasons the inbox stops leaking."
              : "Gelen kutusu neden sızdırmaz."}
          </h2>
          <div className="mt-10 space-y-3">
            {points.map((p, i) => {
              const colors = ["#25D366", "#E1306C", "#0EA5E9"];
              const c = colors[i % colors.length];
              return (
                <motion.div
                  key={p.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45, ease }}
                >
                  <div
                    className="absolute inset-y-0 left-0 w-1.5"
                    style={{ background: c }}
                    aria-hidden
                  />
                  <div className="flex flex-col gap-3 px-5 py-5 pl-6 sm:flex-row sm:items-center sm:gap-8 sm:px-7 sm:py-6 sm:pl-8">
                    <span
                      className="font-mono text-3xl font-bold tabular-nums sm:w-14"
                      style={{ color: c }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/45">
                        {p.body}
                      </p>
                    </div>
                    <motion.div
                      className="hidden h-2 flex-1 overflow-hidden rounded-full bg-white/10 sm:block sm:max-w-[140px]"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: c }}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${70 + i * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2 — Scenarios as day clock (not cards) */}
      <section className="relative border-t border-white/8 bg-[#08140f]">
        <div className="page-pad mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                {isEn ? "A day in ops" : "Bir operasyon günü"}
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {isEn ? "Same inbox. Different hours." : "Aynı kutu. Farklı saatler."}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/45">
                {isEn ? feature.outcomeEn : feature.outcome}
              </p>
            </div>
            <ol className="relative space-y-0">
              <div
                className="absolute top-3 bottom-3 left-[3.25rem] w-px bg-gradient-to-b from-[#25D366] via-white/15 to-transparent sm:left-[3.75rem]"
                aria-hidden
              />
              {(isEn ? feature.scenariosEn : feature.scenarios).map((s, i) => {
                const times = ["09:12", "14:40", "17:05"];
                return (
                  <motion.li
                    key={s.label}
                    className="relative flex gap-5 pb-10 last:pb-0 sm:gap-6"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease }}
                  >
                    <span className="relative z-10 flex h-10 w-[4.5rem] shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0b1220] font-mono text-xs font-bold text-[#25D366] sm:h-12 sm:w-[5.5rem] sm:text-sm">
                      {times[i]}
                    </span>
                    <div className="pt-1.5 sm:pt-2">
                      <p className="text-sm font-semibold text-white">{s.label}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/45">
                        {s.text}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <FeatureBottomStrip feature={feature} />
    </div>
  );
}
