import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Features from "@/components/Features";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import TrustStrip from "@/components/TrustStrip";

export const metadata: Metadata = {
  title: {
    absolute: "Bonero | Omnichannel AI İletişim Platformu",
  },
  description:
    "WhatsApp, Instagram ve e-posta tek panelde. Tüm işletmeler için omnichannel AI — bağla, yanıtla, büyüt.",
  alternates: { canonical: "/" },
};

/**
 * Ana sayfa — tek anlatı, tekrar yok:
 * 1. Vaat + CTA     Hero
 * 2. Sosyal kanıt    SocialProof
 * 3. Özellik özeti   Features (#cozumler)
 * 4. Kim için        UseCases
 * 5. Karar           Pricing
 * 6. Güvence         Faq + TrustStrip
 */
export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <SocialProof />
      <Features />
      <UseCases />
      <Pricing />
      <Faq />
      <TrustStrip />
    </main>
  );
}
