"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Reveal from "./Reveal";

const shifts = [
  {
    before: "Yanıtlar gecikiyor",
    after: "%40 daha hızlı yanıt",
    detail: "Tek inbox — kanal değiştirmeden konuşursunuz.",
    num: "01",
  },
  {
    before: "Saatler panelde eriyor",
    after: "50+ saat / ay geri",
    detail: "Geçiş maliyeti biter; ekip üretime döner.",
    num: "02",
  },
  {
    before: "Üç uygulama, bir kaos",
    after: "1 panel, tüm kanallar",
    detail: "Instagram’dan mail’e her talep aynı yerde.",
    num: "03",
  },
];

const HOLD = 3800;
const ease = [0.22, 1, 0.36, 1] as const;

export default function Impact() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const current = shifts[active];

  useEffect(() => {
    const el = document.getElementById("etki");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => {
      setActive((p) => (p + 1) % shifts.length);
    }, HOLD);
    return () => clearTimeout(t);
  }, [active, inView]);

  return (
    <section
      id="etki"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{
        background: "#0a0e0c",
      }}
    >
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(24,131,71,0.2), transparent 65%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-xl">
          <p className="text-sm font-medium tracking-wide text-white/35 uppercase">
            Dönüşüm
          </p>
          <h2 className="font-heading mt-3 text-3xl !font-extrabold tracking-wide text-white sm:text-4xl lg:text-[2.75rem]">
            Bonero ile işletmenizde
            <span className="mt-1 block text-bonero-green">neler değişir?</span>
          </h2>
        </Reveal>

        {/* Transformation stage — not cards */}
        <div className="relative mt-14 min-h-[280px] sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease }}
              className="relative"
            >
              <p className="font-heading text-[clamp(3.5rem,12vw,8rem)] leading-[0.9] !font-extrabold tracking-tight text-white/[0.07] select-none">
                {current.num}
              </p>

              <div className="relative -mt-10 sm:-mt-14">
                <motion.p
                  className="font-heading text-2xl tracking-wide text-white/30 line-through decoration-white/20 sm:text-3xl"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  {current.before}
                </motion.p>

                <motion.div
                  className="my-4 flex items-center gap-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bonero-green text-white">
                    <ArrowDown size={16} strokeWidth={2.5} />
                  </span>
                  <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-bonero-green to-transparent" />
                </motion.div>

                <motion.p
                  className="font-heading text-3xl !font-extrabold tracking-wide text-white sm:text-4xl lg:text-5xl"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.45, ease }}
                >
                  {current.after}
                </motion.p>
                <motion.p
                  className="mt-4 max-w-md text-base text-white/45"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {current.detail}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Index rail */}
        <div className="mt-12 flex items-center gap-2">
          {shifts.map((s, i) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setActive(i)}
              className={`group flex items-center gap-2 rounded-full px-3 py-2 transition-colors ${
                active === i ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              <span
                className={`flex h-1.5 rounded-full transition-all ${
                  active === i
                    ? "w-8 bg-bonero-green"
                    : "w-1.5 bg-white/25 group-hover:bg-white/40"
                }`}
              />
              <span
                className={`hidden text-xs font-semibold sm:inline ${
                  active === i ? "text-white" : "text-white/30"
                }`}
              >
                {s.after}
              </span>
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          className="mt-6 h-0.5 origin-left rounded-full bg-bonero-green"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: HOLD / 1000, ease: "linear" }}
        />
      </div>
    </section>
  );
}
