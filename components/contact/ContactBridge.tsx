"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

const links = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/paketler", label: "Paketler" },
  { href: "/yardim", label: "Yardım" },
  { href: "/kariyer", label: "Kariyer" },
];

export default function ContactBridge() {
  return (
    <section className="border-t border-bonero-dark/8 bg-background py-14 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-8">
        <Reveal className="max-w-xl">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            Sonraki adım
          </p>
          <h2 className="font-heading mt-3 text-2xl tracking-wide text-bonero-dark sm:text-3xl">
            Bonero’yu keşfetmeye devam edin.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-bonero-dark/55">
            Ürün, paketler veya kariyer — istediğiniz yerden devam edin.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-bonero-dark transition-colors hover:text-bonero-green"
            >
              {l.label} →
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
