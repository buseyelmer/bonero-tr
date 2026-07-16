"use client";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

type BrandKey = "whatsapp" | "instagram" | "meta" | "google" | "email" | "tiktok";

const brands = {
  tr: [
    { key: "whatsapp" as const, name: "WhatsApp" },
    { key: "instagram" as const, name: "Instagram" },
    { key: "meta" as const, name: "Meta" },
    { key: "google" as const, name: "Google" },
    { key: "email" as const, name: "E-posta" },
    { key: "tiktok" as const, name: "TikTok" },
  ],
  en: [
    { key: "whatsapp" as const, name: "WhatsApp" },
    { key: "instagram" as const, name: "Instagram" },
    { key: "meta" as const, name: "Meta" },
    { key: "google" as const, name: "Google" },
    { key: "email" as const, name: "Email" },
    { key: "tiktok" as const, name: "TikTok" },
  ],
};

const copy = {
  tr: {
    aria: "Entegre kanallar",
    label: "Bağladığınız kanallar · tek panel",
  },
  en: {
    aria: "Integrated channels",
    label: "Channels you connect · one panel",
  },
};

function BrandIcon({ brand }: { brand: BrandKey }) {
  const baseClass =
    "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white";

  if (brand === "whatsapp") {
    return (
      <span className={baseClass} aria-hidden>
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-[#25D366]">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.57 0 .28 5.27.28 11.77c0 2.07.54 4.08 1.57 5.85L0 24l6.56-1.72a11.77 11.77 0 0 0 5.5 1.4h.01c6.49 0 11.78-5.28 11.78-11.78 0-3.15-1.22-6.12-3.33-8.42ZM12.07 21.6h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.22-3.9 1.03 1.04-3.8-.24-.39a9.77 9.77 0 0 1-1.5-5.08c0-5.41 4.4-9.81 9.81-9.81 2.61 0 5.06 1.02 6.91 2.88a9.72 9.72 0 0 1 2.87 6.93c0 5.4-4.4 9.8-9.8 9.8Zm5.38-7.36c-.3-.15-1.75-.86-2.02-.96-.27-.1-.46-.15-.66.15-.2.3-.76.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.5a8.97 8.97 0 0 1-1.65-2.06c-.18-.3-.02-.45.13-.6.13-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.21-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.53.08-.8.38s-1.04 1.01-1.04 2.46c0 1.44 1.07 2.84 1.21 3.04.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.75-.72 2-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.35Z" />
        </svg>
      </span>
    );
  }

  if (brand === "instagram") {
    return (
      <span
        className="inline-flex h-5 w-5 shrink-0 overflow-hidden rounded-[5px] shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <defs>
            <radialGradient id="bonero-ig-grad" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#bonero-ig-grad)" />
          <path
            fill="white"
            d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 1-2.881 0 1.44 1.44 0 0 1 2.881 0zM12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"
          />
        </svg>
      </span>
    );
  }

  if (brand === "meta") {
    return (
      <span className={baseClass} aria-hidden>
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-[#0866FF]">
          <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" />
        </svg>
      </span>
    );
  }

  if (brand === "google") {
    return (
      <span className={baseClass} aria-hidden>
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <path
            fill="#4285F4"
            d="M21.8 12.23c0-.72-.06-1.25-.2-1.8H12v3.39h5.64c-.11.84-.72 2.1-2.07 2.95l-.02.11 3.01 2.33.21.02c1.96-1.8 3.03-4.46 3.03-7Z"
          />
          <path
            fill="#34A853"
            d="M12 22c2.76 0 5.07-.91 6.76-2.48l-3.22-2.49c-.86.6-2.02 1.02-3.54 1.02-2.7 0-4.99-1.8-5.8-4.27l-.1.01-3.13 2.42-.03.1A10.2 10.2 0 0 0 12 22Z"
          />
          <path
            fill="#FBBC05"
            d="M6.2 13.78A6.12 6.12 0 0 1 5.86 12c0-.61.12-1.2.32-1.78l-.01-.12-3.16-2.46-.1.05A10 10 0 0 0 2 12c0 1.58.38 3.08 1.05 4.4l3.15-2.62Z"
          />
          <path
            fill="#EA4335"
            d="M12 5.95c1.9 0 3.19.82 3.92 1.5l2.86-2.8C17.06 3.07 14.76 2 12 2a10.2 10.2 0 0 0-8.99 5.69L6.18 10.1C6.99 7.75 9.28 5.95 12 5.95Z"
          />
        </svg>
      </span>
    );
  }

  if (brand === "email") {
    return (
      <span className={baseClass} aria-hidden>
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-none stroke-[#0EA5E9]">
          <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" strokeWidth="1.8" />
          <path d="m5.5 8 6.5 5 6.5-5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }

  return (
    <span className={baseClass} aria-hidden>
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
        <path
          fill="#010101"
          d="M14.54 2H10.8v14.97c0 1.78-1.42 3.23-3.18 3.23a3.2 3.2 0 0 1-3.2-3.2 3.2 3.2 0 0 1 3.2-3.2c.33 0 .66.05.97.15v-3.8a7.12 7.12 0 0 0-.97-.07A6.93 6.93 0 0 0 .7 17a6.93 6.93 0 0 0 6.92 6.92A6.93 6.93 0 0 0 14.54 17V9.35c1.46 1.04 3.25 1.68 5.18 1.74V7.37a5.82 5.82 0 0 1-5.18-5.37Z"
        />
      </svg>
    </span>
  );
}

export default function BrandStrip() {
  const { locale } = useLocale();
  const t = copy[locale];
  const list = brands[locale];

  return (
    <section
      className="relative border-y border-bonero-dark/6 bg-white py-10 sm:py-12"
      aria-label={t.aria}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold tracking-[0.18em] text-bonero-dark/40 uppercase">
            {t.label}
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
            {list.map((b) => (
              <li
                key={b.name}
                className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-bonero-dark/70"
              >
                <BrandIcon brand={b.key} />
                {b.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
