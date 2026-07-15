"use client";

import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

const brands = {
  tr: [
    { name: "WhatsApp", color: "#25D366" },
    { name: "Instagram", color: "#E1306C" },
    { name: "Meta", color: "#0866FF" },
    { name: "Google", color: "#EA4335" },
    { name: "E-posta", color: "#0EA5E9" },
    { name: "TikTok", color: "#010101" },
  ],
  en: [
    { name: "WhatsApp", color: "#25D366" },
    { name: "Instagram", color: "#E1306C" },
    { name: "Meta", color: "#0866FF" },
    { name: "Google", color: "#EA4335" },
    { name: "Email", color: "#0EA5E9" },
    { name: "TikTok", color: "#010101" },
  ],
};

const copy = {
  tr: {
    aria: "Entegre kanallar",
    label: "Bağladığınız kanallar · tek panel",
  },
  en: {
    aria: "Integrated channels",
    label: "Channels you connect · one panel",
  },
};

export default function BrandStrip() {
  const { locale } = useLocale();
  const t = copy[locale];
  const list = brands[locale];

  return (
    <section
      className="relative border-y border-bonero-dark/6 bg-white py-10 sm:py-12"
      aria-label={t.aria}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold tracking-[0.18em] text-bonero-dark/40 uppercase">
            {t.label}
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
            {list.map((b) => (
              <li
                key={b.name}
                className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-bonero-dark/70"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: b.color }}
                  aria-hidden
                />
                {b.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
