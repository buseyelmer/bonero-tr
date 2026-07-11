"use client";

import dynamic from "next/dynamic";
import type { FeaturePageContent } from "@/lib/features";

const InboxFeaturePage = dynamic(() => import("./pages/InboxFeaturePage"));
const AIFeaturePage = dynamic(() => import("./pages/AIFeaturePage"));
const AdsFeaturePage = dynamic(() => import("./pages/AdsFeaturePage"));
const CollabFeaturePage = dynamic(() => import("./pages/CollabFeaturePage"));
const ReportFeaturePage = dynamic(() => import("./pages/ReportFeaturePage"));

export default function FeatureDetailView({
  feature,
}: {
  feature: FeaturePageContent;
}) {
  switch (feature.slug) {
    case "gelen-kutusu":
      return <InboxFeaturePage feature={feature} />;
    case "yapay-zeka":
      return <AIFeaturePage feature={feature} />;
    case "ai-reklam":
      return <AdsFeaturePage feature={feature} />;
    case "isbirligi":
      return <CollabFeaturePage feature={feature} />;
    case "raporlama":
      return <ReportFeaturePage feature={feature} />;
    default:
      return <InboxFeaturePage feature={feature} />;
  }
}
