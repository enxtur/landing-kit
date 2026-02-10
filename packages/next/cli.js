#!/usr/bin/env node
const { writeFileSync, readFileSync, mkdirSync, existsSync, rmSync, cpSync } = require("fs");
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
  console.error(error.message);
  process.exit(1);
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

  // app/layout.tsx
  writeFileSync(
    join(generatedAppDir, "layout.tsx"),
    readFileSync(join(pkgDir, "templates", "layout.tsx"), "utf8")
  );

  // app/[[...slug]]/page.tsx
  writeFileSync(
    join(slugDir, "page.tsx"),
    readFileSync(join(pkgDir, "templates", "page.tsx"), "utf8")
  );

  // app/not-found.tsx
  writeFileSync(
    join(generatedAppDir, "not-found.tsx"),
    readFileSync(join(pkgDir, "templates", "not-found.tsx"), "utf8")
  );

  // app/sitemap.ts
  writeFileSync(
    join(generatedAppDir, "sitemap.ts"),
    readFileSync(join(pkgDir, "templates", "sitemap.ts"), "utf8")
  );

  // app/robots.ts
  writeFileSync(
    join(generatedAppDir, "robots.ts"),
    readFileSync(join(pkgDir, "templates", "robots.ts"), "utf8")
  );

  // Next.js fails to resolve _not-found when app is a symlink, so we always copy
  // .generated/app to project root app/ so the build works. The canonical app lives under the package.
  const appPath = join(projectRoot, "app");
  if (existsSync(appPath)) rmSync(appPath, { recursive: true, force: true });
  cpSync(generatedAppDir, appPath, { recursive: true });
}
