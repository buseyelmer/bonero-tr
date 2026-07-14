import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import PainPoints from "@/components/PainPoints";
import HowItWorks from "@/components/HowItWorks";
import UnifiedInboxMockup from "@/components/UnifiedInboxMockup";
import Features from "@/components/Features";
import MetricsStrip from "@/components/MetricsStrip";
import TimeComparison from "@/components/TimeComparison";
import WhyBonero from "@/components/WhyBonero";
import UseCases from "@/components/UseCases";
import Integrations from "@/components/Integrations";
import CaseStudy from "@/components/CaseStudy";
import SoftStartFreeTrialCta from "@/components/SoftStartFreeTrialCta";
import Pricing from "@/components/Pricing";
import EfficiencyCalculator from "@/components/EfficiencyCalculator";
import Faq from "@/components/Faq";
import TrustStrip from "@/components/TrustStrip";

export const metadata: Metadata = {
  title: {
    absolute: "Bonero | Omnichannel AI İletişim Platformu",
  },
  description:
    "Tüm kanallar, tek panel. Instagram, WhatsApp ve e-postayı Birleşik Gelen Kutusu’nda birleştirin — hizmet işletmeleri için omnichannel AI yönetimi.",
  alternates: { canonical: "/" },
};

/**
 * Ana sayfa akışı — tek anlatı:
 *
 * 1. Vaat          Hero
 * 2. Problem       PainPoints
 * 3. Mekanizma     HowItWorks
 * 4. Ürünü gör     SocialProof → UnifiedInbox
 * 5. Derinlik      Features → Integrations
 * 6. Kazanç        Metrics → TimeComparison
 * 7. Tercih        WhyBonero → UseCases → CaseStudy
 * 8. Karar         Calculator → Pricing → SoftStartFreeTrialCta
 * 9. Güvence       Faq → TrustStrip → Footer
 */
export default function Home() {
  return (
    <main className="flex-1">
      {/* 1. Vaat */}
      <Hero />

      {/* 2. Problem — neden Bonero? */}
      <PainPoints />

      {/* 3. Mekanizma — 3 adım */}
      <HowItWorks />

      {/* 4. Ürünü gör — sosyal kanıt + canlı panel */}
      <SocialProof />
      <UnifiedInboxMockup />

      {/* 5. Derinlik — özellikler ve kanallar */}
      <Features />
      <Integrations />

      {/* 6. Ölçülebilir kazanç */}
      <MetricsStrip />
      <TimeComparison />

      {/* 7. Tercih nedeni — kimler, neden, hikâye */}
      <WhyBonero />
      <UseCases />
      <CaseStudy />

      {/* 8. Karar — kişisel verim → paket → net teklif */}
      <EfficiencyCalculator />
      <Pricing />
      <SoftStartFreeTrialCta />

      {/* 9. Güvence */}
      <Faq />
      <TrustStrip />
    </main>
  );
}
