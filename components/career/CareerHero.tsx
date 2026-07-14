"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { goToCareerApply } from "@/lib/go-to-career-apply";
import CareerHeroVisual from "./CareerHeroVisual";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CareerHero() {
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
            Kariyer
          </motion.p>

          <motion.p
            className="font-heading mt-3 text-[clamp(2.4rem,5vw,3.4rem)] font-extrabold leading-none tracking-tight text-bonero-dark"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.04, ease }}
          >
            Bonero
          </motion.p>

          <motion.h1
            className="font-heading mt-4 text-[1.75rem] leading-[1.18] tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.55rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
          >
            Operasyonu sadeleştiren{" "}
            <span className="text-bonero-green">ekibe</span> katıl.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-bonero-dark/55 sm:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22, ease }}
          >
            Omnichannel AI platformunu ürün, tasarım, mühendislik ve müşteri
            başarısıyla birlikte büyütüyoruz.
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
              Başvuru yap
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </button>
            <Link
              href="#roller"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-bonero-dark/12 bg-white/80 px-5 py-3.5 text-sm font-medium text-bonero-dark/70 transition-colors hover:border-bonero-dark/20 hover:text-bonero-dark"
            >
              Açık alanları gör
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          <motion.p
            className="mt-5 text-sm text-bonero-dark/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            Açık ilan olmasa da doğru kişiyi dinliyoruz.
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
