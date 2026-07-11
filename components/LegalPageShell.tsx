import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

type Section = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

function sectionId(index: number) {
  return `bolum-${index + 1}`;
}

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
    <main className="flex-1 bg-background">
        {/* Hero band */}
        <section className="relative overflow-hidden border-b border-bonero-dark/8 pt-24 pb-12 sm:pt-28 sm:pb-16">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 12% 20%, rgba(24,131,71,0.10), transparent 55%), radial-gradient(ellipse 50% 60% at 92% 70%, rgba(30,41,59,0.06), transparent 50%), linear-gradient(180deg, #eef3f0 0%, #f9fafb 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35] bg-grid"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-bonero-green/10 text-bonero-green ring-1 ring-bonero-green/15">
                <FileText size={20} strokeWidth={1.75} />
              </span>
              <div className="min-w-0 max-w-2xl">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-bonero-dark/40 uppercase">
                  {eyebrow}
                </p>
                <h1 className="font-heading mt-2 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
                  {title}
                </h1>
                <p className="mt-3 text-sm text-bonero-dark/45">{updated}</p>
                <p className="mt-5 text-base leading-relaxed text-bonero-dark/65 sm:text-lg">
                  {intro}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Body: TOC + content */}
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-16">
            <aside className="mb-10 lg:mb-0">
              <nav
                aria-label="İçindekiler"
                className="lg:sticky lg:top-28"
              >
                <p className="text-[11px] font-semibold tracking-[0.16em] text-bonero-dark/35 uppercase">
                  İçindekiler
                </p>
                <ol className="mt-4 space-y-1 border-l border-bonero-dark/10">
                  {sections.map((section, i) => (
                    <li key={section.title}>
                      <a
                        href={`#${sectionId(i)}`}
                        className="block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-snug text-bonero-dark/50 transition-colors hover:border-bonero-green hover:text-bonero-dark"
                      >
                        {section.title.replace(/^\d+\.\s*/, "")}
                      </a>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 hidden rounded-2xl bg-[#0f1c17] p-5 text-white lg:block">
                  <p className="text-sm font-medium">Sorunuz mu var?</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                    Bu metinle ilgili netleştirmek istediğiniz bir nokta için
                    yazın.
                  </p>
                  <Link
                    href="/iletisim"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-bonero-green transition-colors hover:text-white"
                  >
                    İletişim
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </nav>
            </aside>

            <article className="min-w-0">
              <div className="space-y-3">
                {sections.map((section, i) => (
                  <section
                    key={section.title}
                    id={sectionId(i)}
                    className="scroll-mt-28 rounded-2xl border border-bonero-dark/8 bg-white/80 px-5 py-6 shadow-[0_1px_2px_rgba(30,41,59,0.04)] backdrop-blur-sm sm:px-7 sm:py-7"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-medium tabular-nums text-bonero-green">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-heading text-lg tracking-wide text-bonero-dark sm:text-xl">
                        {section.title.replace(/^\d+\.\s*/, "")}
                      </h2>
                    </div>
                    {section.paragraphs.map((p) => (
                      <p
                        key={p.slice(0, 48)}
                        className="mt-3 text-[15px] leading-relaxed text-bonero-dark/65 sm:text-base"
                      >
                        {p}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="mt-4 space-y-2.5">
                        {section.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex gap-3 text-[15px] leading-relaxed text-bonero-dark/65 sm:text-base"
                          >
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bonero-green"
                              aria-hidden="true"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-bonero-dark/8 bg-gradient-to-br from-[#eef3f0] to-white px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <div>
                  <p className="font-heading text-lg text-bonero-dark">
                    Daha fazla yardıma mı ihtiyacınız var?
                  </p>
                  <p className="mt-1 text-sm text-bonero-dark/55">
                    Sorularınız için{" "}
                    <a
                      href="mailto:hello@bonero.tr"
                      className="font-medium text-bonero-green hover:underline"
                    >
                      hello@bonero.tr
                    </a>{" "}
                    veya iletişim formu.
                  </p>
                </div>
                <Link
                  href="/iletisim"
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-bonero-dark px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-bonero-green"
                >
                  İletişime geç
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </main>
  );
}
