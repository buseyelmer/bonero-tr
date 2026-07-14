import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutMissionVision from "@/components/about/AboutMissionVision";
import AboutStory from "@/components/about/AboutStory";
import AboutTrustBento from "@/components/about/AboutTrustBento";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "İşletmelerin operasyonel kaosunu yapay zeka ile şeffaf bir başarı hikayesine dönüştürüyoruz. Bonero misyonu, vizyonu ve güven altyapısı.",
  alternates: { canonical: "/hakkimizda" },
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-background">
      <AboutHero />
      <AboutStory />
      <AboutMissionVision />
      <AboutTrustBento />
    </main>
  );
}
