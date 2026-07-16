"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroTimeVisual from "./HeroTimeVisual";
import CtaButton from "./ui/CtaButton";
import { useLocale } from "./LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const copy = {
  tr: {
    badge: "İşletme operasyon platformu",
    h1: "İşletmeniz",
    h1Accent: "emin ellerde.",
    lead: "Mesaj, CRM ve randevu tek panelde. Siz müşteriye odaklanın — operasyon Bonero’da yürür.",
    cta: "Hemen Başlayın",
    secondary: "Ürünü görün",
    note: "Kayıt · ~15 dk kurulum · Aynı gün kullanın",
  },
  en: {
    badge: "Business operations platform",
    h1: "Your business is in",
    h1Accent: "safe hands.",
    lead: "Messages, CRM, and bookings in one panel. You stay with the customer — Bonero runs the ops.",
    cta: "Get Started",
    secondary: "See the product",
    note: "Sign up · ~15 min setup · Start the same day",
  },
};

export default function Hero() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className="relative overflow-x-clip bg-background pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pb-20">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 90% 35%, rgba(24,131,71,0.09), transparent 58%), radial-gradient(ellipse 45% 40% at 5% 90%, rgba(30,41,59,0.05), transparent 50%)",
        }}
      />
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl min-w-0 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 xl:gap-14">
        <div className="max-w-xl min-w-0 pt-2">
          <motion.p
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-bonero-dark/10 bg-white/80 px-3 py-1 text-xs font-medium tracking-wide text-bonero-dark/55 backdrop-blur-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green opacity-60" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-bonero-green" />
            </span>
            <span className="min-w-0">{t.badge}</span>
          </motion.p>

          <motion.h1
            className="font-heading mt-5 text-[1.85rem] leading-[1.15] tracking-wide break-words text-bonero-dark sm:text-4xl lg:text-[2.85rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.h1}{" "}
            <span className="text-bonero-green">{t.h1Accent}</span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-bonero-dark/60 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.lead}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <CtaButton
              href={PANEL_REGISTER_URL}
              variant="primary"
              size="lg"
              icon={<ArrowRight size={16} />}
            >
              {t.cta}
            </CtaButton>
            <CtaButton href="#cozumler" variant="secondary" size="lg">
              {t.secondary}
            </CtaButton>
          </motion.div>

          <motion.p
            className="mt-4 text-xs text-bonero-dark/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {t.note}
          </motion.p>
        </div>

        <motion.div
          className="relative w-full min-w-0 overflow-x-clip lg:pl-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroTimeVisual />
        </motion.div>
      </div>
    </section>
  );
}
