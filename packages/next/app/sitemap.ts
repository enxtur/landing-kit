import { siteConfig } from "../site.config";

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = siteConfig.meta.url?.replace(/\/$/, "") ?? "https://example.com";
  return Object.keys(siteConfig.pages).map((path) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));
}
