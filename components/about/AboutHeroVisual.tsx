"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
} from "lucide-react";

const beforeItems = [
  { icon: Mail, text: "23 mail zinciri" },
  { icon: MessageSquare, text: "Dağınık kanallar" },
  { icon: Clock, text: "Geciken onay" },
];

const afterItems = [
  "Tek panel",
  "Anlık onay",
  "Zamanında teslimat",
];

function CountMetric({
  value,
  suffix = "",
  prefix = "",
  label,
  delay,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.35,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(String(v)));
    return () => {
      controls.stop();
      unsub();
    };
  }, [count, delay, rounded, value]);

  return (
    <motion.div
      className="px-2 py-3.5 text-center sm:px-3 sm:py-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay - 0.15, duration: 0.4 }}
      whileHover={{ y: -2 }}
    >
      <p className="font-heading text-base !font-extrabold text-bonero-green sm:text-lg">
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="mt-0.5 text-[10px] text-bonero-dark/40">{label}</p>
    </motion.div>
  );
}

export default function AboutHeroVisual() {
  return (
    <div className="relative w-full max-w-[460px]">
      {/* Soft floating atmosphere */}
      <motion.div
        className="pointer-events-none absolute -top-6 -right-4 h-28 w-28 rounded-full bg-bonero-green/10 blur-2xl"
        animate={{ y: [0, -10, 0], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -bottom-8 -left-6 h-32 w-32 rounded-full bg-bonero-dark/5 blur-2xl"
        animate={{ y: [0, 8, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        aria-hidden="true"
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.75rem] border border-bonero-dark/8 bg-white shadow-[0_28px_70px_rgba(30,41,59,0.1)]"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{
          boxShadow: "0 34px 80px rgba(30,41,59,0.14)",
        }}
      >
        {/* Sweep light across card */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-bonero-green/6 to-transparent"
          animate={{ x: ["-120%", "320%"] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 3,
          }}
          aria-hidden="true"
        />

        {/* Top brand bar */}
        <div className="relative flex items-center justify-between gap-4 border-b border-bonero-dark/6 px-5 py-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/boneroLogo.png"
              alt="Bonero"
              width={168}
              height={42}
              priority
              className="h-8 w-auto object-contain object-left sm:h-9"
            />
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-bonero-green/50" />
              <span className="relative h-2 w-2 rounded-full bg-bonero-green" />
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-bonero-dark/45 uppercase">
              Operasyonel zeka
            </span>
          </motion.div>
        </div>

        <div className="relative p-5 sm:p-6">
          <motion.p
            className="text-sm leading-relaxed text-bonero-dark/55"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Kaostan{" "}
            <motion.span
              className="inline-block font-semibold text-bonero-green"
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2.8, repeat: Infinity }}
            >
              şeffaf başarıya
            </motion.span>
            {" — "}
            ajans operasyonu tek platformda.
          </motion.p>

          {/* Before → After */}
          <div className="relative mt-6 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 sm:gap-3">
            <motion.div
              className="rounded-2xl bg-[#f3f5f4] p-3.5 sm:p-4"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <p className="text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/35 uppercase">
                Önce
              </p>
              <ul className="mt-3 space-y-2.5">
                {beforeItems.map(({ icon: Icon, text }, i) => (
                  <motion.li
                    key={text}
                    className="flex items-center gap-2 text-[12px] text-bonero-dark/50"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.12 }}
                  >
                    <motion.span
                      animate={{ opacity: [0.4, 0.75, 0.4] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    >
                      <Icon size={13} strokeWidth={1.6} className="shrink-0" />
                    </motion.span>
                    <span className="relative">
                      {text}
                      <motion.span
                        className="absolute top-1/2 left-0 h-px bg-bonero-dark/35"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{
                          delay: 0.7 + i * 0.18,
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ transform: "translateY(-50%)" }}
                        aria-hidden="true"
                      />
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Bridge with orbiting pulse */}
            <div className="relative flex flex-col items-center justify-center px-0.5">
              <motion.span
                className="absolute h-12 w-12 rounded-full border border-bonero-green/25"
                animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-hidden="true"
              />
              <motion.span
                className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bonero-green text-white shadow-lg shadow-bonero-green/30"
                animate={{
                  scale: [1, 1.08, 1],
                  x: [0, 3, 0],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.12, rotate: 8 }}
              >
                <ArrowRight size={16} strokeWidth={2.2} />
              </motion.span>
              {/* Traveling dots */}
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-bonero-green/70"
                  animate={{
                    x: [-18, 18],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "easeInOut",
                  }}
                  style={{ top: `calc(50% + ${(i - 0.5) * 14}px)` }}
                  aria-hidden="true"
                />
              ))}
            </div>

            <motion.div
              className="relative overflow-hidden rounded-2xl bg-bonero-dark p-3.5 text-white sm:p-4"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.32, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <motion.div
                className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-bonero-green/20 blur-xl"
                animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.15, 1] }}
                transition={{ duration: 3.2, repeat: Infinity }}
                aria-hidden="true"
              />
              <p className="relative text-[10px] font-semibold tracking-[0.16em] text-bonero-green uppercase">
                Bonero
              </p>
              <ul className="relative mt-3 space-y-2.5">
                {afterItems.map((text, i) => (
                  <motion.li
                    key={text}
                    className="flex items-center gap-2 text-[12px] text-white/80"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.85 + i * 0.15 }}
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.95 + i * 0.15,
                        type: "spring",
                        stiffness: 380,
                        damping: 16,
                      }}
                    >
                      <CheckCircle2
                        size={13}
                        strokeWidth={1.8}
                        className="shrink-0 text-bonero-green"
                      />
                    </motion.span>
                    {text}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Metrics with count-up */}
          <div className="mt-5 grid grid-cols-3 divide-x divide-bonero-dark/8 rounded-2xl border border-bonero-dark/8 bg-[#fafbfa]">
            <CountMetric value={68} prefix="−" suffix="%" label="Onay süresi" delay={1.1} />
            <CountMetric value={1} label="Panel" delay={1.25} />
            <CountMetric value={40} prefix="−" suffix="%" label="Ajans yükü" delay={1.4} />
          </div>
        </div>

        {/* Progress with shimmer */}
        <div className="relative border-t border-bonero-dark/6 bg-[#f7f8f7] px-5 py-3.5 sm:px-6">
          <div className="flex items-center justify-between gap-3 text-[11px] font-medium text-bonero-dark/45">
            <motion.span
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Kaos
            </motion.span>
            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-bonero-dark/8">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-bonero-green"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.85, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{ left: ["-20%", "110%"] }}
                transition={{
                  delay: 1.4,
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              />
            </div>
            <motion.span
              className="font-semibold text-bonero-green"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              Başarı
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
