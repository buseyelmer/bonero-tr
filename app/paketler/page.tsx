import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import TrustStrip from "@/components/TrustStrip";
import { PANEL_REGISTER_URL } from "@/lib/panel";

export const metadata: Metadata = {
  title: "Paketler",
  description:
    "Bonero fiyatlandırma: Starter, Agency ve Enterprise. Ajans ölçeğinize uygun planı seçin, kaydolun ve hemen başlayın.",
  alternates: { canonical: "/paketler" },
};

const plans = [
  {
    name: "Starter",
    price: "Birlikte netleştirelim",
    description: "Küçük ekipler ve ilk adım için.",
    popular: false,
    features: [
      "Tek çalışma alanı",
      "Temel AI içerik üretimi",
      "3 sosyal hesap bağlantısı",
      "Temel performans raporları",
      "E-posta destek",
    ],
  },
  {
    name: "Agency",
    price: "Ajanslara özel",
    description: "Çoklu müşteri yöneten ajanslar için.",
    popular: true,
    features: [
      "Sınırsız müşteri hesabı",
      "AI içerik + reklam üretimi",
      "Onay akışları",
      "Sınırsız sosyal hesap",
      "Otomatik müşteri raporları",
      "Ekip rolleri ve yetkiler",
      "Öncelikli destek",
    ],
  },
  {
    name: "Enterprise",
    price: "Özel teklif",
    description: "Ölçek, güvenlik ve entegrasyon ihtiyacı için.",
    popular: false,
    features: [
      "Özel API ve SSO",
      "Dedicated başarı yöneticisi",
      "SLA ve güvenlik denetimleri",
      "Özel entegrasyonlar",
      "Kurumsal eğitim",
      "7/24 öncelikli destek",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="flex-1 bg-background">
        <section className="pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
                Paketler
              </p>
              <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
                Ajansınıza uygun planı seçin
              </h1>
              <p className="mt-4 text-base leading-relaxed text-bonero-dark/60">
                Şeffaf paketler, net özellikler. Ölçeğiniz büyüdükçe Bonero da
                sizinle büyür.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`relative flex flex-col rounded-2xl p-7 glass-panel shadow-sm ${
                    plan.popular
                      ? "ring-1 ring-bonero-green/25"
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-7 rounded-md bg-bonero-green px-2.5 py-1 text-xs font-medium text-white">
                      Popüler
                    </span>
                  )}

                  <h2 className="font-heading text-xl text-bonero-dark">
                    {plan.name}
                  </h2>
                  <p className="mt-1 text-sm text-bonero-dark/55">
                    {plan.description}
                  </p>
                  <p className="font-heading mt-5 text-2xl tracking-wide text-bonero-dark">
                    {plan.price}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
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
                    Hemen Başla
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
