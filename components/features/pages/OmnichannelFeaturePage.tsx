"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Camera,
  Check,
  Globe,
  Inbox,
  Link2,
  Mail,
  MessageCircle,
  MessageSquare,
  Tag,
  UserCheck,
  UsersRound,
  X,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import OmnichannelMock from "@/components/features/mocks/OmnichannelMock";
import { useLocale } from "@/components/LocaleProvider";
import { featureHref } from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;
const TAB_HOLD = 4500;

const heroChannels = [
  { Icon: MessageCircle, color: "#25D366", label: "WhatsApp", x: -100, y: -58, unread: 2 },
  { Icon: Camera, color: "#E1306C", label: "Instagram", x: 98, y: -52, unread: 1 },
  { Icon: Mail, color: "#0EA5E9", label: "Email", x: -104, y: 68, unread: 1 },
  { Icon: Globe, color: "#188347", label: "Web", x: 96, y: 76, unread: 0 },
];

const copy = {
  tr: {
    heroEyebrow: "Gelen kutusu",
    heroTitle: "Mesajlar dağılmasın.",
    heroAccent: "Tek listede toplansın.",
    heroLead:
      "WhatsApp telefonda, Instagram başka sekmede, mail ayrı — çoğu ekip böyle çalışıyor. Bonero hepsini aynı kuyruğa alır.",
    heroStat: "4 kanal · tek kuyruk",
    heroMetrics: [
      { value: "4", suffix: "", label: "kanal bir arada" },
      { value: "15", suffix: " dk", label: "kurulum süresi" },
      { value: "1", suffix: "", label: "ekran, sıfır sekme" },
    ],
    ctaPrimary: "Inbox’u aç",
    ctaSecondary: "Günün akışına bak",
    painTitle: "Sabah açılışında tanıdık tablo",
    painLead: "Dört uygulama, dört bildirim — hangisine önce bakacağınız belirsiz.",
    painItems: [
      "WhatsApp’ta 6 okunmamış, Instagram’da 2 DM",
      "Mailde teklif talebi bekliyor",
      "Dünkü konuşma başka uygulamada",
      "Aynı müşteriye iki kişi cevap vermiş",
    ],
    painAfter: "Bonero’da tek liste. Önce acil, sonra rutin.",
    dayTitle: "Bir gün nasıl geçer",
    dayLead: "Üç an — geri kalanı aynı ekrandan akar.",
    timeline: [
      {
        time: "09:10",
        title: "Kapıyı açmadan",
        body: "Sıcak etiketli konuşmalar üstte, randevu soruları hemen altında.",
        snippet: { from: "wa" as const, text: "Bugün 15:00 boş mu?" },
      },
      {
        time: "11:40",
        title: "Kanal değişince",
        body: "IG’den WhatsApp’a geçen müşteri — geçmiş aynı kartta kalır.",
        snippet: { from: "ig" as const, text: "Dün fiyat sormuştum, hatırladınız mı?" },
      },
      {
        time: "17:30",
        title: "Yoğun saat",
        body: "Elif satışa, Can desteğe. Atama sayesinde çift cevap yok.",
        snippet: { from: "mail" as const, text: "Re: Teklif — revize edebilir misiniz?" },
      },
    ],
    panelTitle: "Panelde neler var",
    panelLead: "Liste, etiket, atama ve yanıt — aynı ekranda, birbirine bağlı.",
    panelItems: [
      {
        icon: Inbox,
        title: "Birleşik liste",
        body: "WhatsApp, IG, mail ve web formu tek kuyrukta.",
        detail: "Okunmamış sayısı kanal bazında; önce acil, sonra rutin.",
      },
      {
        icon: Tag,
        title: "Etiket & filtre",
        body: "Sıcak, satış, destek — listeyi daraltın.",
        detail: "Etiket + kanal filtresi birlikte çalışır; ekip aynı sırayı görür.",
      },
      {
        icon: UserCheck,
        title: "Atama",
        body: "Konuşmayı devredin, not bırakın.",
        detail: "Devralan kişi tam geçmişi görür; çift cevap riski düşer.",
      },
      {
        icon: MessageSquare,
        title: "Kanaldan yanıt",
        body: "Gelen kanaldan cevap verin.",
        detail: "WhatsApp’tan gelen WhatsApp’tan gider — kopyala-yapıştır yok.",
      },
    ],
    flowTitle: "Kurulumdan günlük kullanıma",
    flowLead: "Bağla, sırala, yanıtla — üç adım, ~15 dakika.",
    flowSteps: [
      {
        n: "01",
        icon: Link2,
        title: "Kanalları bağla",
        body: "WhatsApp Business, Instagram ve mail hesabını panele ekle.",
      },
      {
        n: "02",
        icon: Tag,
        title: "Etiketleri kur",
        body: "Sıcak lead, randevu, şikayet — ekibinizin dilinde filtreler.",
      },
      {
        n: "03",
        icon: MessageSquare,
        title: "Tek yerden yanıtla",
        body: "Liste, konuşma ve atama aynı ekranda kalır.",
      },
    ],
    relatedTitle: "Inbox’tan sonra",
    related: [
      {
        href: featureHref("yapay-zeka"),
        icon: Bot,
        label: "AI Agent",
        body: "Gece gelen sorulara ilk yanıt; kritik olunca ekibe devreder.",
        accent: "from-emerald-500/10 to-bonero-green/5",
      },
      {
        href: featureHref("crm"),
        icon: UsersRound,
        label: "CRM",
        body: "DM’den gelen talep doğrudan lead kartına düşer.",
        accent: "from-sky-500/10 to-bonero-green/5",
      },
    ],
    ctaEyebrow: "Hemen başla",
    ctaTitle: "Mesajları bir araya toplayın.",
    ctaBody: "Kanalları bağlayın — aynı gün inbox canlı olsun.",
    ctaPrimaryFinal: "Ücretsiz dene",
    ctaSecondaryFinal: "Paketlere bak",
    ctaBullets: [
      "WhatsApp, Instagram, mail ve web formu tek listede",
      "Kanal değişince geçmiş kaybolmaz",
      "Atama ile ekip çakışması azalır",
    ],
  },
  en: {
    heroEyebrow: "Inbox",
    heroTitle: "Stop scattering messages.",
    heroAccent: "One list for the team.",
    heroLead:
      "WhatsApp on your phone, Instagram in another tab, email elsewhere — most teams live like this. Bonero pulls it into one queue.",
    heroStat: "4 channels · one queue",
    heroMetrics: [
      { value: "4", suffix: "", label: "channels together" },
      { value: "15", suffix: " min", label: "setup time" },
      { value: "1", suffix: "", label: "screen, zero tabs" },
    ],
    ctaPrimary: "Open inbox",
    ctaSecondary: "See a typical day",
    painTitle: "The familiar morning open",
    painLead: "Four apps, four pings — no clear order for what to open first.",
    painItems: [
      "6 unread on WhatsApp, 2 DMs on Instagram",
      "Quote request waiting in email",
      "Yesterday’s thread stuck in another app",
      "Two people replied to the same customer",
    ],
    painAfter: "In Bonero: one list. Urgent first, then routine.",
    dayTitle: "How a day runs",
    dayLead: "Three moments — the rest flows from the same screen.",
    timeline: [
      {
        time: "09:10",
        title: "Before opening",
        body: "Hot-tagged threads on top, booking questions right below.",
        snippet: { from: "wa" as const, text: "Any slot at 15:00 today?" },
      },
      {
        time: "11:40",
        title: "Channel switch",
        body: "Customer moved IG → WhatsApp. History stays on one card.",
        snippet: { from: "ig" as const, text: "I asked about pricing yesterday — still available?" },
      },
      {
        time: "17:30",
        title: "Peak hour",
        body: "Elif on sales, Can on support. Assignment prevents double replies.",
        snippet: { from: "mail" as const, text: "Re: Quote — can you revise?" },
      },
    ],
    panelTitle: "In the panel",
    panelLead: "List, tags, assignment, and reply — one screen, connected.",
    panelItems: [
      {
        icon: Inbox,
        title: "Unified list",
        body: "WhatsApp, IG, email, and web forms in one queue.",
        detail: "Unread counts per channel; urgent first, then routine.",
      },
      {
        icon: Tag,
        title: "Tags & filters",
        body: "Hot, sales, support — narrow the list.",
        detail: "Tags and channel filters work together; the team sees the same order.",
      },
      {
        icon: UserCheck,
        title: "Assignment",
        body: "Hand off the thread, leave a note.",
        detail: "The next person sees full history; fewer double replies.",
      },
      {
        icon: MessageSquare,
        title: "Reply in-channel",
        body: "Answer on the channel they used.",
        detail: "WhatsApp in, WhatsApp out — no copy-paste between apps.",
      },
    ],
    flowTitle: "Setup to daily use",
    flowLead: "Connect, triage, reply — three steps, ~15 minutes.",
    flowSteps: [
      {
        n: "01",
        icon: Link2,
        title: "Connect channels",
        body: "Add WhatsApp Business, Instagram, and mail from the panel.",
      },
      {
        n: "02",
        icon: Tag,
        title: "Set tags",
        body: "Hot lead, booking, complaint — filters in your team’s language.",
      },
      {
        n: "03",
        icon: MessageSquare,
        title: "Reply from one place",
        body: "List, thread, and assignment stay on one screen.",
      },
    ],
    relatedTitle: "After inbox",
    related: [
      {
        href: featureHref("yapay-zeka"),
        icon: Bot,
        label: "AI Agent",
        body: "First reply overnight; hands off when it matters.",
        accent: "from-emerald-500/10 to-bonero-green/5",
      },
      {
        href: featureHref("crm"),
        icon: UsersRound,
        label: "CRM",
        body: "A DM request lands straight on a lead card.",
        accent: "from-sky-500/10 to-bonero-green/5",
      },
    ],
    ctaEyebrow: "Get started",
    ctaTitle: "Bring messages into one place.",
    ctaBody: "Connect channels — inbox live the same day.",
    ctaPrimaryFinal: "Try free",
    ctaSecondaryFinal: "View plans",
    ctaBullets: [
      "WhatsApp, Instagram, email, and web forms in one list",
      "History stays when channels switch",
      "Assignment cuts team overlap",
    ],
  },
};

