"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BrandLogo from "./BrandLogo";
import LanguageToggle from "./LanguageToggle";
import CtaButton from "./ui/CtaButton";
import { useLocale } from "./LocaleProvider";
import { FEATURE_NAV_GROUPS } from "@/lib/feature-nav";
import { PANEL_REGISTER_URL } from "@/lib/panel";

type NavLink = {
  href: string;
  label: string;
  section?: string;
  featuresMenu?: boolean;
  id: string;
};

const navByLocale: Record<"tr" | "en", NavLink[]> = {
  tr: [
    { id: "features", href: "/features", label: "Özellikler", featuresMenu: true },
    { id: "cozumler", href: "/#cozumler", label: "Neden Bonero", section: "cozumler" },
    { id: "paketler", href: "/paketler", label: "Paketler" },
    { id: "iletisim", href: "/iletisim", label: "İletişim" },
  ],
  en: [
    { id: "features", href: "/features", label: "Features", featuresMenu: true },
    { id: "cozumler", href: "/#cozumler", label: "Why Bonero", section: "cozumler" },
    { id: "paketler", href: "/paketler", label: "Plans" },
    { id: "iletisim", href: "/iletisim", label: "Contact" },
  ],
};

const copy = {
  tr: {
    cta: "Hemen Başla",
    home: "Bonero ana sayfa",
    menu: "Ana menü",
    mobile: "Mobil menü",
    open: "Menüyü aç",
    close: "Menüyü kapat",
    features: "Özellikler",
    allFeatures: "Tüm özellikleri gör",
    explore: "Ana özellikler",
  },
  en: {
    cta: "Get Started",
    home: "Bonero home",
    menu: "Main menu",
    mobile: "Mobile menu",
    open: "Open menu",
    close: "Close menu",
    features: "Features",
    allFeatures: "See all features",
    explore: "Core features",
  },
};

const SECTION_IDS = ["cozumler"] as const;

