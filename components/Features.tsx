import { ClipboardCheck, Eye, Timer, type LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  problem: string;
  solution: string;
};

const features: Feature[] = [
  {
    icon: Timer,
    problem: "Her müşteri için içerik üretmek ekibinizin gününü mü yiyor?",
    solution:
      "Bonero ile marka sesine uygun taslakları dakikalar içinde hazırlayın; ayda 50+ saatlik üretim yükünü geri kazanın.",
  },
  {
    icon: ClipboardCheck,
    problem: "İçerik onay süreçlerinde günlerce bekliyor musunuz?",
    solution:
      "Bonero’nun AI destekli onay mekanizması ile revizyon süreçlerini yarıya indirin; yayına net ve hızlı çıkın.",
  },
  {
    icon: Eye,
    problem: "Kampanya performansını takip etmek mi zorlaşıyor?",
    solution:
      "Tek panelden tüm hesapları izleyin; müşteri raporlarını zamanında ve ölçülebilir verilerle sunun.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-bonero-green uppercase">
            Problem → Çözüm
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-bonero-dark sm:text-4xl">
            Ajansınızın acı noktalarını Bonero ile kapatın
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/65">
            Özellik listesi değil; operasyonunuzda somut kazanç. Zaman, onay ve
            takip sorunlarını fayda odaklı çözüyoruz.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, problem, solution }) => (
            <article
              key={problem}
              className="group rounded-2xl border border-bonero-dark/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-bonero-green/25 hover:shadow-[0_12px_40px_-16px_rgba(24,131,71,0.35)]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green transition-colors group-hover:bg-bonero-green group-hover:text-white">
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <p className="text-xs font-semibold tracking-wide text-bonero-dark/40 uppercase">
                Problem
              </p>
              <h3 className="mt-1.5 text-lg font-semibold leading-snug text-bonero-dark">
                {problem}
              </h3>
              <p className="mt-4 text-xs font-semibold tracking-wide text-bonero-green uppercase">
                Çözüm
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-bonero-dark/65">
                {solution}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#about"
            className="inline-flex items-center justify-center rounded-lg border border-bonero-dark/15 px-6 py-3 text-sm font-semibold text-bonero-dark transition-colors hover:border-bonero-green/40 hover:text-bonero-green"
          >
            Neden Bonero?
          </a>
          <a
            href="#impact"
            className="text-sm font-semibold text-bonero-green transition-colors hover:text-bonero-green/80"
          >
            Kazançları görün →
          </a>
        </div>
      </div>
    </section>
  );
}
