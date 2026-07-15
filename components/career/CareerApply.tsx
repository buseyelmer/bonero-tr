"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, MailCheck, Shield } from "lucide-react";
import Reveal from "@/components/Reveal";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { useLocale } from "@/components/LocaleProvider";

const stepMeta = [
  { key: "form", icon: FileText },
  { key: "confirm", icon: MailCheck },
  { key: "match", icon: Shield },
] as const;

const copy = {
  tr: {
    eyebrow: "Başvuru",
    title: "Ekibimize dahil olmak",
    titleMuted: "ister misiniz?",
    lead: "Açık ilan olmasa da doğru kişiyi dinleriz. Formu doldurun; eşleşme gördüğümüzde dönüş yapalım.",
    steps: {
      form: { title: "Formu doldurun", text: "Alan, CV ve kısa not yeterli." },
      confirm: {
        title: "Onay alın",
        text: "Başvuru alındı bilgisini hemen görürsünüz.",
      },
      match: {
        title: "Eşleşme bekleyin",
        text: "Uygun rolde ekip dönüş yapar.",
      },
    },
    processNote: "Süreç notu",
    processTitle: "Ne beklemelisiniz?",
    processItems: [
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
    ],
    aboutBefore: "Önce Bonero’yu tanıyın:",
    aboutLink: "Hakkımızda →",
    openApplyEyebrow: "Açık ilan şart değil",
    openApplyTitle: "Yine de yazın — dinliyoruz.",
    openApplyText:
      "Uygun eşleşme gördüğümüzde dönüş yaparız. Formu doldurmanız yeter.",
    backToForm: "Forma dön",
  },
  en: {
    eyebrow: "Apply",
    title: "Want to join",
    titleMuted: "our team?",
    lead: "Even without an open listing, we listen for the right people. Fill out the form and we will reach out when there is a fit.",
    steps: {
      form: {
        title: "Complete the form",
        text: "Area, CV, and a short note are enough.",
      },
      confirm: {
        title: "Get confirmation",
        text: "You will see an immediate success message.",
      },
      match: {
        title: "Wait for a match",
        text: "The team responds when a role fits.",
      },
    },
    processNote: "Process note",
    processTitle: "What to expect",
    processItems: [
      {
        t: "Quick confirmation",
        d: "Instant success message after submission",
      },
      {
        t: "Selective review",
        d: "Team follow-up when there is a strong fit",
      },
      {
        t: "Data security",
        d: "CV and contact details used for hiring only",
      },
    ],
    aboutBefore: "Get to know Bonero first:",
    aboutLink: "About →",
    openApplyEyebrow: "No open listing required",
    openApplyTitle: "Reach out anyway — we are listening.",
    openApplyText:
      "We will respond when we see a fit. Filling out the form is enough.",
    backToForm: "Back to form",
  },
};

export default function CareerApply() {
  const { locale } = useLocale();
  const t = copy[locale];

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
            {t.eyebrow}
          </p>
          <h2
            id="basvuru-baslik"
            className="font-heading mt-4 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]"
          >
            {t.title}
            <span className="mt-1.5 block text-bonero-dark/35">
              {t.titleMuted}
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-bonero-dark/60">
            {t.lead}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <ol className="relative grid gap-6 sm:grid-cols-3 sm:gap-4">
            <div
              className="pointer-events-none absolute top-7 right-[16%] left-[16%] hidden h-px bg-bonero-dark/10 sm:block"
              aria-hidden="true"
            />
            {stepMeta.map(({ key, icon: Icon }, i) => {
              const step = t.steps[key];
              return (
                <li key={key} className="relative text-center">
                  <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-bonero-dark/10 bg-white text-bonero-dark/70 shadow-sm">
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-bonero-green text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <p className="font-heading mt-4 text-base !font-extrabold text-bonero-dark">
                    {step.title}
                  </p>
                  <p className="mt-1.5 text-sm text-bonero-dark/50">{step.text}</p>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <div className="mt-14 mx-auto max-w-2xl" id="basvuru-form">
          <Reveal delay={0.1}>
            <CareerApplicationForm />
          </Reveal>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          <Reveal delay={0.12}>
            <div className="h-full rounded-[1.75rem] border border-bonero-dark/8 bg-white/70 p-6 backdrop-blur-sm sm:p-7">
              <p className="text-xs font-semibold tracking-[0.16em] text-bonero-green uppercase">
                {t.processNote}
              </p>
              <h3 className="font-heading mt-3 text-xl !font-extrabold text-bonero-dark">
                {t.processTitle}
              </h3>
              <ul className="mt-6 space-y-4">
                {t.processItems.map((item, i) => (
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
                {t.aboutBefore}{" "}
                <Link
                  href="/hakkimizda"
                  className="font-semibold text-bonero-green transition-colors hover:text-bonero-green/80"
                >
                  {t.aboutLink}
                </Link>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="flex h-full flex-col justify-between rounded-[1.5rem] bg-bonero-green px-6 py-7 text-white sm:px-7">
              <div>
                <p className="text-xs font-semibold tracking-wide text-white/70 uppercase">
                  {t.openApplyEyebrow}
                </p>
                <h3 className="font-heading mt-2 text-xl !font-extrabold">
                  {t.openApplyTitle}
                </h3>
                <p className="mt-2 text-sm text-white/80">{t.openApplyText}</p>
              </div>
              <a
                href="#basvuru-form"
                className="mt-6 inline-flex w-fit items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-bonero-green"
              >
                {t.backToForm}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
