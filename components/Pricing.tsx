"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

type Plan = {
  id: string;
  name: { tr: string; en: string };
  forWho: { tr: string; en: string };
  price: { tr: string; en: string };
  features: { tr: string[]; en: string[] };
  featured?: boolean;
};

const plans: Plan[] = [
  {
    id: "starter",
    name: { tr: "Başlangıç", en: "Starter" },
    forWho: { tr: "Tek ajans · ilk adım", en: "Single agency · first step" },
    price: { tr: "Birlikte netleştirelim", en: "Finalize together" },
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
    id: "pro",
    name: { tr: "Pro", en: "Pro" },
    forWho: {
      tr: "Çoklu müşteri · ajans temposu",
      en: "Multi-client · agency tempo",
    },
    price: { tr: "Ajanslara özel", en: "Built for agencies" },
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
    featured: true,
  },
  {
    id: "enterprise",
    name: { tr: "Enterprise", en: "Enterprise" },
    forWho: {
      tr: "Kurumsal ölçek · API & SLA",
      en: "Enterprise scale · API & SLA",
    },
    price: { tr: "Özel teklif", en: "Custom quote" },
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
    title: "Ajansınıza uygun paket",
    subtitle:
      "Üç net paket. Ölçeğinizi seçin — fiyatı uyum netleşince konuşalım.",
    cta: "Bu paketi konuşalım",
    popular: "En çok tercih",
    compare: "Tüm paketleri karşılaştır",
  },
  en: {
    eyebrow: "Packages",
    title: "The package that fits your agency",
    subtitle:
      "Three clear packages. Pick your scale — pricing after the fit is clear.",
    cta: "Talk about this package",
    popular: "Most chosen",
    compare: "Compare all packages",
  },
};

export default function Pricing() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section
      id="paketler"
      className="py-16 sm:py-24"
      style={{ background: "#f7f9f8" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-bonero-green uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
            {t.subtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:items-stretch md:gap-5">
          {plans.map((plan, index) => {
            const featured = Boolean(plan.featured);
            return (
              <Reveal key={plan.id} delay={0.06 * index} className="h-full">
                <article
                  className={`flex h-full flex-col rounded-3xl p-6 sm:p-7 ${
                    featured
                      ? "bg-bonero-dark text-white shadow-xl shadow-bonero-dark/20"
                      : "bg-white text-bonero-dark shadow-sm"
                  }`}
                >
                  {/* Badge in normal flow — never absolute over content */}
                  <div className="mb-5 min-h-[1.75rem]">
                    {featured ? (
                      <span className="inline-flex rounded-full bg-bonero-green px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
                        {t.popular}
                      </span>
                    ) : (
                      <span
                        className={`text-[11px] font-bold tracking-[0.16em] uppercase ${
                          featured ? "text-white/40" : "text-bonero-dark/35"
                        }`}
                      >
                        {locale === "tr" ? "Paket" : "Package"}{" "}
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-2xl tracking-wide break-words sm:text-[1.75rem]">
                    {plan.name[locale]}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-snug break-words ${
                      featured ? "text-white/50" : "text-bonero-dark/50"
                    }`}
                  >
                    {plan.forWho[locale]}
                  </p>

                  <p
                    className={`font-heading mt-6 text-xl tracking-wide break-words ${
                      featured ? "text-bonero-green" : "text-bonero-dark"
                    }`}
                  >
                    {plan.price[locale]}
                  </p>

                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {plan.features[locale].map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-2.5 text-sm leading-snug break-words ${
                          featured ? "text-white/75" : "text-bonero-dark/65"
                        }`}
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-bonero-green"
                          strokeWidth={2.25}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/iletisim"
                    className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90 ${
                      featured
                        ? "bg-bonero-green text-white"
                        : "bg-bonero-dark text-white"
                    }`}
                  >
                    {t.cta}
                    <ArrowRight size={15} />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/paketler"
            className="text-sm font-medium text-bonero-dark/45 underline-offset-4 transition-colors hover:text-bonero-dark hover:underline"
          >
            {t.compare} →
          </Link>
        </div>
      </div>
    </section>
  );
}
