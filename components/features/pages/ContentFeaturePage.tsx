"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  PenLine,
  Send,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import ContentMock from "@/components/features/mocks/ContentMock";
import { useLocale } from "@/components/LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const weekFlow = {
  tr: [
    {
      day: "01",
      icon: Calendar,
      action: "Planla",
      body: "Haftalık grid: kanal, format, tarih.",
    },
    {
      day: "02",
      icon: PenLine,
      action: "Yaz & onayla",
      body: "Taslak bitir, ekip onayını al, kuyruğa koy.",
    },
    {
      day: "03",
      icon: Clock,
      action: "Zamanla",
      body: "En iyi saati seç; otomatik yayın hazır bekler.",
    },
    {
      day: "04",
      icon: Send,
      action: "Yayınla",
      body: "Tek tıkla kanallara gönder — kopyala-yapıştır yok.",
    },
  ],
  en: [
    {
      day: "01",
      icon: Calendar,
      action: "Plan",
      body: "Weekly grid: channel, format, date.",
    },
    {
      day: "02",
      icon: PenLine,
      action: "Draft & approve",
      body: "Finish drafts, get sign-off, queue them.",
    },
    {
      day: "03",
      icon: Clock,
      action: "Schedule",
      body: "Pick the best time; auto-publish waits.",
    },
    {
      day: "04",
      icon: Send,
      action: "Publish",
      body: "Push to channels in one tap — no copy-paste.",
    },
  ],
};

export default function ContentFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const flow = weekFlow[locale];

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 45% at 80% 15%, rgba(24,131,71,0.1), transparent 55%)",
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
                {isEn ? "Content" : "İçerik"}
              </p>
              <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
                {isEn
                  ? "Plan the week. Publish on time."
                  : "Haftayı planla. Zamanında yayınla."}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-bonero-dark/55">
                {isEn
                  ? "One board from slot to live post — not scattered docs and last-minute scrambles."
                  : "Slot’tan canlı gönderiye tek pano — dağınık doküman ve son dakika telaşı yok."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={PANEL_REGISTER_URL}
                  className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white hover:bg-bonero-green/90"
                >
                  {isEn ? "Open content board" : "İçerik panosunu aç"}
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href="#eylemler"
                  className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70"
                >
                  {isEn ? "Weekly flow" : "Haftalık akış"}
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-bonero-dark/8 bg-white p-5 shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:p-6">
              <ContentMock active isEn={isEn} />
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
              {isEn ? "Publish rhythm" : "Yayın ritmi"}
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {isEn ? "Four beats. Week handled." : "Dört hamle. Hafta hallolur."}
            </h2>
          </Reveal>

          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.day} delay={i * 0.05}>
                  <li className="h-full rounded-2xl border border-bonero-dark/8 bg-[#f8faf9] p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-sm font-bold text-bonero-green">
                        {step.day}
                      </span>
                      <Icon size={18} className="text-bonero-green" />
                    </div>
                    <h3 className="font-heading mt-4 text-lg text-bonero-dark">{step.action}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">{step.body}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-t border-bonero-dark/8 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid items-center gap-8 rounded-[1.5rem] bg-bonero-green px-8 py-12 sm:px-12 lg:grid-cols-[1fr_auto] lg:gap-10">
              <div>
                <h2 className="font-heading text-2xl text-white sm:text-3xl">
                  {isEn ? "Planned. Shipped on time." : "Planlandı. Zamanında çıktı."}
                </h2>
                <p className="mt-3 flex items-center gap-2 text-sm text-white/80">
                  <Check size={14} className="text-white" />
                  {isEn
                    ? "Schedule once — publish everywhere."
                    : "Bir kez zamanla — her yere yayınla."}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href={PANEL_REGISTER_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-bonero-green"
                >
                  {isEn ? "Start publishing" : "Yayına başla"}
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
          </Reveal>
        </div>
      </section>
    </div>
  );
}
