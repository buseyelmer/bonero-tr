import type { Locale } from "@/components/LocaleProvider";

export type L = { tr: string; en: string };

export function pickL(value: L, locale: Locale): string {
  return value[locale];
}

export function pickLList(values: L[], locale: Locale): string[] {
  return values.map((v) => pickL(v, locale));
}
