import { fetchBillingOverview } from "@/lib/portal-api";
import { mockBilling } from "@/lib/portal-mock";
import RequireRole from "@/components/auth/RequireRole";
import BillingClient from "@/components/portal/BillingClient";

async function load() {
  try {
    return await fetchBillingOverview();
  } catch {
    return mockBilling;
  }
}

function formatInt(n: number) {
  return n.toLocaleString("en-US");
}

function UsageChart({ data }: { data: { month: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Usage Statistics</h3>
      <p className="mt-1 text-sm text-slate-500">Monthly document volume</p>
      <div className="mt-8 flex h-52 items-end justify-between gap-2 border-b border-slate-100 pb-2">
        {data.map((d) => {
          const h = Math.round((d.value / max) * 100);
          return (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full max-w-10 rounded-t-md bg-gradient-to-t from-blue-700 to-blue-400"
                style={{ height: `${h}%`, minHeight: "8px" }}
              />
              <span className="text-xs font-medium text-slate-500">{d.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <RequireRole allowedRoles={["ADMIN"]} redirectTo={{ whenMissingOrWrong: "/login" }}>
      <BillingClient />
    </RequireRole>
  );
}
