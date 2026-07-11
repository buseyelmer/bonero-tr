"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  demoRequestSchema,
  type DemoRequestValues,
} from "@/lib/demo-request-schema";
import { useToast } from "@/components/ToastProvider";

const fieldClass =
  "w-full rounded-lg border bg-white px-3.5 py-3 text-base text-bonero-dark outline-none transition-colors placeholder:text-bonero-dark/35 focus:border-bonero-green focus:ring-2 focus:ring-bonero-green/15 sm:text-sm";

export default function DemoRequestForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DemoRequestValues>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      fullName: "",
      agencyName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    reset();
    toast(
      "Talebiniz bize ulaştı, en kısa sürede dönüş yapacağız.",
      "success",
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-panel rounded-2xl p-4 sm:p-6 lg:p-8"
      noValidate
    >
      <h2 className="text-xl font-semibold tracking-tight text-bonero-dark sm:text-2xl">
        Demo Talep Formu
      </h2>
      <p className="mt-2 text-base leading-relaxed text-bonero-dark/60 sm:text-sm">
        Ajansınız için ücretsiz demo planlayalım. Formu doldurun, 1 iş günü
        içinde dönüş yapalım.
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="fullName"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            Ad Soyad
          </label>
          <input
            id="fullName"
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

        <div>
          <label
            htmlFor="agencyName"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            Ajans Adı
          </label>
          <input
            id="agencyName"
            type="text"
            autoComplete="organization"
            aria-invalid={!!errors.agencyName}
            className={`${fieldClass} ${
              errors.agencyName ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder="Ajansınızın adı"
            {...register("agencyName")}
          />
          {errors.agencyName && (
            <p className="mt-1.5 text-sm text-red-500" role="alert">
              {errors.agencyName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            E-posta
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={`${fieldClass} ${
              errors.email ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder="ornek@ajans.com"
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
            className="mb-1.5 block text-sm font-medium text-bonero-dark"
          >
            Mesaj
          </label>
          <textarea
            id="message"
            rows={5}
            aria-invalid={!!errors.message}
            className={`${fieldClass} resize-y ${
              errors.message ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder="Ajansınızın ihtiyaçlarını kısaca yazın..."
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
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-bonero-green px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-bonero-green/90 disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Gönderiliyor...
          </>
        ) : (
          <>
            Demo Talep Et
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}
