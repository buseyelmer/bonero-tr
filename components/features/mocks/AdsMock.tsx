"use client";

import { motion } from "framer-motion";

type Props = {
  active?: boolean;
  isEn?: boolean;
};

export default function AdsMock({ active = true, isEn = false }: Props) {
  const platforms = isEn
    ? [
        { name: "Meta", spend: "₺12.4k", roas: "3.8×", up: true },
        { name: "Google", spend: "₺8.1k", roas: "2.4×", up: false },
        { name: "TikTok", spend: "₺4.6k", roas: "4.1×", up: true },
      ]
    : [
        { name: "Meta", spend: "₺12,4b", roas: "3,8×", up: true },
        { name: "Google", spend: "₺8,1b", roas: "2,4×", up: false },
        { name: "TikTok", spend: "₺4,6b", roas: "4,1×", up: true },
      ];

  const variants = isEn
    ? [
        { l: "A", text: "Stock won’t last — book now.", tag: "Urgency" },
        { l: "B", text: "20% off this week only.", tag: "Offer" },
        { l: "C", text: "You left something waiting.", tag: "Retarget" },
      ]
    : [
        { l: "A", text: "Stok bitmeden randevu al.", tag: "Aciliyet" },
        { l: "B", text: "Bu hafta %20 — sadece sen.", tag: "Teklif" },
        { l: "C", text: "Bir şeyler seni bekliyor.", tag: "Retarget" },
      ];

  return (
    <div className="flex h-full min-h-0 flex-col justify-between gap-4 p-1 sm:gap-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.14em] text-bonero-dark/35 uppercase">
            {isEn ? "Ad desk" : "Reklam masası"}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-bonero-dark">
            {isEn ? "All platforms" : "Tüm platformlar"}
          </p>
        </div>
        <motion.span
          className="inline-flex items-center gap-1.5 rounded-full border border-bonero-green/30 bg-bonero-green/10 px-2.5 py-1 text-[10px] font-semibold text-bonero-green"
          animate={active ? { opacity: [0.55, 1, 0.55] } : { opacity: 0.7 }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          AI
        </motion.span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {platforms.map((p, i) => (
          <motion.div
            key={p.name}
            className="rounded-xl border border-bonero-dark/8 bg-white px-2 py-2.5 shadow-sm sm:px-2.5"
            initial={{ opacity: 0.4, y: 6 }}
            animate={{ opacity: active ? 1 : 0.5, y: active ? 0 : 4 }}
            transition={{ duration: 0.35, delay: active ? i * 0.06 : 0 }}
          >
            <p className="text-[10px] font-semibold text-bonero-dark">{p.name}</p>
            <p className="mt-1 font-mono text-[11px] text-bonero-dark/45">
              {p.spend}
            </p>
            <p
              className={`mt-1 text-sm font-bold ${
                p.up ? "text-bonero-green" : "text-bonero-dark/55"
              }`}
            >
              {p.roas}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-bonero-dark/8 bg-white p-3 shadow-sm sm:p-3.5">
        <div className="mb-2.5 flex items-center justify-between">
          <p className="text-[10px] font-semibold tracking-wide text-bonero-dark/35 uppercase">
            {isEn ? "AI variants" : "AI varyasyonlar"}
          </p>
          <span className="rounded-md bg-bonero-green/10 px-1.5 py-0.5 text-[9px] font-semibold text-bonero-green">
            {isEn ? "Ready" : "Hazır"}
          </span>
        </div>
        <div className="space-y-2">
          {variants.map((v, i) => (
            <motion.div
              key={v.l}
              className={`flex items-start gap-2.5 rounded-xl border px-2.5 py-2 ${
                i === 0
                  ? "border-bonero-green/30 bg-bonero-green/5"
                  : "border-bonero-dark/8 bg-bonero-dark/[0.02]"
              }`}
              animate={{
                opacity: active ? 1 : 0.5,
                scale: active && i === 0 ? 1.01 : 1,
              }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${
                  i === 0
                    ? "bg-bonero-green text-white"
                    : "bg-bonero-dark/8 text-bonero-dark/45"
                }`}
              >
                {v.l}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold leading-snug text-bonero-dark">
                  {v.text}
                </p>
                <p className="mt-0.5 text-[9px] font-medium tracking-wide text-bonero-dark/35 uppercase">
                  {v.tag}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-bonero-green/20 bg-bonero-green/5 px-3 py-2.5">
        <p className="text-[10px] font-semibold tracking-wide text-bonero-green uppercase">
          {isEn ? "AI tip" : "AI öneri"}
        </p>
        <p className="mt-1 text-[12px] font-semibold text-bonero-dark">
          {isEn
            ? "Shift +12% budget Meta → TikTok (ROAS rising)."
            : "Bütçenin %12’sini Meta → TikTok kaydır (ROAS yükseliyor)."}
        </p>
      </div>
    </div>
  );
}
