"use client";

import { useState } from "react";
import { ArrowUpRight, Shield, Plug, Users, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Reveal from "./Reveal";

type FaqItem = {
  q: string;
  a: string;
  tag: string;
  icon: typeof Shield;
};

const faqs: FaqItem[] = [
  {
    tag: "Güvenlik",
    icon: Lock,
    q: "Tüm kanalları tek panelde toplamak güvenlik riski yaratır mı?",
    a: "Hayır. Bonero tüm bağlantıları uçtan uca şifreli (SSL) API protokolleri üzerinden kurar. Veriler şifreli aktarılır ve saklanır; erişim rol bazlı yetkilendirme ile sınırlandırılır. Her çalışma alanı izole yönetilir.",
  },
  {
    tag: "Veri",
    icon: Shield,
    q: "Müşterilerimin verileri güvende mi?",
    a: "Evet. Veriler şifreli aktarılır ve saklanır; erişim rol bazlı yetkilendirme ile sınırlandırılır. Her çalışma alanı izole yönetilir.",
  },
  {
    tag: "Entegrasyon",
    icon: Plug,
    q: "Hangi platformlarla entegre çalışıyor?",
    a: "Instagram, Meta Business Suite, WhatsApp Business, Gmail, Outlook ve LinkedIn başta olmak üzere işletmelerin en çok kullandığı kanallarla entegre çalışır. Yeni entegrasyonlar düzenli olarak eklenir.",
  },
  {
    tag: "Operasyon",
    icon: Users,
    q: "Birden fazla müşteri hesabı yönetebilir miyim?",
    a: "Evet. Bonero çoklu müşteri yapısı için tasarlandı. Ekip rolleri, onay akışları ve raporları müşteri bazında ayrı ayrı yönetebilirsiniz.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Faq() {
  const [active, setActive] = useState(0);
  const current = faqs[active];
  const Icon = current.icon;

  return (
    <section
      id="sss"
      className="relative overflow-x-clip py-16 sm:py-24"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f3f6f4 55%, #eef3f0 100%)",
      }}
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-xl">
            <p className="text-sm font-medium tracking-wide text-bonero-green uppercase">
              SSS
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.65rem]">
              Sıkça sorulan sorular
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-sm text-sm leading-relaxed text-bonero-dark/50">
              Güvenlik, veri, entegrasyon ve operasyon — satışa yazmadan önce
              bilmeniz gerekenler.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-6 lg:items-stretch">
          {/* Question index */}
          <Reveal className="lg:col-span-5">
            <ul className="flex flex-col gap-2" role="tablist" aria-label="SSS">
              {faqs.map((faq, i) => {
                const on = active === i;
                return (
                  <li key={faq.q}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActive(i)}
                      className={`flex w-full items-start gap-3 rounded-2xl px-4 py-4 text-left transition-colors ${
                        on
                          ? "bg-bonero-dark text-white shadow-lg shadow-bonero-dark/15"
                          : "bg-white/80 text-bonero-dark/70 ring-1 ring-bonero-dark/6 hover:bg-white"
                      }`}
                    >
                      <span
                        className={`mt-0.5 font-heading text-sm tabular-nums ${
                          on ? "text-bonero-green" : "text-bonero-dark/25"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-[10px] font-bold tracking-[0.16em] uppercase ${
                            on ? "text-bonero-green" : "text-bonero-dark/35"
                          }`}
                        >
                          {faq.tag}
                        </span>
                        <span
                          className={`mt-1 block min-w-0 text-sm font-semibold leading-snug break-words sm:text-[0.95rem] ${
                            on ? "text-white" : "text-bonero-dark"
                          }`}
                        >
                          {faq.q}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Answer stage */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[1.5rem] bg-white p-5 shadow-[0_24px_50px_-28px_rgba(30,41,59,0.2)] sm:min-h-[320px] sm:p-8">
              <div
                className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full opacity-70"
                style={{
                  background:
                    "radial-gradient(circle, rgba(24,131,71,0.12), transparent 70%)",
                }}
                aria-hidden="true"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease }}
                  className="relative flex h-full flex-col"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <span className="rounded-full bg-bonero-dark/[0.05] px-3 py-1 text-[11px] font-bold tracking-wide text-bonero-dark/50 uppercase">
                      {current.tag}
                    </span>
                  </div>

                  <h3 className="font-heading mt-6 text-xl tracking-wide break-words text-bonero-dark sm:text-2xl">
                    {current.q}
                  </h3>
                  <p className="mt-4 flex-1 text-base leading-relaxed break-words text-bonero-dark/60">
                    {current.a}
                  </p>

                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-bonero-dark/6 pt-5">
                    <p className="text-xs text-bonero-dark/40">
                      {active + 1} / {faqs.length}
                    </p>
                    <Link
                      href="/iletisim"
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-bonero-green transition-colors hover:text-bonero-dark"
                    >
                      Hâlâ sorunuz mu var?
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
