"use client";

import { useState } from "react";
import { MapPinned, ShoppingBag, UserRound, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

type UseCase = {
  icon: LucideIcon;
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  highlight: { tr: string; en: string };
  accent: string;
};

const useCases: UseCase[] = [
  {
    icon: ShoppingBag,
    title: {
      tr: "E-ticaret Ajansları",
      en: "E-commerce Agencies",
    },
    description: {
      tr: "Ürün kataloglarını otomatik içeriğe dönüştürün; stok ve kampanya mesajlarını tüm kanallarda aynı anda yönetin.",
      en: "Turn product catalogs into content automatically; sync stock and campaign messages across every channel.",
    },
    highlight: {
      tr: "Katalog → içerik otomasyonu",
      en: "Catalog → content automation",
    },
    accent: "from-[#188347]/15 to-transparent",
  },
  {
    icon: MapPinned,
    title: {
      tr: "Yerel İşletmeler",
      en: "Local Businesses",
    },
    description: {
      tr: "Google Haritalar ve sosyal medya içeriklerini eş zamanlı yönetin; rezervasyon ve yorum akışını tek inbox’ta toplayın.",
      en: "Manage Google Maps and social content in sync; pull bookings and reviews into one inbox.",
    },
    highlight: {
      tr: "Harita + sosyal senkron",
      en: "Maps + social sync",
    },
    accent: "from-[#1e293b]/10 to-transparent",
  },
  {
    icon: UserRound,
    title: {
      tr: "Kişisel Markalar",
      en: "Personal Brands",
    },
    description: {
      tr: "Kişisel tonunuza uygun içerik planlaması; DM, yorum ve collab taleplerini tek operasyonda yanıtlayın.",
      en: "Content planning that matches your voice; reply to DMs, comments, and collab asks in one flow.",
    },
    highlight: {
      tr: "Ton + etkileşim birliği",
      en: "Voice + engagement unity",
    },
    accent: "from-[#188347]/10 to-transparent",
  },
];

const copy = {
  tr: {
    eyebrow: "Kullanım Senaryoları",
    title: "Nişinize göre tasarlanmış operasyon",
    subtitle:
      "Farklı müşteri tipleriyle çalışan ajanslar için Bonero, odaklandığınız dikeye özel akışlar sunar.",
    select: "Senaryo seçin",
  },
  en: {
    eyebrow: "Use Cases",
    title: "Built for the niches you serve",
    subtitle:
      "Whether you run e-commerce, local, or personal-brand accounts — Bonero fits the vertical you focus on.",
    select: "Select a scenario",
  },
};

export default function UseCases() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [active, setActive] = useState(0);
  const current = useCases[active];
  const ActiveIcon = current.icon;

  return (
    <section id="kullanim-senaryolari" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/60">
            {t.subtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="flex flex-col gap-2 lg:col-span-4" delay={0.05}>
            <p className="mb-1 text-xs font-medium tracking-wide text-bonero-dark/40 uppercase lg:hidden">
              {t.select}
            </p>
            {useCases.map(({ icon: Icon, title }, index) => {
              const isActive = active === index;
              return (
                <button
                  key={title.tr}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-colors ${
                    isActive
                      ? "bg-bonero-dark text-white"
                      : "bg-bonero-dark/[0.03] text-bonero-dark/70 hover:bg-bonero-dark/[0.06]"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.75} />
                  <span className="text-sm font-medium tracking-tight">
                    {title[locale]}
                  </span>
                </button>
              );
            })}
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <div
              className={`relative min-h-[280px] overflow-hidden rounded-[1.75rem] border border-bonero-dark/8 bg-gradient-to-br ${current.accent} bg-white p-8 sm:p-10`}
            >
              <div className="bg-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title.tr}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                  className="relative"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-bonero-dark/10 bg-white/80 px-3 py-1 text-xs font-medium text-bonero-dark/55 backdrop-blur-sm">
                    <ActiveIcon size={14} />
                    {current.highlight[locale]}
                  </span>
                  <h3 className="font-heading mt-6 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
                    {current.title[locale]}
                  </h3>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-bonero-dark/65 sm:text-lg">
                    {current.description[locale]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
