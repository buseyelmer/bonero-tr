const outcomes = [
  {
    value: "%40",
    label: "Operasyon süresi",
    description: "İçerikten yayına kadar geçen süreyi ortalama %40 azaltın.",
  },
  {
    value: "50+",
    label: "Saat / ay tasarruf",
    description: "Üretim ve planlama yükünde ayda 50+ saat geri kazanın.",
  },
  {
    value: "1",
    label: "Panel, tüm platformlar",
    description: "Dağınık araçları bırakın; tüm hesapları tek merkezden yönetin.",
  },
];

export default function Impact() {
  return (
    <section id="impact" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-bonero-dark sm:text-4xl">
            Bonero ile Ajansınızda Neler Değişir?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/65">
            Sadece hız vaadi değil — ölçülebilir operasyonel kazanç.
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {outcomes.map(({ value, label, description }) => (
            <div key={label} className="text-center sm:text-left">
              <p className="text-4xl font-semibold tracking-tight text-bonero-green sm:text-5xl">
                {value}
              </p>
              <h3 className="mt-2 text-base font-semibold text-bonero-dark">
                {label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bonero-dark/65">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
