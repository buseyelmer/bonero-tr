"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Moon,
  Shield,
  Sun,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import AiAgentMock from "@/components/features/mocks/AiAgentMock";
import { useLocale } from "@/components/LocaleProvider";
import { featureHref } from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;

const copy = {
  tr: {
    back: "Tüm özellikler",
    heroEyebrow: "Mesai dışı karşılama",
    heroTitle: "Kapalıyken de",
    heroAccent: "kapı açık kalsın.",
    heroLead:
      "Gece gelen fiyat ve randevu soruları sabaha kadar beklemesin. Bonero bilgi bankanızdaki cevaplarla karşılar; şikayet veya iade gelince konuşmayı ekibe tam geçmişle bırakır.",
    heroCtaPrimary: "Karşılamayı aç",
    heroCtaSecondary: "Vardiya günlüğüne in",
    heroMetrics: [
      { value: "9", suffix: " sn", label: "ilk yanıt" },
      { value: "68", suffix: "%", label: "mesai dışı çözüm" },
      { value: "24", suffix: "/7", label: "karşılama" },
    ],
    compareTitle: "İki gece, iki sonuç",
    compareSample: "Yarın 14:00 müsait misiniz?",
    compareLead: "Aynı mesaj — farklı karşılama.",
    withoutLabel: "Ekip kapalıyken",
    withLabel: "Bonero açıkken",
    without: [
      "Mesaj sabaha kadar okunmadı",
      "Müşteri başka yere yazdı",
      "Aynı SSS’ye üç kişi cevap yazdı",
    ],
    with: [
      "İlk yanıt dakikalar içinde gider",
      "Randevu talebi slot ile toplanır",
      "Şikayet otomatik destek kuyruğuna düşer",
    ],
    logTitle: "Vardiya günlüğü",
    logLead: "Tek gece, üç an — kurallar aynı kalır.",
    log: [
      {
        time: "22:40",
        phase: "Gece",
        title: "Fiyat sorusu gelir",
        body: "Çalışma saatleri ve fiyat aralığı bilgi bankasından yanıtlanır. Müşteri boşlukta kalmaz.",
        note: "Otomatik yanıt · SSS",
      },
      {
        time: "23:15",
        phase: "Gece",
        title: "Randevu talebi toplanır",
        body: "“Yarın 14:00” sorusu slot önerisiyle cevaplanır; sabah ekip onaylar.",
        note: "Lead bilgisi kartlanır",
      },
      {
        time: "07:50",
        phase: "Sabah",
        title: "Ekip masaya oturur",
        body: "Gece özeti hazır: 4 çözüldü, 1 insan kuyruğunda, 2 randevu bekliyor.",
        note: "Inbox’ta özet",
      },
    ],
    railTitle: "Devretme hattı",
    railLead: "Her mesaj ya cevaplanır ya doğru kişiye gider — arada boşluk yok.",
    rail: [
      { label: "Mesaj gelir", sub: "WhatsApp · IG · mail" },
      { label: "SSS eşleşir", sub: "Bilgi bankası" },
      { label: "Emin değil", sub: "Devretme kuralı" },
      { label: "İnsan kuyruğu", sub: "Tam geçmişle" },
    ],
    stackTitle: "Sizin yazdığınız kurallar",
    stackLead: "Kara kutu değil — madde madde, panelden düzenlenir.",
    stack: [
      {
        id: "faq",
        icon: FileText,
        title: "Bilgi bankası",
        body: "Adres, saat, fiyat, iptal — her madde tek cevap. Güncellediğiniz an yanıt değişir.",
        chips: ["Çalışma saatleri", "Fiyat aralığı", "İptal politikası"],
      },
      {
        id: "hours",
        icon: Clock,
        title: "Mesai modları",
        body: "Hafta içi, cumartesi, gece — her dilimde farklı karşılama metni.",
        chips: ["Gece modu", "Hafta sonu", "Tatil"],
      },
      {
        id: "handoff",
        icon: Shield,
        title: "Devretme tetikleyicileri",
        body: "Anahtar kelime veya etiket → doğru kuyruk. Şikayet satışa karışmaz.",
        chips: ["iade → destek", "teklif → satış", "VIP → yönetici"],
      },
    ],
    setupTitle: "On dakikada kurulum",
    setup: [
      { n: "01", title: "8–10 SSS maddesi yazın", body: "En sık gelen sorular — kopyala-yapıştır değil, kendi cümleleriniz." },
      { n: "02", title: "Devretme listesini tanımlayın", body: "Hangi kelime hangi kuyruğa — üç satır yeter." },
      { n: "03", title: "Onay moduyla test edin", body: "Kendi numaranızdan yazın; ton oturunca tam otomatiğe geçin." },
    ],
    relatedTitle: "Yanında kullanın",
    related: [
      { href: featureHref("gelen-kutusu"), label: "Omnichannel", body: "Otomatik ve insan yanıtı aynı inbox’ta." },
      { href: featureHref("randevu"), label: "Randevu", body: "Gece talebi slot önerisine dönüşür." },
      { href: featureHref("crm"), label: "CRM", body: "Toplanan bilgi lead kartında hazır." },
    ],
    ctaTitle: "Gece mesajları sabaha kalmasın.",
    ctaBody: "SSS’yi girin — aynı gün mesai dışı karşılama açık.",
    ctaEyebrow: "Hemen başla",
    ctaHint: "Kart gerekmez · ~10 dk kurulum",
    ctaSignals: ["7 gün ücretsiz", "Onay modu", "SSS sizin elinizde"],
    ctaPrimary: "Ücretsiz dene",
    ctaSecondary: "Paketlere bak",
    ctaBullets: [
      "SSS ve devretme kuralları sizin kontrolünüzde",
      "Her devir tam konuşma geçmişiyle gelir",
      "Onay modu ile güvenle başlayın",
    ],
  },
  en: {
    back: "All features",
    heroEyebrow: "After-hours reception",
    heroTitle: "When you’re closed,",
    heroAccent: "the door stays open.",
    heroLead:
      "Price and booking questions at night shouldn’t wait until morning. Bonero replies from your knowledge base; complaints or refunds hand off to your team with full context.",
    heroCtaPrimary: "Turn on reception",
    heroCtaSecondary: "Read the shift log",
    heroMetrics: [
      { value: "9", suffix: "s", label: "first reply" },
      { value: "68", suffix: "%", label: "after-hours resolved" },
      { value: "24", suffix: "/7", label: "reception on" },
    ],
    compareTitle: "Two nights, two outcomes",
    compareSample: "Are you free tomorrow at 2pm?",
    compareLead: "Same message — different reception.",
    withoutLabel: "Team offline",
    withLabel: "Bonero on",
    without: [
      "Message unread until morning",
      "Customer messaged someone else",
      "Three people answered the same FAQ",
    ],
    with: [
      "First reply within minutes",
      "Booking request collected with a slot",
      "Complaint routes to support queue",
    ],
    logTitle: "Shift log",
    logLead: "One night, three moments — same rules throughout.",
    log: [
      {
        time: "10:40pm",
        phase: "Night",
        title: "Price question arrives",
        body: "Hours and price range answered from the knowledge base. Customer isn’t left hanging.",
        note: "Auto reply · FAQ",
      },
      {
        time: "11:15pm",
        phase: "Night",
        title: "Booking request collected",
        body: "“Tomorrow 2pm” gets a slot suggestion; team confirms in the morning.",
        note: "Lead info captured",
      },
      {
        time: "7:50am",
        phase: "Morning",
        title: "Team sits down",
        body: "Overnight summary ready: 4 resolved, 1 in human queue, 2 bookings pending.",
        note: "Summary in inbox",
      },
    ],
    railTitle: "Handoff rail",
    railLead: "Every message is answered or routed — nothing falls through.",
    rail: [
      { label: "Message in", sub: "WhatsApp · IG · email" },
      { label: "FAQ match", sub: "Knowledge base" },
      { label: "Not sure", sub: "Handoff rule" },
      { label: "Human queue", sub: "Full history" },
    ],
    stackTitle: "Rules you write",
    stackLead: "Not a black box — item by item, edited in the panel.",
    stack: [
      {
        id: "faq",
        icon: FileText,
        title: "Knowledge base",
        body: "Address, hours, price, cancellation — one answer per item. Update it, reply changes.",
        chips: ["Opening hours", "Price range", "Cancellation"],
      },
      {
        id: "hours",
        icon: Clock,
        title: "Shift modes",
        body: "Weekday, Saturday, night — different greeting per window.",
        chips: ["Night mode", "Weekend", "Holiday"],
      },
      {
        id: "handoff",
        icon: Shield,
        title: "Handoff triggers",
        body: "Keyword or tag → right queue. Complaints don’t mix with sales.",
        chips: ["refund → support", "quote → sales", "VIP → manager"],
      },
    ],
    setupTitle: "Ten-minute setup",
    setup: [
      { n: "01", title: "Write 8–10 FAQ items", body: "Most common questions — your words, not copy-paste." },
      { n: "02", title: "Define the handoff list", body: "Which word goes to which queue — three lines is enough." },
      { n: "03", title: "Test in approval mode", body: "Message from your own number; go full auto once tone is right." },
    ],
    relatedTitle: "Use alongside",
    related: [
      { href: featureHref("gelen-kutusu"), label: "Omnichannel", body: "Auto and human replies in one inbox." },
      { href: featureHref("randevu"), label: "Appointments", body: "Night requests become slot suggestions." },
      { href: featureHref("crm"), label: "CRM", body: "Captured info lands on a lead card." },
    ],
    ctaTitle: "Don’t let night messages wait until morning.",
    ctaBody: "Add your FAQs — after-hours reception live the same day.",
    ctaEyebrow: "Get started",
    ctaHint: "No card required · ~10 min setup",
    ctaSignals: ["7-day free trial", "Approval mode", "FAQ under your control"],
    ctaPrimary: "Try free",
    ctaSecondary: "View plans",
    ctaBullets: [
      "FAQ and handoff rules under your control",
      "Every handoff includes full thread history",
      "Start safely with approval mode",
    ],
  },
};

