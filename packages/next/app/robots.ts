import { siteConfig } from "../site.config";

export const dynamic = "force-static";

export default function robots() {
  const baseUrl = siteConfig.meta.url?.replace(/\/$/, "") ?? "https://example.com";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
