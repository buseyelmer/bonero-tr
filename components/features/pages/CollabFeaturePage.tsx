"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, UserCheck, UserPlus, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import CollabMock from "@/components/features/mocks/CollabMock";
import { useLocale } from "@/components/LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const rail = {
  tr: [
    {
      icon: Users,
      title: "Rol ata",
      body: "Yönetici, editör, onaycı — herkesin yetkisi net. E-posta zinciri yok.",
    },
    {
      icon: UserPlus,
      title: "Görevi sürükle",
      body: "Brief’ten yayına tek ray. Bekleyen işler ve darboğazlar görünür.",
    },
    {
      icon: UserCheck,
      title: "Onayla, yayınla",
      body: "İç onay ile müşteri onayı ayrılır. Onaylanınca yayın bir tık uzağa düşer.",
    },
  ],
  en: [
    {
      icon: Users,
      title: "Assign roles",
      body: "Owner, editor, approver — clear permissions. No email chains.",
    },
    {
      icon: UserPlus,
      title: "Move the task",
      body: "Brief to live on one rail. Pending work and bottlenecks stay visible.",
    },
    {
      icon: UserCheck,
      title: "Approve, publish",
      body: "Internal and client approvals stay separate. Once signed off, publish is one tap away.",
    },
  ],
};

export default function CollabFeaturePage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const steps = rail[locale];

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 45% at 80% 10%, rgba(24,131,71,0.12), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-bonero-dark/45 hover:text-bonero-dark"
          >
            <ArrowLeft size={14} />
            {isEn ? "All features" : "Tüm özellikler"}
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-sm font-medium tracking-wide text-bonero-green uppercase">
                {isEn ? "Team & approvals" : "Ekip & onay"}
              </p>
              <h1 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]">
                {isEn
                  ? "Tasks, roles, approvals — one rail."
                  : "Görev, rol, onay — tek ray."}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-bonero-dark/55">
                {isEn
                  ? "Stop chasing who’s supposed to approve. Bonero keeps ownership visible and shipping faster."
                  : "Kim onaylayacak diye peşinden koşmayı bırak. Bonero sorumluluğu görünür tutar; yayın hızlanır."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={PANEL_REGISTER_URL}
                  className="inline-flex items-center gap-2 rounded-xl bg-bonero-green px-5 py-3 text-sm font-semibold text-white hover:bg-bonero-green/90"
                >
                  {isEn ? "Open team board" : "Ekip panosunu aç"}
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href="#eylemler"
                  className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70"
                >
                  {isEn ? "See the rail" : "Onay hattını gör"}
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-bonero-dark/8 bg-white p-5 shadow-[0_24px_60px_rgba(30,41,59,0.08)] sm:p-6">
              <CollabMock active isEn={isEn} />
            </div>
          </div>
        </div>
      </section>

      <section
        id="eylemler"
        className="scroll-mt-24 border-t border-bonero-dark/8 bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-xl">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/40 uppercase">
              {isEn ? "How the rail works" : "Hat nasıl akar"}
            </p>
            <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl">
              {isEn
                ? "Three moves. Clear ownership."
                : "Üç hamle. Net sahiplik."}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-bonero-dark/8 bg-[#f8faf9] p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green">
                      <Icon size={18} />
                    </span>
                    <p className="font-mono mt-4 text-xs font-bold text-bonero-green">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-heading mt-2 text-xl text-bonero-dark">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-bonero-dark/55">{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-bonero-dark/8 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 rounded-[1.5rem] bg-bonero-green px-8 py-12 lg:grid-cols-2 lg:px-12">
            <div>
              <h2 className="font-heading text-2xl text-white sm:text-3xl">
                {isEn
                  ? "Fewer chases. Faster publish."
                  : "Daha az peşinden koşma. Daha hızlı yayın."}
              </h2>
              <ul className="mt-6 space-y-3">
                {(isEn
                  ? [
                      "Roles and permissions in one place",
                      "Pending approvals visible, not lost in chat",
                      "New teammates onboard without breaking the rail",
                    ]
                  : [
                      "Rol ve yetki tek yerde",
                      "Bekleyen onaylar görünür, sohbette kaybolmaz",
                      "Yeni üye eklenince süreç bozulmaz",
                    ]
                ).map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                    <Check size={16} className="mt-0.5 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href={PANEL_REGISTER_URL}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-bonero-green"
              >
                {isEn ? "Start collaborating" : "İşbirliğine başla"}
                <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/paketler"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-sm font-medium text-white"
              >
                {isEn ? "View plans" : "Paketlere bak"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
