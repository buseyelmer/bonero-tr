"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function HelpCta() {
  return (
    <section className="border-t border-bonero-dark/8 bg-background py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div className="max-w-lg">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-bonero-dark/40 uppercase">
                Destek
              </p>
              <h2 className="font-heading mt-2 text-2xl !font-extrabold tracking-wide text-bonero-dark sm:text-3xl">
                Hâlâ yardıma mı ihtiyacınız var?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
                Destek ekibimiz ajans operasyonunuza özel yanıt verir — genelde 1
                iş günü içinde.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-bonero-green/90"
              >
                Destek talebi oluştur
                <ArrowRight size={15} />
              </Link>
              <a
                href="mailto:hello@bonero.tr"
                className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 px-5 py-2.5 text-sm font-medium text-bonero-dark/70 transition-colors hover:border-bonero-dark/25 hover:text-bonero-dark"
              >
                <Mail size={15} />
                hello@bonero.tr
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
