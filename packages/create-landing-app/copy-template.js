#!/usr/bin/env node
const { cpSync, rmSync, existsSync } = require("fs");
const { join } = require("path");

const pkgDir = __dirname;
const src = join(pkgDir, "..", "..", "template");
const dest = join(pkgDir, "template");

if (!existsSync(src)) {
  console.error("copy-template.js: template not found at", src);
  process.exit(1);
}

if (existsSync(dest)) rmSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
