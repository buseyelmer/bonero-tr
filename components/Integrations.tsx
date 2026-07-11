"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Link2,
  Mail,
  MessageCircle,
  Share2,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

type Node = {
  name: string;
  short: string;
  Icon: LucideIcon;
  color: string;
  angle: number;
};

const nodes: Node[] = [
  { name: "Instagram", short: "IG", Icon: Camera, color: "#E1306C", angle: -90 },
  { name: "WhatsApp", short: "WA", Icon: MessageCircle, color: "#25D366", angle: -30 },
  { name: "Gmail", short: "GM", Icon: Mail, color: "#EA4335", angle: 30 },
  { name: "Outlook", short: "OL", Icon: Mail, color: "#0078D4", angle: 90 },
  { name: "LinkedIn", short: "LI", Icon: Share2, color: "#0A66C2", angle: 150 },
  { name: "Slack", short: "SL", Icon: MessageCircle, color: "#611F69", angle: 210 },
  { name: "TikTok", short: "TT", Icon: Camera, color: "#111111", angle: 270 },
  { name: "Meta", short: "MB", Icon: Share2, color: "#0668E1", angle: 330 },
];

const copy = {
  tr: {
    eyebrow: "Entegrasyonlar",
    title: "Kanallar Bonero’ya",
    titleAccent: "kenetlenir.",
    subtitle:
      "Kullandığınız araçlar yerinde kalır — mesajlar tek panele akar.",
    hub: "Bonero",
    connected: "bağlı",
  },
  en: {
    eyebrow: "Integrations",
    title: "Your channels",
    titleAccent: "lock into Bonero.",
    subtitle:
      "Keep the tools you use — messages stream into one panel.",
    hub: "Bonero",
    connected: "connected",
  },
};

const HOLD = 2800;
const ease = [0.22, 1, 0.36, 1] as const;

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

export default function Integrations() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const current = nodes[active];

  useEffect(() => {
    const el = document.getElementById("entegrasyonlar");
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
      setActive((p) => (p + 1) % nodes.length);
    }, HOLD);
    return () => clearTimeout(t);
  }, [active, inView]);

  return (
    <section
      id="entegrasyonlar"
      className="relative overflow-x-clip border-y border-bonero-dark/6 bg-background py-16 sm:py-24"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              {t.eyebrow}
            </p>
            <h2 className="font-heading mt-3 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.6rem]">
              {t.title}
              <span className="mt-1 block text-bonero-green">{t.titleAccent}</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-bonero-dark/55">
              {t.subtitle}
            </p>

            <div className="mt-8 grid grid-cols-4 gap-2.5 sm:gap-3">
              {nodes.map((n, i) => {
                const on = active === i;
                const Icon = n.Icon;
                return (
                  <motion.button
                    key={n.name}
                    type="button"
                    onClick={() => setActive(i)}
                    className="flex flex-col items-center gap-1.5 rounded-2xl border bg-white px-2 py-3 shadow-sm transition-colors sm:py-3.5"
                    style={{
                      borderColor: on ? n.color : "rgba(30,41,59,0.1)",
                    }}
                    animate={{
                      scale: on ? 1.04 : 1,
                      boxShadow: on
                        ? `0 10px 24px ${n.color}35`
                        : "0 2px 8px rgba(30,41,59,0.06)",
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl sm:h-10 sm:w-10"
                      style={{
                        backgroundColor: on ? n.color : "rgba(30,41,59,0.04)",
                        color: on ? "#fff" : "rgba(30,41,59,0.45)",
                      }}
                    >
                      <Icon size={16} strokeWidth={1.75} />
                    </span>
                    <span
                      className="text-[10px] font-bold tracking-wide"
                      style={{ color: on ? n.color : "rgba(30,41,59,0.4)" }}
                    >
                      {n.short}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center gap-3 rounded-2xl border border-bonero-dark/8 bg-white px-4 py-3 shadow-sm"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                style={{ backgroundColor: current.color }}
              >
                <current.Icon size={18} strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold text-bonero-dark">
                  {current.name}
                </p>
                <p className="text-xs text-bonero-green">
                  ● {t.connected}
                </p>
              </div>
              <Link2 size={16} className="ml-auto text-bonero-dark/25" />
            </motion.div>
          </Reveal>

          {/* Orbit hub */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="relative mx-auto aspect-square w-full max-w-[min(100%,380px)] overflow-hidden sm:max-w-[420px]">
              {/* Rings */}
              <div className="absolute inset-[12%] rounded-full border border-bonero-dark/8" />
              <div className="absolute inset-[22%] rounded-full border border-dashed border-bonero-dark/10" />

              {/* Connection line to active */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                {nodes.map((n, i) => {
                  const p = polar(n.angle, 38);
                  const on = active === i;
                  return (
                    <motion.line
                      key={n.name}
                      x1="50"
                      y1="50"
                      x2={50 + p.x}
                      y2={50 + p.y}
                      stroke={on ? "#188347" : "rgba(30,41,59,0.08)"}
                      strokeWidth={on ? 0.6 : 0.35}
                      initial={false}
                      animate={{ opacity: on ? 1 : 0.5 }}
                    />
                  );
                })}
              </svg>

              {/* Center hub */}
              <div className="absolute top-1/2 left-1/2 z-10 flex h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl bg-bonero-green text-white shadow-xl shadow-bonero-green/30 sm:h-24 sm:w-24">
                <span className="text-xs font-bold tracking-wide">{t.hub}</span>
                <motion.span
                  className="mt-0.5 text-[10px] text-white/70"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  hub
                </motion.span>
              </div>

              {/* Orbiting nodes */}
              {nodes.map((n, i) => {
                const p = polar(n.angle, 38);
                const on = active === i;
                const Icon = n.Icon;
                return (
                  <motion.button
                    key={n.name}
                    type="button"
                    onClick={() => setActive(i)}
                    className="absolute z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border bg-white shadow-md sm:h-14 sm:w-14"
                    style={{
                      left: `calc(50% + ${p.x}%)`,
                      top: `calc(50% + ${p.y}%)`,
                      borderColor: on ? n.color : "rgba(30,41,59,0.1)",
                    }}
                    initial={false}
                    animate={{
                      scale: on ? 1.12 : 1,
                      boxShadow: on
                        ? `0 12px 28px ${n.color}40`
                        : "0 4px 12px rgba(30,41,59,0.08)",
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    <Icon
                      size={18}
                      style={{ color: on ? n.color : "rgba(30,41,59,0.45)" }}
                      strokeWidth={1.75}
                    />
                  </motion.button>
                );
              })}

              {/* Pulse along active link */}
              <motion.span
                key={`pulse-${active}`}
                className="pointer-events-none absolute z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bonero-green"
                initial={{
                  left: "50%",
                  top: "50%",
                  opacity: 0,
                }}
                animate={{
                  left: [
                    "50%",
                    `calc(50% + ${polar(current.angle, 38).x}%)`,
                  ],
                  top: [
                    "50%",
                    `calc(50% + ${polar(current.angle, 38).y}%)`,
                  ],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 1.5, ease, repeat: Infinity }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
