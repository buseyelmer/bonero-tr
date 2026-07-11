import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSplit from "@/components/contact/ContactSplit";
import ContactBridge from "@/components/contact/ContactBridge";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Bonero demo talep formu ve iletişim bilgileri. Ajansınız için ücretsiz demo planlayın — 1 iş günü içinde dönüş.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ContactSplit />
        <ContactBridge />
      </main>
      <Footer />
    </>
  );
}
