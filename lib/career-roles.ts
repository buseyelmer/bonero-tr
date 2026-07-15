import type { Locale } from "@/components/LocaleProvider";

export const CAREER_ROLE_IDS = [
  "product",
  "design",
  "engineering",
  "customer-success",
  "other",
] as const;

export type CareerRoleId = (typeof CAREER_ROLE_IDS)[number];

export function isCareerRoleId(value: string): value is CareerRoleId {
  return (CAREER_ROLE_IDS as readonly string[]).includes(value);
}

/** Legacy Turkish labels from URLs/events before role IDs. */
const legacyRoleMap: Record<string, CareerRoleId> = {
  Ürün: "product",
  Tasarım: "design",
  Mühendislik: "engineering",
  "Müşteri başarısı": "customer-success",
  Diğer: "other",
};

export function resolveCareerRoleId(value: string | null): CareerRoleId | null {
  if (!value) return null;
  if (isCareerRoleId(value)) return value;
  return legacyRoleMap[value] ?? null;
}

export const careerRoleLabels: Record<Locale, Record<CareerRoleId, string>> = {
  tr: {
    product: "Ürün",
    design: "Tasarım",
    engineering: "Mühendislik",
    "customer-success": "Müşteri başarısı",
    other: "Diğer",
  },
  en: {
    product: "Product",
    design: "Design",
    engineering: "Engineering",
    "customer-success": "Customer success",
    other: "Other",
  },
};
