import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { TERMS_DOCUMENT } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description:
    "Bonero platformunun kullanım şartları. Hizmet koşulları, hesap sorumlulukları ve kabul edilebilir kullanım politikası.",
  alternates: { canonical: "/kullanim-sartlari" },
};

export default function TermsPage() {
  return <LegalPageShell document={TERMS_DOCUMENT} />;
}
