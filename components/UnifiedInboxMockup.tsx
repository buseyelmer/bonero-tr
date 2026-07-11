"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  CheckCheck,
  Mail,
  MessageCircle,
  Search,
  Send,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { useLocale, type Locale } from "./LocaleProvider";

type InboxItem = {
  id: string;
  channel: string;
  icon: LucideIcon;
  badge: string;
  name: string;
  preview: string;
  time: string;
  unread: boolean;
};

type Msg = {
  id: string;
  from: "them" | "us";
  text: string;
  time: string;
};

type ScriptBeat = {
  delay: number;
  action: "msg" | "typing" | "arrive" | "reset";
  msg?: Msg;
  arrive?: InboxItem;
};

const initialInboxByLocale: Record<Locale, InboxItem[]> = {
  tr: [
    {
      id: "1",
      channel: "WhatsApp",
      icon: MessageCircle,
      badge: "bg-[#25D366]/15 text-[#128C7E]",
      name: "Ayşe Yılmaz",
      preview: "Merhaba, rezervasyonumuz için onay alabilir miyiz?",
      time: "şimdi",
      unread: true,
    },
    {
      id: "2",
      channel: "Instagram",
      icon: Camera,
      badge: "bg-[#E1306C]/12 text-[#C13584]",
      name: "nova.brand",
      preview: "Story’deki ürün linkini paylaşır mısınız?",
      time: "2 dk",
      unread: true,
    },
    {
      id: "3",
      channel: "E-posta",
      icon: Mail,
      badge: "bg-bonero-dark/8 text-bonero-dark/65",
      name: "mehmet@atlas.co",
      preview: "Q3 kampanya brief’i ektedir — yorumlarınızı bekliyoruz.",
      time: "8 dk",
      unread: false,
    },
    {
      id: "4",
      channel: "WhatsApp",
      icon: MessageCircle,
      badge: "bg-[#25D366]/15 text-[#128C7E]",
      name: "Pulse Agency",
      preview: "Müşteri onayı geldi, yayına alabiliriz.",
      time: "14 dk",
      unread: false,
    },
  ],
  en: [
    {
      id: "1",
      channel: "WhatsApp",
      icon: MessageCircle,
      badge: "bg-[#25D366]/15 text-[#128C7E]",
      name: "Ayse Yilmaz",
      preview: "Hi, can we get confirmation for our reservation?",
      time: "now",
      unread: true,
    },
    {
      id: "2",
      channel: "Instagram",
      icon: Camera,
      badge: "bg-[#E1306C]/12 text-[#C13584]",
      name: "nova.brand",
      preview: "Could you share the product link from the story?",
      time: "2m",
      unread: true,
    },
    {
      id: "3",
      channel: "Email",
      icon: Mail,
      badge: "bg-bonero-dark/8 text-bonero-dark/65",
      name: "mehmet@atlas.co",
      preview: "Q3 campaign brief attached — looking forward to your notes.",
      time: "8m",
      unread: false,
    },
    {
      id: "4",
      channel: "WhatsApp",
      icon: MessageCircle,
      badge: "bg-[#25D366]/15 text-[#128C7E]",
      name: "Pulse Agency",
      preview: "Client approval is in — we can go live.",
      time: "14m",
      unread: false,
    },
  ],
};

