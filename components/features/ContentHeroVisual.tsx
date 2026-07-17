"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Bell, Camera, Check, Mail, Sparkles } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const ease = [0.22, 1, 0.36, 1] as const;
const TICK = 3200;

type Post = {
  title: string;
  channel: "ig" | "mail" | "story";
  status: "draft" | "review" | "approved" | "scheduled";
};

type Day = {
  short: string;
  num: number;
  posts: Post[];
  owner?: string;
};

const copy = {
  tr: {
    weekLabel: "Bu hafta · pano",
    live: "4 sırada",
    owner: "Furkan",
    badgeApproved: "Onaylandı",
    badgeReview: "Furkan inceliyor",
    badgeNext: "Çar 14:00",
    days: [
      { short: "Pzt", num: 10, posts: [] },
      {
        short: "Sal",
        num: 11,
        owner: "Furkan",
        posts: [{ title: "Bahar carousel", channel: "ig", status: "draft" }],
      },
      {
        short: "Çar",
        num: 12,
        posts: [
          { title: "Kampanya reel", channel: "ig", status: "review" },
          { title: "Bülten v2", channel: "mail", status: "approved" },
        ],
      },
      {
        short: "Per",
        num: 13,
        posts: [{ title: "Story · randevu", channel: "story", status: "scheduled" }],
      },
      { short: "Cum", num: 14, posts: [] },
    ] as Day[],
  },
  en: {
    weekLabel: "This week · board",
    live: "4 queued",
    owner: "Furkan",
    badgeApproved: "Approved",
    badgeReview: "Furkan reviewing",
    badgeNext: "Wed 14:00",
    days: [
      { short: "Mon", num: 10, posts: [] },
      {
        short: "Tue",
        num: 11,
        owner: "Furkan",
        posts: [{ title: "Spring carousel", channel: "ig", status: "draft" }],
      },
      {
        short: "Wed",
        num: 12,
        posts: [
          { title: "Campaign reel", channel: "ig", status: "review" },
          { title: "Newsletter v2", channel: "mail", status: "approved" },
        ],
      },
      {
        short: "Thu",
        num: 13,
        posts: [{ title: "Booking story", channel: "story", status: "scheduled" }],
      },
      { short: "Fri", num: 14, posts: [] },
    ] as Day[],
  },
};

function ChannelIcon({ channel }: { channel: Post["channel"] }) {
  if (channel === "mail") return <Mail size={11} />;
  if (channel === "story") return <Sparkles size={11} />;
  return <Camera size={11} />;
}

function tone(status: Post["status"]) {
  if (status === "approved") return "border-bonero-green/30 bg-bonero-green/[0.1]";
  if (status === "review") return "border-violet-400/35 bg-violet-50";
  if (status === "scheduled") return "border-bonero-green/20 bg-white";
  return "border-bonero-dark/10 bg-[#f4f6f5]";
}

type Props = { onDark?: boolean };

