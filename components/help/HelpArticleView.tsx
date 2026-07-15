"use client";

import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { pickL } from "@/lib/locale-copy";
import {
  getHelpCategory,
  helpArticleHref,
  HELP_ARTICLES,
  resolveHelpBlocks,
  type HelpArticle,
  type ResolvedHelpBlock,
} from "@/lib/help";

const copy = {
  tr: {
    back: "Tüm makaleler",
    readTime: "dk okuma",
    updated: "Güncellendi:",
    tip: "İpucu",
    continue: "Devam edin",
  },
  en: {
    back: "All articles",
    readTime: "min read",
    updated: "Updated:",
    tip: "Tip",
    continue: "Keep reading",
  },
};

function Block({
  block,
  tipLabel,
}: {
  block: ResolvedHelpBlock;
  tipLabel: string;
}) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-base leading-relaxed text-bonero-dark/65 sm:text-[1.05rem]">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 className="font-heading mt-10 scroll-mt-28 text-2xl tracking-wide text-bonero-dark first:mt-0 sm:text-3xl">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="space-y-2.5 pl-1">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-base leading-relaxed text-bonero-dark/65"
            >
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bonero-green" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2.5">
          {block.items.map((item, i) => (
            <li
              key={item}
              className="flex gap-3 text-base leading-relaxed text-bonero-dark/65"
            >
              <span className="font-mono w-6 shrink-0 text-sm font-semibold text-bonero-green">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <aside className="rounded-2xl border border-bonero-green/20 bg-bonero-green/[0.06] px-5 py-4">
          <p className="text-[10px] font-bold tracking-[0.16em] text-bonero-green uppercase">
            {tipLabel}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-bonero-dark/75 sm:text-base">
            {block.text}
          </p>
        </aside>
      );
    case "steps":
      return (
        <ol className="space-y-4">
          {block.items.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-bonero-dark/8 bg-white p-5 shadow-[0_12px_40px_-28px_rgba(30,41,59,0.35)]"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bonero-green text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-lg text-bonero-dark">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
                    {step.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}

export default function HelpArticleView({
  article,
}: {
  article: HelpArticle;
}) {
  const { locale } = useLocale();
  const t = copy[locale];
  const category = getHelpCategory(article.category);
  const others = HELP_ARTICLES.filter((a) => a.slug !== article.slug).slice(
    0,
    2,
  );
  const updated = new Date(article.updatedAt).toLocaleDateString(
    locale === "tr" ? "tr-TR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
  const body = resolveHelpBlocks(article.body, locale);

  return (
    <article className="bg-background">
      <header className="border-b border-bonero-dark/8 pt-28 pb-12 sm:pt-32 sm:pb-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/yardim#makaleler"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-bonero-dark/45 transition-colors hover:text-bonero-dark"
          >
            <ArrowLeft size={14} />
            {t.back}
          </Link>

          {category && (
            <p className="mt-8 text-sm font-medium tracking-wide text-bonero-green uppercase">
              {pickL(category.title, locale)}
            </p>
          )}
          <h1 className="font-heading mt-3 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.65rem]">
            {pickL(article.title, locale)}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-bonero-dark/55">
            {pickL(article.description, locale)}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-bonero-dark/40">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              {article.readingMinutes} {t.readTime}
            </span>
            <span>
              {t.updated} {updated}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {body.map((block, i) => (
          <Block
            key={`${block.type}-${i}`}
            block={block}
            tipLabel={t.tip}
          />
        ))}
      </div>

      {others.length > 0 && (
        <aside className="border-t border-bonero-dark/8 bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/40 uppercase">
              {t.continue}
            </p>
            <ul className="mt-6 space-y-4">
              {others.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={helpArticleHref(a.slug)}
                    className="group block rounded-2xl border border-bonero-dark/8 px-5 py-4 transition-colors hover:border-bonero-green/30"
                  >
                    <p className="font-heading text-lg text-bonero-dark group-hover:text-bonero-green">
                      {pickL(a.title, locale)}
                    </p>
                    <p className="mt-1 text-sm text-bonero-dark/50">
                      {pickL(a.description, locale)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </article>
  );
}
