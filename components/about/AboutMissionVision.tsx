"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const missionSignals = [
  { label: "Operasyonel yük", value: "↓", hint: "Tekrarlayan işler azalır" },
  { label: "Strateji süresi", value: "↑", hint: "Ekip yaratıcılığa döner" },
  { label: "Müşteri kalitesi", value: "↑", hint: "Teslimat netleşir" },
];

const visionPillars = [
  { title: "Omnichannel standart", body: "Her kanal, tek operasyon dili." },
  { title: "Her ölçekte işletme", body: "Boutique’tan holding’e aynı kalite." },
  { title: "Kurumsal kalite", body: "Süreç, şeffaflık, ölçülebilir sonuç." },
];

export default function AboutMissionVision() {
  return (
    <section className="relative overflow-hidden border-t border-bonero-dark/6 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(145deg, #0c1612 0%, #152820 38%, #1a3328 72%, #0f1c17 100%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(24,131,71,0.4), transparent 68%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-20%] left-[-8%] h-[380px] w-[380px] rounded-full"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(24,131,71,0.25), transparent 70%)",
        }}
        animate={{ scale: [1.05, 1, 1.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-soft-light" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Reveal className="lg:col-span-8">
            <p className="text-sm font-medium tracking-wide text-white/40 uppercase">
              Kurumsal yön
            </p>
            <h2 className="font-heading mt-4 max-w-2xl text-3xl !font-extrabold tracking-wide text-white sm:text-4xl lg:text-[2.75rem]">
              Ne için varız —{" "}
              <span className="text-bonero-green">nereye gidiyoruz</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/45">
              Müşteriye yansıyan kalite: yaratıcılığa alan, operasyonda
              kurumsal standart.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm">
              <div className="flex -space-x-2">
                {["M", "V"].map((letter) => (
                  <span
                    key={letter}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-bonero-green/30 bg-bonero-green/15 font-heading text-sm !font-extrabold text-bonero-green"
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.16em] text-white/35 uppercase">
                  İki kutup · tek yön
                </p>
                <p className="mt-0.5 text-sm font-medium text-white/70">
                  Bugünden yarına köprü
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Axis connector — M → V */}
        <div
          className="relative mx-[8%] mt-12 mb-2 hidden h-4 lg:block"
          aria-hidden="true"
        >
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <motion.div
            className="absolute top-[calc(50%-1px)] left-0 h-0.5 w-[22%] rounded-full bg-bonero-green"
            initial={{ left: "0%" }}
            animate={{ left: ["0%", "78%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="absolute top-1/2 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bonero-green" />
          <span className="absolute top-1/2 right-0 h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <motion.article
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-10"
              whileHover={{ y: -4, borderColor: "rgba(24,131,71,0.4)" }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 90% 0%, rgba(24,131,71,0.18), transparent 50%)",
                }}
                aria-hidden="true"
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-baseline gap-4">
                  <motion.span
                    className="font-heading text-7xl !font-extrabold leading-none text-bonero-green/30 sm:text-8xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    M
                  </motion.span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-bonero-green uppercase">
                      Misyon · Bugün
                    </p>
                    <h3 className="font-heading mt-1 text-2xl !font-extrabold text-white sm:text-3xl">
                      Yaratıcılığa alan açmak
                    </h3>
                  </div>
                </div>
              </div>

              <p className="relative mt-6 text-lg leading-relaxed text-white/70 sm:text-xl">
                Ekipleri operasyonel yükten arındırarak, yaratıcılığa ve
                stratejiye odaklanabilecekleri bir çalışma ortamı sunmak.
              </p>

              {/* Middle filler — closes the empty gap */}
              <div className="relative mt-7 rounded-2xl border border-white/10 bg-black/25 p-5">
                <p className="text-[10px] font-semibold tracking-[0.16em] text-bonero-green uppercase">
                  Nasıl çalışır
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0">
                  {[
                    { t: "Operasyon", s: "yükü çıkar" },
                    { t: "Alan", s: "açılır" },
                    { t: "Yaratıcılık", s: "öne geçer" },
                  ].map((step, i) => (
                    <div key={step.t} className="flex flex-1 items-center gap-3">
                      <div className="min-w-0">
                        <p className="font-heading text-sm !font-extrabold text-white">
                          {step.t}
                        </p>
                        <p className="text-xs text-white/40">{step.s}</p>
                      </div>
                      {i < 2 && (
                        <span
                          className="mx-2 hidden h-px flex-1 bg-gradient-to-r from-bonero-green/60 to-transparent sm:block"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-5 border-t border-white/8 pt-4 text-sm leading-relaxed text-white/55 italic">
                  “Ekip stratejiye döner — müşteri teslimatı netleşir.”
                </p>
              </div>

              <div className="relative mt-6 grid grid-cols-3 gap-3">
                {missionSignals.map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="rounded-2xl border border-white/8 bg-black/25 px-3 py-4 text-center transition-colors group-hover:border-bonero-green/25"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <p className="font-heading text-2xl !font-extrabold text-bonero-green">
                      {s.value}
                    </p>
                    <p className="mt-1 text-[10px] leading-snug text-white/45">
                      {s.label}
                    </p>
                    <p className="mt-2 hidden text-[9px] text-white/25 sm:block">
                      {s.hint}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.article>
          </Reveal>

          <Reveal delay={0.1}>
            <motion.article
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-bonero-green/25 bg-gradient-to-br from-bonero-green/18 via-white/[0.03] to-transparent p-8 sm:p-10"
              whileHover={{ y: -4, borderColor: "rgba(24,131,71,0.6)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-heading text-7xl !font-extrabold leading-none text-bonero-green/45 sm:text-8xl">
                    V
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-bonero-green uppercase">
                      Vizyon · Yarın
                    </p>
                    <h3 className="font-heading mt-1 text-2xl !font-extrabold text-white sm:text-3xl">
                      Operasyon standardı
                    </h3>
                  </div>
                </div>
              </div>

              <p className="relative mt-8 text-lg leading-relaxed text-white/70 sm:text-xl">
                Dijital dünyada omnichannel iletişimin standardını belirlemek;
                her büyüklükteki işletmenin, kurumsal bir operasyon kalitesine
                ulaşmasını sağlamak.
              </p>

              <div className="relative mt-auto space-y-3 pt-10">
                {visionPillars.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-3 rounded-xl border border-white/8 bg-black/20 px-4 py-3.5"
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 * i }}
                    whileHover={{ x: 4, borderColor: "rgba(24,131,71,0.35)" }}
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bonero-green/25 text-[10px] font-bold text-bonero-green">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-0.5 text-xs text-white/40">{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.article>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-7">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-bonero-green">
            <motion.div
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase">
                  Manifesto
                </p>
                <p className="font-heading mt-1 text-xl !font-extrabold text-white sm:text-2xl">
                  Her işletme — kurumsal operasyon kalitesinde.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Yaratıcılık", "Strateji", "Şeffaflık"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
