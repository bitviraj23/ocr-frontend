import type { ReactNode } from "react";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalTopBar from "@/components/portal/PortalTopBar";

export default function PortalShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <PortalSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <PortalTopBar />
        {children}
      </div>
    </div>
  );
}
