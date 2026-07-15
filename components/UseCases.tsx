"use client";

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
import { motion } from "framer-motion";
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
      tr: "Boş slot azalır, doluluk oranı artar",
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
    eyebrow: "Kimler için",
    title: "İşinize uyan senaryo",
    subtitle: "Her işletme tipi için tek bir net aksiyon akışı.",
    outcome: "Sonuç",
  },
  en: {
    eyebrow: "Who it’s for",
    title: "A scenario that fits your work",
    subtitle: "One clear action flow per business type.",
    outcome: "Outcome",
  },
};

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

  return (
    <section
      id="kullanim-senaryolari"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{
        background:
          "linear-gradient(180deg, #f4f7f5 0%, #eef3f0 45%, #f7f9f8 100%)",
      }}
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-bonero-dark/55">
            {t.subtitle}
          </p>
        </Reveal>

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            const Scene = scenes[i];
            const reverse = i % 2 === 1;
            return (
              <Reveal key={uc.id} delay={0.04}>
                <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                  <div className={reverse ? "lg:order-2" : undefined}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bonero-green text-white">
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">
                        {uc.tagline[locale]}
                      </p>
                    </div>
                    <h3 className="font-heading mt-5 text-2xl tracking-wide text-bonero-dark sm:text-3xl">
                      {uc.title[locale]}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-bonero-dark/55">
                      {uc.description[locale]}
                    </p>
                    <ul className="mt-8 space-y-4">
                      {uc.beats.map((beat) => (
                        <li key={beat.label[locale]} className="flex gap-3">
                          <Check
                            size={16}
                            className="mt-0.5 shrink-0 text-bonero-green"
                          />
                          <span>
                            <span className="block text-sm font-semibold text-bonero-dark">
                              {beat.label[locale]}
                            </span>
                            <span className="mt-0.5 block text-sm text-bonero-dark/50">
                              {beat.detail[locale]}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-8 inline-flex rounded-full border border-bonero-green/20 bg-bonero-green/5 px-4 py-2 text-sm font-semibold text-bonero-green">
                      {uc.outcome[locale]}
                    </p>
                  </div>
                  <div
                    className={`relative min-h-[280px] overflow-hidden rounded-[1.5rem] border border-bonero-dark/8 bg-white p-5 shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:min-h-[320px] sm:p-7 ${
                      reverse ? "lg:order-1" : ""
                    }`}
                  >
                    <Scene locale={locale} />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
