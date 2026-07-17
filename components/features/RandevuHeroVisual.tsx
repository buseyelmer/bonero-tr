"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Bell, Check } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const ease = [0.22, 1, 0.36, 1] as const;
const SLOT_CYCLE = 4200;

const copy = {
  tr: {
    today: "Bugün",
    date: "12 Mar · Çarşamba",
    slots: [
      { time: "10:00", label: "Ayşe Demir", status: "confirmed" as const },
      { time: "11:30", label: "Satış görüşmesi", status: "pending" as const },
      { time: "14:00", label: "Mert Kaya", status: "confirmed" as const },
      { time: "16:00", label: "Hatırlatma", status: "reminder" as const },
    ],
    confirmed: "Onaylı",
    pending: "Bekliyor",
    reminder: "Hatırlatıldı",
    nextReminder: "Sonraki hatırlatma · 2 saat",
    booked: "4 dolu slot",
  },
  en: {
    today: "Today",
    date: "Wed · 12 Mar",
    slots: [
      { time: "10:00", label: "Ayşe Demir", status: "confirmed" as const },
      { time: "11:30", label: "Sales call", status: "pending" as const },
      { time: "14:00", label: "Mert Kaya", status: "confirmed" as const },
      { time: "16:00", label: "Reminder", status: "reminder" as const },
    ],
    confirmed: "Confirmed",
    pending: "Pending",
    reminder: "Reminded",
    nextReminder: "Next reminder · 2h",
    booked: "4 slots booked",
  },
};

function statusLabel(status: string, t: (typeof copy)["tr"]) {
  if (status === "confirmed") return t.confirmed;
  if (status === "pending") return t.pending;
  return t.reminder;
}

export default function RandevuHeroVisual() {
  const { locale } = useLocale();
  const t = copy[locale];
  const ref = useRef<HTMLDivElement>(null);
  const [activeSlot, setActiveSlot] = useState(0);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 90, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 90, damping: 22 });

  useEffect(() => {
    if (hovering) return;
    const id = window.setInterval(
      () => setActiveSlot((p) => (p + 1) % t.slots.length),
      SLOT_CYCLE / t.slots.length,
    );
    return () => clearInterval(id);
  }, [hovering, t.slots.length]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    setHovering(false);
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* Floating badges */}
      <motion.div
        className="pointer-events-none absolute -left-2 top-6 z-10 hidden rounded-xl border border-bonero-green/25 bg-white px-3 py-2 shadow-lg sm:block"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="flex items-center gap-1.5 text-[10px] font-bold text-bonero-green">
          <Check size={12} />
          {t.confirmed}
        </p>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -right-1 top-1/3 z-10 hidden rounded-xl border border-bonero-dark/10 bg-white px-3 py-2 shadow-lg sm:block"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <p className="flex items-center gap-1.5 text-[10px] font-bold text-bonero-dark/65">
          <Bell size={12} className="text-bonero-green" />
          {t.nextReminder}
        </p>
      </motion.div>

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="relative overflow-hidden rounded-[1.5rem] border border-bonero-dark/10 bg-white shadow-[0_28px_70px_rgba(24,131,71,0.12)]"
      >
        {/* Scan line */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-bonero-green/60 to-transparent"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(24,131,71,0.08), transparent 60%)",
          }}
        />

        <div className="relative p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold tracking-[0.14em] text-bonero-dark/40 uppercase">
                {t.today}
              </p>
              <p className="font-heading text-lg text-bonero-dark">{t.date}</p>
            </div>
            <motion.span
              className="inline-flex items-center gap-1.5 rounded-full border border-bonero-green/25 bg-bonero-green/10 px-2.5 py-1 text-[10px] font-bold text-bonero-green"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green/40" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-bonero-green" />
              </span>
              {t.booked}
            </motion.span>
          </div>

          {/* Week strip */}
          <div className="mt-4 grid grid-cols-5 gap-1.5">
            {(locale === "en"
              ? ["Mon", "Tue", "Wed", "Thu", "Fri"]
              : ["Pzt", "Sal", "Çar", "Per", "Cum"]
            ).map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05, ease }}
                className={`rounded-lg border py-2 text-center ${
                  i === 2
                    ? "border-bonero-green/35 bg-bonero-green/10"
                    : "border-bonero-dark/8 bg-[#f8faf9]"
                }`}
              >
                <p className="text-[9px] font-medium text-bonero-dark/40">{d}</p>
                <p className={`text-sm font-bold ${i === 2 ? "text-bonero-green" : "text-bonero-dark"}`}>
                  {10 + i}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Animated slot rail */}
          <div className="relative mt-5 space-y-2">
            <div className="absolute top-3 bottom-3 left-[3.25rem] w-px bg-bonero-dark/8" />
            {t.slots.map((slot, i) => {
              const isActive = activeSlot === i;
              return (
                <motion.button
                  key={slot.time}
                  type="button"
                  onClick={() => setActiveSlot(i)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, ease }}
                  className={`relative flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                    isActive
                      ? "border-bonero-green/30 bg-bonero-green/[0.06] shadow-sm"
                      : "border-bonero-dark/8 bg-white hover:border-bonero-green/20"
                  }`}
                >
                  <span className="w-10 shrink-0 font-mono text-[11px] font-semibold text-bonero-dark/50">
                    {slot.time}
                  </span>
                  <span
                    className={`relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                      slot.status === "confirmed"
                        ? "border-bonero-green bg-bonero-green text-white"
                        : slot.status === "pending"
                          ? "border-bonero-dark/25 bg-white"
                          : "border-bonero-green/50 bg-bonero-green/10"
                    }`}
                  >
                    {slot.status === "confirmed" && <Check size={8} strokeWidth={3} />}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-bonero-dark">
                    {slot.label}
                  </span>
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.span
                        key={slot.status}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-bold ${
                          slot.status === "confirmed"
                            ? "bg-bonero-green/15 text-bonero-green"
                            : slot.status === "pending"
                              ? "bg-bonero-dark/8 text-bonero-dark/55"
                              : "bg-bonero-green/10 text-bonero-green/80"
                        }`}
                      >
                        {statusLabel(slot.status, t)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* Progress bar for auto-cycle */}
          <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-bonero-dark/8">
            <motion.div
              key={activeSlot}
              className="h-full bg-bonero-green"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: SLOT_CYCLE / t.slots.length / 1000, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