export default function ContentHeroVisual({ onDark = false }: Props) {
  const { locale } = useLocale();
  const t = copy[locale];
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), {
    stiffness: 90,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), {
    stiffness: 90,
    damping: 22,
  });

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((p) => (p + 1) % t.days.length), TICK);
    return () => clearInterval(id);
  }, [paused, t.days.length, active]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div className="relative flex h-full w-full flex-col">
      <motion.div
        className="pointer-events-none absolute -left-1 top-10 z-20 hidden rounded-xl border border-bonero-green/25 bg-white px-2.5 py-1.5 shadow-lg lg:block"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="flex items-center gap-1 text-[10px] font-bold text-bonero-green">
          <Check size={11} />
          {t.badgeApproved}
        </p>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute top-1/3 -right-1 z-20 hidden rounded-xl border border-violet-500/20 bg-white px-2.5 py-1.5 shadow-lg lg:block"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <p className="flex items-center gap-1.5 text-[10px] font-bold text-violet-700">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
          {t.badgeReview}
        </p>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute right-8 -bottom-1 z-20 hidden rounded-xl border border-bonero-dark/10 bg-white px-2.5 py-1.5 shadow-lg lg:block"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <p className="flex items-center gap-1.5 text-[10px] font-bold text-bonero-dark/65">
          <Bell size={11} className="text-bonero-green" />
          {t.badgeNext}
        </p>
      </motion.div>

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className={`relative flex min-h-[22rem] flex-1 flex-col overflow-hidden rounded-[1.4rem] border shadow-[0_28px_70px_rgba(0,0,0,0.3)] sm:min-h-[26rem] ${
          onDark ? "border-white/12 bg-[#f9fafb]" : "border-bonero-dark/8 bg-white"
        }`}
      >
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-bonero-green/55 to-transparent"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />

        <div className="relative flex items-center justify-between gap-3 border-b border-bonero-dark/6 px-4 py-3 sm:px-5">
          <p className="text-[10px] font-bold tracking-[0.14em] text-bonero-dark/40 uppercase">
            {t.weekLabel}
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-bonero-green/[0.08] px-2 py-1 text-[10px] font-bold text-bonero-green">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green/40" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-bonero-green" />
              </span>
              {t.live}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-bonero-dark/8 bg-white px-2 py-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-bonero-green text-[9px] font-bold text-white">
                F
              </span>
              <span className="text-[10px] font-bold text-bonero-dark">{t.owner}</span>
            </span>
          </div>
        </div>

        {/* Tall day columns */}
        <div className="relative grid flex-1 grid-cols-5 gap-px bg-bonero-dark/[0.06]">
          {t.days.map((day, i) => {
            const isActive = active === i;
            const isWed = i === 2;
            return (
              <button
                key={day.short}
                type="button"
                onClick={() => setActive(i)}
                className={`flex min-h-[16rem] flex-col p-2 text-left transition-colors sm:min-h-0 sm:p-2.5 ${
                  isActive
                    ? isWed
                      ? "bg-bonero-green/[0.07]"
                      : "bg-violet-50/80"
                    : "bg-white hover:bg-[#fafbfa]"
                }`}
              >
                <div className="flex items-baseline justify-between gap-1">
                  <span className="text-[9px] font-semibold text-bonero-dark/40 sm:text-[10px]">
                    {day.short}
                  </span>
                  <span
                    className={`font-heading text-base sm:text-xl ${
                      isActive || isWed ? "text-bonero-green" : "text-bonero-dark"
                    }`}
                  >
                    {day.num}
                  </span>
                </div>
                {isWed && (
                  <span className="mt-1 h-0.5 w-4 rounded-full bg-bonero-green" />
                )}
                {day.owner && (
                  <span className="mt-1.5 inline-flex w-fit items-center gap-0.5 rounded-full bg-bonero-green/10 px-1.5 py-0.5 text-[7px] font-bold text-bonero-green sm:text-[8px]">
                    <span className="flex h-3 w-3 items-center justify-center rounded-full bg-bonero-green text-[6px] text-white">
                      F
                    </span>
                    {day.owner}
                  </span>
                )}

                <div className="mt-2 flex flex-1 flex-col gap-1.5">
                  <AnimatePresence mode="popLayout">
                    {day.posts.map((post, pi) => (
                      <motion.div
                        key={post.title}
                        layout
                        initial={{ opacity: 0, y: 6 }}
                        animate={{
                          opacity: isActive ? 1 : 0.7,
                          y: 0,
                          scale: isActive && post.status === "review" ? 1.02 : 1,
                        }}
                        transition={{ delay: pi * 0.05, ease }}
                        className={`rounded-lg border px-1.5 py-1.5 sm:px-2 sm:py-2 ${tone(post.status)} ${
                          isActive && post.status === "review"
                            ? "ring-2 ring-bonero-green/20"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-1 text-bonero-dark/45">
                          <ChannelIcon channel={post.channel} />
                          {post.status === "approved" && (
                            <Check size={10} className="text-bonero-green" />
                          )}
                        </div>
                        <p className="mt-0.5 line-clamp-2 text-[8px] font-bold leading-snug text-bonero-dark sm:text-[10px]">
                          {post.title}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {day.posts.length === 0 && (
                    <div className="mt-1 flex flex-1 items-center justify-center rounded-lg border border-dashed border-bonero-dark/10">
                      <span className="text-[9px] text-bonero-dark/20">—</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="h-1 bg-bonero-dark/[0.05]">
          {!paused && (
            <motion.div
              key={active}
              className="h-full bg-gradient-to-r from-bonero-green to-violet-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: TICK / 1000, ease: "linear" }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
