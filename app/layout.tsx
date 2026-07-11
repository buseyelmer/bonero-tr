import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bonero — Dijital Ajansların Yapay Zeka Destekli Süper Gücü",
  description:
    "Bonero, dijital ajanslar için yapay zeka destekli sosyal medya operasyon platformudur. Zaman kaybını, onay karmaşasını ve takip zorluğunu tek panelde çözer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-bonero-dark font-sans">
        {children}
      </body>
    </html>
  );
}
