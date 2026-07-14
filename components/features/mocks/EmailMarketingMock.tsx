"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

type Props = {
  active?: boolean;
  isEn?: boolean;
};

export default function EmailMarketingMock({
  active = true,
  isEn = false,
}: Props) {
  const metrics = isEn
    ? [
        { k: "Open", v: "42%" },
        { k: "Click", v: "8.6%" },
        { k: "List", v: "2.4k" },
      ]
    : [
        { k: "Açılma", v: "%42" },
        { k: "Tıklama", v: "%8,6" },
        { k: "Liste", v: "2,4b" },
      ];

  const segments = isEn
    ? [
        { name: "Active customers", n: 1860 },
        { name: "No-show 30d", n: 124 },
        { name: "New leads", n: 410 },
      ]
    : [
        { name: "Aktif müşteriler", n: 1860 },
        { name: "No-show 30g", n: 124 },
        { name: "Yeni lead’ler", n: 410 },
      ];

  return (
    <div className="flex h-full min-h-0 flex-col justify-between gap-4 p-1 sm:gap-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-bonero-green text-white shadow-sm">
            <Mail size={16} strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-semibold text-bonero-dark">
              Email Marketing
            </p>
            <p className="text-[10px] text-bonero-dark/40">
              {isEn ? "Campaign studio" : "Kampanya stüdyosu"}
            </p>
          </div>
        </div>
        <motion.span
          className="rounded-full border border-bonero-green/25 bg-bonero-green/10 px-2.5 py-1 text-[10px] font-semibold text-bonero-green"
          animate={active ? { opacity: [0.55, 1, 0.55] } : { opacity: 0.7 }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          {isEn ? "Scheduled" : "Zamanlandı"}
        </motion.span>
      </div>

      <div className="rounded-2xl border border-bonero-dark/8 bg-white p-3.5 shadow-sm sm:p-4">
        <p className="text-[10px] font-semibold tracking-wide text-bonero-dark/35 uppercase">
          {isEn ? "Next send" : "Sonraki gönderim"}
        </p>
        <p className="mt-1.5 text-[15px] font-semibold leading-snug text-bonero-dark">
          {isEn
            ? "Friday tips · Active customers"
            : "Cuma ipuçları · Aktif müşteriler"}
        </p>
        <p className="mt-1 text-[11px] text-bonero-dark/45">
          {isEn ? "Fri 10:00 · A/B subject on" : "Cum 10:00 · A/B konu açık"}
        </p>
        <div className="mt-3 flex gap-2">
          {(isEn
            ? ["A: Don’t miss this week", "B: 3 tips for you"]
            : ["A: Bu haftayı kaçırma", "B: Senin için 3 ipucu"]
          ).map((s, i) => (
            <span
              key={s}
              className={`min-w-0 flex-1 truncate rounded-lg border px-2 py-1.5 text-[10px] font-medium ${
                i === 0
                  ? "border-bonero-green/30 bg-bonero-green/5 text-bonero-dark"
                  : "border-bonero-dark/8 text-bonero-dark/55"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {metrics.map((m) => (
          <div
            key={m.k}
            className="rounded-xl border border-bonero-dark/8 bg-white px-2 py-2 text-center shadow-sm"
          >
            <p className="text-[9px] tracking-wider text-bonero-dark/35 uppercase">
              {m.k}
            </p>
            <p className="mt-0.5 text-sm font-bold text-bonero-dark">{m.v}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-[10px] font-semibold tracking-wide text-bonero-dark/35 uppercase">
          {isEn ? "Segments" : "Segmentler"}
        </p>
        {segments.map((s, i) => (
          <motion.div
            key={s.name}
            className="flex items-center justify-between rounded-xl border border-bonero-dark/8 bg-white px-3 py-2 shadow-sm"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: active ? 1 : 0.5 }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="text-[12px] font-semibold text-bonero-dark">
              {s.name}
            </span>
            <span className="font-mono text-[11px] text-bonero-dark/40">
              {s.n.toLocaleString(isEn ? "en-US" : "tr-TR")}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
