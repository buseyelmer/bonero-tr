import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { LocaleProvider } from "@/components/LocaleProvider";
import { ToastProvider } from "@/components/ToastProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bonero.tr"),
  title: {
    default: "Bonero | Ajanslar İçin Omnichannel AI İletişim Platformu",
    template: "%s | Bonero",
  },
  description:
    "Bonero, dijital ajanslar için omnichannel AI iletişim platformudur. Instagram, WhatsApp, e-posta ve web taleplerini Unified Inbox’ta birleştirir.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Bonero",
    title: "Bonero | Ajanslar İçin Omnichannel AI İletişim Platformu",
    description:
      "Tüm kanallar, tek panel. Ajanslar için omnichannel AI yönetimi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bonero | Ajanslar İçin Omnichannel AI İletişim Platformu",
    description:
      "Tüm kanallar, tek panel. Ajanslar için omnichannel AI yönetimi.",
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
        className="flex min-h-full flex-col bg-background font-sans text-base text-bonero-dark"
        suppressHydrationWarning
      >
        <LocaleProvider>
          <ToastProvider>{children}</ToastProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
