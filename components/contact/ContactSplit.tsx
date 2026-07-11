"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import DemoRequestForm from "@/components/DemoRequestForm";

const contacts = [
  { label: "E-posta", value: "hello@bonero.tr", href: "mailto:hello@bonero.tr" },
  { label: "Telefon", value: "+90 (212) 000 00 00", href: "tel:+902120000000" },
  { label: "Konum", value: "İstanbul, Türkiye" },
];

const social = [
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://x.com", label: "X" },
];

export default function ContactSplit() {
  return (
    <section className="overflow-x-clip bg-[#f4f6f5] pt-24 sm:pt-28">
      <div className="flex min-h-[calc(100svh-5rem)] min-w-0 flex-col sm:min-h-[calc(100svh-5.5rem)] lg:flex-row">
        <aside className="relative flex min-w-0 flex-col justify-between overflow-hidden bg-[#0f1c17] px-5 py-12 sm:px-10 sm:py-14 lg:w-[42%] lg:px-12 lg:py-16 xl:px-16">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 100% 100%, rgba(24,131,71,0.22), transparent 58%), radial-gradient(ellipse 50% 40% at 0% 0%, rgba(24,131,71,0.1), transparent 50%)",
            }}
          />

          <div className="relative">
            <motion.div
              className="mb-8 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
            >
              <span className="relative h-9 w-9 overflow-hidden rounded-lg border border-white/10">
                <Image
                  src="/bonero-mark.png"
                  alt=""
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              </span>
              <p className="text-[11px] font-semibold tracking-[0.22em] text-bonero-green uppercase">
                İletişim
              </p>
            </motion.div>

            <motion.h1
              className="font-heading text-[2.75rem] !font-extrabold leading-[1.05] tracking-wide text-white sm:text-5xl lg:text-[3.25rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Merhaba.
            </motion.h1>

            <motion.p
              className="mt-5 max-w-sm text-base leading-relaxed text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Demo veya soru — yazmanız yeterli. Ekibimiz{" "}
              <span className="text-white/80">1 iş günü</span> içinde dönüş
              yapar.
            </motion.p>

            <motion.ul
              className="mt-12 space-y-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {contacts.map((c) => (
                <li key={c.label}>
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-white/30 uppercase">
                    {c.label}
                  </p>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="mt-1.5 block font-heading text-lg !font-extrabold text-white transition-colors hover:text-bonero-green sm:text-xl"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-1.5 font-heading text-lg !font-extrabold text-white sm:text-xl">
                      {c.value}
                    </p>
                  )}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            className="relative mt-14 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white/40 transition-colors hover:text-bonero-green"
              >
                {s.label}
              </a>
            ))}
            <span className="hidden text-white/15 sm:inline">·</span>
            <Link
              href="/"
              className="text-sm font-medium text-white/40 transition-colors hover:text-white"
            >
              Ana sayfa
            </Link>
          </motion.div>
        </aside>

        <div className="relative flex min-w-0 flex-1 flex-col justify-center overflow-x-clip bg-[#f4f6f5] px-5 py-14 sm:px-10 lg:px-14 lg:py-16 xl:px-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(30,41,59,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative mx-auto w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="text-[11px] font-semibold tracking-[0.2em] text-bonero-dark/40 uppercase">
                Ücretsiz demo
              </p>
              <h2 className="font-heading mt-3 text-2xl !font-extrabold tracking-wide text-bonero-dark sm:text-3xl">
                Ajansınızı anlatın,
                <span className="mt-1 block text-bonero-dark/40">
                  biz zamanı ayarlayalım.
                </span>
              </h2>
            </motion.div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <DemoRequestForm variant="editorial" />
            </motion.div>

            <p className="relative mt-8 text-xs leading-relaxed text-bonero-dark/40">
              Kart gerekmez · Satın alma baskısı yok ·{" "}
              <Link href="/kvkk" className="underline hover:text-bonero-dark">
                KVKK
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
