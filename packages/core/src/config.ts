import type { SiteConfig } from "./types";

/**
 * Type-safe identity function for defining site configuration.
 * Use this in your site.config.ts for full type checking and editor support.
 */
export function defineSite(config: SiteConfig): SiteConfig {
  return config;
}
