"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Clock,
  MessageSquare,
  Shield,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FeatureBackLink,
  FeatureBottomStrip,
  FeatureCtaButton,
} from "../FeaturePageChrome";
import { useLocale } from "@/components/LocaleProvider";
import type { FeaturePageContent } from "@/lib/features";

const ease = [0.22, 1, 0.36, 1] as const;

const people = [
  { initials: "AK", name: "Ayşe K.", roleTr: "Hesap", roleEn: "Account", color: "#188347" },
  { initials: "MY", name: "Mert Y.", roleTr: "Editör", roleEn: "Editor", color: "#0ea5e9" },
  { initials: "BC", name: "Brand Co.", roleTr: "Müşteri", roleEn: "Client", color: "#f59e0b" },
];

const stepsTr = [
  { role: "Hesap", task: "Brief yüklendi", detail: null as string | null },
  {
    role: "Editör",
    task: "Kreatif hazır",
    detail: "Müşteri: “2. kareyi değiştirelim”",
  },
  { role: "Müşteri", task: "Onay bekleniyor", detail: "48s — hatırlat" },
  { role: "Yayın", task: "Canlıya alınacak", detail: null },
];

const stepsEn = [
  { role: "Account", task: "Brief uploaded", detail: null as string | null },
  {
    role: "Editor",
    task: "Creative ready",
    detail: "Client: “Let’s change frame 2”",
  },
  { role: "Client", task: "Awaiting approval", detail: "48h — nudge" },
  { role: "Publish", task: "Ready to go live", detail: null },
];

