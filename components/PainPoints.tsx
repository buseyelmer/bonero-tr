import { FileWarning, CalendarX2, Shuffle, type LucideIcon } from "lucide-react";

type Pain = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const pains: Pain[] = [
  {
    icon: FileWarning,
    title: "Müşteri revizyonları arasında kaybolmayın",
    description:
      "E-posta zincirleri ve dağınık dosyalar teslimatı geciktirir. Bonero’da her revizyon tek akışta, izlenebilir kalır.",
  },
  {
    icon: CalendarX2,
    title: "Manuel rapor için haftasonunuzu harcamayın",
    description:
      "Performans verilerini otomatik toplayın; müşteri raporlarını dakikalar içinde, kurumsal kalitede sunun.",
  },
  {
    icon: Shuffle,
    title: "Platformlar arası strateji kopukluğu yaşamayın",
    description:
      "Instagram’dan LinkedIn’e geçerken mesaj dağılmasın. Tek panelden tutarlı planlama ve yayın.",
  },
];

export default function PainPoints() {
  return (
    <section id="pain-points" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-bonero-green uppercase">
            Acı Noktaları
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-bonero-dark sm:text-4xl">
            Hangi Problemleri Çözüyoruz?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/65">
            Ajansın günlük kabuslarını biliyoruz — çünkü Bonero tam olarak bunları
            çözmek için tasarlandı.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {pains.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="border-t-2 border-bonero-green pt-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-bonero-green/10 text-bonero-green">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-semibold leading-snug text-bonero-dark">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bonero-dark/65">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
