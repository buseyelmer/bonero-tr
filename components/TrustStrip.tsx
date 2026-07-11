"use client";

import { Cloud, Lock, ScanSearch, ShieldCheck, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

type Badge = {
  icon: LucideIcon;
  title: { tr: string; en: string };
  subtitle: { tr: string; en: string };
  mark?: string;
};

const badges: Badge[] = [
  {
    icon: Lock,
    title: { tr: "256-bit AES Şifreleme", en: "256-bit AES Encryption" },
    subtitle: {
      tr: "Veriler transit ve at-rest şifreli",
      en: "Data encrypted in transit and at rest",
    },
    mark: "AES",
  },
  {
    icon: Cloud,
    title: { tr: "AWS Üzerinde Barındırma", en: "Hosted on AWS" },
    subtitle: {
      tr: "Kurumsal ölçekli altyapı",
      en: "Enterprise-grade infrastructure",
    },
    mark: "AWS",
  },
  {
    icon: ScanSearch,
    title: { tr: "Düzenli Penetrasyon Testleri", en: "Regular Penetration Tests" },
    subtitle: {
      tr: "Bağımsız güvenlik denetimleri",
      en: "Independent security audits",
    },
    mark: "PEN",
  },
  {
    icon: ShieldCheck,
    title: { tr: "SSL / TLS Sertifikası", en: "SSL / TLS Certified" },
    subtitle: {
      tr: "Uçtan uca güvenli bağlantı",
      en: "End-to-end secure connections",
    },
    mark: "SSL",
  },
];

const copy = {
  tr: {
    eyebrow: "Güven & Altyapı",
    title: "Müşteri verileriniz kurumsal standartta korunur",
    subtitle:
      "Ajanslar bize güveniyor çünkü güvenlik pazarlama değil — platformun omurgası.",
  },
  en: {
    eyebrow: "Trust & Stack",
    title: "Client data protected to enterprise standards",
    subtitle:
      "Agencies trust Bonero because security isn’t a slogan — it’s the backbone of the platform.",
  },
};

export default function TrustStrip() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section
      id="guven"
      aria-label={locale === "tr" ? "Güven ve altyapı" : "Trust and stack"}
      className="border-y border-bonero-dark/6 bg-[#f8fafc] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/60">
            {t.subtitle}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map(({ icon: Icon, title, subtitle, mark }, index) => (
            <li key={title.tr}>
              <Reveal delay={0.06 * index} className="h-full">
                <div className="flex h-full flex-col items-start rounded-2xl border border-bonero-dark/8 bg-white/70 px-5 py-5 backdrop-blur-sm transition-colors hover:border-bonero-dark/15">
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bonero-dark/[0.06] text-bonero-dark/55">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    {mark && (
                      <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-bonero-dark/30 uppercase">
                        {mark}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm font-semibold tracking-tight text-bonero-dark">
                    {title[locale]}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-bonero-dark/50">
                    {subtitle[locale]}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
