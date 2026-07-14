"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const copy = {
  tr: {
    title: "Hemen başlayın.",
    subtitle: "Hesap açın. Kanalları bağlayın. Aynı gün yanıtlayın.",
    primary: "Ücretsiz kayıt ol",
    secondary: "İletişime geç",
  },
  en: {
    title: "Start now.",
    subtitle: "Create an account. Connect channels. Reply the same day.",
    primary: "Sign up free",
    secondary: "Contact us",
  },
};

export default function FinalCta() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-bonero-dark px-8 py-12 text-center sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(24,131,71,0.35), transparent 55%)",
              }}
            />
            <div className="relative mx-auto max-w-xl">
              <h2 className="font-heading text-3xl tracking-wide text-white sm:text-4xl">
                {t.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
                {t.subtitle}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={PANEL_REGISTER_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-bonero-green px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-bonero-green/90"
                >
                  {t.primary}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  {t.secondary}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
