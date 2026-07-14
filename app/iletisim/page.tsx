import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactReasons from "@/components/contact/ContactReasons";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactFaq from "@/components/contact/ContactFaq";
import ContactBridge from "@/components/contact/ContactBridge";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Bonero ile iletişime geçin. Demo, destek ve işbirliği — formu doldurun, 1 iş günü içinde dönüş yapalım.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-background">
      <ContactHero />
      <ContactReasons />
      <ContactFormSection />
      <ContactFaq />
      <ContactBridge />
    </main>
  );
}
