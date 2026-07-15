import type { Locale } from "@/components/LocaleProvider";
import type { L } from "@/lib/locale-copy";
import { pickL, pickLList } from "@/lib/locale-copy";
import { HELP_ARTICLES } from "./help-articles";

export type HelpCategoryId =
  | "baslangic"
  | "omnichannel"
  | "yapay-zeka"
  | "reklam"
  | "operasyon";

export type HelpCategory = {
  id: HelpCategoryId;
  title: L;
  description: L;
};

export type HelpBlock =
  | { type: "p"; text: L }
  | { type: "h2"; text: L }
  | { type: "ul"; items: L[] }
  | { type: "ol"; items: L[] }
  | { type: "tip"; text: L }
  | {
      type: "steps";
      items: { title: L; body: L }[];
    };

export type HelpArticle = {
  slug: string;
  category: HelpCategoryId;
  title: L;
  description: L;
  readingMinutes: number;
  updatedAt: string;
  body: HelpBlock[];
};

export type ResolvedHelpBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; text: string }
  | {
      type: "steps";
      items: { title: string; body: string }[];
    };

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    id: "baslangic",
    title: { tr: "Başlangıç", en: "Getting started" },
    description: {
      tr: "Hesap, kanal bağlama ve ilk gün kurulumu.",
      en: "Account setup, channel connection, and first-day configuration.",
    },
  },
  {
    id: "omnichannel",
    title: { tr: "Omnichannel", en: "Omnichannel" },
    description: {
      tr: "Birleşik gelen kutusu, atama ve yanıt akışı.",
      en: "Unified inbox, assignment, and reply workflow.",
    },
  },
  {
    id: "yapay-zeka",
    title: { tr: "AI Agent", en: "AI Agent" },
    description: {
      tr: "Otomatik yanıt, yönlendirme ve kurallar.",
      en: "Auto-replies, routing, and rules.",
    },
  },
  {
    id: "reklam",
    title: { tr: "Reklam & içerik", en: "Ads & content" },
    description: {
      tr: "Kampanya, kreatif ve yayın yönetimi.",
      en: "Campaigns, creatives, and publishing.",
    },
  },
  {
    id: "operasyon",
    title: { tr: "Operasyon", en: "Operations" },
    description: {
      tr: "CRM, randevu, raporlama ve ekip rolleri.",
      en: "CRM, appointments, reporting, and team roles.",
    },
  },
];

export { HELP_ARTICLES };

export const HELP_ARTICLE_SLUGS = HELP_ARTICLES.map((a) => a.slug);

export function resolveHelpBlock(
  block: HelpBlock,
  locale: Locale,
): ResolvedHelpBlock {
  switch (block.type) {
    case "p":
    case "h2":
    case "tip":
      return { type: block.type, text: pickL(block.text, locale) };
    case "ul":
    case "ol":
      return { type: block.type, items: pickLList(block.items, locale) };
    case "steps":
      return {
        type: "steps",
        items: block.items.map((step) => ({
          title: pickL(step.title, locale),
          body: pickL(step.body, locale),
        })),
      };
    default:
      return block as never;
  }
}

export function resolveHelpBlocks(
  blocks: HelpBlock[],
  locale: Locale,
): ResolvedHelpBlock[] {
  return blocks.map((block) => resolveHelpBlock(block, locale));
}

export function getHelpArticle(slug: string): HelpArticle | undefined {
  return HELP_ARTICLES.find((a) => a.slug === slug);
}

export function getHelpCategory(
  id: HelpCategoryId,
): HelpCategory | undefined {
  return HELP_CATEGORIES.find((c) => c.id === id);
}

export function getArticlesByCategory(
  id: HelpCategoryId,
): HelpArticle[] {
  return HELP_ARTICLES.filter((a) => a.category === id);
}

export function helpArticleHref(slug: string): string {
  return `/yardim/${slug}`;
}

export function helpArticleMatchesQuery(
  article: HelpArticle,
  query: string,
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    article.title.tr.toLowerCase().includes(q) ||
    article.title.en.toLowerCase().includes(q) ||
    article.description.tr.toLowerCase().includes(q) ||
    article.description.en.toLowerCase().includes(q)
  );
}
