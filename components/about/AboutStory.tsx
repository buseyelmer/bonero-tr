"use client";

import Link from "next/link";
import { Mail, Clock3, Sparkles, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

type TimelineItem = {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  accent?: boolean;
};

const items: TimelineItem[] = [
  {
    icon: Mail,
    label: "Acı noktası",
    title: "E-posta karmaşası",
    description:
      "Ajanslarda yıllarca aynı sahneyi izledik: içerik e-posta zincirlerinde kayboluyor, onaylar günlerce bekliyor, raporlar hafta sonuna kalıyordu.",
  },
  {
    icon: Clock3,
    label: "Acı noktası",
    title: "Zaman kaybı",
    description:
      "Genel amaçlı sosyal medya araçları bu karmaşayı çözmek için değil, bireysel kullanım için tasarlanmıştı. Operasyon her gün sürtünme üretiyordu.",
  },
  {
    icon: Sparkles,
    label: "Çözüm",
    title: "Basitlik",
    description:
      "Bonero’yu, ajans ekiplerinin gerçek operasyonuna göre sıfırdan kurduk. Basit bir vaatle yola çıktık: bağlan, üret, yayına al — öğrenme eğrisi olmadan, müşteri portföyünü ölçekleyerek.",
    accent: true,
  },
];

export default function AboutStory() {
  return (
    <section className="border-t border-bonero-dark/6 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            Hikayemiz
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
            Neden Bonero&apos;yu kurduk?
          </h2>
        </Reveal>

        <div className="relative mt-12">
          <div
            className="absolute top-4 bottom-4 left-[19px] w-px bg-bonero-dark/10 sm:left-[23px]"
            aria-hidden="true"
          />

          <ol className="space-y-8">
            {items.map(({ icon: Icon, label, title, description, accent }, index) => (
              <Reveal key={title} delay={0.08 * index}>
                <li className="relative flex gap-5 sm:gap-7">
                  <span
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${
                      accent
                        ? "bg-bonero-green text-white"
                        : "glass-panel text-bonero-dark/70"
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <div className="glass-panel flex-1 rounded-2xl p-5 sm:p-6">
                    <p className="text-xs font-medium tracking-wide text-bonero-dark/40 uppercase">
                      {label}
                    </p>
                    <h3 className="font-heading mt-1.5 text-lg text-bonero-dark">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-bonero-dark/60 sm:text-base">
                      {description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.2} className="mt-10">
          <Link
            href="/iletisim"
            className="inline-flex rounded-lg bg-bonero-green px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-bonero-green/90"
          >
            Bizimle tanışın
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
