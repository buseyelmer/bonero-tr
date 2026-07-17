"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  Clock,
  MessageCircle,
  Sparkles,
  UserX,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import AppointmentMock from "@/components/features/mocks/AppointmentMock";
import RandevuHeroVisual from "@/components/features/RandevuHeroVisual";
import { useLocale } from "@/components/LocaleProvider";
import { featureHref } from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;
const SCENARIO_HOLD = 5500;

const copy = {
  tr: {
    back: "Tüm özellikler",
    heroEyebrow: "Takvim & takip",
    heroTitle: "Gününüz",
    heroAccent: "ajandada.",
    heroLead:
      "Salon, klinik veya satış toplantısı — mesajdan gelen talep takvime düşer, hatırlatma kendiliğinden gider. Kağıt defter değil; dolu gün, az no-show.",
    heroCtaPrimary: "Takvimi aç",
    heroCtaSecondary: "Anları gör",
    heroLive: "Canlı · 4 randevu bugün",
    heroNote: "Mesajdan slot · otomatik hatırlatma",
    showcaseEyebrow: "Canlı takvim",
    showcaseTitle: "Bugünün programı tek ekranda",
    showcaseLead: "Saat blokları, onay durumu ve sıradaki hatırlatma — kaydırmadan görünür.",
    midCtaTitle: "Boş slot yerine dolu gün.",
    midCtaBody: "Hatırlatma otomasyonunu bir kez kurun; takvim kendini taşısın.",
    midCtaButton: "Ücretsiz dene",
    heroStats: [
      { value: "−38%", label: "no-show oranı" },
      { value: "2×", label: "hatırlatma otomasyonu" },
      { value: "0", label: "kaybolan talep" },
    ],
    paperTitle: "Kağıt takvim",
    paperLead: "Not kağıdı, WhatsApp ekran görüntüsü, Excel — hepsi ayrı yerde.",
    paperItems: [
      "Kim geldi, kim gelmedi — net değil",
      "Hatırlatma manuel, unutulunca boş slot",
      "Müşteri aynı soruyu tekrar soruyor",
    ],
    boneroTitle: "Bonero takvimi",
    boneroLead: "Talep, onay, hatırlatma ve takip aynı kartta — kanal bağlamı kaybolmaz.",
    journeyTitle: "Bir günün hikâyesi",
    journeyLead: "Sabah gelen mesajdan akşam dolu takvime — dört an.",
    journey: [
      {
        time: "09:12",
        title: "Talep gelir",
        body: "WhatsApp: “Yarın öğleden sonra müsait misiniz?” Inbox’tan randevu kartına.",
        tone: "message",
      },
      {
        time: "09:18",
        title: "Slot onaylanır",
        body: "Boş saat seçilir, müşteriye onay mesajı gider. Çakışma varsa sistem uyarır.",
        tone: "confirm",
      },
      {
        time: "Ertesi 09:00",
        title: "Hatırlatma gider",
        body: "24 saat kala WhatsApp otomatik — müşteri onaylar veya ertelemeyi ister.",
        tone: "remind",
      },
      {
        time: "16:05",
        title: "Gelmezse takip",
        body: "No-show kayda düşer; tek tıkla yeni slot önerilir, CRM’de geçmiş kalır.",
        tone: "follow",
      },
    ],
    pillarsTitle: "Üç kolon taşıyor",
    pillarsLead: "Takvim, hatırlatma ve mesaj bağlantısı — birbirinden kopmaz.",
    pillars: [
      {
        icon: CalendarDays,
        title: "Tek takvim",
        body: "Günlük ve haftalık görünüm. Çakışmalar ve boş slotlar bir bakışta.",
        stat: "5 gün · 18 slot",
      },
      {
        icon: Bell,
        title: "Otomatik hatırlatma",
        body: "WhatsApp veya SMS — 24 saat veya 2 saat kala. Manuel mesaj yok.",
        stat: "2 otomatik tetik",
      },
      {
        icon: MessageCircle,
        title: "Mesajdan randevuya",
        body: "Inbox’taki konuşma kartına bağlı kalır; müşteri tekrar anlatmaz.",
        stat: "Kanal bağlamı korunur",
      },
    ],
    scenariosTitle: "Gerçek anlar",
    scenarios: [
      {
        tag: "Yeni talep",
        title: "DM’den slot seçimi",
        body: "“Yarın müsait misiniz?” — uygun saat seçilir, randevu oluşur, onay gider.",
      },
      {
        tag: "Hatırlatma",
        title: "24 saat önce",
        body: "Otomatik mesaj gider; müşteri onaylar veya ertelemeyi ister.",
      },
      {
        tag: "No-show",
        title: "Gelmedi, kayıt düştü",
        body: "Tek tıkla yeni slot öner; geçmiş müşteri kartında kalır.",
      },
    ],
    relatedTitle: "Randevuyla birlikte",
    related: [
      {
        href: featureHref("gelen-kutusu"),
        label: "Gelen kutusu",
        body: "Talep mesajdan gelir — bağlam kaybolmadan karta dönüşür.",
      },
      {
        href: featureHref("crm"),
        label: "CRM",
        body: "Randevu geçmişi müşteri kartında; takip tek yerden.",
      },
    ],
    exploreLabel: "Keşfet",
    ctaEyebrow: "Dolu takvim",
    ctaTitle: "No-show azalsın, gün dolsun.",
    ctaBody: "Hatırlatmalar kendiliğinden gider; ekip aynı programla çalışır.",
    ctaPrimary: "Randevuya başla",
    ctaSecondary: "Paketlere bak",
    ctaBullets: [
      "Mesajdan randevuya tek tık",
      "WhatsApp hatırlatma otomasyonu",
      "No-show takibi ve yeniden davet",
    ],
  },
  en: {
    back: "All features",
    heroEyebrow: "Calendar & tracking",
    heroTitle: "Your day",
    heroAccent: "in the agenda.",
    heroLead:
      "Salon, clinic, or sales meeting — requests from messages land on the calendar, reminders go out on their own. Not a paper diary; fuller days, fewer no-shows.",
    heroCtaPrimary: "Open calendar",
    heroCtaSecondary: "See the moments",
    heroLive: "Live · 4 bookings today",
    heroNote: "Message to slot · auto reminders",
    showcaseEyebrow: "Live calendar",
    showcaseTitle: "Today's schedule on one screen",
    showcaseLead: "Time blocks, confirmation status, and the next reminder — visible without scrolling.",
    midCtaTitle: "Full days, not empty slots.",
    midCtaBody: "Set up reminder automation once; let the calendar run itself.",
    midCtaButton: "Try free",
    heroStats: [
      { value: "−38%", label: "no-show rate" },
      { value: "2×", label: "reminder automation" },
      { value: "0", label: "lost requests" },
    ],
    paperTitle: "Paper calendar",
    paperLead: "Sticky notes, WhatsApp screenshots, spreadsheets — all in different places.",
    paperItems: [
      "Who showed, who didn’t — unclear",
      "Manual reminders, empty slots when forgotten",
      "Customers repeat the same question",
    ],
    boneroTitle: "Bonero calendar",
    boneroLead: "Request, confirm, remind, and follow up on one card — channel context stays.",
    journeyTitle: "One day’s story",
    journeyLead: "From a morning message to a full calendar by evening — four moments.",
    journey: [
      {
        time: "09:12",
        title: "Request arrives",
        body: "WhatsApp: “Free tomorrow afternoon?” From inbox to booking card.",
        tone: "message",
      },
      {
        time: "09:18",
        title: "Slot confirmed",
        body: "Open time picked, confirmation sent. System flags conflicts.",
        tone: "confirm",
      },
      {
        time: "Next 09:00",
        title: "Reminder goes out",
        body: "Auto WhatsApp 24h ahead — customer confirms or asks to reschedule.",
        tone: "remind",
      },
      {
        time: "16:05",
        title: "Follow up if missed",
        body: "No-show logged; one tap to offer a new slot, history stays in CRM.",
        tone: "follow",
      },
    ],
    pillarsTitle: "Three pillars",
    pillarsLead: "Calendar, reminders, and message link — never disconnected.",
    pillars: [
      {
        icon: CalendarDays,
        title: "One calendar",
        body: "Daily and weekly views. Conflicts and open slots at a glance.",
        stat: "5 days · 18 slots",
      },
      {
        icon: Bell,
        title: "Auto reminders",
        body: "WhatsApp or SMS — 24h or 2h before. No manual messages.",
        stat: "2 auto triggers",
      },
      {
        icon: MessageCircle,
        title: "Message to booking",
        body: "Stays linked to the inbox thread; customer doesn’t repeat themselves.",
        stat: "Channel context kept",
      },
    ],
    scenariosTitle: "Real moments",
    scenarios: [
      {
        tag: "New request",
        title: "Pick a slot from DM",
        body: "“Free tomorrow?” — pick a time, booking created, confirmation sent.",
      },
      {
        tag: "Reminder",
        title: "24 hours ahead",
        body: "Auto message goes out; customer confirms or asks to reschedule.",
      },
      {
        tag: "No-show",
        title: "Missed, logged",
        body: "One tap to offer a new slot; history stays on the customer card.",
      },
    ],
    relatedTitle: "Works well with",
    related: [
      {
        href: featureHref("gelen-kutusu"),
        label: "Inbox",
        body: "Requests arrive from messages — become cards without losing context.",
      },
      {
        href: featureHref("crm"),
        label: "CRM",
        body: "Booking history on the customer card; follow-up from one place.",
      },
    ],
    exploreLabel: "Explore",
    ctaEyebrow: "Full calendar",
    ctaTitle: "Fewer no-shows. Fuller days.",
    ctaBody: "Reminders go out on their own; the team runs on one schedule.",
    ctaPrimary: "Start booking",
    ctaSecondary: "View plans",
    ctaBullets: [
      "One tap from message to booking",
      "WhatsApp reminder automation",
      "No-show tracking and re-invite",
    ],
  },
};

