"use client";

import { useEffect, useRef, useState } from "react";

const partners = [
  "Nova Digital",
  "Pulse Agency",
  "Meridian",
  "Atlas Media",
  "Vertex",
  "Orbit Lab",
];

const counters = [
  { target: 128400, label: "Bonero ile yönetilen içerik", suffix: "+" },
  { target: 4200, label: "Yönetilen sosyal medya hesabı", suffix: "+" },
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
}: {
  target: number;
  label: string;
  suffix: string;
  active: boolean;
}) {
  const value = useCountUp(target, active);

  return (
    <div className="text-center">
      <p className="text-3xl font-semibold tracking-tight text-bonero-green sm:text-4xl">
        {formatNumber(value)}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-bonero-dark/60">{label}</p>
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
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="social-proof"
      className="border-y border-bonero-dark/6 bg-white py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-center text-sm font-semibold tracking-wide text-bonero-dark/45 uppercase">
          Bonero ile çalışan ajanslar
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {partners.map((name) => (
            <li
              key={name}
              className="text-lg font-semibold tracking-tight text-bonero-dark/30 transition-colors hover:text-bonero-dark/55 sm:text-xl"
            >
              {name}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-12 grid max-w-2xl gap-8 sm:grid-cols-2">
          {counters.map((item) => (
            <CounterStat key={item.label} {...item} active={active} />
          ))}
        </div>

        <figure className="mx-auto mt-14 max-w-2xl text-center">
          <blockquote className="text-lg leading-relaxed font-medium text-bonero-dark sm:text-xl">
            &ldquo;Bonero&apos;dan önce içerik planlaması kabustu, şimdi tek tıkla
            hallediyoruz.&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-sm text-bonero-dark/55">
            <span className="font-semibold text-bonero-dark/75">Ayşe Kaya</span>
            {" · "}
            Operasyon Müdürü, Pulse Agency
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
