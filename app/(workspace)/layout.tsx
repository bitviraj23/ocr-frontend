import type { Metadata } from "next";
import FractoWorkspaceShell from "@/components/workspace/FractoWorkspaceShell";

export const metadata: Metadata = {
  title: "Fracto Workspace",
};

export default function WorkspaceGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <FractoWorkspaceShell>{children}</FractoWorkspaceShell>;
}
