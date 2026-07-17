"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  Check,
  Columns3,
  Contact,
  Inbox,
  LayoutGrid,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import CrmMock from "@/components/features/mocks/CrmMock";
import { useLocale } from "@/components/LocaleProvider";
import { featureHref } from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;

const copy = {
  tr: {
    back: "Tüm özellikler",
    heroEyebrow: "Müşteri & lead yönetimi",
    defineTitle: "CRM nedir?",
    defineBody:
      "CRM (Customer Relationship Management), müşteri adaylarını — yani lead'leri — ve mevcut müşterilerinizi tek yerde takip etmenizi sağlayan sistemdir. Excel listesi yerine pano kullanırsınız; her kişinin hangi kanaldan geldiği, hangi aşamada olduğu ve ne zaman tekrar aranacağı tek kartta görünür.",
    heroTitle: "Her talep bir kart.",
    heroAccent: "Takip kaçmaz, lead soğumaz.",
    heroLead:
      "WhatsApp sorusu, Instagram DM veya web formu — Bonero'da hepsi müşteri kaydına dönüşür. Ekip kiminle konuşacağını bilir; mesaj geçmişi kartta kalır.",
    heroFlow: ["WhatsApp", "Instagram", "Form", "Kart", "Pipeline"],
    heroCtaPrimary: "CRM'yi dene",
    heroCtaSecondary: "Nasıl çalışır?",
    mockCaption: "Pipeline özeti + örnek müşteri kartı",
    blocksTitle: "CRM üç parçadan oluşur",
    blocksLead: "Kavramları bilmiyorsanız endişe yok — günlük dilde şöyle düşünün:",
    blocks: [
      {
        icon: Contact,
        term: "Lead",
        short: "Potansiyel müşteri",
        body: "Henüz satın almamış ama ilgi gösteren kişi. DM, form veya telefon — nereden gelirse gelsin kart açılır.",
      },
      {
        icon: Columns3,
        term: "Pipeline",
        short: "Satış panosu",
        body: "Lead'lerin hangi aşamada olduğunu gösteren sütunlar. Kaç kişi yeni, kaçı teklif aşamasında — tek bakışta net.",
      },
      {
        icon: LayoutGrid,
        term: "Kart",
        short: "Tek müşteri dosyası",
        body: "İsim, kanal, mesaj geçmişi, etiket ve sonraki adım aynı yerde. 'Bu kişi kimdi?' avı biter.",
      },
    ],
    pipelineTitle: "Pipeline nasıl işler?",
    pipelineLead:
      "Lead'ler sütunlar arasında ilerler. Kartı sürüklersiniz veya aşamayı güncellersiniz — ekip aynı panoyu görür.",
    stages: [
      {
        id: "new",
        name: "Yeni",
        count: 8,
        explain: "İlk kez yazan veya form dolduran kişi. Henüz görüşme başlamamış olabilir.",
        example: "“Fiyat alabilir miyim?” — Instagram DM",
      },
      {
        id: "warm",
        name: "İlgili",
        count: 5,
        explain: "Yanıt verdiniz, ilgi devam ediyor. Sahip atanır, sonraki adım yazılır.",
        example: "Yarın 11:00 arama planlandı",
      },
      {
        id: "offer",
        name: "Teklif",
        count: 3,
        explain: "Fiyat, demo veya teklif aşaması. Burada takılan lead'ler haftalık toplantıda görünür.",
        example: "Demo sonrası teklif gönderilecek",
      },
      {
        id: "won",
        name: "Kazanıldı",
        count: 2,
        explain: "Satış tamamlandı. Rapor güncellenir, müşteri destek veya onboarding'e geçer.",
        example: "Sözleşme imzalandı",
      },
    ],
    cardTitle: "Kartta neler var?",
    cardLead: "Tek lead, tüm bağlam — inbox'tan CRM'e geçince bilgi kaybolmaz.",
    cardPoints: [
      {
        title: "Kanal & kaynak",
        body: "DM mi, form mu, WhatsApp mı — nereden geldiği kartın üstünde yazar.",
      },
      {
        title: "Mesaj geçmişi",
        body: "Inbox konuşması karta bağlıdır. Satış görüşmesine geçmişi okuyarak girersiniz.",
      },
      {
        title: "Sonraki adım",
        body: "Ne zaman aranacak, ne gönderilecek — gecikince pano uyarı verir.",
      },
    ],
    scenariosTitle: "Gündelikte nasıl kullanılır?",
    scenarios: [
      {
        label: "Yeni lead",
        text: "DM gelir, kart açılır, etiket atanır — aynı gün takip görevi oluşur.",
      },
      {
        label: "Satış görüşmesi",
        text: "Geçmiş mesajlar kartta; görüşmeye hazırlıklı girersiniz.",
      },
      {
        label: "Haftalık kontrol",
        text: "Pipeline'da takılan aşamalar görünür; ekip eforu oraya kaydırır.",
      },
    ],
    contrastTitle: "Excel listesi yerine",
    contrastLead: "Spreadsheet'te lead satır numarası olur; Bonero'da sahip, aşama ve sonraki adım kartta kalır.",
    contrastWithout: ["Kim sahiplenmiş belli değil", "Son görüşme 3 hafta önce", "847. satırda unutulmuş"],
    contrastWith: ["Sahip: Can · Satış", "Sonraki: Yarın 11:00 ara", "Aşama: İlgili · VIP"],
    outcomeLabel: "Sonuç",
    outcome: "Lead kaybı azalır, takip düzenli olur, satış konuşmaları bağlamlı ilerler.",
    closingPrimary: "Ücretsiz dene",
    closingSecondary: "Paketlere bak",
    related: [
      { href: featureHref("gelen-kutusu"), label: "Omnichannel", icon: Inbox },
      { href: featureHref("randevu"), label: "Randevu", icon: Calendar },
      { href: featureHref("raporlama"), label: "Raporlama", icon: BarChart3 },
    ],
  },
  en: {
    back: "All features",
    heroEyebrow: "Customer & lead management",
    defineTitle: "What is CRM?",
    defineBody:
      "CRM (Customer Relationship Management) is the system that lets you track prospects — leads — and existing customers in one place. Instead of a spreadsheet, you use a board; each person's channel, stage, and next follow-up live on a single card.",
    heroTitle: "Every request becomes a card.",
    heroAccent: "Follow-ups stick, leads don't go cold.",
    heroLead:
      "A WhatsApp question, Instagram DM, or web form — in Bonero it all becomes a customer record. The team knows who to talk to; message history stays on the card.",
    heroFlow: ["WhatsApp", "Instagram", "Form", "Card", "Pipeline"],
    heroCtaPrimary: "Try CRM",
    heroCtaSecondary: "How it works",
    mockCaption: "Pipeline summary + sample customer card",
    blocksTitle: "CRM has three parts",
    blocksLead: "Never used CRM? In plain terms:",
    blocks: [
      {
        icon: Contact,
        term: "Lead",
        short: "Potential customer",
        body: "Someone interested who hasn't bought yet. DM, form, or phone — a card opens wherever they come from.",
      },
      {
        icon: Columns3,
        term: "Pipeline",
        short: "Sales board",
        body: "Columns showing where leads sit. How many are new, how many in proposal — clear at a glance.",
      },
      {
        icon: LayoutGrid,
        term: "Card",
        short: "One customer file",
        body: "Name, channel, message history, tags, and next step in one place. No more “who was this?” hunts.",
      },
    ],
    pipelineTitle: "How does the pipeline work?",
    pipelineLead:
      "Leads move between columns. Drag the card or update the stage — the whole team sees the same board.",
    stages: [
      {
        id: "new",
        name: "New",
        count: 8,
        explain: "First message or form submission. Conversation may not have started yet.",
        example: "“Can I get pricing?” — Instagram DM",
      },
      {
        id: "warm",
        name: "Warm",
        count: 5,
        explain: "You replied, interest continues. Owner assigned, next step set.",
        example: "Call scheduled for tomorrow 11am",
      },
      {
        id: "offer",
        name: "Offer",
        count: 3,
        explain: "Pricing, demo, or proposal stage. Leads stuck here show up in weekly review.",
        example: "Send quote after demo",
      },
      {
        id: "won",
        name: "Won",
        count: 2,
        explain: "Deal closed. Reporting updates; customer moves to support or onboarding.",
        example: "Contract signed",
      },
    ],
    cardTitle: "What's on the card?",
    cardLead: "One lead, full context — nothing lost when moving from inbox to CRM.",
    cardPoints: [
      {
        title: "Channel & source",
        body: "DM, form, or WhatsApp — where they came from sits at the top of the card.",
      },
      {
        title: "Message history",
        body: "Inbox thread linked to the card. Walk into sales calls having read the history.",
      },
      {
        title: "Next step",
        body: "When to call, what to send — the board alerts you when it's overdue.",
      },
    ],
    scenariosTitle: "How teams use it day to day",
    scenarios: [
      {
        label: "New lead",
        text: "DM arrives, card opens, tag applied — follow-up task the same day.",
      },
      {
        label: "Sales call",
        text: "Past messages on the card — you walk in prepared.",
      },
      {
        label: "Weekly review",
        text: "Stuck pipeline stages show up; the team shifts effort there.",
      },
    ],
    contrastTitle: "Instead of a spreadsheet",
    contrastLead: "In a sheet a lead is a row number; in Bonero owner, stage, and next step stay on the card.",
    contrastWithout: ["No clear owner", "Last touch 3 weeks ago", "Forgotten on row 847"],
    contrastWith: ["Owner: Can · Sales", "Next: Call tomorrow 11am", "Stage: Warm · VIP"],
    outcomeLabel: "Outcome",
    outcome: "Fewer lost leads, steady follow-ups, sales talks with full context.",
    closingPrimary: "Try free",
    closingSecondary: "View plans",
    related: [
      { href: featureHref("gelen-kutusu"), label: "Omnichannel", icon: Inbox },
      { href: featureHref("randevu"), label: "Appointments", icon: Calendar },
      { href: featureHref("raporlama"), label: "Reporting", icon: BarChart3 },
    ],
  },
};

