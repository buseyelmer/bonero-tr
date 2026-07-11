import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustStrip from "@/components/TrustStrip";
import DemoRequestForm from "@/components/DemoRequestForm";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Bonero demo talep formu ve iletişim bilgileri. Ajansınız için ücretsiz demo planlayın — 1 iş günü içinde dönüş.",
  alternates: { canonical: "/iletisim" },
};

const socialLinks = [
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://x.com", label: "X" },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              İletişim
            </p>
            <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              Demo talep edin, ajansınızı birlikte planlayalım
            </h1>
            <p className="mt-4 text-base leading-relaxed text-bonero-dark/65">
              Sorularınız veya demo talebiniz için formu doldurun ya da doğrudan
              bize ulaşın. Ekibimiz 1 iş günü içinde dönüş yapar.
            </p>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <aside className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-bonero-dark">
                  İletişim bilgileri
                </h2>
                <ul className="mt-5 space-y-4">
                  <li>
                    <a
                      href="mailto:hello@bonero.tr"
                      className="flex items-start gap-3 text-sm text-bonero-dark/70 transition-colors hover:text-bonero-green"
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bonero-green/10 text-bonero-green">
                        <Mail size={18} strokeWidth={1.75} />
                      </span>
                      <span>
                        <span className="block font-medium text-bonero-dark">
                          E-posta
                        </span>
                        hello@bonero.tr
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+902120000000"
                      className="flex items-start gap-3 text-sm text-bonero-dark/70 transition-colors hover:text-bonero-green"
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bonero-green/10 text-bonero-green">
                        <Phone size={18} strokeWidth={1.75} />
                      </span>
                      <span>
                        <span className="block font-medium text-bonero-dark">
                          Telefon
                        </span>
                        +90 (212) 000 00 00
                      </span>
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-bonero-dark/70">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bonero-green/10 text-bonero-green">
                      <MapPin size={18} strokeWidth={1.75} />
                    </span>
                    <span>
                      <span className="block font-medium text-bonero-dark">
                        Adres
                      </span>
                      İstanbul, Türkiye
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-bonero-dark">
                  Sosyal medya
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-bonero-dark/10 px-4 py-2 text-sm font-medium text-bonero-dark/70 transition-colors hover:border-bonero-green/30 hover:bg-bonero-green/5 hover:text-bonero-green"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <p className="text-sm leading-relaxed text-bonero-dark/55">
                Ana sayfaya dönmek için{" "}
                <Link
                  href="/"
                  className="font-semibold text-bonero-green hover:text-bonero-green/80"
                >
                  buraya tıklayın
                </Link>
                .
              </p>
            </aside>

            <DemoRequestForm />
          </div>
        </div>

        <div className="mt-16">
          <TrustStrip />
        </div>
      </main>
      <Footer />
    </>
  );
}
