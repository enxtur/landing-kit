import type { PropsWithChildren, ReactElement } from "react";
import { LandingKit } from "./components/LandingKit";

export default function Main({
  children,
}: PropsWithChildren): ReactElement {
  return <LandingKit>{children}</LandingKit>;
}
