"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    q: "Neredesiniz ve hangi saatlerde çalışıyorsunuz?",
    a: "İstanbul, Türkiye. Pazartesi–Cuma 09:00–18:00 (GMT+3) arası yanıt veriyoruz.",
  },
  {
    q: "Demo ücretsiz mi?",
    a: "Evet. İlk görüşme ve ürün demosu ücretsizdir. Formdan veya hello@bonero.tr üzerinden talep edin.",
  },
  {
    q: "Hesap açtıktan sonra ne kadar sürede kullanırım?",
    a: "Çoğu hesap yaklaşık 15 dakikada kanallarını bağlayıp Unified Inbox’a düşer.",
  },
  {
    q: "Destek talep etmek için nereye yazmalıyım?",
    a: "Bu form, hello@bonero.tr veya Yardım Merkezi yeterlidir. Teknik kurulum için Yardım sayfasındaki konulara da bakabilirsiniz.",
  },
  {
    q: "Faturalama ve paket değişiklikleri?",
    a: "Paketler sayfasından planları karşılaştırabilirsiniz. Yükseltme veya fatura soruları için forma yazın; 1 iş günü içinde dönüş yaparız.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section
      className="relative overflow-hidden border-t border-bonero-dark/6 py-16 sm:py-24"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f3f6f4 55%, #eef3f0 100%)",
      }}
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              SSS
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              Sık sorulanlar
            </h2>
            <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
              Çalışma saatleri, demo, kurulum ve destek — forma yazmadan önce
              bilmeniz gerekenler.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="space-y-2">
              {faqs.map((item, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={item.q} delay={i * 0.04}>
                    <li className="overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                      >
                        <span className="text-sm font-semibold text-bonero-dark sm:text-base">
                          {item.q}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-bonero-dark/35 transition-transform ${
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
                            transition={{ duration: 0.28, ease }}
                            className="overflow-hidden"
                          >
                            <p className="border-t border-bonero-dark/6 px-5 py-4 text-sm leading-relaxed text-bonero-dark/55 sm:px-6">
                              {item.a}
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
