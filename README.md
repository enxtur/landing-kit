# landing-kit

Build multi-page marketing websites using typed config instead of JSX.

`landing-kit` is an open-source, developer-first framework for creating fast, static landing websites using a structured TypeScript config.  
You define pages, sections, and content as data. The framework handles routing, rendering, SEO, and static generation.

No CMS. No visual editor. No page builders. Just code → build → deploy.

---

## What is this?

`landing-kit` lets you build marketing websites by writing **configuration, not React components**.

You describe your site in **two files**: `landing.config.ts` (pages, routes, sections, meta) and `main.tsx` (a single component that wraps the framework content). The framework renders everything using predefined section renderers and CSS-only templates, then outputs a fully static site.

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

1. You define your site in `landing.config.ts` (default export of `defineSite(...)`).
2. Your `main.tsx` exports a `Main` component that wraps the framework content in `<LandingKit>{children}</LandingKit>`.
3. When you run `npm run dev` or `npm run build`, the `landing-kit` CLI auto-generates a hidden `app/` directory (gitignored), wires it to your config and `main.tsx`, and runs Next.js.
4. Pages are mapped from config keys to routes; each page is rendered using predefined section renderers.
5. The output is a fully static website.

Next.js is used internally, but you never see routing or page files. You only edit the config and `main.tsx`.

---

## Project structure

```
landing-kit/
├─ packages/
│  ├─ core/              # framework logic (config, rendering, section types)
│  ├─ next/              # Next.js wrapper, LandingKit component, CLI
│  ├─ templates/         # CSS-only templates
│  └─ create-landing-kit # scaffold CLI
├─ template/             # scaffold template (landing.config + main only)
├─ examples/
└─ README.md
```

Your scaffolded project looks like this:

```
my-site/
├─ landing.config.ts   # your site content (pages, sections, meta)
├─ main.tsx            # your wrapper component
├─ next.config.ts      # static export config (no need to edit)
├─ tsconfig.json
├─ package.json
└─ .gitignore          # ignores app/, .next/, out/, node_modules
```

No `app/` directory, no page files, no routing code. The framework handles all of that.

---

## Getting started

From the repo root, scaffold a new site:

```
node packages/create-landing-app/bin.js my-site
cd my-site
npm run dev
```

(When published, you will use `npm create landing-kit@latest` instead.)

You only edit two files:

- **landing.config.ts** — default export with `defineSite({ template?, meta, pages })` (optional `template`: `"default"` or `"micro-saas"`)
- **main.tsx** — default export `function Main({ children }) { return <LandingKit>{children}</LandingKit> }`

Build static output:

```
npm run build
```

Deploy the generated `out/` folder to any static host.

---

## Example

**landing.config.ts**

```ts
import { defineSite } from "@landing-kit/core";

export default defineSite({
  meta: {
    title: "My Product",
    description: "Simple landing pages, done right",
    url: "https://example.com",
  },
  pages: {
    "/": {
      title: "Home",
      sections: [
        {
          type: "hero",
          heading: "Build landing pages fast",
          subheading: "Config in. Static site out.",
          buttons: [
            { label: "Get started", href: "/pricing", variant: "primary" },
            { label: "Learn more", href: "/about", variant: "secondary" },
          ],
        },
      ],
    },
  },
});
```

**main.tsx**

```tsx
import { LandingKit } from "@landing-kit/next";

export default function Main({
  children,
}: { children: React.ReactNode }): React.ReactElement {
  return <LandingKit>{children}</LandingKit>;
}
```

That’s it. Add more sections (features, pricing, cta, faq, footer) and pages in `landing.config.ts` as needed.

---

## Anchors and in-page links

You can add optional `id` values to sections to enable `/#hash` anchors:

```ts
{
  type: "features",
  id: "features",
  heading: "Why use landing-kit?",
  items: [
    // ...
  ],
}
```

This lets footer links like `/#features` scroll to the correct section.

---

## Status

This project is early-stage and evolving.
APIs may change until the first stable release.

Contributions, ideas, and feedback are welcome.

---

## License

MIT
