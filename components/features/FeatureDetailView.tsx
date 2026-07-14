"use client";

import type { FeaturePageContent } from "@/lib/features";
import FeaturePromoLayout from "./FeaturePromoLayout";
import RandevuFeaturePage from "./pages/RandevuFeaturePage";
import OmnichannelFeaturePage from "./pages/OmnichannelFeaturePage";
import AiAgentFeaturePage from "./pages/AiAgentFeaturePage";
import AdsFeaturePage from "./pages/AdsFeaturePage";
import CrmFeaturePage from "./pages/CrmFeaturePage";
import ContentFeaturePage from "./pages/ContentFeaturePage";
import EmailFeaturePage from "./pages/EmailFeaturePage";
import ReportingFeaturePage from "./pages/ReportingFeaturePage";
import CollabFeaturePage from "./pages/CollabFeaturePage";

export default function FeatureDetailView({
  feature,
}: {
  feature: FeaturePageContent;
}) {
  switch (feature.slug) {
    case "randevu":
      return <RandevuFeaturePage />;
    case "gelen-kutusu":
      return <OmnichannelFeaturePage />;
    case "yapay-zeka":
      return <AiAgentFeaturePage />;
    case "ai-reklam":
      return <AdsFeaturePage />;
    case "crm":
      return <CrmFeaturePage />;
    case "icerik":
      return <ContentFeaturePage />;
    case "email-marketing":
      return <EmailFeaturePage />;
    case "raporlama":
      return <ReportingFeaturePage />;
    case "isbirligi":
      return <CollabFeaturePage />;
    default:
      return <FeaturePromoLayout feature={feature} />;
  }
}
