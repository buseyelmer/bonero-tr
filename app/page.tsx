import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import PainPoints from "@/components/PainPoints";
import Impact from "@/components/Impact";
import WhyBonero from "@/components/WhyBonero";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <PainPoints />
        <Impact />
        <WhyBonero />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
