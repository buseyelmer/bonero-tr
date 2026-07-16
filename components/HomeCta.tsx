"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  MessageCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";
import { WHATSAPP_URL } from "@/lib/contact";
import { cn } from "@/lib/cn";

type Variant = "ask" | "campaign" | "start";

const copy = {
  tr: {
    ask: {
      eyebrow: "Sorularınız",
      title: "Müşteri mesajlarını tek panelde toplamanın en net yolu.",
      body:
        "WhatsApp, Instagram, e-posta, CRM ve randevu akışını Bonero’da nasıl birleştireceğinizi birlikte netleştirelim. İşletmenize en doğru kurulumu birkaç mesajda çıkaralım.",
      cta: "WhatsApp’tan yaz",
      meta: ["Tek panel", "CRM & randevu", "Size uygun kurulum"],
      sideTitle: "İhtiyacınıza göre şekillenir",
      sideBody:
        "Hangi kanallar bağlanacak, ekip nasıl çalışacak, randevu ve CRM nasıl akacak: Bonero'yu sizin iş modelinize göre anlatırız.",
      rail: "Bonero uyumu",
    },
    campaign: {
      eyebrow: "Özel teklif",
      title: "Dağınık operasyonu bırakın, Bonero ile tek ekranda yönetin.",
      body:
        "Bugün başlayan işletmeler için öncelikli kurulum: mesaj kutuları, lead akışı ve randevu süreci aynı gün tek panelde çalışmaya başlasın.",
      cta: "Teklifi sor",
      meta: ["Öncelikli kurulum", "Mesaj + CRM", "Aynı gün başlangıç"],
      sideTitle: "Geçişi hızlandıralım",
      sideBody:
        "Farklı araçlar arasında kaybolmadan; WhatsApp, Instagram, müşteri takibi ve randevu yönetimini Bonero'da tek düzene oturtun.",
      rail: "Hızlı geçiş",
    },
    start: {
      eyebrow: "Hemen başla",
      title: "Mesajlar gelsin, lead'ler işlensin, randevular aksamasın.",
      body:
        "Bonero'ya kaydolun, kanallarınızı bağlayın ve işletme operasyonunu tek panelde toplamaya başlayın. Siz satışa ve müşteriye odaklanın, akış düzenli şekilde ilerlesin.",
      cta: "WhatsApp’tan başla",
      meta: ["~15 dk kurulum", "WhatsApp · IG · E-posta", "AI Agent destekli"],
      sideTitle: "İşletmeniz emin ellerde",
      sideBody:
        "Inbox, CRM, randevu hatırlatmaları ve raporlama aynı sistemde çalışsın; ekip ilk günden daha kontrollü ilerlesin.",
      rail: "Bugün canlı",
    },
  },
  en: {
    ask: {
      eyebrow: "Your questions",
      title: "The clearest way to bring customer messages into one panel.",
      body:
        "Let’s map how WhatsApp, Instagram, email, CRM, and bookings come together in Bonero. In just a few messages, we can shape the right setup for your business.",
      cta: "Message on WhatsApp",
      meta: ["One panel", "CRM & bookings", "Tailored setup"],
      sideTitle: "Built around your flow",
      sideBody:
        "Which channels to connect, how your team will work, and how CRM and bookings should flow: we explain Bonero around your business model.",
      rail: "Bonero fit",
    },
    campaign: {
      eyebrow: "Special offer",
      title: "Leave scattered operations behind and run everything in one view.",
      body:
        "Priority onboarding for businesses that start today: message inboxes, lead flow, and booking process ready to run in one panel the same day.",
      cta: "Ask about the offer",
      meta: ["Priority onboarding", "Messages + CRM", "Start same day"],
      sideTitle: "Make the switch faster",
      sideBody:
        "No more jumping between tools. Bring WhatsApp, Instagram, customer follow-up, and bookings into one Bonero workflow.",
      rail: "Fast switch",
    },
    start: {
      eyebrow: "Get started",
      title: "Let messages flow, leads move, and bookings stay on track.",
      body:
        "Sign up, connect your channels, and start running business operations from a single panel. You focus on customers and growth while the flow stays organized in Bonero.",
      cta: "Start on WhatsApp",
      meta: ["~15 min setup", "WhatsApp · IG · Email", "AI Agent assisted"],
      sideTitle: "Your business in safe hands",
      sideBody:
        "Inbox, CRM, booking reminders, and reporting work on the same system, so your team starts stronger from day one.",
      rail: "Live today",
    },
  },
};

function WaButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-bonero-dark px-6 py-3.5 text-sm font-semibold text-white transition-all",
        "shadow-[0_14px_30px_-18px_rgba(30,41,59,0.45)] hover:-translate-y-0.5 hover:bg-bonero-green hover:shadow-[0_20px_40px_-18px_rgba(24,131,71,0.45)]",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        aria-hidden
      />
      <MessageCircle size={16} />
      {children}
      <ArrowUpRight
        size={15}
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

function MetaRow({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
            dark
              ? "border border-white/12 bg-white/6 text-white/78"
              : "border border-bonero-dark/10 bg-white text-bonero-dark/55",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              dark ? "bg-bonero-green" : "bg-bonero-dark/25",
            )}
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function UnifiedCta({
  id,
  eyebrow,
  title,
  body,
  cta,
  meta,
  sideTitle,
  sideBody,
  rail,
  icon,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  meta: string[];
  sideTitle: string;
  sideBody: string;
  rail: string;
  icon: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-10 sm:py-14" aria-label={title}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.9rem] border border-bonero-dark/8 bg-white shadow-[0_28px_70px_-34px_rgba(30,41,59,0.22)]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 70% at 100% 0%, rgba(24,131,71,0.12), transparent 55%), linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(24,131,71,0.02) 100%)",
              }}
              aria-hidden
            />
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative p-8 sm:p-10 lg:p-12">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[11px] font-bold tracking-[0.18em] text-bonero-dark/38 uppercase">
                    {eyebrow}
                  </p>
                  <div className="hidden rounded-full border border-bonero-green/15 bg-bonero-green/6 px-3 py-1 text-[11px] font-semibold text-bonero-green sm:block">
                    Bonero
                  </div>
                </div>
                <h2 className="font-heading mt-4 max-w-xl text-3xl tracking-wide text-bonero-dark sm:text-[2.35rem] sm:leading-[1.12]">
                  {title}
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-bonero-dark/55">
                  {body}
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <WaButton className="sm:min-w-[13.5rem]">{cta}</WaButton>
                </div>
                <div className="mt-7">
                  <MetaRow items={meta} />
                </div>
              </div>

              <div className="border-t border-bonero-dark/8 bg-[linear-gradient(135deg,#133625_0%,#188347_45%,#1b9451_100%)] p-8 text-white sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-[1.15rem] border border-white/15 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-sm">
                      {icon}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold tracking-[0.18em] text-white/45 uppercase">
                        WhatsApp
                      </p>
                      <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-white/78">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
                        {rail}
                      </div>
                    </div>
                  </div>
                  <div className="mt-10">
                    <p className="text-lg font-semibold text-white">
                      {sideTitle}
                    </p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/72">
                      {sideBody}
                    </p>
                    <div className="mt-6 h-px w-16 bg-white/18" aria-hidden />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function HomeCta({
  variant,
  id,
}: {
  variant: Variant;
  id?: string;
}) {
  const { locale } = useLocale();
  const t = copy[locale][variant];

  switch (variant) {
    case "ask":
      return (
        <UnifiedCta
          id={id}
          eyebrow={t.eyebrow}
          title={t.title}
          body={t.body}
          cta={t.cta}
          meta={t.meta}
          sideTitle={t.sideTitle}
          sideBody={t.sideBody}
          rail={t.rail}
          icon={<MessageCircle size={20} />}
        />
      );
    case "campaign":
      return (
        <UnifiedCta
          id={id}
          eyebrow={t.eyebrow}
          title={t.title}
          body={t.body}
          cta={t.cta}
          meta={t.meta}
          sideTitle={t.sideTitle}
          sideBody={t.sideBody}
          rail={t.rail}
          icon={<Sparkles size={20} />}
        />
      );
    case "start":
      return (
        <UnifiedCta
          id={id}
          eyebrow={t.eyebrow}
          title={t.title}
          body={t.body}
          cta={t.cta}
          meta={t.meta}
          sideTitle={t.sideTitle}
          sideBody={t.sideBody}
          rail={t.rail}
          icon={<Zap size={20} />}
        />
      );
  }
}
