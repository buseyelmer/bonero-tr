"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import AiAgentMock from "@/components/features/mocks/AiAgentMock";
import { useLocale } from "@/components/LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const actions = {
  tr: [
    { n: "01", title: "Ajanı kur", body: "Ton, saatler ve SSS’yi tanımla. 5 dakikada 7/24 hazır." },
    { n: "02", title: "Konuşmayı yönet", body: "Sık soruları anında yanıtla. Lead bilgisi otomatik toplanır." },
    { n: "03", title: "Kurala göre devret", body: "Fiyat, şikayet veya satış sinyali gelince insana aktar." },
    { n: "04", title: "Öğren ve iyileştir", body: "Kaçırılan konuşmaları gör, cevapları güncelle, oranı yükselt." },
  ],
  en: [
    { n: "01", title: "Set up the agent", body: "Define tone, hours, and FAQs. Live 24/7 in minutes." },
    { n: "02", title: "Run the conversation", body: "Answer common questions instantly. Lead info collects itself." },
    { n: "03", title: "Hand off by rule", body: "Route pricing, complaints, or buying signals to a human." },
    { n: "04", title: "Learn and improve", body: "See missed threads, update answers, raise resolution rate." },
  ],
};

export default function AiAgentFeaturePage() {
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
              "radial-gradient(ellipse 50% 55% at 10% 20%, rgba(24,131,71,0.13), transparent 55%)",
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
            <Reveal className="order-2 lg:order-1">
              <div className="rounded-[1.5rem] border border-bonero-dark/8 bg-white p-5 shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:p-6">
                <AiAgentMock active isEn={isEn} />
              </div>
            </Reveal>

            <div className="order-1 lg:order-2">
              <p className="text-sm font-medium tracking-wide text-bonero-green uppercase">
                {isEn ? "AI agent" : "Yapay zeka ajanı"}
              </p>
              <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
                {isEn
                  ? "Always on. Hands off when it matters."
                  : "7/24 açık. Kritik anlarda insana devreder."}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-bonero-dark/55">
                {isEn
                  ? "Set rules once. The agent answers overnight, collects leads, and escalates with full context."
                  : "Kuralları bir kez tanımla. Ajan gece yanıtlar, lead toplar, tam bağlamla insana devreder."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={PANEL_REGISTER_URL}
                  className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white hover:bg-bonero-green/90"
                >
                  {isEn ? "Deploy your agent" : "Ajanını devreye al"}
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href="#eylemler"
                  className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70"
                >
                  {isEn ? "Setup steps" : "Kurulum adımları"}
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="eylemler"
        className="scroll-mt-24 border-t border-bonero-dark/8 bg-[#f8faf9] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-xl">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/40 uppercase">
              {isEn ? "Setup to handoff" : "Kurulumdan devretmeye"}
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {isEn
                ? "Four steps. Nonstop coverage."
                : "Dört adım. Kesintisiz karşılama."}
            </h2>
          </Reveal>

          <div className="mt-12 overflow-x-auto pb-2">
            <ol className="flex min-w-[640px] items-stretch gap-0">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.06} className="flex flex-1 items-stretch">
                  <li className="flex flex-1 flex-col rounded-2xl border border-bonero-dark/8 bg-white p-5">
                    <span className="font-mono text-xs font-bold text-bonero-green">{s.n}</span>
                    <h3 className="font-heading mt-2 text-lg text-bonero-dark">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-bonero-dark/55">{s.body}</p>
                  </li>
                  {i < steps.length - 1 && (
                    <div className="flex w-8 shrink-0 items-center justify-center text-bonero-dark/25">
                      <ChevronRight size={20} />
                    </div>
                  )}
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-bonero-dark/8 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid items-center gap-10 rounded-[1.5rem] bg-bonero-green px-8 py-12 sm:px-12 lg:grid-cols-2 lg:px-12">
              <div>
                <h2 className="font-heading text-2xl text-white sm:text-3xl">
                  {isEn
                    ? "Always on. You stay in control."
                    : "7/24 açık. Kontrol sende."}
                </h2>
                <ul className="mt-6 space-y-3">
                  {(isEn
                    ? [
                        "Night and weekend coverage without extra headcount",
                        "Handoff rules you control — not black-box AI",
                        "Every escalation arrives with the full chat",
                      ]
                    : [
                        "Gece ve hafta sonu ekstra personel olmadan",
                        "Kontrol sende — kara kutu AI değil",
                        "Her devir tam sohbet geçmişiyle gelir",
                      ]
                  ).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                      <Check size={16} className="mt-0.5 shrink-0 text-white" />
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
                  {isEn ? "Launch agent" : "Ajanı başlat"}
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
