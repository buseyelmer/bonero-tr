"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  Filter,
  Inbox,
  Mail,
  MousePointerClick,
  PenLine,
  Send,
  TrendingUp,
  Users,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import EmailHeroVisual from "@/components/features/EmailHeroVisual";
import { useLocale } from "@/components/LocaleProvider";
import { featureHref } from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;
const STEP_HOLD = 4200;

const copy = {
  tr: {
    back: "Tüm özellikler",
    eyebrow: "E-posta pazarlama",
    heroTitle: "Cuma bültenini",
    heroAccent: "tek ekranda kurun.",
    heroLead:
      "Kime gidecek, konu ne, saat kaç — Bonero’da bir arada. Gönderdikten sonra açılma ve tıklama da aynı panelde kalır; Excel + Gmail BCC dönemi biter.",
    heroCtaPrimary: "Kampanya stüdyosunu aç",
    heroCtaSecondary: "Üç kararı gör",
    heroLive: "Zamanlandı · Cum 10:00",
    heroNote: "Segment · A/B konu · ölçüm",
    heroStats: [
      { v: "1.860", l: "alıcı" },
      { v: "%42", l: "açılma" },
      { v: "A/B", l: "konu testi" },
    ],
    defineTitle: "Ne işe yarar?",
    defineBody:
      "Doğru gruba, doğru anda mail göndermek ve sonucunu görmek. Liste CRM’den gelir; kampanya, zamanlama ve ölçüm tek yerde yürür.",
    painTitle: "Dağınık gönderim",
    painLead: "Liste bir dosyada, metin başka yerde, sonuç hiç yok — tanıdık mı?",
    painBefore: "Şimdi",
    painAfter: "Bonero’da",
    painLeft: [
      "Excel’den satır satır kopyala",
      "Gmail’de BCC veya tek tek gönder",
      "Kim açtı bilinmez",
      "Sonraki bülten yine sıfırdan",
    ],
    painRight: [
      "CRM’den hazır segment",
      "Tek panelde konu + saat",
      "Açılma / tıklama canlı",
      "Sonuç bir sonraki gönderimi besler",
    ],
    howTitle: "Gönderim üç karar",
    howLead: "Jargon değil — her kampanyada sorduğunuz üç soru.",
    how: [
      {
        id: "who",
        icon: Filter,
        q: "Kime?",
        title: "Segment",
        body: "Aktif müşteri, yeni lead, randevuya gelmeyen — CRM etiketinden seçersiniz. Karışık Excel listesi değil, canlı grup.",
        ui: [
          { label: "Aktif müşteriler", meta: "1.860", on: true },
          { label: "Yeni lead’ler", meta: "410", on: false },
          { label: "Gelmedi 30g", meta: "124", on: false },
        ],
      },
      {
        id: "what",
        icon: PenLine,
        q: "Ne?",
        title: "Kampanya",
        body: "Konu satırı, gövde ve buton. İki konu yazıp hangisinin daha çok açıldığını A/B ile test edebilirsiniz.",
        ui: [
          { label: "A · Bu haftayı kaçırma", meta: "kazanıyor", on: true },
          { label: "B · Senin için 3 ipucu", meta: "test", on: false },
          { label: "CTA · Randevu al", meta: "buton", on: false },
        ],
      },
      {
        id: "when",
        icon: Send,
        q: "Ne zaman?",
        title: "Gönderim",
        body: "Hemen veya Cuma 10:00. Saat gelince gider; açılma ve tıklama aynı panele düşer.",
        ui: [
          { label: "Cuma 10:00", meta: "slot", on: true },
          { label: "Açılma %42", meta: "sonuç", on: true },
          { label: "Tıklama %8,6", meta: "sonuç", on: false },
        ],
      },
    ],
    studioTitle: "Kampanya stüdyosu",
    studioLead: "Soldan grubu seçin — sağdaki mektup ve alıcı sayısı anında güncellenir.",
    audiences: [
      {
        id: "active",
        name: "Aktif müşteriler",
        count: "1.860",
        note: "Son 30 günde alışveriş veya randevu",
        subject: "Bu haftayı kaçırma",
        preview: "Kısa hatırlatma + bu haftaya özel iki ipucu. Buton randevu takvimini açar.",
        cta: "Randevu al",
      },
      {
        id: "leads",
        name: "Yeni lead’ler",
        count: "410",
        note: "Form / DM’den gelen, henüz müşteri değil",
        subject: "Sizi tanıyalım — 3 soru",
        preview: "İlk temas maili. Kısa tanıtım ve tek CTA: ücretsiz ön görüşme.",
        cta: "Ön görüşme al",
      },
      {
        id: "noshow",
        name: "Gelmedi (30g)",
        count: "124",
        note: "Randevuya gelmeyen — hatırlatma için",
        subject: "Yeni bir slot ayıralım mı?",
        preview: "Kaçırılan randevu için nazik hatırlatma + iki alternatif saat.",
        cta: "Slot seç",
      },
    ],
    studioTo: "Kime",
    studioSubject: "Konu",
    studioSchedule: "Cuma 10:00’a zamanla",
    studioAb: "A/B konu açık",
    resultTitle: "Son Cuma bülteni",
    resultLead: "Export yok — rakamlar kampanya kapandıktan sonra da panelde.",
    results: [
      { v: "%42", l: "açılma", note: "Konu A kazandı", icon: Mail },
      { v: "%8,6", l: "tıklama", note: "CTA: Randevu al", icon: MousePointerClick },
      { v: "1.860", l: "alıcı", note: "Aktif müşteri segmenti", icon: Users },
      { v: "+6sn", l: "ort. okuma", note: "Gövde kısa tutuldu", icon: Clock },
    ],
    chartLabel: "7 günlük açılma",
    chartDays: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
    chartBars: [28, 34, 31, 38, 42, 22, 18],
    useTitle: "Ne zaman kullanılır?",
    useLead: "Bülten, hatırlatma, konu testi — aynı stüdyodan.",
    uses: [
      {
        id: "weekly",
        when: "Her Cuma",
        icon: Calendar,
        title: "Haftalık ipucu maili",
        body: "Aktif gruba şablon seçilir, saat kilitlenir. Elle BCC ve kopyala-yapıştır yok.",
        tag: "1.860 alıcı",
      },
      {
        id: "noshow",
        when: "Randevu kaçınca",
        icon: Clock,
        title: "Otomatik hatırlatma",
        body: "“Gelmedi” etiketiyle yeni slot teklifi gider. Takip listesi tutulmaz.",
        tag: "Drip akışı",
      },
      {
        id: "ab",
        when: "Konu kararsızsa",
        icon: TrendingUp,
        title: "İki konu, bir kazanan",
        body: "Küçük gruba A/B; kazanan kalan listeye otomatik ölçeklenir. Tahmin değil, veri.",
        tag: "A/B test",
      },
    ],
    outcome: "Liste Excel’de kalmaz, gönderim tempo tutar, e-posta ölçülür.",
    ctaTitle: "İlk kampanyayı Bonero’da kurun",
    ctaBody: "Segment CRM’den gelir. Ayrı bir e-posta aracına export yok.",
    ctaPrimary: "Kampanya stüdyosunu aç",
    ctaSecondary: "Paketlere bak",
    related: [
      { href: featureHref("crm"), label: "CRM", icon: Users },
      { href: featureHref("icerik"), label: "İçerik", icon: PenLine },
      { href: featureHref("gelen-kutusu"), label: "Omnichannel", icon: Inbox },
    ],
  },
  en: {
    back: "All features",
    eyebrow: "Email marketing",
    heroTitle: "Build Friday’s newsletter",
    heroAccent: "on one screen.",
    heroLead:
      "Who gets it, what’s the subject, what time — together in Bonero. Opens and clicks stay on the same panel after send; Excel + Gmail BCC is over.",
    heroCtaPrimary: "Open campaign studio",
    heroCtaSecondary: "See the three decisions",
    heroLive: "Scheduled · Fri 10:00",
    heroNote: "Segment · A/B subject · metrics",
    heroStats: [
      { v: "1,860", l: "recipients" },
      { v: "42%", l: "open" },
      { v: "A/B", l: "subject test" },
    ],
    defineTitle: "What is it for?",
    defineBody:
      "Send the right mail to the right group at the right time — and see the result. Lists come from CRM; campaign, schedule, and measurement run in one place.",
    painTitle: "Scattered sending",
    painLead: "List in one file, copy somewhere else, results nowhere — sound familiar?",
    painBefore: "Today",
    painAfter: "In Bonero",
    painLeft: [
      "Copy row by row from Excel",
      "BCC or one-by-one in Gmail",
      "No idea who opened",
      "Next newsletter from scratch again",
    ],
    painRight: [
      "Ready segment from CRM",
      "Subject + time on one panel",
      "Live opens / clicks",
      "Results feed the next send",
    ],
    howTitle: "A send is three decisions",
    howLead: "Not jargon — the three questions every campaign asks.",
    how: [
      {
        id: "who",
        icon: Filter,
        q: "Who?",
        title: "Segment",
        body: "Active customers, new leads, no-shows — pick from CRM tags. Not a messy Excel dump, a live group.",
        ui: [
          { label: "Active customers", meta: "1,860", on: true },
          { label: "New leads", meta: "410", on: false },
          { label: "No-show 30d", meta: "124", on: false },
        ],
      },
      {
        id: "what",
        icon: PenLine,
        q: "What?",
        title: "Campaign",
        body: "Subject, body, and button. Write two subjects and A/B which opens more.",
        ui: [
          { label: "A · Don’t miss this week", meta: "winning", on: true },
          { label: "B · 3 tips for you", meta: "test", on: false },
          { label: "CTA · Book", meta: "button", on: false },
        ],
      },
      {
        id: "when",
        icon: Send,
        q: "When?",
        title: "Send",
        body: "Now or Friday 10:00. It goes out on time; opens and clicks land on the same panel.",
        ui: [
          { label: "Friday 10:00", meta: "slot", on: true },
          { label: "Open 42%", meta: "result", on: true },
          { label: "Click 8.6%", meta: "result", on: false },
        ],
      },
    ],
    studioTitle: "Campaign studio",
    studioLead: "Pick a group on the left — the letter and recipient count update instantly.",
    audiences: [
      {
        id: "active",
        name: "Active customers",
        count: "1,860",
        note: "Purchase or booking in last 30 days",
        subject: "Don’t miss this week",
        preview: "Short reminder + two tips for this week. The button opens the booking calendar.",
        cta: "Book",
      },
      {
        id: "leads",
        name: "New leads",
        count: "410",
        note: "From form / DM, not customers yet",
        subject: "Let’s meet — 3 questions",
        preview: "First-touch mail. Short intro and one CTA: free intro call.",
        cta: "Book intro",
      },
      {
        id: "noshow",
        name: "No-show (30d)",
        count: "124",
        note: "Missed appointment — for reminders",
        subject: "Shall we set a new slot?",
        preview: "Gentle reminder for the missed booking + two alternative times.",
        cta: "Pick a slot",
      },
    ],
    studioTo: "To",
    studioSubject: "Subject",
    studioSchedule: "Schedule for Friday 10:00",
    studioAb: "A/B subject on",
    resultTitle: "Last Friday’s send",
    resultLead: "No export — numbers stay on the panel after the campaign closes.",
    results: [
      { v: "42%", l: "open", note: "Subject A won", icon: Mail },
      { v: "8.6%", l: "click", note: "CTA: Book", icon: MousePointerClick },
      { v: "1,860", l: "recipients", note: "Active customer segment", icon: Users },
      { v: "+6s", l: "avg read", note: "Body kept short", icon: Clock },
    ],
    chartLabel: "7-day opens",
    chartDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    chartBars: [28, 34, 31, 38, 42, 22, 18],
    useTitle: "When do you use it?",
    useLead: "Newsletter, reminder, subject test — same studio.",
    uses: [
      {
        id: "weekly",
        when: "Every Friday",
        icon: Calendar,
        title: "Weekly tips mail",
        body: "Pick a template for the active group, lock the time. No manual BCC or copy-paste.",
        tag: "1,860 recipients",
      },
      {
        id: "noshow",
        when: "After a no-show",
        icon: Clock,
        title: "Automatic reminder",
        body: "New slot offer goes to the no-show tag. No chase list.",
        tag: "Drip flow",
      },
      {
        id: "ab",
        when: "Unsure on subject",
        icon: TrendingUp,
        title: "Two subjects, one winner",
        body: "A/B on a small group; winner scales to the rest automatically. Data, not guesses.",
        tag: "A/B test",
      },
    ],
    outcome: "Lists leave Excel, send cadence holds, email gets measured.",
    ctaTitle: "Build the first campaign in Bonero",
    ctaBody: "Segments come from CRM. No export to a separate ESP.",
    ctaPrimary: "Open campaign studio",
    ctaSecondary: "View plans",
    related: [
      { href: featureHref("crm"), label: "CRM", icon: Users },
      { href: featureHref("icerik"), label: "Content", icon: PenLine },
      { href: featureHref("gelen-kutusu"), label: "Omnichannel", icon: Inbox },
    ],
  },
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
          transition={{
            duration: 2.2,
            delay: 0.9,
            repeat: Infinity,
            repeatDelay: 3.2,
            ease: "easeInOut",
          }}
          aria-hidden
        />
      </motion.span>
    </h1>
  );
}

