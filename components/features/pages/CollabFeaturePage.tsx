"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  HelpCircle,
  Mail,
  MessageSquare,
  Shield,
  UserCheck,
  UserPlus,
  Users,
  UsersRound,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import CollabMock from "@/components/features/mocks/CollabMock";
import { useLocale } from "@/components/LocaleProvider";
import { featureHref } from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;
const SCENARIO_HOLD = 5000;

const copy = {
  tr: {
    heroEyebrow: "Ekip & onay",
    heroTitle: "Kim onaylıyor?",
    heroAccent: "Hat gösterir.",
    heroLead:
      "Onaylar Slack’te, dosyalar Drive’da, görevler Excel’de — dağılınca sorumluluk kaybolur. Bonero’da brief’ten yayına tek ray var.",
    ctaPrimary: "Onay hattını kur",
    ctaSecondary: "Rayı gör",
    chaosTitle: "Dağılmış araçlar",
    chaosLead: "Herkes farklı yerde çalışınca “kimde kaldı?” sorusu kaçınılmaz.",
    chaosItems: ["Slack’te onay isteği", "Drive’da revizyon v3", "Excel’de görev listesi", "Mailde müşteri notu"],
    chaosPains: [
      "Aynı iş üç yerde takip ediliyor",
      "Onay kimin sırasında belli değil",
      "Revizyon notu sohbette kayboluyor",
    ],
    chaosQuestion: "Kimde kaldı?",
    chaosAnswer: "Dağınık araçlarda cevap yok — hat gösterir.",
    railTitle: "Tek ray",
    railLead: "Brief → kreatif → onay → yayın. Bekleyen iş ve sahip net.",
    ladderTitle: "Sorumluluk merdiveni",
    ladderLead: "Üç katman — karışmadan, ölçeklenebilir.",
    ladderLayersLabel: "Katmanlar",
    ladder: [
      {
        icon: Users,
        title: "Kim neyi onaylıyor?",
        body: "Rol ve yetki net; müşteri onayı ile iç onay ayrılır.",
      },
      {
        icon: Clock,
        title: "Darboğaz görünür",
        body: "48 saattir bekleyen onay hatta parlar — hatırlatma net.",
      },
      {
        icon: UserPlus,
        title: "Ekip büyür, hat kalır",
        body: "Yeni üye gelince rol atanır; süreç bozulmaz.",
      },
    ],
    splitTitle: "İki onay, iki şerit",
    splitLead: "İç ekip ve müşteri onayı birbirine karışmaz.",
    internal: { label: "İç onay", items: ["Editör teslim", "Yönetici kontrol", "Yayına hazır"] },
    client: { label: "Müşteri onayı", items: ["Taslak gönderildi", "Revizyon notu", "Onaylandı ✓"] },
    scenariosTitle: "Gerçek senaryolar",
    scenarios: [
      {
        tag: "Brief → yayın",
        title: "Tek rayda ilerler",
        body: "Hesap yükler, editör üretir, müşteri onaylar — yayın bir tık uzağa.",
        wide: true,
      },
      {
        tag: "Darboğaz",
        title: "48 saat bekleme",
        body: "Müşteri onaylamadı; hat kırmızıya döner, hatırlatma gider.",
        wide: false,
      },
      {
        tag: "Yeni üye",
        title: "Rol atanır",
        body: "Yetki sınırlı gelir; aynı hat, yeni el.",
        wide: false,
      },
    ],
    ctaTitle: "Peşinden koşmayı bırakın.",
    ctaBody: "Onay hattını kurun — sorumluluk ve yayın hızı netleşsin.",
    ctaPrimaryFinal: "İşbirliğine başla",
    ctaSecondaryFinal: "Paketlere bak",
    ctaBullets: [
      "Rol ve yetki tek panelde",
      "Bekleyen onaylar sohbette kaybolmaz",
      "Yeni üye eklenince süreç aynı kalır",
    ],
    stepCount: "adım",
    nowLabel: "şimdi",
    publishLabel: "yayın",
    exploreLabel: "Keşfet",
    ctaEyebrow: "Onay hattı",
    relatedTitle: "İşbirliğiyle birlikte",
    related: [
      {
        href: featureHref("icerik"),
        label: "İçerik",
        body: "Planlanan yayınlar onay hattına düşer.",
        icon: FileText,
        accent: "from-violet-500/15 to-transparent",
      },
      {
        href: featureHref("crm"),
        label: "CRM",
        body: "Müşteri kartında onay geçmişi görünür.",
        icon: UsersRound,
        accent: "from-sky-500/15 to-transparent",
      },
    ],
  },
  en: {
    heroEyebrow: "Team & approvals",
    heroTitle: "Who approves?",
    heroAccent: "The rail shows it.",
    heroLead:
      "Approvals in Slack, files in Drive, tasks in spreadsheets — scatter kills ownership. In Bonero, brief to live runs on one rail.",
    ctaPrimary: "Set up the rail",
    ctaSecondary: "See the rail",
    chaosTitle: "Scattered tools",
    chaosLead: "When everyone works in different places, “who has it?” is inevitable.",
    chaosItems: ["Approval request in Slack", "Revision v3 in Drive", "Task list in Excel", "Client note in email"],
    chaosPains: [
      "Same job tracked in three places",
      "Unclear whose turn to approve",
      "Revision notes lost in chat",
    ],
    chaosQuestion: "Who has it?",
    chaosAnswer: "Scattered tools don’t answer — the rail does.",
    railTitle: "One rail",
    railLead: "Brief → creative → approve → live. Pending work and owner stay clear.",
    ladderTitle: "Ownership ladder",
    ladderLead: "Three layers — separated, scalable.",
    ladderLayersLabel: "Layers",
    ladder: [
      {
        icon: Users,
        title: "Who approves what?",
        body: "Clear roles; client and internal approvals stay separate.",
      },
      {
        icon: Clock,
        title: "Bottlenecks visible",
        body: "48h pending glows on the rail — reminder is obvious.",
      },
      {
        icon: UserPlus,
        title: "Team grows, rail stays",
        body: "New hire gets a role; the process doesn’t break.",
      },
    ],
    splitTitle: "Two approvals, two lanes",
    splitLead: "Internal team and client sign-off never mix.",
    internal: { label: "Internal", items: ["Editor delivers", "Manager review", "Ready to ship"] },
    client: { label: "Client", items: ["Draft sent", "Revision note", "Approved ✓"] },
    scenariosTitle: "Real scenarios",
    scenarios: [
      {
        tag: "Brief → live",
        title: "Moves on one rail",
        body: "Account uploads, editor produces, client approves — publish is one tap away.",
        wide: true,
      },
      {
        tag: "Bottleneck",
        title: "48h waiting",
        body: "Client hasn’t signed off; the rail turns red, reminder goes out.",
        wide: false,
      },
      {
        tag: "New hire",
        title: "Role assigned",
        body: "Scoped permissions; same rail, new hands.",
        wide: false,
      },
    ],
    ctaTitle: "Stop chasing approvals.",
    ctaBody: "Build the rail — ownership and ship speed get clear.",
    ctaPrimaryFinal: "Start collaborating",
    ctaSecondaryFinal: "View plans",
    ctaBullets: [
      "Roles and permissions in one panel",
      "Pending approvals don’t vanish in chat",
      "New teammates without breaking the flow",
    ],
    stepCount: "steps",
    nowLabel: "now",
    publishLabel: "live",
    exploreLabel: "Explore",
    ctaEyebrow: "Team rail",
    relatedTitle: "Works well with",
    related: [
      {
        href: featureHref("icerik"),
        label: "Content",
        body: "Planned posts drop into the approval rail.",
        icon: FileText,
        accent: "from-violet-500/15 to-transparent",
      },
      {
        href: featureHref("crm"),
        label: "CRM",
        body: "Approval history lives on the customer card.",
        icon: UsersRound,
        accent: "from-sky-500/15 to-transparent",
      },
    ],
  },
};

