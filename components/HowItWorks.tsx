"use client";

import {
  Camera,
  Link2,
  Mail,
  MessageCircle,
  MessageCircleReply,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

type Step = {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
  channels?: LucideIcon[];
};

const steps: Step[] = [
  {
    icon: Link2,
    step: "01",
    title: "Bağla",
    description:
      "Hesaplarınızı (Instagram, WhatsApp, Mail) tek tıkla entegre edin. Dakikalar içinde tüm kanallar Bonero’da hazır.",
    channels: [Camera, MessageCircle, Mail],
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Birleştir",
    description:
      "Tüm mesajlar yapay zeka destekli akıllı gelen kutusuna düşer. Dağınık paneller biter; tek akış başlar.",
  },
  {
    icon: MessageCircleReply,
    step: "03",
    title: "Yanıtla",
    description:
      "Tek panelden tüm kanallara hızlıca yanıt verin. Müşteri hangi kanalda olursa olsun, ekibiniz aynı yerden konuşur.",
  },
];

export default function HowItWorks() {
  return (
    <section id="nasil-calisir" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            Nasıl Çalışır?
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-5xl">
            Omnichannel süreç
            <span className="mt-1 block text-bonero-dark/35">üç adımda biter.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/60">
            Karmaşık değil. Bağla, birleştir, yanıtla — öğrenme eğrisi olmadan.
          </p>
        </Reveal>

        {/* Desktop: horizontal connected flow */}
        <ol className="relative mt-16 hidden lg:grid lg:grid-cols-3 lg:gap-0">
          <div
            className="pointer-events-none absolute top-[2.75rem] right-[16%] left-[16%] h-px bg-bonero-dark/10"
            aria-hidden="true"
          />
          {steps.map(({ icon: Icon, step, title, description, channels }, index) => (
            <li key={title} className="relative px-6 text-center">
              <Reveal delay={0.1 * index}>
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-bonero-dark/10 bg-white shadow-sm">
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-bonero-green text-[10px] font-bold text-white">
                    {Number(step)}
                  </span>
                  <Icon size={22} className="text-bonero-dark/70" strokeWidth={1.75} />
                </div>
                <h3 className="font-heading mt-6 text-2xl tracking-wide text-bonero-dark">
                  {title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-bonero-dark/60">
                  {description}
                </p>
                {channels && (
                  <div className="mt-5 flex items-center justify-center gap-2">
                    {channels.map((Ch, i) => (
                      <span
                        key={i}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-bonero-dark/[0.04] text-bonero-dark/45"
                      >
                        <Ch size={14} strokeWidth={1.75} />
                      </span>
                    ))}
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Mobile / tablet: vertical timeline */}
        <ol className="relative mt-12 space-y-0 lg:hidden">
          <div
            className="pointer-events-none absolute top-4 bottom-4 left-[1.35rem] w-px bg-bonero-dark/10"
            aria-hidden="true"
          />
          {steps.map(({ icon: Icon, step, title, description, channels }, index) => (
            <li key={title} className="relative flex gap-5 pb-10 last:pb-0">
              <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bonero-dark/10 bg-white shadow-sm">
                <Icon size={18} className="text-bonero-dark/70" strokeWidth={1.75} />
              </div>
              <Reveal delay={0.08 * index} className="min-w-0 pt-1">
                <p className="text-xs font-medium tracking-wide text-bonero-green uppercase">
                  Adım {step}
                </p>
                <h3 className="font-heading mt-1 text-xl tracking-wide text-bonero-dark">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-bonero-dark/60">
                  {description}
                </p>
                {channels && (
                  <div className="mt-4 flex gap-2">
                    {channels.map((Ch, i) => (
                      <span
                        key={i}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-bonero-dark/[0.04] text-bonero-dark/45"
                      >
                        <Ch size={14} strokeWidth={1.75} />
                      </span>
                    ))}
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.2} className="mt-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-bonero-dark/8 bg-[#f8fafc] px-5 py-4 text-sm text-bonero-dark/55"
          >
            <span className="font-medium text-bonero-dark">Akış:</span>
            <span>Bağla</span>
            <span className="text-bonero-dark/25">→</span>
            <span>Birleştir</span>
            <span className="text-bonero-dark/25">→</span>
            <span>Yanıtla</span>
            <span className="ml-1 rounded-full bg-bonero-green/10 px-2.5 py-0.5 text-xs font-medium text-bonero-green">
              ~15 dk kurulum
            </span>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
