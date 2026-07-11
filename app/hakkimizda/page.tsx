import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutMissionVision from "@/components/about/AboutMissionVision";
import AboutStory from "@/components/about/AboutStory";
import AboutTrustBento from "@/components/about/AboutTrustBento";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Bonero’nun vizyonu, misyonu ve kuruluş hikayesi. Dijital ajanslar için yapay zeka destekli sosyal medya operasyonu.",
  alternates: { canonical: "/hakkimizda" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <AboutHero />
        <AboutMissionVision />
        <AboutStory />
        <AboutTrustBento />
      </main>
      <Footer />
    </>
  );
}
