import { z } from "zod";
import type { Locale } from "@/components/LocaleProvider";

const messages = {
  tr: {
    fullNameMin: "Ad soyad en az 2 karakter olmalı",
    fullNameMax: "Ad soyad çok uzun",
    companyNameMin: "Şirket adı en az 2 karakter olmalı",
    companyNameMax: "Şirket adı çok uzun",
    email: "Geçerli bir e-posta adresi girin",
    messageMin: "Mesaj en az 10 karakter olmalı",
    messageMax: "Mesaj çok uzun",
  },
  en: {
    fullNameMin: "Full name must be at least 2 characters",
    fullNameMax: "Full name is too long",
    companyNameMin: "Company name must be at least 2 characters",
    companyNameMax: "Company name is too long",
    email: "Enter a valid email address",
    messageMin: "Message must be at least 10 characters",
    messageMax: "Message is too long",
  },
} as const;

export function getStartFreeTrialSchema(locale: Locale) {
  const m = messages[locale];
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(2, m.fullNameMin)
      .max(80, m.fullNameMax),
    companyName: z
      .string()
      .trim()
      .min(2, m.companyNameMin)
      .max(100, m.companyNameMax),
    email: z.string().trim().email(m.email),
    message: z
      .string()
      .trim()
      .min(10, m.messageMin)
      .max(2000, m.messageMax),
  });
}

export const startFreeTrialSchema = getStartFreeTrialSchema("tr");

export type StartFreeTrialValues = z.infer<
  ReturnType<typeof getStartFreeTrialSchema>
>;
