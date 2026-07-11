"use client";

import { useLocale, type Locale } from "./LocaleProvider";

const options: { value: Locale; label: string }[] = [
  { value: "tr", label: "TR" },
  { value: "en", label: "EN" },
];

type LanguageToggleProps = {
  variant?: "light" | "dark" | "segment";
};

export default function LanguageToggle({
  variant = "light",
}: LanguageToggleProps) {
  const { locale, setLocale } = useLocale();

  if (variant === "segment") {
    return (
      <div
        className="inline-flex items-center rounded-full border border-bonero-dark/10 bg-bonero-dark/[0.04] p-0.5"
        role="group"
        aria-label={locale === "tr" ? "Dil seçimi" : "Language"}
      >
        {options.map((option) => {
          const on = locale === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setLocale(option.value)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide transition-colors ${
                on
                  ? "bg-white text-bonero-dark shadow-sm"
                  : "text-bonero-dark/40 hover:text-bonero-dark/70"
              }`}
              aria-pressed={on}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }

  const idle =
    variant === "dark"
      ? "text-white/45 hover:text-white/80"
      : "text-bonero-dark/40 hover:text-bonero-dark/70";
  const active = variant === "dark" ? "text-white" : "text-bonero-green";
  const divider =
    variant === "dark" ? "text-white/25" : "text-bonero-dark/20";

  return (
    <div
      className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide"
      role="group"
      aria-label={locale === "tr" ? "Dil seçimi" : "Language"}
    >
      {options.map((option, index) => (
        <span key={option.value} className="inline-flex items-center gap-1">
          {index > 0 && (
            <span className={divider} aria-hidden="true">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => setLocale(option.value)}
            className={`transition-colors ${
              locale === option.value ? active : idle
            }`}
            aria-pressed={locale === option.value}
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}
