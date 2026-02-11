# @landing-kit/templates

CSS-only themes for landing-kit. Re-exports `@landing-kit/core` styles with optional overrides.

## Templates

- **default** — Core styles as-is (blue accent, light gray backgrounds).
- **micro-saas** — Product-led look: teal accent, soft gradients, card shadows, DM Sans-friendly typography. Suited for micro-SaaS and indie product landings.
- **dev-tool** — Dark, minimal, developer-focused: electric blue accent, dark surfaces, large bold headings, Inter typography. Suited for serious dev tools and technical SaaS.

## Usage

Set the template in `landing.config.ts`. The Next.js CLI injects the correct styles import when generating the app layout.

```ts
import { defineSite } from "@landing-kit/core";

export default defineSite({
  template: "micro-saas",  // or "default"
  meta: { title: "...", description: "...", url: "..." },
  pages: { "/": { ... }, ... },
});
```

- **default** — Uses `@landing-kit/templates` (core styles as-is).
- **micro-saas** — Uses `@landing-kit/templates/micro-saas`. Loads the DM Sans font via CSS; no HTML or layout changes are needed.
- **dev-tool** — Uses `@landing-kit/templates/dev-tool`. Dark theme with electric blue accent, Inter font; no HTML or layout changes are needed.

See [landing-kit](https://github.com/enxtur/landing-kit) for docs.
