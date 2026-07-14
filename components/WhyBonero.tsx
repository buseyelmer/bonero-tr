"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Camera,
  Check,
  Link2,
  Mail,
  MessageCircle,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

type Reason = {
  n: string;
  icon: LucideIcon;
  title: string;
  description: string;
  proof: string[];
};

const reasons: Reason[] = [
  {
    n: "01",
    icon: Building2,
    title: "İşletme odaklı omnichannel",
    description:
      "Çoklu müşteri, çoklu kanal ve ekip rolleri için tasarlandı — dağınık gelen kutularını tek operasyona indirger.",
    proof: ["Çoklu müşteri", "Rol bazlı erişim", "Tek operasyon"],
  },
  {
    n: "02",
    icon: Zap,
    title: "AI destekli birleştirme",
    description:
      "Kanallardaki talepleri AI tek akışta toplar; içerik ve reklam taslaklarını üretir — ekibiniz stratejiye ve onaya odaklanır.",
    proof: ["Akıllı sıralama", "AI reklam", "Yanıt önerisi"],
  },
  {
    n: "03",
    icon: Link2,
    title: "Tam kanal entegrasyonu",
    description:
      "Instagram, WhatsApp, e-posta ve web trafiğini tek panelde birleştirerek operasyonel dağınıklığı sonlandırın.",
    proof: ["IG + WA + Mail", "Anlık senkron", "Tek panel"],
  },
];

const CYCLE = 4500;
const ease = [0.22, 1, 0.36, 1] as const;

function SceneOps({ on }: { on: boolean }) {
  return (
    <div className="flex h-full items-center justify-center gap-3">
      {["A", "B", "C"].map((c, i) => (
        <motion.div
          key={c}
          className="flex h-16 w-14 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: on ? 1 : 0.4, y: 0 }}
          transition={{ delay: 0.1 + i * 0.12, duration: 0.4, ease }}
        >
          <Users size={16} className="text-white/50" />
          <span className="mt-1 text-[10px] font-bold text-white/35">
            Müşteri {c}
          </span>
        </motion.div>
      ))}
      <motion.div
        className="ml-2 flex h-16 items-center gap-2 rounded-2xl bg-bonero-green px-4 text-white shadow-lg shadow-bonero-green/30"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.45, type: "spring", stiffness: 240, damping: 20 }}
      >
        <Building2 size={18} />
        <span className="text-xs font-semibold">Tek operasyon paneli</span>
      </motion.div>
    </div>
  );
}

function SceneAI({ on }: { on: boolean }) {
  const streams = [
    { Icon: Camera, c: "#E1306C" },
    { Icon: MessageCircle, c: "#25D366" },
    { Icon: Mail, c: "#0EA5E9" },
  ];
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="flex gap-3">
        {streams.map(({ Icon, c }, i) => (
          <motion.div
            key={c}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <Icon size={18} style={{ color: c }} strokeWidth={1.75} />
          </motion.div>
        ))}
      </div>
      <motion.div
        className="my-3 h-8 w-px bg-gradient-to-b from-white/20 to-bonero-green"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      />
      <motion.div
        className="flex items-center gap-2 rounded-2xl bg-bonero-green px-4 py-2.5 text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: on ? 1 : 0.7, scale: 1 }}
        transition={{ delay: 0.55, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Sparkles size={16} />
        <span className="text-xs font-semibold">AI tek akış</span>
      </motion.div>
    </div>
  );
}

function SceneChannels({ on }: { on: boolean }) {
  const ch = [
    { Icon: Camera, label: "IG" },
    { Icon: MessageCircle, label: "WA" },
    { Icon: Mail, label: "Mail" },
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        {ch.map(({ Icon, label }, i) => (
          <motion.div
            key={label}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
          >
            <Icon size={13} className="text-white/60" />
            <span className="text-[10px] font-bold text-white/50">{label}</span>
            <Check size={11} className="text-bonero-green" strokeWidth={2.5} />
          </motion.div>
        ))}
      </div>
      <motion.p
        className="text-xs font-semibold tracking-wide text-bonero-green uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: on ? 1 : 0.5 }}
        transition={{ delay: 0.55 }}
      >
        Hepsi bağlı · tek panel
      </motion.p>
    </div>
  );
}

const scenes = [SceneOps, SceneAI, SceneChannels];

export default function WhyBonero() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const current = reasons[active];
  const Icon = current.icon;
  const Scene = scenes[active];

  useEffect(() => {
    const el = document.getElementById("neden-bonero");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => {
      setActive((p) => (p + 1) % reasons.length);
    }, CYCLE);
    return () => clearTimeout(t);
  }, [active, inView]);

  return (
    <section
      id="neden-bonero"
      className="relative overflow-x-clip py-16 sm:py-24"
      style={{
        background:
          "linear-gradient(155deg, #0b1210 0%, #101a16 45%, #0c1418 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 55% 50% at 50% 40%, black, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-xl">
            <p className="text-sm font-medium tracking-wide text-white/40 uppercase">
              Neden Bonero?
            </p>
            <h2 className="font-heading mt-3 text-3xl !font-extrabold tracking-wide text-white sm:text-4xl lg:text-[2.75rem]">
              Kart değil.
              <span className="mt-1 block text-bonero-green">Operasyon.</span>
            </h2>
            <p className="mt-4 text-base text-white/45">
              Operasyon gerçeklerine göre kuruldu — vitrin özelliği değil, günlük iş
              akışı.
            </p>
          </Reveal>

          <div className="flex flex-wrap gap-2">
            {reasons.map((r, i) => {
              const on = active === i;
              const RIcon = r.icon;
              return (
                <button
                  key={r.n}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    on
                      ? "bg-bonero-green text-white shadow-lg shadow-bonero-green/25"
                      : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
                  }`}
                >
                  <RIcon size={14} strokeWidth={1.75} />
                  {r.n}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main board */}
        <div className="mt-10 grid min-w-0 overflow-hidden rounded-[1.5rem] border border-white/10 lg:grid-cols-2 lg:items-stretch">
          {/* Copy */}
          <div className="flex min-w-0 flex-col justify-between gap-8 border-b border-white/8 p-6 sm:p-8 lg:border-r lg:border-b-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bonero-green text-white">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="font-heading text-4xl !font-extrabold text-white/10 tabular-nums">
                    {current.n}
                  </span>
                </div>
                <h3 className="font-heading mt-5 text-2xl !font-extrabold tracking-wide text-white sm:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/50">
                  {current.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {current.proof.map((p, i) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60"
                    >
                      {p}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <a
              href="#ozellikler"
              className="inline-flex w-fit text-sm font-medium text-bonero-green transition-colors hover:text-white"
            >
              Özellikleri incele →
            </a>
          </div>

          {/* Scene */}
          <div className="relative min-h-[240px] bg-white/[0.03] sm:min-h-[280px]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(24,131,71,0.18), transparent 70%)",
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Scene on />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          key={active}
          className="mt-4 h-0.5 origin-left rounded-full bg-bonero-green"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: CYCLE / 1000, ease: "linear" }}
        />
      </div>
    </section>
  );
}
