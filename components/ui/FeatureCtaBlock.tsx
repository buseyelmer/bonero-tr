"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaBanner from "./CtaBanner";
import CtaButton from "./CtaButton";
import { PANEL_REGISTER_URL } from "@/lib/panel";

type FeatureCtaBlockProps = {
  title: string;
  body?: string;
  children?: ReactNode;
  primaryLabel: string;
  secondaryLabel: string;
  primaryHref?: string;
  secondaryHref?: string;
  align?: "split" | "center";
};

export default function FeatureCtaBlock({
  title,
  body,
  children,
  primaryLabel,
  secondaryLabel,
  primaryHref = PANEL_REGISTER_URL,
  secondaryHref = "/paketler",
  align = "split",
}: FeatureCtaBlockProps) {
  return (
    <section className="border-t border-bonero-dark/8 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <CtaBanner
            tone="green"
            align={align}
            title={title}
            body={body}
            extra={children}
            actions={
              <>
                <CtaButton
                  href={primaryHref}
                  variant="inverse"
                  size="md"
                  icon={<ArrowUpRight size={15} />}
                >
                  {primaryLabel}
                </CtaButton>
                <CtaButton
                  href={secondaryHref}
                  variant="outline-light"
                  size="md"
                >
                  {secondaryLabel}
                </CtaButton>
              </>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
