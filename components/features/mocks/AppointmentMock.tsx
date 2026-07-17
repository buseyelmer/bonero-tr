"use client";

import { motion } from "framer-motion";

type Props = {
  active?: boolean;
  isEn?: boolean;
  variant?: "default" | "agenda" | "compact";
};

export default function AppointmentMock({
  active = true,
  isEn = false,
  variant = "default",
}: Props) {
  if (variant === "agenda") {
    return <AgendaTimeline active={active} isEn={isEn} />;
  }
  if (variant === "compact") {
    return <CompactWeek active={active} isEn={isEn} />;
  }
  return <DefaultCalendar active={active} isEn={isEn} />;
}

function statusLabel(s: string, isEn: boolean) {
  if (isEn) {
    if (s === "confirmed") return "Confirmed";
    if (s === "pending") return "Pending";
    return "Reminded";
  }
  if (s === "confirmed") return "Onaylı";
  if (s === "pending") return "Bekliyor";
  return "Hatırlatıldı";
}

function statusClass(s: string) {
  if (s === "confirmed") return "bg-bonero-green/15 text-bonero-green";
  if (s === "pending") return "bg-bonero-dark/8 text-bonero-dark/65";
  return "bg-bonero-green/10 text-bonero-green/80";
}

function blockClass(status: string, muted?: boolean) {
  if (muted) return "border-bonero-dark/8 bg-bonero-dark/[0.03]";
  if (status === "pending") return "border-bonero-dark/12 bg-[#f4f6f5]";
  if (status === "reminder") return "border-bonero-green/20 bg-bonero-green/[0.05]";
  return "border-bonero-green/25 bg-bonero-green/[0.06]";
}

