---
name: Complete landing-kit framework
overview: "Implement the full landing-kit framework as described in the README: typed config system, 6 section renderers with CSS-only styling, Next.js static export with SEO/sitemap/robots/analytics, and a working example site."
todos:
  - id: monorepo-setup
    content: Set up npm workspaces in root package.json, update root tsconfig.json
    status: completed
  - id: core-types
    content: Create packages/core/src/types.ts with all TypeScript interfaces (SiteConfig, PageConfig, 6 section types)
    status: completed
  - id: core-config
    content: Create packages/core/src/config.ts with defineSite() function
    status: completed
  - id: core-sections
    content: Create 6 section renderers in packages/core/src/sections/ (hero, features, pricing, cta, faq, footer) + dispatcher
    status: completed
  - id: core-render-meta
    content: Create packages/core/src/render.tsx (renderPage) and src/meta.ts (buildMeta with OG tags)
    status: completed
  - id: core-styles
    content: Create CSS files in packages/core/styles/ (base.css + 6 section CSS files + index.css)
    status: completed
  - id: core-package
    content: Create packages/core/package.json and src/index.ts barrel export; delete old index.ts and lib.tsx
    status: completed
  - id: templates-package
    content: Create packages/templates/ with package.json and default.css
    status: completed
  - id: next-restructure
    content: "Restructure packages/next/: add package.json, next.config.ts, tsconfig.json, move layout to app root"
    status: completed
  - id: next-pages
    content: Update app/[[...slug]]/page.tsx, create app/not-found.tsx, app/sitemap.ts, app/robots.ts
    status: completed
  - id: next-layout-analytics
    content: Update app/layout.tsx with CSS imports and optional Google Analytics script
    status: completed
  - id: example-site
    content: Replace examples/vite/ with examples/basic/site.config.ts demonstrating all 6 sections across multiple pages
    status: completed
  - id: verify-build
    content: Verify the project builds and runs with npm run dev / npm run build
    status: completed
isProject: false
---

# Complete the landing-kit Framework

## Architecture

```mermaid
graph TD
    SiteConfig["site.config.ts (user config)"] -->|"defineSite()"| Core["@landing/core"]
    Core -->|"types, renderers, CSS"| NextApp["@landing/next (Next.js app)"]
    NextApp -->|"static export"| Output["Static HTML/CSS"]
    Templates["@landing/templates (CSS)"] -->|"imported by"| Core
    
    subgraph core_pkg ["@landing/core"]
        Types["types.ts"]
        Config["config.ts"]
        Sections["sections/ (6 renderers)"]
        Render["render.tsx"]
        Meta["meta.ts"]
    end
    
    subgraph next_pkg ["@landing/next"]
        Layout["layout.tsx"]
        Page["page.tsx"]
        Sitemap["sitemap.ts"]
        Robots["robots.ts"]
        NotFound["not-found.tsx"]
    end
```



## 1. Monorepo Setup

**Root `package.json**` -- add npm workspaces and scripts:

- `"workspaces": ["packages/*", "examples/*"]`
- Scripts: `dev`, `build`, `lint` (delegate to `packages/next`)

**Root `tsconfig.json**` -- add JSX, path references for the monorepo.

## 2. Core Package (`packages/core/`)

Delete existing `[packages/core/index.ts](packages/core/index.ts)` and `[packages/core/lib.tsx](packages/core/lib.tsx)` -- they are stubs with incorrect exports.

Create new structure:

- `**src/types.ts**` -- All TypeScript interfaces:
  - `SiteConfig` (meta, pages, analytics)
  - `MetaConfig` (title, description, ogImage, favicon, url)
  - `PageConfig` (title, description, sections)
  - `SectionConfig` -- discriminated union of all section types
  - Individual section types: `HeroSection`, `FeaturesSection`, `PricingSection`, `CtaSection`, `FaqSection`, `FooterSection`
- `**src/config.ts**` -- `defineSite(config: SiteConfig): SiteConfig` -- type-safe identity function that validates shape
- `**src/sections/**` -- React server components (no client JS):
  - `hero.tsx` -- heading, subheading, CTA buttons, background
  - `features.tsx` -- grid of feature cards (icon emoji, title, description)
  - `pricing.tsx` -- pricing tier cards (name, price, period, feature list, CTA)
  - `cta.tsx` -- call-to-action banner (heading, description, button)
  - `faq.tsx` -- collapsible Q&A using `<details>/<summary>` (CSS-only, no JS)
  - `footer.tsx` -- link columns, copyright text
  - `index.ts` -- `renderSection(section: SectionConfig)` dispatcher
