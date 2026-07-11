"use client";

import { motion } from "framer-motion";
import HeroVisual from "@/components/HeroVisual";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 90% 20%, rgba(24,131,71,0.06), transparent 55%), linear-gradient(180deg, #f7f8f8 0%, #ffffff 55%, #ffffff 100%)",
        }}
      />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="max-w-xl">
          <motion.p
            className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Hakkımızda
          </motion.p>
          <motion.h1
            className="font-heading mt-4 text-4xl leading-[1.15] tracking-wide text-bonero-dark sm:text-5xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Ajans operasyonunu yapay zeka ile yeniden tanımlıyoruz
          </motion.h1>
          <motion.p
            className="mt-5 text-base leading-relaxed text-bonero-dark/65 sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            Bonero; dijital ajansların üretim, onay ve raporlama yükünü sadeleştiren
            kurumsal bir operasyon altyapısıdır.
          </motion.p>
        </div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
