"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import AdsMock from "@/components/features/mocks/AdsMock";
import { useLocale } from "@/components/LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const actions = {
  tr: [
    {
      n: "01",
      title: "Platformları bağla",
      body: "Meta, Google, TikTok — tek masada. Bütçe ve durum yan yana.",
    },
    {
      n: "02",
      title: "Brief ver",
      body: "Ürün, hedef kitle, teklif — AI’ya kısa brief yeter.",
    },
    {
      n: "03",
      title: "Varyasyon üret",
      body: "Başlık, görsel, CTA kombinasyonları saniyeler içinde hazır.",
    },
    {
      n: "04",
      title: "Yayınla ve izle",
      body: "Kazanan varyasyonu seç, kampanyayı aç, performansı tek ekranda takip et.",
    },
  ],
  en: [
    {
      n: "01",
      title: "Connect platforms",
      body: "Meta, Google, TikTok — one desk. Budget and status side by side.",
    },
    {
      n: "02",
      title: "Drop a brief",
      body: "Product, audience, offer — a short brief is enough for AI.",
    },
    {
      n: "03",
      title: "Generate variants",
      body: "Headline, visual, and CTA combos ready in seconds.",
    },
    {
      n: "04",
      title: "Launch and watch",
      body: "Pick the winner, go live, track performance on one screen.",
    },
  ],
};

export default function AdsFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const steps = actions[locale];

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 85% 15%, rgba(24,131,71,0.14), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-bonero-dark/45 hover:text-bonero-dark"
          >
            <ArrowLeft size={14} />
            {isEn ? "All features" : "Tüm özellikler"}
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-sm font-medium tracking-wide text-bonero-green uppercase">
                {isEn ? "AI ads" : "AI reklam"}
              </p>
              <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
                {isEn
                  ? "Brief in. Creatives out. All platforms live."
                  : "Brief gir. Kreatif çık. Tüm platformlar yayında."}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-bonero-dark/55">
                {isEn
                  ? "Connect ad accounts, spin AI variants, launch — without jumping between five tabs."
                  : "Reklam hesaplarını bağla, AI varyasyon üret, yayınla — beş sekme arasında zıplamadan."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={PANEL_REGISTER_URL}
                  className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white hover:bg-bonero-green/90"
                >
                  {isEn ? "Open ad desk" : "Reklam masasını aç"}
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href="#eylemler"
                  className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70"
                >
                  {isEn ? "See the workflow" : "İş akışını gör"}
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-bonero-dark/8 bg-white p-5 shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:p-6">
              <AdsMock active isEn={isEn} />
            </div>
          </div>
        </div>
      </section>

      <section
        id="eylemler"
        className="scroll-mt-24 border-t border-bonero-dark/8 bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-xl">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/40 uppercase">
              {isEn ? "Creative to campaign" : "Kreatiften kampanyaya"}
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {isEn
                ? "One desk for every ad action"
                : "Her reklam eylemi tek masada"}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-bonero-dark/8 bg-[#f8faf9] p-6">
                  <span className="font-mono text-sm font-bold text-bonero-green">{s.n}</span>
                  <h3 className="font-heading mt-3 text-xl text-bonero-dark">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-bonero-dark/8 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 rounded-[1.5rem] bg-bonero-green px-8 py-12 lg:grid-cols-2 lg:px-12">
            <div>
              <h2 className="font-heading text-2xl text-white sm:text-3xl">
                {isEn
                  ? "Creatives fast. Spend clear."
                  : "Kreatif hızlı. Harcama net."}
              </h2>
              <ul className="mt-6 space-y-3">
                {(isEn
                  ? [
                      "Multi-platform from one brief",
                      "AI variants ready before the meeting ends",
                      "Launch and compare without spreadsheet chaos",
                    ]
                  : [
                      "Tek brief ile çoklu platform",
                      "Toplantı bitmeden AI varyasyonlar hazır",
                      "Tablo karmaşası olmadan yayınla ve karşılaştır",
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
                {isEn ? "Start advertising" : "Reklama başla"}
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
