"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function ContactBridge() {
  return (
    <section className="border-t border-bonero-dark/8 bg-background py-14 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-8">
        <Reveal className="max-w-xl">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-bonero-dark/40 uppercase">
            Sonraki adım
          </p>
          <h2 className="font-heading mt-3 text-2xl !font-extrabold tracking-wide text-bonero-dark sm:text-3xl">
            Bonero’yu keşfetmeye devam edin.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
            Ürün hikâyesi, paketler veya kariyer — istediğiniz yerden devam edin.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-wrap gap-x-6 gap-y-3">
          <Link
            href="/hakkimizda"
            className="text-sm font-semibold text-bonero-dark transition-colors hover:text-bonero-green"
          >
            Hakkımızda →
          </Link>
          <Link
            href="/paketler"
            className="text-sm font-semibold text-bonero-dark transition-colors hover:text-bonero-green"
          >
            Paketler →
          </Link>
          <Link
            href="/kariyer"
            className="text-sm font-semibold text-bonero-dark transition-colors hover:text-bonero-green"
          >
            Kariyer →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
