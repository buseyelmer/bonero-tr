import type { Metadata } from "next";
import HelpHub from "@/components/help/HelpHub";
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
      <HelpHub />
      <HelpFaq />
      <HelpCta />
    </main>
  );
}