- `**src/render.tsx**` -- `renderPage(page: PageConfig, site: SiteConfig): JSX.Element` -- iterates page.sections, calls renderSection for each
- `**src/meta.ts**` -- `buildMeta(site: SiteConfig, page: PageConfig): Metadata` -- returns Next.js Metadata object with title, description, Open Graph, Twitter cards
- `**src/index.ts**` -- Public API barrel: exports `defineSite`, all types, `renderPage`, `buildMeta`, `renderSection`
- `**package.json**` -- `"name": "@landing/core"`, peer deps on react

## 3. CSS Styles (in `packages/core/styles/`)

CSS-only templates as mentioned in the README. No CSS-in-JS, no Tailwind. Clean semantic CSS with CSS custom properties for theming.

- `base.css` -- CSS reset, custom properties (--color-primary, --color-bg, --font-family, spacing scale), responsive breakpoints
- `hero.css`, `features.css`, `pricing.css`, `cta.css`, `faq.css`, `footer.css` -- section-specific styles using BEM-like class names (e.g., `.lk-hero`, `.lk-hero__heading`)
- `index.css` -- imports all CSS files

## 4. Templates Package (`packages/templates/`)

- `**package.json**` -- `"name": "@landing/templates"`
- `**default.css**` -- The default theme CSS (re-exports core styles with default custom property values)
- This package is kept minimal for now; the README mentions it so we create the skeleton with the default template

## 5. Next.js Package (`packages/next/`)

Restructure from current layout-inside-catch-all to proper Next.js App Router structure.

- `**package.json**` -- `"name": "@landing/next"`, depends on `@landing/core`, `next`, `react`
- `**next.config.ts**` -- `output: "export"` for static generation, typescript paths
- `**tsconfig.json**` -- extends root, adds Next.js types and path aliases
- `**site.config.ts**` -- bridge file that imports from `../examples/basic/site.config` (indirection layer for config loading)
- `**app/layout.tsx**` -- root layout: imports CSS from core, adds Google Analytics `<script>` when configured, `<html>`, `<body>`
- `**app/[[...slug]]/page.tsx**` -- `generateStaticParams()` from config pages, `generateMetadata()` via `buildMeta()`, default export renders via `renderPage()`
- `**app/not-found.tsx**` -- styled 404 page
- `**app/sitemap.ts**` -- generates `sitemap.xml` from config pages + site URL
- `**app/robots.ts**` -- generates `robots.txt` allowing all crawlers, linking to sitemap

Move `layout.tsx` from `app/[[...slug]]/layout.tsx` to `app/layout.tsx` (root-level).

## 6. Example Site (`examples/basic/`)

Replace `examples/vite/` with `examples/basic/`:

- `**site.config.ts**` -- comprehensive example using ALL 6 section types across 2-3 pages:
  - `/` (home): hero, features, pricing, cta, faq, footer
  - `/about`: hero (different), features, cta, footer
  - `/pricing`: hero, pricing, faq, footer

This serves as both the working example and a demo of the framework's capabilities.

## 7. Config Loading Flow

```mermaid
sequenceDiagram
    participant User as site.config.ts
    participant Core as @landing/core
    participant Next as @landing/next
    participant Browser as Static HTML

    User->>Core: defineSite(config)
    Core-->>User: typed SiteConfig
    Next->>User: import siteConfig
    Next->>Core: generateStaticParams(siteConfig)
    Core-->>Next: route params
    Next->>Core: renderPage(page, site)
    Core-->>Next: JSX with sections
    Next->>Core: buildMeta(site, page)
    Core-->>Next: Metadata object
    Next->>Browser: Static HTML + CSS
```



## Key Design Decisions

- **CSS-only interactivity**: FAQ uses native `<details>/<summary>`, no client-side JavaScript needed for any section
- **Server Components only**: All section renderers are React Server Components (no `"use client"`)
- **BEM-like class naming**: `.lk-{section}`, `.lk-{section}__{element}` to avoid collisions
- **CSS custom properties**: Theming via `--lk-color-primary`, `--lk-color-bg`, etc. in `:root`
- **Static export**: `next.config.ts` uses `output: "export"` for zero-server deployment

