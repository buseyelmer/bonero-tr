import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { AYDINLATMA_DOCUMENT } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Aydınlatma Metni",
  description:
    "Bonero KVKK aydınlatma metni. Kişisel verilerin işlenmesi, amaçları, aktarımı ve haklarınız hakkında bilgilendirme.",
  alternates: { canonical: "/aydinlatma-metni" },
};

export default function AydinlatmaMetniPage() {
  return <LegalPageShell document={AYDINLATMA_DOCUMENT} />;
}