function HeroHeadline({ title, accent }: { title: string; accent: string }) {
  return (
    <h1 className="font-heading mt-4 text-3xl leading-[1.08] tracking-wide text-white sm:text-4xl lg:text-[2.65rem]">
      <motion.span
        className="block"
        initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.55, ease }}
      >
        {title}
      </motion.span>
      <motion.span
        className="relative mt-1 block overflow-hidden text-bonero-green"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease }}
      >
        {accent}
        <motion.span
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{
            duration: 2.4,
            delay: 0.9,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
          aria-hidden
        />
      </motion.span>
    </h1>
  );
}

function HeroMockPanel({ isEn }: { isEn: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [2.5, -2.5]), {
    stiffness: 90,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), {
    stiffness: 90,
    damping: 22,
  });

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
      className="relative"
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.span
        className="absolute top-0 right-0 z-10 inline-flex items-center gap-1.5 rounded-full border border-bonero-dark/10 bg-white px-2.5 py-1 font-mono text-[11px] font-semibold text-bonero-dark/55 shadow-sm"
        animate={{ opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Clock size={11} className="text-bonero-green" />
        22:47
      </motion.span>

      <motion.div
        style={{ rotateX, rotateY }}
        className="relative mt-2 [perspective:1200px] [transform-style:preserve-3d]"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white p-1 shadow-[0_28px_70px_rgba(30,41,59,0.12)] ring-1 ring-bonero-dark/[0.04] sm:p-1.5"
        >
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-bonero-green/45 to-transparent"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          />
          <AiAgentMock active isEn={isEn} variant="full" />
        </motion.div>

        <motion.div
          className="absolute -bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-bonero-green/20 bg-white px-3 py-1.5 text-[10px] font-semibold text-bonero-green shadow-[0_8px_24px_rgba(24,131,71,0.18)] sm:text-[11px]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5, ease }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green/40" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bonero-green" />
          </span>
          {isEn ? "Auto reply active" : "Otomatik yanıt açık"}
        </motion.div>
      </motion.div>
    </div>
  );
}

