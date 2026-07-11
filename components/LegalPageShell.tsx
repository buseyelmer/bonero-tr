import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Section = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export function LegalPageShell({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background pt-24 pb-16 sm:pt-32 sm:pb-24">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {eyebrow}
          </p>
          <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-bonero-dark/45">{updated}</p>
          <p className="mt-6 text-base leading-relaxed text-bonero-dark/65">
            {intro}
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-heading text-xl tracking-wide text-bonero-dark">
                  {section.title}
                </h2>
                {section.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className="mt-3 text-base leading-relaxed text-bonero-dark/65"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-bonero-dark/65">
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-bonero-dark/8 pt-8 text-sm text-bonero-dark/50">
            Sorularınız için{" "}
            <Link
              href="/iletisim"
              className="font-medium text-bonero-green hover:underline"
            >
              İletişim
            </Link>{" "}
            sayfasından bize ulaşın:{" "}
            <a
              href="mailto:hello@bonero.tr"
              className="font-medium text-bonero-green hover:underline"
            >
              hello@bonero.tr
            </a>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
