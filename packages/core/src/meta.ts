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
  const description = page.description ?? site.meta.description;
  const baseUrl = site.meta.url?.replace(/\/$/, "");
  let metadataBase: URL | undefined;
  if (baseUrl) {
    try {
      metadataBase = new URL(baseUrl);
    } catch {
      console.warn(
        `[landing-kit] Invalid site.meta.url "${baseUrl}". Expected a full URL (e.g. https://example.com). Skipping metadataBase.`
      );
    }
  }
  const ogImage = site.meta.ogImage
    ? metadataBase
      ? new URL(site.meta.ogImage, metadataBase).href
      : site.meta.ogImage
    : undefined;

  return {
    title,
    description,
    ...(metadataBase && { metadataBase }),
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