const journeyToneClass: Record<string, string> = {
  message: "border-bonero-dark/12 bg-[#f4f6f5]",
  confirm: "border-bonero-green/30 bg-bonero-green/[0.08]",
  remind: "border-bonero-green/20 bg-bonero-green/[0.05]",
  follow: "border-bonero-dark/10 bg-white",
};

function HeroHeadline({ title, accent }: { title: string; accent: string }) {
  return (
    <h1 className="font-heading mt-5 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.85rem] lg:leading-[1.08]">
      <motion.span
        className="block"
        initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease }}
      >
        {title}
      </motion.span>
      <motion.span
        className="relative mt-1 block overflow-hidden text-bonero-green"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12, ease }}
      >
        {accent}
        <motion.span
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/55 to-transparent"
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{ duration: 2.2, delay: 0.9, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
          aria-hidden
        />
      </motion.span>
    </h1>
  );
}

function JourneyFilmstrip({
  title,
  lead,
  items,
}: {
  title: string;
  lead: string;
  items: { time: string; title: string; body: string; tone: string }[];
}) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setActive((p) => (p + 1) % items.length), SCENARIO_HOLD);
    return () => clearInterval(id);
  }, [inView, items.length]);

  return (
    <section className="border-y border-bonero-dark/6 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-xl">
          <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-bonero-dark/55 sm:text-base">{lead}</p>
        </Reveal>

        <div
          ref={ref}
          className="mt-8 lg:grid lg:grid-cols-[auto_1fr] lg:gap-8"
          onMouseEnter={() => setInView(false)}
          onMouseLeave={() => setInView(true)}
        >
          <div className="hidden lg:flex lg:flex-col lg:gap-0 lg:pt-1">
            {items.map((item, i) => (
              <button
                key={`rail-${item.time}`}
                type="button"
                onClick={() => setActive(i)}
                className="group relative flex items-start gap-3 pb-8 last:pb-0"
              >
                {i < items.length - 1 && (
                  <span className="absolute top-5 left-[0.55rem] h-[calc(100%-0.5rem)] w-px bg-bonero-dark/10 group-hover:bg-bonero-green/30" />
                )}
                <span
                  className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    active === i
                      ? "border-bonero-green bg-bonero-green"
                      : "border-bonero-dark/15 bg-white group-hover:border-bonero-green/40"
                  }`}
                >
                  {active === i && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <span
                  className={`pt-0.5 font-mono text-xs font-bold ${
                    active === i ? "text-bonero-green" : "text-bonero-dark/35"
                  }`}
                >
                  {item.time}
                </span>
              </button>
            ))}
          </div>

          <div>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
              {items.map((item, i) => (
                <button
                  key={item.time}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    active === i
                      ? "bg-bonero-green text-white"
                      : "border border-bonero-dark/12 text-bonero-dark/50 hover:border-bonero-green/30"
                  }`}
                >
                  {item.time}
                </button>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-bonero-dark/8 bg-[#f8faf9] shadow-sm">
              <motion.div
                key={active}
                className="absolute bottom-0 left-0 h-0.5 bg-bonero-green"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: SCENARIO_HOLD / 1000, ease: "linear" }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease }}
                  className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:p-8"
                >
                  <div
                    className={`inline-flex flex-col rounded-xl border px-4 py-3 ${journeyToneClass[items[active].tone]}`}
                  >
                    <Clock size={18} className="text-bonero-green" />
                    <span className="mt-2 font-mono text-lg font-bold text-bonero-dark">
                      {items[active].time}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-bonero-dark sm:text-2xl">
                      {items[active].title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
                      {items[active].body}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RandevuFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const t = copy[locale];
  const [scenario, setScenario] = useState(0);

  return (
    <div className="bg-background">
      {/* 1 — Hero: tam yükseklik, animasyonlu takvim vitrin */}
      <section
        className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16"
        style={{
          background: "linear-gradient(180deg, #f9fafb 0%, #f3f7f5 50%, #f9fafb 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(24,131,71,0.14), transparent 55%), radial-gradient(ellipse 40% 35% at 100% 80%, rgba(24,131,71,0.06), transparent 50%)",
          }}
        />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />

        {/* Ambient orbs */}
        <motion.div
          className="pointer-events-none absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-bonero-green/10 blur-3xl"
          animate={{ opacity: [0.4, 0.65, 0.4], scale: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -right-20 bottom-1/4 h-48 w-48 rounded-full bg-bonero-dark/5 blur-3xl"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <Link
              href="/features"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-bonero-dark/45 hover:text-bonero-dark"
            >
              <ArrowLeft size={14} />
              {t.back}
            </Link>
          </motion.div>

          <div className="mt-6 text-center lg:mt-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-bonero-green/20 bg-white/80 px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-bonero-green uppercase backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green/40" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-bonero-green" />
              </span>
              <CalendarDays size={12} />
              {t.heroEyebrow}
            </motion.p>

            <HeroHeadline title={t.heroTitle} accent={t.heroAccent} />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-bonero-dark/60 sm:text-lg"
            >
              {t.heroLead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.28, ease }}
              className="mt-6 flex flex-wrap items-center justify-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-bonero-green/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-bonero-green shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green/35" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-bonero-green" />
                </span>
                {t.heroLive}
              </span>
              <span className="text-xs text-bonero-dark/40">{t.heroNote}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.34, ease }}
              className="mt-7 flex flex-wrap justify-center gap-2 sm:gap-3"
            >
              {t.heroStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.38 + i * 0.07, ease }}
                  whileHover={{ y: -2 }}
                  className="rounded-xl border border-bonero-dark/8 bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur-sm"
                >
                  <p className="font-heading text-lg text-bonero-green sm:text-xl">{s.value}</p>
                  <p className="text-[10px] text-bonero-dark/45">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.42, ease }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              <CtaButton
                href={PANEL_REGISTER_URL}
                variant="primary"
                size="md"
                icon={<ArrowUpRight size={15} />}
              >
                {t.heroCtaPrimary}
              </CtaButton>
              <a
                href="#anlar"
                className="group inline-flex items-center gap-2 rounded-lg border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70 shadow-sm hover:border-bonero-green/30"
              >
                {t.heroCtaSecondary}
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-bonero-green/70"
                >
                  ↓
                </motion.span>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease }}
            className="mt-10 sm:mt-12 lg:mt-14"
          >
            <RandevuHeroVisual />
          </motion.div>
        </div>
      </section>

      {/* 2 — Haftalık özet (hero’daki günlük görünümü tamamlar) */}
      <section id="takvim" className="scroll-mt-24 border-y border-bonero-dark/6 bg-white pb-14 pt-4 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-6 max-w-lg">
            <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">
              {t.showcaseEyebrow}
            </p>
            <h2 className="font-heading mt-2 text-xl text-bonero-dark sm:text-2xl">
              {t.showcaseTitle}
            </h2>
            <p className="mt-2 text-sm text-bonero-dark/55">{t.showcaseLead}</p>
          </Reveal>

          <Reveal>
            <div className="max-w-2xl">
              <AppointmentMock active isEn={isEn} variant="compact" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 — Senaryolar erken (çoğu sayfada sonda; burada koyu bant) */}
      <section id="anlar" className="scroll-mt-24 bg-bonero-dark py-14 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl tracking-wide sm:text-3xl">{t.scenariosTitle}</h2>
          </Reveal>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {t.scenarios.map((s, i) => (
              <button
                key={s.tag}
                type="button"
                onClick={() => setScenario(i)}
                className={`rounded-2xl border p-5 text-left transition-all sm:p-6 ${
                  scenario === i
                    ? "border-bonero-green/50 bg-bonero-green/15 shadow-lg"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]"
                }`}
              >
                <p
                  className={`text-xs font-bold tracking-wide uppercase ${
                    scenario === i ? "text-bonero-green" : "text-white/45"
                  }`}
                >
                  {s.tag}
                </p>
                <h3 className="font-heading mt-2 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Gün hikâyesi */}
      <JourneyFilmstrip title={t.journeyTitle} lead={t.journeyLead} items={t.journey} />

      {/* 5 — Yetenekler: dikey zigzag (3 kolon grid değil) */}
      <section className="bg-[#f4f6f5] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.pillarsTitle}
            </h2>
            <p className="mt-2 text-sm text-bonero-dark/55 sm:text-base">{t.pillarsLead}</p>
          </Reveal>

          <div className="mt-10 space-y-4">
            {t.pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const flip = i % 2 === 1;
              return (
                <Reveal key={pillar.title} delay={i * 0.06}>
                  <div
                    className={`flex flex-col gap-4 rounded-2xl border border-bonero-dark/8 bg-white p-5 sm:flex-row sm:items-center sm:p-6 ${
                      flip ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-bonero-green text-white">
                      <Icon size={22} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-mono text-[10px] font-bold text-bonero-dark/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-heading text-lg text-bonero-dark">{pillar.title}</h3>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-bonero-dark/55">
                        {pillar.body}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-bonero-green/[0.08] px-3 py-1 text-[10px] font-bold text-bonero-green sm:self-center">
                      {pillar.stat}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 — Orta CTA (related/CTA sondan önce; sayfa ortasında) */}
      <section className="border-y border-bonero-green/15 bg-bonero-green/[0.06] py-10 sm:py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="max-w-lg">
            <h2 className="font-heading text-xl text-bonero-dark sm:text-2xl">{t.midCtaTitle}</h2>
            <p className="mt-2 text-sm text-bonero-dark/55 sm:text-base">{t.midCtaBody}</p>
          </div>
          <CtaButton href={PANEL_REGISTER_URL} variant="primary" size="md" icon={<ArrowUpRight size={15} />}>
            {t.midCtaButton}
          </CtaButton>
        </div>
      </section>

      {/* 7 — Karşılaştırma geç (değer gösterildikten sonra pain) */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
            <Reveal>
              <div className="relative h-full overflow-hidden rounded-2xl border border-dashed border-bonero-dark/18 bg-[#f4f6f5] p-5 sm:p-6">
                <p className="text-xs font-bold tracking-wide text-bonero-dark/40 uppercase">
                  {t.paperTitle}
                </p>
                <p className="mt-2 text-sm text-bonero-dark/55">{t.paperLead}</p>
                <ul className="mt-5 space-y-3">
                  {t.paperItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-lg border border-bonero-dark/8 bg-white px-3 py-2.5 text-sm text-bonero-dark/60"
                    >
                      <UserX size={15} className="mt-0.5 shrink-0 text-red-500/55" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rotate-[-1.5deg] rounded-lg border border-bonero-dark/10 bg-white px-4 py-3 shadow-sm">
                  <p className="font-mono text-xs text-bonero-dark/45">??? 14:00 · Ayşe?</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-2xl border-2 border-bonero-green/25 bg-bonero-green/[0.03] p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-bonero-green" />
                  <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">
                    {t.boneroTitle}
                  </p>
                </div>
                <p className="mt-2 text-sm text-bonero-dark/55">{t.boneroLead}</p>
                <div className="mt-5 flex-1 rounded-xl border border-bonero-dark/8 bg-white p-3 shadow-sm">
                  <AppointmentMock active isEn={isEn} variant="compact" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8 — Related + kapanış CTA birleşik (ayrı related bandı yok) */}
      <section className="pb-16 pt-4 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-bonero-dark/10 bg-bonero-dark shadow-[0_32px_64px_rgba(30,41,59,0.2)]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #1e293b 0%, #152a22 50%, #126b38 100%)",
              }}
            />
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.07]" />

            <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[1fr_0.85fr] lg:gap-12 lg:p-10">
              <div>
                <p className="text-[11px] font-bold tracking-[0.16em] text-bonero-green/80 uppercase">
                  {t.ctaEyebrow}
                </p>
                <h2 className="font-heading mt-2 text-2xl tracking-wide text-white sm:text-3xl">
                  {t.ctaTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">{t.ctaBody}</p>
                <ul className="mt-5 space-y-2">
                  {t.ctaBullets.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bonero-green/25">
                        <Check size={11} className="text-white" />
                      </span>
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

              <div className="flex flex-col justify-center">
                <p className="text-xs font-bold tracking-wide text-white/40 uppercase">
                  {t.relatedTitle}
                </p>
                <div className="mt-4 space-y-3">
                  {t.related.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-4 transition-colors hover:border-bonero-green/35 hover:bg-white/10"
                    >
                      <div>
                        <p className="font-heading text-base text-white group-hover:text-bonero-green">
                          {r.label}
                        </p>
                        <p className="mt-1 text-xs text-white/50">{r.body}</p>
                      </div>
                      <ArrowRight
                        size={16}
                        className="shrink-0 text-white/25 group-hover:text-bonero-green"
                      />
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
