import type { ReactNode } from "react";
import FractoWorkspaceSidebar from "@/components/workspace/FractoWorkspaceSidebar";

export default function FractoWorkspaceShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <FractoWorkspaceSidebar />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
