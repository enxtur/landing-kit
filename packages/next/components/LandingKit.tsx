import * as React from "react";

/**
 * Wrapper component for the framework content. Use in your main.tsx:
 * `export default function Main({ children }) { return <LandingKit>{children}</LandingKit> }`
 */
export function LandingKit({
  children,
}: { children: React.ReactNode }): React.ReactElement {
  return <div className="lk-root">{children}</div>;
}
