"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Inbox, MessageSquare, Tag, UserCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import OmnichannelMock from "@/components/features/mocks/OmnichannelMock";
import { useLocale } from "@/components/LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const actions = {
  tr: [
    {
      icon: Inbox,
      title: "Mesajları birleştir",
      body: "WhatsApp, Instagram DM, web chat — hepsi tek gelen kutusunda. Kanal atlama biter.",
    },
    {
      icon: Tag,
      title: "Etiketle ve sırala",
      body: "Acil, satış, destek etiketleriyle filtrele. Ekip hangi konuşmaya bakacağını bilir.",
    },
    {
      icon: MessageSquare,
      title: "Tek yerden yanıtla",
      body: "Müşteri hangi kanaldan yazdıysa oradan cevap ver. Geçmiş konuşma yanında durur.",
    },
    {
      icon: UserCheck,
      title: "Ekibe devret",
      body: "Uzman gerekiyorsa tek tıkla ata. Not bırak, devralan kişi bağlamı kaybetmez.",
    },
  ],
  en: [
    {
      icon: Inbox,
      title: "Unify every message",
      body: "WhatsApp, Instagram DMs, web chat — one inbox. No more channel hopping.",
    },
    {
      icon: Tag,
      title: "Tag and triage",
      body: "Filter by urgent, sales, support. The team knows what to open first.",
    },
    {
      icon: MessageSquare,
      title: "Reply from one place",
      body: "Answer on the channel they used. Full thread stays beside you.",
    },
    {
      icon: UserCheck,
      title: "Hand off to the team",
      body: "Assign with one tap when a specialist is needed. Context travels with the ticket.",
    },
  ],
};

export default function OmnichannelFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const steps = actions[locale];

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(20,184,166,0.12), transparent 60%)",
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

          <div className="mt-8 text-center">
            <p className="text-sm font-medium tracking-wide text-teal-700 uppercase">
              {isEn ? "Omnichannel inbox" : "Omnichannel gelen kutusu"}
            </p>
            <h1 className="font-heading mx-auto mt-3 max-w-2xl text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
              {isEn
                ? "One inbox. Every channel. Zero chaos."
                : "Tek gelen kutusu. Tüm kanallar. Sıfır karmaşa."}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-bonero-dark/55">
              {isEn
                ? "Catch, tag, reply, and hand off — without switching tabs or losing the thread."
                : "Yakala, etiketle, yanıtla, devret — sekme değiştirmeden, konuşmayı kaybetmeden."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={PANEL_REGISTER_URL}
                className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white hover:bg-bonero-green/90"
              >
                {isEn ? "Open unified inbox" : "Birleşik gelen kutusunu aç"}
                <ArrowUpRight size={15} />
              </Link>
              <a
                href="#eylemler"
                className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70"
              >
                {isEn ? "See the flow" : "Akışı gör"}
              </a>
            </div>
          </div>

          <Reveal className="mx-auto mt-12 max-w-3xl">
            <div className="rounded-[1.5rem] border border-bonero-dark/8 bg-white p-5 shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:p-6">
              <OmnichannelMock active isEn={isEn} />
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
              {isEn ? "Your daily flow" : "Günlük akışın"}
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {isEn
                ? "From ping to reply in four moves"
                : "Bildirimden yanıta dört hamle"}
            </h2>
          </Reveal>

          <ol className="relative mt-14 space-y-0">
            <div className="absolute top-4 bottom-4 left-[1.35rem] w-px bg-teal-200 sm:left-[1.6rem]" />
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 0.07}>
                  <li className="relative flex gap-5 pb-10 last:pb-0 sm:gap-6">
                    <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-teal-200 bg-white text-teal-700 sm:h-12 sm:w-12">
                      <Icon size={18} />
                    </div>
                    <div className="pt-1.5">
                      <h3 className="font-heading text-xl text-bonero-dark">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">{s.body}</p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-t border-bonero-dark/8 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[1.5rem] bg-bonero-green px-8 py-12 text-center sm:px-12">
            <h2 className="font-heading text-2xl text-white sm:text-3xl">
              {isEn
                ? "Every channel. One queue. Full context."
                : "Her kanal. Tek kuyruk. Tam bağlam."}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-white/75">
              {isEn
                ? "Stop copying messages between apps. Run customer conversations from one desk."
                : "Mesajları uygulamalar arası kopyalamayı bırak. Müşteri konuşmalarını tek masadan yönet."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={PANEL_REGISTER_URL}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-bonero-green"
              >
                {isEn ? "Start free" : "Ücretsiz başla"}
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
