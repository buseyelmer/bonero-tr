import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import PainPoints from "@/components/PainPoints";
import HowItWorks from "@/components/HowItWorks";
import UnifiedInboxMockup from "@/components/UnifiedInboxMockup";
import Features from "@/components/Features";
import MetricsStrip from "@/components/MetricsStrip";
import TimeComparison from "@/components/TimeComparison";
import Impact from "@/components/Impact";
import WhyBonero from "@/components/WhyBonero";
import UseCases from "@/components/UseCases";
import Integrations from "@/components/Integrations";
import CaseStudy from "@/components/CaseStudy";
import SoftDemoCta from "@/components/SoftDemoCta";
import Pricing from "@/components/Pricing";
import EfficiencyCalculator from "@/components/EfficiencyCalculator";
import Faq from "@/components/Faq";
import TrustStrip from "@/components/TrustStrip";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    absolute: "Bonero | Ajanslar İçin Omnichannel AI İletişim Platformu",
  },
  description:
    "Tüm kanallar, tek panel. Instagram, WhatsApp ve e-postayı Birleşik Gelen Kutusu’nda birleştirin — ajanslar için omnichannel AI yönetimi.",
  alternates: { canonical: "/" },
};

/**
 * Ana sayfa akışı (SaaS satış hunisi):
 * 1. Dikkat & vaat → 2. Güven → 3. Problem → 4. Nasıl çalışır →
 * 5. Ürünü gör → 6. Çözümler → 7. Kanıt (metrik/ROI) → 8. Farklılaşma →
 * 9. Kimler için → 10. Entegrasyon → 11. Hikâye → 12. Soft CTA →
 * 13. Fiyat → 14. Etkileşim → 15. İtirazlar → 16. Güvenlik
 */
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* 1. Vaat — Bonero nedir? */}
        <Hero />

        {/* 2. Erken güven — ajanslar & sayılar */}
        <SocialProof />

        {/* 3. Problem — neden ihtiyaç var? */}
        <PainPoints />

        {/* 4. Sadelik — 3 adımda nasıl çalışır */}
        <HowItWorks />
        <MetricsStrip />

        {/* 5. Ürün kanıtı — paneli gör */}
        <UnifiedInboxMockup />

        {/* 6. Derin çözümler — özellikler */}
        <Features />

        {/* 7. Ölçülebilir kazanç */}
        <TimeComparison />
        <Impact />
        <Integrations />

        {/* 8. Neden Bonero? */}
        <WhyBonero />

        {/* 9. Kimler için */}
        <UseCases />

        {/* 10. Başarı hikâyesi */}
        <CaseStudy />

        {/* 11. Soft CTA */}
        <SoftDemoCta />

        {/* 12. Fiyatlandırma */}
        <Pricing />

        {/* 13. Etkileşimli ikna */}
        <EfficiencyCalculator />

        {/* 14. İtirazlar + güvenlik */}
        <Faq />
        <TrustStrip />
      </main>
      <Footer />
    </>
  );
}
