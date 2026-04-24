import type { Metadata } from "next";
import PortalShell from "@/components/portal/PortalShell";

export const metadata: Metadata = {
  title: "Fracto Portal",
};

export default function PortalGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PortalShell>{children}</PortalShell>;
}
