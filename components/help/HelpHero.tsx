"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HelpHeroVisual from "./HelpHeroVisual";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HelpHero() {
  return (
    <section className="relative min-h-[min(100svh,840px)] overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20">
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
            "radial-gradient(ellipse 70% 55% at 88% 22%, rgba(24,131,71,0.12), transparent 55%), radial-gradient(ellipse 45% 50% at 6% 78%, rgba(30,41,59,0.05), transparent 50%)",
        }}
      />
      <div
        className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.32]"
        aria-hidden="true"
      />
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.16]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[calc(min(100svh,840px)-8rem)] w-full max-w-6xl items-center gap-10 px-3 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div className="relative w-full min-w-0 max-w-xl justify-self-start pt-1">
          <motion.div
            className="absolute top-2 bottom-2 left-0 hidden w-[3px] origin-top rounded-full bg-gradient-to-b from-bonero-green via-bonero-green/50 to-transparent sm:block"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease }}
            aria-hidden="true"
          />

          <div className="sm:pl-6">
            <motion.p
              className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
            >
              Bonero
            </motion.p>

            <h1 className="font-heading mt-3 text-[2rem] !font-extrabold leading-[1.14] tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, delay: 0.05, ease }}
              >
                Yardım Merkezi
              </motion.span>
              <motion.span
                className="mt-1.5 block text-bonero-dark/40"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, delay: 0.16, ease }}
              >
                Cevaplar net.{" "}
                <span className="text-bonero-green">Tempo hızlı.</span>
              </motion.span>
            </h1>

            <motion.p
              className="mt-5 max-w-md text-base leading-relaxed text-bonero-dark/60 sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
            >
              Bonero’nun tamamını kullanmayı öğrenin — kurulumdan Omnichannel ve
              AI Agent’a kadar makalelerle adım adım.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4, ease }}
            >
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-xl bg-bonero-dark px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-bonero-green"
              >
                Destek talebi
                <ArrowRight size={15} />
              </Link>
              <a
                href="#makaleler"
                className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white/70 px-5 py-2.5 text-sm font-medium text-bonero-dark transition-colors hover:border-bonero-dark/25"
              >
                Makalelere git
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="flex w-full min-w-0 justify-center"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease }}
        >
          <HelpHeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
