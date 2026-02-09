import type { FooterSection as FooterSectionConfig } from "../types";

export function FooterSection({
  section,
  index: _index = 0,
}: { section: FooterSectionConfig; index?: number }) {
  return (
    <footer id={section.id} className="lk-footer" role="contentinfo">
      <div className="lk-footer__inner">
        {section.linkGroups && section.linkGroups.length > 0 && (
          <div className="lk-footer__grid">
            {section.linkGroups.map((group, i) => (
              <div key={i} className="lk-footer__group">
                <h3 className="lk-footer__group-title">{group.title}</h3>
                <ul className="lk-footer__links">
                  {group.links.map((link, j) => (
                    <li key={j}>
                      <a href={link.href} className="lk-footer__link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {section.copyright && (
          <p className="lk-footer__copyright">{section.copyright}</p>
        )}
      </div>
    </footer>
  );
}
