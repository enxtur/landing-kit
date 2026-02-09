#!/usr/bin/env node
const { cpSync, mkdirSync, existsSync } = require("fs");
const { join, dirname } = require("path");
const { execSync } = require("child_process");

const targetDir = process.argv[2] || "my-landing-site";
const templateDir = join(dirname(__dirname), "..", "template");

if (existsSync(targetDir)) {
  console.error(`Error: ${targetDir} already exists.`);
  process.exit(1);
}

console.log(`Creating landing-kit site in ${targetDir}...`);
mkdirSync(targetDir, { recursive: true });
execSync("git init", { cwd: targetDir, stdio: "inherit" });
cpSync(templateDir, targetDir, { recursive: true });
console.log("Installing dependencies...");
execSync("npm install", { cwd: targetDir, stdio: "inherit" });
console.log(`Done. Run:\n  cd ${targetDir}\n  npm run dev`);
console.log("Then edit landing.config.ts and main.tsx.");