const chaosIcons = [MessageSquare, FolderOpen, FileSpreadsheet, Mail];

function ChaosPanel({
  title,
  lead,
  items,
  pains,
  question,
  answer,
}: {
  title: string;
  lead: string;
  items: string[];
  pains: string[];
  question: string;
  answer: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-bonero-dark/10 bg-[#f4f6f5] p-5 sm:p-6">
      <p className="text-xs font-bold tracking-wide text-bonero-dark/40 uppercase">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">{lead}</p>

      <div className="mt-5 grid flex-1 grid-cols-2 gap-2.5 sm:gap-3">
        {items.map((item, i) => {
          const Icon = chaosIcons[i % chaosIcons.length];
          return (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, ease }}
              className="group relative overflow-hidden rounded-xl border border-bonero-dark/8 bg-white p-3.5 shadow-sm sm:p-4"
            >
              <div className="pointer-events-none absolute -right-3 -top-3 h-14 w-14 rounded-full bg-bonero-dark/[0.03] transition-transform group-hover:scale-110" />
              <Icon size={16} className="text-bonero-dark/30" />
              <p className="mt-2 text-xs font-semibold leading-snug text-bonero-dark/65 sm:text-sm">
                {item}
              </p>
              <span className="mt-2 inline-flex rounded-md bg-red-500/10 px-1.5 py-0.5 text-[10px] font-bold text-red-600/80">
                ?
              </span>
            </motion.div>
          );
        })}
      </div>

      <ul className="mt-5 space-y-2 border-t border-bonero-dark/8 pt-5">
        {pains.map((pain, i) => (
          <motion.li
            key={pain}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.06, ease }}
            className="flex items-start gap-2.5 text-sm text-bonero-dark/55"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/70" />
            {pain}
          </motion.li>
        ))}
      </ul>

      <div className="mt-5 rounded-xl border border-red-500/15 bg-red-50/60 p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600/80">
            <HelpCircle size={18} />
          </span>
          <div>
            <p className="font-heading text-lg text-bonero-dark">{question}</p>
            <p className="mt-1 text-sm text-bonero-dark/50">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OwnershipLadder({
  title,
  lead,
  layersLabel,
  steps,
}: {
  title: string;
  lead: string;
  layersLabel: string;
  steps: { icon: typeof Users; title: string; body: string }[];
}) {
  return (
    <section className="border-y border-bonero-dark/6 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-10 xl:gap-14">
          {/* Sol — başlık + dikey merdiven görseli (boş alanı doldurur) */}
          <div className="flex flex-col">
            <Reveal>
              <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">{title}</h2>
              <p className="mt-2 text-sm text-bonero-dark/55 sm:text-base">{lead}</p>
            </Reveal>

            <div className="relative mt-8 flex flex-1 flex-col rounded-2xl border border-bonero-dark/8 bg-[#f8faf9] p-5 sm:p-6 lg:mt-10 lg:min-h-[18rem]">
              <p className="text-[10px] font-bold tracking-[0.14em] text-bonero-dark/35 uppercase">
                {layersLabel}
              </p>
              <div className="relative mt-5 flex flex-1 flex-col justify-between py-1">
                <div className="absolute top-2 bottom-2 left-[1.15rem] w-0.5 rounded-full bg-gradient-to-b from-bonero-dark/10 via-bonero-green/35 to-bonero-green" />
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  const isLast = i === steps.length - 1;
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, ease }}
                      className="relative flex items-center gap-4"
                    >
                      <span
                        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
                          isLast
                            ? "border-bonero-green bg-bonero-green text-white shadow-[0_0_0_4px_rgba(24,131,71,0.15)]"
                            : "border-bonero-dark/12 bg-white text-bonero-dark"
                        }`}
                      >
                        <Icon size={15} />
                      </span>
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] font-bold text-bonero-dark/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p
                          className={`truncate text-sm font-semibold ${
                            isLast ? "text-bonero-green" : "text-bonero-dark/70"
                          }`}
                        >
                          {step.title}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sağ — eşit yükseklikte kartlar, alttan yukarı basamak */}
          <div className="flex flex-col justify-end gap-3 sm:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;
              return (
                <Reveal key={step.title} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2, ease }}
                    style={{ marginLeft: `${i * 12}px` }}
                    className={`relative rounded-2xl border p-5 sm:p-6 ${
                      isLast
                        ? "border-bonero-green/30 bg-gradient-to-br from-bonero-green/[0.1] to-white shadow-[0_12px_40px_rgba(24,131,71,0.1)]"
                        : "border-bonero-dark/10 bg-white"
                    }`}
                  >
                    <div className="flex gap-4 sm:gap-5">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isLast
                            ? "bg-bonero-green text-white"
                            : "border border-bonero-dark/8 bg-[#f8faf9] text-bonero-dark"
                        }`}
                      >
                        <Icon size={18} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[10px] font-bold text-bonero-dark/30">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-heading text-lg text-bonero-dark sm:text-xl">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">{step.body}</p>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function DualApprovalLanes({
  title,
  lead,
  internal,
  client,
  stepCount,
  nowLabel,
  publishLabel,
}: {
  title: string;
  lead: string;
  internal: { label: string; items: string[] };
  client: { label: string; items: string[] };
  stepCount: string;
  nowLabel: string;
  publishLabel: string;
}) {
  const lanes = [
    { ...internal, tone: "internal" as const, icon: Shield },
    { ...client, tone: "client" as const, icon: UserCheck },
  ];

  return (
    <section className="bg-[#f4f6f5] py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-xl">
          <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-bonero-dark/55 sm:text-base">{lead}</p>
        </Reveal>

        <div className="relative mt-10">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            {lanes.map((lane, li) => {
              const LaneIcon = lane.icon;
              const isClient = lane.tone === "client";
              return (
                <Reveal key={lane.label} delay={li * 0.08}>
                  <div
                    className={`relative rounded-2xl border p-5 sm:p-6 ${
                      isClient
                        ? "border-amber-500/25 bg-gradient-to-b from-amber-50 to-white"
                        : "border-bonero-dark/10 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p
                        className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase ${
                          isClient ? "text-amber-700/80" : "text-bonero-dark/50"
                        }`}
                      >
                        <LaneIcon size={13} />
                        {lane.label}
                      </p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isClient ? "bg-amber-500/15 text-amber-700" : "bg-bonero-dark/5 text-bonero-dark/45"
                        }`}
                      >
                        {lane.items.length} {stepCount}
                      </span>
                    </div>

                    <div className="relative mt-6 space-y-0">
                      <div
                        className={`absolute top-3 bottom-3 left-[0.65rem] w-0.5 rounded-full ${
                          isClient ? "bg-amber-400/40" : "bg-bonero-dark/10"
                        }`}
                      />
                      {lane.items.map((item, i) => {
                        const done = i < lane.items.length - 1;
                        const active = i === lane.items.length - 1;
                        return (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, ease }}
                            className={`relative flex items-center gap-3 py-2.5 pl-0 ${
                              active ? "rounded-lg bg-bonero-green/[0.06] px-2 -mx-2" : ""
                            }`}
                          >
                            <span
                              className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                                done
                                  ? isClient
                                    ? "border-amber-500 bg-amber-500 text-white"
                                    : "border-bonero-green bg-bonero-green text-white"
                                  : active
                                    ? isClient
                                      ? "border-amber-500 bg-white"
                                      : "border-bonero-green bg-white"
                                    : "border-bonero-dark/15 bg-white"
                              }`}
                            >
                              {done && <Check size={10} strokeWidth={3} />}
                            </span>
                            <span
                              className={`text-sm ${
                                active
                                  ? "font-semibold text-bonero-dark"
                                  : "text-bonero-dark/60"
                              }`}
                            >
                              {item}
                            </span>
                            {active && (
                              <span className="ml-auto text-[10px] font-bold tracking-wide text-bonero-green uppercase">
                                {nowLabel}
                              </span>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="pointer-events-none absolute -bottom-4 left-1/2 hidden -translate-x-1/2 sm:block">
            <div className="flex flex-col items-center">
              <div className="h-6 w-px bg-bonero-dark/15" />
              <span className="rounded-full border border-bonero-green/30 bg-white px-3 py-1 text-[10px] font-bold tracking-wide text-bonero-green uppercase shadow-sm">
                {publishLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RelatedFeatures({
  title,
  items,
  exploreLabel,
}: {
  title: string;
  items: {
    href: string;
    label: string;
    body: string;
    icon: typeof FileText;
    accent: string;
  }[];
  exploreLabel: string;
}) {
  return (
    <section className="border-t border-bonero-dark/6 bg-[#f8faf9] py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold tracking-wide text-bonero-dark/40 uppercase">{title}</p>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {items.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.href} delay={i * 0.06}>
                <Link
                  href={r.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white transition-all hover:border-bonero-dark/18 hover:shadow-[0_16px_48px_rgba(30,41,59,0.08)]"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${r.accent} via-bonero-green/20 to-transparent`} />
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-bonero-dark/8 bg-[#f8faf9] text-bonero-dark/55 transition-colors group-hover:border-bonero-green/25 group-hover:text-bonero-green">
                        <Icon size={20} />
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-bonero-dark/20 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bonero-green"
                      />
                    </div>
                    <h3 className="font-heading mt-4 text-xl text-bonero-dark group-hover:text-bonero-green">
                      {r.label}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-bonero-dark/50">{r.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-bonero-green opacity-0 transition-opacity group-hover:opacity-100">
                      {exploreLabel}
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CollabClosingCta({
  eyebrow,
  title,
  body,
  bullets,
  primaryLabel,
  secondaryLabel,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-bonero-dark/10 bg-white shadow-[0_24px_64px_rgba(30,41,59,0.08)]">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-bonero-green sm:w-2" />
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 100% 50%, rgba(24,131,71,0.06), transparent 60%)",
            }}
          />

          <div className="relative grid items-center gap-8 p-6 pl-7 sm:p-8 sm:pl-9 lg:grid-cols-[1fr_auto] lg:gap-12 lg:p-10 lg:pl-11">
            <div className="max-w-xl">
              <p className="text-[11px] font-bold tracking-[0.16em] text-bonero-green uppercase">
                {eyebrow}
              </p>
              <h2 className="font-heading mt-2 text-2xl tracking-wide text-bonero-dark sm:text-3xl">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-bonero-dark/55 sm:text-base">{body}</p>
              <ul className="mt-6 space-y-2">
                {bullets.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, ease }}
                    className="flex items-start gap-2.5 text-sm text-bonero-dark/65"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bonero-green/10">
                      <Check size={11} className="text-bonero-green" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <CtaButton
                href={PANEL_REGISTER_URL}
                variant="primary"
                size="lg"
                className="justify-center"
                icon={<ArrowUpRight size={16} />}
              >
                {primaryLabel}
              </CtaButton>
              <CtaButton href="/paketler" variant="secondary" size="lg" className="justify-center">
                {secondaryLabel}
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function CollabFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const t = copy[locale];
  const [scenario, setScenario] = useState(0);
  const scenarioRef = useRef<HTMLDivElement>(null);
  const [scenarioInView, setScenarioInView] = useState(false);

  useEffect(() => {
    const el = scenarioRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setScenarioInView(e.isIntersecting), {
      threshold: 0.3,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!scenarioInView) return;
    const id = window.setInterval(
      () => setScenario((p) => (p + 1) % t.scenarios.length),
      SCENARIO_HOLD,
    );
    return () => clearInterval(id);
  }, [scenarioInView, t.scenarios.length]);

  return (
    <div className="bg-background">
      {/* ── Dark hero — farklı ton, gelen kutusunun açık gradient’inden ayrı ── */}
      <section className="relative overflow-hidden bg-bonero-dark text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(24,131,71,0.35), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(255,255,255,0.06), transparent 50%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 48px)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/45 hover:text-white"
          >
            <ArrowLeft size={14} />
            {isEn ? "All features" : "Tüm özellikler"}
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease }}
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-bold tracking-[0.14em] text-white/70 uppercase"
              >
                <Users size={12} />
                {t.heroEyebrow}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06, ease }}
                className="font-heading mt-5 text-3xl tracking-wide sm:text-4xl lg:text-[2.85rem] lg:leading-[1.08]"
              >
                {t.heroTitle}
                <span className="mt-1 block text-bonero-green">{t.heroAccent}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14, ease }}
                className="mt-5 max-w-md text-base leading-relaxed text-white/60 sm:text-lg"
              >
                {t.heroLead}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, ease }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  href={PANEL_REGISTER_URL}
                  className="inline-flex items-center gap-2 rounded-lg bg-bonero-green px-5 py-3 text-sm font-semibold text-white hover:bg-bonero-green/90"
                >
                  {t.ctaPrimary}
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href="#ray"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-medium text-white/75 hover:border-white/35 hover:text-white"
                >
                  {t.ctaSecondary}
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.12, ease }}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-5"
            >
              <CollabMock active isEn={isEn} variant="pipeline" />
            </motion.div>
          </div>
        </div>

        {/* Diagonal cut to light section */}
        <div
          className="h-12 bg-background sm:h-16"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* ── Chaos → Rail contrast ── */}
      <section className="relative -mt-1 bg-background pb-14 pt-4 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <Reveal>
              <ChaosPanel
                title={t.chaosTitle}
                lead={t.chaosLead}
                items={t.chaosItems}
                pains={t.chaosPains}
                question={t.chaosQuestion}
                answer={t.chaosAnswer}
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div
                id="ray"
                className="flex h-full scroll-mt-24 flex-col rounded-2xl border-2 border-bonero-green/25 bg-bonero-green/[0.04] p-5 sm:p-6"
              >
                <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">
                  {t.railTitle}
                </p>
                <p className="mt-2 text-sm text-bonero-dark/60">{t.railLead}</p>
                <div className="mt-5 flex-1 rounded-xl border border-bonero-dark/8 bg-white p-4 shadow-sm">
                  <CollabMock active isEn={isEn} variant="compact" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <OwnershipLadder
        title={t.ladderTitle}
        lead={t.ladderLead}
        layersLabel={t.ladderLayersLabel}
        steps={t.ladder}
      />

      <DualApprovalLanes
        title={t.splitTitle}
        lead={t.splitLead}
        internal={t.internal}
        client={t.client}
        stepCount={t.stepCount}
        nowLabel={t.nowLabel}
        publishLabel={t.publishLabel}
      />

      {/* ── Scenarios — bento, otomatik geçiş ── */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.scenariosTitle}
            </h2>
          </Reveal>

          <div
            ref={scenarioRef}
            className="mt-8"
            onMouseEnter={() => setScenarioInView(false)}
            onMouseLeave={() => setScenarioInView(true)}
          >
            <div className="flex flex-wrap gap-2">
              {t.scenarios.map((s, i) => (
                <button
                  key={s.tag}
                  type="button"
                  onClick={() => setScenario(i)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                    scenario === i
                      ? "bg-bonero-dark text-white"
                      : "border border-bonero-dark/10 text-bonero-dark/50 hover:border-bonero-dark/20"
                  }`}
                >
                  {s.tag}
                </button>
              ))}
            </div>

            <div className="relative mt-4 overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white">
              <motion.div
                key={scenario}
                className="absolute bottom-0 left-0 h-0.5 bg-bonero-green"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: SCENARIO_HOLD / 1000, ease: "linear" }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={scenario}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease }}
                  className="p-6 sm:p-8"
                >
                  <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">
                    {t.scenarios[scenario].tag}
                  </p>
                  <h3 className="font-heading mt-2 text-2xl text-bonero-dark">
                    {t.scenarios[scenario].title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-bonero-dark/55">
                    {t.scenarios[scenario].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <RelatedFeatures title={t.relatedTitle} items={t.related} exploreLabel={t.exploreLabel} />

      <CollabClosingCta
        eyebrow={t.ctaEyebrow}
        title={t.ctaTitle}
        body={t.ctaBody}
        bullets={t.ctaBullets}
        primaryLabel={t.ctaPrimaryFinal}
        secondaryLabel={t.ctaSecondaryFinal}
      />
    </div>
  );
}
