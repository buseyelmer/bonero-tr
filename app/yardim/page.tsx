import type { Metadata } from "next";
import HelpHero from "@/components/help/HelpHero";
import HelpTopics from "@/components/help/HelpTopics";
import HelpArticles from "@/components/help/HelpArticles";
import HelpFaq from "@/components/help/HelpFaq";
import HelpCta from "@/components/help/HelpCta";

export const metadata: Metadata = {
  title: "Yardım Merkezi",
  description:
    "Bonero Yardım Merkezi. Kurulum, Omnichannel, AI Agent ve operasyon rehberleriyle programı adım adım öğrenin.",
  alternates: { canonical: "/yardim" },
};

export default function HelpCenterPage() {
  return (
    <main className="flex-1 bg-background">
      <HelpHero />
      <HelpArticles />
      <HelpTopics />
      <HelpFaq />
      <HelpCta />
    </main>
  );
}
