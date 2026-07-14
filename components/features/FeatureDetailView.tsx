"use client";

import type { FeaturePageContent } from "@/lib/features";
import FeaturePromoLayout from "./FeaturePromoLayout";

export default function FeatureDetailView({
  feature,
}: {
  feature: FeaturePageContent;
}) {
  return <FeaturePromoLayout feature={feature} />;
}
