

# landing-kit

Build multi-page marketing websites using typed config instead of JSX.

`landing-kit` is an open-source, developer-first framework for creating fast, static landing websites using a structured TypeScript config.  
You define pages, sections, and content as data. The framework handles routing, rendering, SEO, and static generation.

No CMS. No visual editor. No page builders. Just code → build → deploy.

---

## What is this?

`landing-kit` lets you build marketing websites by writing **configuration, not React components**.

You describe your site in a single `site.config.ts` file:
- pages
- routes
- sections
- meta tags

The framework renders everything using predefined section renderers and CSS-only templates, then outputs a fully static site.

---

## What does it do?

- Multi-page static website generation
- Config-driven pages and routing
- Predefined section types (hero, features, pricing, etc.)
- CSS-only templates
- Built-in SEO defaults
- Automatic sitemap.xml and robots.txt
- Optional Google Analytics (gtag)
- Static output deployable anywhere

---

## What this is NOT

This project intentionally does **not** support:

- Blogs or MDX content
- CMS or admin panels
- Drag-and-drop or visual editors
- Authentication or dashboards
- Dynamic server features

The goal is to stay opinionated and simple.

---

## Who is this for?

- Developers who want to ship landing pages fast
- Indie hackers and SaaS builders
- Backend-leaning devs who don’t want to write JSX for marketing pages
- Teams who prefer config + Git over visual tools

If you want full design freedom or a CMS, this is probably not for you.

---

## How it works

1. You define your site in `site.config.ts`
2. Pages are mapped from config keys to routes
3. Each page is rendered using predefined section renderers
4. A Next.js wrapper handles routing and static export
5. The output is a fully static website

Next.js is used internally, but users never touch routing or page files.

---

## Project structure

```
landing-kit/
├─ packages/
│  ├─ core/        # framework logic (config, rendering)
│  ├─ next/        # Next.js wrapper
│  └─ templates/   # CSS-only templates
├─ examples/
└─ README.md
```

---

## Getting started

Scaffold a new site:

```
npm create landing-app@latest
cd my-site
npm run dev
```

Build static output:

```
npm run build
```

Deploy the generated files to any static host.

---

## Example config

```ts
import { defineSite } from "@landing/core";

export default defineSite({
  meta: {
    title: "My Product",
    description: "Simple landing pages, done right",
  },
  pages: {
    "/": {
      title: "Home",
      sections: [
        {
          type: "hero",
          heading: "Build landing pages fast",
          subheading: "Config in. Static site out.",
        },
      ],
    },
  },
});
```

---

## Status

This project is early-stage and evolving.
APIs may change until the first stable release.

Contributions, ideas, and feedback are welcome.

---

## License

MIT