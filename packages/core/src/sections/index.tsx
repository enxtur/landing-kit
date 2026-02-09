import type React from "react";
import type { SectionConfig } from "../types";
import { HeroSection } from "./hero";
import { FeaturesSection } from "./features";
import { PricingSection } from "./pricing";
import { CtaSection } from "./cta";
import { FaqSection } from "./faq";
import { FooterSection } from "./footer";

/**
 * Renders a single section by type (dispatcher).
 */
export function renderSection(
  section: SectionConfig,
  index: number
): React.ReactNode {
  const key = section.id ?? `${section.type}-${index}`;
  switch (section.type) {
    case "hero":
      return <HeroSection key={key} section={section} index={index} />;
    case "features":
      return <FeaturesSection key={key} section={section} index={index} />;
    case "pricing":
      return <PricingSection key={key} section={section} index={index} />;
    case "cta":
      return <CtaSection key={key} section={section} index={index} />;
    case "faq":
      return <FaqSection key={key} section={section} index={index} />;
    case "footer":
      return <FooterSection key={key} section={section} index={index} />;
    default: {
      const _: never = section;
      return null;
    }
  }
}

export { HeroSection, FeaturesSection, PricingSection, CtaSection, FaqSection, FooterSection };
