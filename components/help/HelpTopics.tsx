"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  LifeBuoy,
  MessageCircle,
  Settings2,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";

type Topic = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  index: string;
};

const topics: Topic[] = [
  {
    icon: Zap,
    index: "01",
    title: "Hızlı başlangıç",
    description: "Hesap, ilk kanal ve ekip daveti — yaklaşık 15 dakikada canlı.",
    href: "/#nasil-calisir",
  },
  {
    icon: MessageCircle,
    index: "02",
    title: "Birleşik Gelen Kutusu",
    description: "WhatsApp, Instagram ve e-postayı tek akışta yönetin.",
    href: "/#birlesik-inbox",
  },
  {
    icon: Settings2,
    index: "03",
    title: "Entegrasyonlar",
    description: "Meta, Gmail, Outlook ve diğer araçları bağlama adımları.",
    href: "/#entegrasyonlar",
  },
  {
    icon: Shield,
    index: "04",
    title: "Güvenlik & KVKK",
    description: "Veri koruma, roller ve erişim yönetimi.",
    href: "/kvkk",
  },
  {
    icon: BookOpen,
    index: "05",
    title: "Paketler & faturalama",
    description: "Plan karşılaştırması, yükseltme ve fatura soruları.",
    href: "/paketler",
  },
  {
    icon: LifeBuoy,
    index: "06",
    title: "Destek talebi",
    description: "Ekibimizle yazın — genelde 1 iş günü içinde dönüş.",
    href: "/iletisim",
  },
];

export default function HelpTopics() {
  return (
    <section
      id="konular"
      className="relative scroll-mt-24 border-t border-bonero-dark/8 bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-xl">
          <p className="text-sm font-medium tracking-wide text-bonero-green uppercase">
            Konular
          </p>
          <h2 className="font-heading mt-3 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl">
            Ne arıyorsunuz?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-bonero-dark/55">
            Operasyonunuzdaki adıma gidin — her konu ilgili bölüme veya sayfaya
            açılır.
          </p>
        </Reveal>

        <ul className="mt-12 divide-y divide-bonero-dark/8 border-y border-bonero-dark/8">
          {topics.map(({ icon: Icon, title, description, href, index }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.04}>
                <Link
                  href={href}
                  className="group flex items-start gap-4 py-5 transition-colors sm:items-center sm:gap-6 sm:py-6"
                >
                  <span className="font-mono text-xs font-medium tabular-nums text-bonero-green/80 sm:w-8">
                    {index}
                  </span>
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green transition-colors group-hover:bg-bonero-green group-hover:text-white sm:mt-0">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-lg text-bonero-dark transition-colors group-hover:text-bonero-green">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-bonero-dark/55">
                      {description}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-bonero-dark/25 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bonero-green sm:mt-0"
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
