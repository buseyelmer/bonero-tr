"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Clock, Link2, Shield, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { helpArticleHref } from "@/lib/help";

const faqs = [
  {
    icon: Clock,
    q: {
      tr: "Kurulum ne kadar sürer?",
      en: "How long does setup take?",
    },
    a: {
      tr: "Çoğu hesap yaklaşık 15 dakikada hazır olur. İlk kanalı bağladıktan sonra gelen kutusu hemen kullanılabilir. Adım adım için Hızlı başlangıç rehberine bakın.",
      en: "Most accounts are ready in about 15 minutes. After connecting the first channel, the inbox is available right away. See the Quick start guide for steps.",
    },
    link: { href: helpArticleHref("hizli-baslangic"), tr: "Hızlı başlangıç", en: "Quick start" },
  },
  {
    icon: Link2,
    q: {
      tr: "Hangi kanallar destekleniyor?",
      en: "Which channels are supported?",
    },
    a: {
      tr: "WhatsApp Business, Instagram, Gmail/Outlook ve planınıza göre ek kanallar. Bağlama adımları Omnichannel rehberinde.",
      en: "WhatsApp Business, Instagram, Gmail/Outlook, and more depending on your plan. Connection steps are in the Omnichannel guide.",
    },
    link: {
      href: helpArticleHref("omnichannel-gelen-kutusu"),
      tr: "Gelen kutusu rehberi",
      en: "Inbox guide",
    },
  },
  {
    icon: Shield,
    q: {
      tr: "Verilerim güvende mi?",
      en: "Is my data safe?",
    },
    a: {
      tr: "Altyapı AWS üzerinde; transit ve at-rest şifreleme uygulanır. Erişim rol bazlıdır. Ayrıntılar için KVKK / gizlilik metnine bakın.",
      en: "Infrastructure runs on AWS with encryption in transit and at rest. Access is role-based. See the privacy notice for details.",
    },
    link: { href: "/kvkk", tr: "KVKK metni", en: "Privacy notice" },
  },
  {
    icon: Users,
    q: {
      tr: "Ekip rollerini nasıl ayarlarım?",
      en: "How do I set up team roles?",
    },
    a: {
      tr: "Ayarlar → Ekip’ten Operatör / Yönetici gibi roller atarsınız. Onay hattı ve görevler Operasyon rehberinde anlatılır.",
      en: "Assign roles like Operator / Manager in Settings → Team. Approvals and tasks are covered in the Operations guide.",
    },
    link: {
      href: helpArticleHref("ekip-rolleri-onay"),
      tr: "Ekip & onay rehberi",
      en: "Team & approvals guide",
    },
  },
];

const copy = {
  tr: {
    eyebrow: "SSS",
    title: "Sık sorulanlar",
    lead: "Kurulum, kanal, güvenlik ve ekip — satışa yazmadan önce bilmeniz gerekenler. Cevabın altında ilgili rehber var.",
  },
  en: {
    eyebrow: "FAQ",
    title: "Frequently asked",
    lead: "Setup, channels, security, and team — what to know before you reach out. Each answer links to the related guide.",
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function HelpFaq() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#f6f8f7] py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <p className="text-xs font-bold tracking-[0.14em] text-bonero-green uppercase">
              {t.eyebrow}
            </p>
            <h2 className="font-heading mt-3 text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
              {t.lead}
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="space-y-2.5">
              {faqs.map((item, i) => {
                const isOpen = open === i;
                const Icon = item.icon;
                const question = item.q[locale];
                return (
                  <Reveal key={question} delay={i * 0.04}>
                    <li className="overflow-hidden rounded-2xl border border-bonero-dark/8 bg-white shadow-sm">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center gap-3.5 px-4 py-4 text-left sm:gap-4 sm:px-5 sm:py-5"
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            isOpen
                              ? "bg-bonero-green text-white"
                              : "bg-bonero-dark/5 text-bonero-dark/40"
                          }`}
                        >
                          <Icon size={16} />
                        </span>
                        <span className="flex-1 text-sm font-semibold text-bonero-dark sm:text-base">
                          {question}
                        </span>
                        <ChevronDown
                          size={17}
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
                            <div className="border-t border-bonero-dark/6 px-4 pb-4 pl-[3.75rem] sm:px-5 sm:pb-5 sm:pl-[4.25rem]">
                              <p className="text-sm leading-relaxed text-bonero-dark/55">
                                {item.a[locale]}
                              </p>
                              <Link
                                href={item.link.href}
                                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-bonero-green hover:underline"
                              >
                                {item.link[locale]}
                                <ChevronDown size={12} className="-rotate-90" />
                              </Link>
                            </div>
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
