"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Reveal from "./Reveal";

const faqs = [
  {
    question: "Tüm kanalları tek panelde toplamak güvenlik riski yaratır mı?",
    answer:
      "Hayır. Bonero tüm bağlantıları uçtan uca şifreli (SSL) API protokolleri üzerinden kurar. Veriler şifreli aktarılır ve saklanır; erişim rol bazlı yetkilendirme ile sınırlandırılır. Her ajans ve müşteri hesabı izole çalışma alanlarında yönetilir.",
  },
  {
    question: "Müşterilerimin verileri güvende mi?",
    answer:
      "Evet. Veriler şifreli aktarılır ve saklanır; erişim rol bazlı yetkilendirme ile sınırlandırılır. Her ajans ve müşteri hesabı izole çalışma alanlarında yönetilir.",
  },
  {
    question: "Hangi platformlarla entegre çalışıyor?",
    answer:
      "Instagram, Meta Business Suite, WhatsApp Business, Gmail, Outlook ve LinkedIn başta olmak üzere ajansların en çok kullandığı kanallarla entegre çalışır. Yeni entegrasyonlar düzenli olarak eklenir.",
  },
  {
    question: "Birden fazla ajans/müşteri hesabı yönetebilir miyim?",
    answer:
      "Evet. Bonero çoklu müşteri (multi-client) yapısı için tasarlandı. Ekip rolleri, onay akışları ve raporları müşteri bazında ayrı ayrı yönetebilirsiniz.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="sss" className="relative overflow-hidden bg-[#f8fafc] py-16 sm:py-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-bonero-green/10 text-bonero-green">
              <MessageCircleQuestion size={22} strokeWidth={1.75} />
            </span>
            <p className="mt-5 text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              Destek
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              Sıkça Sorulan
              <span className="mt-1 block text-bonero-dark/35">Sorular</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-bonero-dark/60">
              Teknik ve ticari sorularınıza net cevaplar — satış ekibine
              ulaşmadan önce.
            </p>
            <Link
              href="/iletisim"
              className="mt-6 inline-flex text-sm font-medium text-bonero-green transition-colors hover:text-bonero-green/80"
            >
              Sorunuz yok mu? Bize yazın →
            </Link>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const num = String(index + 1).padStart(2, "0");
                return (
                  <Reveal key={faq.question} delay={0.05 * index}>
                    <li
                      className={`overflow-hidden rounded-2xl border transition-colors ${
                        isOpen
                          ? "border-bonero-green/30 bg-white shadow-sm"
                          : "border-bonero-dark/8 bg-white/70 hover:border-bonero-dark/15"
                      }`}
                    >
                      <button
                        type="button"
                        className="flex w-full items-start gap-4 px-5 py-5 text-left sm:px-6"
                        aria-expanded={isOpen}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                      >
                        <span
                          className={`mt-0.5 font-heading text-sm tracking-wide tabular-nums ${
                            isOpen ? "text-bonero-green" : "text-bonero-dark/25"
                          }`}
                        >
                          {num}
                        </span>
                        <span className="min-w-0 flex-1 text-base font-semibold leading-snug text-bonero-dark sm:text-lg">
                          {faq.question}
                        </span>
                        <span
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                            isOpen
                              ? "bg-bonero-green text-white"
                              : "bg-bonero-dark/5 text-bonero-dark/45"
                          }`}
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="border-t border-bonero-dark/6 px-5 pt-4 pb-5 text-sm leading-relaxed text-bonero-dark/65 sm:px-6 sm:pl-[3.75rem]">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
