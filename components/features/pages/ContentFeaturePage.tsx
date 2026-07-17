"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  FileText,
  FolderOpen,
  Camera,
  Layers,
  Mail,
  MessageCircle,
  PenLine,
  Send,
  Sparkles,
  StickyNote,
  Users,
  X,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import ContentMock from "@/components/features/mocks/ContentMock";
import ContentHeroVisual from "@/components/features/ContentHeroVisual";
import { useLocale } from "@/components/LocaleProvider";
import { featureHref } from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;
const STORY_HOLD = 5000;

const copy = {
  tr: {
    back: "Tüm özellikler",
    empathyPersona: "Furkan · Pazarlama sorumlusu",
    empathyQuote:
      "“Çarşamba postu nerede kaldı?” sorusu her hafta tekrarlanıyor — brief Drive’da, taslak Notion’da, onay WhatsApp’ta.",
    heroTitle: "Haftayı",
    heroAccent: "panoda gör.",
    heroLead:
      "Post, story, bülten — hepsi aynı board’da. Kim ne zaman yayınlayacak belli; brief kaybolmaz, son dakika telaşı azalır.",
    heroCtaPrimary: "Pano aç",
    heroCtaSecondary: "Akışı gör",
    heroLive: "Haftalık pano canlı",
    heroNote: "Furkan · pazarlama",
    heroStats: [
      { label: "Bu hafta", value: "4" },
      { label: "İncelemede", value: "1" },
      { label: "Planlı", value: "2" },
    ],
    pipelineTitle: "Brief’ten yayına",
    pipelineLead: "Tek içerik kartı dört adımdan geçer — durum panoda herkes için görünür.",
    pipelineOwner: "Sahip · Furkan",
    pipelineCardTitle: "Bahar kampanya carousel",
    pipelineCardChannel: "Instagram · Carousel",
    pipeline: [
      {
        icon: FileText,
        label: "Brief",
        body: "Hedef, ton ve görsel notu aynı karta yazılır.",
        detail: "Furkan brief’i panoya düşürür — Drive klasörü yok, herkes aynı notu görür.",
        badge: "Not eklendi",
      },
      {
        icon: PenLine,
        label: "Taslak",
        body: "Metin ve slaytlar kartın üzerinde yazılır.",
        detail: "Editör taslağı günceller; eski sürüm kaybolmaz, kartta kalır.",
        badge: "v2 taslak",
      },
      {
        icon: Users,
        label: "Onay",
        body: "Yönetici onaylar veya not düşer.",
        detail: "Bekleyen onay panoda parlar — WhatsApp’ta aranmaz.",
        badge: "Onay bekliyor",
      },
      {
        icon: Send,
        label: "Yayın",
        body: "Saat kilitlenir; hatırlatma düşer.",
        detail: "Çarşamba 14:00 — kanal, metin ve görsel tek tık uzağa.",
        badge: "Çar 14:00",
      },
    ],
    storyTitle: "Furkan’ın salı günü",
    storyLead: "Tek pano — sabah plan, öğlen onay, akşam yayın hazır.",
    storyPersona: "Furkan",
    storyRole: "Pazarlama · içerik sahibi",
    storyDayLabel: "Salı",
    storyStats: [
      { label: "Planlanan", value: "4" },
      { label: "İncelemede", value: "1" },
      { label: "Bugün", value: "2" },
    ],
    stories: [
      {
        time: "09:30",
        title: "Board açılır",
        body: "Salı sabahı Furkan board’u açar — çarşamba slotları boş; üç post ve bülten planlanır.",
      },
      {
        time: "11:00",
        title: "Taslak gelir",
        body: "Reel taslağı “İncelemede” sütununa düşer; Furkan bildirim alır.",
      },
      {
        time: "14:20",
        title: "Onay + plan",
        body: "Carousel onaylanır, çarşamba 14:00’e kilitlenir — kopya tekrar yazılmaz.",
      },
      {
        time: "Çar 14:00",
        title: "Yayın anı",
        body: "Hatırlatma düşer; kanal, metin ve görsel tek tık uzağa.",
      },
    ],
    chaosTitle: "Dağınık üretim",
    chaosLead: "Aynı iş üç araçta parçalanır — kimde ne olduğu belli değildir.",
    chaosItems: [
      { place: "Drive", text: "Brief bir klasörde, görsel başka yerde" },
      { place: "WhatsApp", text: "Onay sohbette kayboluyor" },
      { place: "Son dakika", text: "Yayın saati gelince panik kopyala-yapıştır" },
    ],
    boardTitle: "Bonero panosu",
    boardLead: "Takvim, durum ve kanal aynı kayıtta — ekip aynı ekranda.",
    channelsTitle: "Tek kayıt, üç kanal",
    channelsLead:
      "Kampanyayı bir kez yazın. Instagram postu, story ve e-posta aynı kayıttan türer — metin üç kez kopyalanmaz.",
    channelMaster: "Bahar kampanyası",
    channelMasterSub: "Ana kayıt · brief + metin + görseller",
    channelShared: "Ortak mesaj",
    channelSharedCopy: "Bahar fırsatları başladı — randevunu şimdi al.",
    channels: [
      {
        icon: Camera,
        label: "Instagram",
        format: "Carousel · 4 slide",
        preview: "Slide 1: Bahar fırsatları…",
      },
      {
        icon: Sparkles,
        label: "Story",
        format: "15 sn · CTA",
        preview: "Swipe up · Randevu al",
      },
      {
        icon: Mail,
        label: "E-posta",
        format: "Konu + gövde",
        preview: "Konu: Bahar fırsatları sizi bekliyor",
      },
    ],
    relatedTitle: "İçerikle birlikte",
    related: [
      {
        href: featureHref("isbirligi"),
        label: "İşbirliği",
        body: "Onay hattı panodaki taslaklara bağlanır.",
      },
      {
        href: featureHref("ai-reklam"),
        label: "AI Reklam",
        body: "Kampanya kreatifi brief’ten varyasyona akar.",
      },
    ],
    ctaEyebrow: "Yayın ritmi",
    ctaTitle: "Planlandı. Zamanında çıktı.",
    ctaBody: "Haftayı bir kez kurun — ekip aynı board’da ilerlesin.",
    ctaPrimary: "Yayına başla",
    ctaSecondary: "Paketlere bak",
    ctaBullets: [
      "Haftalık içerik takvimi",
      "Brief → onay → yayın akışı",
      "Kanal başına tekrar yazım yok",
    ],
  },
  en: {
    back: "All features",
    empathyPersona: "Furkan · Marketing lead",
    empathyQuote:
      "“Where’s the Wednesday post?” repeats every week — brief in Drive, draft in Notion, approval in WhatsApp.",
    heroTitle: "See the week",
    heroAccent: "on the board.",
    heroLead:
      "Posts, stories, newsletters — one board. Who publishes what and when is clear; briefs don’t vanish, last-minute scrambles fade.",
    heroCtaPrimary: "Open board",
    heroCtaSecondary: "See the flow",
    heroLive: "Weekly board live",
    heroNote: "Furkan · marketing",
    heroStats: [
      { label: "This week", value: "4" },
      { label: "In review", value: "1" },
      { label: "Scheduled", value: "2" },
    ],
    pipelineTitle: "Brief to live",
    pipelineLead: "One content card moves through four steps — status is visible to everyone on the board.",
    pipelineOwner: "Owner · Furkan",
    pipelineCardTitle: "Spring campaign carousel",
    pipelineCardChannel: "Instagram · Carousel",
    pipeline: [
      {
        icon: FileText,
        label: "Brief",
        body: "Goal, tone, and asset notes live on one card.",
        detail: "Furkan drops the brief on the board — no Drive folder, everyone sees the same note.",
        badge: "Note added",
      },
      {
        icon: PenLine,
        label: "Draft",
        body: "Copy and slides are written on the card.",
        detail: "Editor updates the draft; older versions stay on the card.",
        badge: "v2 draft",
      },
      {
        icon: Users,
        label: "Approve",
        body: "Manager signs off or leaves a note.",
        detail: "Pending approval glows on the board — no digging through WhatsApp.",
        badge: "Awaiting approval",
      },
      {
        icon: Send,
        label: "Publish",
        body: "Time is locked; reminder fires.",
        detail: "Wed 14:00 — channel, copy, and creative one tap away.",
        badge: "Wed 14:00",
      },
    ],
    storyTitle: "Furkan’s Tuesday",
    storyLead: "One board — morning plan, midday approval, publish ready by evening.",
    storyPersona: "Furkan",
    storyRole: "Marketing · content owner",
    storyDayLabel: "Tuesday",
    storyStats: [
      { label: "Planned", value: "4" },
      { label: "In review", value: "1" },
      { label: "Today", value: "2" },
    ],
    stories: [
      {
        time: "09:30",
        title: "Board opens",
        body: "Tuesday morning Furkan opens the board — Wednesday slots are empty; three posts and a newsletter get planned.",
      },
      {
        time: "11:00",
        title: "Draft lands",
        body: "Reel draft moves to “In review”; Furkan gets the notification.",
      },
      {
        time: "14:20",
        title: "Approve + schedule",
        body: "Carousel approved, locked to Wed 14:00 — no rewriting copy.",
      },
      {
        time: "Wed 14:00",
        title: "Go live",
        body: "Reminder drops; channel, copy, and creative one tap away.",
      },
    ],
    chaosTitle: "Scattered production",
    chaosLead: "The same job is split across three tools — nobody knows who has what.",
    chaosItems: [
      { place: "Drive", text: "Brief in one folder, creative somewhere else" },
      { place: "WhatsApp", text: "Approval lost in chat" },
      { place: "Last minute", text: "Go-live panic copy-paste" },
    ],
    boardTitle: "Bonero board",
    boardLead: "Calendar, status, and channel in one record — team on one screen.",
    channelsTitle: "One record, three channels",
    channelsLead:
      "Write the campaign once. Instagram post, story, and email grow from the same record — copy isn’t rewritten three times.",
    channelMaster: "Spring campaign",
    channelMasterSub: "Master record · brief + copy + assets",
    channelShared: "Shared message",
    channelSharedCopy: "Spring offers are live — book your appointment now.",
    channels: [
      {
        icon: Camera,
        label: "Instagram",
        format: "Carousel · 4 slides",
        preview: "Slide 1: Spring offers…",
      },
      {
        icon: Sparkles,
        label: "Story",
        format: "15s · CTA",
        preview: "Swipe up · Book now",
      },
      {
        icon: Mail,
        label: "Email",
        format: "Subject + body",
        preview: "Subject: Spring offers are waiting",
      },
    ],
    relatedTitle: "Works well with",
    related: [
      {
        href: featureHref("isbirligi"),
        label: "Collaboration",
        body: "Approval rail connects to drafts on the board.",
      },
      {
        href: featureHref("ai-reklam"),
        label: "AI Ads",
        body: "Campaign creative flows from brief to variation.",
      },
    ],
    ctaEyebrow: "Publish rhythm",
    ctaTitle: "Planned. Shipped on time.",
    ctaBody: "Set the week once — the team moves on one board.",
    ctaPrimary: "Start publishing",
    ctaSecondary: "View plans",
    ctaBullets: [
      "Weekly content calendar",
      "Brief → approve → publish flow",
      "No rewriting per channel",
    ],
  },
};

