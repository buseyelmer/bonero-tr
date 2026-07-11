"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  LayoutDashboard,
  Megaphone,
  Menu,
  Sparkles,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BrandLogo from "./BrandLogo";
import LanguageToggle from "./LanguageToggle";
import { useLocale } from "./LocaleProvider";
import {
  FEATURE_PAGES,
  featureHref,
  type FeatureSlug,
} from "@/lib/features";
import { PANEL_LOGIN_URL, PANEL_REGISTER_URL } from "@/lib/panel";

type NavLink = {
  href: string;
  label: string;
  section?: string;
  featuresMenu?: boolean;
  id: string;
};

const FEATURE_ICONS: Record<FeatureSlug, LucideIcon> = {
  "gelen-kutusu": LayoutDashboard,
  "yapay-zeka": Sparkles,
  "ai-reklam": Megaphone,
  isbirligi: Users,
  raporlama: BarChart3,
};

const navByLocale: Record<"tr" | "en", NavLink[]> = {
  tr: [
    { id: "features", href: "/features", label: "Özellikler", featuresMenu: true },
    { id: "cozumler", href: "/#cozumler", label: "Çözümler", section: "cozumler" },
    {
      id: "nasil",
      href: "/#nasil-calisir",
      label: "Nasıl Çalışır",
      section: "nasil-calisir",
    },
    { id: "paketler", href: "/paketler", label: "Paketler" },
    { id: "iletisim", href: "/iletisim", label: "İletişim" },
  ],
  en: [
    { id: "features", href: "/features", label: "Features", featuresMenu: true },
    { id: "cozumler", href: "/#cozumler", label: "Solutions", section: "cozumler" },
    {
      id: "nasil",
      href: "/#nasil-calisir",
      label: "How It Works",
      section: "nasil-calisir",
    },
    { id: "paketler", href: "/paketler", label: "Plans" },
    { id: "iletisim", href: "/iletisim", label: "Contact" },
  ],
};

const copy = {
  tr: {
    cta: "Hemen Başla",
    login: "Giriş",
    home: "Bonero ana sayfa",
    menu: "Ana menü",
    mobile: "Mobil menü",
    open: "Menüyü aç",
    close: "Menüyü kapat",
    features: "Özellikler",
    allFeatures: "Tüm özellikler",
  },
  en: {
    cta: "Get Started",
    login: "Log in",
    home: "Bonero home",
    menu: "Main menu",
    mobile: "Mobile menu",
    open: "Open menu",
    close: "Close menu",
    features: "Features",
    allFeatures: "All features",
  },
};

const SECTION_IDS = ["cozumler", "nasil-calisir"] as const;

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
                          className="absolute top-full left-1/2 z-[120] mt-0 w-[22rem] -translate-x-1/2 overflow-hidden rounded-b-2xl border border-t-0 border-bonero-dark/10 bg-white py-2 shadow-[0_20px_50px_-24px_rgba(30,41,59,0.35)] backdrop-blur-xl"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          onMouseLeave={() => setFeaturesOpen(false)}
                        >
                          {FEATURE_PAGES.map((f) => {
                            const href = featureHref(f.slug);
                            const on = pathname === href;
                            const Icon = FEATURE_ICONS[f.slug];
                            return (
                              <Link
                                key={f.slug}
                                href={href}
                                role="menuitem"
                                className={`mx-1.5 flex items-start gap-3 rounded-xl px-2.5 py-2.5 text-sm transition-colors ${
                                  on
                                    ? "bg-bonero-green/8 text-bonero-green"
                                    : "text-bonero-dark/70 hover:bg-bonero-dark/[0.03] hover:text-bonero-dark"
                                }`}
                                onClick={() => setFeaturesOpen(false)}
                              >
                                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-bonero-dark/8 bg-bonero-dark/[0.03]">
                                  <Icon size={15} strokeWidth={1.75} />
                                </span>
                                <span className="min-w-0">
                                  <span className="block font-semibold">
                                    {locale === "en" ? f.navLabelEn : f.navLabel}
                                  </span>
                                  <span className="mt-0.5 block truncate text-[11px] leading-snug text-bonero-dark/40">
                                    {locale === "en" ? f.eyebrowEn : f.eyebrow}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                          <div className="mt-1 border-t border-bonero-dark/8 px-4 pt-2.5 pb-1.5">
                            <Link
                              href="/features"
                              role="menuitem"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-bonero-green hover:opacity-80"
                              onClick={() => setFeaturesOpen(false)}
                            >
                              {t.allFeatures}
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
          <div className="hidden items-center gap-3 md:flex">
            <LanguageToggle variant="segment" />
            <Link
              href={PANEL_LOGIN_URL}
              className="text-sm font-medium text-bonero-dark/45 transition-colors hover:text-bonero-dark"
            >
              {t.login}
            </Link>
          </div>

          <Link
            href={PANEL_REGISTER_URL}
            className="group hidden items-center gap-1.5 rounded-xl bg-bonero-green px-3.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1a9a52] sm:inline-flex"
          >
            {t.cta}
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

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
            <nav className="max-h-[min(70vh,520px)] space-y-0.5 overflow-y-auto px-4 py-4 sm:px-6">
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
                        <div className="mb-2 ml-2 space-y-0.5 border-l border-bonero-dark/10 pl-3">
                          {FEATURE_PAGES.map((f) => {
                            const Icon = FEATURE_ICONS[f.slug];
                            return (
                              <Link
                                key={f.slug}
                                href={featureHref(f.slug)}
                                className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-bonero-dark/60 hover:text-bonero-dark"
                                onClick={() => setOpen(false)}
                              >
                                <Icon size={15} />
                                {locale === "en" ? f.navLabelEn : f.navLabel}
                              </Link>
                            );
                          })}
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

              <div className="mt-3 flex items-center justify-between border-t border-bonero-dark/8 pt-4">
                <LanguageToggle variant="segment" />
                <Link
                  href={PANEL_LOGIN_URL}
                  className="text-sm font-medium text-bonero-dark/45 hover:text-bonero-dark"
                  onClick={() => setOpen(false)}
                >
                  {t.login}
                </Link>
              </div>
              <Link
                href={PANEL_REGISTER_URL}
                className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-bonero-green px-4 py-3 text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                {t.cta}
                <ArrowUpRight size={15} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
