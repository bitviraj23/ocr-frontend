import DashboardShell from "@/components/dashboard/DashboardShell";

const destinations = [
  {
    title: "ERP Systems",
    subtitle: "SAP, Oracle, Dynamics",
    action: "Configure",
    icon: "📊",
  },
  {
    title: "CRM Integration",
    subtitle: "Salesforce, HubSpot",
    action: "Configure",
    icon: "👥",
  },
  {
    title: "Custom Webhooks",
    subtitle: "JSON / POST",
    action: "Configure",
    icon: "🔗",
  },
  {
    title: "Direct Export",
    subtitle: "Excel, CSV, JSON",
    action: "Export",
    icon: "📤",
  },
];

const logs = [
  { dest: "SAP ERP", batch: "B-2023-1042", time: "Oct 21, 2023 — 14:22", status: "Success" },
  { dest: "SAP ERP", batch: "B-2023-1041", time: "Oct 21, 2023 — 11:05", status: "Success" },
  { dest: "Salesforce CRM", batch: "B-2023-1038", time: "Oct 20, 2023 — 16:40", status: "Success" },
  { dest: "SAP ERP", batch: "B-2023-1035", time: "Oct 20, 2023 — 09:12", status: "Success" },
];

export default function DeliveryPage() {
  return (
    <DashboardShell variant="dark">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-sky-300 md:text-3xl">Seamless Data Delivery</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              Automatically route your processed data to your favorite enterprise tools and exports.
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500"
          >
            + Add Destination
          </button>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <div
              key={d.title}
              className="relative rounded-2xl border border-white/10 bg-white p-5 shadow-xl"
            >
              <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              <div className="mb-3 text-2xl">{d.icon}</div>
              <h3 className="font-semibold text-slate-900">{d.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{d.subtitle}</p>
              <button
                type="button"
                className="mt-4 w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                {d.action}
              </button>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white p-6 shadow-xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Delivery Log</h2>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Refresh
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Export Log
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="pb-3 pr-4">Destination</th>
                  <th className="pb-3 pr-4">Batch ID</th>
                  <th className="pb-3 pr-4">Delivery time</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((row) => (
                  <tr key={`${row.batch}-${row.time}`} className="text-slate-800">
                    <td className="py-3 pr-4 font-medium">{row.dest}</td>
                    <td className="py-3 pr-4 font-mono text-slate-600">{row.batch}</td>
                    <td className="py-3 pr-4 text-slate-600">{row.time}</td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button type="button" className="text-sm font-medium text-blue-600 hover:underline">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm text-slate-500">
            <span>Displaying 1–4 of 45 deliveries</span>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
              >
                Previous
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
