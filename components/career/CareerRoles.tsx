"use client";

import { useState } from "react";
import {
  ArrowRight,
  Code2,
  Headphones,
  Layout,
  Package,
  Sparkles,
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
    lead: "Açık ilan olmasa da doğru profili dinleriz. Bir alan seçin, ne aradığımızı görün — sonra başvuruya geçin.",
    activeArea: "Seçili alan",
    workSurface: "Çalışma yüzeyi",
    apply: "Bu alana başvur",
    footnoteBefore: "Başka bir alanda güçlüsünüz? Yine de başvurun —",
    footnoteLink: "formu açın",
    listening: "Dinliyoruz",
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
    lead: "Even without an open listing, we listen for the right profile. Pick an area, see what we look for — then apply.",
    activeArea: "Selected area",
    workSurface: "Work surface",
    apply: "Apply for this area",
    footnoteBefore: "Strong in another area? Apply anyway —",
    footnoteLink: "open the form",
    listening: "Listening",
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

function RoleSelector({
  roles,
  active,
  onSelect,
  listeningLabel,
}: {
  roles: (typeof roleMeta[number] & (typeof copy.tr.roles)[ListedCareerRoleId])[];
  active: number;
  onSelect: (index: number) => void;
  listeningLabel: string;
}) {
  return (
    <>
      {/* Mobile: horizontal pills */}
      <div className="mt-10 flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {roles.map((role, index) => {
          const Icon = role.icon;
          const isActive = active === index;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelect(index)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-bonero-green bg-bonero-green text-white shadow-md shadow-bonero-green/20"
                  : "border-bonero-dark/10 bg-white text-bonero-dark/60 hover:border-bonero-dark/20"
              }`}
            >
              <Icon size={15} strokeWidth={1.5} />
              {role.title}
            </button>
          );
        })}
      </div>

      {/* Desktop: vertical cards */}
      <div className="mt-12 hidden overflow-hidden rounded-[1.75rem] border border-bonero-dark/8 bg-white shadow-[0_20px_50px_-32px_rgba(30,41,59,0.12)] lg:block">
        {roles.map((role, index) => {
          const Icon = role.icon;
          const isActive = active === index;
          const num = String(index + 1).padStart(2, "0");

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelect(index)}
              onMouseEnter={() => onSelect(index)}
              className={`relative flex w-full items-center gap-4 border-b border-bonero-dark/6 px-5 py-5 text-left transition-colors last:border-b-0 sm:px-6 sm:py-6 ${
                isActive ? "bg-bonero-dark/[0.02]" : "hover:bg-bonero-dark/[0.015]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="role-active-bar"
                  className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-bonero-green"
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                />
              )}

              <span
                className={`font-heading text-2xl !font-extrabold tabular-nums transition-colors ${
                  isActive ? "text-bonero-green" : "text-bonero-dark/12"
                }`}
              >
                {num}
              </span>

              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                  isActive
                    ? "border-bonero-green/35 bg-bonero-green/10 text-bonero-green"
                    : "border-bonero-dark/10 text-bonero-dark/45"
                }`}
              >
                <Icon size={20} strokeWidth={1.5} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-heading text-lg !font-extrabold tracking-wide text-bonero-dark">
                    {role.title}
                  </span>
                  {isActive && (
                    <span className="rounded-full bg-bonero-green/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-bonero-green uppercase">
                      {listeningLabel}
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block truncate text-sm text-bonero-dark/50">
                  {role.line}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

function RoleDetailPanel({
  role,
  index,
  t,
}: {
  role: (typeof roleMeta)[number] &
    (typeof copy.tr.roles)[ListedCareerRoleId];
  index: number;
  t: (typeof copy)["tr"];
}) {
  const Icon = role.icon;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      key={role.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[1.75rem] border border-bonero-green/20 bg-gradient-to-br from-bonero-green/[0.06] via-white to-white p-6 shadow-[0_24px_60px_-32px_rgba(30,41,59,0.18)] sm:p-8 lg:min-h-[480px]"
    >
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="font-heading text-6xl !font-extrabold leading-none text-bonero-green/25 sm:text-7xl">
            {num}
          </span>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-bonero-green uppercase">
              {t.activeArea}
            </p>
            <h3 className="font-heading mt-1 flex items-center gap-2 text-2xl !font-extrabold tracking-wide text-bonero-dark sm:text-3xl">
              <Icon
                size={22}
                strokeWidth={1.5}
                className="text-bonero-green"
              />
              {role.title}
            </h3>
            <p className="mt-1 text-sm text-bonero-dark/50 sm:text-base">
              {role.line}
            </p>
          </div>
        </div>

        <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-bonero-green/25 bg-bonero-green/10 px-3 py-1.5 text-[10px] font-bold tracking-wide text-bonero-green uppercase sm:inline-flex">
          <Sparkles size={12} />
          {t.listening}
        </span>
      </div>

      <p className="relative mt-6 text-base leading-relaxed text-bonero-dark/65 sm:text-lg">
        {role.detail}
      </p>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {role.traits.map((trait) => (
          <span
            key={trait}
            className="rounded-full border border-bonero-dark/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-bonero-dark/70"
          >
            {trait}
          </span>
        ))}
      </div>

      <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/35 uppercase sm:col-span-3">
          {t.workSurface}
        </p>
        {role.stack.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
            className="rounded-xl border border-bonero-dark/8 bg-[#f7f9f8] px-4 py-3.5"
          >
            <span className="mb-2 block h-1 w-6 rounded-full bg-bonero-green" />
            <span className="text-sm font-semibold text-bonero-dark">
              {item}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-auto pt-8">
        <button
          type="button"
          onClick={() => goToCareerApply(role.id)}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-bonero-green px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-bonero-green/25 transition-all hover:scale-[1.01] hover:bg-bonero-green/90 sm:w-auto"
        >
          {t.apply}
          <ArrowRight
            size={16}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </motion.article>
  );
}

export default function CareerRoles() {
  const { locale } = useLocale();
  const t = copy[locale];
  const roles = roleMeta.map((meta) => ({
    ...meta,
    ...t.roles[meta.id],
  }));
  const [active, setActive] = useState(0);
  const current = roles[active];

  return (
    <section
      id="roller"
      className="relative scroll-mt-28 overflow-hidden border-t border-bonero-dark/6 bg-[#f7f9f8] py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(24,131,71,0.06), transparent 55%)",
        }}
      />
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-8">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              {t.eyebrow}
            </p>
            <h2 className="font-heading mt-4 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
              {t.title}
              <span className="mt-1.5 block text-bonero-dark/35">
                {t.titleMuted}
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-bonero-dark/55">
              {t.lead}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="hidden lg:col-span-4 lg:block">
            <div className="flex items-center gap-4 rounded-2xl border border-bonero-dark/8 bg-white px-5 py-4 shadow-sm">
              <span className="font-heading text-3xl !font-extrabold text-bonero-green">
                {String(active + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/35 uppercase">
                  {t.activeArea}
                </p>
                <p className="mt-0.5 text-sm font-medium text-bonero-dark/70">
                  {current.title}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:mt-0 lg:grid lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-5">
            <RoleSelector
              roles={roles}
              active={active}
              onSelect={setActive}
              listeningLabel={t.listening}
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-6 lg:col-span-7 lg:mt-12">
            <AnimatePresence mode="wait">
              <RoleDetailPanel role={current} index={active} t={t} />
            </AnimatePresence>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-10">
          <div className="flex flex-col gap-4 rounded-2xl border border-bonero-dark/8 bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-bonero-dark/50">
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
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => goToCareerApply(role.id)}
                  className="rounded-full border border-bonero-dark/10 bg-[#f7f9f8] px-3 py-1.5 text-xs font-semibold text-bonero-dark/55 transition-colors hover:border-bonero-green/30 hover:text-bonero-green"
                >
                  {role.title} →
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
