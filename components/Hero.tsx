import { ArrowRight } from "lucide-react";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 85% 40%, rgba(24,131,71,0.08), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(28,42,43,0.04), transparent 55%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <h1 className="text-4xl font-semibold leading-[1.15] tracking-tight text-bonero-dark sm:text-5xl lg:text-[3.25rem]">
            <span className="text-bonero-green">Bonero</span>
            <span className="text-bonero-dark">
              : Dijital Ajansların Yapay Zeka Destekli Süper Gücü
            </span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-bonero-dark/65 sm:text-lg">
            Onaylar gecikiyor, içerik üretimi zaman alıyor, performans takibi
            dağınık kalıyor. Bonero; ajans ekiplerinin operasyonel yükünü
            azaltır, müşteri teslimatını hızlandırır.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-bonero-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bonero-green/90"
            >
              Ücretsiz Demo
              <ArrowRight size={16} />
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg border border-bonero-dark/15 px-6 py-3 text-sm font-semibold text-bonero-dark transition-colors hover:border-bonero-green/40 hover:text-bonero-green"
            >
              Özellikleri İncele
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
