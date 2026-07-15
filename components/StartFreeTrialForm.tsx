"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  getStartFreeTrialSchema,
  type StartFreeTrialValues,
} from "@/lib/start-free-trial-schema";
import { useToast } from "@/components/ToastProvider";
import { useLocale } from "@/components/LocaleProvider";

type Props = {
  /** editorial = underline fields for contact split layout */
  variant?: "card" | "editorial";
};

const copy = {
  tr: {
    fullName: "Ad Soyad",
    companyName: "Şirket adı",
    email: "E-posta",
    message: "Mesaj",
    fullNamePlaceholder: "Adınız ve soyadınız",
    companyPlaceholder: "Şirket adınız",
    emailPlaceholder: "ornek@sirket.com",
    messagePlaceholder: "İhtiyaçlarınızı kısaca yazın…",
    submitting: "Gönderiliyor…",
    submit: "Mesaj gönder",
    toast: "Talebiniz bize ulaştı, en kısa sürede dönüş yapacağız.",
    cardEyebrow: "İletişim formu",
    cardLead: "Sorunuz veya işbirliği notunuz — 1 iş günü içinde dönüş yaparız.",
  },
  en: {
    fullName: "Full name",
    companyName: "Company name",
    email: "Email",
    message: "Message",
    fullNamePlaceholder: "Your first and last name",
    companyPlaceholder: "Your company name",
    emailPlaceholder: "you@company.com",
    messagePlaceholder: "Briefly describe what you need…",
    submitting: "Sending…",
    submit: "Send message",
    toast: "We received your request and will get back to you shortly.",
    cardEyebrow: "Contact form",
    cardLead: "Your question or partnership note — we reply within 1 business day.",
  },
};

const cardField =
  "w-full rounded-xl border bg-white px-3.5 py-3 text-base text-bonero-dark outline-none transition-colors placeholder:text-bonero-dark/35 focus:border-bonero-green focus:ring-2 focus:ring-bonero-green/15 sm:text-sm";

const editorialField =
  "w-full border-0 border-b bg-transparent px-0 py-3 text-base text-bonero-dark outline-none transition-colors placeholder:text-bonero-dark/30 focus:border-bonero-green focus:ring-0 sm:text-sm";

export default function StartFreeTrialForm({ variant = "card" }: Props) {
  const { locale } = useLocale();
  const t = copy[locale];
  const { toast } = useToast();
  const schema = useMemo(() => getStartFreeTrialSchema(locale), [locale]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StartFreeTrialValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    reset();
    toast(t.toast, "success");
  };

  if (variant === "editorial") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <label
              htmlFor="fullName"
              className="block text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/40 uppercase"
            >
              {t.fullName}
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              aria-invalid={!!errors.fullName}
              className={`${editorialField} ${
                errors.fullName ? "border-red-400" : "border-bonero-dark/20"
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
              htmlFor="companyName"
              className="block text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/40 uppercase"
            >
              {t.companyName}
            </label>
            <input
              id="companyName"
              type="text"
              autoComplete="organization"
              aria-invalid={!!errors.companyName}
              className={`${editorialField} ${
                errors.companyName ? "border-red-400" : "border-bonero-dark/20"
              }`}
              placeholder={t.companyPlaceholder}
              {...register("companyName")}
            />
            {errors.companyName && (
              <p className="mt-1.5 text-sm text-red-500" role="alert">
                {errors.companyName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/40 uppercase"
          >
            {t.email}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={`${editorialField} ${
              errors.email ? "border-red-400" : "border-bonero-dark/20"
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

        <div>
          <label
            htmlFor="message"
            className="block text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/40 uppercase"
          >
            {t.message}
          </label>
          <textarea
            id="message"
            rows={3}
            aria-invalid={!!errors.message}
            className={`${editorialField} resize-none ${
              errors.message ? "border-red-400" : "border-bonero-dark/20"
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 bg-bonero-dark px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-bonero-green disabled:cursor-not-allowed disabled:opacity-70"
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
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative overflow-hidden rounded-[1.75rem] border border-bonero-dark/8 bg-white shadow-[0_20px_50px_rgba(30,41,59,0.06)]"
      noValidate
    >
      <div className="border-b border-bonero-dark/6 px-6 py-5 sm:px-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-bonero-green uppercase">
          {t.cardEyebrow}
        </p>
        <p className="mt-1.5 text-sm text-bonero-dark/55">{t.cardLead}</p>
      </div>
      <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
        <div>
          <label
            htmlFor="fullName"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            {t.fullName}
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            className={`${cardField} ${
              errors.fullName ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder={t.fullNamePlaceholder}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="companyName"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            {t.companyName}
          </label>
          <input
            id="companyName"
            type="text"
            autoComplete="organization"
            className={`${cardField} ${
              errors.companyName ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder={t.companyPlaceholder}
            {...register("companyName")}
          />
          {errors.companyName && (
            <p className="mt-1.5 text-sm text-red-500">
              {errors.companyName.message}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            {t.email}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`${cardField} ${
              errors.email ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder={t.emailPlaceholder}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            {t.message}
          </label>
          <textarea
            id="message"
            rows={5}
            className={`${cardField} resize-y ${
              errors.message ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder={t.messagePlaceholder}
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1.5 text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>
      </div>
      <div className="border-t border-bonero-dark/6 bg-[#f8faf9] px-6 py-5 sm:px-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-bonero-green px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-bonero-green/90 disabled:opacity-70 sm:w-auto"
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
