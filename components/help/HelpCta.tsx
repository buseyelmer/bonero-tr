"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";

const copy = {
  tr: {
    eyebrow: "Destek",
    title: "Hâlâ yardıma mı ihtiyacınız var?",
    lead: "Destek ekibimiz operasyonunuza özel yanıt verir — genelde 1 iş günü içinde.",
    cta: "Destek talebi oluştur",
  },
  en: {
    eyebrow: "Support",
    title: "Still need help?",
    lead: "Our support team replies with answers tailored to your operations — usually within one business day.",
    cta: "Open a support request",
  },
};

export default function HelpCta() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className="border-t border-bonero-dark/8 bg-background py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div className="max-w-lg">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-bonero-dark/40 uppercase">
                {t.eyebrow}
              </p>
              <h2 className="font-heading mt-2 text-2xl !font-extrabold tracking-wide text-bonero-dark sm:text-3xl">
                {t.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
                {t.lead}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-bonero-green/90"
              >
                {t.cta}
                <ArrowRight size={15} />
              </Link>
              <a
                href="mailto:hello@bonero.tr"
                className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 px-5 py-2.5 text-sm font-medium text-bonero-dark/70 transition-colors hover:border-bonero-dark/25 hover:text-bonero-dark"
              >
                <Mail size={15} />
                hello@bonero.tr
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
