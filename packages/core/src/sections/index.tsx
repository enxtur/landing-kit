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
  switch (section.type) {
    case "hero":
      return <HeroSection key={index} section={section} />;
    case "features":
      return <FeaturesSection key={index} section={section} />;
    case "pricing":
      return <PricingSection key={index} section={section} />;
    case "cta":
      return <CtaSection key={index} section={section} />;
    case "faq":
      return <FaqSection key={index} section={section} />;
    case "footer":
      return <FooterSection key={index} section={section} />;
    default: {
      const _: never = section;
      return <></>;
    }
  }
}

export { HeroSection, FeaturesSection, PricingSection, CtaSection, FaqSection, FooterSection };
