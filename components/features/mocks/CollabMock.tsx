"use client";

import { useEffect, useState } from "react";
import { Check, UserPlus, Users } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  active?: boolean;
  isEn?: boolean;
};

export default function CollabMock({ active = true, isEn = false }: Props) {
  const [step, setStep] = useState(1);
  const roles = isEn
    ? [
        { label: "Owner", task: "Brief uploaded", Icon: Users },
        { label: "Editor", task: "Creative ready", Icon: UserPlus },
        { label: "Approver", task: "Sign-off pending", Icon: Check },
      ]
    : [
        { label: "Yönetici", task: "Brief yüklendi", Icon: Users },
        { label: "Editör", task: "Kreatif hazır", Icon: UserPlus },
        { label: "Onaycı", task: "Onay bekleniyor", Icon: Check },
      ];

  useEffect(() => {
    if (!active) return;
    const t = window.setInterval(
      () => setStep((p) => (p >= 2 ? 0 : p + 1)),
      2000,
    );
    return () => clearInterval(t);
  }, [active]);

  return (
    <div className="flex h-full min-h-0 flex-col justify-between gap-4 p-1 sm:gap-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.14em] text-bonero-dark/35 uppercase">
            {isEn ? "Approval rail" : "Onay hattı"}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-bonero-dark">
            {isEn ? "This week’s tasks" : "Bu haftanın görevleri"}
          </p>
        </div>
        <span className="font-mono text-[10px] font-semibold text-bonero-green">
          {step + 1}/3
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-bonero-dark/8">
        <motion.div
          className="h-full rounded-full bg-bonero-green"
          animate={{ width: active ? `${((step + 1) / 3) * 100}%` : "33%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="space-y-2">
        {roles.map((r, i) => (
          <motion.div
            key={r.label}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
              active && i === step
                ? "border-bonero-green/30 bg-bonero-green/5"
                : "border-bonero-dark/8 bg-white"
            }`}
            animate={{ opacity: active ? (i <= step ? 1 : 0.45) : 0.5 }}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                i < step && active
                  ? "bg-bonero-green text-white"
                  : i === step && active
                    ? "border border-bonero-green text-bonero-green"
                    : "bg-bonero-dark/5 text-bonero-dark/40"
              }`}
            >
              {i < step && active ? (
                <Check size={13} strokeWidth={2.5} />
              ) : (
                <r.Icon size={14} />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-bonero-dark">{r.label}</p>
              <p className="text-[10px] text-bonero-dark/40">{r.task}</p>
            </div>
            {active && i === step && (
              <span className="text-[9px] font-bold tracking-wider text-bonero-green uppercase">
                {isEn ? "Now" : "Şimdi"}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
