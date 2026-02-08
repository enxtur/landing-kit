import type { Metadata } from "next";
import type { PageConfig, SiteConfig } from "./types";

/**
 * Builds Next.js Metadata for a page (title, description, Open Graph, Twitter).
 */
export function buildMeta(
  site: SiteConfig,
  page: PageConfig
): Metadata {
  const title = page.title;
  const description =
    page.description ?? site.meta.description;
  const baseUrl = site.meta.url?.replace(/\/$/, "") ?? "";
  const ogImage = site.meta.ogImage
    ? (baseUrl ? new URL(site.meta.ogImage, baseUrl + "/").href : site.meta.ogImage)
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...(ogImage && { images: [{ url: ogImage }] }),
      ...(baseUrl && { url: baseUrl }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    ...(site.meta.favicon && { icons: { icon: site.meta.favicon } }),
  };
}