const channelIcon = {
  wa: { Icon: MessageCircle, color: "#25D366" },
  ig: { Icon: Camera, color: "#E1306C" },
  mail: { Icon: Mail, color: "#0EA5E9" },
  web: { Icon: Globe, color: "#188347" },
};

function HeroHeadline({
  title,
  accent,
}: {
  title: string;
  accent: string;
}) {
  return (
    <h1 className="font-heading mt-4 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.9rem] lg:leading-[1.06]">
      <motion.span
        className="block"
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.55, ease }}
      >
        {title}
      </motion.span>
      <motion.span
        className="relative mt-1 block overflow-hidden text-bonero-green"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease }}
      >
        {accent}
        <motion.span
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{ duration: 2.2, delay: 0.8, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
          aria-hidden
        />
      </motion.span>
    </h1>
  );
}

function HeroInboxVisual({ isEn }: { isEn: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 80, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 80, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full min-h-[360px] items-center lg:min-h-[440px]"
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* Soft green wash — tek renk, karışıklık yok */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(24,131,71,0.12), transparent 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Full-width window */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 w-full [perspective:1200px] [transform-style:preserve-3d]"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white shadow-[0_40px_100px_rgba(30,41,59,0.14)] ring-1 ring-bonero-dark/[0.04]"
        >
          {/* Scan line */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-bonero-green/50 to-transparent"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Chrome */}
          <div className="flex items-center gap-2 border-b border-bonero-dark/6 bg-[#f8faf9] px-3 py-2.5 sm:px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-1 truncate text-[10px] font-medium text-bonero-dark/40 sm:text-[11px]">
              Bonero · {isEn ? "Inbox" : "Gelen kutusu"}
            </span>
            <motion.span
              className="ml-auto flex items-center gap-1 rounded-full bg-bonero-green/10 px-2 py-0.5 text-[9px] font-bold text-bonero-green"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-bonero-green" />
              {isEn ? "Live" : "Canlı"}
            </motion.span>
          </div>

          {/* Kanal şeridi — hep görünür, sabit */}
          <div className="flex items-center gap-1.5 border-b border-bonero-dark/6 bg-white px-3 py-2 sm:gap-2 sm:px-4">
            {heroChannels.map(({ Icon, label, unread }, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, ease }}
                className="inline-flex items-center gap-1 rounded-lg border border-bonero-dark/8 bg-[#f8faf9] px-2 py-1 text-[10px] font-semibold text-bonero-dark/65"
              >
                <Icon size={11} className="text-bonero-green" />
                <span className="hidden sm:inline">{label}</span>
                {unread > 0 && (
                  <span className="rounded-full bg-bonero-green px-1 text-[8px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </motion.span>
            ))}
            <motion.span
              className="ml-auto text-[9px] font-semibold text-bonero-green"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              {isEn ? "4 unread" : "4 okunmamış"}
            </motion.span>
          </div>

          <div className="p-2 sm:p-3">
            <OmnichannelMock active isEn={isEn} variant="full" />
          </div>
        </motion.div>

        {/* Merge badge */}
        <motion.div
          className="absolute -bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-bonero-green/20 bg-white px-4 py-2 text-[11px] font-semibold text-bonero-green shadow-[0_8px_30px_rgba(24,131,71,0.2)] sm:text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease }}
        >
          <Check size={12} strokeWidth={2.5} />
          {isEn ? "All channels · one inbox" : "Tüm kanallar · tek inbox"}
        </motion.div>
      </motion.div>
    </div>
  );
}

function PanelPreview({ index, isEn }: { index: number; isEn: boolean }) {
  const previews = isEn
    ? [
        [
          { ch: "WA", name: "Ayşe D.", msg: "Slot at 15:00?", hot: true },
          { ch: "IG", name: "@nova", msg: "Price for color?", hot: false },
          { ch: "Mail", name: "teklif@…", msg: "Quote request", hot: false },
        ],
        [
          { label: "Hot", on: true },
          { label: "Sales", on: false },
          { label: "Support", on: true },
        ],
        [
          { name: "Elif", role: "Sales", on: true },
          { name: "Can", role: "Support", on: false },
        ],
        [
          { from: "them", text: "Is 14:00 free?" },
          { from: "you", text: "Yes — booking now." },
        ],
      ]
    : [
        [
          { ch: "WA", name: "Ayşe D.", msg: "15:00 boş mu?", hot: true },
          { ch: "IG", name: "@nova", msg: "Renk fiyatı?", hot: false },
          { ch: "Mail", name: "teklif@…", msg: "Teklif talebi", hot: false },
        ],
        [
          { label: "Sıcak", on: true },
          { label: "Satış", on: false },
          { label: "Destek", on: true },
        ],
        [
          { name: "Elif", role: "Satış", on: true },
          { name: "Can", role: "Destek", on: false },
        ],
        [
          { from: "them", text: "14:00 müsait mi?" },
          { from: "you", text: "Evet — randevuyu açıyorum." },
        ],
      ];

  const p = previews[index];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -12 }}
        transition={{ duration: 0.35, ease }}
        className="h-full min-h-[200px] rounded-xl border border-bonero-dark/8 bg-[#f8faf9] p-4 sm:min-h-[220px] sm:p-5"
      >
        {index === 0 &&
          (p as { ch: string; name: string; msg: string; hot: boolean }[]).map((row, i) => (
            <motion.div
              key={row.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`mb-2 flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs ${
                row.hot ? "border border-bonero-green/20 bg-bonero-green/5" : "bg-white"
              }`}
            >
              <span className="w-7 font-bold text-bonero-dark/40">{row.ch}</span>
              <span className="min-w-0 flex-1 truncate font-medium text-bonero-dark/75">
                {row.msg}
              </span>
            </motion.div>
          ))}
        {index === 1 &&
          (p as { label: string; on: boolean }[]).map((tag, i) => (
            <motion.span
              key={tag.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              className={`mb-2 mr-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                tag.on
                  ? "bg-bonero-green text-white"
                  : "border border-bonero-dark/10 bg-white text-bonero-dark/50"
              }`}
            >
              {tag.label}
            </motion.span>
          ))}
        {index === 2 &&
          (p as { name: string; role: string; on: boolean }[]).map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`mb-2 flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
                person.on
                  ? "border border-bonero-green/25 bg-bonero-green/5"
                  : "bg-white"
              }`}
            >
              <span className="font-semibold text-bonero-dark">{person.name}</span>
              <span className="text-bonero-dark/45">{person.role}</span>
            </motion.div>
          ))}
        {index === 3 &&
          (p as { from: string; text: string }[]).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`mb-2 flex ${msg.from === "you" ? "justify-end" : "justify-start"}`}
            >
              <span
                className={`max-w-[85%] rounded-xl px-3 py-1.5 text-xs ${
                  msg.from === "you"
                    ? "bg-bonero-green text-white"
                    : "bg-white text-bonero-dark/70"
                }`}
              >
                {msg.text}
              </span>
            </motion.div>
          ))}
      </motion.div>
    </AnimatePresence>
  );
}