export default function EmailFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const t = copy[locale];
  const [howId, setHowId] = useState("who");
  const [audience, setAudience] = useState("active");
  const [useId, setUseId] = useState("weekly");
  const [paused, setPaused] = useState(false);

  const how = t.how.find((h) => h.id === howId) ?? t.how[0];
  const selected = t.audiences.find((a) => a.id === audience) ?? t.audiences[0];
  const useCase = t.uses.find((u) => u.id === useId) ?? t.uses[0];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setHowId((prev) => {
        const i = t.how.findIndex((h) => h.id === prev);
        return t.how[(i + 1) % t.how.length].id;
      });
    }, STEP_HOLD);
    return () => clearInterval(id);
  }, [paused, t.how]);

  return (
    <div className="overflow-x-clip bg-background">
      {/* Hero */}
      <section className="relative overflow-x-clip pb-14 pt-24 sm:pb-16 sm:pt-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 12% -5%, rgba(24,131,71,0.14), transparent 55%), radial-gradient(ellipse 45% 40% at 92% 35%, rgba(24,131,71,0.07), transparent 50%), radial-gradient(ellipse 40% 35% at 50% 100%, rgba(30,41,59,0.04), transparent 55%)",
          }}
        />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />
        <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden />
        <motion.div
          className="pointer-events-none absolute -left-16 top-1/4 h-56 w-56 rounded-full bg-bonero-green/10 blur-3xl"
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -right-20 bottom-1/4 h-48 w-48 rounded-full bg-bonero-dark/5 blur-3xl"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div className="min-w-0">
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
                <Mail size={12} />
                {t.eyebrow}
              </motion.p>

              <HeroHeadline title={t.heroTitle} accent={t.heroAccent} />

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                className="mt-5 max-w-lg text-base leading-relaxed text-bonero-dark/55 sm:text-lg"
              >
                {t.heroLead}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.28, ease }}
                className="mt-5 flex flex-wrap items-center gap-3"
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
                className="mt-6 flex flex-wrap gap-2"
              >
                {t.heroStats.map((s, i) => (
                  <motion.div
                    key={s.l}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.38 + i * 0.06, ease }}
                    whileHover={{ y: -2 }}
                    className="rounded-xl border border-bonero-dark/8 bg-white/90 px-3.5 py-2.5 shadow-sm backdrop-blur-sm"
                  >
                    <p className="font-heading text-lg text-bonero-green">{s.v}</p>
                    <p className="text-[10px] text-bonero-dark/45">{s.l}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.42, ease }}
                className="mt-8 flex flex-wrap gap-3"
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
                  href="#kararlar"
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
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="relative min-w-0"
            >
              <motion.div
                className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-bonero-green/20 via-bonero-green/5 to-transparent blur-md"
                animate={{ opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              <EmailHeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Define */}
      <section className="border-t border-bonero-dark/8 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-bonero-green/20 bg-bonero-green/[0.04] p-5 sm:p-6">
              <div className="absolute top-0 left-0 h-full w-1 bg-bonero-green" />
              <p className="pl-3 font-heading text-base text-bonero-dark sm:text-lg">{t.defineTitle}</p>
              <p className="mt-2 max-w-3xl pl-3 text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
                {t.defineBody}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pain — split panels */}
      <section className="border-y border-bonero-dark/8 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.painTitle}
            </h2>
            <p className="mt-3 text-sm text-bonero-dark/50 sm:text-base">{t.painLead}</p>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-bonero-dark/10 bg-[#f6f8f7] p-6 sm:p-7">
                <p className="text-[10px] font-bold tracking-wide text-bonero-dark/35 uppercase">
                  {t.painBefore}
                </p>
                <ul className="mt-5 space-y-4">
                  {t.painLeft.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, ease }}
                      className="flex items-start gap-3 text-sm text-bonero-dark/45"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bonero-dark/25" />
                      <span className="line-through decoration-bonero-dark/20">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl border border-bonero-green/25 bg-bonero-green/[0.04] p-6 sm:p-7 shadow-sm">
                <p className="text-[10px] font-bold tracking-wide text-bonero-green uppercase">
                  {t.painAfter}
                </p>
                <ul className="mt-5 space-y-4">
                  {t.painRight.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, ease }}
                      className="flex items-start gap-3 text-sm font-medium text-bonero-dark"
                    >
                      <Check size={15} className="mt-0.5 shrink-0 text-bonero-green" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Üç karar — interaktif + UI preview */}
      <section id="kararlar" className="scroll-mt-24 bg-[#f6f8f7] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.howTitle}
            </h2>
            <p className="mt-3 text-sm text-bonero-dark/50 sm:text-base">{t.howLead}</p>
          </Reveal>

          <div
            className="mt-10 overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white shadow-sm lg:grid lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="flex border-b border-bonero-dark/8 lg:flex-col lg:border-r lg:border-b-0">
              {t.how.map((h) => {
                const Icon = h.icon;
                const active = h.id === howId;
                return (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setHowId(h.id)}
                    className={`relative flex min-w-0 flex-1 flex-col gap-2 px-3 py-4 text-left transition-colors sm:px-5 sm:py-5 lg:flex-row lg:items-start ${
                      active ? "bg-bonero-green/[0.05]" : "hover:bg-[#f8faf9]"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="email-how"
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-bonero-green lg:inset-y-0 lg:right-auto lg:left-0 lg:h-auto lg:w-0.5"
                      />
                    )}
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        active
                          ? "bg-bonero-green text-white shadow-md shadow-bonero-green/25"
                          : "bg-bonero-dark/5 text-bonero-dark/40"
                      }`}
                    >
                      <Icon size={17} />
                    </span>
                    <div className="min-w-0">
                      <p className={`font-heading text-lg ${active ? "text-bonero-dark" : "text-bonero-dark/45"}`}>
                        {h.q}
                      </p>
                      <p className="mt-0.5 hidden text-[11px] text-bonero-dark/40 lg:block">{h.title}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={howId}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.28, ease }}
                className="grid gap-6 p-5 sm:grid-cols-[minmax(0,1fr)_240px] sm:p-8"
              >
                <div>
                  <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">{how.title}</p>
                  <h3 className="font-heading mt-2 text-2xl text-bonero-dark sm:text-3xl">{how.q}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-bonero-dark/55">{how.body}</p>
                  <div className="mt-5 h-1 overflow-hidden rounded-full bg-bonero-dark/8">
                    <motion.div
                      className="h-full bg-bonero-green"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: paused ? 0 : STEP_HOLD / 1000,
                        ease: "linear",
                      }}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-bonero-dark/8 bg-[#f8faf9] p-3.5">
                  <p className="mb-2.5 text-[9px] font-bold tracking-wide text-bonero-dark/35 uppercase">
                    {isEn ? "Panel preview" : "Panel önizleme"}
                  </p>
                  <div className="space-y-2">
                    {how.ui.map((row, i) => (
                      <motion.div
                        key={row.label}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07, ease }}
                        className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${
                          row.on
                            ? "border-bonero-green/30 bg-white shadow-sm"
                            : "border-bonero-dark/6 bg-white/50"
                        }`}
                      >
                        <span className={`text-xs font-semibold ${row.on ? "text-bonero-dark" : "text-bonero-dark/40"}`}>
                          {row.label}
                        </span>
                        <span className={`font-mono text-[10px] ${row.on ? "text-bonero-green" : "text-bonero-dark/30"}`}>
                          {row.meta}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Studio */}
      <section className="border-y border-bonero-dark/8 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.studioTitle}
            </h2>
            <p className="mt-3 text-sm text-bonero-dark/50">{t.studioLead}</p>
          </Reveal>

          <div className="mt-10 overflow-hidden rounded-2xl border border-bonero-dark/10 shadow-lg shadow-bonero-dark/5 lg:grid lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
            <div className="border-b border-bonero-dark/8 bg-bonero-dark lg:border-r lg:border-b-0">
              <div className="border-b border-white/10 px-5 py-3.5">
                <p className="font-mono text-[10px] font-semibold tracking-wide text-white/40 uppercase">
                  {isEn ? "Audience" : "Kitle"}
                </p>
              </div>
              <div className="p-3 space-y-1.5">
                {t.audiences.map((a) => {
                  const on = a.id === audience;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setAudience(a.id)}
                      className={`w-full rounded-xl px-3.5 py-3 text-left transition-colors ${
                        on ? "bg-white text-bonero-dark" : "text-white/65 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-semibold">{a.name}</span>
                        <span className={`font-mono text-xs ${on ? "text-bonero-green" : "text-white/30"}`}>
                          {a.count}
                        </span>
                      </div>
                      <p className={`mt-1 text-[11px] leading-snug ${on ? "text-bonero-dark/45" : "text-white/30"}`}>
                        {a.note}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={audience}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease }}
                className="flex flex-col bg-[#f9fafb]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-bonero-dark/8 bg-white px-5 py-3">
                  <div className="flex items-center gap-2 text-xs text-bonero-dark/45">
                    <Mail size={13} className="text-bonero-green" />
                    <span>{t.studioTo}</span>
                    <span className="font-semibold text-bonero-green">{selected.name}</span>
                    <span className="font-mono text-bonero-dark/35">{selected.count}</span>
                  </div>
                  <span className="rounded-full bg-bonero-green/10 px-2.5 py-0.5 text-[10px] font-bold text-bonero-green">
                    {t.studioAb}
                  </span>
                </div>

                <div className="flex-1 space-y-4 p-5 sm:p-7">
                  <div>
                    <p className="text-[10px] font-bold tracking-wide text-bonero-dark/35 uppercase">
                      {t.studioSubject}
                    </p>
                    <p className="font-heading mt-1.5 text-xl text-bonero-dark sm:text-2xl">{selected.subject}</p>
                  </div>

                  <div className="rounded-2xl border border-bonero-dark/8 bg-white p-5 shadow-sm">
                    <p className="text-sm leading-relaxed text-bonero-dark/60">{selected.preview}</p>
                    <div className="mt-5 inline-flex rounded-xl bg-bonero-green px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-bonero-green/20">
                      {selected.cta}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <p className="text-xs text-bonero-dark/40">{selected.note}</p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl bg-bonero-dark px-4 py-2.5 text-xs font-semibold text-white"
                    >
                      <Calendar size={13} />
                      {t.studioSchedule}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Results + chart */}
      <section className="bg-[#f6f8f7] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.resultTitle}
            </h2>
            <p className="mt-3 text-sm text-bonero-dark/50">{t.resultLead}</p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <Reveal>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {t.results.map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <motion.div
                      key={r.l}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, ease }}
                      className="rounded-2xl border border-bonero-dark/8 bg-white p-4 shadow-sm sm:p-5"
                    >
                      <Icon size={16} className="text-bonero-green" />
                      <p className="font-heading mt-3 text-3xl tracking-tight text-bonero-dark sm:text-4xl">
                        {r.v}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-bonero-dark">{r.l}</p>
                      <p className="mt-1 text-[11px] text-bonero-dark/40">{r.note}</p>
                    </motion.div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-bonero-dark/8 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] font-bold tracking-wide text-bonero-dark/35 uppercase">
                    {t.chartLabel}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-bonero-green">
                    <TrendingUp size={12} />
                    Cum · %42
                  </span>
                </div>
                <div className="mt-6 flex flex-1 items-end gap-2 sm:gap-2.5">
                  {t.chartBars.map((h, i) => (
                    <div key={t.chartDays[i]} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                      <motion.div
                        className="w-full rounded-t-md bg-bonero-green origin-bottom"
                        initial={{ height: 8 }}
                        whileInView={{
                          height: Math.max(12, Math.round((h / 50) * 140)),
                          opacity: i === 4 ? 1 : 0.4 + i * 0.07,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.05, ease }}
                      />
                      <span
                        className={`font-mono text-[9px] ${
                          i === 4 ? "font-bold text-bonero-green" : "text-bonero-dark/35"
                        }`}
                      >
                        {t.chartDays[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="border-t border-bonero-dark/8 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.useTitle}
            </h2>
            <p className="mt-3 text-sm text-bonero-dark/50">{t.useLead}</p>
          </Reveal>

          <div className="mt-10 overflow-hidden rounded-2xl border border-bonero-dark/10 bg-[#f8faf9] shadow-sm">
            <div className="grid grid-cols-1 divide-y divide-bonero-dark/8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {t.uses.map((u) => {
                const Icon = u.icon;
                const active = u.id === useId;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setUseId(u.id)}
                    className={`relative px-4 py-5 text-left transition-colors sm:px-5 ${
                      active ? "bg-white" : "hover:bg-white/70"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="email-use"
                        className="absolute inset-x-0 top-0 h-0.5 bg-bonero-green sm:inset-x-auto sm:inset-y-0 sm:left-0 sm:h-auto sm:w-0.5"
                      />
                    )}
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        active ? "bg-bonero-green text-white" : "bg-bonero-dark/5 text-bonero-dark/40"
                      }`}
                    >
                      <Icon size={17} />
                    </span>
                    <p className="mt-3 font-mono text-[10px] font-semibold text-bonero-green">{u.when}</p>
                    <p className={`mt-1 text-sm font-bold ${active ? "text-bonero-dark" : "text-bonero-dark/50"}`}>
                      {u.title}
                    </p>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={useId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease }}
                className="border-t border-bonero-dark/8 bg-white p-5 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-bonero-green/10 px-2.5 py-0.5 text-[10px] font-bold text-bonero-green">
                    {useCase.tag}
                  </span>
                  <span className="font-mono text-[10px] text-bonero-dark/35">{useCase.when}</span>
                </div>
                <h3 className="font-heading mt-3 text-xl text-bonero-dark sm:text-2xl">{useCase.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bonero-dark/55">{useCase.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-bonero-dark/8 bg-bonero-dark py-14 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">
                {isEn ? "Outcome" : "Sonuç"}
              </p>
              <p className="font-heading mt-2 max-w-xl text-xl text-white sm:text-2xl">{t.outcome}</p>
              <h2 className="font-heading mt-8 text-2xl tracking-wide sm:text-3xl">{t.ctaTitle}</h2>
              <p className="mt-2 text-sm text-white/50">{t.ctaBody}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {t.related.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/65 hover:border-bonero-green/40 hover:text-white"
                  >
                    <r.icon size={12} />
                    {r.label}
                    <ArrowRight size={11} className="opacity-40" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <CtaButton href={PANEL_REGISTER_URL} variant="inverse" size="md" icon={<ArrowUpRight size={15} />}>
                {t.ctaPrimary}
              </CtaButton>
              <CtaButton href="/paketler" variant="outline-light" size="md">
                {t.ctaSecondary}
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
