"use client";

import { motion } from "framer-motion";

type Props = {
  active?: boolean;
  isEn?: boolean;
  variant?: "board" | "kanban";
};

export default function ContentMock({
  active = true,
  isEn = false,
  variant = "board",
}: Props) {
  if (variant === "kanban") {
    return <KanbanBoard active={active} isEn={isEn} />;
  }
  return <ContentBoard active={active} isEn={isEn} />;
}

function statusLabel(s: string, isEn: boolean) {
  if (isEn) {
    if (s === "approved") return "Approved";
    if (s === "review") return "In review";
    if (s === "draft") return "Draft";
    return "Scheduled";
  }
  if (s === "approved") return "Onaylı";
  if (s === "review") return "İncelemede";
  if (s === "draft") return "Taslak";
  return "Planlandı";
}

function statusTone(s: string) {
  if (s === "approved") return "bg-bonero-green/15 text-bonero-green";
  if (s === "review") return "bg-violet-500/12 text-violet-700";
  if (s === "draft") return "bg-bonero-dark/8 text-bonero-dark/50";
  return "bg-bonero-green/[0.08] text-bonero-green/70";
}

function ContentBoard({ active, isEn }: { active: boolean; isEn: boolean }) {
  const items = isEn
    ? [
        { title: "Spring offer carousel", channel: "Instagram", status: "approved", when: "Wed 14:00" },
        { title: "Weekly tips newsletter", channel: "Email", status: "review", when: "Thu 09:00" },
        { title: "Before/after reel", channel: "Instagram", status: "draft", when: "Fri 18:00" },
        { title: "Booking reminder story", channel: "Story", status: "scheduled", when: "Sat 10:00" },
      ]
    : [
        { title: "Bahar kampanya carousel", channel: "Instagram", status: "approved", when: "Çar 14:00" },
        { title: "Haftalık ipuçları bülteni", channel: "E-posta", status: "review", when: "Per 09:00" },
        { title: "Öncesi/sonrası reel", channel: "Instagram", status: "draft", when: "Cum 18:00" },
        { title: "Randevu hatırlatma story", channel: "Story", status: "scheduled", when: "Cmt 10:00" },
      ];

  const days = isEn ? ["M", "T", "W", "T", "F", "S"] : ["P", "S", "Ç", "P", "C", "C"];

  return (
    <div className="flex h-full min-h-0 flex-col justify-between gap-4 p-1 sm:gap-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.14em] text-bonero-dark/35 uppercase">
            {isEn ? "Content board" : "İçerik panosu"}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-bonero-dark">
            {isEn ? "This week’s plan" : "Bu haftanın planı"}
          </p>
        </div>
        <motion.span
          className="rounded-full border border-bonero-dark/10 bg-white px-2.5 py-1 text-[10px] font-semibold text-bonero-dark/50"
          animate={active ? { opacity: [0.55, 1, 0.55] } : { opacity: 0.7 }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          {isEn ? "4 queued" : "4 sırada"}
        </motion.span>
      </div>

      <div className="grid grid-cols-6 gap-1">
        {days.map((d, i) => (
          <div
            key={`${d}-${i}`}
            className={`rounded-lg border py-2 text-center text-[10px] font-semibold ${
              i === 2
                ? "border-bonero-green/30 bg-bonero-green/10 text-bonero-green"
                : "border-bonero-dark/8 bg-white text-bonero-dark/40"
            }`}
          >
            {d}
            <div
              className={`mx-auto mt-1.5 h-1.5 w-1.5 rounded-full ${
                i === 1 || i === 2 || i === 4 ? "bg-bonero-green" : "bg-bonero-dark/15"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            className="rounded-xl border border-bonero-dark/8 bg-white px-3 py-2.5 shadow-sm"
            initial={{ opacity: 0.4, y: 6 }}
            animate={{ opacity: active ? 1 : 0.5, y: active ? 0 : 4 }}
            transition={{ duration: 0.35, delay: active ? i * 0.06 : 0 }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-bonero-dark">{item.title}</p>
                <p className="mt-0.5 text-[10px] text-bonero-dark/40">
                  {item.channel} · {item.when}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${statusTone(item.status)}`}
              >
                {statusLabel(item.status, isEn)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function KanbanBoard({ active, isEn }: { active: boolean; isEn: boolean }) {
  const cols = isEn
    ? [
        {
          label: "Draft",
          items: [{ title: "Before/after reel", tag: "Instagram" }],
        },
        {
          label: "In review",
          items: [{ title: "Weekly newsletter", tag: "Email" }],
        },
        {
          label: "Approved",
          items: [{ title: "Spring carousel", tag: "Instagram" }],
        },
        {
          label: "Scheduled",
          items: [{ title: "Booking story", tag: "Story" }],
        },
      ]
    : [
        {
          label: "Taslak",
          items: [{ title: "Öncesi/sonrası reel", tag: "Instagram" }],
        },
        {
          label: "İncelemede",
          items: [{ title: "Haftalık bülten", tag: "E-posta" }],
        },
        {
          label: "Onaylı",
          items: [{ title: "Bahar carousel", tag: "Instagram" }],
        },
        {
          label: "Planlandı",
          items: [{ title: "Randevu story", tag: "Story" }],
        },
      ];

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {cols.map((col, ci) => (
          <motion.div
            key={col.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: active ? 1 : 0.55, y: 0 }}
            transition={{ delay: ci * 0.08 }}
            className="min-w-0 rounded-xl border border-bonero-dark/8 bg-[#f8faf9] p-2 sm:p-2.5"
          >
            <p className="text-[10px] font-bold tracking-wide text-bonero-dark/40 uppercase">
              {col.label}
            </p>
            <div className="mt-2 space-y-1.5">
              {col.items.map((item) => (
                <div
                  key={item.title}
                  className={`rounded-lg border bg-white px-2 py-2 shadow-sm ${
                    ci === 1 && active
                      ? "border-violet-500/30 ring-2 ring-violet-500/15"
                      : "border-bonero-dark/8"
                  }`}
                >
                  <p className="text-[10px] font-semibold leading-snug text-bonero-dark">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[9px] text-bonero-dark/40">{item.tag}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
