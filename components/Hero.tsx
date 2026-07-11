"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Inbox, Link2, Sparkles } from "lucide-react";
import HeroVisual from "./HeroVisual";

const pillars = [
  { icon: Link2, title: "Bağla", text: "Kanalları tek tıkla ekle" },
  { icon: Inbox, title: "Birleştir", text: "Hepsi tek gelen kutusu" },
  { icon: Sparkles, title: "Yanıtla", text: "AI taslak + hızlı gönder" },
];

export default function Hero() {
  return (
    <section className="relative bg-background pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pb-20">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 90% 35%, rgba(24,131,71,0.09), transparent 58%), radial-gradient(ellipse 45% 40% at 5% 90%, rgba(30,41,59,0.05), transparent 50%)",
        }}
      />
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8 xl:gap-14">
        <div className="max-w-xl pt-2">
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-bonero-dark/10 bg-white/80 px-3 py-1 text-xs font-medium tracking-wide text-bonero-dark/55 backdrop-blur-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green opacity-60" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-bonero-green" />
            </span>
            Ajanslar için çok kanallı AI platformu
          </motion.p>

          <motion.h1
            className="font-heading mt-4 text-[2rem] leading-[1.15] tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            Bonero, müşteri mesajlarınızı{" "}
            <span className="text-bonero-green">tek panele</span> toplar.
          </motion.h1>

          <motion.div
            className="mt-4 space-y-3 text-sm leading-relaxed text-bonero-dark/65 sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p>
              <strong className="font-semibold text-bonero-dark">
                Çok kanallı (omnichannel) ne demek?
              </strong>{" "}
              Müşteriniz Instagram’dan, WhatsApp’tan veya e-postadan yazabilir.
              Her kanal ayrı uygulamadaysa mesajlar dağılır, ekip geç yanıt verir.
            </p>
            <p>
              <strong className="font-semibold text-bonero-dark">
                Bonero ne işe yarar?
              </strong>{" "}
              Bu kanalları{" "}
              <span className="font-medium text-bonero-dark/80">
                Birleşik Gelen Kutusu
              </span>
              ’nda bir araya getirir. Yapay zeka yanıt taslağı önerir; ekibiniz
              onaylayıp tek ekrandan gönderir.
            </p>
          </motion.div>

          <motion.div
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-bonero-green px-6 py-3 text-sm font-medium text-white shadow-sm shadow-bonero-green/25 transition-all hover:scale-105 hover:bg-bonero-green/90"
            >
              Ücretsiz Demo
              <ArrowRight size={16} />
            </Link>
            <a
              href="#nasil-calisir"
              className="inline-flex items-center justify-center rounded-lg border border-bonero-dark/15 bg-white/70 px-6 py-3 text-sm font-medium text-bonero-dark transition-colors hover:border-bonero-dark/30 hover:bg-white"
            >
              Nasıl çalışır?
            </a>
          </motion.div>

          <motion.p
            className="mt-3 text-xs text-bonero-dark/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Yaklaşık 15 dakikada kurulum · Kredi kartı gerekmez
          </motion.p>

          <motion.ul
            className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-2.5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <a
                  href="#nasil-calisir"
                  className="flex h-full items-center gap-2.5 rounded-xl border border-bonero-dark/8 bg-white/80 px-3 py-2.5 backdrop-blur-sm transition-colors hover:border-bonero-green/30 hover:bg-white"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bonero-green/10 text-bonero-green">
                    <Icon size={14} strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-bonero-dark">
                      {i + 1}. {title}
                    </p>
                    <p className="truncate text-[11px] text-bonero-dark/45">
                      {text}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="relative w-full overflow-visible lg:pl-4 lg:pr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
