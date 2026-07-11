"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

const copy = {
  tr: {
    title: "Omnichannel operasyonunuzu dönüştürün.",
    subtitle: "Tüm kanallar, tek panel. 30 dakikada kurulum.",
    primary: "Ücretsiz Demo Talep Et",
    secondary: "Bize Ulaşın",
  },
  en: {
    title: "Transform your omnichannel operations.",
    subtitle: "All channels, one inbox. Setup in 30 minutes.",
    primary: "Request a Free Demo",
    secondary: "Contact Us",
  },
};

export default function FinalCta() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-bonero-dark px-8 py-14 text-center sm:px-12 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(24,131,71,0.35), transparent 55%)",
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-heading text-3xl tracking-wide text-white sm:text-4xl lg:text-5xl">
                {t.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/65 sm:text-xl">
                {t.subtitle}
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-bonero-green px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-bonero-green/90"
                >
                  {t.primary}
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="mailto:hello@bonero.tr"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  {t.secondary}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
