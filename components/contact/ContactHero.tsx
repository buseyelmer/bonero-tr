"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, Mail, Phone } from "lucide-react";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;

const status = [
  { label: "Çalışma saatleri", value: "Pzt–Cuma · 09:00–18:00" },
  { label: "Yanıt süresi", value: "1 iş günü içinde" },
  { label: "Konum", value: "İstanbul, Türkiye" },
];

const channels = [
  {
    icon: Mail,
    label: "E-posta",
    value: "hello@bonero.tr",
    href: "mailto:hello@bonero.tr",
    action: "Yaz →",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+90 (212) 000 00 00",
    href: "tel:+902120000000",
    action: "Ara →",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "İstanbul, Türkiye",
    href: undefined,
    action: undefined,
  },
];

export default function ContactHero() {
  return (
    <section className="relative overflow-x-clip bg-background pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pb-20">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 15%, rgba(24,131,71,0.1), transparent 55%), radial-gradient(ellipse 40% 35% at 10% 90%, rgba(30,41,59,0.04), transparent 50%)",
        }}
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <motion.p
              className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              İletişim
            </motion.p>

            <motion.p
              className="font-heading mt-3 text-[clamp(2.2rem,4.5vw,3.1rem)] font-extrabold leading-none tracking-tight text-bonero-dark"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.04, ease }}
            >
              Bonero
            </motion.p>

            <motion.h1
              className="font-heading mt-4 text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] tracking-wide text-bonero-dark"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease }}
            >
              Haydi{" "}
              <span className="text-bonero-green">konuşalım.</span>
            </motion.h1>

            <motion.p
              className="mt-5 max-w-lg text-base leading-relaxed text-bonero-dark/55 sm:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18, ease }}
            >
              Demo, destek veya işbirliği — yazmanız yeterli. Hemen kullanmaya
              başlamak için{" "}
              <a
                href={PANEL_REGISTER_URL}
                className="font-semibold text-bonero-green underline-offset-2 hover:underline"
              >
                hesap açın
              </a>
              .
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28, ease }}
            >
              <a
                href="#form"
                className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-bonero-green/20 transition-colors hover:bg-bonero-green/90"
              >
                Formu doldur
                <ArrowUpRight size={15} />
              </a>
              <a
                href="mailto:hello@bonero.tr"
                className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white/80 px-5 py-3 text-sm font-medium text-bonero-dark/70 transition-colors hover:border-bonero-dark/20 hover:text-bonero-dark"
              >
                E-posta gönder
              </a>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          >
            <div className="overflow-hidden rounded-[1.25rem] border border-bonero-dark/8 bg-white shadow-[0_20px_50px_rgba(30,41,59,0.08)]">
              <div className="flex items-center gap-2 border-b border-bonero-dark/6 bg-[#f6f8f7] px-4 py-3">
                <Clock size={14} className="text-bonero-green" />
                <p className="font-mono text-[11px] font-semibold tracking-wide text-bonero-dark/50">
                  bonero — status
                </p>
                <span className="ml-auto flex items-center gap-1.5 text-[10px] font-bold text-bonero-green uppercase">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green opacity-50" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-bonero-green" />
                  </span>
                  Müsait
                </span>
              </div>
              <ul className="divide-y divide-bonero-dark/6">
                {status.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-baseline justify-between gap-4 px-4 py-3.5 sm:px-5"
                  >
                    <span className="text-[11px] font-semibold tracking-wide text-bonero-dark/40 uppercase">
                      {s.label}
                    </span>
                    <span className="text-right text-sm font-semibold text-bonero-dark">
                      {s.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-14 grid gap-3 sm:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease }}
        >
          {channels.map((ch) => {
            const Icon = ch.icon;
            const inner = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-semibold tracking-[0.14em] text-bonero-dark/40 uppercase">
                    {ch.label}
                  </span>
                  <span className="mt-0.5 block truncate text-sm font-semibold text-bonero-dark sm:text-base">
                    {ch.value}
                  </span>
                </span>
                {ch.action && (
                  <span className="shrink-0 text-xs font-semibold text-bonero-green">
                    {ch.action}
                  </span>
                )}
              </>
            );

            const className =
              "group flex items-center gap-3 rounded-2xl border border-bonero-dark/8 bg-white/90 px-4 py-4 transition-colors hover:border-bonero-green/30";

            return ch.href ? (
              <a key={ch.label} href={ch.href} className={className}>
                {inner}
              </a>
            ) : (
              <div key={ch.label} className={className}>
                {inner}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
