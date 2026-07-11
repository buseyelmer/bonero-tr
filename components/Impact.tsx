"use client";

import Reveal from "./Reveal";

const outcomes = [
  {
    value: "%40",
    label: "Daha hızlı yanıt",
    description: "Omnichannel gelen kutusu ile ortalama yanıt süresini kısaltın.",
  },
  {
    value: "50+",
    label: "Saat / ay tasarruf",
    description: "Kanal geçişleri ve dağınık panellerde kaybolan saatleri geri kazanın.",
  },
  {
    value: "1",
    label: "Panel, tüm kanallar",
    description: "Instagram’dan e-postaya kadar her talebi tek merkezden yönetin.",
  },
];

export default function Impact() {
  return (
    <section id="etki" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl tracking-wide text-bonero-dark sm:text-4xl">
            Bonero ile Ajansınızda Neler Değişir?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/60">
            Sadece hız vaadi değil — ölçülebilir omnichannel kazanç.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {outcomes.map(({ value, label, description }, index) => (
            <Reveal key={label} delay={0.1 * index}>
              <div className="glass-panel h-full rounded-2xl p-6 text-center shadow-sm sm:p-7 sm:text-left">
                <p className="font-heading text-4xl tracking-wide text-bonero-dark sm:text-5xl">
                  {value}
                </p>
                <h3 className="font-heading mt-2 text-base text-bonero-dark">
                  {label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-bonero-dark/60">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
