import type { Metadata } from "next";
import PackagesPage from "@/components/PackagesPage";

export const metadata: Metadata = {
  title: "Paketler",
  description:
    "Bonero paketleri: Başlangıç, Pro ve Enterprise. Hangisi size uyar — kim için, neler dahil, özellik karşılaştırması. Kaydolun veya demo isteyin.",
  alternates: { canonical: "/paketler" },
};

export default function PricingPage() {
  return <PackagesPage />;
}
