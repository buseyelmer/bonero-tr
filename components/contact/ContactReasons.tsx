"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Headset,
  LayoutDashboard,
  Megaphone,
  Users,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";
import { featureHref } from "@/lib/features";

const reasonMeta: {
  key: string;
  icon: LucideIcon;
  index: string;
  href: string;
}[] = [
  { key: "explore", icon: LayoutDashboard, index: "01", href: "/features" },
  { key: "sales", icon: Megaphone, index: "02", href: "/paketler" },
  { key: "support", icon: Headset, index: "03", href: "/yardim" },
  { key: "careers", icon: Users, index: "04", href: "/kariyer" },
];

const copy = {
  tr: {
    eyebrow: "Konu alanları",
    title: "Neden yazıyorsunuz?",
    leadBefore: "Doğru yere yönlendirin — veya doğrudan forma geçin. Hızlı başlamak için",
    leadLink: "Hemen Başla",
    leadAfter: "yeter.",
    go: "Git",
    footnoteBefore: "Gelen kutusu detayı mı?",
    footnoteLink: "Unified Inbox rehberine bakın →",
    reasons: {
      explore: {
        title: "Ürünü keşfet",
        description: "Unified Inbox ve özellik katmanlarını inceleyin.",
      },
      sales: {
        title: "Demo & satış",
        description: "Paketler ve işletmenize uygun plan için yazın.",
      },
      support: {
        title: "Destek",
        description: "Kurulum, kanallar ve hesap sorularınız için.",
      },
      careers: {
        title: "Kariyer",
        description: "Ekibe katılmak istiyorsanız açık alanlara bakın.",
      },
    },
  },
  en: {
    eyebrow: "Topics",
    title: "What brings you here?",
    leadBefore: "Find the right path — or go straight to the form. To get started quickly,",
    leadLink: "Get Started",
    leadAfter: "is all you need.",
    go: "Go",
    footnoteBefore: "Need inbox details?",
    footnoteLink: "See the Unified Inbox guide →",
    reasons: {
      explore: {
        title: "Explore the product",
        description: "Review Unified Inbox and the feature layers.",
      },
      sales: {
        title: "Demo & sales",
        description: "Ask about plans and the right fit for your business.",
      },
      support: {
        title: "Support",
        description: "Setup, channels, and account questions.",
      },
      careers: {
        title: "Careers",
        description: "See open areas if you want to join the team.",
      },
    },
  },
};

export default function ContactReasons() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section
      id="konular"
      className="relative scroll-mt-28 border-t border-bonero-dark/6 py-16 sm:py-20"
      style={{
        background:
          "linear-gradient(180deg, #f4f7f5 0%, #eef3f0 50%, #f7f9f8 100%)",
      }}
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
            {t.leadBefore}{" "}
            <a
              href={PANEL_REGISTER_URL}
              className="font-semibold text-bonero-green hover:underline"
            >
              {t.leadLink}
            </a>{" "}
            {t.leadAfter}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {reasonMeta.map((r, i) => {
            const Icon = r.icon;
            const reason = t.reasons[r.key as keyof typeof t.reasons];
            return (
              <Reveal key={r.key} delay={i * 0.05}>
                <Link
                  href={r.href}
                  className="group flex h-full flex-col rounded-2xl border border-bonero-dark/8 bg-white/90 p-5 transition-[border-color,box-shadow] hover:border-bonero-green/25 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-[10px] text-bonero-dark/30">
                      {r.index}
                    </span>
                  </div>
                  <p className="mt-4 text-base font-semibold text-bonero-dark group-hover:text-bonero-green">
                    {reason.title}
                  </p>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-bonero-dark/50">
                    {reason.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-bonero-green">
                    {t.go}
                    <ArrowUpRight
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-6">
          <p className="text-sm text-bonero-dark/45">
            {t.footnoteBefore}{" "}
            <Link
              href={featureHref("gelen-kutusu")}
              className="font-semibold text-bonero-green hover:underline"
            >
              {t.footnoteLink}
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
