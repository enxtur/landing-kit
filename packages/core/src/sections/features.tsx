import type { FeaturesSection as FeaturesSectionConfig } from "../types";

export function FeaturesSection({
  section,
  index = 0,
}: { section: FeaturesSectionConfig; index?: number }) {
  const headingId = section.heading
    ? section.id
      ? `${section.id}-heading`
      : `lk-features-heading-${index}`
    : undefined;
  return (
    <section
      id={section.id}
      className="lk-features"
      aria-labelledby={headingId}
    >
      <div className="lk-features__inner">
        {section.heading && (
          <h2 id={headingId} className="lk-features__heading">
            {section.heading}
          </h2>
        )}
        {section.subheading && (
          <p className="lk-features__subheading">{section.subheading}</p>
        )}
        <div className="lk-features__grid">
          {section.items.map((item, i) => (
            <div key={i} className="lk-features__item">
              {item.icon && (
                <span className="lk-features__icon" aria-hidden>
                  {item.icon}
                </span>
              )}
              <h3 className="lk-features__item-title">{item.title}</h3>
              <p className="lk-features__item-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
