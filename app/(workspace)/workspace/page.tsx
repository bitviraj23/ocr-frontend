import Link from "next/link";
import RequireRole from "@/components/auth/RequireRole";

export default function WorkspaceDashboardPage() {
  return (
    <RequireRole
      allowedRoles={["ADMIN", "USER"]}
      redirectTo={{ whenMissingOrWrong: "/login" }}
    >
      <div className="flex-1">
        <div className="border-b border-slate-200 bg-white px-6 py-3">
          <p className="text-sm text-slate-500">Workspace overview</p>
        </div>
        <main className="p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">
            High-level status for your extraction pipeline.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Documents this month", value: "1,248" },
              { label: "Avg. confidence", value: "99.2%" },
              { label: "Pending review", value: "3" },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-medium text-slate-500">{c.label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{c.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-600">
            Go to{" "}
            <Link
              href="/workspace/files"
              className="font-semibold text-blue-600 hover:underline"
            >
              Files
            </Link>{" "}
            to start a new extraction.
          </p>
        </main>
      </div>
    </RequireRole>
  );
}
