"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Müşterilerimin verileri güvende mi?",
    answer:
      "Evet. Veriler şifreli aktarılır ve saklanır; erişim rol bazlı yetkilendirme ile sınırlandırılır. Her ajans ve müşteri hesabı izole çalışma alanlarında yönetilir.",
  },
  {
    question: "Hangi platformlarla entegre çalışıyor?",
    answer:
      "Instagram, Facebook, LinkedIn, X (Twitter) ve TikTok başta olmak üzere ajansların en çok kullandığı sosyal platformlarla entegre çalışır. Yeni entegrasyonlar düzenli olarak eklenir.",
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
    <section id="faq" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide text-bonero-green uppercase">
            Güven
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-bonero-dark sm:text-4xl">
            Sıkça Sorulan Sorular
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/65">
            Teknik ve ticari sorularınıza net cevaplar — satış ekibine ulaşmadan
            önce.
          </p>
        </div>

        <div className="mt-10 divide-y divide-bonero-dark/10 border-y border-bonero-dark/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-base font-semibold text-bonero-dark">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-bonero-green transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-sm leading-relaxed text-bonero-dark/65">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
