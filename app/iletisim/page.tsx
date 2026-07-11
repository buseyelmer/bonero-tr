import type { Metadata } from "next";
import ContactSplit from "@/components/contact/ContactSplit";
import ContactBridge from "@/components/contact/ContactBridge";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Bonero iletişim formu ve destek. Kaydolun ve hemen başlayın — sorularınız için 1 iş günü içinde dönüş.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <ContactSplit />
      <ContactBridge />
    </main>
  );
}
