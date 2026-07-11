"use client";

import Reveal from "@/components/Reveal";

const blocks = [
  {
    title: "Misyonumuz",
    body: "Bonero olarak amacımız; dijital ajansların içerik üretimi, onay süreçleri ve performans takibini tek, sade bir operasyon merkezinde birleştirmek. Ekiplerin zamanını tekrarlayan işlerden kurtarıp stratejiye ve müşteri ilişkisine ayırmasını istiyoruz.",
  },
  {
    title: "Vizyonumuz",
    body: "Yapay zekayı ajans gerçekliğine göre tasarlıyoruz: çoklu müşteri yönetimi, rol bazlı onaylar ve ölçülebilir raporlama. Her özelliğin ölçütü aynı — ajansın daha hızlı teslim etmesi, daha net sonuç sunması.",
  },
];

export default function AboutMissionVision() {
  return (
    <section className="border-t border-bonero-dark/6 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              Kurumsal yön
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              Misyonumuz
              <span className="mt-2 block text-bonero-dark/35">&</span>
              Vizyonumuz
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-bonero-dark/55">
              Ne için var olduğumuz ve nereye gittiğimiz — net, ölçülebilir ve
              ajans odaklı.
            </p>
          </Reveal>

          <div className="flex flex-col gap-5 lg:col-span-8">
            {blocks.map((block, index) => (
              <Reveal key={block.title} delay={0.1 * (index + 1)}>
                <article className="glass-panel rounded-2xl p-6 sm:p-8">
                  <h3 className="font-heading text-lg text-bonero-dark">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-bonero-dark/65">
                    {block.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
