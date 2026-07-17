"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  Clock,
  LayoutDashboard,
  Megaphone,
  Search,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { pickL } from "@/lib/locale-copy";
import {
  HELP_ARTICLES,
  HELP_CATEGORIES,
  getHelpCategory,
  helpArticleHref,
  helpArticleMatchesQuery,
  type HelpCategoryId,
} from "@/lib/help";

const ease = [0.22, 1, 0.36, 1] as const;

const ICONS: Record<HelpCategoryId, LucideIcon> = {
  baslangic: Zap,
  omnichannel: LayoutDashboard,
  "yapay-zeka": Bot,
  reklam: Megaphone,
  operasyon: BookOpen,
};

const POPULAR_SLUGS = [
  "hizli-baslangic",
  "omnichannel-gelen-kutusu",
  "ai-agent-kurulumu",
  "crm-pipeline-kullanimi",
] as const;

const QUICK_PATHS = {
  tr: [
    {
      id: "day1",
      icon: Zap,
      title: "Bugün kurulum",
      body: "Hesap → ilk kanal → test mesajı. ~15 dk.",
      href: helpArticleHref("hizli-baslangic"),
      tag: "Başlangıç",
    },
    {
      id: "inbox",
      icon: LayoutDashboard,
      title: "Mesajları birleştir",
      body: "WhatsApp, IG, mail tek listede — atama ve etiket.",
      href: helpArticleHref("omnichannel-gelen-kutusu"),
      tag: "Omnichannel",
    },
    {
      id: "night",
      icon: Bot,
      title: "Gece otomatik yanıt",
      body: "AI Agent ilk cevabı verir, karmaşık iş ekibe düşer.",
      href: helpArticleHref("ai-agent-kurulumu"),
      tag: "AI Agent",
    },
    {
      id: "crm",
      icon: Users,
      title: "Lead’leri kaçırma",
      body: "DM ve formdan gelenler CRM kartına dönüşür.",
      href: helpArticleHref("crm-pipeline-kullanimi"),
      tag: "Operasyon",
    },
  ],
  en: [
    {
      id: "day1",
      icon: Zap,
      title: "Set up today",
      body: "Account → first channel → test message. ~15 min.",
      href: helpArticleHref("hizli-baslangic"),
      tag: "Getting started",
    },
    {
      id: "inbox",
      icon: LayoutDashboard,
      title: "Unify messages",
      body: "WhatsApp, IG, email in one list — assign and tag.",
      href: helpArticleHref("omnichannel-gelen-kutusu"),
      tag: "Omnichannel",
    },
    {
      id: "night",
      icon: Bot,
      title: "Auto-reply at night",
      body: "AI Agent sends the first reply; complex cases go to the team.",
      href: helpArticleHref("ai-agent-kurulumu"),
      tag: "AI Agent",
    },
    {
      id: "crm",
      icon: Users,
      title: "Don’t lose leads",
      body: "DMs and forms become CRM cards.",
      href: helpArticleHref("crm-pipeline-kullanimi"),
      tag: "Operations",
    },
  ],
};

const SUGGESTIONS = {
  tr: ["kanal bağla", "AI Agent", "randevu", "rapor", "ekip rolü", "e-posta kampanya"],
  en: ["connect channel", "AI Agent", "booking", "report", "team role", "email campaign"],
};

const copy = {
  tr: {
    eyebrow: "Yardım Merkezi",
    h1: "Takıldığınız yerde",
    h1Accent: "adım adım çözüm.",
    lead: "Kurulumdan günlük kullanıma — kısa rehberler. Önce ne yapmak istediğinizi seçin veya arayın.",
    searchLabel: "Makale ara",
    searchPlaceholder: "Örn: kanal bağlama, randevu hatırlatma…",
    suggestions: "Sık arananlar",
    pathsTitle: "Nereden başlamak istersiniz?",
    pathsLead: "En sık ihtiyaç duyulan dört yol — tek tıkla ilgili rehbere.",
    catsTitle: "Konulara göre",
    catsLead: "Kategoriye tıklayın; alttaki liste filtrelenir.",
    all: "Tümü",
    articles: "makale",
    popularTitle: "Öne çıkan rehberler",
    popularLead: "Çoğu ekibin ilk okuduğu dört makale.",
    listTitle: "Tüm rehberler",
    searchResults: "Arama sonuçları",
    filtered: "Filtrelenmiş liste",
    noResults: "Sonuç yok. Başka bir kelime veya kategori deneyin.",
    minRead: "dk okuma",
    read: "Oku",
    clear: "Filtreyi temizle",
    supportHint: "Cevabı bulamadınız mı?",
    supportLink: "Destek yazın",
  },
  en: {
    eyebrow: "Help Center",
    h1: "Stuck somewhere?",
    h1Accent: "Step-by-step answers.",
    lead: "From setup to daily use — short guides. Pick what you want to do, or search.",
    searchLabel: "Search articles",
    searchPlaceholder: "e.g. connect channel, booking reminder…",
    suggestions: "Popular searches",
    pathsTitle: "Where do you want to start?",
    pathsLead: "Four paths teams need most — one tap to the guide.",
    catsTitle: "Browse by topic",
    catsLead: "Click a category; the list below filters.",
    all: "All",
    articles: "articles",
    popularTitle: "Featured guides",
    popularLead: "The four articles most teams read first.",
    listTitle: "All guides",
    searchResults: "Search results",
    filtered: "Filtered list",
    noResults: "No results. Try another keyword or category.",
    minRead: "min read",
    read: "Read",
    clear: "Clear filter",
    supportHint: "Can’t find an answer?",
    supportLink: "Contact support",
  },
};

