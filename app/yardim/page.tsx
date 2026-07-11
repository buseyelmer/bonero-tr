import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  LifeBuoy,
  MessageCircle,
  Settings2,
  Shield,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Yardım Merkezi",
  description:
    "Bonero yardım merkezi. Kurulum, Unified Inbox, entegrasyonlar ve faturalama hakkında rehberler ve SSS.",
  alternates: { canonical: "/yardim" },
};

const topics = [
  {
    icon: Zap,
    title: "Hızlı başlangıç",
    description: "Hesap oluşturma, ilk kanal bağlantısı ve ekip daveti.",
    href: "/#nasil-calisir",
  },
  {
    icon: MessageCircle,
    title: "Birleşik Gelen Kutusu",
    description: "WhatsApp, Instagram ve e-posta mesajlarını tek akışta yönetme.",
    href: "/#birlesik-inbox",
  },
  {
    icon: Settings2,
    title: "Entegrasyonlar",
    description: "Meta, Gmail, Outlook ve diğer araçları bağlama adımları.",
    href: "/#entegrasyonlar",
  },
  {
    icon: Shield,
    title: "Güvenlik & KVKK",
    description: "Veri koruma, roller ve erişim yönetimi.",
    href: "/kvkk",
  },
  {
    icon: BookOpen,
    title: "Paketler & faturalama",
    description: "Plan karşılaştırması, yükseltme ve fatura soruları.",
    href: "/paketler",
  },
  {
    icon: LifeBuoy,
    title: "Destek talebi",
    description: "Ekibimizle iletişime geçin — 1 iş günü içinde dönüş.",
    href: "/iletisim",
  },
];

const faqs = [
  {
    q: "Kurulum ne kadar sürer?",
    a: "Çoğu ajans hesabı yaklaşık 15 dakikada hazır olur. Kanalları bağladıktan sonra Unified Inbox hemen kullanılabilir.",
  },
  {
    q: "Hangi kanallar destekleniyor?",
    a: "Instagram, WhatsApp Business, Gmail/Outlook ve planınıza göre ek kanallar. Güncel liste Entegrasyonlar bölümündedir.",
  },
  {
    q: "Verilerim nerede barındırılıyor?",
    a: "Altyapımız AWS üzerinde çalışır; transit ve at-rest şifreleme uygulanır. Ayrıntılar için KVKK metnine bakın.",
  },
  {
    q: "Ekip rollerini nasıl ayarlarım?",
    a: "Ajans hesabında rol bazlı onay ve görev atama bulunur. Demo sırasında ekibinizle birlikte yapılandırırız.",
  },
];

export default function HelpCenterPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              Destek
            </p>
            <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              Yardım Merkezi
            </h1>
            <p className="mt-4 text-base leading-relaxed text-bonero-dark/65">
              Kurulumdan faturalamaya kadar sık sorulan konular. Bulamadığınız
              bir şey varsa bize yazın.
            </p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map(({ icon: Icon, title, description, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="flex h-full flex-col rounded-2xl border border-bonero-dark/8 bg-white/70 p-6 transition-colors hover:border-bonero-dark/15"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bonero-dark/5 text-bonero-dark/60">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <h2 className="font-heading mt-4 text-lg text-bonero-dark">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-bonero-dark/60">
                    {description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <section className="mt-16 max-w-3xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark">
              Sık sorulanlar
            </h2>
            <dl className="mt-8 divide-y divide-bonero-dark/10 border-y border-bonero-dark/10">
              {faqs.map(({ q, a }) => (
                <div key={q} className="py-6">
                  <dt className="font-medium text-bonero-dark">{q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-bonero-dark/60">
                    {a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-14 rounded-2xl bg-[#111827] px-6 py-8 sm:px-8">
            <h2 className="font-heading text-xl text-white">
              Hâlâ yardıma mı ihtiyacınız var?
            </h2>
            <p className="mt-2 max-w-lg text-sm text-white/55">
              Destek ekibimiz ajans operasyonunuza özel yanıt verir.
            </p>
            <Link
              href="/iletisim"
              className="mt-6 inline-flex rounded-lg bg-bonero-green px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-bonero-green/90"
            >
              Destek talebi oluştur
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
