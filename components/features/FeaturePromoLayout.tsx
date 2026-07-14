"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  CalendarCheck,
  Check,
  FileText,
  LayoutDashboard,
  Mail,
  Megaphone,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import AppointmentMock from "@/components/features/mocks/AppointmentMock";
import AdsMock from "@/components/features/mocks/AdsMock";
import AiAgentMock from "@/components/features/mocks/AiAgentMock";
import ContentMock from "@/components/features/mocks/ContentMock";
import CrmMock from "@/components/features/mocks/CrmMock";
import EmailMarketingMock from "@/components/features/mocks/EmailMarketingMock";
import OmnichannelMock from "@/components/features/mocks/OmnichannelMock";
import ReportingMock from "@/components/features/mocks/ReportingMock";
import {
  FEATURE_PAGES,
  featureHref,
  type FeaturePageContent,
  type FeatureSlug,
} from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ICONS: Record<FeatureSlug, LucideIcon> = {
  "gelen-kutusu": LayoutDashboard,
  "yapay-zeka": Bot,
  "ai-reklam": Megaphone,
  isbirligi: Users,
  crm: UsersRound,
  randevu: CalendarCheck,
  icerik: FileText,
  "email-marketing": Mail,
  raporlama: BarChart3,
};

const ACCENTS: Record<FeatureSlug, string> = {
  "gelen-kutusu": "#25D366",
  "yapay-zeka": "#188347",
  "ai-reklam": "#F59E0B",
  isbirligi: "#0EA5E9",
  crm: "#0F766E",
  randevu: "#D97706",
  icerik: "#BE185D",
  "email-marketing": "#0284C7",
  raporlama: "#2DB56A",
};

const copy = {
  tr: {
    back: "Tüm özellikler",
    cta: "Hemen Başlayın",
    secondary: "Paketlere bak",
    howEyebrow: "Nasıl işe yarar",
    howTitle: "Üç katmanda netleşir",
    scenarioEyebrow: "Günlük kullanım",
    scenarioTitle: "Gerçek anlarda böyle akar",
    outcome: "Sonuç",
    midEyebrow: "Hazır mısınız?",
    midTitle: "Bu özelliği kendi operasyonunuzda deneyin.",
    midBody: "Kayıt olun, kurulum ~15 dk sürer. Kanallar bağlanınca panel canlıdır.",
    finalEyebrow: "Hemen başla",
    finalTitle: "Tek panel. Daha hızlı yanıt.",
    finalBody:
      "Hesap açın; Unified Inbox ve AI araçlarıyla aynı gün kullanmaya başlayın.",
    explore: "Keşfetmeye devam",
    more: "Detayı aç",
  },
  en: {
    back: "All features",
    cta: "Get Started",
    secondary: "View plans",
    howEyebrow: "How it works",
    howTitle: "Clear in three layers",
    scenarioEyebrow: "Daily use",
    scenarioTitle: "This is how it shows up",
    outcome: "Outcome",
    midEyebrow: "Ready?",
    midTitle: "Try this feature in your own ops.",
    midBody: "Sign up — setup takes ~15 min. Once channels connect, you're live.",
    finalEyebrow: "Get started",
    finalTitle: "One panel. Faster replies.",
    finalBody:
      "Create an account and start using Unified Inbox and AI the same day.",
    explore: "Keep exploring",
    more: "Open detail",
  },
};

