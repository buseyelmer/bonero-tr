"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant =
  | "primary"
  | "secondary"
  | "inverse"
  | "outline-light"
  | "dark"
  | "ghost";

type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: cn(
    "bg-bonero-green text-white",
    "shadow-[0_4px_16px_rgba(24,131,71,0.32),inset_0_1px_0_rgba(255,255,255,0.12)]",
    "hover:bg-[#1a9a52] hover:shadow-[0_8px_28px_rgba(24,131,71,0.42)] hover:-translate-y-0.5",
    "active:translate-y-0 active:shadow-[0_4px_14px_rgba(24,131,71,0.3)]",
  ),
  secondary: cn(
    "border border-bonero-dark/12 bg-white/90 text-bonero-dark backdrop-blur-sm",
    "shadow-sm shadow-bonero-dark/5",
    "hover:border-bonero-dark/22 hover:bg-white hover:shadow-md",
  ),
  inverse: cn(
    "bg-white text-bonero-green",
    "shadow-[0_4px_20px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]",
    "hover:bg-white/95 hover:shadow-[0_8px_28px_rgba(0,0,0,0.16)] hover:-translate-y-0.5",
    "active:translate-y-0",
  ),
  "outline-light": cn(
    "border border-white/35 bg-white/10 text-white backdrop-blur-sm",
    "hover:border-white/55 hover:bg-white/15",
  ),
  dark: cn(
    "bg-bonero-dark text-white",
    "shadow-[0_4px_16px_rgba(30,41,59,0.25)]",
    "hover:bg-bonero-dark/90 hover:shadow-[0_8px_24px_rgba(30,41,59,0.3)] hover:-translate-y-0.5",
  ),
  ghost: cn(
    "text-bonero-dark/60 underline-offset-4",
    "hover:text-bonero-dark hover:underline",
  ),
};

const sizes: Record<Size, string> = {
  sm: "gap-1.5 rounded-lg px-4 py-2 text-xs sm:text-sm",
  md: "gap-2 rounded-xl px-5 py-3 text-sm",
  lg: "gap-2.5 rounded-xl px-7 py-3.5 text-sm sm:text-[0.95rem]",
};

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  external?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
};

export default function CtaButton({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  external,
  fullWidth,
  onClick,
}: CtaButtonProps) {
  const isGhost = variant === "ghost";

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden font-semibold transition-all duration-300",
        !isGhost && sizes[size],
        variants[variant],
        fullWidth && "w-full",
        className,
      )}
    >
      {!isGhost && (
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/18 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          aria-hidden
        />
      )}
      <span className="relative z-[1] inline-flex items-center gap-[inherit]">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            {icon}
          </span>
        )}
      </span>
    </Link>
  );
}
