import type { PropsWithChildren, ReactElement } from "react";
import { LandingKit } from "@landing/next";

export default function Main({
  children,
}: PropsWithChildren): ReactElement {
  return <LandingKit>{children}</LandingKit>;
}
