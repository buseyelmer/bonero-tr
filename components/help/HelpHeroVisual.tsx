"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  MessageCircle,
  Mail,
  Camera,
} from "lucide-react";

const tickets = [
  {
    id: "#1842",
    channel: "WhatsApp",
    Icon: MessageCircle,
    color: "#25D366",
    title: "Kanal bağlantısı",
    status: "Çözüldü",
    done: true,
  },
  {
    id: "#1847",
    channel: "Instagram",
    Icon: Camera,
    color: "#E1306C",
    title: "Rol yetkisi",
    status: "Yanıtlandı",
    done: true,
  },
  {
    id: "#1851",
    channel: "E-posta",
    Icon: Mail,
    color: "#0EA5E9",
    title: "Fatura sorusu",
    status: "Açık",
    done: false,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HelpHeroVisual() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 3200);
    return () => clearInterval(id);
  }, []);

  const active = pulse % tickets.length;

  return (
    <div className="relative w-full max-w-[400px]">
      <div className="relative overflow-hidden rounded-3xl border border-bonero-dark/10 bg-[#0f1c17] shadow-[0_24px_48px_-20px_rgba(15,28,23,0.45)]">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-bonero-green" />
            </span>
            <span className="text-xs font-medium tracking-wide text-white/70">
              Destek kuyruğu
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/35">canlı</span>
        </div>

        <div className="grid grid-cols-3 gap-px border-b border-white/8 bg-white/5">
          {[
            { label: "Ort. yanıt", value: "< 1 gün" },
            { label: "Açık", value: "3" },
            { label: "Çözüm", value: "94%" },
          ].map((m) => (
            <div key={m.label} className="bg-[#0f1c17] px-3 py-3 text-center">
              <p className="text-[10px] tracking-wide text-white/35 uppercase">
                {m.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-white">{m.value}</p>
            </div>
          ))}
        </div>

        <ul className="space-y-2 p-4">
          <AnimatePresence mode="popLayout">
            {tickets.map((t, i) => {
              const Icon = t.Icon;
              const isActive = i === active;
              return (
                <motion.li
                  key={t.id}
                  layout
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.55,
                    scale: isActive ? 1 : 0.98,
                    borderColor: isActive
                      ? "rgba(24,131,71,0.45)"
                      : "rgba(255,255,255,0.06)",
                  }}
                  transition={{ duration: 0.35, ease }}
                  className="flex items-center gap-3 rounded-xl border bg-white/[0.03] px-3.5 py-3"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${t.color}22`, color: t.color }}
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-white/30">
                        {t.id}
                      </span>
                      <span className="truncate text-sm text-white/85">
                        {t.title}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-white/35">
                      {t.channel}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                      t.done ? "text-bonero-green" : "text-amber-300/80"
                    }`}
                  >
                    {t.done ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <Clock3 size={12} />
                    )}
                    {t.status}
                  </span>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        <div className="border-t border-white/8 px-5 py-3.5">
          <p className="text-[11px] leading-relaxed text-white/40">
            Ajans operasyonuna özel destek — genelde{" "}
            <span className="text-bonero-green">1 iş günü</span> içinde.
          </p>
        </div>
      </div>
    </div>
  );
}
