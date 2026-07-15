"use client";

import { useEffect, useMemo } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Check,
  FileUp,
  Loader2,
  X,
} from "lucide-react";
import {
  getCareerApplicationSchema,
  type CareerApplicationValues,
} from "@/lib/career-application-schema";
import {
  CAREER_ROLE_IDS,
  careerRoleLabels,
  resolveCareerRoleId,
} from "@/lib/career-roles";
import { useToast } from "@/components/ToastProvider";
import { useLocale } from "@/components/LocaleProvider";

const copy = {
  tr: {
    eyebrow: "Açık başvuru",
    lead: "Ad, alan, CV ve kısa not — birkaç dakikada tamamlanır.",
    fullName: "Ad Soyad",
    email: "E-posta",
    role: "İlgilendiğiniz alan",
    linkedin: "LinkedIn",
    optional: "(opsiyonel)",
    cv: "CV",
    cvReady: "hazır",
    removeCv: "CV’yi kaldır",
    cvDrop: "CV’nizi buraya bırakın veya seçin",
    cvHint: "PDF, DOC veya DOCX · en fazla 5 MB",
    whyBonero: "Neden Bonero?",
    messagePlaceholder:
      "Kısaca deneyiminizden ve birlikte ne inşa etmek istediğinizden bahsedin…",
    privacyBefore: "Göndererek",
    privacyLink: "KVKK",
    privacyAfter: "bilgilendirmesini okuduğunuzu kabul edersiniz.",
    submitting: "Gönderiliyor…",
    submit: "Başvuruyu gönder",
    toast: "Başvurunuz alındı — ekibimiz en kısa sürede dönüş yapacak.",
    fullNamePlaceholder: "Adınız ve soyadınız",
    emailPlaceholder: "ornek@mail.com",
    linkedinPlaceholder: "https://linkedin.com/in/…",
  },
  en: {
    eyebrow: "Open application",
    lead: "Name, area, CV, and a short note — done in a few minutes.",
    fullName: "Full name",
    email: "Email",
    role: "Area of interest",
    linkedin: "LinkedIn",
    optional: "(optional)",
    cv: "CV",
    cvReady: "ready",
    removeCv: "Remove CV",
    cvDrop: "Drop your CV here or browse",
    cvHint: "PDF, DOC, or DOCX · up to 5 MB",
    whyBonero: "Why Bonero?",
    messagePlaceholder:
      "Briefly share your experience and what you would like to build together…",
    privacyBefore: "By submitting, you confirm that you have read the",
    privacyLink: "Privacy Notice",
    privacyAfter: ".",
    submitting: "Sending…",
    submit: "Submit application",
    toast: "Application received — our team will get back to you shortly.",
    fullNamePlaceholder: "Your first and last name",
    emailPlaceholder: "you@email.com",
    linkedinPlaceholder: "https://linkedin.com/in/…",
  },
};

const fieldClass =
  "w-full rounded-xl border bg-white px-3.5 py-3 text-base text-bonero-dark outline-none transition-colors placeholder:text-bonero-dark/35 focus:border-bonero-green focus:ring-2 focus:ring-bonero-green/15 sm:text-sm";

type FormValues = {
  fullName: string;
  email: string;
  role: CareerApplicationValues["role"] | "";
  message: string;
  linkedin: string;
  cv: FileList;
};

