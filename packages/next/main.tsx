import { LandingKit } from "./components/LandingKit";

export default function Main({
  children,
}: { children: React.ReactNode }): React.ReactElement {
  return <LandingKit>{children}</LandingKit>;
}
