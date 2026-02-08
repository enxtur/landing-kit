import type React from "react";
import type { PageConfig, SiteConfig } from "./types";
import { renderSection } from "./sections";

/**
 * Renders a full page by rendering each section in order.
 */
export function renderPage(
  page: PageConfig,
  _site: SiteConfig
): React.ReactElement {
  return (
    <>
      {page.sections.map((section, index) => renderSection(section, index))}
    </>
  );
}
