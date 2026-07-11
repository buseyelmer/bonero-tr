import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  description: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex flex-1 flex-col justify-center overflow-hidden bg-background pt-28 pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 40%, rgba(24,131,71,0.1), transparent 65%)",
          }}
        />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-2xl px-4 text-center sm:px-6">
          <p className="font-heading text-7xl tracking-tight text-bonero-dark/10 sm:text-8xl">
            404
          </p>
          <div className="mx-auto -mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-bonero-green text-xl font-bold text-white shadow-lg shadow-bonero-green/25">
            B
          </div>
          <h1 className="font-heading mt-6 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
            Bu sayfa bulunamadı
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-bonero-dark/60">
            Link eski veya yanlış yazılmış olabilir. Ana sayfadan devam edebilir
            veya demo talep formuna gidebilirsiniz.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-bonero-green px-6 py-3 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-bonero-green/90"
            >
              <Home size={16} />
              Ana sayfaya dön
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-bonero-dark/12 bg-white/70 px-6 py-3 text-sm font-medium text-bonero-dark transition-colors hover:border-bonero-dark/25"
            >
              Demo talep et
              <ArrowRight size={16} />
            </Link>
          </div>

          <Link
            href="/yardim"
            className="mt-8 inline-flex items-center gap-1.5 text-sm text-bonero-dark/45 transition-colors hover:text-bonero-dark"
          >
            <ArrowLeft size={14} />
            Yardım merkezine bak
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
