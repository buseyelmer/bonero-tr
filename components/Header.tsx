"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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

const ctaByLocale = {
  tr: "Ücretsiz Demo",
  en: "Free Demo",
};

export default function Header() {
  const { locale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navLinks = navByLocale[locale];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] glass-nav transition-shadow duration-300 ${
        scrolled || open ? "shadow-sm" : ""
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="relative z-[101] flex shrink-0 items-center"
          aria-label="Bonero ana sayfa"
          onClick={() => setOpen(false)}
        >
          <BrandLogo priority />
        </Link>

        <nav
          className="absolute left-1/2 z-[101] hidden -translate-x-1/2 items-center gap-8 md:flex"
          aria-label="Ana menü"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-bonero-dark/65 transition-colors hover:text-bonero-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-[101] hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <Link
            href="/iletisim"
            className="rounded-lg bg-bonero-green px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-bonero-green/90"
          >
            {ctaByLocale[locale]}
          </Link>
        </div>

        <div className="relative z-[101] flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-bonero-dark transition-colors hover:bg-bonero-dark/5"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-bonero-dark/8 bg-white/90 px-4 py-4 backdrop-blur-md md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobil menü">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-bonero-dark/80 transition-colors hover:bg-bonero-dark/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/iletisim"
              className="mt-2 rounded-lg bg-bonero-green px-3 py-3.5 text-center text-base font-medium text-white transition-all hover:scale-105"
              onClick={() => setOpen(false)}
            >
              {ctaByLocale[locale]}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
