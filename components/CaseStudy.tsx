"use client";

import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

const copy = {
  tr: {
    eyebrow: "Başarı Hikayesi",
    title: "Bonero ile Pulse Agency %30 verim artışı sağladı",
    quote:
      "Onay sürelerimiz yarıya indi, ekip aynı kadroyla iki kat daha fazla müşteri hesabını yönetebiliyor. Bonero operasyonumuzun omurgası oldu.",
    name: "Ayşe Kaya",
    role: "Operasyon Müdürü, Pulse Agency",
    metric: "%30",
    metricLabel: "operasyonel verim artışı",
  },
  en: {
    eyebrow: "Case Study",
    title: "Pulse Agency gained 30% efficiency with Bonero",
    quote:
      "Approval cycles dropped by half, and the same team now runs twice as many client accounts. Bonero became the backbone of our operations.",
    name: "Ayşe Kaya",
    role: "Operations Manager, Pulse Agency",
    metric: "30%",
    metricLabel: "operational efficiency gain",
  },
};

export default function CaseStudy() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section id="basari-hikayesi" className="bg-[#111827] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_auto]">
            <div>
              <p className="text-sm font-medium tracking-wide text-bonero-green uppercase">
                {t.eyebrow}
              </p>
              <h2 className="font-heading mt-3 max-w-xl text-3xl tracking-wide text-white sm:text-4xl">
                {t.title}
              </h2>
              <blockquote className="mt-8 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-10 flex items-center gap-4">
                <div
                  className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full"
                  aria-hidden="true"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(145deg, #2a9d5c 0%, #188347 45%, #0f172a 100%)",
                    }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-base font-semibold tracking-wide text-white">
                    AK
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-white/50">{t.role}</p>
                </div>
              </div>
            </div>

            <div className="lg:text-right">
              <p className="font-heading text-6xl tracking-wide text-white sm:text-7xl">
                {t.metric}
              </p>
              <p className="mt-3 max-w-[12rem] text-sm leading-snug text-white/50 lg:ml-auto">
                {t.metricLabel}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
