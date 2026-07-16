"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import BrandLogo from "./BrandLogo";
import LanguageToggle from "./LanguageToggle";
import { useLocale } from "./LocaleProvider";
import { CONTACT_CITY_EN, CONTACT_CITY_TR, CONTACT_EMAIL } from "@/lib/contact";

const footerByLocale = {
  tr: {
    blurb: "Tüm işletmeler için omnichannel AI — tek panel.",
    groups: [
      {
        title: "Ürün",
        links: [
          { href: "/features", label: "Özellikler" },
          { href: "/paketler", label: "Paketler" },
          { href: "/yardim", label: "Yardım" },
        ],
      },
      {
        title: "Şirket",
        links: [
          { href: "/hakkimizda", label: "Hakkımızda" },
          { href: "/kariyer", label: "Kariyer" },
          { href: "/iletisim", label: "İletişim" },
        ],
      },
      {
        title: "Yasal",
        links: [
          { href: "/kullanim-sartlari", label: "Kullanım Şartları" },
          { href: "/kvkk", label: "KVKK" },
        ],
      },
    ],
    rights: "© 2026 BONERO®. TÜM HAKLARI SAKLIDIR.",
    affiliate: "BONERO, BİR NEXİNE İŞTİRAKİDİR.",
    socialAria: "Sosyal medya",
  },
  en: {
    blurb: "Omnichannel AI for every business — one panel.",
    groups: [
      {
        title: "Product",
        links: [
          { href: "/features", label: "Features" },
          { href: "/paketler", label: "Plans" },
          { href: "/yardim", label: "Help" },
        ],
      },
      {
        title: "Company",
        links: [
          { href: "/hakkimizda", label: "About" },
          { href: "/kariyer", label: "Careers" },
          { href: "/iletisim", label: "Contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { href: "/kullanim-sartlari", label: "Terms" },
          { href: "/kvkk", label: "KVKK" },
        ],
      },
    ],
    rights: "© 2026 BONERO®. ALL RIGHTS RESERVED.",
    affiliate: "BONERO IS A NEXINE AFFILIATE.",
    socialAria: "Social media",
  },
};

function IconLinkedIn({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.64 4.75 6.07V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V23h-4V8.5z" />
    </svg>
  );
}

function IconInstagram({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconX({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.59l-5.16-6.74L5.2 22H1.94l8.03-9.17L1.5 2h6.75l4.66 6.18L18.244 2zm-1.16 18h1.82L7.02 3.9H5.07L17.084 20z" />
    </svg>
  );
}

const socials = [
  { href: "https://linkedin.com", label: "LinkedIn", Icon: IconLinkedIn },
  { href: "https://instagram.com", label: "Instagram", Icon: IconInstagram },
  { href: "https://x.com", label: "X", Icon: IconX },
];

function FooterNavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-bonero-dark/55 transition-colors hover:text-bonero-green"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const { locale } = useLocale();
  const t = footerByLocale[locale];

  return (
    <footer className="relative mt-auto border-t border-bonero-dark/8 bg-white text-bonero-dark">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-bonero-dark/8 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex">
              <BrandLogo className="!h-8" />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-bonero-dark/55">
              {t.blurb}
            </p>
          </div>

          {t.groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-bonero-dark/40">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-bonero-dark/45">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 hover:text-bonero-green"
            >
              <Mail size={14} className="text-bonero-green" />
              {CONTACT_EMAIL}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-bonero-green" />
              {locale === "en" ? CONTACT_CITY_EN : CONTACT_CITY_TR}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <nav aria-label={t.socialAria} className="flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-bonero-dark/10 text-bonero-dark/40 transition-colors hover:border-bonero-green/35 hover:text-bonero-green"
                >
                  <Icon />
                </a>
              ))}
            </nav>
            <LanguageToggle variant="segment" />
          </div>
        </div>

        <div className="border-t border-bonero-dark/8 py-4">
          <p className="text-[11px] font-medium tracking-[0.06em] text-bonero-dark/40 uppercase">
            {t.rights}
          </p>
          <p className="mt-1 text-[11px] font-medium tracking-[0.06em] text-bonero-dark/40 uppercase">
            {t.affiliate}
          </p>
        </div>
      </div>
    </footer>
  );
}
