"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  HelpCircle,
  Store,
  Users,
  X,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import TrustStrip from "@/components/TrustStrip";
import CtaButton from "@/components/ui/CtaButton";
import { useLocale } from "@/components/LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const ease = [0.22, 1, 0.36, 1] as const;

type PlanId = "starter" | "pro" | "enterprise";

const plans = {
  tr: [
    {
      id: "starter" as const,
      name: "Başlangıç",
      tagline: "Tek işletme, ilk kurulum",
      who: "Sahibi + 1–2 kişi olan işletmeler",
      price: "Birlikte netleştirelim",
      priceNote: "Ölçeğinize göre kısa görüşmeyle",
      cta: "Başlangıç’la kaydol",
      ctaHref: PANEL_REGISTER_URL,
      popular: false,
      includes: [
        "Tek çalışma alanı",
        "Gelen kutusu (temel kanallar)",
        "Temel AI yanıt / içerik",
        "CRM kartları (sınırlı)",
        "Temel raporlar",
        "E-posta destek",
      ],
      bestFor: "WhatsApp + Instagram’ı tek yerde toplamak isteyen küçük işletme",
    },
    {
      id: "pro" as const,
      name: "Pro",
      tagline: "Ekip temposu, tüm özellikler",
      who: "Büyüyen işletme veya ajans ekibi",
      price: "İşletmelere özel",
      priceNote: "Ekip büyüklüğü ve kanal sayısına göre",
      cta: "Pro ile başla",
      ctaHref: PANEL_REGISTER_URL,
      popular: true,
      includes: [
        "Sınırsız müşteri / marka hesabı",
        "Tüm kanallar + AI Agent",
        "CRM, randevu, içerik panosu",
        "AI reklam + e-posta pazarlama",
        "Onay akışları ve ekip rolleri",
        "Otomatik raporlar",
        "Öncelikli destek",
      ],
      bestFor: "Günlük operasyonu Bonero’da toplayıp ekiple çalışanlar",
    },
    {
      id: "enterprise" as const,
      name: "Enterprise",
      tagline: "Ölçek, güvenlik, özel kurulum",
      who: "Çok şube / kurumsal IT ihtiyacı",
      price: "Özel teklif",
      priceNote: "SLA, SSO ve entegrasyon dahil",
      cta: "Teklif iste",
      ctaHref: "/iletisim",
      popular: false,
      includes: [
        "Pro’daki her şey",
        "Özel API ve SSO",
        "Dedicated başarı yöneticisi",
        "SLA ve güvenlik denetimleri",
        "Özel entegrasyonlar",
        "Kurumsal eğitim",
        "7/24 öncelikli destek",
      ],
      bestFor: "Güvenlik, SLA ve merkezi yönetim şart olan yapılar",
    },
  ],
  en: [
    {
      id: "starter" as const,
      name: "Starter",
      tagline: "One business, first setup",
      who: "Owner + 1–2 people",
      price: "Finalize together",
      priceNote: "Short call based on your scale",
      cta: "Sign up for Starter",
      ctaHref: PANEL_REGISTER_URL,
      popular: false,
      includes: [
        "Single workspace",
        "Inbox (core channels)",
        "Core AI reply / content",
        "CRM cards (limited)",
        "Basic reports",
        "Email support",
      ],
      bestFor: "Small businesses unifying WhatsApp + Instagram",
    },
    {
      id: "pro" as const,
      name: "Pro",
      tagline: "Team tempo, full product",
      who: "Growing business or agency team",
      price: "Built for businesses",
      priceNote: "Based on team size and channels",
      cta: "Start with Pro",
      ctaHref: PANEL_REGISTER_URL,
      popular: true,
      includes: [
        "Unlimited client / brand accounts",
        "All channels + AI Agent",
        "CRM, bookings, content board",
        "AI ads + email marketing",
        "Approvals and team roles",
        "Automated reports",
        "Priority support",
      ],
      bestFor: "Teams running daily ops inside Bonero",
    },
    {
      id: "enterprise" as const,
      name: "Enterprise",
      tagline: "Scale, security, custom setup",
      who: "Multi-branch / corporate IT needs",
      price: "Custom quote",
      priceNote: "Includes SLA, SSO, integrations",
      cta: "Request a quote",
      ctaHref: "/iletisim",
      popular: false,
      includes: [
        "Everything in Pro",
        "Custom API & SSO",
        "Dedicated success manager",
        "SLA & security reviews",
        "Custom integrations",
        "Enterprise training",
        "24/7 priority support",
      ],
      bestFor: "Orgs that need security, SLA, and central control",
    },
  ],
};

