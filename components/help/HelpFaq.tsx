"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";

const faqs = [
  {
    q: {
      tr: "Kurulum ne kadar sürer?",
      en: "How long does setup take?",
    },
    a: {
      tr: "Çoğu hesap yaklaşık 15 dakikada hazır olur. Kanalları bağladıktan sonra Unified Inbox hemen kullanılabilir.",
      en: "Most accounts are ready in about 15 minutes. After connecting channels, the Unified Inbox is available right away.",
    },
  },
  {
    q: {
      tr: "Hangi kanallar destekleniyor?",
      en: "Which channels are supported?",
    },
    a: {
      tr: "Instagram, WhatsApp Business, Gmail/Outlook ve planınıza göre ek kanallar. Güncel liste Entegrasyonlar bölümündedir.",
      en: "Instagram, WhatsApp Business, Gmail/Outlook, and additional channels depending on your plan. See Integrations for the current list.",
    },
  },
  {
    q: {
      tr: "Verilerim nerede barındırılıyor?",
      en: "Where is my data hosted?",
    },
    a: {
      tr: "Altyapımız AWS üzerinde çalışır; transit ve at-rest şifreleme uygulanır. Ayrıntılar için KVKK metnine bakın.",
      en: "Our infrastructure runs on AWS with encryption in transit and at rest. See our privacy notice for details.",
    },
  },
  {
    q: {
      tr: "Ekip rollerini nasıl ayarlarım?",
      en: "How do I set up team roles?",
    },
    a: {
      tr: "Hesapta rol bazlı onay ve görev atama bulunur. Demo sırasında ekibinizle birlikte yapılandırırız.",
      en: "The account includes role-based approvals and task assignment. We configure it with your team during onboarding.",
    },
  },
];

const copy = {
  tr: {
    eyebrow: "SSS",
    title: "Sık sorulanlar",
    lead: "Kurulum, kanallar, güvenlik ve ekip — satışa yazmadan önce bilmeniz gerekenler.",
  },
  en: {
    eyebrow: "FAQ",
    title: "Frequently asked",
    lead: "Setup, channels, security, and team — what to know before you reach out to sales.",
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function HelpFaq() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [open, setOpen] = useState(0);

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f3f6f4 55%, #eef3f0 100%)",
      }}
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <p className="text-sm font-medium tracking-wide text-bonero-green uppercase">
              {t.eyebrow}
            </p>
            <h2 className="font-heading mt-3 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
              {t.lead}
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="space-y-2">
              {faqs.map((item, i) => {
                const isOpen = open === i;
                const question = item.q[locale];
                return (
                  <Reveal key={question} delay={i * 0.04}>
                    <li className="overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white/90">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                      >
                        <span className="font-mono text-xs font-medium tabular-nums text-bonero-green">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 font-medium text-bonero-dark">
                          {question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-bonero-dark/35 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-bonero-green" : ""
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
                          >
                            <p className="border-t border-bonero-dark/6 px-5 pb-5 pl-[3.25rem] text-sm leading-relaxed text-bonero-dark/60 sm:px-6 sm:pb-6 sm:pl-[3.75rem]">
                              {item.a[locale]}
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
