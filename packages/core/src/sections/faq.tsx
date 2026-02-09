import type { FaqSection as FaqSectionConfig } from "../types";

export function FaqSection({
  section,
  index = 0,
}: { section: FaqSectionConfig; index?: number }) {
  const headingId = section.heading
    ? section.id
      ? `${section.id}-heading`
      : `lk-faq-heading-${index}`
    : undefined;
  return (
    <section id={section.id} className="lk-faq" aria-labelledby={headingId}>
      <div className="lk-faq__inner">
        {section.heading && (
          <h2 id={headingId} className="lk-faq__heading">
            {section.heading}
          </h2>
        )}
        {section.subheading && (
          <p className="lk-faq__subheading">{section.subheading}</p>
        )}
        <div className="lk-faq__list">
          {section.items.map((item, i) => (
            <details key={i} className="lk-faq__item">
              <summary className="lk-faq__question">{item.question}</summary>
              <div className="lk-faq__answer">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
