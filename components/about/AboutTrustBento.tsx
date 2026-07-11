"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Lock,
  Radio,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";

type Pillar = {
  icon: LucideIcon;
  title: string;
  line: string;
  detail: string;
  proof: string[];
};

const pillars: Pillar[] = [
  {
    icon: Radio,
    title: "Her an yanınızda",
    line: "Operasyonunuz hiçbir zaman durmasın.",
    detail:
      "Ajans temposuna ayak uyduran canlı destek — kesinti yok, bekleme yok. Operasyonunuz güvende kalsın.",
    proof: ["Canlı destek hattı", "Operasyon SLA bilinci", "Hızlı eskalasyon"],
  },
  {
    icon: Lock,
    title: "Kurumsal Veri Koruma",
    line: "Uçtan uca şifreleme · KVKK uyumlu altyapı.",
    detail:
      "Müşteri verileriniz izole çalışma alanlarında; erişim rol bazlı. Huzur, pazarlama cümlesi değil.",
    proof: ["Uçtan uca şifreleme", "KVKK uyumu", "Rol bazlı erişim"],
  },
  {
    icon: Shield,
    title: "Sorunsuz Geçiş",
    line: "Tek tıkla veri aktarımı.",
    detail:
      "Mevcut hesaplarınızı yük olmadan Bonero’ya taşıyın. Geçiş günü stres değil, başlangıç olsun.",
    proof: ["Tek tık taşıma", "Sıfır kesinti hedefi", "Rehberli onboarding"],
  },
];

const signals = [
  { label: "Şifreleme", value: "Aktif" },
  { label: "KVKK", value: "Uyumlu" },
  { label: "Destek", value: "Çevrimiçi" },
  { label: "Uptime", value: "99.9%" },
];

const layers = [
  { id: "edge", label: "Kenar", desc: "SSL / TLS · güvenli giriş kapısı" },
  { id: "data", label: "Veri", desc: "Şifreli depolama · ajans izolasyonu" },
  { id: "access", label: "Erişim", desc: "Rol · yetki · denetim izi" },
];

const certs = ["AES-256", "TLS 1.3", "KVKK", "RBAC"];

