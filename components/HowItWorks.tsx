import { Link2, Sparkles, Send, type LucideIcon } from "lucide-react";

type Step = {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: Link2,
    step: "01",
    title: "Bağlan",
    description:
      "Sosyal medya hesaplarını tek tıkla bağla. Kurulum dakikalar sürer, öğrenme eğrisi yoktur.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "AI ile Üret",
    description:
      "AI, markana özel içerikleri saniyeler içinde taslaklasın. Ekibin yalnızca inceleyip onaylasın.",
  },
  {
    icon: Send,
    step: "03",
    title: "Yayına Al",
    description:
      "Onaylayıp tüm platformlarda paylaş. Tek panelden planla, yayınla, takip et.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-bonero-green uppercase">
            Nasıl Çalışır?
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-bonero-dark sm:text-4xl">
            Süreç Nasıl İşliyor?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/65">
            Karmaşık yazılımlara gerek yok. Üç adımda bağlan, üret ve yayına al.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          <div
            className="pointer-events-none absolute top-8 right-[16%] left-[16%] hidden h-px bg-bonero-dark/10 sm:block"
            aria-hidden="true"
          />

          {steps.map(({ icon: Icon, step, title, description }) => (
            <li key={title} className="relative text-center sm:text-left">
              <div className="relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-bonero-green/20 bg-white text-bonero-green shadow-[0_0_0_6px_#fff] sm:mx-0">
                <Icon size={26} strokeWidth={1.75} />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-bonero-green text-[10px] font-bold text-white">
                  {Number(step)}
                </span>
              </div>
              <p className="text-xs font-semibold tracking-wide text-bonero-green uppercase">
                Adım {step}
              </p>
              <h3 className="mt-1.5 text-xl font-semibold text-bonero-dark">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bonero-dark/65">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
