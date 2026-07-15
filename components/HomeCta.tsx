"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";
import { WHATSAPP_URL } from "@/lib/contact";

type Variant = "ask" | "campaign" | "start";

const variants: Record<
  Variant,
  { title: { tr: string; en: string }; body: { tr: string; en: string }; cta: { tr: string; en: string } }
> = {
  ask: {
    title: {
      tr: "Kafana takılan bir soru mu var?",
      en: "Got a question on your mind?",
    },
    body: {
      tr: "Hemen WhatsApp’tan yaz — netleştirelim.",
      en: "Message us on WhatsApp — we’ll clear it up.",
    },
    cta: { tr: "WhatsApp’tan yaz", en: "Message on WhatsApp" },
  },
  campaign: {
    title: { tr: "Fırsatı kaçırma", en: "Don’t miss the offer" },
    body: {
      tr: "Sana özel kampanyamız var — hemen bize ulaş.",
      en: "We have a campaign just for you — reach out now.",
    },
    cta: { tr: "WhatsApp’tan yaz", en: "Message on WhatsApp" },
  },
  start: {
    title: { tr: "Senin için buradayız", en: "We’re here for you" },
    body: {
      tr: "Hemen bugün başla — ekibimiz yanında.",
      en: "Start today — our team is right beside you.",
    },
    cta: { tr: "WhatsApp’tan yaz", en: "Message on WhatsApp" },
  },
};

export default function HomeCta({
  variant,
  id,
}: {
  variant: Variant;
  id?: string;
}) {
  const { locale } = useLocale();
  const raw = variants[variant];
  const t = {
    title: raw.title[locale],
    body: raw.body[locale],
    cta: raw.cta[locale],
  };

  return (
    <section
      id={id}
      className="relative scroll-mt-24 py-10 sm:py-14"
      aria-label={t.title}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid items-center gap-8 rounded-[1.5rem] bg-bonero-green px-8 py-10 sm:px-12 lg:grid-cols-[1fr_auto] lg:gap-10 lg:py-12">
            <div>
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                <MessageCircle size={20} />
              </div>
              <h2 className="font-heading text-2xl text-white sm:text-3xl">
                {t.title}
              </h2>
              <p className="mt-2 max-w-lg text-sm text-white/80 sm:text-base">
                {t.body}
              </p>
            </div>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-bonero-green shadow-sm transition-opacity hover:opacity-90"
            >
              {t.cta}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
