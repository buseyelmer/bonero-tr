import type { Metadata } from "next";
import NotFoundContent from "@/components/NotFoundContent";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  description: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundContent />;
}
