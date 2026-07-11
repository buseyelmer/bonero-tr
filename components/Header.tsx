"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BrandLogo from "./BrandLogo";
import LanguageToggle from "./LanguageToggle";
import { useLocale } from "./LocaleProvider";

const navByLocale = {
  tr: [
    { href: "/#ozellikler", label: "Özellikler" },
    { href: "/#cozumler", label: "Çözümler" },
    { href: "/paketler", label: "Paketler" },
  ],
  en: [
    { href: "/#ozellikler", label: "Features" },
    { href: "/#cozumler", label: "Solutions" },
    { href: "/paketler", label: "Plans" },
  ],
};

const copy = {
  tr: {
    cta: "Ücretsiz Demo",
    home: "Bonero ana sayfa",
    menu: "Ana menü",
    mobile: "Mobil menü",
    open: "Menüyü aç",
    close: "Menüyü kapat",
  },
  en: {
    cta: "Free Demo",
    home: "Bonero home",
    menu: "Main menu",
    mobile: "Mobile menu",
    open: "Open menu",
    close: "Close menu",
  },
};

export default function Header() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navLinks = navByLocale[locale];
  const t = copy[locale];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
      <div className="pointer-events-none mx-auto max-w-6xl px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
        <motion.div
          className={`pointer-events-auto relative z-[101] flex min-w-0 items-center justify-between gap-2 rounded-full border px-2.5 transition-[padding,box-shadow,background-color,border-color] duration-300 sm:gap-3 sm:px-4 ${
            scrolled || open
              ? "border-bonero-dark/10 bg-white/90 py-2 shadow-[0_12px_40px_-16px_rgba(30,41,59,0.35)] backdrop-blur-xl"
              : "border-white/60 bg-white/55 py-2.5 shadow-[0_8px_30px_-18px_rgba(30,41,59,0.2)] backdrop-blur-md"
          }`}
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/"
            className="relative z-[101] flex min-w-0 shrink items-center pl-0.5 sm:pl-1"
            aria-label={t.home}
            onClick={() => setOpen(false)}
          >
            <BrandLogo
              priority
              className="!h-6 max-w-[7.5rem] sm:!h-8 sm:max-w-none"
            />
          </Link>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
            aria-label={t.menu}
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "text-bonero-dark"
                      : "text-bonero-dark/55 hover:text-bonero-dark"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-bonero-dark/[0.06]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="relative z-[101] hidden items-center gap-2.5 md:flex">
            <LanguageToggle variant="segment" />
            <Link
              href="/iletisim"
              className="group inline-flex items-center gap-1.5 rounded-full bg-bonero-green px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-bonero-green/25 transition-transform hover:scale-[1.03]"
            >
              {t.cta}
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="relative z-[101] flex shrink-0 items-center gap-1 md:hidden">
            <LanguageToggle variant="segment" />
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-bonero-dark transition-colors hover:bg-bonero-dark/5"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.close : t.open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed inset-0 z-[99] bg-[#f7f9f8]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col px-5 pt-20 pb-8 sm:pt-24">
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto" aria-label={t.mobile}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block rounded-2xl px-3 py-4 font-heading text-2xl tracking-wide text-bonero-dark transition-colors hover:bg-white/70"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-bonero-green px-6 py-4 text-base font-semibold text-white shadow-lg shadow-bonero-green/25"
                onClick={() => setOpen(false)}
              >
                {t.cta}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
