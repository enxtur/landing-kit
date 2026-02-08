import type { CtaSection as CtaSectionConfig } from "../types";

export function CtaSection({ section }: { section: CtaSectionConfig }) {
  const btn = section.button;
  return (
    <section className="lk-cta" aria-labelledby="lk-cta-heading">
      <div className="lk-cta__inner">
        <h2 id="lk-cta-heading" className="lk-cta__heading">
          {section.heading}
        </h2>
        {section.description && (
          <p className="lk-cta__desc">{section.description}</p>
        )}
        <a
          href={btn.href}
          className={`lk-cta__btn lk-cta__btn--${btn.variant ?? "primary"}`}
        >
          {btn.label}
        </a>
      </div>
    </section>
  );
}
