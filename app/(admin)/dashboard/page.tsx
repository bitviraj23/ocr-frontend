import PlatformGrowthChart from "@/components/admin/PlatformGrowthChart";
import { fetchDashboard } from "@/lib/admin-api";
import { mockDashboardPayload } from "@/lib/admin-mock";
import RequireRole from "@/components/auth/RequireRole";

async function loadDashboard() {
  try {
    return await fetchDashboard();
  } catch {
    return mockDashboardPayload();
  }
}

function formatNum(n: number) {
  return n.toLocaleString("en-US");
}

export default async function GlobalDashboardPage() {
  const { stats, chart, activity } = await loadDashboard();
  const currency = stats.walletCurrency ?? "₹";

  return (
    <RequireRole
      allowedRoles={["SUPER_ADMIN"]}
      redirectTo={{ whenMissingOrWrong: "/super-admin/login" }}
    >
      <main className="flex-1 p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Global Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of platform usage and recent activity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Users</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{formatNum(stats.totalUsers)}</p>
                <p className="mt-1 text-xs font-medium text-emerald-600">+12% vs last month</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Active Users</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{formatNum(stats.activeUsers)}</p>
            <p className="mt-1 text-xs font-medium text-emerald-600">+8% vs last month</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Revenue</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{formatNum(stats.totalRevenue)}</p>
            <p className="mt-1 text-xs font-medium text-emerald-600">+5% vs last month</p>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-5 text-white shadow-sm">
            <p className="text-sm font-medium text-blue-100">Wallet</p>
            <p className="mt-2 text-2xl font-bold">
              {currency}
              {stats.walletBalance.toFixed(2)}
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-3/5 rounded-full bg-white/90" />
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-lg bg-white py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Top Up
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <PlatformGrowthChart data={chart} />
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
            <ul className="mt-4 space-y-4">
              {activity.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    {item.type === "user" ? "👤" : item.type === "billing" ? "💳" : "⚙️"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.timeAgo}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </RequireRole>
  );
}
