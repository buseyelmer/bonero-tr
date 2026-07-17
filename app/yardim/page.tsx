import type { Metadata } from "next";
import HelpHub from "@/components/help/HelpHub";
import HelpFaq from "@/components/help/HelpFaq";
import HelpCta from "@/components/help/HelpCta";

export const metadata: Metadata = {
  title: "Yardım Merkezi",
  description:
    "Bonero Yardım Merkezi: hızlı başlangıç, gelen kutusu, AI Agent, CRM ve operasyon rehberleri. Arayın, kategori seçin veya destek yazın.",
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
