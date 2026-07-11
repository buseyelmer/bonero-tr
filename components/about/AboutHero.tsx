"use client";

import { motion } from "framer-motion";
import AboutHeroVisual from "./AboutHeroVisual";

export default function AboutHero() {
  return (
    <section className="relative min-h-[min(100svh,920px)] overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pb-24">
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
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[calc(min(100svh,920px)-8rem)] max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <div className="relative max-w-xl min-w-0 pt-1">
          {/* Vertical accent rail */}
          <motion.div
            className="absolute top-2 bottom-2 left-0 hidden w-[3px] origin-top rounded-full bg-gradient-to-b from-bonero-green via-bonero-green/50 to-transparent sm:block"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          <div className="sm:pl-6">
            <motion.p
              className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              Hakkımızda
            </motion.p>

            <h1 className="font-heading mt-4 text-[2rem] !font-extrabold leading-[1.14] tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                Dijital ajansların{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">operasyonel kaosunu,</span>
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
                transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-bonero-green">yapay zeka</span>
                {" ile "}
                <span className="text-shimmer">şeffaf bir başarı hikayesine</span>
                {" dönüştürüyoruz."}
              </motion.span>
            </h1>

            <motion.p
              className="mt-6 text-base leading-relaxed text-bonero-dark/65 sm:text-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              Bonero, karmaşık onay süreçlerini, dağınık iletişim kanallarını ve
              zaman kaybını tarihe gömen; ajanslar için özel geliştirilmiş bir
              operasyonel zeka platformudur.
            </motion.p>
          </div>
        </div>

        <motion.div
          className="flex min-w-0 justify-center lg:justify-end"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <AboutHeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
