import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { KVKK_DOCUMENT } from "@/lib/legal";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Bonero KVKK aydınlatma metni. Kişisel verilerin işlenmesi, saklanması, aktarımı ve haklarınız hakkında bilgilendirme.",
  alternates: { canonical: "/kvkk" },
};

export default function KvkkPage() {
  return <LegalPageShell document={KVKK_DOCUMENT} />;
}
