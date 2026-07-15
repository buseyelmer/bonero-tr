"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Bot,
  LayoutDashboard,
  Megaphone,
  Search,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { pickL } from "@/lib/locale-copy";
import {
  HELP_ARTICLES,
  HELP_CATEGORIES,
  helpArticleHref,
  helpArticleMatchesQuery,
  type HelpCategoryId,
} from "@/lib/help";

const ICONS: Record<HelpCategoryId, LucideIcon> = {
  baslangic: Zap,
  omnichannel: LayoutDashboard,
  "yapay-zeka": Bot,
  reklam: Megaphone,
  operasyon: BookOpen,
};

const copy = {
  tr: {
    eyebrow: "Yardım Merkezi",
    h1: "Size nasıl",
    h1Accent: "yardımcı olabiliriz?",
    lead: "Kurulumdan operasyona — makaleleri arayın veya kategori seçin.",
    searchLabel: "Makale ara",
    searchPlaceholder: "Aramaya başlayın…",
    articles: "makale",
    comingSoon: "Yakında",
    allArticles: "Tüm makaleler",
    searchResults: "Arama sonuçları",
    noResults: "Sonuç bulunamadı. Başka bir kelime deneyin.",
    minRead: "dk",
  },
  en: {
    eyebrow: "Help Center",
    h1: "How can we",
    h1Accent: "help you?",
    lead: "From setup to operations — search articles or pick a category.",
    searchLabel: "Search articles",
    searchPlaceholder: "Start typing…",
    articles: "articles",
    comingSoon: "Coming soon",
    allArticles: "All articles",
    searchResults: "Search results",
    noResults: "No results. Try another keyword.",
    minRead: "min",
  },
};

export default function HelpHub() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return HELP_ARTICLES;
    return HELP_ARTICLES.filter((a) => helpArticleMatchesQuery(a, query));
  }, [q]);

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(24,131,71,0.1), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.eyebrow}
          </p>
          <h1 className="font-heading mt-4 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
            {t.h1}{" "}
            <span className="text-bonero-green">{t.h1Accent}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-bonero-dark/55">
            {t.lead}
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-8">
          <label className="relative mx-auto block max-w-xl text-left">
            <span className="sr-only">{t.searchLabel}</span>
            <Search
              size={18}
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-bonero-dark/35"
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-2xl border border-bonero-dark/10 bg-white py-3.5 pr-4 pl-12 text-sm text-bonero-dark shadow-[0_12px_40px_rgba(30,41,59,0.06)] outline-none ring-bonero-green/30 placeholder:text-bonero-dark/35 focus:ring-2"
            />
          </label>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HELP_CATEGORIES.map((cat, i) => {
            const Icon = ICONS[cat.id];
            const count = HELP_ARTICLES.filter((a) => a.category === cat.id)
              .length;
            const first = HELP_ARTICLES.find((a) => a.category === cat.id);
            const href = first
              ? helpArticleHref(first.slug)
              : "/yardim#makaleler";
            return (
              <Reveal key={cat.id} delay={i * 0.04}>
                <li>
                  <Link
                    href={href}
                    className="group flex h-full flex-col rounded-2xl border border-bonero-dark/8 bg-white p-6 shadow-sm transition-colors hover:border-bonero-green/30 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green transition-colors group-hover:bg-bonero-green group-hover:text-white">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <h2 className="font-heading mt-4 text-lg text-bonero-dark">
                      {pickL(cat.title, locale)}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-bonero-dark/50">
                      {pickL(cat.description, locale)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-bonero-green">
                      {count > 0 ? `${count} ${t.articles}` : t.comingSoon}
                      <ArrowUpRight size={12} />
                    </span>
                  </Link>
                </li>
              </Reveal>
            );
          })}
        </ul>

        <div id="makaleler" className="mt-16 scroll-mt-28">
          <h2 className="font-heading text-xl text-bonero-dark sm:text-2xl">
            {q.trim() ? t.searchResults : t.allArticles}
          </h2>
          <ul className="mt-6 divide-y divide-bonero-dark/8 border-y border-bonero-dark/8">
            {results.length === 0 ? (
              <li className="py-8 text-sm text-bonero-dark/50">
                {t.noResults}
              </li>
            ) : (
              results.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={helpArticleHref(article.slug)}
                    className="group flex flex-col gap-1 py-5 transition-colors sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-heading text-base text-bonero-dark group-hover:text-bonero-green">
                        {pickL(article.title, locale)}
                      </p>
                      <p className="mt-1 text-sm text-bonero-dark/50">
                        {pickL(article.description, locale)}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-bonero-dark/40">
                      {article.readingMinutes} {t.minRead}
                    </span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
