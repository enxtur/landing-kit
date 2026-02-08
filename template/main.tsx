import { LandingKit } from "@landing/next";

export default function Main({
  children,
}: { children: React.ReactNode }): React.ReactElement {
  return <LandingKit>{children}</LandingKit>;
}
