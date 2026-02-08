import type { PricingSection as PricingSectionConfig } from "../types";

export function PricingSection({
  section,
}: { section: PricingSectionConfig }) {
  return (
    <section className="lk-pricing" aria-labelledby="lk-pricing-heading">
      <div className="lk-pricing__inner">
        {section.heading && (
          <h2 id="lk-pricing-heading" className="lk-pricing__heading">
            {section.heading}
          </h2>
        )}
        {section.subheading && (
          <p className="lk-pricing__subheading">{section.subheading}</p>
        )}
        <div className="lk-pricing__grid">
          {section.tiers.map((tier, i) => (
            <div
              key={i}
              className={`lk-pricing__tier ${tier.highlight ? "lk-pricing__tier--highlight" : ""}`}
            >
              {tier.highlight && (
                <span className="lk-pricing__badge">{tier.highlight}</span>
              )}
              <h3 className="lk-pricing__tier-name">{tier.name}</h3>
              <div className="lk-pricing__tier-price">
                <span className="lk-pricing__amount">{tier.price}</span>
                {tier.period && (
                  <span className="lk-pricing__period">/{tier.period}</span>
                )}
              </div>
              {tier.description && (
                <p className="lk-pricing__tier-desc">{tier.description}</p>
              )}
              <ul className="lk-pricing__features">
                {tier.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
              <a
                href={tier.cta.href}
                className={`lk-pricing__cta lk-pricing__cta--${tier.cta.variant ?? "primary"}`}
              >
                {tier.cta.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
