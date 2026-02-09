import { defineSite } from "@landing/core";

const SITE = {
  name: "My Product",
  description: "Simple landing pages, done right. Config in. Static site out.",
  url: "https://example.com",
} as const;

const ROUTES = {
  home: "/",
  about: "/about",
  pricing: "/pricing",
} as const;

const COPYRIGHT = `© 2026 ${SITE.name}`;

const FOOTER_LINK_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: ROUTES.pricing },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: ROUTES.about },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
] as const;

const FOOTERS = {
  full: {
    type: "footer",
    linkGroups: FOOTER_LINK_GROUPS,
    copyright: `${COPYRIGHT}. All rights reserved.`,
  },
  productOnly: {
    type: "footer",
    linkGroups: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "/#features" },
          { label: "Pricing", href: ROUTES.pricing },
        ],
      },
    ],
    copyright: `${COPYRIGHT}.`,
  },
  minimal: {
    type: "footer",
    copyright: `${COPYRIGHT}.`,
  },
} as const;

export default defineSite({
  meta: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
  },
  pages: {
    [ROUTES.home]: {
      title: "Home",
      description: "Build landing pages fast with config-driven sections.",
      sections: [
        {
          type: "hero",
          heading: "Build landing pages fast",
          subheading: "Config in. Static site out.",
          buttons: [
            { label: "Get started", href: ROUTES.pricing, variant: "primary" },
            { label: "Learn more", href: ROUTES.about, variant: "secondary" },
          ],
        },
        {
          type: "features",
          id: "features",
          heading: "Why use landing-kit?",
          subheading: "Everything you need to ship marketing pages.",
          items: [
            {
              icon: "⚡",
              title: "Fast",
              description: "Static output. No server. Deploy anywhere.",
            },
            {
              icon: "📝",
              title: "Config-first",
              description: "Define pages and sections in TypeScript, not JSX.",
            },
            {
              icon: "🎨",
              title: "CSS-only",
              description: "Themes via CSS variables. No runtime CSS-in-JS.",
            },
          ],
        },
        {
          type: "pricing",
          heading: "Simple pricing",
          subheading: "One plan. No surprises.",
          tiers: [
            {
              name: "Starter",
              price: "$0",
              period: "month",
              description: "For side projects and experiments.",
              features: ["Up to 5 pages", "All section types", "Static export"],
              cta: { label: "Get started", href: "#" },
            },
            {
              name: "Pro",
              price: "$29",
              period: "month",
              highlight: "Popular",
              description: "For teams and production sites.",
              features: [
                "Unlimited pages",
                "All section types",
                "Static export",
                "Priority support",
              ],
              cta: { label: "Start trial", href: "#", variant: "primary" },
            },
          ],
        },
        {
          type: "cta",
          heading: "Ready to ship?",
          description: "Get your landing page live in minutes.",
          button: { label: "Start building", href: ROUTES.pricing },
        },
        {
          type: "faq",
          id: "faq",
          heading: "Frequently asked questions",
          subheading: "Quick answers to common questions.",
          items: [
            {
              question: "Do I need to write React components?",
              answer:
                "No. You define your site in a single config file. Sections are rendered by the framework.",
            },
            {
              question: "Can I use my own CSS?",
              answer:
                "Yes. The default theme uses CSS custom properties. Override them or add your own styles.",
            },
            {
              question: "Where can I deploy?",
              answer:
                "Anywhere that serves static files: Vercel, Netlify, GitHub Pages, S3, etc.",
            },
          ],
        },
        FOOTERS.full,
      ],
    },
    [ROUTES.about]: {
      title: "About",
      description: "Learn more about us.",
      sections: [
        {
          type: "hero",
          heading: "About us",
          subheading: "We build tools for developers who ship.",
        },
        {
          type: "features",
          heading: "Our values",
          items: [
            {
              icon: "🚀",
              title: "Ship fast",
              description: "Get from config to production in minutes.",
            },
            {
              icon: "🔧",
              title: "Stay simple",
              description: "No CMS, no visual editor. Just code and config.",
            },
          ],
        },
        {
          type: "cta",
          heading: "Join us",
          description: "Start building your landing page today.",
          button: { label: "Get started", href: ROUTES.pricing },
        },
        FOOTERS.productOnly,
      ],
    },
    [ROUTES.pricing]: {
      title: "Pricing",
      description: "Plans and pricing for every team.",
      sections: [
        {
          type: "hero",
          heading: "Pricing",
          subheading: "Choose the plan that fits your needs.",
        },
        {
          type: "pricing",
          heading: "Plans",
          tiers: [
            {
              name: "Free",
              price: "$0",
              period: "forever",
              features: ["5 pages", "Community support"],
              cta: { label: "Get started", href: "#" },
            },
            {
              name: "Pro",
              price: "$29",
              period: "month",
              highlight: "Popular",
              features: ["Unlimited pages", "Priority support", "Custom domain"],
              cta: { label: "Start trial", href: "#", variant: "primary" },
            },
          ],
        },
        {
          type: "faq",
          heading: "Pricing FAQ",
          items: [
            {
              question: "Can I change plans later?",
              answer: "Yes. Upgrade or downgrade anytime from your account.",
            },
          ],
        },
        FOOTERS.minimal,
      ],
    },
  },
});
