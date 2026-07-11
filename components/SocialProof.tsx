"use client";

import { useEffect, useRef, useState } from "react";
import { FileStack, Quote, Users } from "lucide-react";
import Reveal from "./Reveal";

const partners = [
  { name: "Nova Digital", initials: "ND" },
  { name: "Pulse Agency", initials: "PA" },
  { name: "Meridian", initials: "ME" },
  { name: "Atlas Media", initials: "AM" },
  { name: "Vertex", initials: "VX" },
  { name: "Orbit Lab", initials: "OL" },
];

const counters = [
  {
    target: 128400,
    label: "Bonero ile yönetilen içerik",
    suffix: "+",
    icon: FileStack,
  },
  {
    target: 4200,
    label: "Yönetilen omnichannel hesap",
    suffix: "+",
    icon: Users,
  },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("tr-TR").format(Math.round(value));
}

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function CounterStat({
  target,
  label,
  suffix,
  active,
  icon: Icon,
}: {
  target: number;
  label: string;
  suffix: string;
  active: boolean;
  icon: typeof FileStack;
}) {
  const value = useCountUp(target, active);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white px-6 py-7 shadow-sm">
      <div
        className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-bonero-green/10"
        aria-hidden="true"
      />
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <p className="font-heading relative mt-5 text-4xl tracking-tight text-bonero-dark tabular-nums sm:text-5xl">
        {formatNumber(value)}
        <span className="text-bonero-green">{suffix}</span>
      </p>
      <p className="relative mt-2 text-sm leading-relaxed text-bonero-dark/55">
        {label}
      </p>
    </div>
  );
}

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="sosyal-kanit"
      className="relative overflow-hidden border-y border-bonero-dark/6 bg-[#f8fafc] py-16 sm:py-20"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            Güven & kanıt
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
            Bonero ile çalışan ajanslar
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-bonero-dark/55">
            Omnichannel operasyonunu Bonero’ya taşıyan ekiplerin tercihi.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map(({ name, initials }) => (
              <li
                key={name}
                className="group flex flex-col items-center gap-2.5 rounded-2xl border border-bonero-dark/8 bg-white/80 px-3 py-4 transition-colors hover:border-bonero-green/30 hover:bg-white"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bonero-dark/[0.04] font-heading text-sm tracking-wide text-bonero-dark/45 transition-colors group-hover:bg-bonero-green/10 group-hover:text-bonero-green">
                  {initials}
                </span>
                <span className="text-center text-xs font-semibold tracking-tight text-bonero-dark/50 transition-colors group-hover:text-bonero-dark sm:text-sm">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {counters.map((item, i) => (
            <Reveal key={item.label} delay={0.1 + i * 0.08}>
              <CounterStat {...item} active={active} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18} className="mt-12">
          <figure className="relative overflow-hidden rounded-3xl bg-[#111827] px-6 py-10 sm:px-12 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse 70% 80% at 100% 0%, rgba(24,131,71,0.28), transparent 55%)",
              }}
            />
            <Quote
              size={36}
              className="relative text-bonero-green/50"
              strokeWidth={1.5}
            />
            <blockquote className="relative mt-5 max-w-3xl text-xl leading-relaxed font-medium tracking-tight text-white sm:text-2xl">
              &ldquo;Bonero&apos;dan önce içerik planlaması kabustu, şimdi tek
              tıkla hallediyoruz.&rdquo;
            </blockquote>
            <figcaption className="relative mt-8 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bonero-green text-sm font-bold text-white">
                AK
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">
                  Ayşe Kaya
                </span>
                <span className="text-sm text-white/50">
                  Operasyon Müdürü, Pulse Agency
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
