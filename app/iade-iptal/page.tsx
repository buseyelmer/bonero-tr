import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { REFUND_DOCUMENT } from "@/lib/legal";

export const metadata: Metadata = {
  title: "İade / İptal Koşulları",
  description:
    "Bonero abonelik iptali, paket değişikliği ve iade koşulları. Ücretli paketler için geçerli politikalar.",
  alternates: { canonical: "/iade-iptal" },
};

export default function IadeIptalPage() {
  return <LegalPageShell document={REFUND_DOCUMENT} />;
}