export default function AboutTrustBento() {
  const [active, setActive] = useState(0);
  const [layer, setLayer] = useState(0);
  const [auto, setAuto] = useState(true);
  const ActiveIcon = pillars[active].icon;

  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % pillars.length);
      setLayer((p) => (p + 1) % layers.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [auto]);

  return (
    <section
      id="guven-hakkimizda"
      aria-label="SaaS Güven Merkezi"
      className="relative overflow-hidden border-t border-bonero-dark/6 py-20 sm:py-28"
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(true)}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 0% 0%, rgba(24,131,71,0.07), transparent 50%), radial-gradient(ellipse 40% 35% at 100% 100%, rgba(30,41,59,0.04), transparent 45%), #f3f5f4",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              SaaS Güven Merkezi
            </p>
            <h2 className="font-heading mt-4 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
              Huzur satıyoruz.
              <span className="mt-2 block text-bonero-dark/35">
                Teknik detaylar arka planda kalsın.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-bonero-dark/55">
              Operasyon kesintisiz, veri korunaklı, geçiş sorunsuz — müşteriniz
              güvende hissetsin, siz hissetmeyin.
            </p>
          </Reveal>
        </div>

        {/* Status + certs */}
        <Reveal delay={0.12} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white shadow-sm">
            <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 sm:gap-6 sm:px-6">
              <span className="flex items-center gap-2 text-xs font-semibold tracking-wide text-bonero-dark/50 uppercase">
                <motion.span
                  className="relative flex h-2.5 w-2.5"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-bonero-green/40" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-bonero-green" />
                </motion.span>
                Sistem durumu
              </span>
              <div className="hidden h-4 w-px bg-bonero-dark/10 sm:block" />
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {signals.map((s) => (
                  <div key={s.label} className="flex items-center gap-2 text-sm">
                    <span className="text-bonero-dark/40">{s.label}</span>
                    <span className="font-semibold text-bonero-green">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-bonero-dark/6 bg-[#f8faf9] px-4 py-3 sm:px-6">
              <span className="mr-1 self-center text-[10px] font-semibold tracking-[0.14em] text-bonero-dark/35 uppercase">
                Sertifikalar
              </span>
              {certs.map((c) => (
                <span
                  key={c}
                  className="rounded-md border border-bonero-dark/8 bg-white px-2.5 py-1 font-mono text-[11px] font-semibold text-bonero-dark/55"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Command center */}
        <div className="mt-6 grid gap-5 lg:mt-8 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-5">
            <div className="overflow-hidden rounded-[1.75rem] border border-bonero-dark/8 bg-white shadow-[0_16px_40px_rgba(30,41,59,0.05)]">
              {pillars.map((p, index) => {
                const Icon = p.icon;
                const isActive = active === index;
                return (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    className={`relative flex w-full gap-4 border-b border-bonero-dark/6 px-5 py-5 text-left transition-colors last:border-b-0 sm:px-6 sm:py-6 ${
                      isActive ? "bg-[#f7faf8]" : "hover:bg-[#fafbfa]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="trust-active"
                        className="absolute inset-y-0 left-0 w-1 bg-bonero-green"
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      />
                    )}
                    {isActive && auto && (
                      <motion.span
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-bonero-green/40"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 5, ease: "linear" }}
                      />
                    )}
                    <span
                      className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                        isActive
                          ? "border-bonero-green/30 bg-bonero-green/5 text-bonero-green"
                          : "border-bonero-dark/8 text-bonero-dark/50"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.3} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-heading text-base !font-extrabold text-bonero-dark sm:text-lg">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-bonero-green sm:text-sm">
                        {p.line}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div
              className="relative flex h-full min-h-[480px] flex-col overflow-hidden rounded-[1.75rem] p-7 sm:p-9"
              style={{
                background:
                  "linear-gradient(155deg, #123226 0%, #1e293b 48%, #0f172a 100%)",
              }}
            >
              {/* Radar / shield visual */}
              <div
                className="pointer-events-none absolute top-6 right-6 h-40 w-40 opacity-50 sm:h-48 sm:w-48"
                aria-hidden="true"
              >
                <motion.div
                  className="absolute inset-0 rounded-full border border-bonero-green/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, ease: "linear", repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border border-dashed border-white/10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-10 rounded-full border border-bonero-green/30"
                  animate={{ scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <span className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bonero-green/20 text-bonero-green">
                  <ActiveIcon size={22} strokeWidth={1.3} />
                </span>
                <motion.span
                  className="absolute top-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-bonero-green"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, ease: "linear", repeat: Infinity }}
                  style={{ transformOrigin: "0 78px" }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28 }}
                  className="relative flex flex-1 flex-col"
                >
                  <div className="max-w-md pr-28 sm:pr-36">
                    <p className="text-xs font-semibold tracking-[0.18em] text-bonero-green uppercase">
                      Katman {String(active + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-heading mt-2 text-2xl !font-extrabold text-white sm:text-3xl">
                      {pillars[active].title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      {pillars[active].detail}
                    </p>
                  </div>

                  <div className="mt-10">
                    <p className="mb-3 text-[10px] font-semibold tracking-[0.16em] text-white/35 uppercase">
                      Koruma katmanları
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {layers.map((l, i) => (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => setLayer(i)}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                            layer === i
                              ? "bg-bonero-green text-white"
                              : "bg-white/8 text-white/55 hover:bg-white/12"
                          }`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={layer}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 text-sm text-white/60"
                      >
                        {layers[layer].desc}
                      </motion.p>
                    </AnimatePresence>

                    <div className="mt-5 space-y-2.5">
                      {layers.map((l, i) => (
                        <div key={l.id} className="flex items-center gap-3">
                          <span className="w-12 text-[10px] font-semibold tracking-wide text-white/30 uppercase">
                            {l.label}
                          </span>
                          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                              className="h-full rounded-full bg-bonero-green"
                              animate={{
                                width: i <= layer ? "100%" : "18%",
                                opacity: i <= layer ? 1 : 0.35,
                              }}
                              transition={{ duration: 0.45 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-8">
                    <ul className="mb-7 grid gap-2.5 sm:grid-cols-3">
                      {pillars[active].proof.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2.5 text-xs text-white/70 sm:text-sm"
                        >
                          <Check size={14} className="shrink-0 text-bonero-green" strokeWidth={2} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/iletisim"
                      className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-bonero-green/90"
                    >
                      Güven merkezi turu
                      <ArrowRight size={16} strokeWidth={2} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
