"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Headphones,
  Layout,
  Package,
  type LucideIcon,
} from "lucide-react";

const seats: {
  icon: LucideIcon;
  title: string;
  status: "Dinleniyor" | "Öncelikli";
  focus: string;
  beat: string;
}[] = [
  {
    icon: Package,
    title: "Ürün",
    status: "Dinleniyor",
    focus: "Ajans operasyonunu ürün diline çevir",
    beat: "Saha → Yol haritası",
  },
  {
    icon: Layout,
    title: "Tasarım",
    status: "Dinleniyor",
    focus: "Karmaşığı sade ve güvenilir göster",
    beat: "Sistem → Akış",
  },
  {
    icon: Code2,
    title: "Mühendislik",
    status: "Öncelikli",
    focus: "Omnichannel altyapıyı sağlam kur",
    beat: "API → Güvenlik",
  },
  {
    icon: Headphones,
    title: "Müşteri başarısı",
    status: "Dinleniyor",
    focus: "Ajansları canlıda başarıya taşı",
    beat: "Onboarding → Büyüme",
  },
];

const pipeline = [
  { label: "Başvuru", hint: "Form" },
  { label: "Dinleme", hint: "Eşleşme" },
  { label: "Görüşme", hint: "Ekip" },
];

export default function CareerHeroVisual() {
  const [active, setActive] = useState(2);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((p) => (p + 1) % seats.length),
      3600,
    );
    return () => window.clearInterval(id);
  }, []);

  const current = seats[active];
  const ActiveIcon = current.icon;

  return (
    <div className="relative w-full max-w-[440px] min-w-0">
      <motion.div
        className="pointer-events-none absolute -top-5 -right-3 h-24 w-24 rounded-full bg-bonero-green/12 blur-2xl"
        animate={{ y: [0, -8, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -bottom-6 -left-4 h-28 w-28 rounded-full bg-bonero-dark/5 blur-2xl"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        aria-hidden="true"
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.75rem] border border-bonero-dark/8 bg-white shadow-[0_28px_70px_rgba(30,41,59,0.1)]"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ boxShadow: "0 34px 80px rgba(30,41,59,0.14)" }}
      >
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

        {/* Brand bar */}
        <div className="relative flex items-center justify-between gap-4 border-b border-bonero-dark/6 px-5 py-4">
          <Image
            src="/boneroLogo.png"
            alt="Bonero"
            width={160}
            height={40}
            priority
            className="h-8 w-auto object-contain object-left"
          />
          <span className="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-bonero-dark/45 uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-bonero-green/50" />
              <span className="relative h-2 w-2 rounded-full bg-bonero-green" />
            </span>
            Canlı dinleme
          </span>
        </div>

        <div className="relative p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/35 uppercase">
                Ekip paneli
              </p>
              <p className="font-heading mt-1 text-lg !font-extrabold text-bonero-dark">
                Birlikte inşa ediyoruz
              </p>
            </div>
            <div className="rounded-xl border border-bonero-green/20 bg-bonero-green/5 px-3 py-2 text-center">
              <p className="font-heading text-xl !font-extrabold leading-none text-bonero-green">
                04
              </p>
              <p className="mt-1 text-[9px] font-medium tracking-wide text-bonero-dark/40 uppercase">
                alan
              </p>
            </div>
          </div>

          {/* Pipeline bridge — About-style before/after rhythm */}
          <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5">
            {pipeline.map((step, i) => (
              <div key={step.label} className="contents">
                <motion.div
                  className="rounded-xl bg-[#f3f5f4] px-2.5 py-3 text-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={{ y: -2 }}
                >
                  <p className="text-[10px] font-semibold tracking-wide text-bonero-dark uppercase">
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-[10px] text-bonero-dark/40">
                    {step.hint}
                  </p>
                </motion.div>
                {i < pipeline.length - 1 && (
                  <motion.span
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-bonero-green text-white shadow-md shadow-bonero-green/25"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  >
                    <ArrowRight size={12} strokeWidth={2.5} />
                  </motion.span>
                )}
              </div>
            ))}
          </div>

          {/* Featured role stage */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="relative mt-5 overflow-hidden rounded-2xl p-5"
              style={{
                background:
                  "linear-gradient(155deg, #123226 0%, #1e293b 48%, #0f172a 100%)",
              }}
            >
              <motion.div
                className="pointer-events-none absolute -top-10 -right-8 h-28 w-28 rounded-full bg-bonero-green/20 blur-2xl"
                animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.12, 1] }}
                transition={{ duration: 3.2, repeat: Infinity }}
                aria-hidden="true"
              />

              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bonero-green/20 text-bonero-green">
                    <ActiveIcon size={20} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.16em] text-bonero-green uppercase">
                      Odak · {String(active + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-heading mt-0.5 text-xl !font-extrabold text-white">
                      {current.title}
                    </h3>
                  </div>
                </div>
                <span
                  className={`rounded-md px-2 py-1 text-[9px] font-bold tracking-wide uppercase ${
                    current.status === "Öncelikli"
                      ? "bg-bonero-green text-white"
                      : "bg-white/10 text-white/55"
                  }`}
                >
                  {current.status}
                </span>
              </div>

              <p className="relative mt-4 text-sm leading-relaxed text-white/65">
                {current.focus}
              </p>
              <p className="relative mt-3 text-xs font-medium text-bonero-green/90">
                {current.beat}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Role selector row */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {seats.map((seat, i) => {
              const Icon = seat.icon;
              const isActive = active === i;
              return (
                <button
                  key={seat.title}
                  type="button"
                  onClick={() => setActive(i)}
                  title={seat.title}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-1 py-2.5 transition-colors ${
                    isActive
                      ? "border-bonero-green/30 bg-bonero-green/5 text-bonero-green"
                      : "border-bonero-dark/8 bg-[#f8faf9] text-bonero-dark/45 hover:border-bonero-dark/15 hover:text-bonero-dark/70"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.6} />
                  <span className="max-w-full truncate text-[9px] font-semibold tracking-wide">
                    {seat.title === "Müşteri başarısı" ? "Başarı" : seat.title}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="hero-role-dot"
                      className="h-1 w-1 rounded-full bg-bonero-green"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
