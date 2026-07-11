import { z } from "zod";

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ACCEPTED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const careerApplicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ad soyad en az 2 karakter olmalı.")
    .max(80, "Ad soyad çok uzun."),
  email: z.string().trim().email("Geçerli bir e-posta girin."),
  role: z
    .string()
    .trim()
    .min(2, "İlgilendiğiniz alanı belirtin.")
    .max(80, "Alan adı çok uzun."),
  message: z
    .string()
    .trim()
    .min(20, "Kısaca kendinizden bahsedin (en az 20 karakter).")
    .max(2000, "Mesaj çok uzun."),
  linkedin: z
    .string()
    .trim()
    .refine(
      (val) => val === "" || /^https?:\/\/.+/i.test(val),
      "Geçerli bir LinkedIn URL’si girin.",
    ),
  cv: z
    .custom<FileList>((val) => typeof FileList !== "undefined" && val instanceof FileList, {
      message: "CV dosyası gerekli.",
    })
    .refine((files) => files.length === 1, "CV dosyası yükleyin.")
    .refine(
      (files) => files[0] && files[0].size <= MAX_CV_BYTES,
      "CV en fazla 5 MB olabilir.",
    )
    .refine(
      (files) =>
        files[0] &&
        (ACCEPTED_CV_TYPES.includes(files[0].type) ||
          /\.(pdf|doc|docx)$/i.test(files[0].name)),
      "Yalnızca PDF, DOC veya DOCX yükleyin.",
    ),
});

export type CareerApplicationValues = z.infer<typeof careerApplicationSchema>;
