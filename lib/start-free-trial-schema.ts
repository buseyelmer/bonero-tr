import { z } from "zod";

export const startFreeTrialSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ad soyad en az 2 karakter olmalı")
    .max(80, "Ad soyad çok uzun"),
  agencyName: z
    .string()
    .trim()
    .min(2, "Ajans adı en az 2 karakter olmalı")
    .max(100, "Ajans adı çok uzun"),
  email: z
    .string()
    .trim()
    .email("Geçerli bir e-posta adresi girin"),
  message: z
    .string()
    .trim()
    .min(10, "Mesaj en az 10 karakter olmalı")
    .max(2000, "Mesaj çok uzun"),
});

export type StartFreeTrialValues = z.infer<typeof startFreeTrialSchema>;
