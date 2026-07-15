"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Headphones,
  Layout,
  Package,
  type LucideIcon,
} from "lucide-react";
import { goToCareerApply } from "@/lib/go-to-career-apply";
import { useLocale } from "@/components/LocaleProvider";
import type { CareerRoleId } from "@/lib/career-roles";

type ListedCareerRoleId = Exclude<CareerRoleId, "other">;

const ease = [0.22, 1, 0.36, 1] as const;
const CYCLE_MS = 3800;

const seatMeta: { id: ListedCareerRoleId; icon: LucideIcon }[] = [
  { id: "product", icon: Package },
  { id: "design", icon: Layout },
  { id: "engineering", icon: Code2 },
  { id: "customer-success", icon: Headphones },
];

const copy = {
  tr: {
    eyebrow: "Açık alanlar",
    title: "Ekibe katıl",
    roleLabel: "rol",
    apply: "Bu alana başvur",
    seats: {
      product: { title: "Ürün", focus: "Sahayı yol haritasına çevirenler" },
      design: { title: "Tasarım", focus: "Karmaşığı sade ve güvenilir gösterenler" },
      engineering: {
        title: "Mühendislik",
        focus: "Omnichannel altyapıyı sağlam kuranlar",
      },
      "customer-success": {
        title: "Müşteri başarısı",
        focus: "Ekipleri canlıda başarıya taşıyanlar",
      },
    },
  },
  en: {
    eyebrow: "Open areas",
    title: "Join the team",
    roleLabel: "roles",
    apply: "Apply for this area",
    seats: {
      product: { title: "Product", focus: "Turning field insight into roadmap" },
      design: { title: "Design", focus: "Making complexity simple and trustworthy" },
      engineering: {
        title: "Engineering",
        focus: "Building reliable omnichannel infrastructure",
      },
      "customer-success": {
        title: "Customer success",
        focus: "Helping teams succeed in production",
      },
    },
  },
};

export default function CareerHeroVisual() {
  const { locale } = useLocale();
  const t = copy[locale];
  const seats = seatMeta.map((meta) => ({
    ...meta,
    ...t.seats[meta.id],
  }));
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setActive((p) => (p + 1) % seats.length),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [paused, active, seats.length]);

  const current = seats[active];
  const ActiveIcon = current.icon;

  return (
    <div
      className="relative w-full max-w-[460px] min-w-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="pointer-events-none absolute -top-8 -right-6 h-36 w-36 rounded-full bg-bonero-green/15 blur-3xl"
        animate={{ opacity: [0.45, 0.75, 0.45], scale: [1, 1.08, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -bottom-10 -left-8 h-40 w-40 rounded-full bg-bonero-dark/[0.04] blur-3xl"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-[1.5rem] border border-bonero-dark/8 bg-white shadow-[0_24px_60px_rgba(30,41,59,0.1)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 85% 0%, rgba(24,131,71,0.1), transparent 60%)",
          }}
          aria-hidden
        />

        <div className="relative border-b border-bonero-dark/6 px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/35 uppercase">
                {t.eyebrow}
              </p>
              <p className="font-heading mt-0.5 text-lg tracking-wide text-bonero-dark">
                {t.title}
              </p>
            </div>
            <div className="rounded-xl bg-bonero-green/10 px-3 py-2 text-center">
              <p className="font-heading text-2xl leading-none text-bonero-green">
                {String(seats.length).padStart(2, "0")}
              </p>
              <p className="mt-1 text-[9px] font-medium tracking-wide text-bonero-dark/40 uppercase">
                {t.roleLabel}
              </p>
            </div>
          </div>
        </div>

        <div className="relative p-5 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease }}
              className="min-h-[148px]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bonero-green text-white shadow-md shadow-bonero-green/25">
                  <ActiveIcon size={22} strokeWidth={1.6} />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] text-bonero-dark/35">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(seats.length).padStart(2, "0")}
                  </p>
                  <h3 className="font-heading text-xl tracking-wide text-bonero-dark sm:text-2xl">
                    {current.title}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-bonero-dark/55 sm:text-[15px]">
                {current.focus}
              </p>
              <button
                type="button"
                onClick={() => goToCareerApply(current.id)}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-bonero-green transition-opacity hover:opacity-80"
              >
                {t.apply}
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </button>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex gap-2">
            {seats.map((seat, i) => {
              const Icon = seat.icon;
              const on = active === i;
              return (
                <button
                  key={seat.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={seat.title}
                  aria-pressed={on}
                  className={`flex h-11 flex-1 items-center justify-center rounded-xl border transition-colors ${
                    on
                      ? "border-bonero-green/30 bg-bonero-green text-white"
                      : "border-bonero-dark/8 bg-[#f6f8f7] text-bonero-dark/45 hover:border-bonero-dark/15 hover:text-bonero-dark"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.75} />
                </button>
              );
            })}
          </div>

          <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-bonero-dark/5">
            <motion.div
              key={`${active}-${paused}`}
              className="h-full origin-left bg-bonero-green"
              initial={{ scaleX: paused ? 0 : 0 }}
              animate={{ scaleX: paused ? 0 : 1 }}
              transition={{
                duration: paused ? 0.2 : CYCLE_MS / 1000,
                ease: "linear",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
