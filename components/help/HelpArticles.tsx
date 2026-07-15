"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { pickL } from "@/lib/locale-copy";
import {
  HELP_ARTICLES,
  HELP_CATEGORIES,
  getHelpCategory,
  helpArticleHref,
  type HelpArticle,
} from "@/lib/help";

const copy = {
  tr: {
    eyebrow: "Makaleler",
    title: "Programı adım adım öğrenin",
    lead: "Yardım Merkezi, Bonero’nun tamamını kullanmayı öğretmeniz için makalelerle büyür. Aşağıda ilk rehberler var — kategoriye göre de gezebilirsiniz.",
    minRead: "dk",
  },
  en: {
    eyebrow: "Articles",
    title: "Learn the platform step by step",
    lead: "The Help Center grows with articles to teach you all of Bonero. First guides are below — browse by category too.",
    minRead: "min",
  },
};

function ArticleRow({
  article,
  locale,
  minRead,
}: {
  article: HelpArticle;
  locale: "tr" | "en";
  minRead: string;
}) {
  const category = getHelpCategory(article.category);

  return (
    <Link
      href={helpArticleHref(article.slug)}
      className="group flex flex-col gap-3 border-b border-bonero-dark/8 py-6 transition-colors last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:py-7"
    >
      <div className="min-w-0 flex-1">
        {category && (
          <p className="text-[11px] font-semibold tracking-[0.14em] text-bonero-green uppercase">
            {pickL(category.title, locale)}
          </p>
        )}
        <h3 className="font-heading mt-1.5 text-xl text-bonero-dark transition-colors group-hover:text-bonero-green sm:text-2xl">
          {pickL(article.title, locale)}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
          {pickL(article.description, locale)}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3 text-sm text-bonero-dark/40">
        <span className="inline-flex items-center gap-1.5">
          <Clock size={14} />
          {article.readingMinutes} {minRead}
        </span>
        <ArrowRight
          size={16}
          className="text-bonero-dark/25 transition-transform group-hover:translate-x-0.5 group-hover:text-bonero-green"
        />
      </div>
    </Link>
  );
}

export default function HelpArticles() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section
      id="makaleler"
      className="relative scroll-mt-24 border-t border-bonero-dark/8 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-bonero-green uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-bonero-dark/55">
            {t.lead}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {HELP_CATEGORIES.map((cat) => {
            const count = HELP_ARTICLES.filter(
              (a) => a.category === cat.id,
            ).length;
            return (
              <a
                key={cat.id}
                href={`#makaleler`}
                className="inline-flex items-center gap-2 rounded-full border border-bonero-dark/10 bg-bonero-dark/[0.02] px-3.5 py-1.5 text-sm text-bonero-dark/70 transition-colors hover:border-bonero-green/30 hover:text-bonero-green"
              >
                {pickL(cat.title, locale)}
                <span className="font-mono text-[11px] text-bonero-dark/35">
                  {count}
                </span>
              </a>
            );
          })}
        </div>

        <div className="mt-4 border-t border-bonero-dark/8">
          {HELP_ARTICLES.map((article) => (
            <ArticleRow
              key={article.slug}
              article={article}
              locale={locale}
              minRead={t.minRead}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
