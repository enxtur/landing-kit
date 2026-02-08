import { defineSite } from "@landing/core";

export default defineSite({
  meta: {
    title: "My Product",
    description: "Simple landing pages, done right. Config in. Static site out.",
    url: "https://example.com",
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
          copyright: "© 2026 My Product. All rights reserved.",
        },
      ],
    },
  },
});
