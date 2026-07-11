import { Mail, MapPin } from "lucide-react";

const footerLinks = {
  ürün: [
    { href: "#features", label: "Özellikler" },
    { href: "#", label: "Fiyatlandırma" },
    { href: "#", label: "Entegrasyonlar" },
  ],
  şirket: [
    { href: "#about", label: "Hakkımızda" },
    { href: "#contact", label: "İletişim" },
    { href: "#", label: "Kariyer" },
  ],
  yasal: [
    { href: "#", label: "Gizlilik" },
    { href: "#", label: "Kullanım Şartları" },
    { href: "#", label: "KVKK" },
  ],
};

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-bonero-dark/8 bg-bonero-dark text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bonero-green text-sm font-bold text-white">
                B
              </span>
              <span className="text-lg font-semibold tracking-tight">Bonero</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Dijital ajanslar için yapay zeka destekli sosyal medya operasyon
              platformu. Daha az sürtünme, daha hızlı teslimat, daha net raporlar.
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

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold capitalize tracking-wide text-white">
                {group}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/55 transition-colors hover:text-bonero-green"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Bonero. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-white/40">
            Ajans operasyonunu ölçeklendiren AI platformu
          </p>
        </div>
      </div>
    </footer>
  );
}
