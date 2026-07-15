"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { goToCareerApply } from "@/lib/go-to-career-apply";
import { useLocale } from "@/components/LocaleProvider";
import CareerHeroVisual from "./CareerHeroVisual";

const ease = [0.22, 1, 0.36, 1] as const;

const copy = {
  tr: {
    eyebrow: "Kariyer",
    brand: "Bonero",
    h1Before: "Operasyonu sadeleştiren",
    h1Accent: "ekibe",
    h1After: "katıl.",
    lead: "Omnichannel AI platformunu ürün, tasarım, mühendislik ve müşteri başarısıyla birlikte büyütüyoruz.",
    apply: "Başvuru yap",
    roles: "Açık alanları gör",
    note: "Açık ilan olmasa da doğru kişiyi dinliyoruz.",
  },
  en: {
    eyebrow: "Careers",
    brand: "Bonero",
    h1Before: "Join the",
    h1Accent: "team",
    h1After: "simplifying operations.",
    lead: "We are growing the omnichannel AI platform together across product, design, engineering, and customer success.",
    apply: "Apply now",
    roles: "See open areas",
    note: "Even without an open listing, we listen to the right people.",
  },
};

export default function CareerHero() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className="relative overflow-x-clip bg-background pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pb-20">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 90% 25%, rgba(24,131,71,0.1), transparent 58%), radial-gradient(ellipse 45% 40% at 5% 85%, rgba(30,41,59,0.05), transparent 50%)",
        }}
      />
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl min-w-0 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <div className="max-w-xl min-w-0">
          <motion.p
            className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            {t.eyebrow}
          </motion.p>

          <motion.p
            className="font-heading mt-3 text-[clamp(2.4rem,5vw,3.4rem)] font-extrabold leading-none tracking-tight text-bonero-dark"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.04, ease }}
          >
            {t.brand}
          </motion.p>

          <motion.h1
            className="font-heading mt-4 text-[1.75rem] leading-[1.18] tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.55rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
          >
            {t.h1Before}{" "}
            <span className="text-bonero-green">{t.h1Accent}</span>{" "}
            {t.h1After}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-bonero-dark/55 sm:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22, ease }}
          >
            {t.lead}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32, ease }}
          >
            <button
              type="button"
              onClick={() => goToCareerApply()}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-bonero-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-bonero-green/20 transition-colors hover:bg-bonero-green/90"
            >
              {t.apply}
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </button>
            <Link
              href="#roller"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-bonero-dark/12 bg-white/80 px-5 py-3.5 text-sm font-medium text-bonero-dark/70 transition-colors hover:border-bonero-dark/20 hover:text-bonero-dark"
            >
              {t.roles}
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          <motion.p
            className="mt-5 text-sm text-bonero-dark/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            {t.note}
          </motion.p>
        </div>

        <motion.div
          className="flex min-w-0 justify-center lg:justify-end"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease }}
        >
          <CareerHeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
