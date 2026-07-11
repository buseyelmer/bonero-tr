import type { Metadata } from "next";
import CareerHero from "@/components/career/CareerHero";
import CareerCulture from "@/components/career/CareerCulture";
import CareerRoles from "@/components/career/CareerRoles";
import CareerApply from "@/components/career/CareerApply";

export const metadata: Metadata = {
  title: "Kariyer",
  description:
    "Bonero’da kariyer fırsatları. Ajanslar için omnichannel AI platformunu birlikte büyütelim.",
  alternates: { canonical: "/kariyer" },
};

export default function CareersPage() {
  return (
    <main className="flex-1 bg-background">
      <CareerHero />
      <CareerCulture />
      <CareerRoles />
      <CareerApply />
    </main>
  );
}
