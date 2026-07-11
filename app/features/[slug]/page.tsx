import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FeatureDetailView from "@/components/features/FeatureDetailView";
import { FEATURE_SLUGS, getFeatureBySlug } from "@/lib/features";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return FEATURE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) {
    return { title: "Özellik bulunamadı" };
  }

  return {
    title: feature.metaTitle,
    description: feature.metaDescription,
    alternates: { canonical: `/features/${feature.slug}` },
    openGraph: {
      title: `${feature.metaTitle} | Bonero`,
      description: feature.metaDescription,
      url: `/features/${feature.slug}`,
    },
  };
}

export default async function FeaturePage({ params }: Props) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) notFound();

  return (
    <main className="flex-1">
      <FeatureDetailView feature={feature} />
    </main>
  );
}
