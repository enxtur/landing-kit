#!/usr/bin/env node
const {
  cpSync,
  mkdirSync,
  existsSync,
  rmSync,
  readdirSync,
  statSync,
} = require("fs");
const { join, dirname } = require("path");
const { execSync } = require("child_process");

const targetDir = process.argv[2] || "my-landing-site";
const bundled = join(__dirname, "template");
const monorepo = join(dirname(__dirname), "..", "template");
const templateDir = existsSync(bundled) ? bundled : monorepo;

function isDirEmpty(dir) {
  const entries = readdirSync(dir);
  return entries.length === 0 || entries.every((e) => e === ".git");
}

if (existsSync(targetDir)) {
  try {
    const stat = statSync(targetDir);
    if (!stat.isDirectory()) {
      console.error(`Error: ${targetDir} exists and is not a directory.`);
      process.exit(1);
    }
    if (!isDirEmpty(targetDir)) {
      console.error(`Error: ${targetDir} already exists and is not empty.`);
      process.exit(1);
    }
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
    // ENOENT: directory was removed between existsSync and statSync, treat as non-existent
  }
}

console.log(`Creating landing-kit site in ${targetDir}...`);
try {
  mkdirSync(targetDir, { recursive: true });
  execSync("git init", { cwd: targetDir, stdio: "inherit" });
  cpSync(templateDir, targetDir, { recursive: true });
  console.log("Installing dependencies...");
  execSync("npm install", { cwd: targetDir, stdio: "inherit" });
} catch (err) {
  if (existsSync(targetDir)) {
    rmSync(targetDir, { recursive: true, force: true });
    console.error(`Cleaned up ${targetDir} after error.`);
  }
  console.error(err.message || err);
  process.exit(1);
}
console.log(`Done. Run:\n  cd ${targetDir}\n  npm run dev`);
console.log("Then edit landing.config.ts and main.tsx.");
