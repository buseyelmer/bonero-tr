"use client";

import { useState } from "react";
import {
  ArrowRight,
  Code2,
  Headphones,
  Layout,
  Package,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import { goToCareerApply } from "@/lib/go-to-career-apply";
import { useLocale } from "@/components/LocaleProvider";
import type { CareerRoleId } from "@/lib/career-roles";

type ListedCareerRoleId = Exclude<CareerRoleId, "other">;

const roleMeta: { id: ListedCareerRoleId; icon: LucideIcon }[] = [
  { id: "product", icon: Package },
  { id: "design", icon: Layout },
  { id: "engineering", icon: Code2 },
  { id: "customer-success", icon: Headphones },
];

const copy = {
  tr: {
    eyebrow: "Alanlar",
    title: "Şu an dinlediğimiz",
    titleMuted: "yetenek alanları",
    lead: "Açık ilan olmasa da doğru profili dinleriz. Satırı açın, ne aradığımızı görün — sonra başvuruya geçin.",
    workSurface: "Çalışma yüzeyi",
    apply: "Bu alana başvur",
    footnoteBefore: "Başka bir alanda güçlüsünüz? Yine de başvurun —",
    footnoteLink: "formu açın",
    roles: {
      product: {
        title: "Ürün",
        line: "Operasyonu ürün diline çevirenler",
        detail:
          "Saha geri bildirimini önceliklendirir, yol haritasını net tutar ve özelliğin iş gününde gerçekten işe yaradığını doğrularsınız.",
        traits: ["Keşif", "Önceliklendirme", "Ölçüm"],
        stack: ["Kullanıcı görüşmesi", "PRD", "Metrik"],
      },
      design: {
        title: "Tasarım",
        line: "Karmaşığı sade, güvenilir ve net gösterenler",
        detail:
          "Omnichannel karmaşayı sakin bir arayüze indirgersiniz. Tipografi, ritim ve etkileşim Bonero’nun güven dilini taşır.",
        traits: ["Sistem", "Akış", "Detay"],
        stack: ["UI sistemi", "Prototype", "Motion"],
      },
      engineering: {
        title: "Mühendislik",
        line: "Omnichannel altyapıyı sağlam ve hızlı kuranlar",
        detail:
          "Kanalları birleştiren, güvenli ve ölçeklenebilir sistemi kurarsınız. Temizlik, hız ve gözlemlenebilirlik vazgeçilmez.",
        traits: ["Kalite", "Hız", "Güvenlik"],
        stack: ["Next.js", "API", "Entegrasyon"],
      },
      "customer-success": {
        title: "Müşteri başarısı",
        line: "Müşterileri canlıda başarıya taşıyanlar",
        detail:
          "Onboarding’den günlük kullanıma kadar müşterinin yanında olursunuz. Başarıyı aktivasyon ve tutmada ölçersiniz.",
        traits: ["Empati", "Eğitim", "Büyüme"],
        stack: ["Onboarding", "SLA", "Feedback"],
      },
    },
  },
  en: {
    eyebrow: "Areas",
    title: "Talent areas",
    titleMuted: "we are listening for",
    lead: "Even without an open listing, we listen for the right profile. Expand a row to see what we look for — then apply.",
    workSurface: "Work surface",
    apply: "Apply for this area",
    footnoteBefore: "Strong in another area? Apply anyway —",
    footnoteLink: "open the form",
    roles: {
      product: {
        title: "Product",
        line: "Translating operations into product language",
        detail:
          "You prioritize field feedback, keep the roadmap clear, and verify that features truly work in a business day.",
        traits: ["Discovery", "Prioritization", "Measurement"],
        stack: ["User interviews", "PRD", "Metrics"],
      },
      design: {
        title: "Design",
        line: "Making complexity simple, trustworthy, and clear",
        detail:
          "You reduce omnichannel complexity into a calm interface. Typography, rhythm, and interaction carry Bonero’s trust language.",
        traits: ["Systems", "Flow", "Detail"],
        stack: ["UI system", "Prototype", "Motion"],
      },
      engineering: {
        title: "Engineering",
        line: "Building solid, fast omnichannel infrastructure",
        detail:
          "You build the system that unifies channels securely and at scale. Clean code, speed, and observability are non-negotiable.",
        traits: ["Quality", "Speed", "Security"],
        stack: ["Next.js", "API", "Integrations"],
      },
      "customer-success": {
        title: "Customer success",
        line: "Helping customers succeed in production",
        detail:
          "You stand with customers from onboarding through daily use. You measure success in activation and retention.",
        traits: ["Empathy", "Enablement", "Growth"],
        stack: ["Onboarding", "SLA", "Feedback"],
      },
    },
  },
};

export default function CareerRoles() {
  const { locale } = useLocale();
  const t = copy[locale];
  const roles = roleMeta.map((meta) => ({
    ...meta,
    ...t.roles[meta.id],
  }));
  const [active, setActive] = useState(1);

  return (
    <section
      id="roller"
      className="relative scroll-mt-28 overflow-hidden border-t border-bonero-dark/6 bg-background py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(24,131,71,0.06), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-4 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
            {t.title}
            <span className="mt-1.5 block text-bonero-dark/35">
              {t.titleMuted}
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-bonero-dark/55">
            {t.lead}
          </p>
        </Reveal>

        <ul className="mt-14 divide-y divide-bonero-dark/10 border-y border-bonero-dark/10">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const isOpen = active === index;
            const num = String(index + 1).padStart(2, "0");

            return (
              <li key={role.id}>
                <Reveal delay={0.04 * index}>
                  <button
                    type="button"
                    onClick={() => setActive(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-4 py-5 text-left sm:gap-6 sm:py-6"
                  >
                    <span
                      className={`font-heading text-3xl !font-extrabold tabular-nums transition-colors sm:text-4xl ${
                        isOpen ? "text-bonero-green" : "text-bonero-dark/15"
                      }`}
                    >
                      {num}
                    </span>

                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors sm:h-12 sm:w-12 ${
                        isOpen
                          ? "border-bonero-green/30 bg-bonero-green/10 text-bonero-green"
                          : "border-bonero-dark/10 bg-white text-bonero-dark/50 group-hover:border-bonero-dark/20"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="font-heading block text-xl !font-extrabold tracking-wide text-bonero-dark sm:text-2xl">
                        {role.title}
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-bonero-dark/50 sm:text-base">
                        {role.line}
                      </span>
                    </span>

                    <motion.span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bonero-dark/10 text-bonero-dark/45 transition-colors ${
                        isOpen
                          ? "border-bonero-green bg-bonero-green text-white"
                          : ""
                      }`}
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Plus size={18} strokeWidth={2} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-8 pl-0 sm:grid-cols-12 sm:gap-10 sm:pb-10 sm:pl-[calc(3rem+1.5rem+3rem)]">
                          <div className="sm:col-span-7">
                            <p className="text-base leading-relaxed text-bonero-dark/65 sm:text-lg">
                              {role.detail}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                              {role.traits.map((trait) => (
                                <span
                                  key={trait}
                                  className="border-b border-bonero-green/40 pb-0.5 text-sm font-semibold text-bonero-dark"
                                >
                                  {trait}
                                </span>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => goToCareerApply(role.id)}
                              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3.5 text-sm font-semibold text-white shadow-sm shadow-bonero-green/20 transition-all hover:scale-[1.02] hover:bg-bonero-green/90"
                            >
                              {t.apply}
                              <ArrowRight size={16} strokeWidth={2} />
                            </button>
                          </div>

                          <div className="sm:col-span-5">
                            <p className="text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/35 uppercase">
                              {t.workSurface}
                            </p>
                            <ul className="mt-4 space-y-0 border-l border-bonero-dark/10">
                              {role.stack.map((item, i) => (
                                <motion.li
                                  key={item}
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.08 * i }}
                                  className="relative border-b border-bonero-dark/8 py-3.5 pl-5 last:border-b-0"
                                >
                                  <span className="absolute top-1/2 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bonero-green" />
                                  <span className="text-sm font-medium text-bonero-dark">
                                    {item}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.12} className="mt-10">
          <p className="text-sm text-bonero-dark/45">
            {t.footnoteBefore}{" "}
            <button
              type="button"
              onClick={() => goToCareerApply()}
              className="font-semibold text-bonero-green hover:text-bonero-green/80"
            >
              {t.footnoteLink}
            </button>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
