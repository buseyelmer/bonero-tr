"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  CalendarClock,
  Check,
  LayoutDashboard,
  Mail,
  Megaphone,
  MessageCircle,
  Send,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

type Locale = "tr" | "en";

type UseCase = {
  id: string;
  icon: LucideIcon;
  title: Record<Locale, string>;
  tagline: Record<Locale, string>;
  description: Record<Locale, string>;
  beats: { label: Record<Locale, string>; detail: Record<Locale, string> }[];
  outcome: Record<Locale, string>;
};

const useCases: UseCase[] = [
  {
    id: "omnichannel",
    icon: LayoutDashboard,
    title: {
      tr: "Çok kanallı hizmet işletmeleri",
      en: "Multi-channel service businesses",
    },
    tagline: {
      tr: "Tüm kanallar tek ekranda",
      en: "Every channel on one screen",
    },
    description: {
      tr: "Hizmet sektöründe WhatsApp, Instagram, e-posta ve web formları ayrı uygulamalarda dağılmasın. Tüm müşteri taleplerini tek ekrandan görün, yanıtlayın ve takip edin.",
      en: "In services, WhatsApp, Instagram, email, and web forms shouldn't live in separate apps. See every customer request on one screen — reply and follow up without switching tabs.",
    },
    beats: [
      {
        label: { tr: "Kanalları bağla", en: "Connect channels" },
        detail: {
          tr: "WhatsApp, IG ve e-posta tek tıkla panele gelir",
          en: "WhatsApp, IG, and email land in the panel in one click",
        },
      },
      {
        label: { tr: "Tek gelen kutusu", en: "One inbox" },
        detail: {
          tr: "Okunmamışlar ve öncelikler tek listede",
          en: "Unread items and priorities in one list",
        },
      },
      {
        label: { tr: "Hızlı yanıt", en: "Fast reply" },
        detail: {
          tr: "AI taslak önerir; siz onaylayıp gönderirsiniz",
          en: "AI suggests drafts; you review and send",
        },
      },
    ],
    outcome: {
      tr: "Hiçbir mesaj kaçmaz, müşteri beklemez",
      en: "No message slips through; customers don't wait",
    },
  },
  {
    id: "email-marketing",
    icon: Mail,
    title: {
      tr: "E-posta pazarlaması yapanlar",
      en: "Email marketing for services",
    },
    tagline: {
      tr: "Kampanyadan gönderime tek akış",
      en: "Campaign to send in one flow",
    },
    description: {
      tr: "Hizmet sektöründe müşterilerinize düzenli e-posta göndermek isteyenler için. Liste yönetimi, kampanya taslağı ve gönderim tek panelde — ayrı araçlara gerek kalmaz.",
      en: "For service businesses that want to reach customers by email. List management, campaign drafts, and sending live in one panel — no extra tools required.",
    },
    beats: [
      {
        label: { tr: "Liste oluştur", en: "Build your list" },
        detail: {
          tr: "Müşteri segmentlerini tek yerden yönetin",
          en: "Manage customer segments from one place",
        },
      },
      {
        label: { tr: "Kampanya taslağı", en: "Campaign draft" },
        detail: {
          tr: "AI marka tonunda e-posta metni önerir",
          en: "AI drafts on-brand email copy",
        },
      },
      {
        label: { tr: "Gönder & ölç", en: "Send & measure" },
        detail: {
          tr: "Açılma ve tıklama oranlarını canlı izleyin",
          en: "Track opens and clicks in real time",
        },
      },
    ],
    outcome: {
      tr: "Düzenli iletişim, daha sadık müşteri kitlesi",
      en: "Consistent outreach, a more loyal customer base",
    },
  },
  {
    id: "appointments",
    icon: CalendarClock,
    title: {
      tr: "Randevu ile çalışan işletmeler",
      en: "Appointment-based businesses",
    },
    tagline: {
      tr: "Kuaför, güzellik merkezi ve daha fazlası",
      en: "Salons, beauty centers, and more",
    },
    description: {
      tr: "Kuaför, güzellik merkezi ve benzeri randevu ile çalışan işletmeler için. Randevu taleplerini tek yerden yönetin; otomatik hatırlatma ile no-show oranını düşürün.",
      en: "For hairdressers, beauty salons, and similar appointment-led businesses. Manage booking requests in one place; cut no-shows with automatic reminders.",
    },
    beats: [
      {
        label: { tr: "Randevu talebi", en: "Booking request" },
        detail: {
          tr: "DM veya WhatsApp'tan gelen talep sıraya girer",
          en: "DM or WhatsApp requests join the queue",
        },
      },
      {
        label: { tr: "Takvim senkronu", en: "Calendar sync" },
        detail: {
          tr: "Onaylanan randevu takvime işlenir",
          en: "Confirmed bookings land on your calendar",
        },
      },
      {
        label: { tr: "Otomatik hatırlatma", en: "Auto reminder" },
        detail: {
          tr: "24 saat önce SMS veya WhatsApp bildirimi gider",
          en: "SMS or WhatsApp reminder goes out 24h before",
        },
      },
    ],
    outcome: {
      tr: "Boş koltuk azalır, doluluk oranı artar",
      en: "Fewer empty slots, higher occupancy",
    },
  },
  {
    id: "self-ads",
    icon: Megaphone,
    title: {
      tr: "Kendi reklamını yönetenler",
      en: "Self-managed advertising",
    },
    tagline: {
      tr: "Kendiniz yönetin",
      en: "Run it yourself",
    },
    description: {
      tr: "Reklamı dışarıdan yönetmek istemeyen, kendi başına Meta ve Instagram reklamlarını yönetmek isteyen işletmeler için. AI metin ve varyasyon üretir; siz onaylayıp yayına alırsınız.",
      en: "For businesses that want to run Meta and Instagram ads themselves — no middleman required. AI generates copy and variants; you approve and go live.",
    },
    beats: [
      {
        label: { tr: "Hedef belirle", en: "Set your goal" },
        detail: {
          tr: "Trafik, lead veya satış hedefini seçin",
          en: "Pick traffic, leads, or sales as your goal",
        },
      },
      {
        label: { tr: "AI kreatif", en: "AI creative" },
        detail: {
          tr: "Hook, gövde ve A/B varyasyonları hazır gelir",
          en: "Hooks, body copy, and A/B variants ready to go",
        },
      },
      {
        label: { tr: "Yayına al", en: "Go live" },
        detail: {
          tr: "Onaylayın; reklam doğrudan Meta'ya gider",
          en: "Approve; the ad goes straight to Meta",
        },
      },
    ],
    outcome: {
      tr: "Ek maliyet olmadan profesyonel reklam yönetimi",
      en: "Professional ad management without middleman fees",
    },
  },
];

