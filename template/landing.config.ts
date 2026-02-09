import { defineSite } from "@landing-kit/core";

const SITE = {
  name: "My Product",
  description: "Simple landing pages, done right. Config in. Static site out.",
  url: "https://example.com",
} as const;

const COPYRIGHT = `© 2026 ${SITE.name}. All rights reserved.`;

export default defineSite({
  meta: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
  },
  pages: {
    "/": {
      title: "Home",
      description: "Build landing pages fast with config-driven sections.",
      sections: [
        {
          type: "hero",
          heading: "Build landing pages fast",
          subheading: "Config in. Static site out.",
          buttons: [
            { label: "Get started", href: "#", variant: "primary" },
            { label: "Learn more", href: "#", variant: "secondary" },
          ],
        },
        {
          type: "footer",
          copyright: COPYRIGHT,
        },
      ],
    },
  },
});
