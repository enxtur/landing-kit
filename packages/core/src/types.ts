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

export type ButtonVariant = "primary" | "secondary";

/**
 * Shared base fields for all sections.
 */
export interface SectionBase {
  /**
   * Optional anchor id for deep-linking (e.g. "features" for /#features).
   * When set, the section wrapper receives this id.
   */
  id?: string;
}

/**
 * Shared heading fields for sections that can render a heading + subheading.
 */
export interface SectionHeading {
  heading?: string;
  subheading?: string;
}

/**
 * Required heading fields for sections that must render a heading.
 */
export interface SectionHeadingRequired {
  heading: string;
  subheading?: string;
}

/**
 * CTA button definition for hero and other sections.
 */
export interface CtaButton {
  label: string;
  href: string;
  /** Optional variant: primary (default) or secondary */
  variant?: ButtonVariant;
}

/**
 * Hero section: heading, subheading, optional CTA buttons.
 */
export interface HeroSection extends SectionBase, SectionHeadingRequired {
  type: "hero";
  /** Optional CTA buttons below the subheading */
  buttons?: ReadonlyArray<CtaButton>;
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
export interface FeaturesSection extends SectionBase, SectionHeading {
  type: "features";
  items: ReadonlyArray<FeatureItem>;
}

/**
 * Single pricing tier.
 */
export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: ReadonlyArray<string>;
  /** CTA button for this tier */
  cta: CtaButton;
  /** Optional highlight (e.g. "Popular") */
  highlight?: string;
}

/**
 * Pricing section: tier cards.
 */
export interface PricingSection extends SectionBase, SectionHeading {
  type: "pricing";
  tiers: ReadonlyArray<PricingTier>;
}

/**
 * Call-to-action section: single banner with heading, description, button.
 */
export interface CtaSection extends SectionBase, SectionHeadingRequired {
  type: "cta";
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
export interface FaqSection extends SectionBase, SectionHeading {
  type: "faq";
  items: ReadonlyArray<FaqItem>;
}

/**
 * Link group in footer (e.g. "Product", "Company").
 */
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: ReadonlyArray<FooterLink>;
}

/**
 * Footer section: link columns and copyright.
 */
export interface FooterSection extends SectionBase {
  type: "footer";
  /** Optional link columns */
  linkGroups?: ReadonlyArray<FooterLinkGroup>;
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
  sections: ReadonlyArray<SectionConfig>;
}

/**
 * Site configuration: meta, pages keyed by path, optional Google Analytics.
 */
export interface SiteConfig {
  meta: MetaConfig;
  pages: Record<string, PageConfig>;
  /** Optional Google Analytics measurement ID (e.g. G-XXXXXXXXXX) */
  analytics?: string;
  /** Optional CSS template name (e.g. "default", "micro-saas"). Used by the Next.js CLI to inject the correct styles import. */
  template?: string;
}
