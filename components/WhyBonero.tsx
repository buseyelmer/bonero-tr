import { Building2, Link2, Zap, type LucideIcon } from "lucide-react";

type Reason = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    icon: Building2,
    title: "Ajans Odaklı Tasarım",
    description:
      "Çoklu müşteri portföyleri, ekip rolleri ve onay hiyerarşileri için tasarlandı — bireysel creator araçlarından farklı.",
  },
  {
    icon: Zap,
    title: "Yapay Zeka Destekli Verimlilik",
    description:
      "Tekrarlayan üretim ve planlama işlerini AI üstlenir; ekibiniz strateji, kreatif ve müşteri ilişkisine odaklanır.",
  },
  {
    icon: Link2,
    title: "Tam Entegrasyon",
    description:
      "Sosyal platformları ve ajans süreçlerinizi tek panelde birleştirerek operasyonel dağınıklığı sonlandırın.",
  },
];

export default function WhyBonero() {
  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-md">
          <h2 className="text-3xl font-semibold tracking-tight text-bonero-dark sm:text-4xl">
            Neden Bonero?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/65">
            Genel amaçlı sosyal medya araçları ajans gerçekliğini karşılamaz.
            Bonero; müşteri yönetimi, ekip koordinasyonu ve ölçülebilir teslimat
            için kurumsal bir operasyon altyapısı sunar.
          </p>
          <a
            href="#features"
            className="mt-6 inline-flex text-sm font-semibold text-bonero-green transition-colors hover:text-bonero-green/80"
          >
            Özellikleri İncele →
          </a>
        </div>

        <ul className="space-y-6">
          {reasons.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bonero-green/10 text-bonero-green">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-base font-semibold text-bonero-dark">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-bonero-dark/65">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