const scriptByLocale: Record<Locale, ScriptBeat[]> = {
  tr: [
    {
      delay: 600,
      action: "msg",
      msg: {
        id: "m1",
        from: "them",
        text: "Merhaba, rezervasyonumuz için onay alabilir miyiz?",
        time: "14:02",
      },
    },
    {
      delay: 1800,
      action: "msg",
      msg: {
        id: "m2",
        from: "them",
        text: "Ayrıca Instagram DM’den de yazmıştık — tek yerden takip etmek kolay olur.",
        time: "14:03",
      },
    },
    { delay: 2800, action: "typing" },
    {
      delay: 4200,
      action: "msg",
      msg: {
        id: "m3",
        from: "us",
        text: "Tabii Ayşe! Bonero panelinden tüm kanallarınızı görüyorum. Onayı hemen işliyorum.",
        time: "14:04",
      },
    },
    {
      delay: 5600,
      action: "arrive",
      arrive: {
        id: "new",
        channel: "Instagram",
        icon: Camera,
        badge: "bg-[#E1306C]/12 text-[#C13584]",
        name: "orbit.studio",
        preview: "Yeni collab talebi · acil bakabilir misiniz?",
        time: "şimdi",
        unread: true,
      },
    },
    {
      delay: 7200,
      action: "msg",
      msg: {
        id: "m4",
        from: "them",
        text: "Süper, teşekkürler! 🙌",
        time: "14:05",
      },
    },
    { delay: 9800, action: "reset" },
  ],
  en: [
    {
      delay: 600,
      action: "msg",
      msg: {
        id: "m1",
        from: "them",
        text: "Hi, can we get confirmation for our reservation?",
        time: "14:02",
      },
    },
    {
      delay: 1800,
      action: "msg",
      msg: {
        id: "m2",
        from: "them",
        text: "We also messaged on Instagram DM — easier to track everything in one place.",
        time: "14:03",
      },
    },
    { delay: 2800, action: "typing" },
    {
      delay: 4200,
      action: "msg",
      msg: {
        id: "m3",
        from: "us",
        text: "Of course Ayse! I can see all your channels in the Bonero panel. Processing the confirmation now.",
        time: "14:04",
      },
    },
    {
      delay: 5600,
      action: "arrive",
      arrive: {
        id: "new",
        channel: "Instagram",
        icon: Camera,
        badge: "bg-[#E1306C]/12 text-[#C13584]",
        name: "orbit.studio",
        preview: "New collab request · can you check urgently?",
        time: "now",
        unread: true,
      },
    },
    {
      delay: 7200,
      action: "msg",
      msg: {
        id: "m4",
        from: "them",
        text: "Awesome, thank you! 🙌",
        time: "14:05",
      },
    },
    { delay: 9800, action: "reset" },
  ],
};

const copyByLocale: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    footerNote: string;
    liveSession: string;
    searchPlaceholder: string;
    filters: string[];
    contactName: string;
    contactMeta: string;
    conversationStarting: string;
    composerPlaceholder: string;
    ariaLabel: string;
    typingDraft: string;
    arriveToast: string;
  }
