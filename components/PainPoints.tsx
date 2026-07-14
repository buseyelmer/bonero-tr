"use client";

import { Camera, Mail, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import Link from "next/link";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const channels = [
  { name: "WhatsApp", color: "#25D366", Icon: MessageCircle },
  { name: "Instagram", color: "#E1306C", Icon: Camera },
  { name: "E-posta", color: "#0EA5E9", Icon: Mail },
];

export default function PainPoints() {
  return (
    <section
      id="cozumler"
      className="scroll-mt-24 border-t border-bonero-dark/8 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-sm font-medium tracking-wide text-bonero-green uppercase">
              Problem
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              Kanallar ayrıysa{" "}
              <span className="text-bonero-green">iş kaçıyor.</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-bonero-dark/55">
              Müşteri bir yerden DM, başka yerden mail atıyor. Ekip üç uygulamada
              koşuyor; okunmayan mesaj büyümeyi yiyor. Bonero hepsini tek
              gelen kutusunda toplar.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "Kaçan mesaj ve soğuk lead",
                "Geç yanıt, düşük randevu / satış",
                "Hangi kanalda ne yazıldı bilinmiyor",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-bonero-dark/70"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bonero-green" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={PANEL_REGISTER_URL}
              className="mt-8 inline-flex rounded-xl bg-bonero-dark px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-bonero-green"
            >
              Bu karmaşayı bitir
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[1.5rem] border border-bonero-dark/8 bg-[#f3f6f4] p-6 sm:p-8">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-bonero-dark/35 uppercase">
                Önce
              </p>
              <div className="mt-4 space-y-2">
                {channels.map((ch) => (
                  <div
                    key={ch.name}
                    className="flex items-center gap-3 rounded-xl border border-bonero-dark/8 bg-white px-3.5 py-3 opacity-70"
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{ background: `${ch.color}18`, color: ch.color }}
                    >
                      <ch.Icon size={14} />
                    </span>
                    <span className="text-sm font-medium text-bonero-dark">
                      {ch.name}
                    </span>
                    <span className="ml-auto text-[11px] text-red-500/80">
                      ayrı uygulama
                    </span>
                  </div>
                ))}
              </div>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-bonero-dark/10" />
                <span className="text-[10px] font-bold tracking-wider text-bonero-green uppercase">
                  Bonero
                </span>
                <div className="h-px flex-1 bg-bonero-dark/10" />
              </div>

              <p className="text-[11px] font-semibold tracking-[0.14em] text-bonero-green uppercase">
                Sonra
              </p>
              <div className="mt-3 rounded-xl border border-bonero-green/25 bg-bonero-green/5 px-4 py-4">
                <p className="text-sm font-semibold text-bonero-dark">
                  Tek gelen kutusu
                </p>
                <p className="mt-1 text-sm text-bonero-dark/55">
                  Üç kanal, bir liste. Atama, etiket, AI yanıt — aynı ekranda.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
