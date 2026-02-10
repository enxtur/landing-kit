import { notFound } from "next/navigation";
import { renderPage, buildMeta } from "@landing-kit/core";
import config from "../../landing.config";
import Main from "../../main";

const pathFromSlug = (slug?: string[]) => "/" + (slug?.join("/") ?? "");
const pageFromSlug = (slug?: string[]) => config.pages[pathFromSlug(slug)];

export async function generateStaticParams() {
  return Object.keys(config.pages).map((route) => ({
    slug: route === "/" ? [] : route.slice(1).split("/"),
  }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = pageFromSlug(slug);
  if (!page) return {};
  return buildMeta(config, page);
}

export default async function Page({
  params,
}: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = pageFromSlug(slug);
  if (!page) notFound();
  const content = renderPage(page);
  return <Main>{content}</Main>;
}