export default function CareerApplicationForm() {
  const { locale } = useLocale();
  const t = copy[locale];
  const labels = careerRoleLabels[locale];
  const { toast } = useToast();
  const schema = useMemo(() => getCareerApplicationSchema(locale), [locale]);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
      message: "",
      linkedin: "",
    },
  });

  const cvFiles = watch("cv");
  const cvFile = cvFiles?.[0];
  const selectedRole = watch("role");

  useEffect(() => {
    const applyRole = (value: string | null) => {
      const roleId = resolveCareerRoleId(value);
      if (roleId) {
        setValue("role", roleId, { shouldValidate: true, shouldDirty: true });
      }
    };

    const fromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      applyRole(params.get("alan"));
    };

    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent<{ alan: string | null }>).detail;
      applyRole(detail?.alan ?? null);
    };

    fromUrl();
    window.addEventListener("career-apply", onCustom);
    window.addEventListener("popstate", fromUrl);
    return () => {
      window.removeEventListener("career-apply", onCustom);
      window.removeEventListener("popstate", fromUrl);
    };
  }, [setValue]);

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    reset();
    toast(t.toast, "success");
  };

  const clearCv = () => {
    const input = document.getElementById("career-cv") as HTMLInputElement | null;
    if (input) input.value = "";
    setValue("cv", new DataTransfer().files, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative overflow-hidden rounded-[1.75rem] border border-bonero-dark/8 bg-white shadow-[0_20px_50px_rgba(30,41,59,0.06)]"
      noValidate
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-bonero-green/40 via-bonero-green to-bonero-green/40"
        aria-hidden="true"
      />

      <div className="border-b border-bonero-dark/6 px-6 py-5 sm:px-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-bonero-green uppercase">
          {t.eyebrow}
        </p>
        <p className="mt-1.5 text-sm text-bonero-dark/55">{t.lead}</p>
      </div>

      <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
        <div>
          <label
            htmlFor="career-fullName"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            {t.fullName}
          </label>
          <input
            id="career-fullName"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            className={`${fieldClass} ${
              errors.fullName ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder={t.fullNamePlaceholder}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="career-email"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            {t.email}
          </label>
          <input
            id="career-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={`${fieldClass} ${
              errors.email ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder={t.emailPlaceholder}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <p className="mb-2.5 text-sm font-medium text-bonero-dark">
            {t.role}
          </p>
          <div className="flex flex-wrap gap-2">
            {CAREER_ROLE_IDS.map((roleId) => {
              const selected = selectedRole === roleId;
              return (
                <button
                  key={roleId}
                  type="button"
                  onClick={() =>
                    setValue("role", roleId, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? "border-bonero-green bg-bonero-green text-white"
                      : "border-bonero-dark/12 bg-white text-bonero-dark/65 hover:border-bonero-green/35 hover:text-bonero-dark"
                  }`}
                >
                  {labels[roleId]}
                </button>
              );
            })}
          </div>
          <input type="hidden" {...register("role")} />
          {errors.role && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.role.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="career-linkedin"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            {t.linkedin}{" "}
            <span className="font-normal text-bonero-dark/40">{t.optional}</span>
          </label>
          <input
            id="career-linkedin"
            type="url"
            aria-invalid={!!errors.linkedin}
            className={`${fieldClass} ${
              errors.linkedin ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder={t.linkedinPlaceholder}
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
            {t.cv}
          </label>
          {cvFile ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-bonero-green/25 bg-bonero-green/[0.04] px-4 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bonero-green/15 text-bonero-green">
                  <Check size={18} strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-bonero-dark">
                    {cvFile.name}
                  </p>
                  <p className="text-xs text-bonero-dark/45">
                    {(cvFile.size / 1024).toFixed(0)} KB · {t.cvReady}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={clearCv}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-bonero-dark/40 transition-colors hover:bg-bonero-dark/5 hover:text-bonero-dark"
                aria-label={t.removeCv}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label
              htmlFor="career-cv"
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-9 text-center transition-colors hover:border-bonero-green/40 hover:bg-bonero-green/[0.03] ${
                errors.cv
                  ? "border-red-400 bg-red-50/40"
                  : "border-bonero-dark/15 bg-bonero-dark/[0.02]"
              }`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-bonero-dark/50 shadow-sm">
                <FileUp size={18} strokeWidth={1.75} />
              </span>
              <span className="text-sm font-medium text-bonero-dark">
                {t.cvDrop}
              </span>
              <span className="text-xs text-bonero-dark/45">{t.cvHint}</span>
            </label>
          )}
          <input
            id="career-cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            aria-invalid={!!errors.cv}
            {...register("cv")}
          />
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
            {t.whyBonero}
          </label>
          <textarea
            id="career-message"
            rows={5}
            aria-invalid={!!errors.message}
            className={`${fieldClass} resize-y ${
              errors.message ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder={t.messagePlaceholder}
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-bonero-dark/6 bg-[#f8faf9] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-xs leading-relaxed text-bonero-dark/45">
          {t.privacyBefore}{" "}
          <a href="/kvkk" className="underline hover:text-bonero-dark">
            {t.privacyLink}
          </a>{" "}
          {t.privacyAfter}
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-bonero-green px-7 py-3.5 text-sm font-semibold text-white shadow-sm shadow-bonero-green/20 transition-all hover:scale-[1.02] hover:bg-bonero-green/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {t.submitting}
            </>
          ) : (
            <>
              {t.submit}
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
