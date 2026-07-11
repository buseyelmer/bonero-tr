"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

type Plan = {
  name: { tr: string; en: string };
  audience: { tr: string; en: string };
  features: { tr: string[]; en: string[] };
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: { tr: "Başlangıç", en: "Starter" },
    audience: {
      tr: "Tek Ajans",
      en: "Single Agency",
    },
    features: {
      tr: [
        "Tek çalışma alanı",
        "Temel AI içerik üretimi",
        "Sosyal hesap bağlantıları",
      ],
      en: [
        "Single workspace",
        "Core AI content generation",
        "Social account connections",
      ],
    },
  },
  {
    name: { tr: "Pro", en: "Pro" },
    audience: {
      tr: "Çoklu Müşteri Yönetimi",
      en: "Multi-Client Management",
    },
    features: {
      tr: [
        "Sınırsız müşteri hesabı",
        "Onay akışları ve ekip rolleri",
        "Otomatik müşteri raporları",
      ],
      en: [
        "Unlimited client accounts",
        "Approval flows & team roles",
        "Automated client reporting",
      ],
    },
    highlighted: true,
  },
  {
    name: { tr: "Enterprise", en: "Enterprise" },
    audience: {
      tr: "Özel API Entegrasyonları",
      en: "Custom API Integrations",
    },
    features: {
      tr: [
        "Özel API ve SSO",
        "Dedicated başarı yöneticisi",
        "SLA ve güvenlik denetimleri",
      ],
      en: [
        "Custom API & SSO",
        "Dedicated success manager",
        "SLA & security reviews",
      ],
    },
  },
];

const copy = {
  tr: {
    eyebrow: "Paketler",
    title: "Ajanslara Özel Esnek Planlar",
    subtitle:
      "Ölçeğinize uygun paketi seçin — fiyatı birlikte netleştirelim, önce uyumu görün.",
    cta: "Planı Konuşalım",
    badge: "En çok tercih edilen",
  },
  en: {
    eyebrow: "Plans",
    title: "Flexible Plans Built for Agencies",
    subtitle:
      "Pick the tier that matches your scale — we’ll finalize pricing together once the fit is clear.",
    cta: "Talk About Plans",
    badge: "Most popular",
  },
};

export default function Pricing() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section id="paketler" className="bg-background py-16 sm:py-24">
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

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name.tr} delay={0.08 * index}>
              <article
                className={`group glass-panel flex h-full flex-col rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-7 ${
                  plan.highlighted
                    ? "ring-1 ring-bonero-green/25"
                    : ""
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-7 rounded-full bg-bonero-green px-3 py-1 text-[11px] font-medium tracking-wide text-white uppercase">
                    {t.badge}
                  </span>
                )}
                <h3 className="font-heading text-xl text-bonero-dark">
                  {plan.name[locale]}
                </h3>
                <p className="mt-1 text-sm font-medium text-bonero-dark/55">
                  {plan.audience[locale]}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features[locale].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-bonero-dark/65"
                    >
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-bonero-green"
                        strokeWidth={2.25}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/iletisim"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-bonero-green text-white hover:bg-bonero-green/90"
                      : "border border-bonero-dark/12 text-bonero-dark hover:border-bonero-dark/25"
                  }`}
                >
                  {t.cta}
                  <ArrowRight size={15} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