function InboxClosingCta({
  t,
  isEn,
}: {
  t: (typeof copy)["tr"];
  isEn: boolean;
}) {
  return (
    <section className="border-t border-bonero-dark/6 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-bonero-dark/8 bg-bonero-dark shadow-[0_40px_80px_rgba(30,41,59,0.2)]">
          {/* Background layers */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #1e293b 0%, #152a22 45%, #126b38 100%)",
            }}
          />
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.07]" />
          <motion.div
            className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[#25D366]/20 blur-3xl"
            animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-bonero-green/25 blur-3xl"
            animate={{ opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          />

          <div className="relative grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:p-10">
            {/* Copy */}
            <div className="max-w-lg">
              <p className="text-[11px] font-bold tracking-[0.18em] text-white/45 uppercase">
                {t.ctaEyebrow}
              </p>
              <h2 className="font-heading mt-3 text-2xl tracking-wide text-white sm:text-3xl lg:text-[2rem]">
                {t.ctaTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                {t.ctaBody}
              </p>
              <ul className="mt-6 space-y-2.5">
                {t.ctaBullets.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, ease }}
                    className="flex items-start gap-2.5 text-sm text-white/80"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <Check size={11} className="text-white" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <CtaButton
                  href={PANEL_REGISTER_URL}
                  variant="inverse"
                  size="md"
                  icon={<ArrowUpRight size={15} />}
                >
                  {t.ctaPrimaryFinal}
                </CtaButton>
                <CtaButton href="/paketler" variant="outline-light" size="md">
                  {t.ctaSecondaryFinal}
                </CtaButton>
              </div>
            </div>

            {/* Mock — contained, no floating junk */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/95 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-2.5"
              >
                <OmnichannelMock active isEn={isEn} variant="compact" />
              </motion.div>
              {/* Subtle channel strip */}
              <div className="mt-3 flex justify-center gap-2">
                {heroChannels.map(({ Icon, color, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[10px] font-medium text-white/70 backdrop-blur-sm"
                  >
                    <Icon size={10} style={{ color }} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowStage({ active, isEn }: { active: number; isEn: boolean }) {
  return (
    <div className="flex h-full items-center justify-center p-4 sm:p-6">
      <motion.div
        key={active}
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="w-full max-w-md"
      >
        {active === 0 ? (
          <div className="flex justify-center gap-4 sm:gap-6">
            {heroChannels.slice(0, 3).map(({ Icon, color, label }, i) => (
              <motion.div
                key={label}
                className="flex flex-col items-center gap-2"
                animate={active === 0 ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 6 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-bonero-dark/8 bg-white shadow-md sm:h-14 sm:w-14">
                  <Icon size={22} style={{ color }} />
                </div>
                <span className="text-[10px] font-semibold text-bonero-dark/45">{label}</span>
              </motion.div>
            ))}
          </div>
        ) : active === 1 ? (
          <div className="overflow-hidden rounded-xl border border-bonero-dark/8 bg-white shadow-lg">
            <OmnichannelMock active isEn={isEn} variant="compact" />
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-bonero-dark/8 bg-white shadow-lg">
            <OmnichannelMock active isEn={isEn} variant="full" />
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function OmnichannelFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const t = copy[locale];

  const [dayTab, setDayTab] = useState(0);
  const [flowStep, setFlowStep] = useState(0);
  const [panelTab, setPanelTab] = useState(0);
  const [dayInView, setDayInView] = useState(false);
  const [flowInView, setFlowInView] = useState(false);
  const [panelInView, setPanelInView] = useState(false);
  const dayRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dayRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setDayInView(e.isIntersecting), {
      threshold: 0.3,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setFlowInView(e.isIntersecting), {
      threshold: 0.2,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setPanelInView(e.isIntersecting), {
      threshold: 0.35,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!dayInView) return;
    const id = window.setInterval(() => {
      setDayTab((p) => (p + 1) % t.timeline.length);
    }, TAB_HOLD);
    return () => clearInterval(id);
  }, [dayInView, t.timeline.length]);

  useEffect(() => {
    if (!flowInView) return;
    const id = window.setInterval(() => {
      setFlowStep((p) => (p + 1) % t.flowSteps.length);
    }, TAB_HOLD);
    return () => clearInterval(id);
  }, [flowInView, t.flowSteps.length]);

  useEffect(() => {
    if (!panelInView) return;
    const id = window.setInterval(() => {
      setPanelTab((p) => (p + 1) % t.panelItems.length);
    }, TAB_HOLD);
    return () => clearInterval(id);
  }, [panelInView, t.panelItems.length]);

  const dayEntry = t.timeline[dayTab];
  const dayCh = channelIcon[dayEntry.snippet.from];
  const activePanel = t.panelItems[panelTab];

  return (
    <div className="bg-background">
      {/* ── Hero ── */}
      <section
        className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-x-clip py-16 sm:py-20"
        style={{
          background:
            "linear-gradient(180deg, #f9fafb 0%, #f3f7f5 48%, #f9fafb 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 82% 45%, rgba(24,131,71,0.11), transparent 55%), radial-gradient(ellipse 45% 40% at 5% 55%, rgba(37,211,102,0.06), transparent 50%)",
          }}
        />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden />

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-bonero-dark/45 hover:text-bonero-dark"
          >
            <ArrowLeft size={14} />
            {isEn ? "All features" : "Tüm özellikler"}
          </Link>

          <div className="mt-6 grid items-center gap-8 lg:mt-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
            <div className="max-w-xl lg:py-4">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease }}
                className="inline-flex items-center gap-2 rounded-full border border-bonero-green/15 bg-bonero-green/[0.06] px-3 py-1 text-xs font-semibold tracking-wide text-bonero-green uppercase"
              >
                <Inbox size={12} />
                {t.heroEyebrow}
              </motion.p>

              <HeroHeadline title={t.heroTitle} accent={t.heroAccent} />

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease }}
                className="mt-5 text-base leading-relaxed text-bonero-dark/55 sm:text-lg"
              >
                {t.heroLead}
              </motion.p>

              {/* Mini metrics */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.18, ease }}
                className="mt-7 grid grid-cols-3 gap-2 sm:gap-3"
              >
                {t.heroMetrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 + i * 0.06, ease }}
                    className="rounded-xl border border-bonero-dark/8 bg-white/80 px-2.5 py-3 text-center shadow-sm backdrop-blur-sm sm:px-3"
                  >
                    <p className="font-heading text-xl text-bonero-dark sm:text-2xl">
                      {m.value}
                      <span className="text-sm text-bonero-green">{m.suffix}</span>
                    </p>
                    <p className="mt-0.5 text-[10px] leading-tight text-bonero-dark/45 sm:text-[11px]">
                      {m.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Live stat pill */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.28, ease }}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-bonero-green/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-bonero-green shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green/35" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-bonero-green" />
                </span>
                {t.heroStat}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.34, ease }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  href={PANEL_REGISTER_URL}
                  className="group inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-bonero-green/25 transition-all hover:scale-[1.02] hover:bg-bonero-green/90 hover:shadow-xl hover:shadow-bonero-green/30"
                >
                  {t.ctaPrimary}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
                <a
                  href="#gun"
                  className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70 shadow-sm hover:border-bonero-dark/20"
                >
                  {t.ctaSecondary}
                  <motion.span
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-bonero-dark/35"
                  >
                    ↓
                  </motion.span>
                </a>
              </motion.div>
            </div>

            <div className="relative w-full pb-6 lg:pb-8">
              <HeroInboxVisual isEn={isEn} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Pain ── */}
      <section className="border-y border-bonero-dark/6 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-7">
              <h2 className="font-heading text-3xl tracking-wide text-bonero-dark sm:text-4xl">
                {t.painTitle}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-bonero-dark/55 sm:text-lg">
                {t.painLead}
              </p>
              <ul className="mt-8 space-y-2.5">
                {t.painItems.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease }}
                    className="flex items-center gap-3 rounded-xl border border-red-500/10 bg-red-50/50 px-4 py-3 text-sm font-medium text-bonero-dark/70 sm:text-[15px]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                      <X size={14} className="text-red-500" strokeWidth={2.5} />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <p className="mt-8 flex items-center gap-2 text-base font-semibold text-bonero-green sm:text-lg">
                <Check size={18} strokeWidth={2.5} />
                {t.painAfter}
              </p>
            </Reveal>

            <Reveal delay={0.06} className="lg:col-span-5">
              <div className="mx-auto max-w-[340px] lg:ml-auto lg:max-w-none">
                <div className="overflow-hidden rounded-2xl border border-bonero-dark/8 bg-[#f3f6f4] p-3 shadow-[0_20px_50px_rgba(30,41,59,0.08)] sm:p-4">
                  <OmnichannelMock active isEn={isEn} variant="compact" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Day tabs ── */}
      <section id="gun" className="scroll-mt-24 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.dayTitle}
            </h2>
            <p className="mt-2 text-sm text-bonero-dark/50 sm:text-base">{t.dayLead}</p>
          </Reveal>

          <div
            ref={dayRef}
            className="mt-8"
            onMouseEnter={() => setDayInView(false)}
            onMouseLeave={() => setDayInView(true)}
          >
            <div className="flex flex-wrap gap-2">
              {t.timeline.map((entry, i) => (
                <button
                  key={entry.time}
                  type="button"
                  onClick={() => setDayTab(i)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    dayTab === i
                      ? "bg-bonero-dark text-white shadow-md shadow-bonero-dark/15"
                      : "border border-bonero-dark/10 bg-white text-bonero-dark/50 hover:border-bonero-dark/20"
                  }`}
                >
                  <span className="font-mono text-xs opacity-70">{entry.time}</span>
                  <span className="ml-2 hidden sm:inline">{entry.title}</span>
                </button>
              ))}
            </div>

            <div className="relative mt-4 overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white shadow-sm">
              <motion.div
                key={dayTab}
                className="absolute bottom-0 left-0 h-0.5 bg-bonero-green"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: TAB_HOLD / 1000, ease: "linear" }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={dayTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease }}
                  className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 sm:p-6"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-bold text-bonero-green">{dayEntry.time}</p>
                    <h3 className="font-heading mt-1 text-xl text-bonero-dark">{dayEntry.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">{dayEntry.body}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2.5 rounded-xl border border-bonero-dark/8 bg-[#f8faf9] px-3 py-2.5 sm:max-w-[260px]">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${dayCh.color}15`, color: dayCh.color }}
                    >
                      <dayCh.Icon size={14} />
                    </span>
                    <span className="truncate text-sm text-bonero-dark/70">{dayEntry.snippet.text}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Panel showcase ── */}
      <section className="border-t border-bonero-dark/6 bg-[#f6f8f7] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.panelTitle}
            </h2>
            <p className="mt-2 text-sm text-bonero-dark/50 sm:text-base">{t.panelLead}</p>
          </Reveal>

          <div
            ref={panelRef}
            className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-6"
            onMouseEnter={() => setPanelInView(false)}
            onMouseLeave={() => setPanelInView(true)}
          >
            {/* Tabs */}
            <div className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {t.panelItems.map((item, i) => {
                const Icon = item.icon;
                const on = panelTab === i;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setPanelTab(i)}
                    className={`relative min-w-[200px] shrink-0 rounded-xl border px-4 py-3.5 text-left transition-all lg:min-w-0 ${
                      on
                        ? "border-bonero-green/30 bg-white shadow-md shadow-bonero-green/8"
                        : "border-bonero-dark/8 bg-white/60 hover:border-bonero-dark/15 hover:bg-white"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="panel-active"
                        className="absolute inset-y-2 left-0 w-1 rounded-full bg-bonero-green"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <div className="flex items-start gap-3 pl-2">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          on ? "bg-bonero-green text-white" : "bg-bonero-dark/[0.05] text-bonero-dark/45"
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0">
                        <p className={`font-heading text-sm sm:text-[15px] ${on ? "text-bonero-dark" : "text-bonero-dark/55"}`}>
                          {item.title}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-bonero-dark/45">{item.body}</p>
                      </div>
                    </div>
                    {on && panelInView && (
                      <motion.div
                        key={`panel-prog-${panelTab}`}
                        className="absolute right-0 bottom-0 left-0 h-0.5 origin-left bg-bonero-green/60"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: TAB_HOLD / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Preview + detail */}
            <Reveal delay={0.05}>
              <div className="overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white p-4 sm:p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={panelTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-xs font-semibold tracking-wide text-bonero-green uppercase">
                      {activePanel.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">
                      {activePanel.detail}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-4">
                  <PanelPreview index={panelTab} isEn={isEn} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Setup flow ── */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.flowTitle}
            </h2>
            <p className="mt-3 text-base text-bonero-dark/55">{t.flowLead}</p>
          </Reveal>

          <div ref={flowRef} className="mt-10 grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
            <ol className="space-y-3 lg:col-span-5">
              {t.flowSteps.map((step, i) => {
                const on = flowStep === i;
                const Icon = step.icon;
                return (
                  <li key={step.n}>
                    <button
                      type="button"
                      onClick={() => setFlowStep(i)}
                      className={`relative w-full overflow-hidden rounded-2xl border px-4 py-4 text-left transition-all sm:px-5 ${
                        on
                          ? "border-bonero-green/30 bg-white shadow-lg shadow-bonero-green/10"
                          : "border-bonero-dark/8 bg-white/70 hover:border-bonero-dark/15"
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="inbox-flow-active"
                          className="absolute inset-y-0 left-0 w-1 bg-bonero-green"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <div className="flex items-start gap-3.5">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                            on ? "bg-bonero-green text-white" : "bg-bonero-dark/[0.04] text-bonero-dark/45"
                          }`}
                        >
                          <Icon size={18} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-mono text-[11px] font-bold ${on ? "text-bonero-green" : "text-bonero-dark/30"}`}>
                              {step.n}
                            </span>
                            <h3 className={`font-heading text-lg ${on ? "text-bonero-dark" : "text-bonero-dark/50"}`}>
                              {step.title}
                            </h3>
                          </div>
                          <AnimatePresence initial={false}>
                            {on && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease }}
                                className="mt-2 overflow-hidden text-sm leading-relaxed text-bonero-dark/55"
                              >
                                {step.body}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      {on && (
                        <motion.div
                          key={`flow-prog-${flowStep}`}
                          className="absolute right-0 bottom-0 left-0 h-0.5 origin-left bg-bonero-green/70"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: TAB_HOLD / 1000, ease: "linear" }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="lg:col-span-7">
              <div className="relative h-[280px] overflow-hidden rounded-[1.5rem] border border-bonero-dark/8 bg-[#f3f6f4] shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:h-[320px]">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 55% 50% at 50% 45%, rgba(24,131,71,0.1), transparent 65%)",
                  }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={flowStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.4, ease }}
                    className="absolute inset-0"
                  >
                    <FlowStage active={flowStep} isEn={isEn} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related ── */}
      <section className="border-t border-bonero-dark/6 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-medium tracking-wide text-bonero-dark/40 uppercase">
              {t.relatedTitle}
            </p>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {t.related.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.href} delay={i * 0.06}>
                  <Link
                    href={r.href}
                    className="group relative block overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-bonero-green/25 hover:shadow-lg hover:shadow-bonero-green/5"
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${r.accent} opacity-0 transition-opacity group-hover:opacity-100`}
                    />
                    <div className="relative flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green transition-colors group-hover:bg-bonero-green group-hover:text-white">
                          <Icon size={20} />
                        </span>
                        <p className="font-heading mt-4 text-xl text-bonero-dark group-hover:text-bonero-green">
                          {r.label}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">{r.body}</p>
                      </div>
                      <ArrowRight
                        size={18}
                        className="mt-1 shrink-0 text-bonero-dark/20 transition-all group-hover:translate-x-0.5 group-hover:text-bonero-green"
                      />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <InboxClosingCta t={t} isEn={isEn} />
    </div>
  );
}
