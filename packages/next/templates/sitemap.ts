import config from "../landing.config";

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = config.meta.url?.replace(/\/$/, "") ?? "https://example.com";
  return Object.keys(config.pages).map((path) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));
}
