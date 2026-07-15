"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShieldCheck, Waypoints, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";

const valueMeta: { key: string; icon: LucideIcon; index: string }[] = [
  { key: "field", icon: Waypoints, index: "01" },
  { key: "pace", icon: Eye, index: "02" },
  { key: "trust", icon: ShieldCheck, index: "03" },
];

const copy = {
  tr: {
    eyebrow: "Kültür",
    titleBefore: "Nasıl çalışıyoruz —",
    titleAccent: "neye bağlıyız",
    lead: "Bonero’da her rol aynı omurgaya oturur: sahadan öğrenmek, hızlı karar almak, güveni bozmamak.",
    activePrinciple: "Aktif ilke",
    manifestoEyebrow: "Ekip manifestosu",
    manifestoTitle: "Küçük ekip. Büyük sahiplik. Ölçülebilir sonuç.",
    manifestoTags: ["Saha", "Hız", "Güven"],
    values: {
      field: {
        title: "Saha gerçeği",
        tagline: "Sahadan ürün",
        description:
          "Ürünü, sahadaki operasyon acılarından tasarlıyoruz — slayt değil, çalışan yazılım. Her özellik bir iş gününden doğar.",
        beats: ["Saha görüşmesi", "Ağrı noktası", "Canlı özellik"],
        proof: "Demo’da gerçek akış — sunum slaytı yok",
      },
      pace: {
        title: "Şeffaf tempo",
        tagline: "Net sahiplik",
        description:
          "Küçük ekip, net sahiplik. Kararları hızlı alır, sonucu birlikte ölçeriz. Belirsizlik değil, görünür ilerleme.",
        beats: ["Sahiplik", "Hızlı karar", "Ortak ölçüm"],
        proof: "Haftalık ritim · görünür çıktı",
      },
      trust: {
        title: "Güven önce",
        tagline: "Veri omurgası",
        description:
          "Müşteri verisi omurgamız. Güvenlik ve KVKK bilinci her rolün parçası — pazarlama cümlesi değil, günlük pratik.",
        beats: ["KVKK bilinci", "Rol erişimi", "İzolasyon"],
        proof: "Güven, her teslimatın önkoşulu",
      },
    },
  },
  en: {
    eyebrow: "Culture",
    titleBefore: "How we work —",
    titleAccent: "what we stand for",
    lead: "Every role at Bonero sits on the same spine: learn from the field, decide quickly, and never break trust.",
    activePrinciple: "Active principle",
    manifestoEyebrow: "Team manifesto",
    manifestoTitle: "Small team. Big ownership. Measurable outcomes.",
    manifestoTags: ["Field", "Speed", "Trust"],
    values: {
      field: {
        title: "Field reality",
        tagline: "Product from the field",
        description:
          "We design the product from real operational pain — working software, not slides. Every feature starts in a business day.",
        beats: ["Field interview", "Pain point", "Live feature"],
        proof: "Real flows in demos — no presentation decks",
      },
      pace: {
        title: "Transparent pace",
        tagline: "Clear ownership",
        description:
          "Small team, clear ownership. We decide fast and measure outcomes together. Visible progress, not ambiguity.",
        beats: ["Ownership", "Fast decisions", "Shared metrics"],
        proof: "Weekly rhythm · visible output",
      },
      trust: {
        title: "Trust first",
        tagline: "Data backbone",
        description:
          "Customer data is our backbone. Security and privacy awareness are part of every role — daily practice, not marketing copy.",
        beats: ["Privacy awareness", "Role access", "Isolation"],
        proof: "Trust is a prerequisite for every delivery",
      },
    },
  },
};

export default function CareerCulture() {
  const { locale } = useLocale();
  const t = copy[locale];
  const values = valueMeta.map((meta) => ({
    ...meta,
    ...t.values[meta.key as keyof typeof t.values],
  }));
  const [active, setActive] = useState(0);
  const current = values[active];
  const ActiveIcon = current.icon;

  return (
    <section className="relative overflow-hidden border-t border-bonero-dark/6 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(145deg, #0c1612 0%, #152820 38%, #1a3328 72%, #0f1c17 100%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(24,131,71,0.4), transparent 68%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-20%] left-[-8%] h-[380px] w-[380px] rounded-full"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(24,131,71,0.22), transparent 70%)",
        }}
        animate={{ scale: [1.05, 1, 1.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-soft-light"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Reveal className="lg:col-span-8">
            <p className="text-sm font-medium tracking-wide text-white/40 uppercase">
              {t.eyebrow}
            </p>
            <h2 className="font-heading mt-4 max-w-2xl text-3xl !font-extrabold tracking-wide text-white sm:text-4xl lg:text-[2.75rem]">
              {t.titleBefore}{" "}
              <span className="text-bonero-green">{t.titleAccent}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/45">
              {t.lead}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm">
              <span className="font-heading text-3xl !font-extrabold text-bonero-green">
                {current.index}
              </span>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.16em] text-white/35 uppercase">
                  {t.activePrinciple}
                </p>
                <p className="mt-0.5 text-sm font-medium text-white/70">
                  {current.title}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-5">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm">
              {values.map((v, index) => {
                const Icon = v.icon;
                const isActive = active === index;
                return (
                  <button
                    key={v.key}
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    className={`relative flex w-full gap-4 border-b border-white/6 px-5 py-5 text-left transition-colors last:border-b-0 sm:px-6 sm:py-6 ${
                      isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="culture-active"
                        className="absolute inset-y-0 left-0 w-1 bg-bonero-green"
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 28,
                        }}
                      />
                    )}
                    <span
                      className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                        isActive
                          ? "border-bonero-green/35 bg-bonero-green/15 text-bonero-green"
                          : "border-white/10 text-white/45"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.3} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold tracking-[0.16em] text-bonero-green/80 uppercase">
                        {v.index} · {v.tagline}
                      </p>
                      <h3 className="font-heading mt-1 text-base !font-extrabold text-white sm:text-lg">
                        {v.title}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.article
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[1.75rem] border border-bonero-green/25 bg-gradient-to-br from-bonero-green/18 via-white/[0.03] to-transparent p-7 sm:p-9"
              >
                <div className="flex items-start gap-4">
                  <span className="font-heading text-6xl !font-extrabold leading-none text-bonero-green/35 sm:text-7xl">
                    {current.index}
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-bonero-green uppercase">
                      {current.tagline}
                    </p>
                    <h3 className="font-heading mt-1 flex items-center gap-2 text-2xl !font-extrabold text-white sm:text-3xl">
                      <ActiveIcon
                        size={22}
                        className="text-bonero-green"
                        strokeWidth={1.5}
                      />
                      {current.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-6 text-lg leading-relaxed text-white/70 sm:text-xl">
                  {current.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {current.beats.map((beat) => (
                    <span
                      key={beat}
                      className="rounded-full border border-white/12 bg-black/20 px-3.5 py-1.5 text-xs font-semibold text-white/70"
                    >
                      {beat}
                    </span>
                  ))}
                </div>

                <p className="mt-auto border-t border-white/8 pt-6 text-sm italic text-white/50">
                  “{current.proof}”
                </p>
              </motion.article>
            </AnimatePresence>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-7">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-bonero-green">
            <motion.div
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              animate={{ x: ["-100%", "400%"] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 2,
              }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase">
                  {t.manifestoEyebrow}
                </p>
                <p className="font-heading mt-1 text-xl !font-extrabold text-white sm:text-2xl">
                  {t.manifestoTitle}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.manifestoTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