const copy = {
  tr: {
    eyebrow: "Kullanım Senaryoları",
    title: "Hizmet sektörüne özel çözümler",
    subtitle:
      "Çok kanallı iletişimden e-posta pazarlamasına, randevu hatırlatmalarından kendi reklam yönetimine — işinize uygun senaryoyu seçin.",
    flow: "Akış",
    outcome: "Sonuç",
  },
  en: {
    eyebrow: "Use Cases",
    title: "Built for the service sector",
    subtitle:
      "From omnichannel inbox to email marketing, appointment reminders, and self-serve ads — pick the scenario that fits your business.",
    flow: "Flow",
    outcome: "Outcome",
  },
};

const CYCLE = 6200;
const ease = [0.22, 1, 0.36, 1] as const;

function SceneOmnichannel({ locale }: { locale: Locale }) {
  const channels = [
    {
      Icon: MessageCircle,
      label: "WhatsApp",
      text:
        locale === "tr"
          ? "Fiyat bilgisi alabilir miyim?"
          : "Can I get pricing info?",
      c: "#25D366",
    },
    {
      Icon: MessageCircle,
      label: "Instagram",
      text:
        locale === "tr"
          ? "Randevu için müsait misiniz?"
          : "Are you available for a booking?",
      c: "#E1306C",
    },
    {
      Icon: Mail,
      label: locale === "tr" ? "E-posta" : "Email",
      text:
        locale === "tr"
          ? "Hizmet detaylarınızı öğrenmek istiyorum"
          : "I'd like to learn about your services",
      c: "#4285F4",
    },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-2">
      {channels.map((ch, i) => (
        <motion.div
          key={ch.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.18, duration: 0.4, ease }}
          className="flex items-center gap-3 rounded-2xl border border-bonero-dark/8 bg-white px-3.5 py-3 shadow-sm"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${ch.c}18` }}
          >
            <ch.Icon size={16} strokeWidth={1.75} style={{ color: ch.c }} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-bonero-dark">{ch.label}</p>
            <p className="truncate text-[11px] text-bonero-dark/45">{ch.text}</p>
          </div>
          <Check size={14} className="text-bonero-green" strokeWidth={2.5} />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.35, ease }}
        className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-bonero-green/10 px-3 py-2"
      >
        <LayoutDashboard size={14} className="text-bonero-green" />
        <span className="text-[11px] font-bold text-bonero-green">
          {locale === "tr" ? "Tek gelen kutusunda" : "In one unified inbox"}
        </span>
      </motion.div>
    </div>
  );
}

function SceneEmailMarketing({ locale }: { locale: Locale }) {
  return (
    <div className="flex h-full flex-col justify-center gap-4 px-2">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.4, ease }}
        className="rounded-2xl border border-bonero-dark/8 bg-white p-4 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <Mail size={15} className="text-bonero-green" />
          <span className="text-xs font-bold text-bonero-dark">
            {locale === "tr" ? "Kampanya taslağı" : "Campaign draft"}
          </span>
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-bonero-dark/55">
          {locale === "tr"
            ? "“Bu hafta özel indirimlerimizden yararlanın — sizi bekliyoruz!”"
            : "“Enjoy our special offers this week — we look forward to seeing you!”"}
        </p>
      </motion.div>

      <div className="flex gap-2">
        {[
          {
            label: locale === "tr" ? "1.240 alıcı" : "1,240 recipients",
            sub: locale === "tr" ? "Aktif liste" : "Active list",
          },
          {
            label: locale === "tr" ? "%32 açılma" : "32% open rate",
            sub: locale === "tr" ? "Son kampanya" : "Last campaign",
          },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.35, ease }}
            className="flex flex-1 flex-col rounded-2xl border border-bonero-dark/8 bg-white px-3 py-2.5 shadow-sm"
          >
            <span className="text-[11px] font-bold text-bonero-dark">
              {item.label}
            </span>
            <span className="text-[10px] text-bonero-dark/40">{item.sub}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 280, damping: 18 }}
        className="flex items-center justify-center gap-2 rounded-xl bg-bonero-green px-4 py-2.5 text-white shadow-md shadow-bonero-green/25"
      >
        <Send size={14} />
        <span className="text-[11px] font-bold">
          {locale === "tr" ? "Kampanyayı gönder" : "Send campaign"}
        </span>
      </motion.div>
    </div>
  );
}

function SceneAppointments({ locale }: { locale: Locale }) {
  const slots = [
    {
      time: "10:00",
      client: locale === "tr" ? "Ayşe K." : "Sarah K.",
      service: locale === "tr" ? "Saç kesimi" : "Haircut",
      reminded: true,
    },
    {
      time: "11:30",
      client: locale === "tr" ? "Mehmet D." : "Mike D.",
      service: locale === "tr" ? "Bakım" : "Treatment",
      reminded: true,
    },
    {
      time: "14:00",
      client: locale === "tr" ? "Zeynep A." : "Zoe A.",
      service: locale === "tr" ? "Manikür" : "Manicure",
      reminded: false,
    },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-2">
      {slots.map((slot, i) => (
        <motion.div
          key={slot.time}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12 + i * 0.16, duration: 0.4, ease }}
          className="flex items-center gap-3 rounded-2xl border border-bonero-dark/8 bg-white px-3.5 py-3 shadow-sm"
        >
          <span className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green">
            <span className="text-[10px] font-bold leading-none">{slot.time}</span>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-bonero-dark">
              {slot.client} · {slot.service}
            </p>
          </div>
          {slot.reminded ? (
            <span className="flex items-center gap-1 rounded-full bg-bonero-green/10 px-2 py-0.5 text-[10px] font-bold text-bonero-green">
              <Bell size={10} />
              {locale === "tr" ? "Hatırlatıldı" : "Reminded"}
            </span>
          ) : (
            <motion.span
              className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.85, type: "spring", stiffness: 280, damping: 18 }}
            >
              {locale === "tr" ? "Hatırlat" : "Remind"}
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function SceneSelfAds({ locale }: { locale: Locale }) {
  const variants = [
    {
      id: "A",
      hook:
        locale === "tr"
          ? "Bu hafta %20 indirim — kaçırmayın!"
          : "20% off this week — don't miss out!",
      ctr: "2.4%",
      win: true,
    },
    {
      id: "B",
      hook:
        locale === "tr"
          ? "Sizi özledik — geri dönün"
          : "We miss you — come back",
      ctr: "1.8%",
      win: false,
    },
    {
      id: "C",
      hook:
        locale === "tr"
          ? "Yeni müşterilere özel fırsat"
          : "Special offer for new customers",
      ctr: "3.1%",
      win: false,
    },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-2">
      {variants.map((v, i) => (
        <motion.div
          key={v.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12 + i * 0.16, duration: 0.4, ease }}
          className={`flex items-start gap-3 rounded-2xl border px-3.5 py-3 shadow-sm ${
            v.win
              ? "border-bonero-green/30 bg-bonero-green/5"
              : "border-bonero-dark/8 bg-white"
          }`}
        >
          <span
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
              v.win
                ? "bg-bonero-green text-white"
                : "bg-bonero-dark/[0.05] text-bonero-dark/50"
            }`}
          >
            {v.id}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-medium text-bonero-dark/80">
              {v.hook}
            </p>
            <span className="mt-1 inline-block text-[10px] font-bold text-bonero-dark/40">
              CTR {v.ctr}
              {v.win
                ? ` · ${locale === "tr" ? "Kazanan" : "Winner"}`
                : ""}
            </span>
          </div>
          {v.win && (
            <Check size={14} className="mt-0.5 text-bonero-green" strokeWidth={2.5} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

const scenes = [
  SceneOmnichannel,
  SceneEmailMarketing,
  SceneAppointments,
  SceneSelfAds,
];

export default function UseCases() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [active, setActive] = useState(0);
  const [beat, setBeat] = useState(0);
  const [inView, setInView] = useState(false);
  const current = useCases[active];
  const Icon = current.icon;
  const Scene = scenes[active];

  useEffect(() => {
    const el = document.getElementById("kullanim-senaryolari");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    setBeat(0);
    const beatTimers = current.beats.map((_, i) =>
      window.setTimeout(() => setBeat(i), (i * CYCLE) / current.beats.length),
    );
    const next = window.setTimeout(() => {
      setActive((p) => (p + 1) % useCases.length);
    }, CYCLE);
    return () => {
      beatTimers.forEach(clearTimeout);
      clearTimeout(next);
    };
  }, [active, inView, current.beats]);

  return (
    <section
      id="kullanim-senaryolari"
      className="relative overflow-hidden py-16 sm:py-24"
      style={{
        background:
          "linear-gradient(180deg, #f4f7f5 0%, #eef3f0 50%, #f7f9f8 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 70% 0%, rgba(24,131,71,0.1), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.65rem]">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
            {t.subtitle}
          </p>
        </Reveal>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {useCases.map((uc, i) => {
            const on = active === i;
            const UIcon = uc.icon;
            return (
              <button
                key={uc.id}
                type="button"
                onClick={() => setActive(i)}
                className={`inline-flex shrink-0 items-center gap-2.5 rounded-2xl px-4 py-3 text-left transition-colors ${
                  on
                    ? "bg-bonero-dark text-white shadow-lg shadow-bonero-dark/15"
                    : "bg-white/80 text-bonero-dark/55 ring-1 ring-bonero-dark/8 hover:bg-white hover:text-bonero-dark"
                }`}
              >
                <UIcon size={16} strokeWidth={1.75} />
                <span className="text-sm font-semibold tracking-tight">
                  {uc.title[locale]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid min-w-0 overflow-hidden rounded-[1.5rem] border border-bonero-dark/8 bg-white shadow-[0_20px_50px_-28px_rgba(30,41,59,0.25)] lg:grid-cols-12">
          <div className="flex min-w-0 flex-col justify-between gap-8 border-b border-bonero-dark/6 p-6 sm:p-8 lg:col-span-5 lg:border-r lg:border-b-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bonero-green text-white">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">
                    {current.tagline[locale]}
                  </p>
                </div>
                <h3 className="font-heading mt-5 text-2xl tracking-wide text-bonero-dark sm:text-3xl">
                  {current.title[locale]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
                  {current.description[locale]}
                </p>
              </motion.div>
            </AnimatePresence>

            <div>
              <p className="mb-3 text-[11px] font-bold tracking-wide text-bonero-dark/35 uppercase">
                {t.flow}
              </p>
              <ol className="space-y-2">
                {current.beats.map((b, i) => {
                  const on = beat === i;
                  return (
                    <li
                      key={b.label.tr}
                      className={`flex gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                        on ? "bg-bonero-green/8" : "bg-transparent"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          on
                            ? "bg-bonero-green text-white"
                            : "bg-bonero-dark/8 text-bonero-dark/40"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-semibold ${
                            on ? "text-bonero-dark" : "text-bonero-dark/45"
                          }`}
                        >
                          {b.label[locale]}
                        </p>
                        <p
                          className={`text-xs ${
                            on ? "text-bonero-dark/55" : "text-bonero-dark/30"
                          }`}
                        >
                          {b.detail[locale]}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden bg-[#f8faf9] p-5 pb-28 sm:min-h-[360px] sm:p-7 sm:pb-28 lg:col-span-7">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(30,41,59,0.06) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
              aria-hidden="true"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.35, ease }}
                className="relative min-h-[200px]"
              >
                <Scene locale={locale} />
              </motion.div>
            </AnimatePresence>

            <motion.div
              key={`out-${current.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4, ease }}
              className="absolute right-4 bottom-4 left-4 sm:right-6 sm:bottom-6 sm:left-6"
            >
              <div className="rounded-2xl border border-bonero-green/20 bg-white/95 px-4 py-3 shadow-md backdrop-blur-sm">
                <p className="text-[10px] font-bold tracking-wide text-bonero-green uppercase">
                  {t.outcome}
                </p>
                <p className="mt-0.5 text-sm leading-snug font-semibold break-words text-bonero-dark">
                  {current.outcome[locale]}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          key={active}
          className="mt-4 h-0.5 origin-left rounded-full bg-bonero-green"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: CYCLE / 1000, ease: "linear" }}
        />
      </div>
    </section>
  );
}
