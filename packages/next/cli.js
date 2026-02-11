#!/usr/bin/env node
const {
  writeFileSync,
  readFileSync,
  mkdirSync,
  existsSync,
  rmSync,
  cpSync,
} = require("fs");
const { join } = require("path");
const { execSync } = require("child_process");

const cwd = process.cwd();
const command = process.argv[2];
const pkgDir = __dirname;

if (!command || !["dev", "build"].includes(command)) {
  console.error("Usage: landing-kit <dev|build>");
  process.exit(1);
}

// Generate the app/ directory under the package, then symlink from project root.
generateApp(cwd, pkgDir);

// Run next
try {
  execSync(`npx next ${command}`, { cwd, stdio: "inherit" });
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

// -------------------------------------------------------------------
// Load landing.config.ts and return template name (e.g. "default", "micro-saas").
// We read the file as text and extract template with a regex so we don't need
// to load TypeScript or resolve @landing-kit/core (jiti would parse the whole dep tree).
// Any template name is allowed; "default" maps to the package main, others to @landing-kit/templates/<name>.
// -------------------------------------------------------------------
function getTemplateFromConfig(projectRoot) {
  try {
    const configPath = join(projectRoot, "landing.config.ts");
    if (!existsSync(configPath)) return "default";
    const content = readFileSync(configPath, "utf8");
    const m = content.match(/template\s*:\s*["']([a-zA-Z0-9-]+)["']/);
    return m ? m[1] : "default";
  } catch {
    return "default";
  }
}

function getTemplateImportPath(template) {
  if (template === "default") return "@landing-kit/templates";
  return `@landing-kit/templates/${template}`;
}

// -------------------------------------------------------------------
// Generates the app under <pkgDir>/.generated/app, then either symlinks
// project root app -> it (scaffolded project) or writes into project root app
// (monorepo) because Next.js fails to resolve _not-found when app is a symlink.
// -------------------------------------------------------------------
function generateApp(projectRoot, pkgDir) {
  const generatedAppDir = join(pkgDir, ".generated", "app");
  const slugDir = join(generatedAppDir, "[[...slug]]");

  mkdirSync(slugDir, { recursive: true });

  const template = getTemplateFromConfig(projectRoot);
  const templateImport = getTemplateImportPath(template);
  let layoutContent = readFileSync(
    join(pkgDir, "templates", "layout.tsx"),
    "utf8",
  );
  layoutContent = layoutContent.replace(
    /import "@landing-kit\/templates";/,
    `import "${templateImport}";`,
  );
  const hasCustomStyle = existsSync(join(projectRoot, "public", "style.css"));
  layoutContent = layoutContent.replace(
    /__HAS_CUSTOM_STYLE__/g,
    String(hasCustomStyle),
  );

  // app/layout.tsx
  writeFileSync(join(generatedAppDir, "layout.tsx"), layoutContent);

  // app/[[...slug]]/page.tsx
  writeFileSync(
    join(slugDir, "page.tsx"),
    readFileSync(join(pkgDir, "templates", "page.tsx"), "utf8"),
  );

  // app/not-found.tsx
  writeFileSync(
    join(generatedAppDir, "not-found.tsx"),
    readFileSync(join(pkgDir, "templates", "not-found.tsx"), "utf8"),
  );

  // app/sitemap.ts
  writeFileSync(
    join(generatedAppDir, "sitemap.ts"),
    readFileSync(join(pkgDir, "templates", "sitemap.ts"), "utf8"),
  );

  // app/robots.ts
  writeFileSync(
    join(generatedAppDir, "robots.ts"),
    readFileSync(join(pkgDir, "templates", "robots.ts"), "utf8"),
  );

  // Next.js fails to resolve _not-found when app is a symlink, so we always copy
  // .generated/app to project root app/ so the build works. The canonical app lives under the package.
  const appPath = join(projectRoot, "app");
  if (existsSync(appPath)) rmSync(appPath, { recursive: true, force: true });
  cpSync(generatedAppDir, appPath, { recursive: true });
}
