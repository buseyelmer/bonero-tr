"use client";

import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

const platforms = [
  "Instagram",
  "Meta Business Suite",
  "WhatsApp Business",
  "Gmail",
  "Outlook",
  "LinkedIn",
  "TikTok",
  "Slack",
];

const copy = {
  tr: {
    eyebrow: "Entegrasyonlar",
    title: "İş Ortaklarınız ve Kanallarınızla Uyumlu",
    subtitle:
      "Kullandığınız kanallar ve araçlarla sorunsuz bağlanın. Omnichannel operasyonunuz Bonero’da birleşir.",
  },
  en: {
    eyebrow: "Integrations",
    title: "Compatible with your partners and channels",
    subtitle:
      "Connect the channels and tools you already use. Your omnichannel ops come together in Bonero.",
  },
};

/** Enough copies so one sequence is always wider than typical viewports. */
const SEQUENCE = [...platforms, ...platforms, ...platforms];

function MarqueePills({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {SEQUENCE.map((name, i) => (
        <li
          key={`${name}-${i}`}
          className="mr-4 inline-flex shrink-0 items-center rounded-full border border-bonero-dark/8 bg-white/60 px-5 py-2.5 text-sm font-medium tracking-tight text-bonero-dark/55 backdrop-blur-sm"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden mask-marquee">
      <div
        className={`flex w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        <MarqueePills />
        <MarqueePills ariaHidden />
      </div>
    </div>
  );
}

export default function Integrations() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section
      id="entegrasyonlar"
      className="overflow-hidden border-y border-bonero-dark/6 bg-[#f8fafc] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/60">
            {t.subtitle}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-10 space-y-4">
        <MarqueeRow />
        <MarqueeRow reverse />
      </Reveal>
    </section>
  );
}
