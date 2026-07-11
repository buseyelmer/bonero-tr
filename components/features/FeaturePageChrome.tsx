"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import {
  FEATURE_PAGES,
  featureHref,
  type FeaturePageContent,
} from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

export function FeatureBackLink() {
  const { locale } = useLocale();
  return (
    <Link
      href="/features"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-white/45 transition-colors hover:text-white"
    >
      <ArrowLeft size={14} />
      {locale === "en" ? "All features" : "Tüm özellikler"}
    </Link>
  );
}

export function FeatureCtaButton({ className = "" }: { className?: string }) {
  const { locale } = useLocale();
  return (
    <Link
      href={PANEL_REGISTER_URL}
      className={`group inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_-16px_rgba(24,131,71,0.85)] transition-colors hover:bg-[#1a9a52] ${className}`}
    >
      {locale === "en" ? "Get Started" : "Hemen Başlayın"}
      <ArrowUpRight
        size={16}
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

/** Scenarios block — shared rhythm, unique copy per feature */
export function FeatureScenarios({
  feature,
  accent = "border-bonero-green/40",
}: {
  feature: FeaturePageContent;
  accent?: string;
}) {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const scenarios = isEn ? feature.scenariosEn : feature.scenarios;

  return (
    <section className="relative page-pad mx-auto max-w-6xl py-14 sm:py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
        {isEn ? "In the agency day" : "Ajans gününde"}
      </p>
      <h2 className="mt-2 max-w-lg font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {isEn ? "Where it shows up" : "Nerede işe yarar"}
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {scenarios.map((s) => (
          <div
            key={s.label}
            className={`rounded-2xl border border-white/10 border-l-2 bg-white/[0.03] p-5 ${accent}`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-bonero-green">
              {s.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/50">{s.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 max-w-2xl text-sm font-medium text-white/60">
        {isEn ? feature.outcomeEn : feature.outcome}
      </p>
    </section>
  );
}

/** Related features only — primary CTA lives in site Footer */
export function FeatureBottomStrip({
  feature,
}: {
  feature: FeaturePageContent;
}) {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const others = FEATURE_PAGES.filter((f) => f.slug !== feature.slug);

  return (
    <section className="relative border-t border-white/10">
      <div className="page-pad mx-auto max-w-6xl py-12 sm:py-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
          {isEn ? "Keep exploring" : "Keşfetmeye devam"}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {others.map((f) => (
            <Link
              key={f.slug}
              href={featureHref(f.slug)}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white/55 transition-colors hover:border-bonero-green/40 hover:bg-bonero-green/10 hover:text-white"
            >
              {isEn ? f.navLabelEn : f.navLabel}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
