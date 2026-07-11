"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, MailCheck, Shield } from "lucide-react";
import Reveal from "@/components/Reveal";
import CareerApplicationForm from "@/components/CareerApplicationForm";

const steps = [
  {
    icon: FileText,
    title: "Formu doldurun",
    text: "Alan, CV ve kısa not yeterli.",
  },
  {
    icon: MailCheck,
    title: "Onay alın",
    text: "Başvuru alındı bilgisini hemen görürsünüz.",
  },
  {
    icon: Shield,
    title: "Eşleşme bekleyin",
    text: "Uygun rolde ekip dönüş yapar.",
  },
];

export default function CareerApply() {
  return (
    <section
      id="basvuru"
      className="relative scroll-mt-28 border-t border-bonero-dark/6 py-20 sm:py-28"
      aria-labelledby="basvuru-baslik"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 0% 20%, rgba(24,131,71,0.07), transparent 55%), radial-gradient(ellipse 40% 40% at 100% 100%, rgba(30,41,59,0.04), transparent 45%), #eef1ef",
        }}
      />
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.14]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            Başvuru
          </p>
          <h2
            id="basvuru-baslik"
            className="font-heading mt-4 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]"
          >
            Ekibimize dahil olmak
            <span className="mt-1.5 block text-bonero-dark/35">
              ister misiniz?
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-bonero-dark/60">
            Açık ilan olmasa da doğru kişiyi dinleriz. Formu doldurun; eşleşme
            gördüğümüzde dönüş yapalım.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <ol className="relative grid gap-6 sm:grid-cols-3 sm:gap-4">
            <div
              className="pointer-events-none absolute top-7 right-[16%] left-[16%] hidden h-px bg-bonero-dark/10 sm:block"
              aria-hidden="true"
            />
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative text-center">
                <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-bonero-dark/10 bg-white text-bonero-dark/70 shadow-sm">
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-bonero-green text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <p className="font-heading mt-4 text-base !font-extrabold text-bonero-dark">
                  {title}
                </p>
                <p className="mt-1.5 text-sm text-bonero-dark/50">{text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <div className="rounded-[1.75rem] border border-bonero-dark/8 bg-white/70 p-6 backdrop-blur-sm sm:p-7">
              <p className="text-xs font-semibold tracking-[0.16em] text-bonero-green uppercase">
                Süreç notu
              </p>
              <h3 className="font-heading mt-3 text-xl !font-extrabold text-bonero-dark">
                Ne beklemelisiniz?
              </h3>
              <ul className="mt-6 space-y-4">
                {[
                  {
                    t: "Hızlı onay",
                    d: "Gönderim sonrası anında başarı bildirimi",
                  },
                  {
                    t: "Seçici dinleme",
                    d: "Uygun eşleşmede ekip dönüşü",
                  },
                  {
                    t: "Veri güvenliği",
                    d: "CV ve iletişim yalnızca işe alım için",
                  },
                ].map((item, i) => (
                  <motion.li
                    key={item.t}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * i }}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bonero-green" />
                    <span>
                      <span className="block text-sm font-semibold text-bonero-dark">
                        {item.t}
                      </span>
                      <span className="mt-0.5 block text-sm text-bonero-dark/50">
                        {item.d}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </ul>

              <p className="mt-8 border-t border-bonero-dark/8 pt-5 text-sm text-bonero-dark/50">
                Önce Bonero’yu tanıyın:{" "}
                <Link
                  href="/hakkimizda"
                  className="font-semibold text-bonero-green transition-colors hover:text-bonero-green/80"
                >
                  Hakkımızda →
                </Link>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <CareerApplicationForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
