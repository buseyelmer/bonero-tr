"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

type Seal = {
  mark: string;
  title: { tr: string; en: string };
  detail: { tr: string; en: string };
};

const seals: Seal[] = [
  {
    mark: "AES",
    title: { tr: "256-bit şifreleme", en: "256-bit encryption" },
    detail: {
      tr: "Transit ve at-rest koruma",
      en: "Protected in transit & at rest",
    },
  },
  {
    mark: "AWS",
    title: { tr: "AWS barındırma", en: "Hosted on AWS" },
    detail: {
      tr: "Kurumsal ölçekli altyapı",
      en: "Enterprise-grade infrastructure",
    },
  },
  {
    mark: "PEN",
    title: { tr: "Penetrasyon testleri", en: "Penetration tests" },
    detail: {
      tr: "Düzenli bağımsız denetim",
      en: "Regular independent audits",
    },
  },
  {
    mark: "TLS",
    title: { tr: "SSL / TLS", en: "SSL / TLS" },
    detail: {
      tr: "Uçtan uca güvenli bağlantı",
      en: "End-to-end secure links",
    },
  },
];

const copy = {
  tr: {
    eyebrow: "Güven & Altyapı",
    title: "Güvenlik slogan değil — omurga.",
    subtitle:
      "Koruma pazarlama cümlesi değil; platformun taşıyıcı sistemi. Müşteri verisi kurumsal standartta kalır.",
    verified: "Doğrulandı",
    live: "Aktif koruma",
  },
  en: {
    eyebrow: "Trust & Stack",
    title: "Security isn’t a slogan — it’s the spine.",
    subtitle:
      "Protection isn’t marketing; it’s the platform’s load-bearing system. Client data stays enterprise-grade.",
    verified: "Verified",
    live: "Active protection",
  },
};

const HOLD = 3400;
const ease = [0.22, 1, 0.36, 1] as const;

export default function TrustStrip() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [focus, setFocus] = useState(0);
  const [inView, setInView] = useState(false);
  const current = seals[focus];

  useEffect(() => {
    const el = document.getElementById("guven");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(() => {
      setFocus((p) => (p + 1) % seals.length);
    }, HOLD);
    return () => clearTimeout(id);
  }, [focus, inView]);

  return (
    <section
      id="guven"
      aria-label={locale === "tr" ? "Güven ve altyapı" : "Trust and stack"}
      className="relative bg-transparent py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-3 border-t border-bonero-dark/10 pt-12 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-bonero-green" />
                </span>
                <p className="text-sm font-medium tracking-wide text-bonero-green uppercase">
                  {t.eyebrow}
                </p>
              </div>
              <h2 className="font-heading mt-3 text-2xl tracking-wide text-bonero-dark sm:text-3xl">
                {t.title}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-bonero-dark/50">
              {t.subtitle}
            </p>
          </div>
        </Reveal>

        {/* Typographic seals — no dark slab */}
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-6">
          {seals.map((seal, i) => {
            const on = focus === i;
            return (
              <button
                key={seal.mark}
                type="button"
                onClick={() => setFocus(i)}
                className="group text-left"
              >
                <p
                  className={`font-heading text-4xl tracking-wide transition-colors sm:text-5xl ${
                    on
                      ? "text-bonero-green"
                      : "text-bonero-dark/15 group-hover:text-bonero-dark/35"
                  }`}
                >
                  {seal.mark}
                </p>
                <p
                  className={`mt-2 text-xs font-semibold transition-colors ${
                    on ? "text-bonero-dark" : "text-bonero-dark/35"
                  }`}
                >
                  {seal.title[locale]}
                </p>
                {on && (
                  <motion.div
                    layoutId="trust-underline"
                    className="mt-3 h-0.5 w-10 rounded-full bg-bonero-green"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.mark}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease }}
            className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-bonero-dark/8 pb-10"
          >
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-bonero-green uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-bonero-green" />
              {t.verified} · {t.live}
            </span>
            <span className="text-sm text-bonero-dark/55">
              {current.detail[locale]}
            </span>
          </motion.div>
        </AnimatePresence>

        <motion.div
          key={focus}
          className="mt-0 h-px origin-left bg-bonero-green/40"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: HOLD / 1000, ease: "linear" }}
          style={{ marginTop: -1 }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
