"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/ui/CtaButton";
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
          <div className="relative overflow-hidden rounded-[1.75rem] border border-bonero-dark/8 bg-white p-8 shadow-[0_24px_50px_-32px_rgba(30,41,59,0.18)] sm:p-10">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-bonero-green/[0.06] via-transparent to-bonero-dark/[0.03]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-bonero-green/10 blur-3xl"
              aria-hidden
            />

            <div className="relative z-[1] flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-lg">
                <p className="inline-flex items-center gap-2 rounded-full border border-bonero-green/20 bg-bonero-green/8 px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-bonero-green uppercase">
                  {t.eyebrow}
                </p>
                <h2 className="font-heading mt-4 text-2xl !font-extrabold tracking-wide text-bonero-dark sm:text-3xl">
                  {t.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
                  {t.lead}
                </p>
              </div>
              <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
                <CtaButton
                  href="/iletisim"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight size={15} />}
                >
                  {t.cta}
                </CtaButton>
                <Link
                  href="mailto:hello@bonero.tr"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-bonero-dark/12 bg-bonero-dark/[0.03] px-5 py-3 text-sm font-semibold text-bonero-dark/75 transition-all hover:border-bonero-dark/20 hover:bg-white hover:text-bonero-dark"
                >
                  <Mail size={15} />
                  hello@bonero.tr
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
