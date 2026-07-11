"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { goToCareerApply } from "@/lib/go-to-career-apply";
import CareerHeroVisual from "./CareerHeroVisual";

export default function CareerHero() {
  return (
    <section className="relative min-h-[min(100svh,900px)] overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pb-24">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ backgroundColor: "#eef1ef" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 88% 28%, rgba(24,131,71,0.11), transparent 55%), radial-gradient(ellipse 50% 45% at 8% 75%, rgba(30,41,59,0.05), transparent 50%)",
        }}
      />
      <div
        className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
      />
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[calc(min(100svh,900px)-8rem)] max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div className="relative max-w-xl min-w-0 pt-1">
          <motion.div
            className="absolute top-2 bottom-2 left-0 hidden w-[3px] origin-top rounded-full bg-gradient-to-b from-bonero-green via-bonero-green/50 to-transparent sm:block"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          <div className="sm:pl-6">
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-bonero-dark/10 bg-white/80 px-3 py-1 text-xs font-medium tracking-wide text-bonero-dark/55 backdrop-blur-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-bonero-green" />
              </span>
              Kariyer · Açık dinleme
            </motion.p>

            <h1 className="font-heading mt-5 text-[2rem] !font-extrabold leading-[1.14] tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.65,
                  delay: 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Ajans operasyonunu{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">birlikte</span>
                  <motion.span
                    className="absolute inset-x-0 bottom-1 -z-0 h-[0.35em] rounded-sm bg-bonero-green/15"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.55, duration: 0.55 }}
                    style={{ transformOrigin: "left" }}
                    aria-hidden="true"
                  />
                </span>
              </motion.span>
              <motion.span
                className="mt-1.5 block"
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="text-shimmer">sadeleştirelim.</span>
              </motion.span>
            </h1>

            <motion.p
              className="mt-6 max-w-md text-base leading-relaxed text-bonero-dark/65 sm:text-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Bonero, dijital ajanslar için omnichannel AI platformu kuruyor.
              Ürün, tasarım, mühendislik ve müşteri başarısında doğru kişiyi
              arıyoruz.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                type="button"
                onClick={() => goToCareerApply()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-bonero-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-bonero-green/25 transition-all hover:scale-[1.02] hover:bg-bonero-green/90"
              >
                Başvuru yap
                <ArrowDown size={16} strokeWidth={2} />
              </button>
              <Link
                href="/hakkimizda"
                className="inline-flex items-center justify-center rounded-xl border border-bonero-dark/12 bg-white/70 px-5 py-3.5 text-sm font-medium text-bonero-dark/70 backdrop-blur-sm transition-colors hover:border-bonero-dark/20 hover:text-bonero-dark"
              >
                Önce Bonero’yu tanı
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="flex min-w-0 justify-center lg:justify-end"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <CareerHeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
