"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import CrmMock from "@/components/features/mocks/CrmMock";
import { useLocale } from "@/components/LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const moves = {
  tr: [
    { n: "01", title: "Formdan veya DM’den kart aç", body: "Talep pipeline’a düşer; kanal ve kaynak otomatik gelir." },
    { n: "02", title: "Skorla, etiketle, not bırak", body: "Sıcak / ılık / soğuk ve sonraki adım aynı kartta kalır." },
    { n: "03", title: "Teklifi sürükle, sonucu işaretle", body: "Kazan veya kaybet — raporlama anında güncellenir." },
  ],
  en: [
    { n: "01", title: "Open a card from form or DM", body: "Request lands in the pipeline; channel and source come with it." },
    { n: "02", title: "Score, tag, leave a note", body: "Hot / warm / cold and the next step stay on the same card." },
    { n: "03", title: "Drag the offer, mark the outcome", body: "Win or lose — reporting updates instantly." },
  ],
};

export default function CrmFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const steps = moves[locale];

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 50% at 70% 10%, rgba(24,131,71,0.11), transparent 55%)",
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
                CRM
              </p>
              <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
                {isEn
                  ? "Leads don’t sit in spreadsheets. They move."
                  : "Lead’ler tabloda beklemez. İlerler."}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-bonero-dark/55">
                {isEn
                  ? "From first touch to close — ownership and next action stay on one board."
                  : "İlk dokunuştan kapanışa — sahiplik ve sonraki adım tek panoda kalır."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={PANEL_REGISTER_URL}
                  className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white hover:bg-bonero-green/90"
                >
                  {isEn ? "Open pipeline" : "Pipeline’ı aç"}
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href="#eylemler"
                  className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70"
                >
                  {isEn ? "See the moves" : "Hamleleri gör"}
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-bonero-dark/8 bg-white p-5 shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:p-6">
              <CrmMock active isEn={isEn} />
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
              {isEn ? "How deals move" : "Anlaşma nasıl akar"}
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {isEn ? "Three moves on one board" : "Tek panoda üç hamle"}
            </h2>
          </Reveal>

          <ol className="mt-12 grid gap-5 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <li className="h-full rounded-2xl border border-bonero-dark/8 bg-[#f8faf9] p-6">
                  <span className="font-mono text-sm font-bold text-bonero-green">{s.n}</span>
                  <h3 className="font-heading mt-3 text-xl text-bonero-dark">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-bonero-dark/8 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid items-center gap-8 rounded-[1.5rem] bg-bonero-green px-8 py-12 sm:px-12 lg:grid-cols-[1fr_auto] lg:gap-10">
              <div>
                <h2 className="font-heading text-2xl text-white sm:text-3xl">
                  {isEn ? "Clear board. Clear owners." : "Net pano. Net sahipler."}
                </h2>
                <p className="mt-3 max-w-md text-sm text-white/80">
                  {isEn
                    ? "No more ‘who owns this?’ in group chat."
                    : "Grup sohbetinde ‘bu kimin?’ sorusu biter."}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href={PANEL_REGISTER_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-bonero-green"
                >
                  {isEn ? "Build your pipeline" : "Pipeline’ını kur"}
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
