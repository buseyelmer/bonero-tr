"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Link2, Zap, Camera, Mail, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

const reasons = [
  {
    icon: Building2,
    title: "Ajans Odaklı Omnichannel",
    description:
      "Çoklu müşteri, çoklu kanal ve ekip rolleri için tasarlandı — dağınık gelen kutularını tek operasyona indirger.",
    channel: "Instagram",
    channelIcon: Camera,
    channelColor: "text-[#C13584] bg-[#E1306C]/10",
  },
  {
    icon: Zap,
    title: "Yapay Zeka Destekli Birleştirme",
    description:
      "Kanallardaki talepleri AI tek akışta toplar; ekibiniz stratejiye ve hızlı yanıta odaklanır.",
    channel: "WhatsApp",
    channelIcon: MessageCircle,
    channelColor: "text-[#128C7E] bg-[#25D366]/15",
  },
  {
    icon: Link2,
    title: "Tam Kanal Entegrasyonu",
    description:
      "Instagram, WhatsApp, e-posta ve web trafiğini tek panelde birleştirerek operasyonel dağınıklığı sonlandırın.",
    channel: "E-posta",
    channelIcon: Mail,
    channelColor: "text-bonero-dark/70 bg-bonero-dark/8",
  },
];

export default function WhyBonero() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers = refs.current.map((node, index) => {
      if (!node) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );
      observer.observe(node);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const ActiveIcon = reasons[active].channelIcon;

  return (
    <section id="neden-bonero" className="bg-background py-16 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Sticky visual / channel */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <Reveal>
                <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
                  Neden Bonero?
                </p>
                <h2 className="font-heading mt-3 text-4xl tracking-wide text-bonero-dark sm:text-5xl">
                  Kart değil.
                  <span className="mt-1 block text-bonero-dark/35">
                    Operasyon.
                  </span>
                </h2>
              </Reveal>

              <div className="relative mt-12 aspect-square max-w-sm overflow-hidden rounded-[2rem] bg-[#f8fafc]">
                <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={reasons[active].channel}
                    initial={{ opacity: 0, scale: 0.92, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8"
                  >
                    <span
                      className={`flex h-20 w-20 items-center justify-center rounded-3xl ${reasons[active].channelColor}`}
                    >
                      <ActiveIcon size={36} strokeWidth={1.5} />
                    </span>
                    <p className="font-heading text-2xl tracking-wide text-bonero-dark">
                      {reasons[active].channel}
                    </p>
                    <p className="text-center text-sm text-bonero-dark/50">
                      Kaydırdıkça kanal değişir — tek panelde birleşir.
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Scrolling focus text — no cards */}
          <div className="space-y-24 lg:col-span-7 lg:space-y-32 lg:py-8">
            <div className="lg:hidden">
              <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
                Neden Bonero?
              </p>
              <h2 className="font-heading mt-3 text-4xl tracking-wide text-bonero-dark">
                Kart değil. Operasyon.
              </h2>
            </div>

            {reasons.map(({ icon: Icon, title, description, channel }, index) => (
              <article
                key={title}
                ref={(el) => {
                  refs.current[index] = el;
                }}
                className="max-w-lg"
              >
                <Reveal delay={0.05}>
                  <div className="mb-4 flex items-center gap-3">
                    <Icon size={22} className="text-bonero-dark/50" strokeWidth={1.75} />
                    <span className="text-xs font-medium tracking-wide text-bonero-green uppercase">
                      {channel}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
                    {title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-bonero-dark/60 sm:text-lg">
                    {description}
                  </p>
                </Reveal>
              </article>
            ))}

            <a
              href="#ozellikler"
              className="inline-flex text-sm font-medium text-bonero-dark/70 transition-colors hover:text-bonero-dark"
            >
              Özellikleri İncele →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
