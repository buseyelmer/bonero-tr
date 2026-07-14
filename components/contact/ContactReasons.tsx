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
import { PANEL_REGISTER_URL } from "@/lib/panel";
import { featureHref } from "@/lib/features";

const reasons: {
  icon: LucideIcon;
  index: string;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    icon: LayoutDashboard,
    index: "01",
    title: "Ürünü keşfet",
    description: "Unified Inbox ve özellik katmanlarını inceleyin.",
    href: "/features",
  },
  {
    icon: Megaphone,
    index: "02",
    title: "Demo & satış",
    description: "Paketler ve işletmenize uygun plan için yazın.",
    href: "/paketler",
  },
  {
    icon: Headset,
    index: "03",
    title: "Destek",
    description: "Kurulum, kanallar ve hesap sorularınız için.",
    href: "/yardim",
  },
  {
    icon: Users,
    index: "04",
    title: "Kariyer",
    description: "Ekibe katılmak istiyorsanız açık alanlara bakın.",
    href: "/kariyer",
  },
];

export default function ContactReasons() {
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
            Konu alanları
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
            Neden yazıyorsunuz?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
            Doğru yere yönlendirin — veya doğrudan forma geçin. Hızlı başlamak
            için{" "}
            <a
              href={PANEL_REGISTER_URL}
              className="font-semibold text-bonero-green hover:underline"
            >
              Hemen Başla
            </a>{" "}
            yeter.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={i * 0.05}>
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
                    {r.title}
                  </p>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-bonero-dark/50">
                    {r.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-bonero-green">
                    Git
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
            Gelen kutusu detayı mı?{" "}
            <Link
              href={featureHref("gelen-kutusu")}
              className="font-semibold text-bonero-green hover:underline"
            >
              Unified Inbox rehberine bakın →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