> = {
  tr: {
    eyebrow: "Canlı önizleme",
    title: "Panelin içine girin.",
    titleAccent: "Operasyon şu an akıyor.",
    subtitle:
      "Gerçek bir ajans anı: mesaj gelir, ekip yazar, yeni kanal ping’ler — hepsi tek ekranda.",
    footerNote: "Otomatik demo · gerçek panel deneyimine yakın akış",
    liveSession: "Canlı oturum",
    searchPlaceholder: "Inbox’ta ara…",
    filters: ["Tümü", "WhatsApp", "Instagram", "E-posta"],
    contactName: "Ayşe Yılmaz",
    contactMeta: "WhatsApp · Atlas Media müşterisi",
    conversationStarting: "Konuşma başlıyor…",
    composerPlaceholder: "Yanıt yaz… (tüm kanallardan görünür)",
    ariaLabel: "Bonero Birleşik Gelen Kutusu canlı panel önizlemesi",
    typingDraft: "Tabii Ayşe! Bonero panelinden…",
    arriveToast: "Yeni Instagram mesajı",
  },
  en: {
    eyebrow: "Live preview",
    title: "Step inside the panel.",
    titleAccent: "Operations are live right now.",
    subtitle:
      "A real agency moment: a message arrives, the team replies, a new channel pings — all on one screen.",
    footerNote: "Auto demo · close to the real panel experience",
    liveSession: "Live session",
    searchPlaceholder: "Search inbox…",
    filters: ["All", "WhatsApp", "Instagram", "Email"],
    contactName: "Ayse Yilmaz",
    contactMeta: "WhatsApp · Atlas Media client",
    conversationStarting: "Conversation starting…",
    composerPlaceholder: "Write a reply… (visible across channels)",
    ariaLabel: "Bonero Unified Inbox live panel preview",
    typingDraft: "Of course Ayse! From the Bonero panel…",
    arriveToast: "New Instagram message",
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function UnifiedInboxMockup() {
  const { locale } = useLocale();
  const t = copyByLocale[locale];
  const initialInbox = initialInboxByLocale[locale];
  const script = scriptByLocale[locale];

  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [inbox, setInbox] = useState(initialInbox);
  const [activeId, setActiveId] = useState("1");
  const [toast, setToast] = useState<string | null>(null);
  const [composer, setComposer] = useState("");
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timers: number[] = [];

    const run = () => {
      setMessages([]);
      setTyping(false);
      setInbox(initialInbox);
      setActiveId("1");
      setToast(null);
      setComposer("");

      script.forEach((beat) => {
        timers.push(
          window.setTimeout(() => {
            if (beat.action === "msg" && beat.msg) {
              setTyping(false);
              setMessages((prev) => [...prev, beat.msg!]);
              if (beat.msg.from === "us") {
                setComposer("");
              }
            }
            if (beat.action === "typing") {
              setTyping(true);
              setComposer(t.typingDraft);
            }
            if (beat.action === "arrive" && beat.arrive) {
              setInbox((prev) => [beat.arrive!, ...prev.slice(0, 3)]);
              setToast(t.arriveToast);
              window.setTimeout(() => setToast(null), 2200);
            }
            if (beat.action === "reset") {
              setLoop((l) => l + 1);
            }
          }, beat.delay),
        );
      });
    };

    run();
    return () => timers.forEach(clearTimeout);
  }, [inView, loop, locale]);

  return (
    <section
      ref={sectionRef}
      id="birlesik-inbox"
      className="relative overflow-x-clip py-16 sm:py-24"
      aria-labelledby="birlesik-inbox-baslik"
      style={{
        background:
          "linear-gradient(180deg, #e8ece9 0%, #f4f6f5 40%, #f9fafb 100%)",
      }}
    >
      {/* Desk atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(30,41,59,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute top-1/3 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(24,131,71,0.12), transparent 65%)",
        }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            {t.eyebrow}
          </p>
          <h2
            id="birlesik-inbox-baslik"
            className="font-heading mt-3 text-3xl !font-extrabold tracking-wide text-bonero-dark sm:text-4xl lg:text-[2.6rem]"
          >
            {t.title}
            <span className="mt-1 block text-bonero-green">
              {t.titleAccent}
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bonero-dark/55">
            {t.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 lg:mt-14">
          <motion.div
            className="relative mx-auto max-w-5xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Ambient glow behind app */}
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2rem] opacity-70 blur-2xl sm:-inset-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(24,131,71,0.25), rgba(30,41,59,0.08))",
              }}
            />

            {/* Toast notification */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: -16, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: -10, x: "-50%" }}
                  className="absolute top-3 left-1/2 z-30 flex items-center gap-2 rounded-full border border-bonero-dark/10 bg-white px-4 py-2 text-xs font-semibold text-bonero-dark shadow-lg"
                >
                  <span className="flex h-2 w-2 animate-ping rounded-full bg-[#E1306C]" />
                  {toast}
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className="relative overflow-hidden rounded-[1.25rem] border border-bonero-dark/10 bg-white shadow-[0_40px_100px_rgba(30,41,59,0.18)] sm:rounded-[1.5rem]"
              role="img"
              aria-label={t.ariaLabel}
            >
              {/* App chrome */}
              <div className="flex items-center justify-between gap-3 border-b border-bonero-dark/8 bg-[#f8faf9] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 hidden rounded-md border border-bonero-dark/8 bg-white px-3 py-1 text-xs text-bonero-dark/45 sm:inline">
                    app.bonero.tr / inbox
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-bonero-green" />
                  </span>
                  <span className="text-[11px] font-semibold text-bonero-green">
                    {t.liveSession}
                  </span>
                </div>
              </div>

              <div className="grid min-h-[460px] lg:grid-cols-[300px_1fr]">
                {/* Inbox list */}
                <aside className="border-b border-bonero-dark/8 bg-[#fafbfa] lg:border-r lg:border-b-0">
                  <div className="border-b border-bonero-dark/8 p-3">
                    <div className="flex items-center gap-2 rounded-lg border border-bonero-dark/8 bg-white px-3 py-2 text-xs text-bonero-dark/40">
                      <Search size={14} />
                      {t.searchPlaceholder}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {t.filters.map((filter, i) => (
                        <span
                          key={filter}
                          className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                            i === 0
                              ? "bg-bonero-dark text-white"
                              : "bg-bonero-dark/5 text-bonero-dark/55"
                          }`}
                        >
                          {filter}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ul className="divide-y divide-bonero-dark/6">
                    <AnimatePresence initial={false}>
                      {inbox.map((item) => {
                        const Icon = item.icon;
                        const on = activeId === item.id;
                        return (
                          <motion.li
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: -12, backgroundColor: "rgba(24,131,71,0.15)" }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              backgroundColor: on
                                ? "rgba(24,131,71,0.08)"
                                : "rgba(0,0,0,0)",
                            }}
                            transition={{ duration: 0.4, ease }}
                            className="flex cursor-default gap-3 px-3 py-3"
                          >
                            <span
                              className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.badge}`}
                            >
                              <Icon size={15} strokeWidth={1.75} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <p
                                  className={`truncate text-sm ${
                                    item.unread
                                      ? "font-semibold text-bonero-dark"
                                      : "font-medium text-bonero-dark/80"
                                  }`}
                                >
                                  {item.name}
                                </p>
                                <span className="shrink-0 text-[10px] text-bonero-dark/40">
                                  {item.time}
                                </span>
                              </div>
                              <p className="mt-0.5 text-[10px] font-medium tracking-wide text-bonero-dark/40 uppercase">
                                {item.channel}
                              </p>
                              <p className="mt-0.5 truncate text-xs text-bonero-dark/55">
                                {item.preview}
                              </p>
                            </div>
                            {item.unread && (
                              <motion.span
                                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-bonero-green"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 1.2, repeat: Infinity }}
                              />
                            )}
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>
                </aside>

                {/* Conversation — live */}
                <div className="flex flex-col bg-white">
                  <div className="flex items-center justify-between border-b border-bonero-dark/8 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-bonero-dark">
                        {t.contactName}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-bonero-dark/45">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                        {t.contactMeta}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#25D366]/15 px-2.5 py-1 text-[10px] font-semibold text-[#128C7E]">
                      WhatsApp
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 overflow-hidden p-4 sm:p-5">
                    <AnimatePresence initial={false}>
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{
                            opacity: 0,
                            y: 16,
                            scale: 0.96,
                          }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 22,
                          }}
                          className={`flex ${
                            msg.from === "us" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[70%] ${
                              msg.from === "us"
                                ? "rounded-br-md bg-bonero-green text-white shadow-md shadow-bonero-green/20"
                                : "rounded-bl-md bg-[#f1f4f2] text-bonero-dark"
                            }`}
                          >
                            {msg.text}
                            <p
                              className={`mt-1 flex items-center gap-1 text-[10px] ${
                                msg.from === "us"
                                  ? "justify-end text-white/70"
                                  : "text-bonero-dark/40"
                              }`}
                            >
                              {msg.time}
                              {msg.from === "us" && (
                                <CheckCheck size={12} className="text-white/80" />
                              )}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <AnimatePresence>
                      {typing && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex justify-end"
                        >
                          <div className="flex items-center gap-1 rounded-2xl rounded-br-md bg-bonero-green/15 px-3 py-2.5">
                            {[0, 1, 2].map((i) => (
                              <motion.span
                                key={i}
                                className="h-1.5 w-1.5 rounded-full bg-bonero-green"
                                animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                                transition={{
                                  duration: 0.7,
                                  delay: i * 0.12,
                                  repeat: Infinity,
                                }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {messages.length === 0 && !typing && (
                      <p className="m-auto text-xs text-bonero-dark/30">
                        {t.conversationStarting}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-bonero-dark/8 p-3">
                    <div className="flex items-center gap-2 rounded-xl border border-bonero-dark/8 bg-[#f8faf9] px-3 py-2.5">
                      <span className="min-w-0 flex-1 truncate text-sm text-bonero-dark/70">
                        {composer || (
                          <span className="text-bonero-dark/35">
                            {t.composerPlaceholder}
                          </span>
                        )}
                      </span>
                      <motion.span
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-bonero-green text-white"
                        animate={
                          typing
                            ? { scale: [1, 1.08, 1] }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.8, repeat: typing ? Infinity : 0 }}
                      >
                        <Send size={14} />
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-bonero-dark/40">
              {t.footerNote}
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
