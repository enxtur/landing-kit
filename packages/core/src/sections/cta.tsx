import type { CtaSection as CtaSectionConfig } from "../types";

export function CtaSection({
  section,
  index = 0,
}: { section: CtaSectionConfig; index?: number }) {
  const btn = section.button;
  const variant = btn.variant ?? "primary";
  const headingId = section.id
    ? `${section.id}-heading`
    : `lk-cta-heading-${index}`;
  return (
    <section id={section.id} className="lk-cta" aria-labelledby={headingId}>
      <div className="lk-cta__inner">
        <h2 id={headingId} className="lk-cta__heading">
          {section.heading}
        </h2>
        {section.description && (
          <p className="lk-cta__desc">{section.description}</p>
        )}
        <a
          href={btn.href}
          className={`lk-cta__btn lk-cta__btn--${variant}`}
        >
          {btn.label}
        </a>
      </div>
    </section>
  );
}
