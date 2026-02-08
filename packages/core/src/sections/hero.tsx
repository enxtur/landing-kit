import type { HeroSection as HeroSectionConfig } from "../types";

export function HeroSection({ section }: { section: HeroSectionConfig }) {
  return (
    <section className="lk-hero" aria-label="Hero">
      <div className="lk-hero__inner">
        <h1 className="lk-hero__heading">{section.heading}</h1>
        {section.subheading && (
          <p className="lk-hero__subheading">{section.subheading}</p>
        )}
        {section.buttons && section.buttons.length > 0 && (
          <div className="lk-hero__buttons">
            {section.buttons.map((btn, i) => (
              <a
                key={i}
                href={btn.href}
                className={`lk-hero__btn lk-hero__btn--${btn.variant ?? "primary"}`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