const compareRows = {
  tr: [
    { label: "Gelen kutusu (omnichannel)", starter: true, pro: true, enterprise: true },
    { label: "AI Agent (7/24 yanıt)", starter: "Temel", pro: true, enterprise: true },
    { label: "CRM & pipeline", starter: "Sınırlı", pro: true, enterprise: true },
    { label: "Randevu & hatırlatma", starter: false, pro: true, enterprise: true },
    { label: "İçerik panosu", starter: false, pro: true, enterprise: true },
    { label: "E-posta pazarlama", starter: false, pro: true, enterprise: true },
    { label: "AI reklam", starter: false, pro: true, enterprise: true },
    { label: "Ekip rolleri & onay", starter: false, pro: true, enterprise: true },
    { label: "Gelişmiş raporlama", starter: "Temel", pro: true, enterprise: true },
    { label: "Çoklu marka / müşteri", starter: false, pro: true, enterprise: true },
    { label: "SSO / özel API", starter: false, pro: false, enterprise: true },
    { label: "Dedicated yönetici + SLA", starter: false, pro: false, enterprise: true },
  ],
  en: [
    { label: "Inbox (omnichannel)", starter: true, pro: true, enterprise: true },
    { label: "AI Agent (24/7 replies)", starter: "Core", pro: true, enterprise: true },
    { label: "CRM & pipeline", starter: "Limited", pro: true, enterprise: true },
    { label: "Bookings & reminders", starter: false, pro: true, enterprise: true },
    { label: "Content board", starter: false, pro: true, enterprise: true },
    { label: "Email marketing", starter: false, pro: true, enterprise: true },
    { label: "AI ads", starter: false, pro: true, enterprise: true },
    { label: "Team roles & approvals", starter: false, pro: true, enterprise: true },
    { label: "Advanced reporting", starter: "Basic", pro: true, enterprise: true },
    { label: "Multi-brand / clients", starter: false, pro: true, enterprise: true },
    { label: "SSO / custom API", starter: false, pro: false, enterprise: true },
    { label: "Dedicated manager + SLA", starter: false, pro: false, enterprise: true },
  ],
};

const personas = {
  tr: [
    {
      id: "starter" as PlanId,
      icon: Store,
      title: "Tek şube / küçük ekip",
      body: "Mesajlar dağınık; önce gelen kutusu ve basit takip lazım.",
      recommend: "Başlangıç",
    },
    {
      id: "pro" as PlanId,
      icon: Users,
      title: "Ekip var, tempo yüksek",
      body: "CRM, randevu, içerik, reklam ve rapor aynı yerde olsun istiyorsunuz.",
      recommend: "Pro",
    },
    {
      id: "enterprise" as PlanId,
      icon: Building2,
      title: "Çok şube / kurumsal",
      body: "SSO, SLA, özel entegrasyon veya merkezi güvenlik şart.",
      recommend: "Enterprise",
    },
  ],
  en: [
    {
      id: "starter" as PlanId,
      icon: Store,
      title: "Single location / small team",
      body: "Messages are scattered; you need inbox + simple follow-up first.",
      recommend: "Starter",
    },
    {
      id: "pro" as PlanId,
      icon: Users,
      title: "Team, high tempo",
      body: "You want CRM, bookings, content, ads, and reports in one place.",
      recommend: "Pro",
    },
    {
      id: "enterprise" as PlanId,
      icon: Building2,
      title: "Multi-branch / corporate",
      body: "SSO, SLA, custom integrations, or central security are required.",
      recommend: "Enterprise",
    },
  ],
};

