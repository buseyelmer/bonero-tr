import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelpHero from "@/components/help/HelpHero";
import HelpTopics from "@/components/help/HelpTopics";
import HelpFaq from "@/components/help/HelpFaq";
import HelpCta from "@/components/help/HelpCta";

export const metadata: Metadata = {
  title: "Yardım Merkezi",
  description:
    "Bonero yardım merkezi. Kurulum, Unified Inbox, entegrasyonlar ve faturalama hakkında rehberler ve SSS.",
  alternates: { canonical: "/yardim" },
};

export default function HelpCenterPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <HelpHero />
        <HelpTopics />
        <HelpFaq />
        <HelpCta />
      </main>
      <Footer />
    </>
  );
}
