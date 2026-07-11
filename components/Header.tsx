"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Özellikler" },
  { href: "#how-it-works", label: "Nasıl Çalışır?" },
  { href: "#faq", label: "SSS" },
  { href: "#contact", label: "İletişim" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-bonero-dark/8 bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
        <a href="#" className="flex items-center gap-2.5" aria-label="Bonero ana sayfa">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bonero-green text-sm font-bold text-white">
            B
          </span>
          <span className="text-lg font-semibold tracking-tight text-bonero-dark">
            Bonero
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Ana menü">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-bonero-dark/70 transition-colors hover:text-bonero-green"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-lg bg-bonero-green px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-bonero-green/90"
          >
            Ücretsiz Demo
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-bonero-dark md:hidden"
          aria-expanded={open}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-bonero-dark/8 bg-white px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobil menü">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-bonero-dark/80 hover:bg-bonero-green/5 hover:text-bonero-green"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-1 rounded-lg bg-bonero-green px-3 py-2.5 text-center text-sm font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Ücretsiz Demo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
