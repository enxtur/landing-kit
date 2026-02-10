# @landing-kit/templates

CSS-only themes for landing-kit. Re-exports `@landing-kit/core` styles with optional overrides.

## Templates

- **default** — Core styles as-is (blue accent, light gray backgrounds).
- **micro-saas** — Product-led look: teal accent, soft gradients, card shadows, DM Sans-friendly typography. Suited for micro-SaaS and indie product landings.

## Usage

```css
/* Default theme */
@import "@landing-kit/templates";

/* Micro-SaaS theme */
@import "@landing-kit/templates/micro-saas";
```

The micro-saas theme loads the DM Sans font via CSS, so no HTML or layout changes are needed—including in the Next.js scaffold, where the root layout is generated and overwritten on each build.

See [landing-kit](https://github.com/enxtur/landing-kit) for docs.
