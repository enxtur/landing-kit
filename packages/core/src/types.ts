/**
 * Site-wide meta and SEO configuration.
 */
export interface MetaConfig {
  title: string;
  description: string;
  ogImage?: string;
  favicon?: string;
  /** Canonical base URL for the site (e.g. https://example.com) */
  url?: string;
}

/**
 * CTA button definition for hero and other sections.
 */
export interface CtaButton {
  label: string;
  href: string;
  /** Optional variant: primary (default) or secondary */
  variant?: "primary" | "secondary";
}

/**
 * Hero section: heading, subheading, optional CTA buttons.
 */
export interface HeroSection {
  type: "hero";
  heading: string;
  subheading?: string;
  /** Optional CTA buttons below the subheading */
  buttons?: CtaButton[];
}

/**
 * Single feature item for the features section.
 */
export interface FeatureItem {
  icon?: string;
  title: string;
  description: string;
}

/**
 * Features section: grid of feature cards.
 */
export interface FeaturesSection {
  type: "features";
  heading?: string;
  subheading?: string;
  items: FeatureItem[];
}

/**
 * Single pricing tier.
 */
export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  /** CTA button for this tier */
  cta: CtaButton;
  /** Optional highlight (e.g. "Popular") */
  highlight?: string;
}

/**
 * Pricing section: tier cards.
 */
export interface PricingSection {
  type: "pricing";
  heading?: string;
  subheading?: string;
  tiers: PricingTier[];
}

/**
 * Call-to-action section: single banner with heading, description, button.
 */
export interface CtaSection {
  type: "cta";
  heading: string;
  description?: string;
  button: CtaButton;
}

/**
 * Single FAQ item.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ section: collapsible Q&A (details/summary).
 */
export interface FaqSection {
  type: "faq";
  heading?: string;
  subheading?: string;
  items: FaqItem[];
}

/**
 * Link group in footer (e.g. "Product", "Company").
 */
export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

/**
 * Footer section: link columns and copyright.
 */
export interface FooterSection {
  type: "footer";
  /** Optional link columns */
  linkGroups?: FooterLinkGroup[];
  copyright?: string;
}

/**
 * Discriminated union of all section types.
 */
export type SectionConfig =
  | HeroSection
  | FeaturesSection
  | PricingSection
  | CtaSection
  | FaqSection
  | FooterSection;

/**
 * Page configuration: title, optional description, and ordered sections.
 */
export interface PageConfig {
  title: string;
  description?: string;
  sections: SectionConfig[];
}

/**
 * Site configuration: meta, pages keyed by path, optional Google Analytics.
 */
export interface SiteConfig {
  meta: MetaConfig;
  pages: Record<string, PageConfig>;
  /** Optional Google Analytics measurement ID (e.g. G-XXXXXXXXXX) */
  analytics?: string;
}
