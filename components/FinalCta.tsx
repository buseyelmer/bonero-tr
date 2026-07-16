"use client";

import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import CtaBanner from "./ui/CtaBanner";
import CtaButton from "./ui/CtaButton";
import { useLocale } from "./LocaleProvider";
import { PANEL_REGISTER_URL } from "@/lib/panel";

const copy = {
  tr: {
    title: "Hemen başlayın.",
    subtitle: "Hesap açın. Kanalları bağlayın. Aynı gün yanıtlayın.",
    primary: "Ücretsiz kayıt ol",
    secondary: "İletişime geç",
  },
  en: {
    title: "Start now.",
    subtitle: "Create an account. Connect channels. Reply the same day.",
    primary: "Sign up free",
    secondary: "Contact us",
  },
};

export default function FinalCta() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <CtaBanner
            tone="dark"
            align="center"
            title={t.title}
            body={t.subtitle}
            actions={
              <>
                <CtaButton
                  href={PANEL_REGISTER_URL}
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={16} />}
                >
                  {t.primary}
                </CtaButton>
                <CtaButton href="/iletisim" variant="outline-light" size="lg">
                  {t.secondary}
                </CtaButton>
              </>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
