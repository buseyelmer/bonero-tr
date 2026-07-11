import { ArrowRight } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-bonero-dark px-8 py-14 text-center sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(24,131,71,0.35), transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ajansınızın verimliliğini dönüştürmeye hazır mısınız?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              Operasyon sürenizi kısaltın, onayları hızlandırın ve müşteri
              teslimatlarını Bonero ile ölçekleyin.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-bonero-green px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-bonero-green/90"
            >
              Hemen Başlayın
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