function AgendaTimeline({ active, isEn }: { active: boolean; isEn: boolean }) {
  const hours = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
  const blocks = [
    { hour: 1, title: isEn ? "Ayşe Demir · Color" : "Ayşe Demir · Renk", status: "confirmed" },
    { hour: 2, title: isEn ? "Sales call" : "Satış toplantısı", status: "pending" },
    { hour: 4, title: isEn ? "Lunch break" : "Öğle arası", status: "confirmed", muted: true },
    { hour: 5, title: "Mert Kaya", status: "confirmed" },
    { hour: 7, title: isEn ? "Reminder sent" : "Hatırlatma gitti", status: "reminder" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-bonero-dark/10 bg-white p-4 shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:p-5">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(24,131,71,0.08), transparent 55%)",
        }}
      />
      <div className="relative mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-[0.14em] text-bonero-dark/40 uppercase">
            {isEn ? "Today" : "Bugün"}
          </p>
          <p className="font-heading text-lg text-bonero-dark">
            {isEn ? "Wednesday · 12 Mar" : "Çarşamba · 12 Mar"}
          </p>
        </div>
        <motion.span
          className="inline-flex items-center gap-1.5 rounded-full border border-bonero-green/25 bg-bonero-green/10 px-2.5 py-1 text-[10px] font-bold text-bonero-green"
          animate={active ? { opacity: [0.65, 1, 0.65] } : { opacity: 0.7 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-bonero-green" />
          {isEn ? "4 booked" : "4 dolu"}
        </motion.span>
      </div>

      <div className="relative space-y-1">
        {hours.map((hour, i) => {
          const block = blocks.find((b) => b.hour === i);
          return (
            <div key={hour} className="relative flex min-h-[2.75rem] gap-3">
              <span className="w-10 shrink-0 pt-1 font-mono text-[10px] font-semibold text-bonero-dark/35">
                {hour}
              </span>
              <div className="relative flex-1 border-t border-bonero-dark/8 pt-1">
                {block && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0.94 }}
                    animate={{ opacity: active ? 1 : 0.55, scaleX: active ? 1 : 0.97 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className={`rounded-lg border px-3 py-2 ${blockClass(block.status, block.muted)}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`truncate text-xs font-semibold ${
                          block.muted ? "text-bonero-dark/45" : "text-bonero-dark"
                        }`}
                      >
                        {block.title}
                      </p>
                      {!block.muted && (
                        <span
                          className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold ${statusClass(block.status)}`}
                        >
                          {statusLabel(block.status, isEn)}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompactWeek({ active, isEn }: { active: boolean; isEn: boolean }) {
  const days = isEn
    ? ["Mon", "Tue", "Wed", "Thu", "Fri"]
    : ["Pzt", "Sal", "Çar", "Per", "Cum"];
  const counts = [3, 5, 4, 6, 2];

  return (
    <div className="rounded-xl border border-bonero-dark/8 bg-[#f8faf9] p-4 sm:p-5">
      <p className="text-[10px] font-bold tracking-[0.14em] text-bonero-dark/40 uppercase">
        {isEn ? "Week view" : "Haftalık görünüm"}
      </p>
      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {days.map((d, i) => (
          <motion.div
            key={d}
            animate={{ opacity: active ? 1 : 0.5, scale: active && i === 2 ? 1.03 : 1 }}
            className={`rounded-xl border px-1 py-2.5 text-center transition-colors ${
              i === 2
                ? "border-bonero-green/30 bg-bonero-green/10 shadow-sm"
                : "border-bonero-dark/8 bg-white"
            }`}
          >
            <p className="text-[9px] font-medium text-bonero-dark/40">{d}</p>
            <p className={`mt-0.5 text-lg font-bold ${i === 2 ? "text-bonero-green" : "text-bonero-dark"}`}>
              {10 + i}
            </p>
            <p className="mt-1 text-[9px] font-semibold text-bonero-dark/45">
              {counts[i]} {isEn ? "slots" : "slot"}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {[
          { t: "10:00", n: "Ayşe Demir", s: "confirmed" },
          { t: "14:00", n: "Mert Kaya", s: "reminder" },
        ].map((row, i) => (
          <motion.div
            key={row.t}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: active ? 1 : 0.5, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 rounded-lg border border-bonero-dark/8 bg-white px-3 py-2 shadow-sm"
          >
            <span className="font-mono text-[11px] font-semibold text-bonero-dark/50">{row.t}</span>
            <span className="flex-1 truncate text-xs font-semibold text-bonero-dark">{row.n}</span>
            <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${statusClass(row.s)}`}>
              {statusLabel(row.s, isEn)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DefaultCalendar({ active, isEn }: { active: boolean; isEn: boolean }) {
  const days = isEn
    ? ["Mon", "Tue", "Wed", "Thu", "Fri"]
    : ["Pzt", "Sal", "Çar", "Per", "Cum"];

  const slots = isEn
    ? [
        { time: "10:00", name: "Ayşe Demir", status: "confirmed" },
        { time: "11:30", name: "Sales call", status: "pending" },
        { time: "14:00", name: "Mert Kaya", status: "confirmed" },
        { time: "16:00", name: "Color & cut", status: "reminder" },
      ]
    : [
        { time: "10:00", name: "Ayşe Demir", status: "confirmed" },
        { time: "11:30", name: "Satış toplantısı", status: "pending" },
        { time: "14:00", name: "Mert Kaya", status: "confirmed" },
        { time: "16:00", name: "Renk & kesim", status: "reminder" },
      ];

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
            animate={{ opacity: active ? 1 : 0.5, x: active ? 0 : -4 }}
            transition={{ duration: 0.35, delay: active ? i * 0.07 : 0 }}
          >
            <span className="w-11 shrink-0 font-mono text-[11px] font-semibold text-bonero-dark/55">
              {s.time}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-bonero-dark">{s.name}</p>
            </div>
            <span
              className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${statusClass(s.status)}`}
            >
              {statusLabel(s.status, isEn)}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-bonero-green/15 bg-bonero-green/[0.04] px-3 py-2.5">
        <p className="text-[10px] font-semibold tracking-wide text-bonero-dark/35 uppercase">
          {isEn ? "Next reminder" : "Sonraki hatırlatma"}
        </p>
        <p className="mt-1 text-[12px] font-semibold text-bonero-dark">
          {isEn ? "WhatsApp · Ayşe Demir · in 2h" : "WhatsApp · Ayşe Demir · 2 saat sonra"}
        </p>
      </div>
    </div>
  );
}
