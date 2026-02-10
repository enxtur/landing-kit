import type { HeroSection as HeroSectionConfig } from "../types";
import { linkProps } from "../utils";

export function HeroSection({
  section,
  index = 0,
}: {
  section: HeroSectionConfig;
  index?: number;
}) {
  const headingId = section.id
    ? `${section.id}-heading`
    : `lk-hero-heading-${index}`;
  return (
    <section id={section.id} className="lk-hero" aria-labelledby={headingId}>
      <div className="lk-hero__inner">
        <h1 id={headingId} className="lk-hero__heading">
          {section.heading}
        </h1>
        {section.subheading && (
          <p className="lk-hero__subheading">{section.subheading}</p>
        )}
        {section.buttons && section.buttons.length > 0 && (
          <div className="lk-hero__buttons">
            {section.buttons.map((btn, i) => {
              const variant = btn.variant ?? "primary";
              return (
                <a
                  key={i}
                  href={btn.href}
                  className={`lk-hero__btn lk-hero__btn--${variant}`}
                  {...linkProps(btn.href)}
                >
                  {btn.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
