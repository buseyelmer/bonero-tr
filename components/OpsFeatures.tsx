"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  CalendarCheck,
  LayoutDashboard,
  UsersRound,
  BarChart3,
  FileText,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";
import { featureHref } from "@/lib/features";

const pillars: {
  icon: LucideIcon;
  href: string;
  title: { tr: string; en: string };
  body: { tr: string; en: string };
}[] = [
  {
    icon: UsersRound,
    title: { tr: "CRM & lead", en: "CRM & leads" },
    body: {
      tr: "Talep karta düşer, aşama ilerler — Excel’de kaybolmaz.",
      en: "Demand becomes a card and moves stages — it doesn’t vanish in Excel.",
    },
    href: featureHref("crm"),
  },
  {
    icon: CalendarCheck,
    title: { tr: "Randevu", en: "Bookings" },
    body: {
      tr: "Inbox’tan takvime; hatırlatma otomatik, no-show görünür.",
      en: "Inbox to calendar; reminders automatic, no-shows visible.",
    },
    href: featureHref("randevu"),
  },
  {
    icon: LayoutDashboard,
    title: { tr: "Omnichannel", en: "Omnichannel" },
    body: {
      tr: "WhatsApp, IG ve e-posta tek kuyrukta — bağlam kaybolmaz.",
      en: "WhatsApp, IG, and email in one queue — context stays intact.",
    },
    href: featureHref("gelen-kutusu"),
  },
  {
    icon: Bot,
    title: { tr: "AI Agent", en: "AI Agent" },
    body: {
      tr: "İlk yanıt 7/24; kritik anlarda tam bağlamla ekibe düşer.",
      en: "First reply 24/7; handoffs land with full context for your team.",
    },
    href: featureHref("yapay-zeka"),
  },
  {
    icon: FileText,
    title: { tr: "İçerik & onay", en: "Content & approval" },
    body: {
      tr: "Planla, onayla, zamanla — yayın panosu tek yerde.",
      en: "Plan, approve, schedule — your publish board stays in one place.",
    },
    href: featureHref("icerik"),
  },
  {
    icon: BarChart3,
    title: { tr: "Raporlama", en: "Reporting" },
    body: {
      tr: "Yanıt süresi, doluluk, kampanya — canlı metrik, net hamle.",
      en: "Reply time, occupancy, campaigns — live metrics, clear next moves.",
    },
    href: featureHref("raporlama"),
  },
];

const copy = {
  tr: {
    eyebrow: "Operasyon omurgası",
    title: "İşletmenizi ayakta tutan",
    accent: "altı katman.",
    lead: "Mesajdan randevuya, lead’den rapora — Bonero günlük işi tek panelde birleştirir. Her katman bir sonraki hamleyi hazırlar.",
    detail: "Detayı gör",
  },
  en: {
    eyebrow: "Operations spine",
    title: "The six layers that",
    accent: "keep you running.",
    lead: "From message to booking, lead to report — Bonero unifies daily work in one panel. Each layer sets up the next move.",
    detail: "See details",
  },
};

export default function OpsFeatures() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section
      id="operasyon"
      className="relative overflow-hidden py-16 sm:py-24"
      aria-labelledby="operasyon-baslik"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 80% 10%, rgba(24,131,71,0.08), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.eyebrow}
          </p>
          <h2
            id="operasyon-baslik"
            className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl"
          >
            {t.title}
            <span className="mt-1 block text-bonero-green">{t.accent}</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-bonero-dark/55">
            {t.lead}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title.en} delay={i * 0.05}>
                <li>
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col rounded-2xl border border-bonero-dark/8 bg-white p-6 shadow-sm transition-colors hover:border-bonero-green/30 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green transition-colors group-hover:bg-bonero-green group-hover:text-white">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <h3 className="font-heading mt-4 text-lg text-bonero-dark">
                      {p.title[locale]}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-bonero-dark/55">
                      {p.body[locale]}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-bonero-green">
                      {t.detail}
                      <ArrowUpRight
                        size={12}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
