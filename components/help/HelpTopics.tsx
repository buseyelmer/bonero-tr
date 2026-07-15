"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Bot,
  LayoutDashboard,
  Megaphone,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { pickL } from "@/lib/locale-copy";
import {
  HELP_CATEGORIES,
  HELP_ARTICLES,
  helpArticleHref,
  type HelpCategoryId,
} from "@/lib/help";

const copy = {
  tr: {
    eyebrow: "Konular",
    title: "Ne öğrenmek istiyorsunuz?",
    lead: "Kategoriler, Bonero’nun tamamını kapsayacak şekilde büyür. Makalesi hazır olanlara gidin; diğerleri sırayla dolacak.",
    articles: "makale",
    comingSoon: "Yakında",
  },
  en: {
    eyebrow: "Topics",
    title: "What do you want to learn?",
    lead: "Categories grow to cover all of Bonero. Jump to ready articles; the rest are on the way.",
    articles: "articles",
    comingSoon: "Coming soon",
  },
};

const ICONS: Record<HelpCategoryId, LucideIcon> = {
  baslangic: Zap,
  omnichannel: LayoutDashboard,
  "yapay-zeka": Bot,
  reklam: Megaphone,
  operasyon: BookOpen,
};

export default function HelpTopics() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section
      id="konular"
      className="relative scroll-mt-24 border-t border-bonero-dark/8 bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-xl">
          <p className="text-sm font-medium tracking-wide text-bonero-green uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-bonero-dark/55">
            {t.lead}
          </p>
        </Reveal>

        <ul className="mt-12 divide-y divide-bonero-dark/8 border-y border-bonero-dark/8">
          {HELP_CATEGORIES.map((cat, i) => {
            const Icon = ICONS[cat.id];
            const articles = HELP_ARTICLES.filter((a) => a.category === cat.id);
            const first = articles[0];
            const href = first
              ? helpArticleHref(first.slug)
              : "/yardim#makaleler";
            const index = String(i + 1).padStart(2, "0");

            return (
              <li key={cat.id}>
                <Reveal delay={i * 0.04}>
                  <Link
                    href={href}
                    className="group flex items-start gap-4 py-5 transition-colors sm:items-center sm:gap-6 sm:py-6"
                  >
                    <span className="font-mono text-xs font-medium tabular-nums text-bonero-green/80 sm:w-8">
                      {index}
                    </span>
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green transition-colors group-hover:bg-bonero-green group-hover:text-white sm:mt-0">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-heading text-lg text-bonero-dark transition-colors group-hover:text-bonero-green">
                          {pickL(cat.title, locale)}
                        </h3>
                        <span className="rounded-full bg-bonero-dark/[0.05] px-2 py-0.5 text-[10px] font-semibold text-bonero-dark/45">
                          {articles.length > 0
                            ? `${articles.length} ${t.articles}`
                            : t.comingSoon}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-bonero-dark/55">
                        {pickL(cat.description, locale)}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="mt-1 shrink-0 text-bonero-dark/25 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bonero-green sm:mt-0"
                    />
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
