import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocaleProvider } from "@/components/LocaleProvider";
import { ToastProvider } from "@/components/ToastProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bonero.tr"),
  title: {
    default: "Bonero | Omnichannel AI İletişim Platformu",
    template: "%s | Bonero",
  },
  description:
    "İşletmeniz emin ellerde. CRM, randevu ve müşteri mesajları tek panelde — Bonero.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Bonero",
    title: "Bonero | Omnichannel AI İletişim Platformu",
    description:
      "İşletmeniz emin ellerde. Tek panelde CRM, randevu ve mesajlar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bonero | Omnichannel AI İletişim Platformu",
    description:
      "İşletmeniz emin ellerde. Tek panelde CRM, randevu ve mesajlar.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-full min-w-0 flex-col overflow-x-clip bg-background font-sans text-base text-bonero-dark"
        suppressHydrationWarning
      >
        <LocaleProvider>
          <ToastProvider>
            <Header />
            <div className="flex min-w-0 flex-1 flex-col">{children}</div>
            <Footer />
          </ToastProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
