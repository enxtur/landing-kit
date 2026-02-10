import config from "../landing.config";

export const dynamic = "force-static";

export default function robots() {
  const baseUrl = config.meta.url?.replace(/\/$/, "") ?? "https://example.com";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
