import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CareerApplicationForm from "@/components/CareerApplicationForm";

export const metadata: Metadata = {
  title: "Kariyer",
  description:
    "Bonero’da kariyer fırsatları. Ajanslar için omnichannel AI platformunu birlikte büyütelim.",
  alternates: { canonical: "/kariyer" },
};

const values = [
  {
    title: "Ajans gerçeği",
    description:
      "Ürünü, sahadaki operasyon acılarından tasarlıyoruz — slayt değil, çalışan yazılım.",
  },
  {
    title: "Şeffaf tempo",
    description:
      "Küçük ekip, net sahiplik. Kararları hızlı alır, sonucu birlikte ölçeriz.",
  },
  {
    title: "Güven önce",
    description:
      "Müşteri verisi omurgamız. Güvenlik ve KVKK bilinci her rolün parçası.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              Kariyer
            </p>
            <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-5xl">
              Ajans operasyonunu
              <span className="mt-1 block text-bonero-dark/35">
                birlikte sadeleştirelim.
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-bonero-dark/65">
              Bonero, dijital ajanslar için omnichannel AI platformu kuruyor.
              Ürün, tasarım ve müşteri başarısında rol açığımız var.
            </p>
          </div>

          <ul className="mt-14 grid gap-8 border-y border-bonero-dark/10 py-10 sm:grid-cols-3 sm:gap-6">
            {values.map((v) => (
              <li key={v.title}>
                <h2 className="font-heading text-lg text-bonero-dark">
                  {v.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-bonero-dark/60">
                  {v.description}
                </p>
              </li>
            ))}
          </ul>

          <section className="mt-14 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
                Ekibimize dahil olmak ister misiniz?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-bonero-dark/60">
                Açık bir ilan olmasa da doğru kişiyi her zaman dinleriz. Formu
                doldurun; uygun bir rol açıldığında veya eşleşme gördüğümüzde
                dönüş yapalım.
              </p>
              <Link
                href="/hakkimizda"
                className="mt-6 inline-flex text-sm font-medium text-bonero-dark/70 transition-colors hover:text-bonero-dark"
              >
                Hakkımızda →
              </Link>
            </div>

            <div className="lg:col-span-8">
              <CareerApplicationForm />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
