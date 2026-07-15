"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import StartFreeTrialForm from "@/components/StartFreeTrialForm";
import { useLocale } from "@/components/LocaleProvider";

const copy = {
  tr: {
    eyebrow: "Mesaj formu",
    title: "Bize yazın.",
    titleAccent: "Birlikte netleştirelim.",
    lead: "Formu doldurun; demo, paket veya destek talebinizi 1 iş günü içinde yanıtlayalım.",
    promises: [
      { n: "01", text: "1 iş günü içinde dönüş yapıyoruz." },
      { n: "02", text: "Demo ve satış görüşmesi ücretsizdir." },
      { n: "03", text: "Kurulum sorularında yardım merkezi yanınızda." },
    ],
    quickQuestions: "Hızlı sorular",
    sideFaqs: [
      {
        q: "Ne kadar sürede dönüş alırım?",
        a: "İş günlerinde genelde 1 gün içinde. Acil durumlarda e-posta ile de yazabilirsiniz.",
      },
      {
        q: "Hemen kullanmaya başlayabilir miyim?",
        a: "Evet — Hemen Başla ile hesap açıp kanallarınızı bağlayabilirsiniz. Kurulum ~15 dk.",
      },
      {
        q: "Teklif için ne hazırlamalıyım?",
        a: "Ekip büyüklüğü, kanal sayısı ve kullanım hedefi yeterli. Formda kısaca yazmanız yeterli.",
      },
    ],
    privacyBefore: "Göndererek",
    privacyLink: "KVKK",
    privacyAfter: "metnini okuduğunuzu kabul edersiniz. Yanıt: hello@bonero.tr",
  },
  en: {
    eyebrow: "Message form",
    title: "Write to us.",
    titleAccent: "Let's get aligned.",
    lead: "Fill out the form and we will respond to demo, plan, or support requests within 1 business day.",
    promises: [
      { n: "01", text: "We reply within 1 business day." },
      { n: "02", text: "Demo and sales calls are free." },
      { n: "03", text: "The help center is here for setup questions." },
    ],
    quickQuestions: "Quick questions",
    sideFaqs: [
      {
        q: "How soon will I hear back?",
        a: "Usually within one business day. For urgent cases, you can also email us directly.",
      },
      {
        q: "Can I start using Bonero right away?",
        a: "Yes — sign up with Get Started, connect your channels, and be live in about 15 minutes.",
      },
      {
        q: "What should I prepare for a quote?",
        a: "Team size, channel count, and usage goals are enough. A short note in the form works.",
      },
    ],
    privacyBefore: "By submitting, you confirm that you have read the",
    privacyLink: "Privacy Notice",
    privacyAfter: ". Replies go to hello@bonero.tr",
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactFormSection() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [open, setOpen] = useState(0);

  return (
    <section
      id="form"
      className="relative scroll-mt-28 border-t border-bonero-dark/6 bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              {t.eyebrow}
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {t.title}
              <span className="mt-1 block text-bonero-green">
                {t.titleAccent}
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
              {t.lead}
            </p>

            <ul className="mt-8 space-y-3">
              {t.promises.map((p) => (
                <li key={p.n} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bonero-green text-white">
                    <Check size={11} strokeWidth={2.5} />
                  </span>
                  <span className="text-sm leading-relaxed text-bonero-dark/70">
                    <span className="font-mono text-[10px] text-bonero-dark/35">
                      {p.n}{" "}
                    </span>
                    {p.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-2">
              <p className="text-[11px] font-bold tracking-wide text-bonero-dark/35 uppercase">
                {t.quickQuestions}
              </p>
              {t.sideFaqs.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={item.q}
                    className="overflow-hidden rounded-xl border border-bonero-dark/8 bg-white"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                    >
                      <span className="text-sm font-semibold text-bonero-dark">
                        {item.q}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`shrink-0 text-bonero-dark/40 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-bonero-dark/6 px-4 py-3 text-sm leading-relaxed text-bonero-dark/55">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <StartFreeTrialForm variant="card" />
            <p className="mt-4 text-xs leading-relaxed text-bonero-dark/40">
              {t.privacyBefore}{" "}
              <Link href="/kvkk" className="underline hover:text-bonero-dark">
                {t.privacyLink}
              </Link>{" "}
              {t.privacyAfter}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
