import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HelpArticleView from "@/components/help/HelpArticleView";
import {
  HELP_ARTICLE_SLUGS,
  getHelpArticle,
} from "@/lib/help";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return HELP_ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getHelpArticle(slug);
  if (!article) {
    return { title: "Makale bulunamadı" };
  }

  return {
    title: `${article.title.tr} — Yardım Merkezi`,
    description: article.description.tr,
    alternates: { canonical: `/yardim/${article.slug}` },
    openGraph: {
      title: `${article.title.tr} | Bonero Yardım`,
      description: article.description.tr,
      url: `/yardim/${article.slug}`,
    },
  };
}

export default async function HelpArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getHelpArticle(slug);
  if (!article) notFound();

  return (
    <main className="flex-1">
      <HelpArticleView article={article} />
    </main>
  );
}
