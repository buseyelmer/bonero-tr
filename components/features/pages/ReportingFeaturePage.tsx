"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  ChevronRight,
  Clock,
  HelpCircle,
  Inbox,
  Lightbulb,
  Megaphone,
  Sun,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import ReportingMock from "@/components/features/mocks/ReportingMock";
import { useLocale } from "@/components/LocaleProvider";
import { featureHref } from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;

const copy = {
  tr: {
    back: "Tüm özellikler",
    eyebrow: "Analitik & performans",
    defineTitle: "Raporlama nedir?",
    defineBody:
      "İşletmenizin sayılarla nabzını tutmaktır — mesaj hacmi, yanıt süresi, kanal dönüşümü. Bonero’da inbox, CRM, randevu ve reklam tek dashboard’da birleşir.",
    heroTitle: "Tahmin değil,",
    heroAccent: "canlı veri.",
    heroLead:
      "Sabah açılışında 30 saniyede günün önceliğini görün. Rakam sinyal verir, siz hamle yaparsınız.",
    heroCtaPrimary: "Dashboard’u aç",
    heroCtaSecondary: "Üç soruya bak",
    ticker: [
      "Yanıt 1,4dk · −38%",
      "24 açık talep",
      "Dönüşüm %12",
      "WhatsApp %42 hacim",
      "7 gün trend ↑",
    ],
    questionsTitle: "Üç soru, tek ekran",
    questionsLead: "Her gün aynı dashboard — üç soruya cevap yeter.",
    questionsHint: "Soruyu seçin · cevap sağda açılır",
    questions: [
      {
        id: "what",
        n: "01",
        icon: Activity,
        q: "Ne oluyor?",
        short: "Hacim & trend",
        body: "Kaç mesaj, kaç lead, kaç randevu — bu hafta geçen haftaya göre artıyor mu? Trend çizgisi cevaplar.",
        insight: "Hacim geçen haftaya göre yükseldi — lead de mesajla birlikte geliyor.",
        metric: "847",
        metricLabel: "mesaj / hafta",
        delta: "+12%",
        up: true,
        bars: [36, 52, 44, 68, 58, 82, 74],
        days: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
      },
      {
        id: "where",
        n: "02",
        icon: Target,
        q: "Nerede takılıyor?",
        short: "Darboğaz",
        body: "Yanıt süresi uzadı mı? Hangi kanalda talep birikiyor? SLA ve kanal kırılımı darboğazı gösterir.",
        insight: "Yanıt süresi düşüyor — darboğaz yok, WhatsApp hâlâ en yoğun kanal.",
        metric: "1,4dk",
        metricLabel: "ort. yanıt",
        delta: "−38%",
        up: true,
        bars: [82, 78, 65, 58, 52, 48, 44],
        days: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
      },
      {
        id: "do",
        n: "03",
        icon: Zap,
        q: "Ne yapmalıyım?",
        short: "Eylem",
        body: "Sinyal net olunca karar net — şablon güncelle, bütçe kaydır, ekibe uyarı gönder.",
        insight: "3 aktif sinyal var — öncelik: WhatsApp şablonunu güncelle.",
        metric: "3",
        metricLabel: "aktif sinyal",
        delta: "bugün",
        up: null,
        bars: [20, 35, 50, 65, 80, 90, 100],
        days: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
      },
    ],
    signalsTitle: "Sinyal → eylem",
    signalsLead: "Bonero sadece grafik çizmez; ne yapmanız gerektiğini söyler.",
    signals: [
      {
        id: "sla",
        icon: BarChart3,
        signal: "Yanıt süresi yükseldi",
        action: "Inbox SLA’yı sıkılaştır veya ekibe uyarı gönder.",
      },
      {
        id: "wa",
        icon: Lightbulb,
        signal: "WhatsApp dönüşümü düştü",
        action: "Son 7 gün mesajlarını incele, şablonları güncelle.",
      },
      {
        id: "lead",
        icon: Zap,
        signal: "Lead hacmi patladı",
        action: "CRM’de atama kuralını aç, kapasiteyi dengele.",
      },
    ],
    weekTitle: "Haftanın nabzı",
    weekLead: "7 günlük hacim — zirve, ortalama ve gün detayı tek kartta.",
    weekTotal: "470",
    weekAvg: "67",
    weekPeak: "Cum",
    weekDelta: "+12%",
    week: [
      { day: "Pzt", vol: 62, msgs: 62, leads: 8, reply: "1,6dk", note: "Normal hacim — rutin gün." },
      { day: "Sal", vol: 78, msgs: 78, leads: 12, reply: "1,5dk", note: "Lead artışı — CRM’de 4 yeni kart." },
      { day: "Çar", vol: 71, msgs: 71, leads: 9, reply: "1,3dk", note: "Yanıt hızlı — SLA yeşil." },
      { day: "Per", vol: 85, msgs: 85, leads: 11, reply: "1,4dk", note: "Reklam spike — WhatsApp %48." },
      { day: "Cum", vol: 92, msgs: 92, leads: 14, reply: "1,2dk", note: "Haftanın zirvesi — 14 yeni lead." },
      { day: "Cmt", vol: 44, msgs: 44, leads: 3, reply: "2,1dk", note: "Mesai dışı — Agent devrede." },
      { day: "Paz", vol: 38, msgs: 38, leads: 2, reply: "1,8dk", note: "Düşük hacim — beklenen." },
    ],
    channelsTitle: "Kanallar yan yana",
    channelsLead: "Bütçe ve eforu iş getiren kanala kaydırın.",
    channels: [
      { name: "WhatsApp", pct: 42, conv: "14%", color: "#25D366" },
      { name: "Instagram", pct: 28, conv: "11%", color: "#E4405F" },
      { name: "E-posta", pct: 18, conv: "8%", color: "#64748b" },
      { name: "Reklam", pct: 12, conv: "19%", color: "#188347" },
    ],
    scenariosTitle: "Gündelik rutinler",
    scenariosLead: "Raporlama bir kerelik export değil — günün üç anında aynı ekrana bakarsınız.",
    scenarios: [
      {
        id: "open",
        time: "08:30",
        icon: Sun,
        label: "Açılış taraması",
        headline: "Kahve soğumadan önce günün önceliği",
        text: "Gece Agent’ın cevapladığı mesajlar, sabah bekleyen talepler ve dünkü dönüşüm tek bakışta. Excel açmadan “bugün neye odaklanırım?” sorusu biter.",
        stats: [
          { v: "24", l: "bekleyen talep" },
          { v: "1,4dk", l: "ort. yanıt" },
          { v: "%12", l: "dün dönüşüm" },
        ],
        action: "Inbox’ta SLA kırmızı olanları filtrele, ekibe atama yap.",
      },
      {
        id: "mid",
        time: "13:00",
        icon: Activity,
        label: "Öğle kontrolü",
        headline: "Darboğaz büyümeden müdahale",
        text: "Öğleden önce hangi kanal birikti, yanıt süresi SLA dışına çıktı mı? Grafik değil — doğrudan hangi kanala ekip veya şablon lazım, o netleşir.",
        stats: [
          { v: "WhatsApp", l: "en yoğun kanal" },
          { v: "+6", l: "açık talep artışı" },
          { v: "2,1dk", l: "Cmt ort. yanıt" },
        ],
        action: "WhatsApp şablonunu güncelle veya mesai dışı Agent kuralını sıkılaştır.",
      },
      {
        id: "week",
        time: "Cuma 17:00",
        icon: Calendar,
        label: "Haftayı kapat",
        headline: "Toplantıya tablo taşımadan özet",
        text: "7 günlük trend, en iyi kanal ve lead zirvesi hazır. Ekip aynı rakamlarla konuşur; hafta sonu için kapasite planı 2 dakikada çıkar.",
        stats: [
          { v: "+12%", l: "haftalık hacim" },
          { v: "Cum", l: "zirve günü" },
          { v: "470", l: "toplam hacim" },
        ],
        action: "CRM’de Cuma lead’lerini atama kuralıyla dağıt, reklam bütçesini %42 WhatsApp’a kaydır.",
      },
    ],
    outcomeLabel: "Sonuç",
    outcome: "Kararlar hızlanır, efor doğru kanala gider, ekip aynı rakamlarla konuşur.",
    ctaTitle: "Canlı metrik. Gerçek hamle.",
    ctaBody: "Tablo export’una gerek yok — dashboard açık kalsın.",
    ctaPrimary: "Raporlamayla başla",
    ctaSecondary: "Paketlere bak",
    related: [
      { href: featureHref("crm"), label: "CRM", icon: Users },
      { href: featureHref("gelen-kutusu"), label: "Omnichannel", icon: Inbox },
      { href: featureHref("ai-reklam"), label: "AI Reklam", icon: Megaphone },
    ],
  },
  en: {
    back: "All features",
    eyebrow: "Analytics & performance",
    defineTitle: "What is reporting?",
    defineBody:
      "Keeping your business pulse in numbers — message volume, reply time, channel conversion. In Bonero, inbox, CRM, appointments, and ads merge on one dashboard.",
    heroTitle: "Not guesses,",
    heroAccent: "live data.",
    heroLead:
      "See the day’s priority in 30 seconds at open. Numbers signal, you move.",
    heroCtaPrimary: "Open dashboard",
    heroCtaSecondary: "See the three questions",
    ticker: [
      "Reply 1.4m · −38%",
      "24 open requests",
      "Conv. 12%",
      "WhatsApp 42% volume",
      "7-day trend ↑",
    ],
    questionsTitle: "Three questions, one screen",
    questionsLead: "Same dashboard every day — three questions are enough.",
    questionsHint: "Pick a question · answer opens on the right",
    questions: [
      {
        id: "what",
        n: "01",
        icon: Activity,
        q: "What’s happening?",
        short: "Volume & trend",
        body: "How many messages, leads, appointments — up or down vs last week? The trend line answers.",
        insight: "Volume is up vs last week — leads are rising with messages.",
        metric: "847",
        metricLabel: "messages / week",
        delta: "+12%",
        up: true,
        bars: [36, 52, 44, 68, 58, 82, 74],
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      {
        id: "where",
        n: "02",
        icon: Target,
        q: "Where is it stuck?",
        short: "Bottleneck",
        body: "Did reply time stretch? Which channel is backing up? SLA and channel mix show the bottleneck.",
        insight: "Reply time is falling — no bottleneck; WhatsApp is still the busiest channel.",
        metric: "1.4m",
        metricLabel: "avg reply",
        delta: "−38%",
        up: true,
        bars: [82, 78, 65, 58, 52, 48, 44],
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      {
        id: "do",
        n: "03",
        icon: Zap,
        q: "What should I do?",
        short: "Action",
        body: "Clear signal, clear move — update templates, shift budget, alert the team.",
        insight: "3 active signals — priority: update the WhatsApp template.",
        metric: "3",
        metricLabel: "active signals",
        delta: "today",
        up: null,
        bars: [20, 35, 50, 65, 80, 90, 100],
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    signalsTitle: "Signal → action",
    signalsLead: "Bonero doesn’t just draw charts — it tells you what to do.",
    signals: [
      {
        id: "sla",
        icon: BarChart3,
        signal: "Response time spiked",
        action: "Tighten inbox SLA or alert the team.",
      },
      {
        id: "wa",
        icon: Lightbulb,
        signal: "WhatsApp conversion dropped",
        action: "Review the last 7 days of messages, update templates.",
      },
      {
        id: "lead",
        icon: Zap,
        signal: "Lead volume surged",
        action: "Turn on CRM assignment rules and rebalance capacity.",
      },
    ],
    weekTitle: "The week’s pulse",
    weekLead: "7-day volume — peak, average, and day detail in one card.",
    weekTotal: "470",
    weekAvg: "67",
    weekPeak: "Fri",
    weekDelta: "+12%",
    week: [
      { day: "Mon", vol: 62, msgs: 62, leads: 8, reply: "1.6m", note: "Normal volume — routine day." },
      { day: "Tue", vol: 78, msgs: 78, leads: 12, reply: "1.5m", note: "Lead uptick — 4 new CRM cards." },
      { day: "Wed", vol: 71, msgs: 71, leads: 9, reply: "1.3m", note: "Fast replies — SLA green." },
      { day: "Thu", vol: 85, msgs: 85, leads: 11, reply: "1.4m", note: "Ad spike — WhatsApp 48%." },
      { day: "Fri", vol: 92, msgs: 92, leads: 14, reply: "1.2m", note: "Week peak — 14 new leads." },
      { day: "Sat", vol: 44, msgs: 44, leads: 3, reply: "2.1m", note: "After hours — Agent on duty." },
      { day: "Sun", vol: 38, msgs: 38, leads: 2, reply: "1.8m", note: "Low volume — expected." },
    ],
    channelsTitle: "Channels side by side",
    channelsLead: "Shift budget and effort where work comes from.",
    channels: [
      { name: "WhatsApp", pct: 42, conv: "14%", color: "#25D366" },
      { name: "Instagram", pct: 28, conv: "11%", color: "#E4405F" },
      { name: "Email", pct: 18, conv: "8%", color: "#64748b" },
      { name: "Ads", pct: 12, conv: "19%", color: "#188347" },
    ],
    scenariosTitle: "Daily routines",
    scenariosLead: "Reporting isn’t a one-off export — you glance at the same screen three times a day.",
    scenarios: [
      {
        id: "open",
        time: "8:30 AM",
        icon: Sun,
        label: "Opening scan",
        headline: "Today’s priority before coffee cools",
        text: "Overnight Agent replies, morning backlog, and yesterday’s conversion in one glance. No spreadsheet — just “what do I focus on today?”",
        stats: [
          { v: "24", l: "open requests" },
          { v: "1.4m", l: "avg reply" },
          { v: "12%", l: "yesterday conv." },
        ],
        action: "Filter inbox for SLA breaches and assign to the team.",
      },
      {
        id: "mid",
        time: "1:00 PM",
        icon: Activity,
        label: "Midday check",
        headline: "Intervene before the bottleneck grows",
        text: "Which channel backed up before lunch? Did reply time slip past SLA? Not just charts — which channel needs people or template updates.",
        stats: [
          { v: "WhatsApp", l: "busiest channel" },
          { v: "+6", l: "open uptick" },
          { v: "2.1m", l: "Sat avg reply" },
        ],
        action: "Update WhatsApp templates or tighten after-hours Agent rules.",
      },
      {
        id: "week",
        time: "Fri 5 PM",
        icon: Calendar,
        label: "Week wrap",
        headline: "Meeting-ready summary, no deck assembly",
        text: "7-day trend, top channel, and lead peak ready. The team shares one set of numbers; weekend capacity plan in two minutes.",
        stats: [
          { v: "+12%", l: "weekly volume" },
          { v: "Fri", l: "peak day" },
          { v: "470", l: "total volume" },
        ],
        action: "Distribute Friday leads via CRM rules; shift ad budget toward 42% WhatsApp.",
      },
    ],
    outcomeLabel: "Outcome",
    outcome: "Faster decisions, effort on the right channels, one shared set of numbers.",
    ctaTitle: "Live metrics. Real moves.",
    ctaBody: "No spreadsheet export required — keep the dashboard open.",
    ctaPrimary: "Start with reporting",
    ctaSecondary: "View plans",
    related: [
      { href: featureHref("crm"), label: "CRM", icon: Users },
      { href: featureHref("gelen-kutusu"), label: "Omnichannel", icon: Inbox },
      { href: featureHref("ai-reklam"), label: "AI Ads", icon: Megaphone },
    ],
  },
};

function MiniBars({
  bars,
  days,
  active,
}: {
  bars: number[];
  days?: string[];
  active: boolean;
}) {
  return (
    <div>
      <div className="flex h-24 items-end gap-1.5 sm:h-28 sm:gap-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="min-w-0 flex-1 rounded-t-md bg-bonero-green origin-bottom"
            initial={{ height: 8 }}
            animate={{
              height: active ? Math.max(10, Math.round((h / 100) * 112)) : Math.max(6, Math.round((h / 100) * 40)),
              opacity: active ? (i === bars.length - 1 ? 1 : 0.4 + i * 0.08) : 0.25,
            }}
            transition={{ duration: 0.45, delay: i * 0.04, ease }}
          />
        ))}
      </div>
      {days && (
        <div className="mt-2 flex gap-1.5 sm:gap-2">
          {days.map((d, i) => (
            <span
              key={d}
              className={`min-w-0 flex-1 text-center font-mono text-[9px] ${
                i === days.length - 1 ? "font-bold text-bonero-green" : "text-bonero-dark/35"
              }`}
            >
              {d}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function MetricTicker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-bonero-green/15 bg-bonero-dark/90 py-1.5">
      <motion.div
        className="flex w-max gap-6 whitespace-nowrap px-3 font-mono text-[10px] font-medium text-white/55"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-bonero-green shadow-[0_0_8px_rgba(24,131,71,0.5)]" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ReportingFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const t = copy[locale];
  const [activeQuestion, setActiveQuestion] = useState("what");
  const [activeSignal, setActiveSignal] = useState("sla");
  const [activeDay, setActiveDay] = useState(4);

  const [activeScenario, setActiveScenario] = useState("open");

  const question = t.questions.find((q) => q.id === activeQuestion) ?? t.questions[0];
  const signal = t.signals.find((s) => s.id === activeSignal) ?? t.signals[0];
  const day = t.week[activeDay] ?? t.week[4];
  const scenario = t.scenarios.find((s) => s.id === activeScenario) ?? t.scenarios[0];

  return (
    <div className="overflow-x-clip bg-background">
      {/* Hero — gelişmiş, site renkleri */}
      <section className="relative overflow-x-clip pb-16 pt-24 sm:pb-20 sm:pt-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 30% -10%, rgba(24,131,71,0.1), transparent 55%)",
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

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0 space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-bold tracking-[0.14em] text-bonero-green uppercase"
              >
                {t.eyebrow}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, ease }}
                className="font-heading text-3xl leading-[1.08] tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.85rem]"
              >
                {t.heroTitle}
                <span className="mt-1 block text-bonero-green">{t.heroAccent}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, ease }}
                className="max-w-lg text-base leading-relaxed text-bonero-dark/55 sm:text-lg"
              >
                {t.heroLead}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, ease }}
                className="relative overflow-hidden rounded-2xl border border-bonero-green/20 bg-white p-5 shadow-sm"
              >
                <div className="absolute top-0 left-0 h-full w-1 bg-bonero-green" />
                <p className="pl-3 font-heading text-base text-bonero-dark">{t.defineTitle}</p>
                <p className="mt-2 pl-3 text-sm leading-relaxed text-bonero-dark/55">{t.defineBody}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, ease }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  href={PANEL_REGISTER_URL}
                  className="group inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-bonero-green/20 hover:bg-bonero-green/90"
                >
                  {t.heroCtaPrimary}
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <a
                  href="#sorular"
                  className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70 shadow-sm"
                >
                  {t.heroCtaSecondary}
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ease }}
              className="min-w-0 lg:max-h-[min(420px,72vh)] lg:self-center"
            >
              <div className="flex max-h-[min(420px,72vh)] flex-col overflow-hidden rounded-2xl border border-bonero-dark/10 bg-bonero-dark shadow-xl shadow-bonero-dark/15">
                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3.5 py-2">
                  <div className="flex items-center gap-2">
                    <Activity size={13} className="text-bonero-green" />
                    <span className="font-mono text-[10px] font-semibold text-white/60">
                      bonero · {isEn ? "analytics" : "analitik"}
                    </span>
                  </div>
                  <motion.span
                    className="inline-flex items-center gap-1 rounded-full border border-bonero-green/40 bg-bonero-green/15 px-2 py-0.5 font-mono text-[8px] font-bold text-bonero-green"
                    animate={{ opacity: [0.65, 1, 0.65] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="h-1 w-1 rounded-full bg-bonero-green" />
                    LIVE
                  </motion.span>
                </div>

                <MetricTicker items={t.ticker} />

                <div className="min-h-0 flex-1 overflow-hidden bg-[#243044] p-3 sm:p-3.5">
                  <div className="h-full overflow-hidden rounded-xl border border-white/10 bg-white p-2.5 sm:p-3">
                    <ReportingMock active variant="hero" isEn={isEn} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Üç soru — soru konsolu */}
      <section id="sorular" className="scroll-mt-24 border-y border-bonero-dark/8 bg-[#f6f8f7] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] text-bonero-green uppercase">
                <HelpCircle size={13} />
                {isEn ? "Daily briefing" : "Günlük briefing"}
              </p>
              <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
                {t.questionsTitle}
              </h2>
              <p className="mt-3 text-sm text-bonero-dark/50 sm:text-base">{t.questionsLead}</p>
            </div>
            <p className="hidden text-xs text-bonero-dark/35 sm:block">{t.questionsHint}</p>
          </Reveal>

          <Reveal delay={0.06} className="mt-10">
            <div className="overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white shadow-sm lg:grid lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
              {/* Soru listesi */}
              <div className="flex border-b border-bonero-dark/8 bg-bonero-dark lg:flex-col lg:border-r lg:border-b-0">
                <div className="hidden items-center gap-2 border-b border-white/10 px-5 py-4 lg:flex">
                  <span className="font-mono text-[10px] font-semibold text-white/40">
                    {isEn ? "QUESTIONS" : "SORULAR"}
                  </span>
                  <span className="ml-auto font-mono text-[10px] text-bonero-green">
                    {String(t.questions.findIndex((q) => q.id === activeQuestion) + 1).padStart(2, "0")}
                    /03
                  </span>
                </div>

                <div className="flex flex-1 lg:flex-col">
                  {t.questions.map((q) => {
                    const Icon = q.icon;
                    const active = q.id === activeQuestion;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setActiveQuestion(q.id)}
                        className={`relative flex min-w-0 flex-1 flex-col gap-2 px-3 py-4 text-left transition-colors sm:px-5 sm:py-5 lg:flex-row lg:items-start ${
                          active ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
                        }`}
                      >
                        {active && (
                          <motion.div
                            layoutId="q-rail"
                            className="absolute inset-x-0 bottom-0 h-0.5 bg-bonero-green lg:inset-y-0 lg:right-auto lg:left-0 lg:h-auto lg:w-0.5"
                          />
                        )}
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            active
                              ? "bg-bonero-green text-white shadow-md shadow-bonero-green/30"
                              : "bg-white/10 text-white/45"
                          }`}
                        >
                          <Icon size={16} />
                        </span>
                        <div className="min-w-0">
                          <p className={`font-mono text-[10px] font-bold ${active ? "text-bonero-green" : "text-white/30"}`}>
                            {q.n}
                          </p>
                          <p className={`mt-0.5 text-xs font-bold sm:text-sm ${active ? "text-white" : "text-white/55"}`}>
                            {q.q}
                          </p>
                          <p className="mt-0.5 hidden text-[11px] text-white/35 lg:block">{q.short}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cevap paneli */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQuestion}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.28, ease }}
                  className="relative flex flex-col gap-6 p-5 sm:p-8"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-60"
                    style={{
                      background:
                        "radial-gradient(ellipse 60% 50% at 90% 0%, rgba(24,131,71,0.08), transparent 55%)",
                    }}
                    aria-hidden
                  />

                  <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_200px]">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-bonero-green/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-bonero-green uppercase">
                          {question.short}
                        </span>
                        <span className="font-mono text-[10px] text-bonero-dark/30">
                          {isEn ? "Dashboard answer" : "Dashboard cevabı"}
                        </span>
                      </div>
                      <h3 className="font-heading mt-3 text-2xl text-bonero-dark sm:text-3xl">{question.q}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-bonero-dark/55">{question.body}</p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl border border-bonero-green/20 bg-bonero-green/[0.05] px-5 py-6 text-center">
                      <p className="font-heading text-4xl font-bold tracking-tight text-bonero-dark">{question.metric}</p>
                      <p className="mt-1 text-xs text-bonero-dark/45">{question.metricLabel}</p>
                      <p
                        className={`mt-3 inline-flex items-center justify-center gap-1 text-sm font-semibold ${
                          question.up === true
                            ? "text-bonero-green"
                            : question.up === false
                              ? "text-red-500"
                              : "text-bonero-dark/55"
                        }`}
                      >
                        {question.up === true && <TrendingUp size={14} />}
                        {question.up === false && <TrendingDown size={14} />}
                        {question.delta}
                      </p>
                    </div>
                  </div>

                  <div className="relative rounded-2xl border border-bonero-dark/8 bg-[#f8faf9] p-4 sm:p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <p className="text-[10px] font-bold tracking-wide text-bonero-dark/35 uppercase">
                        {isEn ? "7-day trend" : "7 günlük trend"}
                      </p>
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-bonero-dark/35">
                        <span className="h-1.5 w-1.5 rounded-full bg-bonero-green" />
                        LIVE
                      </span>
                    </div>
                    <MiniBars bars={question.bars} days={question.days} active />
                  </div>

                  <div className="relative flex items-start gap-3 rounded-xl border border-bonero-green/15 bg-bonero-green/[0.04] px-4 py-3.5">
                    <Lightbulb size={16} className="mt-0.5 shrink-0 text-bonero-green" />
                    <p className="text-sm leading-relaxed text-bonero-dark/70">{question.insight}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sinyal → eylem */}
      <section className="bg-[#f6f8f7] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.signalsTitle}
            </h2>
            <p className="mt-3 text-sm text-bonero-dark/50">{t.signalsLead}</p>
          </Reveal>

          <div className="mt-10 overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white shadow-sm">
            <div className="divide-y divide-bonero-dark/8">
              {t.signals.map((s) => {
                const Icon = s.icon;
                const active = s.id === activeSignal;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveSignal(s.id)}
                    className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors sm:px-6 sm:py-5 ${
                      active ? "bg-bonero-green/[0.05]" : "hover:bg-[#f8faf9]"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        active ? "bg-bonero-green text-white shadow-md shadow-bonero-green/25" : "bg-bonero-dark/5 text-bonero-dark/45"
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-bonero-dark/35 uppercase">
                        {isEn ? "Signal" : "Sinyal"}
                      </p>
                      <p className="font-semibold text-bonero-dark">{s.signal}</p>
                    </div>
                    <ChevronRight size={16} className={active ? "text-bonero-green" : "text-bonero-dark/20"} />
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSignal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-t border-bonero-green/20 bg-bonero-green/[0.04] px-5 py-5 sm:px-6 sm:py-6"
              >
                <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">
                  {isEn ? "Recommended action" : "Önerilen eylem"}
                </p>
                <p className="mt-2 text-base leading-relaxed text-bonero-dark sm:text-lg">{signal.action}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Haftanın nabzı — dolu kart */}
      <section className="border-y border-bonero-dark/8 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.weekTitle}
            </h2>
            <p className="mt-3 text-sm text-bonero-dark/50">{t.weekLead}</p>
          </Reveal>

          <Reveal delay={0.06} className="mt-10">
            <div className="overflow-hidden rounded-2xl border border-bonero-dark/10 bg-[#f8faf9] shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bonero-dark/8 bg-white px-5 py-4 sm:px-6">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-bonero-dark/35 uppercase">
                      {isEn ? "Week total" : "Hafta toplam"}
                    </p>
                    <p className="font-heading text-2xl text-bonero-dark">{t.weekTotal}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-bonero-dark/35 uppercase">
                      {isEn ? "Daily avg." : "Günlük ort."}
                    </p>
                    <p className="font-heading text-2xl text-bonero-dark">{t.weekAvg}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-bonero-dark/35 uppercase">
                      {isEn ? "Peak" : "Zirve"}
                    </p>
                    <p className="font-heading text-2xl text-bonero-green">{t.weekPeak}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-bonero-green/10 px-3 py-1 text-sm font-semibold text-bonero-green">
                  <TrendingUp size={14} />
                  {t.weekDelta}
                </span>
              </div>

              <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,260px)]">
                <div>
                  <div className="flex items-end justify-between gap-1 sm:gap-2">
                    {t.week.map((d, i) => {
                      const selected = i === activeDay;
                      return (
                        <button
                          key={d.day}
                          type="button"
                          onClick={() => setActiveDay(i)}
                          className="group flex min-w-0 flex-1 flex-col items-center gap-2"
                        >
                          <motion.div
                            className={`w-full max-w-[2.75rem] rounded-t-lg ${
                              selected ? "bg-bonero-green" : "bg-bonero-dark/10 group-hover:bg-bonero-green/35"
                            }`}
                            initial={false}
                            animate={{ height: Math.max(28, Math.round(d.vol * 0.95)) }}
                            transition={{ type: "spring", stiffness: 220, damping: 24 }}
                          />
                          <span className={`text-[10px] font-semibold sm:text-xs ${selected ? "text-bonero-green" : "text-bonero-dark/40"}`}>
                            {d.day}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDay}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.22, ease }}
                    className="rounded-xl border border-bonero-dark/8 bg-white p-4 sm:p-5"
                  >
                    <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">
                      {day.day} · {day.vol} {isEn ? "volume" : "hacim"}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">{day.note}</p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="rounded-lg bg-[#f8faf9] px-2 py-2 text-center">
                        <p className="text-[9px] text-bonero-dark/35 uppercase">{isEn ? "Msgs" : "Mesaj"}</p>
                        <p className="font-semibold text-bonero-dark">{day.msgs}</p>
                      </div>
                      <div className="rounded-lg bg-[#f8faf9] px-2 py-2 text-center">
                        <p className="text-[9px] text-bonero-dark/35 uppercase">Lead</p>
                        <p className="font-semibold text-bonero-dark">{day.leads}</p>
                      </div>
                      <div className="rounded-lg bg-[#f8faf9] px-2 py-2 text-center">
                        <p className="text-[9px] text-bonero-dark/35 uppercase">{isEn ? "Reply" : "Yanıt"}</p>
                        <p className="font-semibold text-bonero-dark">{day.reply}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* Kanallar — hafta kartının altında tam genişlik */}
          <Reveal delay={0.1} className="mt-8">
            <h3 className="font-heading text-lg text-bonero-dark sm:text-xl">{t.channelsTitle}</h3>
            <p className="mt-1 text-sm text-bonero-dark/50">{t.channelsLead}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {t.channels.map((ch, i) => (
                <div
                  key={ch.name}
                  className="rounded-xl border border-bonero-dark/8 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ch.color }} />
                      <span className="text-sm font-semibold text-bonero-dark">{ch.name}</span>
                    </div>
                    <span className="font-mono text-xs text-bonero-dark/45">
                      {isEn ? "Conv." : "Dön."} {ch.conv}
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-bonero-dark/8">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: ch.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${ch.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.65, delay: i * 0.07, ease }}
                    />
                  </div>
                  <p className="mt-1.5 text-right font-mono text-[10px] text-bonero-dark/35">
                    {ch.pct}% {isEn ? "volume" : "hacim"}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gündelik rutinler — briefing deck */}
      <section className="bg-[#f6f8f7] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.scenariosTitle}
            </h2>
            <p className="mt-3 text-sm text-bonero-dark/50">{t.scenariosLead}</p>
          </Reveal>

          <div className="mt-10 overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white shadow-sm">
            <div className="grid grid-cols-1 divide-y divide-bonero-dark/8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {t.scenarios.map((s) => {
                const Icon = s.icon;
                const active = s.id === activeScenario;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveScenario(s.id)}
                    className={`relative px-4 py-4 text-left transition-colors sm:px-5 sm:py-5 ${
                      active ? "bg-bonero-green/[0.04]" : "hover:bg-[#f8faf9]"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="routine-tab"
                        className="absolute inset-x-0 top-0 h-0.5 bg-bonero-green sm:inset-x-auto sm:inset-y-0 sm:left-0 sm:h-auto sm:w-0.5"
                      />
                    )}
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          active
                            ? "bg-bonero-green text-white shadow-md shadow-bonero-green/25"
                            : "bg-bonero-dark/5 text-bonero-dark/45"
                        }`}
                      >
                        <Icon size={17} />
                      </span>
                      <div className="min-w-0">
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-bonero-dark/45">
                          <Clock size={9} />
                          {s.time}
                        </span>
                        <p className={`mt-1 text-sm font-bold ${active ? "text-bonero-dark" : "text-bonero-dark/55"}`}>
                          {s.label}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeScenario}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease }}
                className="grid gap-6 border-t border-bonero-dark/8 bg-[#f8faf9] p-5 sm:grid-cols-[minmax(0,1fr)_220px] sm:p-8 lg:grid-cols-[minmax(0,1fr)_260px]"
              >
                <div>
                  <p className="font-heading text-xl text-bonero-dark sm:text-2xl">{scenario.headline}</p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-bonero-dark/55">{scenario.text}</p>
                  <div className="mt-5 rounded-xl border border-bonero-green/20 bg-white p-4">
                    <p className="text-[10px] font-bold tracking-wide text-bonero-green uppercase">
                      {isEn ? "What you do in Bonero" : "Bonero’da ne yaparsınız"}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-bonero-dark">{scenario.action}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {scenario.stats.map((st) => (
                    <div
                      key={st.l}
                      className="rounded-xl border border-bonero-dark/8 bg-white px-4 py-3 text-center shadow-sm"
                    >
                      <p className="font-heading text-xl font-bold text-bonero-dark">{st.v}</p>
                      <p className="mt-0.5 text-[10px] text-bonero-dark/40 uppercase">{st.l}</p>
                    </div>
                  ))}
                </div>
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
              <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">{t.outcomeLabel}</p>
              <p className="font-heading mt-2 text-xl text-white sm:text-2xl">{t.outcome}</p>
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