function CollabHeroBoard({ isEn }: { isEn: boolean }) {
  const steps = isEn ? stepsEn : stepsTr;
  const [active, setActive] = useState(1);

  useEffect(() => {
    const t = window.setInterval(
      () => setActive((a) => (a >= steps.length - 1 ? 0 : a + 1)),
      2800,
    );
    return () => clearInterval(t);
  }, [steps.length]);

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute -inset-5 rounded-[2rem] opacity-75"
        style={{
          background:
            "radial-gradient(ellipse at 55% 30%, rgba(24,131,71,0.28), transparent 60%), radial-gradient(ellipse at 90% 80%, rgba(14,165,233,0.12), transparent 45%)",
        }}
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0a1218] shadow-[0_36px_72px_-36px_rgba(0,0,0,0.95)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bonero-green opacity-40" />
              <span className="relative h-2 w-2 rounded-full bg-bonero-green" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white/90">
                {isEn ? "Summer campaign · Q3" : "Yaz kampanyası · Q3"}
              </p>
              <p className="text-[11px] text-white/35">
                {isEn ? "Approval rail · live" : "Onay hattı · canlı"}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 -space-x-2">
            {people.map((p, i) => (
              <motion.span
                key={p.initials}
                className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0a1218] text-[9px] font-bold text-white"
                style={{ background: p.color, zIndex: 3 - i }}
                animate={{ y: i === Math.min(active, 2) ? -2 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {p.initials}
                {i === Math.min(active, 2) && (
                  <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a1218] bg-emerald-400" />
                )}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Role chips */}
        <div className="flex gap-1.5 overflow-x-auto border-b border-white/8 px-4 py-2.5 sm:px-5">
          {["Brief", isEn ? "Edit" : "Editöryal", isEn ? "Approve" : "Onay", isEn ? "Live" : "Yayın"].map(
            (label, i) => {
              const done = i < active;
              const current = i === active;
              return (
                <span
                  key={label}
                  className={`inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-semibold ${
                    current
                      ? "bg-bonero-green text-white"
                      : done
                        ? "bg-bonero-green/20 text-bonero-green"
                        : "bg-white/[0.04] text-white/30"
                  }`}
                >
                  {done && <Check size={10} strokeWidth={3} />}
                  {label}
                </span>
              );
            },
          )}
        </div>

        <div className="border-b border-white/8 px-4 py-2 sm:px-5">
          <div className="h-1 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-bonero-green to-[#34d399]"
              animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.45, ease }}
            />
          </div>
        </div>

        <ol className="space-y-2 px-3 py-3.5 sm:px-4">
          {steps.map((s, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <motion.li
                key={s.role}
                className={`flex items-start gap-3 rounded-xl border px-3 py-2.5 ${
                  current
                    ? "border-bonero-green/40 bg-bonero-green/10"
                    : "border-white/6 bg-white/[0.02]"
                }`}
                animate={{ opacity: i <= active ? 1 : 0.38 }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    done
                      ? "bg-bonero-green text-white"
                      : current
                        ? "border border-bonero-green bg-bonero-green/20 text-bonero-green shadow-[0_0_0_4px_rgba(24,131,71,0.12)]"
                        : "border border-white/12 text-white/25"
                  }`}
                >
                  {done ? (
                    <Check size={13} strokeWidth={2.5} />
                  ) : current ? (
                    i === 2 ? (
                      <Clock size={12} />
                    ) : (
                      <MessageSquare size={12} />
                    )
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-semibold text-white">
                      {s.role}
                      <span className="font-normal text-white/40"> · {s.task}</span>
                    </p>
                    {current && (
                      <span className="shrink-0 rounded bg-bonero-green/25 px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-bonero-green uppercase">
                        {isEn ? "Now" : "Şimdi"}
                      </span>
                    )}
                    {done && (
                      <span className="shrink-0 text-[9px] font-semibold text-white/30 uppercase">
                        {isEn ? "Done" : "Tamam"}
                      </span>
                    )}
                  </div>
                  <AnimatePresence>
                    {current && s.detail && (
                      <motion.p
                        className="mt-1.5 text-[11px] leading-snug text-white/45"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {s.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
            );
          })}
        </ol>

        <div className="flex items-center justify-between border-t border-white/8 px-4 py-2.5 sm:px-5">
          <p className="text-[11px] text-white/35">
            {isEn ? "Waiting on this step" : "Bu adımda bekleniyor"}
          </p>
          <span className="inline-flex items-center gap-1 rounded-lg bg-bonero-green px-2.5 py-1 text-[10px] font-bold text-white">
            <Check size={11} strokeWidth={2.5} />
            {isEn ? "Nudge" : "Hatırlat"}
          </span>
        </div>
      </div>
    </div>
  );
}

function OwnershipStage({
  points,
  isEn,
}: {
  points: { title: string; body: string }[];
  isEn: boolean;
}) {
  const [focus, setFocus] = useState(0);
  const icons = [Shield, Zap, UserPlus];

  useEffect(() => {
    const t = window.setInterval(
      () => setFocus((p) => (p + 1) % points.length),
      3400,
    );
    return () => clearInterval(t);
  }, [points.length]);

  return (
    <section className="relative border-y border-white/8 bg-[#0a1016]">
      <div className="page-pad mx-auto max-w-6xl py-14 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-400/75">
              {isEn ? "Ownership map" : "Sahiplik haritası"}
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {isEn
                ? "Who owns what — at a glance."
                : "Kim neyi sahipleniyor — bir bakışta."}
            </h2>
          </div>
          <div className="flex -space-x-2">
            {people.map((p) => (
              <span
                key={p.initials}
                title={p.name}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0a1016] text-[10px] font-bold text-white"
                style={{ background: p.color }}
              >
                {p.initials}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
          {/* Role roster */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
              {isEn ? "Live roster" : "Canlı kadro"}
            </p>
            <ul className="mt-4 space-y-2.5">
              {people.map((p, i) => (
                <motion.li
                  key={p.initials}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-3 ${
                    focus === i % points.length
                      ? "border-bonero-green/35 bg-bonero-green/10"
                      : "border-white/8 bg-white/[0.02]"
                  }`}
                  animate={{
                    opacity: focus === i % points.length ? 1 : 0.65,
                  }}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold text-white"
                    style={{ background: p.color }}
                  >
                    {p.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">{p.name}</p>
                    <p className="text-[11px] text-white/35">
                      {isEn ? p.roleEn : p.roleTr}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-bonero-green">
                    {isEn ? "Online" : "Çevrimiçi"}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Value points as selectable panes */}
          <div className="flex flex-col gap-3">
            {points.map((p, i) => {
              const Icon = icons[i] ?? Users;
              const on = focus === i;
              return (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setFocus(i)}
                  className={`rounded-2xl border p-4 text-left transition-colors sm:p-5 ${
                    on
                      ? "border-bonero-green/40 bg-bonero-green/[0.1]"
                      : "border-white/8 bg-white/[0.02] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        on
                          ? "bg-bonero-green text-white"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-semibold text-white">
                          {p.title}
                        </h3>
                        <span className="font-mono text-[10px] text-white/25">
                          0{i + 1}
                        </span>
                      </div>
                      <AnimatePresence mode="wait">
                        {on && (
                          <motion.p
                            className="mt-2 text-sm leading-relaxed text-white/50"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            {p.body}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      {!on && (
                        <p className="mt-1.5 line-clamp-1 text-sm text-white/35">
                          {p.body}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function RailMoments({
  scenarios,
  outcome,
  isEn,
}: {
  scenarios: { label: string; text: string }[];
  outcome: string;
  isEn: boolean;
}) {
  const [active, setActive] = useState(0);
  const visuals = [
    {
      steps: isEn
        ? ["Brief in", "Creative ready", "Approved", "Live"]
        : ["Brief geldi", "Kreatif hazır", "Onaylandı", "Yayında"],
      progress: 100,
    },
    {
      steps: isEn
        ? ["Waiting…", "48h pending", "Nudge sent"]
        : ["Bekleniyor…", "48s bekliyor", "Hatırlatma gitti"],
      progress: 55,
      warn: true,
    },
    {
      steps: isEn
        ? ["Invite sent", "Role scoped", "On the rail"]
        : ["Davet gitti", "Rol sınırlı", "Hat üzerinde"],
      progress: 100,
    },
  ];

  useEffect(() => {
    const t = window.setInterval(
      () => setActive((p) => (p + 1) % scenarios.length),
      3800,
    );
    return () => clearInterval(t);
  }, [scenarios.length]);

  const v = visuals[active] ?? visuals[0];

  return (
    <section className="relative py-14 sm:py-16">
      <div className="page-pad mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
          {isEn ? "On the rail" : "Hat üzerinde"}
        </p>
        <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {isEn ? "Three moments that matter." : "Önemli üç an."}
        </h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-[240px_1fr]">
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {scenarios.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                className={`min-w-[160px] flex-1 rounded-xl border px-4 py-3 text-left transition-colors lg:min-w-0 ${
                  active === i
                    ? "border-sky-400/40 bg-sky-400/10"
                    : "border-white/8 bg-white/[0.02] hover:border-white/15"
                }`}
              >
                <span className="font-mono text-[10px] text-sky-400/80">
                  0{i + 1}
                </span>
                <p className="mt-1 text-sm font-semibold text-white">{s.label}</p>
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#0a1218]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.35, ease }}
                className="p-5 sm:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
                    {scenarios[active].label}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      v.warn
                        ? "bg-amber-400/15 text-amber-300"
                        : "bg-bonero-green/20 text-bonero-green"
                    }`}
                  >
                    {v.warn
                      ? isEn
                        ? "Bottleneck"
                        : "Darboğaz"
                      : isEn
                        ? "On track"
                        : "Yolda"}
                  </span>
                </div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
                  {scenarios[active].text}
                </p>

                <div className="mt-8">
                  <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-white/30">
                    <span>{isEn ? "Rail progress" : "Hat ilerlemesi"}</span>
                    <span
                      className={
                        v.warn ? "text-amber-300" : "text-bonero-green"
                      }
                    >
                      {v.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className={`h-full rounded-full ${
                        v.warn ? "bg-amber-400" : "bg-bonero-green"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${v.progress}%` }}
                      transition={{ duration: 0.7, ease }}
                    />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {v.steps.map((step, si) => (
                      <motion.span
                        key={step}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium ${
                          si === v.steps.length - 1 && v.warn
                            ? "border-amber-400/30 bg-amber-400/10 text-amber-200"
                            : si < v.steps.length - 1 || !v.warn
                              ? "border-bonero-green/25 bg-bonero-green/10 text-bonero-green"
                              : "border-white/8 bg-white/[0.03] text-white/40"
                        }`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: si * 0.08 }}
                      >
                        {(!v.warn || si < v.steps.length - 1) && (
                          <Check size={11} strokeWidth={2.5} />
                        )}
                        {step}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="h-0.5 bg-white/5">
              <motion.div
                key={active}
                className="h-full bg-sky-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3.8, ease: "linear" }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm font-medium text-white/55">{outcome}</p>
      </div>
    </section>
  );
}

export default function CollabFeaturePage({
  feature,
}: {
  feature: FeaturePageContent;
}) {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const points = isEn ? feature.valuePointsEn : feature.valuePoints;

  return (
    <div className="relative overflow-x-clip bg-[#0c1218] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 88% 10%, rgba(24,131,71,0.26), transparent 55%), radial-gradient(ellipse 40% 35% at 8% 50%, rgba(14,165,233,0.08), transparent 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 75% 50% at 70% 20%, black 10%, transparent 70%)",
        }}
      />

      {/* Hero */}
      <section className="relative pt-20 pb-10 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-16 lg:pb-8">
        <div className="page-pad relative mx-auto w-full max-w-6xl">
          <FeatureBackLink />

          <div className="mt-6 grid items-center gap-8 lg:mt-5 lg:grid-cols-2 lg:gap-10 xl:gap-12">
            <div className="relative max-w-xl">
              <div
                className="absolute top-1 bottom-2 left-0 hidden w-[3px] origin-top rounded-full bg-gradient-to-b from-bonero-green via-sky-400/40 to-transparent sm:block"
                aria-hidden
              />
              <div className="sm:pl-6">
                <motion.p
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-bonero-green uppercase"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Users size={13} />
                  {isEn ? feature.eyebrowEn : feature.eyebrow}
                </motion.p>

                <h1 className="font-heading mt-3 text-[1.9rem] !font-extrabold leading-[1.08] tracking-wide sm:text-4xl lg:text-[2.55rem]">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    {isEn ? "Email chains end." : "E-posta zinciri bitsin."}
                  </motion.span>
                  <motion.span
                    className="mt-1 block text-white/40"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease }}
                  >
                    {isEn ? (
                      <>
                        Approvals on{" "}
                        <span className="text-bonero-green">one rail.</span>
                      </>
                    ) : (
                      <>
                        Onay{" "}
                        <span className="text-bonero-green">tek hatta</span>{" "}
                        aksın.
                      </>
                    )}
                  </motion.span>
                </h1>

                <motion.p
                  className="mt-4 max-w-md text-sm leading-relaxed text-white/50 sm:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {isEn ? feature.leadEn : feature.lead}
                </motion.p>

                <motion.div
                  className="mt-6 flex flex-wrap items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                >
                  <FeatureCtaButton />
                  <p className="text-xs text-white/35">
                    {isEn
                      ? "Brief → edit → approve → live"
                      : "Brief → editoryal → onay → yayın"}
                  </p>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease }}
            >
              <CollabHeroBoard isEn={isEn} />
            </motion.div>
          </div>
        </div>
      </section>

      <OwnershipStage points={points} isEn={isEn} />

      <RailMoments
        scenarios={isEn ? feature.scenariosEn : feature.scenarios}
        outcome={isEn ? feature.outcomeEn : feature.outcome}
        isEn={isEn}
      />

      <FeatureBottomStrip feature={feature} />
    </div>
  );
}
