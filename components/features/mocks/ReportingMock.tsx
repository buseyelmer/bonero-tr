"use client";

import { motion } from "framer-motion";

const BARS = [36, 52, 44, 68, 58, 82, 74, 92];

type Props = {
  active?: boolean;
  isEn?: boolean;
  variant?: "full" | "hero";
};

export default function ReportingMock({ active = true, isEn = false, variant = "full" }: Props) {
  const compact = variant === "hero";
  const metrics = isEn
    ? [
        { k: "Reply time", v: "1.4m", d: "−38%" },
        { k: "Open", v: "24", d: "+6" },
        { k: "Conv.", v: "12%", d: "+2.1" },
      ]
    : [
        { k: "Yanıt süresi", v: "1,4dk", d: "−38%" },
        { k: "Açık", v: "24", d: "+6" },
        { k: "Dönüşüm", v: "%12", d: "+2,1" },
      ];

  const channels = isEn
    ? [
        { name: "WhatsApp", pct: 42 },
        { name: "Instagram", pct: 28 },
        { name: "Email", pct: 18 },
        { name: "Ads", pct: 12 },
      ]
    : [
        { name: "WhatsApp", pct: 42 },
        { name: "Instagram", pct: 28 },
        { name: "E-posta", pct: 18 },
        { name: "Reklam", pct: 12 },
      ];

  if (compact) {
    return (
      <div className="flex min-h-0 flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {metrics.map((m) => (
            <div
              key={m.k}
              className="rounded-lg border border-bonero-dark/8 bg-white px-2 py-2 shadow-sm"
            >
              <p className="truncate text-[8px] tracking-wider text-bonero-dark/35 uppercase">{m.k}</p>
              <p className="font-heading mt-0.5 text-base font-bold leading-none text-bonero-dark">{m.v}</p>
              <p className="mt-0.5 text-[9px] font-semibold text-bonero-green">{m.d}</p>
            </div>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-2.5">
          <div className="rounded-xl border border-bonero-dark/8 bg-white p-2.5 shadow-sm">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-[10px] font-medium text-bonero-dark/45">
                {isEn ? "Weekly volume" : "Haftalık hacim"}
              </span>
              <span className="text-[9px] text-bonero-dark/30">+12%</span>
            </div>
            <div className="flex h-14 items-end gap-1">
              {BARS.slice(0, 7).map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t bg-bonero-green"
                  style={{ opacity: i === 6 ? 1 : 0.4 + i * 0.07 }}
                  initial={{ height: "12%" }}
                  animate={{ height: active ? `${h}%` : "20%" }}
                  transition={{ duration: 0.5, delay: active ? i * 0.03 : 0 }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-bonero-dark/8 bg-white p-2.5 shadow-sm">
            <p className="text-[9px] font-semibold tracking-[0.1em] text-bonero-dark/35 uppercase">
              {isEn ? "By channel" : "Kanallar"}
            </p>
            <div className="mt-2 space-y-1.5">
              {channels.map((c) => (
                <div key={c.name} className="flex items-center gap-1.5">
                  <span className="w-14 shrink-0 truncate text-[9px] font-medium text-bonero-dark/55">
                    {c.name}
                  </span>
                  <div className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-bonero-dark/8">
                    <motion.div
                      className="h-full rounded-full bg-bonero-green"
                      initial={{ width: 0 }}
                      animate={{ width: active ? `${c.pct}%` : `${c.pct * 0.4}%` }}
                      transition={{ duration: 0.55, delay: 0.1 }}
                    />
                  </div>
                  <span className="w-7 shrink-0 text-right font-mono text-[8px] text-bonero-dark/40">
                    {c.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col justify-between gap-4 p-1 sm:gap-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.14em] text-bonero-dark/35 uppercase">
            {isEn ? "Performance" : "Performans"}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-bonero-dark">
            {isEn ? "Last 7 days" : "Son 7 gün"}
          </p>
        </div>
        <motion.span
          className="inline-flex items-center gap-1.5 rounded-full border border-bonero-green/25 bg-bonero-green/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-bonero-green"
          animate={active ? { opacity: [0.55, 1, 0.55] } : { opacity: 0.7 }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-bonero-green" />
          LIVE
        </motion.span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {metrics.map((m) => (
          <div
            key={m.k}
            className="rounded-xl border border-bonero-dark/8 bg-white px-2.5 py-2.5 shadow-sm"
          >
            <p className="truncate text-[9px] tracking-wider text-bonero-dark/35 uppercase">
              {m.k}
            </p>
            <p className="font-heading mt-1 text-lg font-bold text-bonero-dark sm:text-xl">
              {m.v}
            </p>
            <p className="mt-0.5 text-[10px] font-semibold text-bonero-green">
              {m.d}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-bonero-dark/8 bg-white p-3 shadow-sm sm:p-3.5">
        <div className="mb-3 flex items-end justify-between">
          <span className="text-[11px] font-medium text-bonero-dark/45">
            {isEn ? "Weekly volume" : "Haftalık hacim"}
          </span>
          <span className="text-[10px] text-bonero-dark/30">
            {isEn ? "Messages + leads" : "Mesaj + lead"}
          </span>
        </div>
        <div className="flex h-20 items-end gap-1.5 sm:h-24 sm:gap-2">
          {BARS.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-md bg-bonero-green"
              style={{ opacity: i === BARS.length - 1 ? 1 : 0.45 + i * 0.05 }}
              initial={{ height: "14%" }}
              animate={{ height: active ? `${h}%` : "22%" }}
              transition={{ duration: 0.55, delay: active ? i * 0.04 : 0 }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] font-semibold tracking-[0.12em] text-bonero-dark/35 uppercase">
          {isEn ? "By channel" : "Kanallara göre"}
        </p>
        {channels.map((c) => (
          <div key={c.name} className="flex items-center gap-2.5">
            <span className="w-16 shrink-0 truncate text-[11px] font-medium text-bonero-dark/55 sm:w-20">
              {c.name}
            </span>
            <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-bonero-dark/8">
              <motion.div
                className="h-full rounded-full bg-bonero-green"
                initial={{ width: 0 }}
                animate={{ width: active ? `${c.pct}%` : `${c.pct * 0.4}%` }}
                transition={{ duration: 0.6, delay: 0.15 }}
              />
            </div>
            <span className="w-8 shrink-0 text-right font-mono text-[10px] text-bonero-dark/40">
              {c.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
