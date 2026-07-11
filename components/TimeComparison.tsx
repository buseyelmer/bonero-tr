"use client";

import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

const rows = [
  {
    label: { tr: "5 platform yönetimi", en: "Managing 5 platforms" },
    manual: { tr: "120 dk / gün", en: "120 min / day" },
    bonero: { tr: "15 dk / gün", en: "15 min / day" },
  },
  {
    label: { tr: "Haftalık operasyon", en: "Weekly ops" },
    manual: { tr: "10 saat", en: "10 hours" },
    bonero: { tr: "1,25 saat", en: "1.25 hours" },
  },
  {
    label: { tr: "Aylık kayıp / kazanç", en: "Monthly loss / gain" },
    manual: { tr: "~40 saat kayıp", en: "~40 hrs lost" },
    bonero: { tr: "~35 saat geri", en: "~35 hrs back" },
  },
];

const copy = {
  tr: {
    eyebrow: "Manuel vs. Bonero",
    title: "İçerik Yönetiminde Kaybettiğiniz Saatleri Geri Kazanın.",
    subtitle:
      "Ajanslar zamanı nakit olarak satar. Aynı işi beş panelde yapmak ile tek panelde yapmak arasındaki fark, doğrudan faturalanabilir saattir.",
    manual: "Manuel",
    withBonero: "Bonero ile",
    math: "Matematik",
    mathBody:
      "5 platform × ~24 dk/gün = 120 dk. Bonero’da tek inbox + AI taslak = ~15 dk. Günlük 105 dakika; ayda ~35 saat geri kazanım.",
    footnote: "Tipik çok kanallı ajans operasyonu varsayımıyla hesaplanmıştır.",
  },
  en: {
    eyebrow: "Manual vs. Bonero",
    title: "Reclaim the hours you’re losing on content ops.",
    subtitle:
      "Agencies sell time as cash. The gap between five panels and one panel is billable hours.",
    manual: "Manual",
    withBonero: "With Bonero",
    math: "The math",
    mathBody:
      "5 platforms × ~24 min/day = 120 min. Bonero’s single inbox + AI drafts ≈ 15 min. That’s 105 minutes daily — ~35 hours back per month.",
    footnote: "Based on a typical multi-channel agency workflow.",
  },
};

export default function TimeComparison() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section
      id="zaman-karsilastirma"
      className="relative overflow-hidden bg-[#111827] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-bonero-green uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-white sm:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/55">
            {t.subtitle}
          </p>
        </Reveal>

        {/* Hero numbers */}
        <Reveal delay={0.08} className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 sm:px-8">
              <p className="text-xs font-medium tracking-wide text-white/40 uppercase">
                {t.manual}
              </p>
              <p className="font-heading mt-3 text-5xl tracking-tight text-white/35 tabular-nums sm:text-6xl">
                120
              </p>
              <p className="mt-2 text-sm text-white/45">
                {locale === "tr" ? "dakika / gün · 5 platform" : "min / day · 5 platforms"}
              </p>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-full rounded-full bg-white/25" />
              </div>
            </div>

            <div className="rounded-2xl border border-bonero-green/30 bg-bonero-green/10 px-6 py-8 sm:px-8">
              <p className="text-xs font-medium tracking-wide text-bonero-green uppercase">
                {t.withBonero}
              </p>
              <p className="font-heading mt-3 text-5xl tracking-tight text-bonero-green tabular-nums sm:text-6xl">
                15
              </p>
              <p className="mt-2 text-sm text-white/70">
                {locale === "tr" ? "dakika / gün · tek panel" : "min / day · one panel"}
              </p>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[12.5%] rounded-full bg-bonero-green" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Comparison table */}
        <Reveal delay={0.14} className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-px bg-white/10 text-sm">
            <div className="bg-[#111827] px-4 py-3 text-xs font-medium tracking-wide text-white/35 uppercase sm:px-6" />
            <div className="bg-[#111827] px-4 py-3 text-center text-xs font-medium tracking-wide text-white/40 uppercase sm:px-6">
              {t.manual}
            </div>
            <div className="bg-[#111827] px-4 py-3 text-center text-xs font-medium tracking-wide text-bonero-green uppercase sm:px-6">
              {t.withBonero}
            </div>

            {rows.map((row) => (
              <div key={row.label.tr} className="contents">
                <div className="bg-[#151c2c] px-4 py-4 font-medium text-white/80 sm:px-6">
                  {row.label[locale]}
                </div>
                <div className="bg-[#151c2c] px-4 py-4 text-center text-white/40 line-through decoration-white/25 sm:px-6">
                  {row.manual[locale]}
                </div>
                <div className="bg-[#151c2c] px-4 py-4 text-center font-semibold text-bonero-green sm:px-6">
                  {row.bonero[locale]}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-white/35 uppercase">
            {t.math}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/55 sm:text-base">
            {t.mathBody}
          </p>
          <p className="mt-3 text-xs text-white/30">{t.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
