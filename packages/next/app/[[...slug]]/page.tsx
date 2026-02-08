import { notFound } from "next/navigation";
import { renderPage, buildMeta } from "@landing/core";
import { siteConfig } from "../../site.config";

export async function generateStaticParams() {
  return Object.keys(siteConfig.pages).map((path) => ({
    slug: path === "/" ? [] : path.slice(1).split("/"),
  }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = "/" + (slug?.join("/") ?? "");
  const page = siteConfig.pages[path];
  if (!page) return {};
  return buildMeta(siteConfig, page);
}

export default async function Page({
  params,
}: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = "/" + (slug?.join("/") ?? "");
  const page = siteConfig.pages[path];
  if (!page) notFound();
  return renderPage(page, siteConfig);
}
