"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import { useLocale } from "@/components/LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const copy = {
  tr: {
    eyebrow: "Destek",
    title: "Rehberde yoksa yazın",
    lead: "Operasyonunuza özel sorular için destek ekibi genelde 1 iş günü içinde döner. Hesap yoksa önce paneli açın.",
    cta: "Destek talebi oluştur",
    mail: "hello@bonero.tr",
    panel: "Panele kaydol",
    hours: "Yanıt süresi · 1 iş günü",
  },
  en: {
    eyebrow: "Support",
    title: "If it’s not in the guides, write us",
    lead: "For questions specific to your ops, support usually replies within one business day. No account yet? Open the panel first.",
    cta: "Open a support request",
    mail: "hello@bonero.tr",
    panel: "Sign up for the panel",
    hours: "Reply time · 1 business day",
  },
};

export default function HelpCta() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className="border-t border-bonero-dark/8 bg-bonero-dark py-14 text-white sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-bonero-green uppercase">
                <MessageCircle size={13} />
                {t.eyebrow}
              </p>
              <h2 className="font-heading mt-3 text-2xl tracking-wide sm:text-3xl">{t.title}</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">{t.lead}</p>
              <p className="mt-4 font-mono text-[11px] text-white/35">{t.hours}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
              <CtaButton
                href="/iletisim"
                variant="inverse"
                size="md"
                icon={<ArrowRight size={15} />}
              >
                {t.cta}
              </CtaButton>
              <Link
                href="mailto:hello@bonero.tr"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70 hover:border-bonero-green/40 hover:text-white"
              >
                <Mail size={15} />
                {t.mail}
              </Link>
              <Link
                href={PANEL_REGISTER_URL}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white/45 hover:text-bonero-green"
              >
                {t.panel}
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