function NightClosingCta({ t, isEn }: { t: (typeof copy)["tr"]; isEn: boolean }) {
  return (
    <section className="border-t border-bonero-dark/6 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-bonero-dark/8 bg-[#0a1410] shadow-[0_40px_90px_rgba(15,28,23,0.45)]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(145deg, #0f1c17 0%, #132820 40%, #126b38 100%)",
              }}
            />
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
            <motion.div
              className="pointer-events-none absolute -top-20 -right-16 h-72 w-72 rounded-full bg-bonero-green/20 blur-3xl"
              animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.06, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#6366f1]/10 blur-3xl"
              animate={{ opacity: [0.2, 0.45, 0.2] }}
              transition={{ duration: 6.5, repeat: Infinity, delay: 1.2 }}
            />

            {/* Floating stars */}
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute h-1 w-1 rounded-full bg-white/30"
                style={{
                  top: `${12 + i * 14}%`,
                  left: `${8 + ((i * 17) % 80)}%`,
                }}
                animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
                aria-hidden
              />
            ))}

            <div className="relative grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:p-10">
              <div className="max-w-lg">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-white/45 uppercase"
                >
                  <Moon size={12} className="text-bonero-green" />
                  {t.ctaEyebrow}
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06, ease }}
                  className="font-heading mt-3 text-2xl tracking-wide text-white sm:text-3xl lg:text-[2rem]"
                >
                  {t.ctaTitle}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, ease }}
                  className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base"
                >
                  {t.ctaBody}
                </motion.p>

                <ul className="mt-6 space-y-2.5">
                  {t.ctaBullets.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.12 + i * 0.08, ease }}
                      className="flex items-start gap-2.5 text-sm text-white/80"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/12">
                        <Check size={11} className="text-white" />
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, ease }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {t.ctaSignals.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold text-white/70 backdrop-blur-sm"
                    >
                      {signal}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.42, ease }}
                  className="mt-8 flex flex-wrap items-center gap-3"
                >
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
                </motion.div>
                <p className="mt-4 text-xs text-white/40">{t.ctaHint}</p>
              </div>

              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="overflow-hidden rounded-xl border border-white/12 bg-white/[0.97] p-2 shadow-[0_28px_70px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-2.5"
                >
                  <AiAgentMock active isEn={isEn} variant="compact" />
                </motion.div>

                <div className="mt-4 flex justify-center gap-2">
                  {(isEn
                    ? ["FAQ", "Handoff", "Approval", "Night mode"]
                    : ["SSS", "Devretme", "Onay", "Gece modu"]
                  ).map((label, i) => (
                    <motion.span
                      key={label}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.06, ease }}
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/75 backdrop-blur-sm"
                    >
                      {i === 3 && <Moon size={9} className="text-bonero-green" />}
                      {label}
                    </motion.span>
                  ))}
                </div>

                <motion.div
                  className="mx-auto mt-4 grid max-w-xs grid-cols-3 gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, ease }}
                >
                  {[
                    { v: "9s", l: isEn ? "First reply" : "İlk yanıt" },
                    { v: "68%", l: isEn ? "Resolved" : "Çözülen" },
                    { v: "24/7", l: isEn ? "Open" : "Açık" },
                  ].map((stat) => (
                    <div
                      key={stat.l}
                      className="rounded-lg border border-white/10 bg-white/[0.06] px-2 py-2 text-center backdrop-blur-sm"
                    >
                      <p className="font-heading text-sm text-white">{stat.v}</p>
                      <p className="text-[9px] text-white/45">{stat.l}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StackCard({
  item,
  open,
  onToggle,
}: {
  item: (typeof copy.tr.stack)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  return (
    <motion.div
      layout
      className={`overflow-hidden rounded-2xl border transition-colors ${
        open ? "border-bonero-green/30 bg-white shadow-md" : "border-bonero-dark/8 bg-white/80"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-4 px-5 py-5 text-left sm:px-6"
      >
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
            open ? "bg-bonero-green text-white" : "bg-bonero-dark/[0.05] text-bonero-dark/45"
          }`}
        >
          <Icon size={20} strokeWidth={1.5} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="font-heading text-lg text-bonero-dark">{item.title}</span>
          <AnimatePresence initial={false}>
            {open && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 overflow-hidden text-sm leading-relaxed text-bonero-dark/55"
              >
                {item.body}
              </motion.p>
            )}
          </AnimatePresence>
        </span>
        <ChevronDown
          size={18}
          className={`mt-1 shrink-0 text-bonero-dark/35 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-bonero-dark/6 px-5 pb-5 sm:px-6"
          >
            <div className="flex flex-wrap gap-2 pt-4">
              {item.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-bonero-dark/10 bg-[#f6f8f7] px-3 py-1 text-xs font-semibold text-bonero-dark/60"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AiAgentFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const t = copy[locale];
  const [openStack, setOpenStack] = useState("faq");

  return (
    <div className="bg-background">
      {/* Hero — editorial split, dark left */}
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-bonero-dark/45 hover:text-bonero-dark"
          >
            <ArrowLeft size={14} />
            {t.back}
          </Link>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-0 px-4 sm:px-6 lg:mt-10 lg:grid-cols-12 lg:px-8">
          <div className="relative overflow-hidden rounded-t-[1.75rem] bg-[#0f1c17] px-6 py-10 sm:px-10 sm:py-12 lg:col-span-5 lg:rounded-l-[1.75rem] lg:rounded-tr-none lg:py-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 0% 100%, rgba(24,131,71,0.35), transparent 60%)",
              }}
            />
            <motion.div
              className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-bonero-green/15 blur-3xl"
              animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.08, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="relative">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease }}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-bonero-green uppercase"
              >
                <Moon size={13} />
                {t.heroEyebrow}
              </motion.p>
              <HeroHeadline title={t.heroTitle} accent={t.heroAccent} />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                className="mt-5 max-w-md text-base leading-relaxed text-white/55"
              >
                {t.heroLead}
              </motion.p>

              <div className="mt-7 grid grid-cols-3 gap-2">
                {t.heroMetrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 + i * 0.07, ease }}
                    whileHover={{ y: -2, borderColor: "rgba(24,131,71,0.35)" }}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-2.5 text-center transition-colors"
                  >
                    <p className="font-heading text-lg text-white sm:text-xl">
                      {m.value}
                      <span className="text-sm text-bonero-green">{m.suffix}</span>
                    </p>
                    <p className="mt-0.5 text-[10px] leading-tight text-white/40">{m.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, ease }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  href={PANEL_REGISTER_URL}
                  className="group inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-bonero-green/25 transition-all hover:scale-[1.02] hover:bg-bonero-green/90"
                >
                  {t.heroCtaPrimary}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
                <a
                  href="#gunluk"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white/75 transition-colors hover:border-white/30 hover:bg-white/[0.04]"
                >
                  {t.heroCtaSecondary}
                  <motion.span
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-white/35"
                  >
                    ↓
                  </motion.span>
                </a>
              </motion.div>
            </div>
          </div>

          <div className="relative rounded-b-[1.75rem] border border-bonero-dark/8 border-t-0 bg-[#f4f6f5] px-4 py-8 sm:px-8 sm:py-10 lg:col-span-7 lg:rounded-r-[1.75rem] lg:rounded-bl-none lg:border-t lg:border-l-0 lg:py-12">
            <div className="mx-auto max-w-lg">
              <HeroMockPanel isEn={isEn} />
            </div>
            <motion.div
              className="pointer-events-none absolute -right-8 -bottom-8 hidden h-32 w-32 rounded-full bg-bonero-green/10 blur-2xl lg:block"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="border-y border-bonero-dark/6 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.compareTitle}
            </h2>
            <p className="mt-2 text-sm text-bonero-dark/50 sm:text-base">{t.compareLead}</p>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-0">
            <Reveal className="rounded-2xl border border-bonero-dark/8 bg-[#fafbfa] p-6 md:rounded-r-none md:border-r-0">
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-bonero-dark/45">
                <Moon size={16} />
                {t.withoutLabel}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-5 rounded-xl border border-bonero-dark/8 bg-white px-3 py-2.5 text-sm text-bonero-dark/55"
              >
                <span className="mb-1 block text-[10px] font-semibold tracking-wide text-bonero-dark/35 uppercase">
                  {isEn ? "Customer" : "Müşteri"} · 23:12
                </span>
                {t.compareSample}
              </motion.div>
              <ul className="space-y-3">
                {t.without.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, ease }}
                    className="flex items-start gap-2.5 text-sm text-bonero-dark/60"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bonero-dark/25" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.06} className="rounded-2xl border border-bonero-green/25 bg-bonero-green/[0.04] p-6 md:rounded-l-none">
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-bonero-green">
                <Sun size={16} />
                {t.withLabel}
              </div>
              <div className="mb-3 flex justify-end">
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="max-w-[85%] rounded-xl rounded-br-md bg-bonero-dark px-3 py-2 text-sm text-white"
                >
                  {t.compareSample}
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, ease }}
                className="mb-5 max-w-[90%] rounded-xl rounded-bl-md border border-bonero-green/20 bg-white px-3 py-2.5 text-sm text-bonero-dark/70 shadow-sm"
              >
                <span className="mb-1 block text-[10px] font-bold tracking-wide text-bonero-green uppercase">
                  {isEn ? "Auto reply" : "Otomatik yanıt"}
                </span>
                {isEn
                  ? "Yes, 2pm is open. Should I hold the slot under your name?"
                  : "Evet, 14:00 boş. Adınıza slot ayırayım mı?"}
              </motion.div>
              <ul className="space-y-3">
                {t.with.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + i * 0.06, ease }}
                    className="flex items-start gap-2.5 text-sm text-bonero-dark/70"
                  >
                    <Check size={16} className="mt-0.5 shrink-0 text-bonero-green" strokeWidth={2.5} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Shift log — vertical editorial */}
      <section id="gunluk" className="scroll-mt-24 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.logTitle}
            </h2>
            <p className="mt-2 text-sm text-bonero-dark/50 sm:text-base">{t.logLead}</p>
          </Reveal>

          <ol className="relative mt-12 space-y-0">
            <motion.div
              className="absolute top-2 bottom-2 left-[3.25rem] hidden w-px origin-top bg-bonero-green/30 sm:block"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
            />
            {t.log.map((entry, i) => (
              <Reveal key={entry.time} delay={i * 0.06}>
                <li className="grid gap-4 py-6 sm:grid-cols-[5rem_1fr] sm:gap-8 sm:py-8">
                  <div className="relative sm:text-right">
                    <p className="font-mono text-sm font-bold text-bonero-green">{entry.time}</p>
                    <p className="mt-0.5 text-[10px] font-semibold tracking-wide text-bonero-dark/35 uppercase">
                      {entry.phase}
                    </p>
                    <motion.span
                      className="absolute top-1.5 -right-[calc(2rem+5px)] hidden h-2.5 w-2.5 rounded-full border-2 border-white bg-bonero-green sm:block"
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    />
                  </div>
                  <motion.article
                    whileHover={{ y: -2, boxShadow: "0 12px 40px rgba(30,41,59,0.08)" }}
                    className="rounded-2xl border border-bonero-dark/8 bg-white p-5 shadow-sm transition-shadow sm:p-6"
                  >
                    <h3 className="font-heading text-xl text-bonero-dark">{entry.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
                      {entry.body}
                    </p>
                    <p className="mt-4 inline-flex rounded-full bg-[#f6f8f7] px-3 py-1 text-[11px] font-semibold text-bonero-dark/50">
                      {entry.note}
                    </p>
                  </motion.article>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Handoff rail — horizontal flow */}
      <section className="border-t border-bonero-dark/6 bg-[#0f1c17] py-14 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-xl">
            <h2 className="font-heading text-2xl tracking-wide sm:text-3xl">{t.railTitle}</h2>
            <p className="mt-2 text-sm text-white/45 sm:text-base">{t.railLead}</p>
          </Reveal>

          <div className="relative mt-10">
            <div className="absolute top-1/2 right-0 left-0 hidden h-px -translate-y-1/2 bg-white/10 lg:block" />
            <div className="grid gap-4 sm:grid-cols-2 lg:flex lg:items-center lg:gap-2">
              {t.rail.map((step, i) => (
                <div key={step.label} className="contents">
                  <Reveal delay={i * 0.05} className="min-w-0 flex-1">
                    <motion.article
                      whileHover={{ y: -3, borderColor: "rgba(24,131,71,0.35)" }}
                      className="relative h-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-5 backdrop-blur-sm transition-colors"
                    >
                      <span className="font-mono text-[10px] font-bold text-bonero-green">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-heading mt-2 text-base text-white">{step.label}</p>
                      <p className="mt-1 text-xs text-white/40">{step.sub}</p>
                    </motion.article>
                  </Reveal>
                  {i < t.rail.length - 1 && (
                    <ArrowRight
                      size={16}
                      className="hidden shrink-0 text-bonero-green/50 lg:block"
                      aria-hidden
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Control stack + mock */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <Reveal>
              <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
                {t.stackTitle}
              </h2>
              <p className="mt-2 text-sm text-bonero-dark/50 sm:text-base">{t.stackLead}</p>
              <div className="mt-8 space-y-3">
                {t.stack.map((item) => (
                  <StackCard
                    key={item.id}
                    item={item}
                    open={openStack === item.id}
                    onToggle={() => setOpenStack(openStack === item.id ? "" : item.id)}
                  />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <motion.div
                whileHover={{ y: -2 }}
                className="sticky top-24 rounded-2xl border border-bonero-dark/8 bg-[#f4f6f5] p-4 shadow-sm sm:p-5"
              >
                <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold tracking-wide text-bonero-dark/35 uppercase">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green/35" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bonero-green" />
                  </span>
                  {isEn ? "Live preview" : "Canlı önizleme"}
                </p>
                <AiAgentMock active isEn={isEn} variant="compact" />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Setup — horizontal cards */}
      <section className="border-t border-bonero-dark/6 bg-[#f6f8f7] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.setupTitle}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {t.setup.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(24,131,71,0.08)" }}
                  className="h-full rounded-2xl border border-bonero-dark/8 bg-white p-6 transition-shadow"
                >
                  <span className="font-mono text-sm font-bold text-bonero-green">{step.n}</span>
                  <h3 className="font-heading mt-3 text-lg text-bonero-dark">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">{step.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related — minimal row */}
      <section className="border-t border-bonero-dark/6 py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/40 uppercase">
            {t.relatedTitle}
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {t.related.map((r, i) => (
              <motion.div
                key={r.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, ease }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={r.href}
                  className="group flex min-w-[200px] flex-1 items-center justify-between gap-4 rounded-xl border border-bonero-dark/8 bg-white px-5 py-4 transition-colors hover:border-bonero-green/30 hover:shadow-md hover:shadow-bonero-green/5"
                >
                <div>
                  <p className="font-heading text-base text-bonero-dark group-hover:text-bonero-green">
                    {r.label}
                  </p>
                  <p className="mt-0.5 text-xs text-bonero-dark/45">{r.body}</p>
                </div>
                <ArrowRight size={16} className="shrink-0 text-bonero-dark/25 transition-transform group-hover:translate-x-0.5 group-hover:text-bonero-green" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <NightClosingCta t={t} isEn={isEn} />
    </div>
  );
}
