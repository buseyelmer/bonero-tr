"use client";

import { Headphones, ShieldCheck, Upload, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

type TrustCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  className: string;
};

const cards: TrustCard[] = [
  {
    icon: Headphones,
    title: "7/24 Teknik Destek",
    description:
      "Ajans operasyonunuz durmasın. Ekibimiz günün her saatinde yanınızda.",
    className: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    icon: ShieldCheck,
    title: "SSL Sertifikalı Güvenlik",
    description: "Müşteri verileriniz şifreli ve rol bazlı erişimle korunur.",
    className: "sm:col-span-2 lg:col-span-2",
  },
  {
    icon: Upload,
    title: "Tek Tıkla Veri Aktarımı",
    description: "Mevcut hesaplarınızı hızlıca Bonero’ya taşıyın.",
    className: "sm:col-span-2 lg:col-span-2",
  },
];

export default function AboutTrustBento() {
  return (
    <section
      id="guven-hakkimizda"
      aria-label="Güvenli başlangıç"
      className="border-t border-bonero-dark/6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 max-w-xl">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            Güven
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark">
            Kurumsal standartlarda güvenilir altyapı
          </h2>
        </Reveal>

        <div className="grid auto-rows-[minmax(140px,auto)] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, description, className }, index) => (
            <Reveal key={title} delay={0.08 * index} className={className}>
              <motion.article
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className={`glass-panel flex h-full flex-col justify-between rounded-2xl p-6 sm:p-7 ${
                  index === 0 ? "min-h-[220px] lg:min-h-full" : ""
                }`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bonero-dark/5 text-bonero-dark/70">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <div className="mt-6">
                  <h3 className="font-heading text-lg text-bonero-dark">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bonero-dark/60">
                    {description}
                  </p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
