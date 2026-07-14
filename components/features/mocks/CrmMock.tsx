"use client";

import { motion } from "framer-motion";

type Props = {
  active?: boolean;
  isEn?: boolean;
};

export default function CrmMock({ active = true, isEn = false }: Props) {
  const stages = isEn
    ? [
        { name: "New", count: 8, tone: "bg-bonero-dark/10" },
        { name: "Warm", count: 5, tone: "bg-amber-400/25" },
        { name: "Offer", count: 3, tone: "bg-sky-400/25" },
        { name: "Won", count: 2, tone: "bg-bonero-green/25" },
      ]
    : [
        { name: "Yeni", count: 8, tone: "bg-bonero-dark/10" },
        { name: "İlgili", count: 5, tone: "bg-amber-400/25" },
        { name: "Teklif", count: 3, tone: "bg-sky-400/25" },
        { name: "Kazanıldı", count: 2, tone: "bg-bonero-green/25" },
      ];

  const card = isEn
    ? {
        name: "Elif Yılmaz",
        company: "Bloom Studio",
        channel: "Instagram DM",
        next: "Call tomorrow 11:00",
        tags: ["VIP", "Demo"],
      }
    : {
        name: "Elif Yılmaz",
        company: "Bloom Studio",
        channel: "Instagram DM",
        next: "Yarın 11:00 ara",
        tags: ["VIP", "Demo"],
      };

  return (
    <div className="flex h-full min-h-0 flex-col justify-between gap-4 p-1 sm:gap-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.14em] text-bonero-dark/35 uppercase">
            Pipeline
          </p>
          <p className="mt-0.5 text-sm font-semibold text-bonero-dark">
            {isEn ? "This week’s leads" : "Bu haftanın lead’leri"}
          </p>
        </div>
        <motion.span
          className="rounded-full border border-bonero-dark/10 bg-white px-2.5 py-1 text-[10px] font-semibold text-bonero-dark/50"
          animate={active ? { opacity: [0.55, 1, 0.55] } : { opacity: 0.7 }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          {isEn ? "18 open" : "18 açık"}
        </motion.span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {stages.map((s, i) => (
          <motion.div
            key={s.name}
            className={`rounded-xl border border-bonero-dark/8 ${s.tone} px-1.5 py-2 text-center sm:px-2 sm:py-2.5`}
            initial={{ opacity: 0.4, y: 6 }}
            animate={{
              opacity: active ? 1 : 0.5,
              y: active ? 0 : 4,
            }}
            transition={{ duration: 0.35, delay: active ? i * 0.06 : 0 }}
          >
            <p className="truncate text-[9px] font-medium text-bonero-dark/45">
              {s.name}
            </p>
            <p className="font-heading mt-0.5 text-base font-bold text-bonero-dark sm:text-lg">
              {s.count}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-bonero-dark/8 bg-white p-3.5 shadow-sm sm:p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bonero-green/15 text-sm font-bold text-bonero-green">
            EY
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-sm font-semibold text-bonero-dark">{card.name}</p>
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-bonero-dark/[0.05] px-1.5 py-0.5 text-[9px] font-semibold text-bonero-dark/50"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-0.5 text-[11px] text-bonero-dark/45">{card.company}</p>
            <p className="mt-2 text-[11px] text-bonero-dark/55">
              <span className="font-medium text-bonero-dark/70">
                {isEn ? "Channel" : "Kanal"}:
              </span>{" "}
              {card.channel}
            </p>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-bonero-green/20 bg-bonero-green/5 px-2.5 py-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-bonero-green" />
              <p className="text-[11px] font-semibold text-bonero-dark">
                {card.next}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(isEn
          ? [
              { k: "Reply", v: "2.1m" },
              { k: "Hot", v: "5" },
              { k: "Won", v: "12" },
            ]
          : [
              { k: "Yanıt", v: "2,1dk" },
              { k: "Sıcak", v: "5" },
              { k: "Kazanılan", v: "12" },
            ]
        ).map((m) => (
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
    </div>
  );
}