const faqs = {
  tr: [
    {
      q: "Fiyatlar neden sabit rakam değil?",
      a: "Kanal sayısı, ekip büyüklüğü ve ihtiyaca göre değişiyor. Kısa bir görüşmeyle net teklif çıkarıyoruz — sürpriz fatura yok.",
    },
    {
      q: "Hangi paketten başlamalıyım?",
      a: "Tek işletme ve küçük ekipseniz Başlangıç yeterli. Günlük operasyonu (CRM, randevu, içerik, reklam) Bonero’da toplayacaksanız Pro. SSO/SLA gerekiyorsa Enterprise.",
    },
    {
      q: "Sonra paket değiştirebilir miyim?",
      a: "Evet. Büyüdükçe Pro veya Enterprise’a geçersiniz; veri ve çalışma alanı taşınır.",
    },
    {
      q: "Deneme veya demo var mı?",
      a: "Kaydolup paneli açabilir veya iletişim formundan demo talep edebilirsiniz. Kurulumu birlikte netleştiririz.",
    },
  ],
  en: [
    {
      q: "Why isn’t pricing a fixed number?",
      a: "It depends on channels, team size, and needs. A short call produces a clear quote — no surprise invoices.",
    },
    {
      q: "Which plan should I start with?",
      a: "Starter for a single small business. Pro if you’ll run CRM, bookings, content, and ads in Bonero. Enterprise when SSO/SLA are required.",
    },
    {
      q: "Can I change plans later?",
      a: "Yes. Move up to Pro or Enterprise as you grow; workspace and data move with you.",
    },
    {
      q: "Is there a trial or demo?",
      a: "Sign up to open the panel, or request a demo via the contact form. We’ll shape the setup together.",
    },
  ],
};

const copy = {
  tr: {
    eyebrow: "Paketler",
    title: "Hangi paket size uyar?",
    subtitle:
      "Üç plan — küçük işletmeden kurumsal ölçeğe. Önce “kim için?”, sonra özellikler. Fiyatı birlikte netleştiriyoruz.",
    guideTitle: "Önce kendinizi seçin",
    guideLead: "Tıklayın — aşağıdaki paket vurgulanır.",
    recommend: "Öneri",
    popular: "En çok tercih",
    includes: "Neler dahil?",
    bestFor: "En uygun",
    compareTitle: "Özellik karşılaştırması",
    compareLead: "Hangi planda ne var — tek bakışta.",
    colStarter: "Başlangıç",
    colPro: "Pro",
    colEnterprise: "Enterprise",
    faqTitle: "Sık sorulanlar",
    faqLead: "Paket seçmeden önce netleşsin.",
    noteTitle: "Sabit etiket fiyatı yok — neden?",
    noteBody:
      "Bonero kurulum ve kanal sayısına göre şekillenir. Kaydolun veya yazın; size uygun paketi ve fiyatı birlikte çıkarırız.",
    ctaPrimary: "Hemen başla",
    ctaSecondary: "Demo / soru sor",
    yes: "Var",
    no: "Yok",
  },
  en: {
    eyebrow: "Packages",
    title: "Which plan fits you?",
    subtitle:
      "Three plans — from small business to enterprise. First “who for?”, then features. We finalize pricing together.",
    guideTitle: "Pick yourself first",
    guideLead: "Click — the matching plan highlights below.",
    recommend: "Suggested",
    popular: "Most chosen",
    includes: "What’s included?",
    bestFor: "Best for",
    compareTitle: "Feature comparison",
    compareLead: "What’s in each plan — at a glance.",
    colStarter: "Starter",
    colPro: "Pro",
    colEnterprise: "Enterprise",
    faqTitle: "FAQ",
    faqLead: "Clear answers before you choose.",
    noteTitle: "No fixed sticker price — why?",
    noteBody:
      "Bonero shapes around setup and channel count. Sign up or write us; we’ll map the right plan and price together.",
    ctaPrimary: "Get started",
    ctaSecondary: "Demo / ask a question",
    yes: "Yes",
    no: "No",
  },
};

function CellValue({
  value,
  yes,
  no,
}: {
  value: boolean | string;
  yes: string;
  no: string;
}) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center text-bonero-green" title={yes}>
        <Check size={16} strokeWidth={2.5} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center text-bonero-dark/20" title={no}>
        <X size={15} />
      </span>
    );
  }
  return <span className="text-xs font-medium text-bonero-dark/55">{value}</span>;
}

