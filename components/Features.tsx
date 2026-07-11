"use client";

import {
  BarChart3,
  LayoutDashboard,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

type Feature = {
  icon: LucideIcon;
  name: string;
  pain: string;
  solution: string;
};

const features: Feature[] = [
  {
    icon: LayoutDashboard,
    name: "Unified Inbox",
    pain: "Yorumlar, DM’ler ve e-postalar farklı panellerde mi kayboluyor?",
    solution: "Tüm kanallar tek merkezde. Hiçbir mesaj gözden kaçmaz; yanıt süreniz kısalır.",
  },
  {
    icon: Sparkles,
    name: "AI İçerik Asistanı",
    pain: "Her müşteri için taslak ve yanıt üretmek ekibinizin gününü mü yiyor?",
    solution: "Taslak oluşturma ve yanıt önerileri — marka sesine uygun, dakikalar içinde.",
  },
  {
    icon: Users,
    name: "Ekip Yönetimi",
    pain: "Onaylar ve görevler e-posta zincirinde mi kayboluyor?",
    solution: "Rol bazlı onay süreçleri ve görev atama ile net sorumluluk, hızlı yayına çıkış.",
  },
  {
    icon: BarChart3,
    name: "Analitik & Raporlama",
    pain: "Müşteri sunumları için performans verisi toplamak mı zorlaşıyor?",
    solution: "Performans takibi tek panelde — müşteri sunumlarına hazır, ölçülebilir raporlar.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Features() {
  return (
    <section
      id="ozellikler"
      className="relative z-0 bg-[#f8fafc] py-16 sm:py-24"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-bonero-dark/45 uppercase">
            Özellikler & Çözümler
          </p>
          <h2 className="font-heading mt-3 text-4xl tracking-wide text-bonero-dark sm:text-5xl">
            Ajans acılarına
            <span className="mt-1 block text-bonero-dark/35">odaklı çözümler.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-bonero-dark/60">
            Özellik listesi değil — günlük operasyonunuzdaki gerçek sorunlara yanıt.
          </p>
        </Reveal>

        <motion.div
          className="mt-16 space-y-16 sm:space-y-24"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {features.map(({ icon: Icon, name, pain, solution }, index) => {
            const reverse = index % 2 === 1;
            return (
              <motion.div
                key={name}
                variants={item}
                className="grid items-start gap-8 lg:grid-cols-12 lg:gap-14"
              >
                <div
                  className={`lg:col-span-5 ${
                    reverse ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-bonero-dark/5 text-bonero-dark/70">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <p className="text-xs font-medium tracking-wide text-bonero-green uppercase">
                      {name}
                    </p>
                  </div>
                  <p className="text-xs font-medium tracking-wide text-bonero-dark/40 uppercase">
                    Problem
                  </p>
                  <h3 className="font-heading mt-2 text-2xl leading-snug tracking-wide text-bonero-dark sm:text-3xl">
                    {pain}
                  </h3>
                </div>

                <div
                  className={`lg:col-span-7 ${
                    reverse ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <p className="text-xs font-medium tracking-wide text-bonero-dark/40 uppercase">
                    Çözüm
                  </p>
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-bonero-dark/65 sm:text-xl">
                    {solution}
                  </p>
                  <div
                    className={`mt-6 h-px w-24 ${
                      reverse ? "bg-bonero-dark/15 lg:ml-auto" : "bg-bonero-green"
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <Reveal delay={0.15} className="mt-16 flex flex-wrap gap-3">
          <a
            href="#nasil-calisir"
            className="inline-flex items-center justify-center rounded-lg border border-bonero-dark/12 bg-white/70 px-6 py-3 text-sm font-medium text-bonero-dark backdrop-blur-md transition-colors hover:border-bonero-dark/25"
          >
            Nasıl Çalışır?
          </a>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center rounded-lg bg-bonero-green px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-bonero-green/90"
          >
            Demo Talep Et
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
