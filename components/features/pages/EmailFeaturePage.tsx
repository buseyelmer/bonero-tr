"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import EmailMarketingMock from "@/components/features/mocks/EmailMarketingMock";
import { useLocale } from "@/components/LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const funnel = {
  tr: [
    {
      step: "Segment oluştur",
      body: "Satın alan, pasif veya yeni abone — filtreyi kur, liste hazır.",
      detail: "Davranış, etiket veya son aktiviteye göre segment.",
    },
    {
      step: "Kampanya tasarla",
      body: "Konu satırı, içerik ve CTA’yı bir arada düzenle. A/B testi aç.",
      detail: "Şablon seç veya sıfırdan yaz — önizleme anında.",
    },
    {
      step: "Gönder ve ölç",
      body: "Zamanla veya hemen gönder. Açılma ve tıklama oranını izle.",
      detail: "Sonuçlar dashboard’a düşer, bir sonraki segment netleşir.",
    },
  ],
  en: [
    {
      step: "Build a segment",
      body: "Buyers, inactive, or new subscribers — set the filter, list is ready.",
      detail: "Segment by behavior, tag, or last activity.",
    },
    {
      step: "Design the campaign",
      body: "Subject, body, and CTA in one editor. Turn on A/B testing.",
      detail: "Pick a template or write from scratch — preview instantly.",
    },
    {
      step: "Send and measure",
      body: "Schedule or send now. Watch open and click rates.",
      detail: "Results hit the dashboard, next segment becomes obvious.",
    },
  ],
};

export default function EmailFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const steps = funnel[locale];

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(24,131,71,0.1), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-bonero-dark/45 hover:text-bonero-dark"
          >
            <ArrowLeft size={14} />
            {isEn ? "All features" : "Tüm özellikler"}
          </Link>

          <p className="mt-8 text-sm font-medium tracking-wide text-bonero-green uppercase">
            {isEn ? "Email marketing" : "E-posta pazarlama"}
          </p>
          <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
            {isEn
              ? "Segment. Campaign. Send. Repeat."
              : "Segment. Kampanya. Gönder. Tekrarla."}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-bonero-dark/55">
            {isEn
              ? "Three actions from list to inbox — no export to a separate tool."
              : "Listeden gelen kutusuna üç eylem — ayrı araca export yok."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={PANEL_REGISTER_URL}
              className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white hover:bg-bonero-green/90"
            >
              {isEn ? "Open campaign studio" : "Kampanya stüdyosunu aç"}
              <ArrowUpRight size={15} />
            </Link>
            <a
              href="#eylemler"
              className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70"
            >
              {isEn ? "See the funnel" : "Huni akışını gör"}
            </a>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Reveal>
            <div className="rounded-[1.5rem] border border-bonero-dark/8 bg-white p-5 shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:p-6">
              <EmailMarketingMock active isEn={isEn} />
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="eylemler"
        className="scroll-mt-24 border-t border-bonero-dark/8 bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/40 uppercase">
              {isEn ? "Send funnel" : "Gönderim hunisi"}
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {isEn
                ? "List to inbox in three moves"
                : "Listeden gelen kutusuna üç hamle"}
            </h2>
          </Reveal>

          <ol className="mt-14 space-y-0">
            {steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.08}>
                <li>
                  <div className="rounded-2xl border border-bonero-green/15 bg-bonero-green/[0.04] p-6 sm:p-8">
                    <span className="font-mono text-xs font-bold text-bonero-green">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-heading mt-2 text-2xl text-bonero-dark">{s.step}</h3>
                    <p className="mt-3 text-base leading-relaxed text-bonero-dark/60">{s.body}</p>
                    <p className="mt-2 text-sm text-bonero-dark/45">{s.detail}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex justify-center py-3 text-bonero-green/40">
                      <ChevronDown size={24} />
                    </div>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-bonero-dark/8 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 rounded-[1.5rem] bg-bonero-green px-8 py-12 lg:grid-cols-2 lg:px-12">
            <div>
              <h2 className="font-heading text-2xl text-white sm:text-3xl">
                {isEn
                  ? "Lists clean. Campaigns shipped."
                  : "Listeler temiz. Kampanyalar gitti."}
              </h2>
              <ul className="mt-6 space-y-3">
                {(isEn
                  ? [
                      "Segments built from live customer data",
                      "A/B tests without a separate ESP",
                      "Results feed the next send decision",
                    ]
                  : [
                      "Segmentler canlı müşteri verisinden",
                      "Ayrı ESP olmadan A/B test",
                      "Sonuçlar bir sonraki gönderimi belirler",
                    ]
                ).map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                    <Check size={16} className="mt-0.5 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href={PANEL_REGISTER_URL}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-bonero-green"
              >
                {isEn ? "Send first campaign" : "İlk kampanyayı gönder"}
                <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/paketler"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-sm font-medium text-white"
              >
                {isEn ? "View plans" : "Paketlere bak"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
