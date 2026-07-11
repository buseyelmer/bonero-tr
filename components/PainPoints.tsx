"use client";

import { FileWarning, CalendarX2, Shuffle, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

type Pain = {
  icon: LucideIcon;
  index: string;
  title: string;
  description: string;
};

const pains: Pain[] = [
  {
    icon: FileWarning,
    index: "01",
    title: "Müşteri revizyonları arasında kaybolmayın",
    description:
      "E-posta zincirleri ve dağınık dosyalar teslimatı geciktirir. Bonero’da her revizyon tek akışta, izlenebilir kalır.",
  },
  {
    icon: CalendarX2,
    index: "02",
    title: "Manuel rapor için haftasonunuzu harcamayın",
    description:
      "Performans verilerini otomatik toplayın; müşteri raporlarını dakikalar içinde, kurumsal kalitede sunun.",
  },
  {
    icon: Shuffle,
    index: "03",
    title: "Platformlar arası strateji kopukluğu yaşamayın",
    description:
      "Instagram’dan LinkedIn’e geçerken mesaj dağılmasın. Tek panelden tutarlı planlama ve yayın.",
  },
];

export default function PainPoints() {
  return (
    <section id="cozumler" className="bg-[#f8fafc] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              Acı Noktaları
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              Hangi Problemleri
              <span className="mt-1 block text-bonero-dark/35">Çözüyoruz?</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-bonero-dark/60">
              Ajansın günlük kabuslarını biliyoruz — çünkü Bonero tam olarak
              bunları çözmek için tasarlandı.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <ol className="divide-y divide-bonero-dark/10 border-y border-bonero-dark/10">
              {pains.map(({ icon: Icon, index, title, description }, i) => (
                <Reveal key={title} delay={0.08 * i}>
                  <li className="group grid gap-4 py-8 sm:grid-cols-[4.5rem_1fr] sm:gap-8">
                    <div className="flex items-start gap-3 sm:flex-col sm:gap-4">
                      <span className="font-heading text-3xl tracking-tight text-bonero-dark/15 transition-colors group-hover:text-bonero-green/40">
                        {index}
                      </span>
                      <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-bonero-dark/10 text-bonero-dark/55 sm:mt-0">
                        <Icon size={16} strokeWidth={1.75} />
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl tracking-wide text-bonero-dark sm:text-2xl">
                        {title}
                      </h3>
                      <p className="mt-3 max-w-xl text-base leading-relaxed text-bonero-dark/60">
                        {description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
