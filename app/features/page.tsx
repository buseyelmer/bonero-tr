import type { Metadata } from "next";
import FeaturesIndex from "@/components/features/FeaturesIndex";

export const metadata: Metadata = {
  title: "Özellikler",
  description:
    "Bonero özelliklerini keşfedin: Unified Inbox, yapay zeka, AI reklam, işbirliği ve raporlama. Omnichannel AI platformu — kaydolun ve hemen başlayın.",
  alternates: { canonical: "/features" },
};

export default function FeaturesIndexPage() {
  return (
    <main className="flex-1">
      <FeaturesIndex />
    </main>
  );
}
