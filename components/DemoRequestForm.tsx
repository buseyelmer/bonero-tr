"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  demoRequestSchema,
  type DemoRequestValues,
} from "@/lib/demo-request-schema";
import { useToast } from "@/components/ToastProvider";

type Props = {
  /** editorial = underline fields for contact split layout */
  variant?: "card" | "editorial";
};

const cardField =
  "w-full rounded-xl border bg-white px-3.5 py-3 text-base text-bonero-dark outline-none transition-colors placeholder:text-bonero-dark/35 focus:border-bonero-green focus:ring-2 focus:ring-bonero-green/15 sm:text-sm";

const editorialField =
  "w-full border-0 border-b bg-transparent px-0 py-3 text-base text-bonero-dark outline-none transition-colors placeholder:text-bonero-dark/30 focus:border-bonero-green focus:ring-0 sm:text-sm";

export default function DemoRequestForm({ variant = "card" }: Props) {
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

  if (variant === "editorial") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <label
              htmlFor="fullName"
              className="block text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/40 uppercase"
            >
              Ad Soyad
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              aria-invalid={!!errors.fullName}
              className={`${editorialField} ${
                errors.fullName ? "border-red-400" : "border-bonero-dark/20"
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
              className="block text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/40 uppercase"
            >
              Ajans Adı
            </label>
            <input
              id="agencyName"
              type="text"
              autoComplete="organization"
              aria-invalid={!!errors.agencyName}
              className={`${editorialField} ${
                errors.agencyName ? "border-red-400" : "border-bonero-dark/20"
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
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/40 uppercase"
          >
            E-posta
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={`${editorialField} ${
              errors.email ? "border-red-400" : "border-bonero-dark/20"
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
            className="block text-[10px] font-semibold tracking-[0.16em] text-bonero-dark/40 uppercase"
          >
            Mesaj
          </label>
          <textarea
            id="message"
            rows={3}
            aria-invalid={!!errors.message}
            className={`${editorialField} resize-none ${
              errors.message ? "border-red-400" : "border-bonero-dark/20"
            }`}
            placeholder="İhtiyaçlarınızı kısaca yazın…"
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
              Gönderiliyor…
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative overflow-hidden rounded-[1.75rem] border border-bonero-dark/8 bg-white shadow-[0_20px_50px_rgba(30,41,59,0.06)]"
      noValidate
    >
      <div className="border-b border-bonero-dark/6 px-6 py-5 sm:px-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-bonero-green uppercase">
          Demo talep formu
        </p>
        <p className="mt-1.5 text-sm text-bonero-dark/55">
          Ajansınız için ücretsiz demo planlayalım.
        </p>
      </div>
      <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
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
            className={`${cardField} ${
              errors.fullName ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder="Adınız ve soyadınız"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-sm text-red-500">{errors.fullName.message}</p>
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
            className={`${cardField} ${
              errors.agencyName ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder="Ajansınızın adı"
            {...register("agencyName")}
          />
          {errors.agencyName && (
            <p className="mt-1.5 text-sm text-red-500">
              {errors.agencyName.message}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
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
            className={`${cardField} ${
              errors.email ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder="ornek@ajans.com"
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
            Mesaj
          </label>
          <textarea
            id="message"
            rows={5}
            className={`${cardField} resize-y ${
              errors.message ? "border-red-400" : "border-bonero-dark/15"
            }`}
            placeholder="Ajansınızın ihtiyaçlarını kısaca yazın…"
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
              Gönderiliyor…
            </>
          ) : (
            <>
              Demo Talep Et
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
