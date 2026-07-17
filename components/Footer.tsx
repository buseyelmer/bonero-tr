"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import BrandLogo from "./BrandLogo";
import LanguageToggle from "./LanguageToggle";
import { useLocale } from "./LocaleProvider";
import {
  CONTACT_CITY_EN,
  CONTACT_CITY_TR,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/contact";
import { featureHref } from "@/lib/features";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const footerByLocale = {
  tr: {
    blurb:
      "WhatsApp, Instagram, e-posta ve CRM — tek panelde. Omnichannel AI ile günlük operasyonu toparlayın.",
    cta: "Hemen başla",
    productTitle: "Ürün",
    productLinks: [
      { href: "/features", label: "Tüm özellikler" },
      { href: featureHref("gelen-kutusu"), label: "Omnichannel" },
      { href: featureHref("yapay-zeka"), label: "AI Agent" },
      { href: featureHref("ai-reklam"), label: "AI Reklam" },
      { href: featureHref("crm"), label: "CRM" },
      { href: featureHref("randevu"), label: "Randevu" },
      { href: featureHref("icerik"), label: "İçerik" },
      { href: featureHref("email-marketing"), label: "E-posta" },
      { href: featureHref("raporlama"), label: "Raporlama" },
      { href: featureHref("isbirligi"), label: "İşbirliği" },
    ],
    companyTitle: "Şirket",
    companyLinks: [
      { href: "/paketler", label: "Paketler" },
      { href: "/hakkimizda", label: "Hakkımızda" },
      { href: "/kariyer", label: "Kariyer" },
      { href: "/yardim", label: "Yardım Merkezi" },
      { href: "/iletisim", label: "İletişim" },
    ],
    legalTitle: "Yasal",
    legalLinks: [
      { href: "/kullanim-sartlari", label: "Kullanım Şartları" },
      { href: "/kvkk", label: "KVKK / Gizlilik" },
      { href: "/aydinlatma-metni", label: "Aydınlatma Metni" },
      { href: "/iade-iptal", label: "İade / İptal" },
    ],
    contactTitle: "İletişim",
    rights: "© 2026 Bonero®. Tüm hakları saklıdır.",
    affiliateBefore: "Bonero,",
    affiliateBrand: "NEXINE",
    affiliateAfter: " bünyesindedir.",
    socialAria: "Sosyal medya",
  },
  en: {
    blurb:
      "WhatsApp, Instagram, email, and CRM — one panel. Bring daily ops together with omnichannel AI.",
    cta: "Get started",
    productTitle: "Product",
    productLinks: [
      { href: "/features", label: "All features" },
      { href: featureHref("gelen-kutusu"), label: "Omnichannel" },
      { href: featureHref("yapay-zeka"), label: "AI Agent" },
      { href: featureHref("ai-reklam"), label: "AI Ads" },
      { href: featureHref("crm"), label: "CRM" },
      { href: featureHref("randevu"), label: "Appointments" },
      { href: featureHref("icerik"), label: "Content" },
      { href: featureHref("email-marketing"), label: "Email" },
      { href: featureHref("raporlama"), label: "Reporting" },
      { href: featureHref("isbirligi"), label: "Collaboration" },
    ],
    companyTitle: "Company",
    companyLinks: [
      { href: "/paketler", label: "Plans" },
      { href: "/hakkimizda", label: "About" },
      { href: "/kariyer", label: "Careers" },
      { href: "/yardim", label: "Help Center" },
      { href: "/iletisim", label: "Contact" },
    ],
    legalTitle: "Legal",
    legalLinks: [
      { href: "/kullanim-sartlari", label: "Terms" },
      { href: "/kvkk", label: "Privacy / KVKK" },
      { href: "/aydinlatma-metni", label: "Clarification Notice" },
      { href: "/iade-iptal", label: "Refund / Cancellation" },
    ],
    contactTitle: "Contact",
    rights: "© 2026 Bonero®. All rights reserved.",
    affiliateBefore: "Bonero is part of",
    affiliateBrand: "NEXINE",
    affiliateAfter: ".",
    socialAria: "Social media",
  },
};

const NEXINE_URL = "https://nexine.com.tr/";

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

function FooterNavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-bonero-dark/55 transition-colors hover:text-bonero-green"
    >
      {children}
    </Link>
  );
}

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-[11px] font-bold tracking-[0.14em] text-bonero-dark/40 uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { locale } = useLocale();
  const t = footerByLocale[locale];
  const city = locale === "en" ? CONTACT_CITY_EN : CONTACT_CITY_TR;

  return (
    <footer className="relative mt-auto border-t border-bonero-dark/8 bg-white text-bonero-dark">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-bonero-dark/8 py-12 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-md">
            <Link href="/" className="inline-flex">
              <BrandLogo className="!h-7 sm:!h-8" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-bonero-dark/55">{t.blurb}</p>
          </div>
          <Link
            href={PANEL_REGISTER_URL}
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white shadow-md shadow-bonero-green/20 transition-colors hover:bg-bonero-green/90 sm:self-auto"
          >
            {t.cta}
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Ürün — 2 kolonlu özellik listesi */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-[11px] font-bold tracking-[0.14em] text-bonero-dark/40 uppercase">
              {t.productTitle}
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-1">
              {t.productLinks.map((link) => (
                <li key={link.href + link.label}>
                  <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
                </li>
              ))}
            </ul>
          </div>

          <LinkColumn title={t.companyTitle} links={t.companyLinks} />
          <LinkColumn title={t.legalTitle} links={t.legalLinks} />

          <div>
            <h3 className="text-[11px] font-bold tracking-[0.14em] text-bonero-dark/40 uppercase">
              {t.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={CONTACT_EMAIL_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2.5 text-bonero-dark/55 transition-colors hover:text-bonero-green"
                >
                  <Mail size={14} className="mt-0.5 shrink-0 text-bonero-green" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2.5 text-bonero-dark/55 transition-colors hover:text-bonero-green"
                >
                  <Phone size={14} className="mt-0.5 shrink-0 text-bonero-green" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5 text-bonero-dark/55">
                <MapPin size={14} className="mt-0.5 shrink-0 text-bonero-green" />
                {city}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-bonero-dark/8 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] text-bonero-dark/40">{t.rights}</p>
            <p className="mt-1.5 text-[12px] text-bonero-dark/50">
              {t.affiliateBefore}{" "}
              <a
                href={NEXINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold tracking-wide text-bonero-dark underline decoration-bonero-green/40 underline-offset-[3px] transition-colors hover:text-bonero-green hover:decoration-bonero-green"
              >
                {t.affiliateBrand}
              </a>
              {t.affiliateAfter}
            </p>
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
      </div>
    </footer>
  );
}
