"use client";

import { Camera, Mail, MessageCircle, Search, Send } from "lucide-react";
import Reveal from "./Reveal";

const inboxItems = [
  {
    channel: "WhatsApp",
    icon: MessageCircle,
    badge: "bg-[#25D366]/15 text-[#128C7E]",
    name: "Ayşe Yılmaz",
    preview: "Merhaba, rezervasyonumuz için onay alabilir miyiz?",
    time: "şimdi",
    unread: true,
    active: true,
  },
  {
    channel: "Instagram",
    icon: Camera,
    badge: "bg-[#E1306C]/12 text-[#C13584]",
    name: "nova.brand",
    preview: "Story’deki ürün linkini paylaşır mısınız?",
    time: "2 dk",
    unread: true,
    active: false,
  },
  {
    channel: "E-posta",
    icon: Mail,
    badge: "bg-bonero-dark/8 text-bonero-dark/65",
    name: "mehmet@atlas.co",
    preview: "Q3 kampanya brief’i ektedir — yorumlarınızı bekliyoruz.",
    time: "8 dk",
    unread: false,
    active: false,
  },
  {
    channel: "WhatsApp",
    icon: MessageCircle,
    badge: "bg-[#25D366]/15 text-[#128C7E]",
    name: "Pulse Agency",
    preview: "Müşteri onayı geldi, yayına alabiliriz.",
    time: "14 dk",
    unread: false,
    active: false,
  },
];

const thread = [
  {
    from: "them",
    text: "Merhaba, rezervasyonumuz için onay alabilir miyiz?",
    time: "14:02",
  },
  {
    from: "them",
    text: "Ayrıca Instagram DM’den de yazmıştık — tek yerden takip etmek kolay olur.",
    time: "14:03",
  },
  {
    from: "us",
    text: "Tabii Ayşe! Bonero panelinden tüm kanallarınızı görüyorum. Onayı hemen işliyorum.",
    time: "14:04",
  },
];

export default function UnifiedInboxMockup() {
  return (
    <section
      id="birlesik-inbox"
      className="relative overflow-hidden border-t border-bonero-dark/6 bg-background py-16 sm:py-24"
      aria-labelledby="birlesik-inbox-baslik"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="w-full">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
              Canlı önizleme
            </p>
            <h2
              id="birlesik-inbox-baslik"
              className="font-heading mt-3 text-3xl tracking-wide text-bonero-dark sm:text-4xl"
            >
              Omnichannel paneli içeriden görün
            </h2>
            <p className="mt-4 text-base leading-relaxed text-bonero-dark/60">
              WhatsApp, Instagram ve e-posta mesajları soldaki Birleşik Gelen
              Kutusu’nda birleşir. Sağda konuşmayı yanıtlayın — tek panel, canlı
              operasyon.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-12 w-full lg:mt-16">
          <div
            className="glass-panel mx-auto w-full overflow-hidden rounded-2xl shadow-sm"
            role="img"
            aria-label="Bonero Birleşik Gelen Kutusu canlı panel önizlemesi"
          >
            {/* Chrome */}
            <div className="flex items-center justify-between gap-3 border-b border-bonero-dark/8 bg-white/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-bonero-dark/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-bonero-dark/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-bonero-dark/20" />
                <span className="ml-2 hidden rounded-md bg-white/90 px-3 py-1 text-xs text-bonero-dark/45 sm:inline">
                  app.bonero.tr / inbox
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-bonero-green" />
                </span>
                <span className="text-[11px] font-medium text-bonero-green">
                  Canlı
                </span>
              </div>
            </div>

            <div className="grid min-h-[420px] lg:grid-cols-[280px_1fr]">
              {/* Left: Unified Inbox stream */}
              <aside className="border-b border-bonero-dark/8 bg-white/40 lg:border-r lg:border-b-0">
                <div className="border-b border-bonero-dark/8 p-3">
                  <div className="flex items-center gap-2 rounded-lg border border-bonero-dark/8 bg-white/80 px-3 py-2 text-xs text-bonero-dark/40">
                    <Search size={14} />
                    Inbox’ta ara…
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {["Tümü", "WhatsApp", "Instagram", "E-posta"].map(
                      (filter, i) => (
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
                      ),
                    )}
                  </div>
                </div>

                <ul className="divide-y divide-bonero-dark/6">
                  {inboxItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={`${item.channel}-${item.name}`}
                        className={`flex gap-3 px-3 py-3 transition-colors ${
                          item.active
                            ? "bg-bonero-green/8"
                            : "hover:bg-white/50"
                        }`}
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
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-bonero-green" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </aside>

              {/* Right: Conversation */}
              <div className="flex flex-col bg-white/30">
                <div className="flex items-center justify-between border-b border-bonero-dark/8 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-bonero-dark">
                      Ayşe Yılmaz
                    </p>
                    <p className="text-xs text-bonero-dark/45">
                      WhatsApp · Atlas Media müşterisi
                    </p>
                  </div>
                  <span className="rounded-full bg-[#25D366]/15 px-2.5 py-1 text-[10px] font-semibold text-[#128C7E]">
                    WhatsApp
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                  {thread.map((msg) => (
                    <div
                      key={msg.time + msg.text.slice(0, 12)}
                      className={`flex ${
                        msg.from === "us" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[70%] ${
                          msg.from === "us"
                            ? "rounded-br-md bg-bonero-green text-white"
                            : "rounded-bl-md bg-white/90 text-bonero-dark shadow-sm"
                        }`}
                      >
                        {msg.text}
                        <p
                          className={`mt-1 text-[10px] ${
                            msg.from === "us"
                              ? "text-white/70"
                              : "text-bonero-dark/40"
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-bonero-dark/8 p-3">
                  <div className="flex items-center gap-2 rounded-xl border border-bonero-dark/8 bg-white/80 px-3 py-2.5">
                    <input
                      readOnly
                      tabIndex={-1}
                      aria-hidden="true"
                      placeholder="Yanıt yaz… (tüm kanallardan görünür)"
                      className="min-w-0 flex-1 bg-transparent text-sm text-bonero-dark outline-none placeholder:text-bonero-dark/35"
                    />
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bonero-green text-white">
                      <Send size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
