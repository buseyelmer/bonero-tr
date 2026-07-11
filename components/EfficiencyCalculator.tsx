"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

const copy = {
  tr: {
    eyebrow: "Verim Hesaplama",
    title: "Ajansınızın operasyonel verimini hemen hesaplayın",
    question: "Haftalık kaç saatini içerik onayına harcıyorsun?",
    hours: "saat / hafta",
    resultLabel: "Bonero ile haftada",
    resultUnit: "saat tasarruf edebilirsiniz",
    hint: "Onay döngülerini yarıya indiren AI akışı varsayımıyla hesaplanır.",
    cta: "Ücretsiz Demo Talep Et",
    secondary: "Bize Ulaşın",
  },
  en: {
    eyebrow: "Efficiency Calculator",
    title: "Calculate your agency’s operational efficiency",
    question: "How many hours a week do you spend on content approvals?",
    hours: "hrs / week",
    resultLabel: "With Bonero you can save",
    resultUnit: "hours per week",
    hint: "Based on cutting approval cycles roughly in half with AI workflows.",
    cta: "Request a Free Demo",
    secondary: "Contact Us",
  },
};

/** Rough model: Bonero recovers ~55% of approval time. */
function estimateSavings(hours: number) {
  return Math.max(1, Math.round(hours * 0.55));
}

export default function EfficiencyCalculator() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [hours, setHours] = useState(12);
  const savings = estimateSavings(hours);

  return (
    <section
      id="verim-hesaplama"
      className="relative overflow-hidden bg-background py-16 sm:py-24"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-5xl">
            {t.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-[1.75rem] border border-bonero-dark/8 bg-white/80 p-6 shadow-sm backdrop-blur-md sm:p-10">
            <label
              htmlFor="approval-hours"
              className="block text-base font-medium text-bonero-dark sm:text-lg"
            >
              {t.question}
            </label>

            <div className="mt-8 flex items-end justify-between gap-4">
              <span className="font-heading text-5xl tracking-tight text-bonero-dark tabular-nums sm:text-6xl">
                {hours}
              </span>
              <span className="pb-2 text-sm text-bonero-dark/45">{t.hours}</span>
            </div>

            <input
              id="approval-hours"
              type="range"
              min={2}
              max={40}
              step={1}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="bonero-slider mt-6 w-full"
              aria-valuemin={2}
              aria-valuemax={40}
              aria-valuenow={hours}
              aria-label={t.question}
            />

            <div className="mt-3 flex justify-between text-xs text-bonero-dark/35">
              <span>2</span>
              <span>40</span>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl bg-[#111827] px-6 py-7 sm:px-8">
              <p className="text-sm text-white/55">{t.resultLabel}</p>
              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={savings}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="font-heading text-5xl tracking-tight text-bonero-green tabular-nums sm:text-6xl"
                  >
                    {savings}
                  </motion.span>
                </AnimatePresence>
                <span className="text-lg text-white/80 sm:text-xl">
                  {t.resultUnit}
                </span>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/40">{t.hint}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-bonero-green px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-bonero-green/90"
              >
                {t.cta}
                <ArrowRight size={16} />
              </Link>
              <a
                href="mailto:hello@bonero.tr"
                className="inline-flex items-center justify-center rounded-lg border border-bonero-dark/12 px-7 py-3.5 text-sm font-medium text-bonero-dark transition-colors hover:border-bonero-dark/25"
              >
                {t.secondary}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