type StageId = "new" | "warm" | "offer" | "won";

const defineKeywords = {
  tr: ["Lead", "Pipeline", "Kart", "Pano"],
  en: ["Lead", "Pipeline", "Card", "Board"],
};

function DefineHeroCard({ isEn, title, body }: { isEn: boolean; title: string; body: string }) {
  const keywords = defineKeywords[isEn ? "en" : "tr"];
  const [keywordIdx, setKeywordIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setKeywordIdx((i) => (i + 1) % keywords.length), 2400);
    return () => clearInterval(id);
  }, [keywords.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease }}
      className="relative overflow-hidden rounded-[1.75rem] p-[1px]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-80"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(24,131,71,0.5), rgba(255,255,255,0.08), rgba(24,131,71,0.35), rgba(255,255,255,0.05))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative overflow-hidden rounded-[1.72rem] bg-[#0c1512] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 15% 0%, rgba(24,131,71,0.35), transparent 55%), radial-gradient(ellipse 50% 40% at 95% 80%, rgba(24,131,71,0.15), transparent 50%)",
          }}
        />
        <motion.div
          className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-bonero-green/20 blur-3xl"
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.12, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-emerald-400/10 blur-3xl"
          animate={{ opacity: [0.2, 0.45, 0.2], x: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute h-1 w-1 rounded-full bg-bonero-green/60"
            style={{ top: `${18 + i * 13}%`, left: `${8 + i * 14}%` }}
            animate={{ opacity: [0.15, 0.7, 0.15], y: [0, -8, 0] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-bonero-green/30 bg-bonero-green/10 px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-bonero-green uppercase"
            >
              <Sparkles size={12} />
              Customer Relationship Management
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, ease }}
              className="font-heading mt-5 text-3xl tracking-wide text-white sm:text-4xl lg:text-[2.75rem]"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ease }}
              className="mt-5 max-w-2xl text-base leading-[1.75] text-white/55 sm:text-lg"
            >
              {body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, ease }}
              className="mt-6 flex items-center gap-3 lg:hidden"
            >
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-bonero-green/25 bg-bonero-green/10">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={keywords[keywordIdx]}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    className="text-[10px] font-bold text-bonero-green"
                  >
                    {keywords[keywordIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="text-xs text-white/40">
                {isEn ? "Rotating core concepts" : "Dönen temel kavramlar"}
              </p>
            </motion.div>
          </div>

          <div className="hidden shrink-0 lg:block">
            <div className="relative h-36 w-36">
              <motion.div
                className="absolute inset-0 rounded-full border border-bonero-green/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-3 rounded-full border border-dashed border-white/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-bold tracking-widest text-white/35 uppercase">
                  {isEn ? "Core" : "Öz"}
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={keywords[keywordIdx]}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease }}
                    className="font-heading mt-1 text-2xl text-bonero-green"
                  >
                    {keywords[keywordIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.8, ease }}
          className="relative mt-8 h-px origin-left bg-gradient-to-r from-bonero-green/60 via-white/10 to-transparent"
        />
      </div>
    </motion.div>
  );
}