function StoryTimeline({
  title,
  lead,
  persona,
  role,
  dayLabel,
  stats = [],
  items = [],
}: {
  title: string;
  lead: string;
  persona: string;
  role: string;
  dayLabel: string;
  stats?: { label: string; value: string }[];
  items?: { time: string; title: string; body: string }[];
}) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || items.length === 0) return;
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % items.length);
    }, STORY_HOLD);
    return () => clearInterval(id);
  }, [inView, paused, items.length, active]);

  return (
    <section className="border-y border-bonero-dark/6 bg-[#f4f6f5] py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-xl">
          <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-bonero-dark/55 sm:text-base">{lead}</p>
        </Reveal>

        <div
          ref={ref}
          className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="rounded-2xl border border-bonero-dark/8 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3 border-b border-bonero-dark/8 pb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bonero-green text-sm font-bold text-white">
                F
              </span>
              <div>
                <p className="font-heading text-lg text-bonero-dark">{persona}</p>
                <p className="text-xs text-bonero-dark/45">{role}</p>
              </div>
              <span className="ml-auto rounded-full bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold text-violet-700">
                {dayLabel}
              </span>
            </div>

            <div className="relative mt-5 space-y-0">
              <div className="absolute top-2 bottom-2 left-[0.65rem] w-px bg-bonero-dark/10" />
              {items.map((item, i) => (
                <button
                  key={item.time}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative flex w-full items-start gap-3 py-3 text-left transition-all duration-300 ${
                    active === i ? "opacity-100" : "opacity-45 hover:opacity-75"
                  }`}
                >
                  <span
                    className={`relative z-10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                      active === i
                        ? "border-bonero-green bg-bonero-green"
                        : i < active
                          ? "border-bonero-green/40 bg-bonero-green/15"
                          : "border-bonero-dark/15 bg-white"
                    }`}
                  >
                    {active === i && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    {i < active && <Check size={10} className="text-bonero-green" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span
                      className={`font-mono text-[10px] font-bold transition-colors ${
                        active === i ? "text-bonero-green" : "text-bonero-dark/35"
                      }`}
                    >
                      {item.time}
                    </span>
                    <p
                      className={`text-sm font-semibold transition-colors ${
                        active === i ? "text-bonero-dark" : "text-bonero-dark/50"
                      }`}
                    >
                      {item.title}
                    </p>
                    {active === i && (
                      <motion.div
                        className="mt-2 h-0.5 origin-left rounded-full bg-bonero-green/70"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: paused ? 0 : 1 }}
                        transition={{ duration: paused ? 0.2 : STORY_HOLD / 1000, ease: "linear" }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white p-6 sm:p-8">
              {!paused && (
                <motion.div
                  key={`bar-${active}`}
                  className="absolute bottom-0 left-0 h-0.5 bg-bonero-green"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: STORY_HOLD / 1000, ease: "linear" }}
                />
              )}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <span className="font-mono text-sm font-bold text-violet-600">
                    {items[active]?.time}
                  </span>
                  <h3 className="font-heading mt-2 text-xl text-bonero-dark sm:text-2xl">
                    {items[active]?.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
                    {items[active]?.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, ease }}
                  className="rounded-xl border border-bonero-dark/8 bg-white px-3 py-2.5 text-center"
                >
                  <p className="font-heading text-lg text-bonero-green">{stat.value}</p>
                  <p className="text-[10px] text-bonero-dark/45">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PipelineSection({
  title,
  lead,
  steps,
  owner,
  cardTitle,
  cardChannel,
  isEn,
}: {
  title: string;
  lead: string;
  steps: {
    icon: typeof FileText;
    label: string;
    body: string;
    detail: string;
    badge: string;
  }[];
  owner: string;
  cardTitle: string;
  cardChannel: string;
  isEn: boolean;
}) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActiveStep((p) => (p + 1) % steps.length), 3800);
    return () => clearInterval(id);
  }, [steps.length]);

  const step = steps[activeStep];
  const Icon = step.icon;

  return (
    <section id="akis" className="scroll-mt-24 border-y border-bonero-dark/6 bg-[#f4f6f5] py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-bonero-dark/55 sm:text-base">{lead}</p>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.15fr] lg:gap-8">
          {/* Sol: adım listesi */}
          <Reveal>
            <div className="space-y-2">
              {steps.map((s, i) => {
                const StepIcon = s.icon;
                const isActive = activeStep === i;
                const isDone = i < activeStep;
                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all ${
                      isActive
                        ? "border-bonero-green/30 bg-white shadow-md shadow-bonero-green/10"
                        : "border-bonero-dark/8 bg-white/60 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        isActive
                          ? "bg-bonero-green text-white"
                          : isDone
                            ? "bg-bonero-green/15 text-bonero-green"
                            : "bg-bonero-dark/5 text-bonero-dark/40"
                      }`}
                    >
                      {isDone && !isActive ? <Check size={16} /> : <StepIcon size={16} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-bonero-dark/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm font-bold text-bonero-dark">{s.label}</p>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-bonero-dark/50">{s.body}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Sağ: aktif kart sahnesi */}
          <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-bonero-dark/8 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-700">
                    <Icon size={16} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold tracking-wide text-bonero-dark/35 uppercase">
                      {step.label}
                    </p>
                    <p className="text-xs font-semibold text-bonero-green">{owner}</p>
                  </div>
                </div>
                <motion.span
                  key={step.badge}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    activeStep === 2
                      ? "bg-violet-500/12 text-violet-700"
                      : activeStep === 3
                        ? "bg-bonero-green/15 text-bonero-green"
                        : "bg-bonero-dark/6 text-bonero-dark/55"
                  }`}
                >
                  {step.badge}
                </motion.span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease }}
                >
                  <div className="rounded-2xl border border-bonero-dark/8 bg-[#f8faf9] p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-bonero-green/30 via-violet-400/20 to-bonero-dark/10 sm:h-[4.5rem] sm:w-16">
                        <div className="flex h-full items-end justify-center pb-2">
                          <Camera size={18} className="text-bonero-dark/25" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-bonero-dark sm:text-base">{cardTitle}</p>
                        <p className="mt-0.5 text-[11px] text-bonero-dark/45">{cardChannel}</p>
                        <p className="mt-3 text-sm leading-relaxed text-bonero-dark/60">{step.detail}</p>
                      </div>
                    </div>

                    {/* Adıma özel alt içerik */}
                    <div className="mt-4 border-t border-bonero-dark/6 pt-4">
                      {activeStep === 0 && (
                        <ul className="space-y-2">
                          {(isEn
                            ? ["Goal: more bookings", "Tone: warm, clear CTA", "Asset: 4 slides"]
                            : ["Hedef: randevu artışı", "Ton: sıcak, net CTA", "Görsel: 4 slide"]
                          ).map((line) => (
                            <li
                              key={line}
                              className="flex items-center gap-2 text-xs text-bonero-dark/55"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                              {line}
                            </li>
                          ))}
                        </ul>
                      )}
                      {activeStep === 1 && (
                        <div className="rounded-xl border border-bonero-dark/8 bg-white px-3 py-2.5 text-xs leading-relaxed text-bonero-dark/60">
                          {isEn
                            ? "“Spring offers are live — book your appointment now.” · Slides 2–4 in progress…"
                            : "“Bahar fırsatları başladı — randevunu şimdi al.” · Slide 2–4 hazırlanıyor…"}
                        </div>
                      )}
                      {activeStep === 2 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-lg bg-violet-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-violet-700">
                            {isEn ? "Manager reviewing" : "Yönetici incelemede"}
                          </span>
                          <span className="text-[11px] text-bonero-dark/40">
                            {isEn ? "Note: enlarge CTA" : "Not: CTA’yı büyüt"}
                          </span>
                        </div>
                      )}
                      {activeStep === 3 && (
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bonero-green/15 text-bonero-green">
                            <Clock size={16} />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-bonero-dark">
                              {isEn ? "Wednesday 14:00" : "Çarşamba 14:00"}
                            </p>
                            <p className="text-[11px] text-bonero-dark/45">
                              {isEn
                                ? "Reminder set · channel ready"
                                : "Hatırlatma planlandı · kanal hazır"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* İlerleme çubuğu */}
                  <div className="mt-5 flex gap-1.5">
                    {steps.map((s, i) => (
                      <div
                        key={s.label}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i <= activeStep ? "bg-bonero-green" : "bg-bonero-dark/10"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ChannelMasterCard({
  title,
  sub,
  sharedLabel,
  sharedCopy,
  tags,
  branchLabel,
  syncLabel,
}: {
  title: string;
  sub: string;
  sharedLabel: string;
  sharedCopy: string;
  tags: string[];
  branchLabel: string;
  syncLabel: string;
}) {
  const [activeTag, setActiveTag] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActiveTag((p) => (p + 1) % tags.length), 1800);
    return () => clearInterval(id);
  }, [tags.length]);

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border-2 border-violet-500/25 bg-gradient-to-b from-violet-50/80 to-white p-5 sm:p-6">
      {/* Soft pulse ring */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[1.5rem] border-2 border-violet-400/40"
        animate={{ opacity: [0.15, 0.55, 0.15], scale: [1, 1.01, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Floating orbs */}
      <motion.span
        className="pointer-events-none absolute top-6 right-6 h-16 w-16 rounded-full bg-violet-400/15 blur-2xl"
        animate={{ y: [0, -8, 0], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.span
        className="pointer-events-none absolute bottom-16 left-4 h-12 w-12 rounded-full bg-bonero-green/15 blur-xl"
        animate={{ y: [0, 6, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        aria-hidden
      />

      <div className="relative flex items-center gap-2">
        <motion.span
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-violet-700"
          animate={{ rotate: [0, -6, 6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Layers size={18} />
        </motion.span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-bonero-dark">{title}</p>
          <p className="text-[11px] text-bonero-dark/45">{sub}</p>
        </div>
        <motion.span
          className="hidden items-center gap-1.5 rounded-full border border-bonero-green/20 bg-bonero-green/[0.06] px-2 py-1 text-[9px] font-bold text-bonero-green sm:inline-flex"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green/50" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-bonero-green" />
          </span>
          Live
        </motion.span>
      </div>

      <div className="relative mt-5 flex-1 overflow-hidden rounded-xl border border-bonero-dark/8 bg-white p-4">
        {/* Scan line */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
          animate={{ top: ["8%", "92%", "8%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />

        <p className="text-[10px] font-bold tracking-wide text-violet-700/70 uppercase">
          {sharedLabel}
        </p>
        <motion.p
          className="mt-2 text-sm font-semibold leading-relaxed text-bonero-dark"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          “{sharedCopy}”
        </motion.p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              animate={
                activeTag === i
                  ? {
                      backgroundColor: "rgba(139,92,246,0.14)",
                      color: "rgb(109,40,217)",
                      scale: 1.05,
                    }
                  : {
                      backgroundColor: "rgba(30,41,59,0.04)",
                      color: "rgba(30,41,59,0.5)",
                      scale: 1,
                    }
              }
              transition={{ duration: 0.35 }}
              className="rounded-md px-2 py-1 text-[10px] font-semibold"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Flow dots toward channels */}
        <div className="relative mt-5 h-8 overflow-hidden rounded-lg bg-bonero-dark/[0.03]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.55)]"
              initial={{ left: "-5%", opacity: 0 }}
              animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.55,
                ease: "easeInOut",
              }}
            />
          ))}
          <p className="relative z-10 flex h-full items-center justify-center text-[9px] font-semibold tracking-wide text-bonero-dark/35 uppercase">
            {syncLabel}
          </p>
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-center gap-2">
        {/* Mobil: alt alta → aşağı ok | Masaüstü: yan yana → sağ ok */}
        <motion.span
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-base font-bold text-bonero-green lg:hidden"
          aria-hidden
        >
          ↓
        </motion.span>
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden text-base font-bold text-bonero-green lg:inline"
          aria-hidden
        >
          →
        </motion.span>
        <p className="text-[11px] font-semibold text-bonero-dark/45">{branchLabel}</p>
      </div>
    </div>
  );
}

function HeroHeadline({ title, accent }: { title: string; accent: string }) {
  return (
    <h1 className="font-heading text-[1.85rem] tracking-wide text-white sm:text-3xl lg:text-[2.35rem] lg:leading-[1.1]">
      <motion.span
        className="relative inline"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        {title}{" "}
      </motion.span>
      <motion.span
        className="relative inline overflow-hidden text-bonero-green"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease }}
      >
        {accent}
        <motion.span
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 1.4, delay: 0.55, ease: "easeInOut" }}
          aria-hidden
        />
      </motion.span>
    </h1>
  );
}

export default function ContentFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const t = copy[locale];

  return (
    <div className="bg-background">
      {/* 1 — Hero: tam sahne, animasyonlu haftalık pano */}
      <section className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden border-b border-white/5 bg-[#1a1625] pt-28 text-white sm:pt-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 80% 35%, rgba(139,92,246,0.22), transparent 55%), radial-gradient(ellipse 45% 40% at 15% 75%, rgba(24,131,71,0.16), transparent 50%), radial-gradient(ellipse 30% 25% at 50% 0%, rgba(255,255,255,0.04), transparent 50%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -right-16 top-1/4 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl"
          animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-bonero-green/15 blur-3xl"
          animate={{ opacity: [0.25, 0.5, 0.25], x: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          aria-hidden
        />
        {/* Floating dust dots */}
        {[
          { top: "18%", left: "12%", delay: 0 },
          { top: "42%", left: "88%", delay: 0.6 },
          { top: "70%", left: "22%", delay: 1.2 },
          { top: "28%", left: "62%", delay: 0.3 },
        ].map((d, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute h-1 w-1 rounded-full bg-white/30"
            style={{ top: d.top, left: d.left }}
            animate={{ opacity: [0.15, 0.7, 0.15], y: [0, -10, 0] }}
            transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: d.delay }}
            aria-hidden
          />
        ))}

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <Link
              href="/features"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white/70"
            >
              <ArrowLeft size={14} />
              {t.back}
            </Link>
          </motion.div>

          <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-[0.82fr_1.28fr] lg:gap-10">
            {/* Sol — daha kompakt, daha az dikey yığın */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-white/5 px-2.5 py-1 text-[10px] font-bold tracking-[0.1em] text-violet-200/90 uppercase">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green/50" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-bonero-green" />
                  </span>
                  {t.empathyPersona}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-bonero-green/20 bg-bonero-green/10 px-2.5 py-1 text-[10px] font-semibold text-bonero-green">
                  {t.heroLive}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06, ease }}
                className="mt-5"
              >
                <HeroHeadline title={t.heroTitle} accent={t.heroAccent} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.14, ease }}
                className="mt-3 max-w-md text-sm leading-relaxed text-white/55 sm:text-[15px]"
              >
                {t.heroLead}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease }}
                className="mt-3 max-w-md border-l border-white/15 pl-3 text-xs leading-snug text-white/40"
              >
                {t.empathyQuote}
              </motion.p>

              {/* Stats + CTA aynı bantta */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.28, ease }}
                className="mt-6 flex flex-col gap-4"
              >
                <div className="flex flex-wrap gap-2">
                  {t.heroStats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.32 + i * 0.05, ease }}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5"
                    >
                      <span className="font-heading text-base text-bonero-green">{s.value}</span>
                      <span className="ml-1.5 text-[10px] text-white/40">{s.label}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <CtaButton
                    href={PANEL_REGISTER_URL}
                    variant="primary"
                    size="md"
                    icon={<ArrowUpRight size={15} />}
                  >
                    {t.heroCtaPrimary}
                  </CtaButton>
                  <a
                    href="#akis"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10"
                  >
                    {t.heroCtaSecondary}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Sağ — daha yüksek pano */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.12, ease }}
              className="relative flex min-h-[22rem] sm:min-h-[26rem]"
            >
              <motion.div
                className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-bonero-green/25 via-violet-500/20 to-transparent blur-md"
                animate={{ opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              <ContentHeroVisual onDark />
            </motion.div>
          </div>
        </div>
      </section>

      <PipelineSection
        title={t.pipelineTitle}
        lead={t.pipelineLead}
        steps={t.pipeline}
        owner={t.pipelineOwner}
        cardTitle={t.pipelineCardTitle}
        cardChannel={t.pipelineCardChannel}
        isEn={isEn}
      />

      <StoryTimeline
        title={t.storyTitle}
        lead={t.storyLead}
        persona={t.storyPersona}
        role={t.storyRole}
        dayLabel={t.storyDayLabel}
        stats={t.storyStats ?? []}
        items={t.stories ?? []}
      />

      {/* 5 — Tek kayıt → üç kanal */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.channelsTitle}
            </h2>
            <p className="mt-2 text-sm text-bonero-dark/55 sm:text-base">{t.channelsLead}</p>
          </Reveal>

          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.2fr] lg:gap-8">
            <Reveal>
              <ChannelMasterCard
                title={t.channelMaster}
                sub={t.channelMasterSub}
                sharedLabel={t.channelShared}
                sharedCopy={t.channelSharedCopy}
                tags={["Brief", isEn ? "Copy" : "Metin", isEn ? "Assets" : "Görseller"]}
                branchLabel={
                  isEn ? "branches into three channel formats" : "üç kanal formatına ayrılır"
                }
                syncLabel={isEn ? "Syncing to channels" : "Kanallara aktarılıyor"}
              />
            </Reveal>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {t.channels.map((ch, i) => {
                const Icon = ch.icon;
                return (
                  <Reveal key={ch.label} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="flex h-full flex-col overflow-hidden rounded-xl border border-bonero-dark/8 bg-white shadow-sm sm:rounded-2xl"
                    >
                      {/* Mini kanal önizleme — mobilde kısa, sm+ daha uzun */}
                      <div
                        className={`relative flex h-[5.5rem] items-end p-2 sm:h-auto sm:aspect-[4/5] sm:p-3 ${
                          i === 0
                            ? "bg-gradient-to-br from-[#1a1625] to-[#2a2438]"
                            : i === 1
                              ? "bg-gradient-to-b from-bonero-green/80 to-[#1a1625]"
                              : "bg-[#f0f2f1]"
                        }`}
                      >
                        {i === 2 ? (
                          <div className="w-full rounded-md border border-bonero-dark/8 bg-white p-1.5 shadow-sm sm:rounded-lg sm:p-2.5">
                            <p className="text-[7px] font-bold text-bonero-dark/40 uppercase sm:text-[9px]">
                              {isEn ? "Inbox" : "Gelen kutusu"}
                            </p>
                            <p className="mt-0.5 line-clamp-2 text-[8px] font-semibold leading-snug text-bonero-dark sm:mt-1 sm:text-[11px]">
                              {ch.preview}
                            </p>
                          </div>
                        ) : (
                          <div className="w-full">
                            <div className="mb-1 flex items-center gap-1 sm:mb-2 sm:gap-1.5">
                              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/20 text-[6px] font-bold text-white sm:h-5 sm:w-5 sm:text-[8px]">
                                B
                              </span>
                              <span className="text-[7px] font-semibold text-white/70 sm:text-[9px]">
                                Bonero
                              </span>
                            </div>
                            <p className="line-clamp-2 text-[8px] font-semibold leading-snug text-white sm:text-[11px]">
                              {ch.preview}
                            </p>
                            {i === 1 && (
                              <span className="mt-1 inline-block rounded-full bg-white px-1.5 py-0.5 text-[7px] font-bold text-bonero-dark sm:mt-2 sm:px-2.5 sm:py-1 sm:text-[9px]">
                                {isEn ? "Book now" : "Randevu al"}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="border-t border-bonero-dark/6 p-2 sm:p-3.5">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Icon size={12} className="shrink-0 text-bonero-green" />
                          <p className="truncate text-[10px] font-bold text-bonero-dark sm:text-sm">
                            {ch.label}
                          </p>
                        </div>
                        <p className="mt-0.5 truncate text-[8px] text-bonero-dark/45 sm:mt-1 sm:text-[11px]">
                          {ch.format}
                        </p>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Dağınık vs pano */}
      <section className="border-t border-bonero-dark/6 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-dashed border-bonero-dark/20 bg-[#f4f6f5] p-5 sm:p-6">
                <p className="text-xs font-bold tracking-wide text-bonero-dark/40 uppercase">
                  {t.chaosTitle}
                </p>
                <p className="mt-2 text-sm text-bonero-dark/50">{t.chaosLead}</p>

                {/* Dağınık araçlar görseli */}
                <div className="relative mt-5 min-h-[11rem] flex-1 overflow-hidden rounded-xl border border-bonero-dark/8 bg-white/70 p-4">
                  <motion.div
                    className="absolute top-3 left-3 w-[42%] rounded-lg border border-bonero-dark/10 bg-[#eef1ef] p-2.5 shadow-sm"
                    animate={{ rotate: [-1.5, 1, -1.5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-1.5 text-bonero-dark/40">
                      <FolderOpen size={12} />
                      <span className="text-[9px] font-bold">Drive</span>
                    </div>
                    <p className="mt-1.5 text-[10px] font-semibold text-bonero-dark/55">
                      brief_v3_final.docx
                    </p>
                  </motion.div>
                  <motion.div
                    className="absolute top-8 right-3 w-[48%] rounded-lg border border-bonero-dark/10 bg-[#dcf8c6]/60 p-2.5 shadow-sm"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-1.5 text-bonero-dark/40">
                      <MessageCircle size={12} />
                      <span className="text-[9px] font-bold">WhatsApp</span>
                    </div>
                    <p className="mt-1.5 text-[10px] text-bonero-dark/55">
                      {isEn ? "ok for Wed?" : "çarşamba olur mu?"}
                    </p>
                  </motion.div>
                  <motion.div
                    className="absolute bottom-3 left-[18%] w-[55%] -rotate-2 rounded-lg border border-amber-500/20 bg-amber-50 p-2.5 shadow-sm"
                    animate={{ rotate: [-2, -0.5, -2] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  >
                    <div className="flex items-center gap-1.5 text-amber-700/60">
                      <StickyNote size={12} />
                      <span className="text-[9px] font-bold">Notion</span>
                    </div>
                    <p className="mt-1.5 text-[10px] text-bonero-dark/55">
                      {isEn ? "draft somewhere…" : "taslak bir yerde…"}
                    </p>
                  </motion.div>
                  <span className="absolute right-4 bottom-4 flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                    <X size={12} />
                  </span>
                </div>

                <ul className="mt-4 space-y-2">
                  {t.chaosItems.map((item) => (
                    <li
                      key={item.text}
                      className="flex items-start gap-2.5 rounded-lg border border-bonero-dark/8 bg-white px-3 py-2.5"
                    >
                      <X size={14} className="mt-0.5 shrink-0 text-red-400/80" />
                      <div>
                        <p className="text-[10px] font-bold text-bonero-dark/35 uppercase">
                          {item.place}
                        </p>
                        <p className="text-sm text-bonero-dark/60">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-2xl border-2 border-bonero-green/25 bg-bonero-green/[0.03] p-5 sm:p-6">
                <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">
                  {t.boardTitle}
                </p>
                <p className="mt-2 text-sm text-bonero-dark/55">{t.boardLead}</p>
                <div className="mt-4 flex-1 rounded-xl border border-bonero-dark/8 bg-white p-4">
                  <ContentMock active isEn={isEn} variant="board" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7 — CTA + related */}
      <section className="pb-16 pt-4 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-violet-500/15 bg-[#1a1625] shadow-[0_32px_64px_rgba(26,22,37,0.35)]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 80% at 100% 0%, rgba(139,92,246,0.2), transparent 55%), linear-gradient(135deg, #1a1625 0%, #152a22 100%)",
              }}
            />
            <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[1fr_0.85fr] lg:p-10">
              <div>
                <p className="text-[11px] font-bold tracking-[0.16em] text-violet-300/80 uppercase">
                  {t.ctaEyebrow}
                </p>
                <h2 className="font-heading mt-2 text-2xl tracking-wide text-white sm:text-3xl">
                  {t.ctaTitle}
                </h2>
                <p className="mt-3 text-sm text-white/65 sm:text-base">{t.ctaBody}</p>
                <ul className="mt-5 space-y-2">
                  {t.ctaBullets.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                      <Check size={14} className="mt-0.5 shrink-0 text-bonero-green" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <CtaButton
                    href={PANEL_REGISTER_URL}
                    variant="inverse"
                    size="md"
                    icon={<ArrowUpRight size={15} />}
                  >
                    {t.ctaPrimary}
                  </CtaButton>
                  <CtaButton href="/paketler" variant="outline-light" size="md">
                    {t.ctaSecondary}
                  </CtaButton>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wide text-white/40 uppercase">
                  {t.relatedTitle}
                </p>
                <div className="mt-4 space-y-3">
                  {t.related.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-4 hover:border-violet-400/30 hover:bg-white/10"
                    >
                      <div>
                        <p className="font-heading text-base text-white group-hover:text-bonero-green">
                          {r.label}
                        </p>
                        <p className="mt-1 text-xs text-white/45">{r.body}</p>
                      </div>
                      <ArrowRight size={16} className="text-white/25 group-hover:text-bonero-green" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
