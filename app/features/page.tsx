import type { Metadata } from "next";
import FeaturesIndex from "@/components/features/FeaturesIndex";

export const metadata: Metadata = {
  title: "Özellikler",
  description:
    "Bonero özellikleri: Omnichannel, AI Agent, CRM, randevu, içerik, e-posta, reklam ve raporlama. Tüm katmanları keşfedin — kaydolun ve başlayın.",
  alternates: { canonical: "/features" },
};

export default function FeaturesIndexPage() {
  return (
    <main className="flex-1">
      <FeaturesIndex />
    </main>
  );
}
