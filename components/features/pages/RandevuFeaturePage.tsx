"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import AppointmentMock from "@/components/features/mocks/AppointmentMock";
import { useLocale } from "@/components/LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const actions = {
  tr: [
    {
      n: "01",
      title: "Talebi yakala",
      body: "DM veya WhatsApp’tan gelen istek konuşmadan randevu kartına döner — kanal bağlamı kaybolmaz.",
    },
    {
      n: "02",
      title: "Slotu onayla",
      body: "Boş saati seç, onay gönder. Çakışmada sistem uyarır.",
    },
    {
      n: "03",
      title: "Hatırlatmayı bırak",
      body: "24 saat veya 2 saat kala WhatsApp/SMS otomatik gider.",
    },
    {
      n: "04",
      title: "Gelmezse takip et",
      body: "No-show kayda düşer; tek tıkla yeni slot öner.",
    },
  ],
  en: [
    {
      n: "01",
      title: "Catch the request",
      body: "A DM or WhatsApp ask becomes a booking card — channel context stays.",
    },
    {
      n: "02",
      title: "Confirm the slot",
      body: "Pick an open time, send confirmation. Conflicts get flagged.",
    },
    {
      n: "03",
      title: "Set the reminder",
      body: "Auto WhatsApp/SMS 24h or 2h before.",
    },
    {
      n: "04",
      title: "Follow up if they miss",
      body: "No-show is logged; one tap to offer a new slot.",
    },
  ],
};

export default function RandevuFeaturePage() {
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
              "radial-gradient(ellipse 55% 50% at 85% 15%, rgba(24,131,71,0.12), transparent 55%)",
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
                {isEn ? "Appointments" : "Randevu"}
              </p>
              <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
                {isEn
                  ? "Don’t just list times. Run the booking."
                  : "Saat yazma. Randevuyu yönet."}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-bonero-dark/55">
                {isEn
                  ? "Inbox request → confirmation → reminder → follow-up. One line, fewer no-shows."
                  : "Inbox talebi → onay → hatırlatma → takip. Tek hat, daha az no-show."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={PANEL_REGISTER_URL}
                  className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white hover:bg-bonero-green/90"
                >
                  {isEn ? "Start booking" : "Randevu başlat"}
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href="#eylemler"
                  className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70"
                >
                  {isEn ? "See the steps" : "Adımları gör"}
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-bonero-dark/8 bg-white p-5 shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:p-6">
              <AppointmentMock active isEn={isEn} />
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
              {isEn ? "Booking flow" : "Rezervasyon akışı"}
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {isEn ? "Four steps to a fuller day" : "Dolu bir gün için dört adım"}
            </h2>
          </Reveal>

          <ol className="mt-12 grid gap-5 sm:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
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
                  {isEn
                    ? "Calendar full. Fewer no-shows."
                    : "Takvim dolsun. No-show azalsın."}
                </h2>
                <p className="mt-3 flex items-center gap-2 text-sm text-white/80">
                  <Check size={14} className="text-white" />
                  {isEn
                    ? "Reminders go out without manual messages."
                    : "Hatırlatmalar manuel mesaj olmadan gider."}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href={PANEL_REGISTER_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-bonero-green"
                >
                  {isEn ? "Get started" : "Hemen başla"}
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
