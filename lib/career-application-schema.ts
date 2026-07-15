import { z } from "zod";
import type { Locale } from "@/components/LocaleProvider";
import { isCareerRoleId, CAREER_ROLE_IDS } from "@/lib/career-roles";

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ACCEPTED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const messages = {
  tr: {
    fullNameMin: "Ad soyad en az 2 karakter olmalı.",
    fullNameMax: "Ad soyad çok uzun.",
    email: "Geçerli bir e-posta girin.",
    role: "İlgilendiğiniz alanı belirtin.",
    roleMax: "Alan adı çok uzun.",
    messageMin: "Kısaca kendinizden bahsedin (en az 20 karakter).",
    messageMax: "Mesaj çok uzun.",
    linkedin: "Geçerli bir LinkedIn URL’si girin.",
    cvRequired: "CV dosyası gerekli.",
    cvUpload: "CV dosyası yükleyin.",
    cvSize: "CV en fazla 5 MB olabilir.",
    cvType: "Yalnızca PDF, DOC veya DOCX yükleyin.",
  },
  en: {
    fullNameMin: "Full name must be at least 2 characters.",
    fullNameMax: "Full name is too long.",
    email: "Enter a valid email address.",
    role: "Select the area you are interested in.",
    roleMax: "Role name is too long.",
    messageMin: "Tell us briefly about yourself (at least 20 characters).",
    messageMax: "Message is too long.",
    linkedin: "Enter a valid LinkedIn URL.",
    cvRequired: "A CV file is required.",
    cvUpload: "Upload a CV file.",
    cvSize: "CV must be 5 MB or smaller.",
    cvType: "Only PDF, DOC, or DOCX files are allowed.",
  },
} as const;

export function getCareerApplicationSchema(locale: Locale) {
  const m = messages[locale];
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(2, m.fullNameMin)
      .max(80, m.fullNameMax),
    email: z.string().trim().email(m.email),
    role: z
      .union([z.enum(CAREER_ROLE_IDS), z.literal("")])
      .refine((val): val is (typeof CAREER_ROLE_IDS)[number] => isCareerRoleId(val), {
        message: m.role,
      }),
    message: z
      .string()
      .trim()
      .min(20, m.messageMin)
      .max(2000, m.messageMax),
    linkedin: z
      .string()
      .trim()
      .refine(
        (val) => val === "" || /^https?:\/\/.+/i.test(val),
        m.linkedin,
      ),
    cv: z
      .custom<FileList>(
        (val) => typeof FileList !== "undefined" && val instanceof FileList,
        { message: m.cvRequired },
      )
      .refine((files) => files.length === 1, m.cvUpload)
      .refine(
        (files) => files[0] && files[0].size <= MAX_CV_BYTES,
        m.cvSize,
      )
      .refine(
        (files) =>
          files[0] &&
          (ACCEPTED_CV_TYPES.includes(files[0].type) ||
            /\.(pdf|doc|docx)$/i.test(files[0].name)),
        m.cvType,
      ),
  });
}

export const careerApplicationSchema = getCareerApplicationSchema("tr");

export type CareerApplicationValues = z.infer<
  ReturnType<typeof getCareerApplicationSchema>
>;
