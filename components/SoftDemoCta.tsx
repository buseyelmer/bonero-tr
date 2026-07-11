"use client";

import Link from "next/link";
import { ArrowRight, Clock3, CreditCard, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const perks = [
  {
    icon: Clock3,
    title: "15 dk kurulum",
    text: "Kanallarınızı bağlayın, paneli hemen açın.",
  },
  {
    icon: CreditCard,
    title: "Kart gerekmez",
    text: "Demo için ödeme bilgisi istemiyoruz.",
  },
  {
    icon: Sparkles,
    title: "Satın alma baskısı yok",
    text: "Önce görün, kararınızı sonra verin.",
  },
];

export default function SoftDemoCta() {
  return (
    <section
      id="demo-teklifi"
      className="relative overflow-hidden bg-background py-16 sm:py-20"
      aria-labelledby="demo-teklifi-baslik"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[#111827] px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse 55% 70% at 100% 50%, rgba(24,131,71,0.35), transparent 60%), radial-gradient(ellipse 40% 50% at 0% 100%, rgba(24,131,71,0.12), transparent 55%)",
              }}
            />
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay" aria-hidden="true" />

            <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-bonero-green uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-bonero-green" />
                  Net teklif
                </p>
                <h2
                  id="demo-teklifi-baslik"
                  className="font-heading mt-5 text-3xl tracking-wide text-white sm:text-4xl lg:text-[2.75rem]"
                >
                  Omnichannel paneli
                  <span className="mt-1 block text-white/45">
                    15 dakikada deneyin.
                  </span>
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-white/55">
                  Ajansınızın kanallarını bağlayın, Birleşik Gelen Kutusu’nu canlı
                  görün. Satın alma taahhüdü yok — önce ürünü hissedin.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-bonero-green px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-bonero-green/25 transition-all hover:scale-105 hover:bg-bonero-green/90"
                  >
                    Ücretsiz Demo Talep Et
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    href="#paketler"
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
                  >
                    Paketlere bak
                  </a>
                </div>
              </div>

              <ul className="space-y-3 lg:col-span-5">
                {perks.map(({ icon: Icon, title, text }) => (
                  <li
                    key={title}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bonero-green/15 text-bonero-green">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-white/50">
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
