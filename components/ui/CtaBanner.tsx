"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "green" | "dark" | "whatsapp";

const tones: Record<Tone, { shell: string; grid: string }> = {
  green: {
    shell: cn(
      "border border-white/12",
      "bg-gradient-to-br from-[#1fa85a] via-bonero-green to-[#126b38]",
      "shadow-[0_32px_64px_-28px_rgba(24,131,71,0.55)]",
    ),
    grid: "opacity-[0.08]",
  },
  dark: {
    shell: cn(
      "border border-white/8 bg-bonero-dark",
      "shadow-[0_32px_64px_-28px_rgba(30,41,59,0.45)]",
    ),
    grid: "opacity-[0.06]",
  },
  whatsapp: {
    shell: cn(
      "border border-white/12",
      "bg-gradient-to-br from-[#1fa85a] via-bonero-green to-[#0f6b35]",
      "shadow-[0_32px_64px_-28px_rgba(24,131,71,0.5),0_0_0_1px_rgba(37,211,102,0.15)]",
    ),
    grid: "opacity-[0.08]",
  },
};

type CtaBannerProps = {
  tone?: Tone;
  icon?: ReactNode;
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  extra?: ReactNode;
  actions: ReactNode;
  className?: string;
  align?: "split" | "center";
};

export default function CtaBanner({
  tone = "green",
  icon,
  eyebrow,
  title,
  body,
  extra,
  actions,
  className,
  align = "split",
}: CtaBannerProps) {
  const t = tones[tone];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] px-8 py-10 sm:px-12 sm:py-12",
        t.shell,
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
        style={
          tone === "dark"
            ? {
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(24,131,71,0.35), transparent 55%)",
              }
            : undefined
        }
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-white/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-12 h-52 w-52 rounded-full bg-black/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25D366]/10 blur-3xl"
        aria-hidden
      />
      <div
        className={cn("bg-grid pointer-events-none absolute inset-0", t.grid)}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10"
        aria-hidden
      />

      <div
        className={cn(
          "relative z-[1]",
          align === "split"
            ? "grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-10"
            : "mx-auto max-w-2xl text-center",
        )}
      >
        <div className={align === "center" ? "mx-auto" : undefined}>
          {eyebrow && (
            <p className="text-[11px] font-bold tracking-[0.2em] text-white/55 uppercase">
              {eyebrow}
            </p>
          )}
          {icon && (
            <div
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white backdrop-blur-sm",
                eyebrow ? "mt-3" : undefined,
              )}
            >
              {icon}
            </div>
          )}
          <h2
            className={cn(
              "font-heading text-2xl tracking-wide text-white sm:text-3xl",
              eyebrow || icon ? "mt-4" : undefined,
            )}
          >
            {title}
          </h2>
          {body && (
            <p
              className={cn(
                "mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base",
                align === "center" && "mx-auto",
              )}
            >
              {body}
            </p>
          )}
          {extra && <div className="mt-6">{extra}</div>}
        </div>

        <div
          className={cn(
            "flex flex-col gap-3 sm:flex-row",
            align === "split" ? "lg:justify-end" : "justify-center",
          )}
        >
          {actions}
        </div>
      </div>
    </div>
  );
}
