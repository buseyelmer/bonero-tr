"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";

const linkMeta = [
  { href: "/hakkimizda", key: "about" },
  { href: "/paketler", key: "pricing" },
  { href: "/yardim", key: "help" },
  { href: "/kariyer", key: "careers" },
] as const;

const copy = {
  tr: {
    eyebrow: "Sonraki adım",
    title: "Bonero’yu keşfetmeye devam edin.",
    lead: "Ürün, paketler veya kariyer — istediğiniz yerden devam edin.",
    links: {
      about: "Hakkımızda",
      pricing: "Paketler",
      help: "Yardım",
      careers: "Kariyer",
    },
  },
  en: {
    eyebrow: "Next step",
    title: "Keep exploring Bonero.",
    lead: "Product, pricing, or careers — continue wherever you like.",
    links: {
      about: "About",
      pricing: "Pricing",
      help: "Help",
      careers: "Careers",
    },
  },
};

export default function ContactBridge() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className="border-t border-bonero-dark/8 bg-background py-14 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-8">
        <Reveal className="max-w-xl">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-2xl tracking-wide text-bonero-dark sm:text-3xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-bonero-dark/55">
            {t.lead}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-wrap gap-x-6 gap-y-3">
          {linkMeta.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-bonero-dark transition-colors hover:text-bonero-green"
            >
              {t.links[l.key]} →
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
