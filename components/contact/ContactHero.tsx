"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, Mail, Phone } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import { useLocale } from "@/components/LocaleProvider";
import {
  CONTACT_CITY_EN,
  CONTACT_CITY_TR,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/contact";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;

const copy = {
  tr: {
    eyebrow: "İletişim",
    brand: "Bonero",
    h1: "Haydi",
    h1Accent: "konuşalım.",
    leadBefore: "Demo, destek veya işbirliği — yazmanız yeterli. Hemen kullanmaya başlamak için",
    leadLink: "hesap açın",
    leadAfter: ".",
    ctaForm: "Formu doldur",
    ctaEmail: "E-posta gönder",
    statusTitle: "bonero — status",
    available: "Müsait",
    status: [
      { label: "Çalışma saatleri", value: "Pzt–Cuma · 09:00–18:00" },
      { label: "Yanıt süresi", value: "1 iş günü içinde" },
      { label: "Konum", value: CONTACT_CITY_TR },
    ],
    channels: [
      {
        key: "email",
        label: "E-posta",
        value: CONTACT_EMAIL,
        href: CONTACT_EMAIL_HREF,
        action: "Yaz →",
        external: true,
      },
      {
        key: "phone",
        label: "Telefon",
        value: CONTACT_PHONE_DISPLAY,
        href: WHATSAPP_URL,
        action: "Ara →",
        external: true,
      },
      {
        key: "address",
        label: "Adres",
        value: CONTACT_CITY_TR,
        href: undefined,
        action: undefined,
        external: false,
      },
    ],
  },
  en: {
    eyebrow: "Contact",
    brand: "Bonero",
    h1: "Let's",
    h1Accent: "talk.",
    leadBefore: "Demo, support, or partnership — just reach out. To start using Bonero right away,",
    leadLink: "create an account",
    leadAfter: ".",
    ctaForm: "Fill out the form",
    ctaEmail: "Send an email",
    statusTitle: "bonero — status",
    available: "Available",
    status: [
      { label: "Business hours", value: "Mon–Fri · 09:00–18:00" },
      { label: "Response time", value: "Within 1 business day" },
      { label: "Location", value: CONTACT_CITY_EN },
    ],
    channels: [
      {
        key: "email",
        label: "Email",
        value: CONTACT_EMAIL,
        href: CONTACT_EMAIL_HREF,
        action: "Write →",
        external: true,
      },
      {
        key: "phone",
        label: "Phone",
        value: CONTACT_PHONE_DISPLAY,
        href: WHATSAPP_URL,
        action: "Call →",
        external: true,
      },
      {
        key: "address",
        label: "Address",
        value: CONTACT_CITY_EN,
        href: undefined,
        action: undefined,
        external: false,
      },
    ],
  },
};

const channelIcons = {
  email: Mail,
  phone: Phone,
  address: MapPin,
} as const;

export default function ContactHero() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className="relative overflow-x-clip bg-background pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pb-20">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 15%, rgba(24,131,71,0.1), transparent 55%), radial-gradient(ellipse 40% 35% at 10% 90%, rgba(30,41,59,0.04), transparent 50%)",
        }}
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <motion.p
              className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              {t.eyebrow}
            </motion.p>

            <motion.p
              className="font-heading mt-3 text-[clamp(2.2rem,4.5vw,3.1rem)] font-extrabold leading-none tracking-tight text-bonero-dark"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.04, ease }}
            >
              {t.brand}
            </motion.p>

            <motion.h1
              className="font-heading mt-4 text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] tracking-wide text-bonero-dark"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease }}
            >
              {t.h1}{" "}
              <span className="text-bonero-green">{t.h1Accent}</span>
            </motion.h1>

            <motion.p
              className="mt-5 max-w-lg text-base leading-relaxed text-bonero-dark/55 sm:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18, ease }}
            >
              {t.leadBefore}{" "}
              <a
                href={PANEL_REGISTER_URL}
                className="font-semibold text-bonero-green underline-offset-2 hover:underline"
              >
                {t.leadLink}
              </a>
              {t.leadAfter}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28, ease }}
            >
              <CtaButton
                href="#form"
                variant="primary"
                size="md"
                icon={<ArrowUpRight size={15} />}
              >
                {t.ctaForm}
              </CtaButton>
              <CtaButton
                href={CONTACT_EMAIL_HREF}
                variant="secondary"
                size="md"
                external
              >
                {t.ctaEmail}
              </CtaButton>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          >
            <div className="overflow-hidden rounded-[1.25rem] border border-bonero-dark/8 bg-white shadow-[0_20px_50px_rgba(30,41,59,0.08)]">
              <div className="flex items-center gap-2 border-b border-bonero-dark/6 bg-[#f6f8f7] px-4 py-3">
                <Clock size={14} className="text-bonero-green" />
                <p className="font-mono text-[11px] font-semibold tracking-wide text-bonero-dark/50">
                  {t.statusTitle}
                </p>
                <span className="ml-auto flex items-center gap-1.5 text-[10px] font-bold text-bonero-green uppercase">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green opacity-50" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-bonero-green" />
                  </span>
                  {t.available}
                </span>
              </div>
              <ul className="divide-y divide-bonero-dark/6">
                {t.status.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-baseline justify-between gap-4 px-4 py-3.5 sm:px-5"
                  >
                    <span className="text-[11px] font-semibold tracking-wide text-bonero-dark/40 uppercase">
                      {s.label}
                    </span>
                    <span className="text-right text-sm font-semibold text-bonero-dark">
                      {s.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-14 grid gap-3 sm:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease }}
        >
          {t.channels.map((ch) => {
            const Icon = channelIcons[ch.key as keyof typeof channelIcons];
            const className =
              "group flex items-center gap-3 rounded-2xl border border-bonero-dark/8 bg-white/90 px-4 py-4 transition-colors hover:border-bonero-green/30";

            return (
              <div key={ch.key} className={className}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-semibold tracking-[0.14em] text-bonero-dark/40 uppercase">
                    {ch.label}
                  </span>
                  {ch.href ? (
                    <a
                      href={ch.href}
                      target={ch.external ? "_blank" : undefined}
                      rel={ch.external ? "noopener noreferrer" : undefined}
                      className="mt-0.5 block truncate text-sm font-semibold text-bonero-dark transition-colors hover:text-bonero-green sm:text-base"
                    >
                      {ch.value}
                    </a>
                  ) : (
                    <span className="mt-0.5 block truncate text-sm font-semibold text-bonero-dark sm:text-base">
                      {ch.value}
                    </span>
                  )}
                </span>
                {ch.action && ch.href && (
                  <a
                    href={ch.href}
                    target={ch.external ? "_blank" : undefined}
                    rel={ch.external ? "noopener noreferrer" : undefined}
                    className="shrink-0 rounded-lg bg-bonero-green px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-bonero-dark"
                  >
                    {ch.action}
                  </a>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
