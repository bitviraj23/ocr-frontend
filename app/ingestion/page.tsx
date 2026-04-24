import Link from "next/link";
import DashboardShell from "@/components/dashboard/DashboardShell";

const uploads = [
  {
    name: "Invoice_02_Amazon.pdf",
    source: "Email",
    sourceStyle: "bg-blue-100 text-blue-800",
    status: "Completed",
    statusDot: "bg-emerald-500",
    date: "Oct 21, 2023 — 11:32",
  },
  {
    name: "Inventory_Report.csv",
    source: "API",
    sourceStyle: "bg-violet-100 text-violet-800",
    status: "Completed",
    statusDot: "bg-emerald-500",
    date: "Oct 21, 2023 — 11:00",
  },
  {
    name: "Invoice_Scan_1234.png",
    source: "Direct Upload",
    sourceStyle: "bg-slate-200 text-slate-700",
    status: "Completed",
    statusDot: "bg-emerald-500",
    date: "Oct 20, 2023 — 15:45",
  },
  {
    name: "Expense_Draft_v2.docx",
    source: "API",
    sourceStyle: "bg-violet-100 text-violet-800",
    status: "Failed",
    statusDot: "bg-red-500",
    date: "Oct 20, 2023 — 10:15",
  },
];

export default function IngestionPage() {
  return (
    <DashboardShell variant="dark">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-sky-300 md:text-3xl">
            Ingestion: Connect Your Sources
          </h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            Choose a document source to begin automated processing and data extraction.
          </p>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white p-8 shadow-xl">
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-14 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-slate-900">Click or drag and drop to upload</p>
            <p className="mt-2 max-w-md text-sm text-slate-500">
              PDF, JPG, PNG, DOCX up to 20MB
            </p>
            <button
              type="button"
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500"
            >
              + Select File
            </button>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white p-6 shadow-xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-900">Recent Uploads</h2>
            <Link href="#" className="text-sm font-medium text-blue-600 hover:underline">
              View all records
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="pb-3 pr-4">File name</th>
                  <th className="pb-3 pr-4">Source</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Upload date</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {uploads.map((row) => (
                  <tr key={row.name} className="text-slate-800">
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-2">
                        <span className="text-slate-400">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                          </svg>
                        </span>
                        {row.name}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${row.sourceStyle}`}>
                        {row.source}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${row.statusDot}`} />
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-slate-600">{row.date}</td>
                    <td className="py-3 text-right">
                      <button type="button" className="text-slate-400 hover:text-slate-700" aria-label="More">
                        ⋮
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm text-slate-500">
            <span>Displaying 1–4 of 120 documents</span>
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
