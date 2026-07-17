"use client";

import { useEffect, useState } from "react";
import { Check, FileText, Rocket, UserCheck, UserPlus, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  active?: boolean;
  isEn?: boolean;
  variant?: "compact" | "pipeline";
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function CollabMock({
  active = true,
  isEn = false,
  variant = "compact",
}: Props) {
  const [step, setStep] = useState(0);

  const stages = isEn
    ? [
        { label: "Brief", sub: "Account uploads", Icon: FileText },
        { label: "Edit", sub: "Creative ready", Icon: UserPlus },
        { label: "Approve", sub: "Client sign-off", Icon: UserCheck },
        { label: "Live", sub: "Published", Icon: Rocket },
      ]
    : [
        { label: "Brief", sub: "Hesap yükler", Icon: FileText },
        { label: "Kreatif", sub: "Tasarım hazır", Icon: UserPlus },
        { label: "Onay", sub: "Müşteri onayı", Icon: UserCheck },
        { label: "Yayın", sub: "Canlıya alındı", Icon: Rocket },
      ];

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
      () => setStep((p) => (p + 1) % stages.length),
      2400,
    );
    return () => clearInterval(t);
  }, [active, stages.length]);

  if (variant === "pipeline") {
    return (
      <div className="w-full p-1 sm:p-2">
        <div className="mb-4 flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-white/70">
            {isEn ? "Approval rail · this week" : "Onay hattı · bu hafta"}
          </p>
          <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold text-white/80">
            {step + 1}/{stages.length}
          </span>
        </div>

        {/* Track */}
        <div className="relative">
          <div className="absolute top-5 right-4 left-4 h-0.5 bg-white/15 sm:top-6" />
          <motion.div
            className="absolute top-5 h-0.5 bg-bonero-green sm:top-6"
            animate={{
              left: `${8 + step * 22}%`,
              width: `${22 * step}%`,
            }}
            transition={{ duration: 0.5, ease }}
            style={{ maxWidth: "84%" }}
          />

          <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
            {stages.map((s, i) => {
              const done = i < step;
              const current = i === step;
              const Icon = s.Icon;
              return (
                <div key={s.label} className="flex flex-col items-center text-center">
                  <motion.span
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border sm:h-11 sm:w-11 ${
                      done
                        ? "border-bonero-green bg-bonero-green text-white"
                        : current
                          ? "border-white bg-white text-bonero-dark shadow-lg shadow-black/20"
                          : "border-white/20 bg-white/5 text-white/40"
                    }`}
                    animate={current && active ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                    transition={{ duration: 1.2, repeat: current ? Infinity : 0 }}
                  >
                    {done ? <Check size={16} strokeWidth={2.5} /> : <Icon size={15} />}
                  </motion.span>
                  <p
                    className={`mt-2 text-[10px] font-bold sm:text-[11px] ${
                      current ? "text-white" : done ? "text-bonero-green" : "text-white/40"
                    }`}
                  >
                    {s.label}
                  </p>
                  <p className="mt-0.5 hidden text-[9px] text-white/45 sm:block">{s.sub}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease }}
            className="mt-5 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/50">
              {isEn ? "Now" : "Şimdi"}
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{stages[step].label}</p>
            <p className="text-xs text-white/60">{stages[step].sub}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  const listStep = step % 3;

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
          {listStep + 1}/3
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-bonero-dark/8">
        <motion.div
          className="h-full rounded-full bg-bonero-green"
          animate={{ width: active ? `${((listStep + 1) / 3) * 100}%` : "33%" }}
          transition={{ duration: 0.4, ease }}
        />
      </div>

      <div className="space-y-2">
        {roles.map((r, i) => (
          <motion.div
            key={r.label}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
              active && i === listStep
                ? "border-bonero-green/30 bg-bonero-green/5"
                : "border-bonero-dark/8 bg-white"
            }`}
            animate={{ opacity: active ? (i <= listStep ? 1 : 0.45) : 0.5 }}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                i < listStep && active
                  ? "bg-bonero-green text-white"
                  : i === listStep && active
                    ? "border border-bonero-green text-bonero-green"
                    : "bg-bonero-dark/5 text-bonero-dark/40"
              }`}
            >
              {i < listStep && active ? (
                <Check size={13} strokeWidth={2.5} />
              ) : (
                <r.Icon size={14} />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-bonero-dark">{r.label}</p>
              <p className="text-[10px] text-bonero-dark/40">{r.task}</p>
            </div>
            {active && i === listStep && (
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
