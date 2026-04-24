import type { ReactNode } from "react";
import DashboardTopNav from "@/components/dashboard/DashboardTopNav";

type DashboardShellProps = {
  children: ReactNode;
  /** Dark navy background for ingestion & delivery; light gray for extraction */
  variant: "dark" | "light";
};

export default function DashboardShell({ children, variant }: DashboardShellProps) {
  const bg =
    variant === "dark"
      ? "min-h-screen bg-slate-950 text-slate-100"
      : "min-h-screen bg-slate-100 text-slate-900";

  return (
    <div className={`flex min-h-screen flex-col ${bg}`}>
      <DashboardTopNav />
      <div className="flex flex-1 flex-col px-4 py-6 md:px-8 md:py-8">{children}</div>
    </div>
  );
}
