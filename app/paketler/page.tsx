import type { Metadata } from "next";
import PackagesPage from "@/components/PackagesPage";

export const metadata: Metadata = {
  title: "Paketler",
  description:
    "Bonero fiyatlandırma: Starter, Pro ve Enterprise. İşletme ölçeğinize uygun planı seçin, kaydolun ve hemen başlayın.",
  alternates: { canonical: "/paketler" },
};

export default function PricingPage() {
  return <PackagesPage />;
}
