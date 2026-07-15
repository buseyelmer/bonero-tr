import type { Metadata } from "next";
import Hero from "@/components/Hero";
import BrandStrip from "@/components/BrandStrip";
import Features from "@/components/Features";
import HomeCta from "@/components/HomeCta";
import UseCases from "@/components/UseCases";
import OpsFeatures from "@/components/OpsFeatures";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import TrustStrip from "@/components/TrustStrip";
import SectionAccent from "@/components/SectionAccent";

export const metadata: Metadata = {
  title: {
    absolute: "Bonero | Omnichannel AI İletişim Platformu",
  },
  description:
    "İşletmeniz emin ellerde. CRM, randevu ve müşteri mesajları tek panelde — Bonero.",
  alternates: { canonical: "/" },
};

/**
 * Ana sayfa:
 * Hero → Brands → Main Feature → CTA → Big Feature → Ops Features → CTA
 * → FAQ → Pricing → CTA → Trust → Footer
 */
export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <BrandStrip />
      <Features />
      <HomeCta variant="ask" id="cta-soru" />
      <SectionAccent />
      <UseCases />
      <OpsFeatures />
      <HomeCta variant="campaign" id="cta-kampanya" />
      <Faq />
      <SectionAccent />
      <Pricing />
      <HomeCta variant="start" id="cta-basla" />
      <TrustStrip />
    </main>
  );
}
