"use client";

import Reveal from "./Reveal";

const metrics = [
  {
    value: "50+",
    label: "mesaj / dakika",
    detail: "Dakikada ortalama 50+ mesaj yönetimi",
  },
  {
    value: "%40",
    label: "daha hızlı yanıt",
    detail: "Ortalama yanıt süresinde %40 iyileşme",
  },
  {
    value: "3→1",
    label: "kanal birleşimi",
    detail: "WhatsApp, Instagram ve e-posta tek inbox’ta",
  },
  {
    value: "15 dk",
    label: "kurulum",
    detail: "Ajans hesabınız dakikalar içinde hazır",
  },
];

export default function MetricsStrip() {
  return (
    <section
      id="metrikler"
      aria-label="Bonero’nun sağladığı verim"
      className="border-y border-bonero-dark/6 bg-bonero-dark"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <Reveal>
          <p className="mb-8 text-center text-sm font-medium tracking-wide text-white/45 uppercase">
            Bonero’nun sağladığı verim
          </p>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {metrics.map((metric) => (
              <li key={metric.label} className="text-center sm:text-left">
                <p className="font-heading text-3xl tracking-wide text-white sm:text-4xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm font-medium text-bonero-green">
                  {metric.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                  {metric.detail}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