export default function PackagesPage() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const t = copy[locale];
  const planList = plans[locale];
  const rows = compareRows[locale];
  const personaList = personas[locale];
  const faqList = faqs[locale];

  const [highlight, setHighlight] = useState<PlanId>("pro");
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="flex-1 overflow-x-clip bg-background">
      {/* Hero */}
      <section className="relative overflow-x-clip pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% -10%, rgba(24,131,71,0.1), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold tracking-[0.14em] text-bonero-green uppercase"
            >
              {t.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, ease }}
              className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.75rem]"
            >
              {t.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ease }}
              className="mt-4 text-base leading-relaxed text-bonero-dark/55 sm:text-lg"
            >
              {t.subtitle}
            </motion.p>
          </div>

          {/* Persona guide */}
          <Reveal className="mt-12">
            <div className="rounded-2xl border border-bonero-dark/10 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h2 className="font-heading text-lg text-bonero-dark sm:text-xl">{t.guideTitle}</h2>
                  <p className="mt-1 text-sm text-bonero-dark/45">{t.guideLead}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {personaList.map((p) => {
                  const Icon = p.icon;
                  const active = highlight === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setHighlight(p.id);
                        document.getElementById(`plan-${p.id}`)?.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                        });
                      }}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        active
                          ? "border-bonero-green/40 bg-bonero-green/[0.05] shadow-sm"
                          : "border-bonero-dark/8 bg-[#f8faf9] hover:border-bonero-dark/15"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          active ? "bg-bonero-green text-white" : "bg-white text-bonero-dark/45"
                        }`}
                      >
                        <Icon size={18} />
                      </span>
                      <p className="mt-3 text-sm font-bold text-bonero-dark">{p.title}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-bonero-dark/50">{p.body}</p>
                      <p className="mt-3 text-[11px] font-bold text-bonero-green">
                        {t.recommend}: {p.recommend}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Plan cards */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {planList.map((plan, i) => {
              const featured = plan.popular;
              const highlighted = highlight === plan.id;
              return (
                <Reveal key={plan.id} delay={i * 0.06} className="h-full">
                  <article
                    id={`plan-${plan.id}`}
                    className={`relative flex h-full flex-col overflow-hidden rounded-2xl border transition-shadow ${
                      featured
                        ? "border-bonero-green/30 bg-bonero-dark text-white shadow-xl shadow-bonero-dark/20"
                        : highlighted
                          ? "border-bonero-green/35 bg-white shadow-lg shadow-bonero-green/10"
                          : "border-bonero-dark/10 bg-white shadow-sm"
                    }`}
                  >
                    {featured && (
                      <div className="bg-bonero-green px-5 py-2 text-center text-[11px] font-bold tracking-wide text-white uppercase">
                        {t.popular}
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <p
                        className={`text-[11px] font-bold tracking-wide uppercase ${
                          featured ? "text-bonero-green" : "text-bonero-dark/35"
                        }`}
                      >
                        {plan.tagline}
                      </p>
                      <h2 className="font-heading mt-2 text-2xl tracking-wide sm:text-[1.75rem]">
                        {plan.name}
                      </h2>
                      <p className={`mt-2 text-sm ${featured ? "text-white/50" : "text-bonero-dark/50"}`}>
                        {plan.who}
                      </p>

                      <div className="mt-6 border-y border-current/10 py-4">
                        <p
                          className={`font-heading text-xl tracking-wide ${
                            featured ? "text-bonero-green" : "text-bonero-dark"
                          }`}
                        >
                          {plan.price}
                        </p>
                        <p className={`mt-1 text-xs ${featured ? "text-white/40" : "text-bonero-dark/40"}`}>
                          {plan.priceNote}
                        </p>
                      </div>

                      <p className={`mt-5 text-[10px] font-bold tracking-wide uppercase ${
                        featured ? "text-white/35" : "text-bonero-dark/35"
                      }`}>
                        {t.includes}
                      </p>
                      <ul className="mt-3 flex-1 space-y-2.5">
                        {plan.includes.map((f) => (
                          <li
                            key={f}
                            className={`flex items-start gap-2.5 text-sm leading-snug ${
                              featured ? "text-white/75" : "text-bonero-dark/65"
                            }`}
                          >
                            <Check
                              size={15}
                              className="mt-0.5 shrink-0 text-bonero-green"
                              strokeWidth={2.5}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div
                        className={`mt-5 rounded-xl px-3.5 py-3 text-xs leading-relaxed ${
                          featured ? "bg-white/5 text-white/55" : "bg-[#f6f8f7] text-bonero-dark/55"
                        }`}
                      >
                        <span className={`font-bold ${featured ? "text-bonero-green" : "text-bonero-green"}`}>
                          {t.bestFor}:{" "}
                        </span>
                        {plan.bestFor}
                      </div>

                      <CtaButton
                        href={plan.ctaHref}
                        variant={featured ? "primary" : "dark"}
                        size="md"
                        fullWidth
                        className="mt-6"
                        icon={<ArrowRight size={15} />}
                      >
                        {plan.cta}
                      </CtaButton>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="border-y border-bonero-dark/8 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.compareTitle}
            </h2>
            <p className="mt-3 text-sm text-bonero-dark/50">{t.compareLead}</p>
          </Reveal>

          <Reveal delay={0.06} className="mt-8">
            <div className="overflow-x-auto rounded-2xl border border-bonero-dark/10 shadow-sm">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-bonero-dark/8 bg-[#f8faf9]">
                    <th className="px-4 py-3.5 font-semibold text-bonero-dark/50 sm:px-5">
                      {isEn ? "Feature" : "Özellik"}
                    </th>
                    <th className="px-3 py-3.5 text-center font-semibold text-bonero-dark sm:px-4">
                      {t.colStarter}
                    </th>
                    <th className="bg-bonero-green/[0.06] px-3 py-3.5 text-center font-semibold text-bonero-green sm:px-4">
                      {t.colPro}
                    </th>
                    <th className="px-3 py-3.5 text-center font-semibold text-bonero-dark sm:px-4">
                      {t.colEnterprise}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-b border-bonero-dark/6 ${i % 2 === 0 ? "bg-white" : "bg-[#fafbfa]"}`}
                    >
                      <td className="px-4 py-3 text-bonero-dark/70 sm:px-5">{row.label}</td>
                      <td className="px-3 py-3 text-center sm:px-4">
                        <CellValue value={row.starter} yes={t.yes} no={t.no} />
                      </td>
                      <td className="bg-bonero-green/[0.03] px-3 py-3 text-center sm:px-4">
                        <CellValue value={row.pro} yes={t.yes} no={t.no} />
                      </td>
                      <td className="px-3 py-3 text-center sm:px-4">
                        <CellValue value={row.enterprise} yes={t.yes} no={t.no} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing note + FAQ */}
      <section className="bg-[#f6f8f7] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <Reveal>
              <div className="rounded-2xl border border-bonero-dark/10 bg-white p-6 shadow-sm sm:p-7">
                <HelpCircle size={20} className="text-bonero-green" />
                <h2 className="font-heading mt-4 text-xl text-bonero-dark sm:text-2xl">
                  {t.noteTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-bonero-dark/55">{t.noteBody}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <CtaButton
                    href={PANEL_REGISTER_URL}
                    variant="primary"
                    size="md"
                    icon={<ArrowUpRight size={15} />}
                  >
                    {t.ctaPrimary}
                  </CtaButton>
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center gap-2 rounded-xl border border-bonero-dark/12 bg-white px-5 py-3 text-sm font-medium text-bonero-dark/70"
                  >
                    {t.ctaSecondary}
                  </Link>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
                  {t.faqTitle}
                </h2>
                <p className="mt-2 text-sm text-bonero-dark/50">{t.faqLead}</p>
              </Reveal>

              <div className="mt-6 space-y-2">
                {faqList.map((item, i) => {
                  const open = openFaq === i;
                  return (
                    <Reveal key={item.q} delay={i * 0.04}>
                      <div className="overflow-hidden rounded-xl border border-bonero-dark/8 bg-white">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(open ? -1 : i)}
                          className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5"
                        >
                          <span className="text-sm font-semibold text-bonero-dark">{item.q}</span>
                          <ChevronDown
                            size={16}
                            className={`shrink-0 text-bonero-dark/35 transition-transform ${open ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease }}
                              className="overflow-hidden"
                            >
                              <p className="border-t border-bonero-dark/6 px-4 py-3.5 text-sm leading-relaxed text-bonero-dark/55 sm:px-5">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />
    </main>
  );
}
