"use client";

import { motion } from "framer-motion";
import { Camera, Globe, Mail, MessageCircle } from "lucide-react";

type Props = {
  active?: boolean;
  isEn?: boolean;
};

export default function OmnichannelMock({
  active = true,
  isEn = false,
}: Props) {
  const channels = [
    { name: "WhatsApp", color: "#25D366", Icon: MessageCircle },
    { name: "Instagram", color: "#E1306C", Icon: Camera },
    { name: "Email", color: "#0EA5E9", Icon: Mail },
    { name: isEn ? "Web" : "Web", color: "#188347", Icon: Globe },
  ];

  const rows = isEn
    ? [
        {
          c: "#25D366",
          Icon: MessageCircle,
          t: "WhatsApp · Is 14:00 free?",
          sub: "Ayşe Demir",
          tag: "Hot",
        },
        {
          c: "#E1306C",
          Icon: Camera,
          t: "IG · Price for color?",
          sub: "bloom.studio",
          tag: "New",
        },
        {
          c: "#0EA5E9",
          Icon: Mail,
          t: "Mail · Quotation request",
          sub: "info@nova.co",
          tag: "Lead",
        },
        {
          c: "#188347",
          Icon: Globe,
          t: "Web · Contact form",
          sub: "bonero.tr/contact",
          tag: "Form",
        },
      ]
    : [
        {
          c: "#25D366",
          Icon: MessageCircle,
          t: "WhatsApp · 14:00 müsait mi?",
          sub: "Ayşe Demir",
          tag: "Sıcak",
        },
        {
          c: "#E1306C",
          Icon: Camera,
          t: "IG · Renk fiyatı?",
          sub: "bloom.studio",
          tag: "Yeni",
        },
        {
          c: "#0EA5E9",
          Icon: Mail,
          t: "Mail · Teklif talebi",
          sub: "info@nova.co",
          tag: "Lead",
        },
        {
          c: "#188347",
          Icon: Globe,
          t: "Web · İletişim formu",
          sub: "bonero.tr/iletisim",
          tag: "Form",
        },
      ];

  return (
    <div className="flex h-full min-h-0 flex-col justify-between gap-4 p-1 sm:gap-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.14em] text-bonero-dark/35 uppercase">
            Omnichannel
          </p>
          <p className="mt-0.5 text-sm font-semibold text-bonero-dark">
            {isEn ? "Unified inbox" : "Birleşik gelen kutusu"}
          </p>
        </div>
        <motion.span
          className="rounded-full border border-bonero-green/25 bg-bonero-green/10 px-2.5 py-1 text-[10px] font-semibold text-bonero-green"
          animate={active ? { opacity: [0.55, 1, 0.55] } : { opacity: 0.7 }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          {isEn ? "4 unread" : "4 okunmamış"}
        </motion.span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {channels.map((ch, i) => (
          <motion.span
            key={ch.name}
            className="inline-flex items-center gap-1.5 rounded-lg border border-bonero-dark/8 bg-white px-2 py-1 text-[10px] font-semibold text-bonero-dark/70 shadow-sm"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: active ? 1 : 0.5 }}
            transition={{ delay: i * 0.05 }}
          >
            <ch.Icon size={12} style={{ color: ch.color }} />
            {ch.name}
          </motion.span>
        ))}
      </div>

      <div className="space-y-2">
        {rows.map((r, idx) => (
          <motion.div
            key={r.t}
            className="flex items-center gap-3 rounded-xl border border-bonero-dark/8 bg-white px-3 py-2.5 shadow-sm"
            initial={{ opacity: 0.4, x: -6 }}
            animate={{
              opacity: active ? 1 : 0.5,
              x: active ? 0 : -4,
              borderColor:
                active && idx === 0
                  ? "rgba(24,131,71,0.35)"
                  : "rgba(30,41,59,0.08)",
              backgroundColor:
                active && idx === 0
                  ? "rgba(24,131,71,0.05)"
                  : "rgba(255,255,255,1)",
            }}
            transition={{ duration: 0.35, delay: active ? idx * 0.06 : 0 }}
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: `${r.c}18`, color: r.c }}
            >
              <r.Icon size={14} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-bonero-dark">
                {r.t}
              </p>
              <p className="text-[10px] text-bonero-dark/40">{r.sub}</p>
            </div>
            <span className="shrink-0 rounded-md bg-bonero-dark/[0.05] px-1.5 py-0.5 text-[9px] font-semibold text-bonero-dark/50">
              {r.tag}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
