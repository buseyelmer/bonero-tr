"use client";

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import BrandLogo from "./BrandLogo";
import LanguageToggle from "./LanguageToggle";
import { useLocale } from "./LocaleProvider";

const footerByLocale = {
  tr: {
    blurb:
      "Dijital ajanslar için omnichannel AI iletişim platformu. Tüm kanallar tek panelde; daha hızlı yanıt, daha az sürtünme.",
    groups: [
      {
        title: "Ürün",
        links: [
          { href: "/#ozellikler", label: "Özellikler" },
          { href: "/#birlesik-inbox", label: "Birleşik Gelen Kutusu" },
          { href: "/#neden-bonero", label: "Yapay Zeka Desteği" },
          { href: "/paketler", label: "Paketler" },
          { href: "/#entegrasyonlar", label: "Entegrasyonlar" },
        ],
      },
      {
        title: "Şirket",
        links: [
          { href: "/hakkimizda", label: "Hakkımızda" },
          { href: "/#basari-hikayesi", label: "Başarı Hikayeleri" },
          { href: "/#sss", label: "SSS" },
          { href: "/kariyer", label: "Kariyer" },
        ],
      },
      {
        title: "Yasal & Destek",
        links: [
          { href: "/kullanim-sartlari", label: "Kullanım Şartları" },
          { href: "/kvkk", label: "KVKK" },
          { href: "/iletisim", label: "İletişim" },
          { href: "/yardim", label: "Yardım Merkezi" },
        ],
      },
    ],
    rights: "Tüm hakları saklıdır.",
    socialAria: "Sosyal medya",
  },
  en: {
    blurb:
      "Omnichannel AI communication platform for digital agencies. All channels in one inbox — faster replies, less friction.",
    groups: [
      {
        title: "Product",
        links: [
          { href: "/#ozellikler", label: "Features" },
          { href: "/#birlesik-inbox", label: "Unified Inbox" },
          { href: "/#neden-bonero", label: "AI Support" },
          { href: "/paketler", label: "Plans" },
          { href: "/#entegrasyonlar", label: "Integrations" },
        ],
      },
      {
        title: "Company",
        links: [
          { href: "/hakkimizda", label: "About" },
          { href: "/#basari-hikayesi", label: "Case Studies" },
          { href: "/#sss", label: "FAQ" },
          { href: "/kariyer", label: "Careers" },
        ],
      },
      {
        title: "Legal & Support",
        links: [
          { href: "/kullanim-sartlari", label: "Terms of Use" },
          { href: "/kvkk", label: "Privacy / KVKK" },
          { href: "/iletisim", label: "Contact" },
          { href: "/yardim", label: "Help Center" },
        ],
      },
    ],
    rights: "All rights reserved.",
    socialAria: "Social media",
  },
};

function IconLinkedIn({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.64 4.75 6.07V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V23h-4V8.5z" />
    </svg>
  );
}

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconX({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal && href !== "#") {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export default function Footer() {
  const { locale } = useLocale();
  const t = footerByLocale[locale];

  return (
    <footer className="border-t border-bonero-dark/8 bg-bonero-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center">
              <BrandLogo variant="on-dark" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {t.blurb}
            </p>
            <div className="mt-5 space-y-2 text-sm text-white/60">
              <a
                href="mailto:hello@bonero.tr"
                className="flex items-center gap-2 transition-colors hover:text-bonero-green"
              >
                <Mail size={15} />
                hello@bonero.tr
              </a>
              <p className="flex items-center gap-2">
                <MapPin size={15} />
                İstanbul, Türkiye
              </p>
            </div>
          </div>

          {t.groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium tracking-wide text-white">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink
                      href={link.href}
                      className="text-sm text-white/55 transition-colors hover:text-bonero-green"
                    >
                      {link.label}
                    </FooterNavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            Bonero 2026 © {t.rights}
          </p>

          <div className="flex items-center gap-5">
            <nav aria-label={t.socialAria} className="flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-white/25 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </nav>
            <LanguageToggle variant="dark" />
          </div>
        </div>
      </div>
    </footer>
  );
}
