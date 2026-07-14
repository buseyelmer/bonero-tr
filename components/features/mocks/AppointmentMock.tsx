"use client";

import { motion } from "framer-motion";

type Props = {
  active?: boolean;
  isEn?: boolean;
};

export default function AppointmentMock({
  active = true,
  isEn = false,
}: Props) {
  const days = isEn
    ? ["Mon", "Tue", "Wed", "Thu", "Fri"]
    : ["Pzt", "Sal", "Çar", "Per", "Cum"];

  const slots = isEn
    ? [
        { time: "10:00", name: "Ayşe Demir", status: "confirmed", day: 1 },
        { time: "11:30", name: "Sales call", status: "pending", day: 2 },
        { time: "14:00", name: "Mert Kaya", status: "confirmed", day: 3 },
        { time: "16:00", name: "Color & cut", status: "reminder", day: 4 },
      ]
    : [
        { time: "10:00", name: "Ayşe Demir", status: "confirmed", day: 1 },
        { time: "11:30", name: "Satış toplantısı", status: "pending", day: 2 },
        { time: "14:00", name: "Mert Kaya", status: "confirmed", day: 3 },
        { time: "16:00", name: "Renk & kesim", status: "reminder", day: 4 },
      ];

  const statusLabel = (s: string) => {
    if (isEn) {
      if (s === "confirmed") return "Confirmed";
      if (s === "pending") return "Pending";
      return "Reminded";
    }
    if (s === "confirmed") return "Onaylı";
    if (s === "pending") return "Bekliyor";
    return "Hatırlatıldı";
  };

  const statusClass = (s: string) => {
    if (s === "confirmed") return "bg-bonero-green/15 text-bonero-green";
    if (s === "pending") return "bg-amber-400/20 text-amber-700";
    return "bg-sky-400/15 text-sky-700";
  };

  return (
    <div className="flex h-full min-h-0 flex-col justify-between gap-4 p-1 sm:gap-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.14em] text-bonero-dark/35 uppercase">
            {isEn ? "Calendar" : "Takvim"}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-bonero-dark">
            {isEn ? "This week" : "Bu hafta"}
          </p>
        </div>
        <motion.span
          className="inline-flex items-center gap-1.5 rounded-full border border-bonero-green/25 bg-bonero-green/10 px-2.5 py-1 text-[10px] font-semibold text-bonero-green"
          animate={active ? { opacity: [0.55, 1, 0.55] } : { opacity: 0.7 }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-bonero-green" />
          {isEn ? "4 today" : "Bugün 4"}
        </motion.span>
      </div>

      <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
        {days.map((d, i) => (
          <motion.div
            key={d}
            className={`rounded-xl border px-1 py-2 text-center sm:px-1.5 ${
              i === 2
                ? "border-bonero-green/30 bg-bonero-green/10"
                : "border-bonero-dark/8 bg-white"
            }`}
            animate={{
              opacity: active ? 1 : 0.5,
              scale: active && i === 2 ? 1.02 : 1,
            }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <p className="text-[9px] font-medium text-bonero-dark/40">{d}</p>
            <p
              className={`mt-0.5 text-sm font-bold ${
                i === 2 ? "text-bonero-green" : "text-bonero-dark"
              }`}
            >
              {10 + i}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-2">
        {slots.map((s, i) => (
          <motion.div
            key={`${s.time}-${s.name}`}
            className="flex items-center gap-3 rounded-xl border border-bonero-dark/8 bg-white px-3 py-2.5 shadow-sm"
            initial={{ opacity: 0.4, x: -6 }}
            animate={{
              opacity: active ? 1 : 0.5,
              x: active ? 0 : -4,
            }}
            transition={{ duration: 0.35, delay: active ? i * 0.07 : 0 }}
          >
            <span className="w-11 shrink-0 font-mono text-[11px] font-semibold text-bonero-dark/55">
              {s.time}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-bonero-dark">
                {s.name}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${statusClass(s.status)}`}
            >
              {statusLabel(s.status)}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-bonero-dark/8 bg-white px-3 py-2.5 shadow-sm">
        <p className="text-[10px] font-semibold tracking-wide text-bonero-dark/35 uppercase">
          {isEn ? "Next reminder" : "Sonraki hatırlatma"}
        </p>
        <p className="mt-1 text-[12px] font-semibold text-bonero-dark">
          {isEn
            ? "WhatsApp · Ayşe Demir · in 2h"
            : "WhatsApp · Ayşe Demir · 2 saat sonra"}
        </p>
      </div>
    </div>
  );
}
