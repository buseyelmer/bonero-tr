"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, FileUp, Loader2 } from "lucide-react";
import {
  careerApplicationSchema,
  type CareerApplicationValues,
} from "@/lib/career-application-schema";
import { useToast } from "@/components/ToastProvider";

const fieldClass =
  "w-full rounded-lg border bg-white px-3.5 py-3 text-base text-bonero-dark outline-none transition-colors placeholder:text-bonero-dark/35 focus:border-bonero-green focus:ring-2 focus:ring-bonero-green/15 sm:text-sm";

export default function CareerApplicationForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CareerApplicationValues>({
    resolver: zodResolver(careerApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
      message: "",
      linkedin: "",
    },
  });

  const cvFiles = watch("cv");
  const cvName = cvFiles?.[0]?.name;

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    reset();
    toast("Başvurunuz alındı — ekibimiz en kısa sürede dönüş yapacak.", "success");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-bonero-dark/8 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor="career-fullName"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            Ad Soyad
          </label>
          <input
            id="career-fullName"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            className={`${fieldClass} ${
              errors.fullName ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder="Adınız ve soyadınız"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="career-email"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            E-posta
          </label>
          <input
            id="career-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={`${fieldClass} ${
              errors.email ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder="ornek@mail.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="career-role"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            İlgilendiğiniz alan
          </label>
          <input
            id="career-role"
            type="text"
            aria-invalid={!!errors.role}
            className={`${fieldClass} ${
              errors.role ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder="Örn. Ürün, Tasarım, Mühendislik…"
            {...register("role")}
          />
          {errors.role && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.role.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="career-linkedin"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            LinkedIn{" "}
            <span className="font-normal text-bonero-dark/40">(opsiyonel)</span>
          </label>
          <input
            id="career-linkedin"
            type="url"
            aria-invalid={!!errors.linkedin}
            className={`${fieldClass} ${
              errors.linkedin ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder="https://linkedin.com/in/…"
            {...register("linkedin")}
          />
          {errors.linkedin && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.linkedin.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="career-cv"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            CV
          </label>
          <label
            htmlFor="career-cv"
            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition-colors hover:border-bonero-green/40 hover:bg-bonero-green/[0.03] ${
              errors.cv
                ? "border-red-400 bg-red-50/40"
                : "border-bonero-dark/15 bg-bonero-dark/[0.02]"
            }`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-bonero-dark/50 shadow-sm">
              <FileUp size={18} strokeWidth={1.75} />
            </span>
            <span className="text-sm font-medium text-bonero-dark">
              {cvName ? cvName : "CV’nizi buraya bırakın veya seçin"}
            </span>
            <span className="text-xs text-bonero-dark/45">
              PDF, DOC veya DOCX · en fazla 5 MB
            </span>
            <input
              id="career-cv"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              aria-invalid={!!errors.cv}
              {...register("cv")}
            />
          </label>
          {errors.cv && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.cv.message as string}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="career-message"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            Neden Bonero?
          </label>
          <textarea
            id="career-message"
            rows={5}
            aria-invalid={!!errors.message}
            className={`${fieldClass} resize-y ${
              errors.message ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder="Kısaca deneyiminizden ve birlikte ne inşa etmek istediğinizden bahsedin…"
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-bonero-green px-6 py-3.5 text-base font-semibold text-white transition-all hover:scale-[1.02] hover:bg-bonero-green/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:text-sm"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Gönderiliyor…
          </>
        ) : (
          <>
            Başvuruyu gönder
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}
