"use client";

import { useEffect, useState } from "react";
import {
  Camera,
  Check,
  MapPinned,
  MessageCircle,
  Package,
  ShoppingBag,
  Star,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

type Locale = "tr" | "en";

type UseCase = {
  id: string;
  icon: LucideIcon;
  title: Record<Locale, string>;
  tagline: Record<Locale, string>;
  description: Record<Locale, string>;
  beats: { label: Record<Locale, string>; detail: Record<Locale, string> }[];
  outcome: Record<Locale, string>;
};

const useCases: UseCase[] = [
  {
    id: "ecommerce",
    icon: ShoppingBag,
    title: {
      tr: "E-ticaret ajansları",
      en: "E-commerce agencies",
    },
    tagline: {
      tr: "Katalogdan yanıta tek zincir",
      en: "Catalog to reply in one chain",
    },
    description: {
      tr: "Stok, kampanya ve DM’ler ayrı panellerde dağılmasın. Ürün soruları, iade ve kampanya mesajları aynı operasyonda aksın.",
      en: "Stock, campaigns, and DMs shouldn’t live in separate tabs. Product questions, returns, and promos run in one operation.",
    },
    beats: [
      {
        label: { tr: "Katalog sinyali", en: "Catalog signal" },
        detail: {
          tr: "Yeni SKU ve stok düşüşü paneli besler",
          en: "New SKUs and stock drops feed the panel",
        },
      },
      {
        label: { tr: "Kanal yayını", en: "Channel publish" },
        detail: {
          tr: "IG + WA + mail aynı anda güncellenir",
          en: "IG + WA + mail update together",
        },
      },
      {
        label: { tr: "Satış yanıtı", en: "Sales reply" },
        detail: {
          tr: "Ürün sorusu saniyeler içinde cevaplanır",
          en: "Product questions answered in seconds",
        },
      },
    ],
    outcome: {
      tr: "Kampanya günü panik yerine kontrollü tempo",
      en: "Campaign day becomes controlled tempo, not panic",
    },
  },
  {
    id: "local",
    icon: MapPinned,
    title: {
      tr: "Yerel işletmeler",
      en: "Local businesses",
    },
    tagline: {
      tr: "Harita + sosyal, aynı nabız",
      en: "Maps + social, same pulse",
    },
    description: {
      tr: "Rezervasyon, yorum ve hikâye etkileşimi ayrı yerlerde birikmesin. Yerel marka tek inbox’ta müşteriyi kaçırmasın.",
      en: "Bookings, reviews, and story replies shouldn’t pile up apart. Local brands keep every guest in one inbox.",
    },
    beats: [
      {
        label: { tr: "Yorum düşer", en: "Review lands" },
        detail: {
          tr: "Google yorumu anında görünür",
          en: "Google review shows up instantly",
        },
      },
      {
        label: { tr: "Rezervasyon", en: "Booking" },
        detail: {
          tr: "DM / WhatsApp talebi sıraya girer",
          en: "DM / WhatsApp request joins the queue",
        },
      },
      {
        label: { tr: "Yanıt + yayın", en: "Reply + post" },
        detail: {
          tr: "Teşekkür + hikâye aynı akışta",
          en: "Thank-you + story in the same flow",
        },
      },
    ],
    outcome: {
      tr: "Mahalle itibarı ve doluluk aynı panelden yönetilir",
      en: "Neighborhood reputation and occupancy from one panel",
    },
  },
  {
    id: "personal",
    icon: UserRound,
    title: {
      tr: "Kişisel markalar",
      en: "Personal brands",
    },
    tagline: {
      tr: "Tonunuz bozulmadan ölçek",
      en: "Scale without losing your voice",
    },
    description: {
      tr: "DM, collab ve yorum yağmuru kişisel sesi boğmasın. Planlama, yanıt ve iş birliği talepleri tek operasyonda kalsın.",
      en: "DMs, collabs, and comment waves shouldn’t drown your voice. Planning, replies, and partnership asks stay in one flow.",
    },
    beats: [
      {
        label: { tr: "Ton kilidi", en: "Voice lock" },
        detail: {
          tr: "Yanıt önerileri marka sesine uyar",
          en: "Reply suggestions match your tone",
        },
      },
      {
        label: { tr: "Collab filtresi", en: "Collab filter" },
        detail: {
          tr: "İş birliği talepleri ayrı kuyrukta",
          en: "Partnership asks land in their own queue",
        },
      },
      {
        label: { tr: "Tek yanıt hattı", en: "One reply line" },
        detail: {
          tr: "DM + yorum aynı tempoda kapanır",
          en: "DMs + comments close at the same pace",
        },
      },
    ],
    outcome: {
      tr: "Kişisel marka büyür, ses bozulmaz",
      en: "The brand grows; the voice stays intact",
    },
  },
];

const copy = {
  tr: {
    eyebrow: "Kullanım Senaryoları",
    title: "Nişinize göre akan operasyon",
    subtitle:
      "Her dikey kendi temposunda çalışır. Senaryoyu seçin — Bonero’nun o nişte nasıl işlediğini canlı görün.",
    flow: "Akış",
    outcome: "Sonuç",
  },
  en: {
    eyebrow: "Use Cases",
    title: "Operations that match your niche",
    subtitle:
      "Every vertical has its own tempo. Pick a scenario — watch how Bonero runs that niche live.",
    flow: "Flow",
    outcome: "Outcome",
  },
};

const CYCLE = 6200;
const ease = [0.22, 1, 0.36, 1] as const;

function SceneEcommerce({ locale }: { locale: Locale }) {
  const items = [
    { sku: "SKU-204", stock: locale === "tr" ? "Stok 12" : "Stock 12", ok: true },
    { sku: "SKU-881", stock: locale === "tr" ? "Kampanya" : "Campaign", ok: true },
    { sku: "SKU-044", stock: locale === "tr" ? "DM soru" : "DM ask", ok: false },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-2">
      {items.map((item, i) => (
        <motion.div
          key={item.sku}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.18, duration: 0.4, ease }}
          className="flex items-center gap-3 rounded-2xl border border-bonero-dark/8 bg-white px-3.5 py-3 shadow-sm"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-bonero-green/10 text-bonero-green">
            <Package size={16} strokeWidth={1.75} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-bonero-dark">{item.sku}</p>
            <p className="text-[11px] text-bonero-dark/45">{item.stock}</p>
          </div>
          {item.ok ? (
            <Check size={14} className="text-bonero-green" strokeWidth={2.5} />
          ) : (
            <motion.span
              className="rounded-full bg-bonero-green px-2 py-0.5 text-[10px] font-bold text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.85, type: "spring", stiffness: 280, damping: 18 }}
            >
              {locale === "tr" ? "Yanıtla" : "Reply"}
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function SceneLocal({ locale }: { locale: Locale }) {
  return (
    <div className="flex h-full flex-col justify-center gap-4 px-2">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.4, ease }}
        className="rounded-2xl border border-bonero-dark/8 bg-white p-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPinned size={15} className="text-bonero-green" />
            <span className="text-xs font-bold text-bonero-dark">
              {locale === "tr" ? "Google yorum" : "Google review"}
            </span>
          </div>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={11}
                className="fill-amber-400 text-amber-400"
              />
            ))}
          </div>
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-bonero-dark/55">
          {locale === "tr"
            ? "“Hizmet harika, kesinlikle tekrar geleceğiz.”"
            : "“Great service — we’ll definitely come back.”"}
        </p>
      </motion.div>

      <div className="flex gap-2">
        {[
          {
            Icon: MessageCircle,
            label: locale === "tr" ? "Rezervasyon" : "Booking",
            c: "#25D366",
          },
          {
            Icon: Camera,
            label: locale === "tr" ? "Hikâye" : "Story",
            c: "#E1306C",
          },
        ].map(({ Icon, label, c }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.35, ease }}
            className="flex flex-1 items-center gap-2 rounded-2xl border border-bonero-dark/8 bg-white px-3 py-2.5 shadow-sm"
          >
            <Icon size={14} style={{ color: c }} strokeWidth={1.75} />
            <span className="text-[11px] font-semibold text-bonero-dark/70">
              {label}
            </span>
            <Check size={12} className="ml-auto text-bonero-green" strokeWidth={2.5} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ScenePersonal({ locale }: { locale: Locale }) {
  const rows = [
    {
      from: "DM",
      text:
        locale === "tr"
          ? "Collab teklifi — marka X"
          : "Collab offer — brand X",
      tag: locale === "tr" ? "Collab" : "Collab",
    },
    {
      from: "IG",
      text:
        locale === "tr" ? "Yorum: tonun çok iyi 🔥" : "Comment: love your tone",
      tag: locale === "tr" ? "Yanıt" : "Reply",
    },
    {
      from: "WA",
      text:
        locale === "tr" ? "Podcast daveti — Perşembe" : "Podcast invite — Thu",
      tag: locale === "tr" ? "Plan" : "Plan",
    },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-2">
      {rows.map((row, i) => (
        <motion.div
          key={row.text}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12 + i * 0.16, duration: 0.4, ease }}
          className="flex items-start gap-3 rounded-2xl border border-bonero-dark/8 bg-white px-3.5 py-3 shadow-sm"
        >
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-bonero-dark/[0.05] text-[10px] font-bold text-bonero-dark/50">
            {row.from}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-medium text-bonero-dark/80">
              {row.text}
            </p>
            <span className="mt-1 inline-block rounded-full bg-bonero-green/10 px-2 py-0.5 text-[10px] font-bold text-bonero-green">
              {row.tag}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const scenes = [SceneEcommerce, SceneLocal, ScenePersonal];

export default function UseCases() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [active, setActive] = useState(0);
  const [beat, setBeat] = useState(0);
  const [inView, setInView] = useState(false);
  const current = useCases[active];
  const Icon = current.icon;
  const Scene = scenes[active];

  useEffect(() => {
    const el = document.getElementById("kullanim-senaryolari");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    setBeat(0);
    const beatTimers = current.beats.map((_, i) =>
      window.setTimeout(() => setBeat(i), (i * CYCLE) / current.beats.length),
    );
    const next = window.setTimeout(() => {
      setActive((p) => (p + 1) % useCases.length);
    }, CYCLE);
    return () => {
      beatTimers.forEach(clearTimeout);
      clearTimeout(next);
    };
  }, [active, inView, current.beats]);

  return (
    <section
      id="kullanim-senaryolari"
      className="relative overflow-hidden py-16 sm:py-24"
      style={{
        background:
          "linear-gradient(180deg, #f4f7f5 0%, #eef3f0 50%, #f7f9f8 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 70% 0%, rgba(24,131,71,0.1), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.65rem]">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
            {t.subtitle}
          </p>
        </Reveal>

        {/* Scenario tabs */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {useCases.map((uc, i) => {
            const on = active === i;
            const UIcon = uc.icon;
            return (
              <button
                key={uc.id}
                type="button"
                onClick={() => setActive(i)}
                className={`inline-flex shrink-0 items-center gap-2.5 rounded-2xl px-4 py-3 text-left transition-colors ${
                  on
                    ? "bg-bonero-dark text-white shadow-lg shadow-bonero-dark/15"
                    : "bg-white/80 text-bonero-dark/55 ring-1 ring-bonero-dark/8 hover:bg-white hover:text-bonero-dark"
                }`}
              >
                <UIcon size={16} strokeWidth={1.75} />
                <span className="text-sm font-semibold tracking-tight">
                  {uc.title[locale]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stage */}
        <div className="mt-6 grid min-w-0 overflow-hidden rounded-[1.5rem] border border-bonero-dark/8 bg-white shadow-[0_20px_50px_-28px_rgba(30,41,59,0.25)] lg:grid-cols-12">
          {/* Narrative */}
          <div className="flex min-w-0 flex-col justify-between gap-8 border-b border-bonero-dark/6 p-6 sm:p-8 lg:col-span-5 lg:border-r lg:border-b-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bonero-green text-white">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <p className="text-xs font-bold tracking-wide text-bonero-green uppercase">
                    {current.tagline[locale]}
                  </p>
                </div>
                <h3 className="font-heading mt-5 text-2xl tracking-wide text-bonero-dark sm:text-3xl">
                  {current.title[locale]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bonero-dark/55 sm:text-base">
                  {current.description[locale]}
                </p>
              </motion.div>
            </AnimatePresence>

            <div>
              <p className="mb-3 text-[11px] font-bold tracking-wide text-bonero-dark/35 uppercase">
                {t.flow}
              </p>
              <ol className="space-y-2">
                {current.beats.map((b, i) => {
                  const on = beat === i;
                  return (
                    <li
                      key={b.label.tr}
                      className={`flex gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                        on ? "bg-bonero-green/8" : "bg-transparent"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          on
                            ? "bg-bonero-green text-white"
                            : "bg-bonero-dark/8 text-bonero-dark/40"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-semibold ${
                            on ? "text-bonero-dark" : "text-bonero-dark/45"
                          }`}
                        >
                          {b.label[locale]}
                        </p>
                        <p
                          className={`text-xs ${
                            on ? "text-bonero-dark/55" : "text-bonero-dark/30"
                          }`}
                        >
                          {b.detail[locale]}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Live scene */}
            <div className="relative min-h-[340px] overflow-hidden bg-[#f8faf9] p-5 pb-28 sm:min-h-[360px] sm:p-7 sm:pb-28 lg:col-span-7">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(30,41,59,0.06) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
              aria-hidden="true"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.35, ease }}
                className="relative min-h-[200px]"
              >
                <Scene locale={locale} />
              </motion.div>
            </AnimatePresence>

            <motion.div
              key={`out-${current.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4, ease }}
              className="absolute right-4 bottom-4 left-4 sm:right-6 sm:bottom-6 sm:left-6"
            >
              <div className="rounded-2xl border border-bonero-green/20 bg-white/95 px-4 py-3 shadow-md backdrop-blur-sm">
                <p className="text-[10px] font-bold tracking-wide text-bonero-green uppercase">
                  {t.outcome}
                </p>
                <p className="mt-0.5 text-sm leading-snug font-semibold break-words text-bonero-dark">
                  {current.outcome[locale]}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          key={active}
          className="mt-4 h-0.5 origin-left rounded-full bg-bonero-green"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: CYCLE / 1000, ease: "linear" }}
        />
      </div>
    </section>
  );
}
