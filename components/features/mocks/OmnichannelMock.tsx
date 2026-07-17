"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Globe,
  Mail,
  MessageCircle,
  Paperclip,
  Send,
} from "lucide-react";

type Props = {
  active?: boolean;
  isEn?: boolean;
  variant?: "compact" | "full";
};

export default function OmnichannelMock({
  active = true,
  isEn = false,
  variant = "compact",
}: Props) {
  const channels = [
    { name: "WhatsApp", color: "#25D366", Icon: MessageCircle, unread: 2 },
    { name: "Instagram", color: "#E1306C", Icon: Camera, unread: 1 },
    { name: "Email", color: "#0EA5E9", Icon: Mail, unread: 1 },
    { name: isEn ? "Web" : "Web", color: "#188347", Icon: Globe, unread: 0 },
  ];

  const rows = isEn
    ? [
        {
          c: "#25D366",
          Icon: MessageCircle,
          t: "Is 14:00 free?",
          sub: "Ayşe Demir",
          tag: "Hot",
          time: "2m",
          active: true,
        },
        {
          c: "#E1306C",
          Icon: Camera,
          t: "Price for color?",
          sub: "@nova.beauty",
          tag: "New",
          time: "8m",
          active: false,
        },
        {
          c: "#0EA5E9",
          Icon: Mail,
          t: "Quotation request",
          sub: "teklif@kliniknova.com",
          tag: "Lead",
          time: "1h",
          active: false,
        },
        {
          c: "#188347",
          Icon: Globe,
          t: "Contact form",
          sub: "site form · Zeynep A.",
          tag: "Form",
          time: "3h",
          active: false,
        },
      ]
    : [
        {
          c: "#25D366",
          Icon: MessageCircle,
          t: "14:00 müsait mi?",
          sub: "Ayşe Demir",
          tag: "Sıcak",
          time: "2dk",
          active: true,
        },
        {
          c: "#E1306C",
          Icon: Camera,
          t: "Renk fiyatı?",
          sub: "@nova.beauty",
          tag: "Yeni",
          time: "8dk",
          active: false,
        },
        {
          c: "#0EA5E9",
          Icon: Mail,
          t: "Teklif talebi",
          sub: "teklif@kliniknova.com",
          tag: "Lead",
          time: "1sa",
          active: false,
        },
        {
          c: "#188347",
          Icon: Globe,
          t: "İletişim formu",
          sub: "site formu · Zeynep A.",
          tag: "Form",
          time: "3sa",
          active: false,
        },
      ];

  const thread = isEn
    ? [
        { from: "customer", text: "Hi, is 14:00 available tomorrow?" },
        { from: "customer", text: "I'd like a color treatment." },
        { from: "agent", text: "Yes, 14:00 is open. Shall I book it for you?" },
      ]
    : [
        { from: "customer", text: "Merhaba, yarın 14:00 müsait mi?" },
        { from: "customer", text: "Renk işlemi yaptırmak istiyorum." },
        { from: "agent", text: "Evet, 14:00 boş. Randevuyu oluşturayım mı?" },
      ];

  if (variant === "full") {
    return (
      <div className="flex h-full min-h-[340px] flex-col overflow-hidden rounded-xl border border-bonero-dark/8 bg-[#f8faf9] sm:min-h-[380px]">
        <div className="flex items-center justify-between border-b border-bonero-dark/8 bg-white px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-bonero-dark">
              {isEn ? "Inbox" : "Gelen kutusu"}
            </p>
            <p className="text-[10px] text-bonero-dark/40">
              {isEn ? "Nova Beauty · today" : "Nova Beauty · bugün"}
            </p>
          </div>
          <span className="rounded-md bg-bonero-dark/[0.06] px-2 py-1 text-[10px] font-medium text-bonero-dark/55">
            {isEn ? "4 unread" : "4 okunmamış"}
          </span>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Conversation list */}
          <div className="w-[42%] shrink-0 border-r border-bonero-dark/8 bg-white">
            <div className="flex flex-wrap gap-1 border-b border-bonero-dark/6 px-2 py-2">
              {channels.map((ch, i) => (
                <motion.span
                  key={ch.name}
                  className="inline-flex items-center gap-1 rounded-md border border-bonero-dark/8 bg-[#f8faf9] px-1.5 py-0.5 text-[9px] font-semibold text-bonero-dark/65"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: active ? 1 : 0.5 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ch.Icon size={10} style={{ color: ch.color }} />
                  {ch.unread > 0 && (
                    <span
                      className="rounded-full px-1 text-[8px] font-bold text-white"
                      style={{ backgroundColor: ch.color }}
                    >
                      {ch.unread}
                    </span>
                  )}
                </motion.span>
              ))}
            </div>
            <div className="space-y-0.5 p-1.5">
              {rows.map((r, idx) => (
                <motion.div
                  key={r.t}
                  className="flex items-center gap-2 rounded-lg px-2 py-2"
                  initial={{ opacity: 0.4, x: -4 }}
                  animate={{
                    opacity: active ? 1 : 0.5,
                    x: active ? 0 : -2,
                    backgroundColor:
                      active && r.active
                        ? "rgba(24,131,71,0.08)"
                        : "rgba(255,255,255,0)",
                    borderColor:
                      active && r.active
                        ? "rgba(24,131,71,0.2)"
                        : "rgba(255,255,255,0)",
                  }}
                  transition={{ duration: 0.35, delay: active ? idx * 0.05 : 0 }}
                  style={{
                    border: "1px solid",
                  }}
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                    style={{ background: `${r.c}18`, color: r.c }}
                  >
                    <r.Icon size={12} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-semibold text-bonero-dark">
                      {r.sub}
                    </p>
                    <p className="truncate text-[10px] text-bonero-dark/45">
                      {r.t}
                    </p>
                  </div>
                  <span className="shrink-0 text-[9px] text-bonero-dark/35">
                    {r.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Active thread */}
          <div className="flex min-w-0 flex-1 flex-col bg-white">
            <div className="flex items-center justify-between border-b border-bonero-dark/6 px-3 py-2">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "#25D36618", color: "#25D366" }}
                >
                  <MessageCircle size={12} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold text-bonero-dark">
                    Ayşe Demir
                  </p>
                  <p className="text-[9px] text-bonero-dark/40">
                    WhatsApp · {isEn ? "Assigned to Elif" : "Elif'e atandı"}
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-md bg-orange-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-orange-600">
                {isEn ? "Hot" : "Sıcak"}
              </span>
            </div>

            <div className="flex-1 space-y-2 overflow-hidden p-3">
              {thread.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${msg.from === "agent" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: active ? 1 : 0.6, y: 0 }}
                  transition={{ delay: active ? 0.2 + i * 0.1 : 0 }}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-2.5 py-1.5 text-[10px] leading-relaxed ${
                      msg.from === "agent"
                        ? "bg-bonero-green text-white"
                        : "bg-[#f1f5f3] text-bonero-dark/75"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-bonero-dark/6 p-2">
              <div className="flex items-center gap-2 rounded-lg border border-bonero-dark/8 bg-[#f8faf9] px-2 py-1.5">
                <Paperclip size={12} className="shrink-0 text-bonero-dark/30" />
                <span className="flex-1 text-[10px] text-bonero-dark/35">
                  {isEn ? "Reply on WhatsApp…" : "WhatsApp'tan yanıtla…"}
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-bonero-green text-white">
                  <Send size={10} />
                </span>
              </div>
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
          <p className="text-sm font-semibold text-bonero-dark">
            {isEn ? "Inbox" : "Gelen kutusu"}
          </p>
          <p className="text-[10px] text-bonero-dark/40">
            {isEn ? "All channels" : "Tüm kanallar"}
          </p>
        </div>
        <span className="rounded-md bg-bonero-dark/[0.06] px-2 py-1 text-[10px] font-medium text-bonero-dark/55">
          {isEn ? "4 unread" : "4 okunmamış"}
        </span>
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
            {ch.unread > 0 && (
              <span
                className="rounded-full px-1 text-[8px] font-bold text-white"
                style={{ backgroundColor: ch.color }}
              >
                {ch.unread}
              </span>
            )}
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
                {r.sub}
              </p>
              <p className="truncate text-[11px] text-bonero-dark/45">{r.t}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-0.5">
              <span className="rounded-md bg-bonero-dark/[0.05] px-1.5 py-0.5 text-[9px] font-semibold text-bonero-dark/50">
                {r.tag}
              </span>
              <span className="text-[9px] text-bonero-dark/30">{r.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