export default function HelpHub() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<HelpCategoryId | "all">("all");

  const popular = useMemo(
    () =>
      POPULAR_SLUGS.map((slug) => HELP_ARTICLES.find((a) => a.slug === slug)).filter(
        Boolean,
      ) as typeof HELP_ARTICLES,
    [],
  );

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return HELP_ARTICLES.filter((a) => {
      if (cat !== "all" && a.category !== cat) return false;
      if (!query) return true;
      return helpArticleMatchesQuery(a, query);
    });
  }, [q, cat]);

  const paths = QUICK_PATHS[locale];
  const suggestions = SUGGESTIONS[locale];
  const searching = q.trim().length > 0;

  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <section className="relative overflow-x-clip pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 30% -5%, rgba(24,131,71,0.11), transparent 55%), radial-gradient(ellipse 40% 35% at 90% 30%, rgba(30,41,59,0.04), transparent 50%)",
          }}
        />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden />

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
              {t.h1}{" "}
              <span className="text-bonero-green">{t.h1Accent}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ease }}
              className="mt-4 text-base leading-relaxed text-bonero-dark/55 sm:text-lg"
            >
              {t.lead}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, ease }}
            className="mx-auto mt-8 max-w-xl"
          >
            <label className="relative block text-left">
              <span className="sr-only">{t.searchLabel}</span>
              <Search
                size={18}
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-bonero-dark/35"
              />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full rounded-2xl border border-bonero-dark/10 bg-white py-3.5 pr-4 pl-12 text-sm text-bonero-dark shadow-[0_16px_48px_rgba(30,41,59,0.08)] outline-none ring-bonero-green/25 placeholder:text-bonero-dark/35 focus:ring-2"
              />
            </label>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] font-medium text-bonero-dark/35">{t.suggestions}</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setQ(s);
                    setCat("all");
                    document.getElementById("makaleler")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full border border-bonero-dark/10 bg-white px-2.5 py-1 text-[11px] font-medium text-bonero-dark/55 hover:border-bonero-green/30 hover:text-bonero-green"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick paths */}
      <section className="pb-14 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.pathsTitle}
            </h2>
            <p className="mt-2 text-sm text-bonero-dark/50">{t.pathsLead}</p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.id} delay={i * 0.05}>
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col rounded-2xl border border-bonero-dark/10 bg-white p-5 shadow-sm transition-all hover:border-bonero-green/30 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green transition-colors group-hover:bg-bonero-green group-hover:text-white">
                      <Icon size={19} />
                    </span>
                    <p className="mt-4 font-mono text-[10px] font-bold tracking-wide text-bonero-green uppercase">
                      {p.tag}
                    </p>
                    <h3 className="mt-1 text-base font-bold text-bonero-dark">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-bonero-dark/50">{p.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-bonero-green">
                      {t.read}
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories + articles */}
      <section
        id="makaleler"
        className="scroll-mt-24 border-y border-bonero-dark/8 bg-white py-14 sm:py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl tracking-wide text-bonero-dark sm:text-3xl">
              {t.catsTitle}
            </h2>
            <p className="mt-2 text-sm text-bonero-dark/50">{t.catsLead}</p>
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCat("all")}
              className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                cat === "all"
                  ? "bg-bonero-dark text-white"
                  : "border border-bonero-dark/10 bg-[#f8faf9] text-bonero-dark/60 hover:border-bonero-dark/20"
              }`}
            >
              {t.all}
              <span className="ml-1.5 font-mono text-[10px] opacity-60">{HELP_ARTICLES.length}</span>
            </button>
            {HELP_CATEGORIES.map((c) => {
              const Icon = ICONS[c.id];
              const count = HELP_ARTICLES.filter((a) => a.category === c.id).length;
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCat(c.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-bonero-green text-white"
                      : "border border-bonero-dark/10 bg-[#f8faf9] text-bonero-dark/60 hover:border-bonero-green/25"
                  }`}
                >
                  <Icon size={14} />
                  {pickL(c.title, locale)}
                  <span className="font-mono text-[10px] opacity-60">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Popular — only when browsing all and not searching */}
          {!searching && cat === "all" && (
            <div className="mt-12">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-bonero-green uppercase">
                    <Sparkles size={12} />
                    {t.popularTitle}
                  </p>
                  <p className="mt-1 text-sm text-bonero-dark/45">{t.popularLead}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {popular.map((article, i) => {
                  const category = getHelpCategory(article.category);
                  const Icon = ICONS[article.category];
                  return (
                    <Reveal key={article.slug} delay={i * 0.04}>
                      <Link
                        href={helpArticleHref(article.slug)}
                        className="group flex h-full gap-4 rounded-2xl border border-bonero-dark/10 bg-[#f8faf9] p-5 transition-all hover:border-bonero-green/30 hover:bg-white hover:shadow-sm"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-bonero-green shadow-sm group-hover:bg-bonero-green group-hover:text-white">
                          <Icon size={18} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold tracking-wide text-bonero-dark/35 uppercase">
                            {category ? pickL(category.title, locale) : ""}
                          </p>
                          <h3 className="mt-1 font-heading text-base text-bonero-dark group-hover:text-bonero-green sm:text-lg">
                            {pickL(article.title, locale)}
                          </h3>
                          <p className="mt-1.5 line-clamp-2 text-sm text-bonero-dark/50">
                            {pickL(article.description, locale)}
                          </p>
                          <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-bonero-dark/40">
                            <Clock size={11} />
                            {article.readingMinutes} {t.minRead}
                          </span>
                        </div>
                        <ArrowUpRight
                          size={16}
                          className="mt-1 shrink-0 text-bonero-dark/20 transition-colors group-hover:text-bonero-green"
                        />
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          )}

          {/* Full list */}
          <div className="mt-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-heading text-xl text-bonero-dark sm:text-2xl">
                {searching ? t.searchResults : cat !== "all" ? t.filtered : t.listTitle}
              </h3>
              {(searching || cat !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setQ("");
                    setCat("all");
                  }}
                  className="text-xs font-semibold text-bonero-green hover:underline"
                >
                  {t.clear}
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={`${cat}-${q}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-5 divide-y divide-bonero-dark/8 overflow-hidden rounded-2xl border border-bonero-dark/10 bg-[#f8faf9]"
              >
                {results.length === 0 ? (
                  <li className="px-5 py-10 text-center text-sm text-bonero-dark/50">{t.noResults}</li>
                ) : (
                  results.map((article) => {
                    const category = getHelpCategory(article.category);
                    return (
                      <li key={article.slug}>
                        <Link
                          href={helpArticleHref(article.slug)}
                          className="group flex flex-col gap-2 bg-white px-5 py-4 transition-colors hover:bg-bonero-green/[0.03] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5"
                        >
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-md bg-[#f6f8f7] px-2 py-0.5 text-[10px] font-bold tracking-wide text-bonero-dark/45 uppercase">
                                {category ? pickL(category.title, locale) : ""}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[10px] text-bonero-dark/35">
                                <Clock size={10} />
                                {article.readingMinutes} {t.minRead}
                              </span>
                            </div>
                            <p className="font-heading mt-1.5 text-base text-bonero-dark group-hover:text-bonero-green">
                              {pickL(article.title, locale)}
                            </p>
                            <p className="mt-1 line-clamp-1 text-sm text-bonero-dark/50">
                              {pickL(article.description, locale)}
                            </p>
                          </div>
                          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-bonero-green">
                            {t.read}
                            <ArrowRight size={12} />
                          </span>
                        </Link>
                      </li>
                    );
                  })
                )}
              </motion.ul>
            </AnimatePresence>

            <p className="mt-5 text-center text-sm text-bonero-dark/45">
              {t.supportHint}{" "}
              <Link href="/iletisim" className="font-semibold text-bonero-green hover:underline">
                {t.supportLink}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
