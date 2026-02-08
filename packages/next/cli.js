#!/usr/bin/env node
const { writeFileSync, mkdirSync, existsSync } = require("fs");
const { join } = require("path");
const { execSync } = require("child_process");

const cwd = process.cwd();
const command = process.argv[2];

if (!command || !["dev", "build"].includes(command)) {
  console.error("Usage: landing-kit <dev|build>");
  process.exit(1);
}

// Generate the app/ directory from templates embedded in this package.
generateApp(cwd);

// Run next
try {
  execSync(`npx next ${command}`, { cwd, stdio: "inherit" });
} catch {
  process.exit(1);
}

// -------------------------------------------------------------------
// Generates the hidden app/ directory that the user never touches.
// -------------------------------------------------------------------
function generateApp(dir) {
  const appDir = join(dir, "app");
  const slugDir = join(appDir, "[[...slug]]");

  mkdirSync(slugDir, { recursive: true });

  // app/layout.tsx
  writeFileSync(
    join(appDir, "layout.tsx"),
    `import * as React from "react";
import Script from "next/script";
import "@landing/core/styles";
import config from "../landing.config";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gtagId = config.analytics;

  return (
    <html lang="en">
      <body>
        {gtagId && (
          <>
            <Script
              src={\`https://www.googletagmanager.com/gtag/js?id=\${gtagId}\`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {\`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '\${gtagId}');
              \`}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
`
  );

  // app/[[...slug]]/page.tsx
  writeFileSync(
    join(slugDir, "page.tsx"),
    `import { notFound } from "next/navigation";
import { renderPage, buildMeta } from "@landing/core";
import config from "../../landing.config";
import Main from "../../main";

export async function generateStaticParams() {
  return Object.keys(config.pages).map((path) => ({
    slug: path === "/" ? [] : path.slice(1).split("/"),
  }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = "/" + (slug?.join("/") ?? "");
  const page = config.pages[path];
  if (!page) return {};
  return buildMeta(config, page);
}

export default async function Page({
  params,
}: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = "/" + (slug?.join("/") ?? "");
  const page = config.pages[path];
  if (!page) notFound();
  const content = renderPage(page, config);
  return <Main>{content}</Main>;
}
`
  );

  // app/not-found.tsx
  writeFileSync(
    join(appDir, "not-found.tsx"),
    `import Link from "next/link";

export default function NotFound() {
  return (
    <div className="lk-not-found">
      <h1>404</h1>
      <p>This page could not be found.</p>
      <Link href="/">Go home</Link>
    </div>
  );
}
`
  );

  // app/sitemap.ts
  writeFileSync(
    join(appDir, "sitemap.ts"),
    `import config from "../landing.config";

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = config.meta.url?.replace(/\\/$/, "") ?? "https://example.com";
  return Object.keys(config.pages).map((path) => ({
    url: \`\${baseUrl}\${path === "/" ? "" : path}\`,
    lastModified: new Date(),
  }));
}
`
  );

  // app/robots.ts
  writeFileSync(
    join(appDir, "robots.ts"),
    `import config from "../landing.config";

export const dynamic = "force-static";

export default function robots() {
  const baseUrl = config.meta.url?.replace(/\\/$/, "") ?? "https://example.com";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: \`\${baseUrl}/sitemap.xml\`,
  };
}
`
  );
}
