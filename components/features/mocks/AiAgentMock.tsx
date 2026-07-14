"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

type Props = {
  active?: boolean;
  isEn?: boolean;
};

export default function AiAgentMock({ active = true, isEn = false }: Props) {
  const messages = isEn
    ? [
        {
          from: "user" as const,
          text: "Hi — are you open tomorrow at 14:00?",
        },
        {
          from: "agent" as const,
          text: "Yes! 14:00 is free. Want me to book it under your name?",
        },
        {
          from: "user" as const,
          text: "Yes, Elif — WhatsApp is fine.",
        },
        {
          from: "agent" as const,
          text: "Booked. Reminder tomorrow at 12:00. Anything else?",
        },
      ]
    : [
        {
          from: "user" as const,
          text: "Merhaba, yarın 14:00 müsait misiniz?",
        },
        {
          from: "agent" as const,
          text: "Evet! 14:00 boş. Adınıza randevu açayım mı?",
        },
        {
          from: "user" as const,
          text: "Evet, Elif — WhatsApp yeterli.",
        },
        {
          from: "agent" as const,
          text: "Randevu alındı. Yarın 12:00’de hatırlatma gider. Başka bir şey?",
        },
      ];

  const stats = isEn
    ? [
        { k: "Auto-solved", v: "68%" },
        { k: "Handoff", v: "12" },
        { k: "Avg reply", v: "9s" },
      ]
    : [
        { k: "Otomatik", v: "%68" },
        { k: "Devredilen", v: "12" },
        { k: "Ort. yanıt", v: "9sn" },
      ];

  return (
    <div className="flex h-full min-h-0 flex-col justify-between gap-4 p-1 sm:gap-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-bonero-green text-white shadow-sm">
            <Bot size={18} strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-semibold text-bonero-dark">AI Agent</p>
            <p className="text-[10px] text-bonero-dark/40">
              WhatsApp · Instagram · Email
            </p>
          </div>
        </div>
        <motion.span
          className="inline-flex items-center gap-1.5 rounded-full border border-bonero-green/25 bg-bonero-green/10 px-2.5 py-1 text-[10px] font-semibold text-bonero-green"
          animate={active ? { opacity: [0.55, 1, 0.55] } : { opacity: 0.7 }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-bonero-green" />
          {isEn ? "Online" : "Çevrimiçi"}
        </motion.span>
      </div>

      <div className="space-y-2 rounded-2xl border border-bonero-dark/8 bg-white p-3 shadow-sm">
        {messages.map((m, i) => (
          <motion.div
            key={`${m.from}-${i}`}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: active ? 1 : 0.45,
              y: active ? 0 : 4,
            }}
            transition={{ duration: 0.3, delay: active ? i * 0.08 : 0 }}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-[12px] leading-snug ${
                m.from === "user"
                  ? "rounded-br-md bg-bonero-dark text-white"
                  : "rounded-bl-md border border-bonero-green/20 bg-bonero-green/8 text-bonero-dark"
              }`}
            >
              {m.from === "agent" && (
                <span className="mb-1 block text-[9px] font-bold tracking-wide text-bonero-green uppercase">
                  Agent
                </span>
              )}
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div
            key={s.k}
            className="rounded-xl border border-bonero-dark/8 bg-white px-2 py-2 text-center shadow-sm"
          >
            <p className="text-[9px] tracking-wider text-bonero-dark/35 uppercase">
              {s.k}
            </p>
            <p className="mt-0.5 text-sm font-bold text-bonero-dark">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-bonero-dark/8 bg-white px-3 py-2.5 shadow-sm">
        <p className="text-[10px] font-semibold tracking-wide text-bonero-dark/35 uppercase">
          {isEn ? "Handoff rule" : "Devretme kuralı"}
        </p>
        <p className="mt-1 text-[12px] font-semibold text-bonero-dark">
          {isEn
            ? "Complaint or refund → human queue"
            : "Şikayet veya iade → insan kuyruğu"}
        </p>
      </div>
    </div>
  );
}
