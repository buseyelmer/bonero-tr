"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import TrustStrip from "@/components/TrustStrip";
import { useLocale } from "@/components/LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

type Plan = {
  name: string;
  price: { tr: string; en: string };
  description: { tr: string; en: string };
  popular: boolean;
  features: { tr: string[]; en: string[] };
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: { tr: "Birlikte netleştirelim", en: "Finalize together" },
    description: {
      tr: "Küçük ekipler ve ilk adım için.",
      en: "For small teams taking their first step.",
    },
    popular: false,
    features: {
      tr: [
        "Tek çalışma alanı",
        "Temel AI içerik üretimi",
        "3 sosyal hesap bağlantısı",
        "Temel performans raporları",
        "E-posta destek",
      ],
      en: [
        "Single workspace",
        "Core AI content generation",
        "3 social account connections",
        "Basic performance reports",
        "Email support",
      ],
    },
  },
  {
    name: "Pro",
    price: { tr: "İşletmelere özel", en: "Built for businesses" },
    description: {
      tr: "Çoklu müşteri yöneten ekipler için.",
      en: "For teams managing multiple clients.",
    },
    popular: true,
    features: {
      tr: [
        "Sınırsız müşteri hesabı",
        "AI içerik + reklam üretimi",
        "Onay akışları",
        "Sınırsız sosyal hesap",
        "Otomatik müşteri raporları",
        "Ekip rolleri ve yetkiler",
        "Öncelikli destek",
      ],
      en: [
        "Unlimited client accounts",
        "AI content + ad generation",
        "Approval workflows",
        "Unlimited social accounts",
        "Automated client reporting",
        "Team roles & permissions",
        "Priority support",
      ],
    },
  },
  {
    name: "Enterprise",
    price: { tr: "Özel teklif", en: "Custom quote" },
    description: {
      tr: "Ölçek, güvenlik ve entegrasyon ihtiyacı için.",
      en: "For scale, security, and integration needs.",
    },
    popular: false,
    features: {
      tr: [
        "Özel API ve SSO",
        "Dedicated başarı yöneticisi",
        "SLA ve güvenlik denetimleri",
        "Özel entegrasyonlar",
        "Kurumsal eğitim",
        "7/24 öncelikli destek",
      ],
      en: [
        "Custom API & SSO",
        "Dedicated success manager",
        "SLA & security reviews",
        "Custom integrations",
        "Enterprise training",
        "24/7 priority support",
      ],
    },
  },
];

const copy = {
  tr: {
    eyebrow: "Paketler",
    title: "İşletmenize uygun planı seçin",
    subtitle:
      "Şeffaf paketler, net özellikler. Ölçeğiniz büyüdükçe Bonero da sizinle büyür.",
    popular: "Popüler",
    cta: "Hemen Başla",
  },
  en: {
    eyebrow: "Packages",
    title: "Choose the plan that fits your business",
    subtitle:
      "Transparent packages, clear features. As you scale, Bonero scales with you.",
    popular: "Popular",
    cta: "Get Started",
  },
};

export default function PackagesPage() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <main className="flex-1 bg-background">
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              {t.eyebrow}
            </p>
            <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {t.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-bonero-dark/60">
              {t.subtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl p-7 glass-panel shadow-sm ${
                  plan.popular ? "ring-1 ring-bonero-green/25" : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-7 rounded-md bg-bonero-green px-2.5 py-1 text-xs font-medium text-white">
                    {t.popular}
                  </span>
                )}

                <h2 className="font-heading text-xl text-bonero-dark">
                  {plan.name}
                </h2>
                <p className="mt-1 text-sm text-bonero-dark/55">
                  {plan.description[locale]}
                </p>
                <p className="font-heading mt-5 text-2xl tracking-wide text-bonero-dark">
                  {plan.price[locale]}
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
                        strokeWidth={2}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={PANEL_REGISTER_URL}
                  className={`mt-8 inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
                    plan.popular
                      ? "bg-bonero-green text-white hover:bg-bonero-green/90"
                      : "border border-bonero-dark/12 text-bonero-dark hover:border-bonero-dark/25"
                  }`}
                >
                  {t.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TrustStrip />
    </main>
  );
}