export default function Header() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const featuresRef = useRef<HTMLLIElement>(null);
  const navLinks = navByLocale[locale];
  const t = copy[locale];
  const featuresActive =
    pathname === "/features" || pathname.startsWith("/features/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -58% 0px", threshold: [0.1, 0.35, 0.6] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setFeaturesOpen(false);
    setMobileFeaturesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!featuresOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (!featuresRef.current?.contains(e.target as Node)) setFeaturesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFeaturesOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [featuresOpen]);

  const isActive = (href: string, section?: string) => {
    if (section && pathname === "/") return activeSection === section;
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isFeatureItemActive = (href: string) =>
    href !== "/features" &&
    (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] border-b backdrop-blur-xl transition-colors duration-200 ${
        scrolled || open
          ? "border-bonero-dark/8 bg-white"
          : "border-bonero-dark/8 bg-white/95"
      }`}
    >
      <div className="page-pad mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link
          href="/"
          className="shrink-0"
          aria-label={t.home}
          onClick={() => setOpen(false)}
        >
          <BrandLogo priority className="!h-7 sm:!h-8" />
        </Link>

        <nav className="hidden h-full lg:block" aria-label={t.menu}>
          <ul className="flex h-full items-stretch gap-1">
            {navLinks.map((link) => {
              if (link.featuresMenu) {
                const active = featuresActive || featuresOpen;
                return (
                  <li
                    key={link.id}
                    ref={featuresRef}
                    className="relative flex items-stretch"
                  >
                    <button
                      type="button"
                      className={`relative inline-flex items-center gap-1 px-3 text-sm font-medium transition-colors ${
                        active
                          ? "text-bonero-dark"
                          : "text-bonero-dark/50 hover:text-bonero-dark"
                      }`}
                      aria-expanded={featuresOpen}
                      aria-haspopup="menu"
                      onClick={() => setFeaturesOpen((v) => !v)}
                      onMouseEnter={() => setFeaturesOpen(true)}
                    >
                      {link.label}
                      <ChevronDown
                        size={13}
                        className={`opacity-55 transition-transform ${featuresOpen ? "rotate-180" : ""}`}
                      />
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-2 bottom-0 h-px bg-bonero-green"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {featuresOpen && (
                        <motion.div
                          role="menu"
                          aria-label={t.features}
                          className="absolute top-full left-0 z-[120] mt-0 w-[min(52rem,calc(100vw-2rem))] overflow-hidden rounded-b-2xl border border-t-0 border-bonero-dark/10 bg-white shadow-[0_24px_60px_-28px_rgba(30,41,59,0.4)]"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          onMouseLeave={() => setFeaturesOpen(false)}
                        >
                          <div className="border-b border-bonero-dark/6 px-6 py-3.5">
                            <p className="text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/35 uppercase">
                              {t.explore}
                            </p>
                          </div>

                          <div className="grid gap-8 px-6 py-5 sm:grid-cols-[1fr_1fr_1.35fr] sm:pr-8">
                            {FEATURE_NAV_GROUPS.map((group) => (
                              <div key={group.id} className="min-w-0">
                                <p className="mb-2.5 text-[10px] font-semibold tracking-[0.14em] text-bonero-dark/35 uppercase">
                                  {locale === "en" ? group.titleEn : group.title}
                                </p>
                                <ul className="space-y-1">
                                  {group.items.map((item) => {
                                    const Icon = item.icon;
                                    const on = isFeatureItemActive(item.href);
                                    return (
                                      <li key={item.id}>
                                        <Link
                                          href={item.href}
                                          role="menuitem"
                                          className={`flex items-start gap-3 rounded-xl px-2.5 py-2.5 transition-colors ${
                                            on
                                              ? "bg-bonero-green/8 text-bonero-green"
                                              : "text-bonero-dark/75 hover:bg-bonero-dark/[0.03] hover:text-bonero-dark"
                                          }`}
                                          onClick={() => setFeaturesOpen(false)}
                                        >
                                          <span
                                            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                                              on
                                                ? "border-bonero-green/20 bg-bonero-green/10"
                                                : "border-bonero-dark/8 bg-bonero-dark/[0.03]"
                                            }`}
                                          >
                                            <Icon size={15} strokeWidth={1.75} />
                                          </span>
                                          <span className="min-w-0 flex-1 pr-1">
                                            <span className="block text-sm font-semibold leading-snug">
                                              {locale === "en"
                                                ? item.labelEn
                                                : item.label}
                                            </span>
                                            <span className="mt-0.5 block text-[11px] leading-relaxed text-bonero-dark/40">
                                              {locale === "en"
                                                ? item.descriptionEn
                                                : item.description}
                                            </span>
                                          </span>
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between gap-3 border-t border-bonero-dark/8 bg-bonero-dark/[0.02] px-6 py-3.5 sm:pr-8">
                            <Link
                              href="/features"
                              role="menuitem"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-bonero-green hover:opacity-80"
                              onClick={() => setFeaturesOpen(false)}
                            >
                              {t.allFeatures}
                              <ArrowUpRight size={12} />
                            </Link>
                            <Link
                              href={PANEL_REGISTER_URL}
                              className="inline-flex items-center gap-1 rounded-lg bg-bonero-green px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1a9a52]"
                              onClick={() => setFeaturesOpen(false)}
                            >
                              {t.cta}
                              <ArrowUpRight size={12} />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              const active = isActive(link.href, link.section);
              return (
                <li key={link.id} className="relative flex items-stretch">
                  <Link
                    href={link.href}
                    className={`relative inline-flex items-center px-3 text-sm font-medium transition-colors ${
                      active
                        ? "text-bonero-dark"
                        : "text-bonero-dark/50 hover:text-bonero-dark"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-2 bottom-0 h-px bg-bonero-green"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <LanguageToggle variant="segment" />
          </div>

          <CtaButton
            href={PANEL_REGISTER_URL}
            variant="primary"
            size="sm"
            icon={<ArrowUpRight size={14} />}
            className="hidden sm:inline-flex"
          >
            {t.cta}
          </CtaButton>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-bonero-dark transition-colors hover:bg-bonero-dark/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.close : t.open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={t.mobile}
            className="border-t border-bonero-dark/8 bg-white lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="max-h-[min(70vh,560px)] space-y-0.5 overflow-y-auto px-4 py-4 sm:px-6">
              {navLinks.map((link) => {
                if (link.featuresMenu) {
                  return (
                    <div key={link.id}>
                      <button
                        type="button"
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium ${
                          featuresActive ? "text-bonero-green" : "text-bonero-dark"
                        }`}
                        aria-expanded={mobileFeaturesOpen}
                        onClick={() => setMobileFeaturesOpen((v) => !v)}
                      >
                        <span className="relative">
                          {link.label}
                          {featuresActive && (
                            <span className="absolute inset-x-0 -bottom-1 h-px bg-bonero-green" />
                          )}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`opacity-50 transition-transform ${mobileFeaturesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileFeaturesOpen && (
                        <div className="mb-3 space-y-4 border-l border-bonero-dark/10 py-1 pl-3">
                          {FEATURE_NAV_GROUPS.map((group) => (
                            <div key={group.id}>
                              <p className="mb-1 px-2 text-[10px] font-semibold tracking-[0.14em] text-bonero-dark/35 uppercase">
                                {locale === "en" ? group.titleEn : group.title}
                              </p>
                              {group.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={item.id}
                                    href={item.href}
                                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-bonero-dark/65 hover:text-bonero-dark"
                                    onClick={() => setOpen(false)}
                                  >
                                    <Icon size={15} className="shrink-0 opacity-60" />
                                    <span>
                                      {locale === "en" ? item.labelEn : item.label}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          ))}
                          <Link
                            href="/features"
                            className="block px-2 py-2 text-sm font-semibold text-bonero-green"
                            onClick={() => setOpen(false)}
                          >
                            {t.allFeatures}
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }

                const active = isActive(link.href, link.section);
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={`block rounded-lg px-3 py-3 text-base font-medium ${
                      active ? "text-bonero-green" : "text-bonero-dark"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="relative inline-block">
                      {link.label}
                      {active && (
                        <span className="absolute inset-x-0 -bottom-1 h-px bg-bonero-green" />
                      )}
                    </span>
                  </Link>
                );
              })}

              <div className="mt-3 border-t border-bonero-dark/8 pt-4 md:hidden">
                <LanguageToggle variant="segment" />
              </div>
              <CtaButton
                href={PANEL_REGISTER_URL}
                variant="primary"
                size="md"
                icon={<ArrowUpRight size={15} />}
                className="mt-3 w-full"
                fullWidth
                onClick={() => setOpen(false)}
              >
                {t.cta}
              </CtaButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
