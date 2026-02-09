import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  transpilePackages: ["@landing-kit/core", "@landing-kit/next"],
};

export default config;