function FlowStrip({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {steps.map((step, i) => (
        <motion.span
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.08, ease }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <motion.span
            whileHover={{ scale: 1.04, borderColor: "rgba(24,131,71,0.35)" }}
            className="rounded-xl border border-bonero-dark/10 bg-white px-3 py-1.5 text-xs font-semibold text-bonero-dark/65 shadow-sm"
          >
            {step}
          </motion.span>
          {i < steps.length - 1 && (
            <motion.span
              animate={{ x: [0, 3, 0], opacity: [0.35, 0.8, 0.35] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
            >
              <ArrowRight size={14} className="text-bonero-green" />
            </motion.span>
          )}
        </motion.span>
      ))}
    </div>
  );
}

function FloatingMock({ isEn, caption }: { isEn: boolean; caption: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease }}
      className="relative min-w-0"
    >
      <motion.div
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-bonero-green/10 blur-2xl"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white p-4 shadow-[0_32px_64px_-36px_rgba(30,41,59,0.35)] sm:p-5"
      >
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bonero-green/50 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
        <CrmMock active isEn={isEn} variant="full" />
      </motion.div>
      <p className="mt-4 text-center text-[11px] text-bonero-dark/40">{caption}</p>
    </motion.div>
  );
}

function StageCount({ value, active }: { value: number; active: boolean }) {
  return (
    <motion.span
      key={`${value}-${active}`}
      initial={{ scale: 0.85, opacity: 0.6 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="font-heading inline-block text-2xl text-bonero-dark"
    >
      {value}
    </motion.span>
  );
}

export default function CrmFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const t = copy[locale];
  const [activeStage, setActiveStage] = useState<StageId>("warm");
  const active = t.stages.find((s) => s.id === activeStage) ?? t.stages[1];

  return (
    <div className="overflow-x-clip bg-[#f8faf9]">
      {/* 1 — Hero: ferah tanım kartı + alt satır */}
      <section className="relative overflow-x-clip pb-16 pt-24 sm:pb-24 sm:pt-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(24,131,71,0.11), transparent 60%)",
          }}
        />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-bonero-dark/45 hover:text-bonero-dark"
          >
            <ArrowLeft size={14} />
            {t.back}
          </Link>

          <div className="mt-8 lg:mt-10">
            <DefineHeroCard isEn={isEn} title={t.defineTitle} body={t.defineBody} />
          </div>

          <div className="mt-14 grid items-center gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0 space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, ease }}
                className="text-xs font-bold tracking-[0.14em] text-bonero-green uppercase"
              >
                {t.heroEyebrow}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, ease }}
                className="font-heading text-3xl leading-[1.1] tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.85rem]"
              >
                {t.heroTitle}
                <span className="mt-2 block bg-gradient-to-r from-bonero-green to-emerald-500 bg-clip-text text-transparent">
                  {t.heroAccent}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, ease }}
                className="max-w-lg text-base leading-relaxed text-bonero-dark/55 sm:text-lg"
              >
                {t.heroLead}
              </motion.p>

              <FlowStrip steps={t.heroFlow} />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, ease }}
                className="flex flex-wrap gap-3 pt-2"
              >
                <Link
                  href={PANEL_REGISTER_URL}
                  className="group inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-bonero-green/25 transition-transform hover:scale-[1.02] hover:bg-bonero-green/90"
                >
                  {t.heroCtaPrimary}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
                <a
                  href="#nasil"
                  className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70 shadow-sm hover:border-bonero-green/25"
                >
                  {t.heroCtaSecondary}
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

            <FloatingMock isEn={isEn} caption={t.mockCaption} />
          </div>
        </div>
      </section>

      {/* 2 — Üç kavram */}
      <section id="nasil" className="scroll-mt-24 border-y border-bonero-dark/8 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.blocksTitle}
            </h2>
            <p className="mt-3 text-sm text-bonero-dark/50 sm:text-base">{t.blocksLead}</p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {t.blocks.map((block, i) => (
              <Reveal key={block.term} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-bonero-dark/8 bg-[#f8faf9] p-6"
                >
                  <motion.div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-bonero-green/10 blur-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <motion.span
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                    transition={{ duration: 0.45 }}
                    className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green"
                  >
                    <block.icon size={20} />
                  </motion.span>
                  <p className="relative mt-5 font-mono text-[10px] font-bold tracking-widest text-bonero-green uppercase">
                    {block.term}
                  </p>
                  <p className="relative font-heading mt-1.5 text-xl text-bonero-dark">{block.short}</p>
                  <p className="relative mt-3 text-sm leading-relaxed text-bonero-dark/55">{block.body}</p>
                  <motion.div className="absolute bottom-0 left-0 h-0.5 w-0 bg-bonero-green transition-all duration-300 group-hover:w-full" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Pipeline */}
      <section className="relative overflow-x-clip py-16 sm:py-20">
        <motion.div
          className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 rounded-full bg-bonero-green/5 blur-3xl"
          animate={{ opacity: [0.3, 0.55, 0.3], x: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.pipelineTitle}
            </h2>
            <p className="mt-3 text-sm text-bonero-dark/50 sm:text-base">{t.pipelineLead}</p>
          </Reveal>

          <div className="mt-12 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-start">
            <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              <div
                className="pointer-events-none absolute top-[2.75rem] right-[8%] left-[8%] hidden h-0.5 bg-bonero-dark/8 sm:block lg:right-[12%] lg:left-[12%]"
                aria-hidden
              />
              {t.stages.map((stage, i) => {
                const selected = stage.id === activeStage;
                const stageIndex = t.stages.findIndex((s) => s.id === activeStage);
                const passed = i <= stageIndex;
                return (
                  <motion.button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveStage(stage.id as StageId)}
                    layout
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative z-10 rounded-2xl border p-5 text-left transition-colors ${
                      selected
                        ? "border-bonero-green bg-white shadow-lg shadow-bonero-green/10 ring-1 ring-bonero-green/20"
                        : "border-bonero-dark/10 bg-white/80 hover:border-bonero-green/25"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`text-[10px] font-bold uppercase ${
                          selected ? "text-bonero-green" : "text-bonero-dark/35"
                        }`}
                      >
                        {stage.name}
                      </p>
                      {passed && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-2 w-2 rounded-full bg-bonero-green"
                        />
                      )}
                    </div>
                    <div className="mt-2">
                      <StageCount value={stage.count} active={selected} />
                    </div>
                    <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-bonero-dark/45">
                      {stage.explain}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease }}
                className="overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white shadow-sm lg:sticky lg:top-24"
              >
                <div className="border-b border-bonero-dark/8 bg-bonero-green/[0.05] px-5 py-3">
                  <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">
                    {active.name}
                  </p>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-bonero-dark/60">{active.explain}</p>
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-4 flex items-start gap-2 rounded-xl border border-bonero-dark/8 bg-[#f8faf9] px-3 py-2.5"
                  >
                    <MessageSquare size={14} className="mt-0.5 shrink-0 text-bonero-green" />
                    <p className="text-xs text-bonero-dark/55">{active.example}</p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4 — Kart detayı */}
      <section className="border-y border-bonero-dark/8 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="min-w-0">
              <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
                {t.cardTitle}
              </h2>
              <p className="mt-3 text-sm text-bonero-dark/50 sm:text-base">{t.cardLead}</p>
              <ul className="mt-10 space-y-6">
                {t.cardPoints.map((point, i) => (
                  <motion.li
                    key={point.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.08, ease }}
                    className="flex gap-4"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bonero-green/10 ring-4 ring-bonero-green/5">
                      <Check size={14} className="text-bonero-green" />
                    </span>
                    <div>
                      <p className="font-semibold text-bonero-dark">{point.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-bonero-dark/55">{point.body}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.06} className="min-w-0">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <motion.div
                  className="pointer-events-none absolute -inset-3 rounded-3xl bg-bonero-green/10 blur-xl"
                  animate={{ opacity: [0.4, 0.65, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative rounded-2xl border border-bonero-green/20 bg-[#f8faf9] p-6 sm:p-7">
                  <CrmMock active isEn={isEn} variant="card" />
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5 — Senaryolar */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.scenariosTitle}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {t.scenarios.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 20px 40px -24px rgba(24,131,71,0.25)" }}
                  className="relative h-full overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white p-6"
                >
                  <span className="font-heading text-4xl text-bonero-green/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-xs font-bold tracking-wide text-bonero-green uppercase">
                    {s.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-bonero-dark/60">{s.text}</p>
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-bonero-green"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease }}
                  />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Excel vs CRM + sonuç + kapanış */}
      <section className="border-t border-bonero-dark/8 bg-bonero-dark py-14 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide sm:text-3xl">{t.contrastTitle}</h2>
            <p className="mt-2 text-sm text-white/50">{t.contrastLead}</p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-bold tracking-wide text-red-300/80 uppercase">Excel</p>
                <ul className="mt-4 space-y-2">
                  {t.contrastWithout.map((line) => (
                    <li key={line} className="text-sm text-white/45">
                      · {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="rounded-2xl border border-bonero-green/30 bg-bonero-green/[0.08] p-5">
                <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">Bonero CRM</p>
                <ul className="mt-4 space-y-2">
                  {t.contrastWith.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-sm text-white/75">
                      <Check size={14} className="mt-0.5 shrink-0 text-bonero-green" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-10">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">
                {t.outcomeLabel}
              </p>
              <p className="font-heading mt-2 text-xl text-white sm:text-2xl">{t.outcome}</p>
            </div>
          </Reveal>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-10">
            <div className="flex flex-wrap gap-2">
              {t.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/65 hover:border-bonero-green/40 hover:text-white"
                >
                  <r.icon size={12} />
                  {r.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <CtaButton href={PANEL_REGISTER_URL} variant="inverse" size="md" icon={<ArrowUpRight size={15} />}>
                {t.closingPrimary}
              </CtaButton>
              <CtaButton href="/paketler" variant="outline-light" size="md">
                {t.closingSecondary}
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