function CtaPrimary({ label }: { label: string }) {
  return (
    <Link
      href={PANEL_REGISTER_URL}
      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-bonero-green/20 transition-colors hover:bg-bonero-green/90"
    >
      {label}
      <ArrowUpRight
        size={16}
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

function CtaSecondary({ label }: { label: string }) {
  return (
    <Link
      href="/paketler"
      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-bonero-dark/12 bg-white/80 px-5 py-3 text-sm font-medium text-bonero-dark/70 transition-colors hover:border-bonero-dark/20 hover:text-bonero-dark"
    >
      {label}
      <ArrowRight size={15} />
    </Link>
  );
}

function NarrativeBlock({
  index,
  title,
  body,
  accent,
  reverse,
}: {
  index: number;
  title: string;
  body: string;
  accent: string;
  reverse: boolean;
}) {
  return (
    <Reveal>
      <div
        className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div
          className="relative min-h-[220px] overflow-hidden rounded-[1.5rem] border border-bonero-dark/8 bg-[#f3f6f4] p-6 sm:min-h-[260px] sm:p-8"
          style={{
            backgroundImage: `radial-gradient(ellipse 70% 60% at 80% 0%, ${accent}22, transparent 55%)`,
          }}
        >
          <span className="font-mono text-6xl font-bold leading-none text-bonero-dark/[0.06] sm:text-7xl">
            {String(index).padStart(2, "0")}
          </span>
          <div className="absolute right-6 bottom-6 left-6 rounded-2xl border border-bonero-dark/8 bg-white/95 p-4 shadow-sm backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bonero-green text-white">
                <Check size={14} strokeWidth={2.5} />
              </span>
              <p className="text-sm font-semibold leading-snug text-bonero-dark">
                {title}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: accent }}
          >
            {String(index).padStart(2, "0")}
          </p>
          <h3 className="font-heading mt-3 text-2xl tracking-wide text-bonero-dark sm:text-3xl">
            {title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
            {body}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function FeaturePromoLayout({
  feature,
}: {
  feature: FeaturePageContent;
}) {
  const { locale } = useLocale();
  const t = copy[locale];
  const isEn = locale === "en";
  const Icon = ICONS[feature.slug];
  const accent = ACCENTS[feature.slug];
  const valuePoints = isEn ? feature.valuePointsEn : feature.valuePoints;
  const scenarios = isEn ? feature.scenariosEn : feature.scenarios;
  const others = FEATURE_PAGES.filter((f) => f.slug !== feature.slug);

  return (
    <div className="bg-background">
      {/* ── Hero + CTA 1 ── */}
      <section className="relative overflow-x-clip pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background: `radial-gradient(ellipse 55% 50% at 88% 20%, ${accent}18, transparent 55%), radial-gradient(ellipse 40% 35% at 8% 90%, rgba(30,41,59,0.04), transparent 50%)`,
          }}
        />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-bonero-dark/45 transition-colors hover:text-bonero-dark"
          >
            <ArrowLeft size={14} />
            {t.back}
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="max-w-xl">
              <p
                className="text-sm font-medium tracking-wide uppercase"
                style={{ color: accent }}
              >
                {isEn ? feature.eyebrowEn : feature.eyebrow}
              </p>
              <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.65rem]">
                {isEn ? feature.titleEn : feature.title}
              </h1>
              <p className="mt-4 text-lg font-semibold leading-snug text-bonero-dark/80 sm:text-xl">
                {isEn ? feature.headlineEn : feature.headline}
              </p>
              <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
                {isEn ? feature.leadEn : feature.lead}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <CtaPrimary label={t.cta} />
                <CtaSecondary label={t.secondary} />
              </div>
            </div>

            <div
              className="relative min-h-[280px] overflow-hidden rounded-[1.5rem] border border-bonero-dark/8 bg-white p-5 shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:min-h-[360px] sm:p-6"
              style={{
                background: `linear-gradient(145deg, #ffffff 0%, #f3f6f4 100%)`,
              }}
              role="img"
              aria-label={isEn ? feature.mockCaptionEn : feature.mockCaption}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 80% 0%, ${accent}20, transparent 55%)`,
                }}
                aria-hidden
              />
              {feature.slug === "raporlama" ? (
                <div className="relative h-full min-h-[300px]">
                  <ReportingMock active isEn={isEn} />
                </div>
              ) : feature.slug === "crm" ? (
                <div className="relative h-full min-h-[300px]">
                  <CrmMock active isEn={isEn} />
                </div>
              ) : feature.slug === "randevu" ? (
                <div className="relative h-full min-h-[300px]">
                  <AppointmentMock active isEn={isEn} />
                </div>
              ) : feature.slug === "icerik" ? (
                <div className="relative h-full min-h-[300px]">
                  <ContentMock active isEn={isEn} />
                </div>
              ) : feature.slug === "ai-reklam" ? (
                <div className="relative h-full min-h-[300px]">
                  <AdsMock active isEn={isEn} />
                </div>
              ) : feature.slug === "yapay-zeka" ? (
                <div className="relative h-full min-h-[300px]">
                  <AiAgentMock active isEn={isEn} />
                </div>
              ) : feature.slug === "gelen-kutusu" ? (
                <div className="relative h-full min-h-[300px]">
                  <OmnichannelMock active isEn={isEn} />
                </div>
              ) : feature.slug === "email-marketing" ? (
                <div className="relative h-full min-h-[300px]">
                  <EmailMarketingMock active isEn={isEn} />
                </div>
              ) : (
                <div className="relative flex h-full min-h-[240px] flex-col justify-between p-1 sm:p-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md"
                      style={{ backgroundColor: accent }}
                    >
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-bonero-dark">
                        {isEn ? feature.navLabelEn : feature.navLabel}
                      </p>
                      <p className="text-[11px] text-bonero-dark/40">
                        {isEn ? feature.mockCaptionEn : feature.mockCaption}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 rounded-2xl border border-bonero-green/20 bg-bonero-green/5 px-4 py-3">
                    <p className="text-[10px] font-bold tracking-wide text-bonero-green uppercase">
                      {t.outcome}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-bonero-dark">
                      {isEn ? feature.outcomeEn : feature.outcome}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 narratives ── */}
      <section className="border-t border-bonero-dark/6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              {t.howEyebrow}
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {t.howTitle}
            </h2>
          </Reveal>

          <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
            {valuePoints.slice(0, 3).map((vp, i) => (
              <NarrativeBlock
                key={vp.title}
                index={i + 1}
                title={vp.title}
                body={vp.body}
                accent={accent}
                reverse={i % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA 2 ── */}
      <section
        className="relative overflow-hidden border-y border-bonero-dark/6 py-14 sm:py-16"
        style={{
          background:
            "linear-gradient(180deg, #f4f7f5 0%, #eef3f0 50%, #f7f9f8 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32"
          style={{
            background: `radial-gradient(ellipse 50% 80% at 50% 0%, ${accent}22, transparent)`,
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              {t.midEyebrow}
            </p>
            <h2 className="font-heading mt-3 text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.midTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-bonero-dark/55">
              {t.midBody}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <CtaPrimary label={t.cta} />
              <CtaSecondary label={t.secondary} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Scenarios reinforce ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              {t.scenarioEyebrow}
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {t.scenarioTitle}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {scenarios.slice(0, 3).map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div
                  className="h-full rounded-2xl border border-bonero-dark/8 bg-white px-5 py-5"
                  style={{ borderLeftWidth: 3, borderLeftColor: `${accent}99` }}
                >
                  <p className="text-xs font-bold tracking-wide uppercase" style={{ color: accent }}>
                    {s.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA 3 ── */}
      <section className="border-t border-bonero-dark/6 bg-bonero-dark py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-wide text-white/40 uppercase">
            {t.finalEyebrow}
          </p>
          <h2 className="font-heading mt-3 text-2xl tracking-wide text-white sm:text-3xl">
            {t.finalTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/50">
            {t.finalBody}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={PANEL_REGISTER_URL}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a9a52]"
            >
              {t.cta}
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              {isEn ? "Contact us" : "İletişime geç"}
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-bonero-dark/6 bg-background py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.explore}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {others.map((f) => {
              const FIcon = ICONS[f.slug];
              return (
                <Link
                  key={f.slug}
                  href={featureHref(f.slug)}
                  className="inline-flex items-center gap-2 rounded-full border border-bonero-dark/10 bg-white px-4 py-2 text-sm font-semibold text-bonero-dark/65 transition-colors hover:border-bonero-green/30 hover:text-bonero-green"
                >
                  <FIcon size={14} strokeWidth={1.75} />
                  {isEn ? f.navLabelEn : f.navLabel}
                </Link>
              );
            })}
            <Link
              href="/features"
              className="inline-flex items-center gap-1 rounded-full border border-bonero-green/25 bg-bonero-green/5 px-4 py-2 text-sm font-semibold text-bonero-green"
            >
              {t.back}
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
