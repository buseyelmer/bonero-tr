"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BarChart3, Lightbulb, Zap } from "lucide-react";
import Reveal from "@/components/Reveal";
import FeatureCtaBlock from "@/components/ui/FeatureCtaBlock";
import ReportingMock from "@/components/features/mocks/ReportingMock";
import { useLocale } from "@/components/LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const decisions = {
  tr: [
    {
      icon: BarChart3,
      signal: "Yanıt süresi yükseldi",
      action: "Inbox SLA’yı sıkılaştır veya ekibe uyarı gönder.",
    },
    {
      icon: Lightbulb,
      signal: "WhatsApp dönüşümü düştü",
      action: "Son 7 gün mesajlarını incele, şablonları güncelle.",
    },
    {
      icon: Zap,
      signal: "Lead hacmi patladı",
      action: "CRM’de atama kuralını aç, kapasiteyi dengele.",
    },
  ],
  en: [
    {
      icon: BarChart3,
      signal: "Response time spiked",
      action: "Tighten inbox SLA or alert the team.",
    },
    {
      icon: Lightbulb,
      signal: "WhatsApp conversion dropped",
      action: "Review the last 7 days of messages, update templates.",
    },
    {
      icon: Zap,
      signal: "Lead volume surged",
      action: "Turn on CRM assignment rules and rebalance capacity.",
    },
  ],
};

export default function ReportingFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const cards = decisions[locale];

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 15% 25%, rgba(24,131,71,0.1), transparent 55%)",
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
                {isEn ? "Reporting" : "Raporlama"}
              </p>
              <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
                {isEn
                  ? "Open the dashboard. Decide. Act."
                  : "Dashboard’u aç. Karar ver. Harekete geç."}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-bonero-dark/55">
                {isEn
                  ? "Volume, response time, conversion by channel — the signal and the next move in one view."
                  : "Hacim, yanıt süresi, kanala göre dönüşüm — sinyal ve sonraki hamle aynı görünümde."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={PANEL_REGISTER_URL}
                  className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white hover:bg-bonero-green/90"
                >
                  {isEn ? "Open dashboard" : "Dashboard’u aç"}
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href="#eylemler"
                  className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70"
                >
                  {isEn ? "Decision examples" : "Karar örnekleri"}
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-bonero-dark/8 bg-white p-5 shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:p-6">
              <ReportingMock active isEn={isEn} />
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
              {isEn ? "Signal → action" : "Sinyal → eylem"}
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {isEn
                ? "Numbers that tell you what to do"
                : "Ne yapacağını söyleyen rakamlar"}
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-3">
            {cards.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.signal} delay={i * 0.06}>
                  <li className="h-full rounded-2xl border border-bonero-dark/8 bg-[#f8faf9] p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green">
                      <Icon size={18} />
                    </span>
                    <p className="mt-4 text-xs font-semibold tracking-wide text-bonero-dark/40 uppercase">
                      {isEn ? "Signal" : "Sinyal"}
                    </p>
                    <p className="font-heading mt-1 text-lg text-bonero-dark">{c.signal}</p>
                    <p className="mt-3 text-xs font-semibold tracking-wide text-bonero-green uppercase">
                      {isEn ? "Action" : "Eylem"}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-bonero-dark/55">{c.action}</p>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <FeatureCtaBlock
        title={isEn ? "Live metrics. Real moves." : "Canlı metrik. Gerçek hamle."}
        body={isEn ? "No spreadsheet export required." : "Tablo export’una gerek yok."}
        primaryLabel={isEn ? "Start with reporting" : "Raporlamayla başla"}
        secondaryLabel={isEn ? "View plans" : "Paketlere bak"}
      />
    </div>
  );
}
