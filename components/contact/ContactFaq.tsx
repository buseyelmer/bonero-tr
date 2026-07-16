"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";

const copy = {
  tr: {
    eyebrow: "SSS",
    title: "Sık sorulanlar",
    lead: "Çalışma saatleri, demo, kurulum ve destek — forma yazmadan önce bilmeniz gerekenler.",
    faqs: [
      {
        q: "Neredesiniz ve hangi saatlerde çalışıyorsunuz?",
        a: "İzmir, Konak. Pazartesi–Cuma 09:00–18:00 (GMT+3) arası yanıt veriyoruz.",
      },
      {
        q: "Demo ücretsiz mi?",
        a: "Evet. İlk görüşme ve ürün demosu ücretsizdir. Formdan veya info@bonero.tr üzerinden talep edin.",
      },
      {
        q: "Hesap açtıktan sonra ne kadar sürede kullanırım?",
        a: "Çoğu hesap yaklaşık 15 dakikada kanallarını bağlayıp Unified Inbox’a düşer.",
      },
      {
        q: "Destek talep etmek için nereye yazmalıyım?",
        a: "Bu form, info@bonero.tr veya Yardım Merkezi yeterlidir. Teknik kurulum için Yardım sayfasındaki konulara da bakabilirsiniz.",
      },
      {
        q: "Faturalama ve paket değişiklikleri?",
        a: "Paketler sayfasından planları karşılaştırabilirsiniz. Yükseltme veya fatura soruları için forma yazın; 1 iş günü içinde dönüş yaparız.",
      },
    ],
  },
  en: {
    eyebrow: "FAQ",
    title: "Frequently asked",
    lead: "Hours, demos, setup, and support — what to know before you write.",
    faqs: [
      {
        q: "Where are you based and what are your hours?",
        a: "Izmir, Konak. We respond Monday–Friday, 09:00–18:00 (GMT+3).",
      },
      {
        q: "Is the demo free?",
        a: "Yes. The first call and product demo are free. Request one via the form or at info@bonero.tr.",
      },
      {
        q: "How soon can I use Bonero after signing up?",
        a: "Most accounts connect channels and land in Unified Inbox in about 15 minutes.",
      },
      {
        q: "Where should I go for support?",
        a: "This form, info@bonero.tr, or the Help Center. For technical setup, see the topics on the Help page.",
      },
      {
        q: "Billing and plan changes?",
        a: "Compare plans on the Pricing page. For upgrades or invoice questions, use the form — we reply within 1 business day.",
      },
    ],
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactFaq() {
  const { locale } = useLocale();
  const t = copy[locale];
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
              {t.eyebrow}
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
              {t.lead}
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="space-y-2">
              {t.faqs.map((item, i) => {
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
