import Link from "next/link";
import { notFound } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";

type PageProps = {
  params: Promise<{ id: string }>;
};

const fields = [
  { key: "vendor", label: "Vendor name", value: "Amazon Web Services", confidence: 98, border: "border-l-emerald-500" },
  { key: "invoice", label: "Invoice number", value: "INV-1234567", confidence: 95, border: "border-l-emerald-500" },
  { key: "date", label: "Invoice date", value: "2023-10-15", confidence: 85, border: "border-l-amber-400" },
  { key: "total", label: "Total amount", value: "$12,450.00", confidence: 92, border: "border-l-emerald-500" },
  { key: "tax", label: "Tax ID", value: "XX-XXXXXXX", confidence: 99, border: "border-l-emerald-500" },
];

export default async function ExtractionPage({ params }: PageProps) {
  const { id } = await params;
  if (!id) notFound();

  const displayId = decodeURIComponent(id);

  return (
    <DashboardShell variant="light">
      <div className="mx-auto w-full max-w-7xl">
        <nav className="mb-2 text-sm text-slate-500">
          <Link href="/ingestion" className="hover:text-slate-800">
            Extraction
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">Invoice #{displayId}</span>
        </nav>

        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-sky-700 md:text-3xl">AI-Powered Extraction</h1>
            <p className="mt-1 text-slate-600">Review and edit extracted data for accuracy.</p>
          </div>
          <button type="button" className="text-sm font-medium text-blue-600 hover:underline">
            View original document
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(280px,360px)]">
          <section className="flex min-h-[420px] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 px-3 py-2 text-slate-600">
              <button type="button" className="rounded p-1.5 hover:bg-slate-100" aria-label="Zoom out">
                −
              </button>
              <button type="button" className="rounded p-1.5 hover:bg-slate-100" aria-label="Zoom in">
                +
              </button>
              <span className="mx-2 text-sm text-slate-500">Page 1 of 1</span>
              <button type="button" className="ml-auto rounded p-1.5 hover:bg-slate-100" aria-label="Search in document">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <div className="relative flex flex-1 items-start justify-center bg-slate-50 p-6">
              <div className="relative w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-inner">
                <p className="text-xs font-semibold uppercase text-slate-400">Invoice</p>
                <p className="mt-2 text-lg font-bold text-slate-900">Amazon Web Services</p>
                <div className="absolute left-6 top-16 rounded border-2 border-blue-500/80 bg-blue-500/10 px-1 py-0.5 text-xs text-blue-800">
                  Vendor
                </div>
                <p className="mt-8 text-sm text-slate-600">Invoice #INV-1234567</p>
                <p className="mt-1 text-sm text-slate-600">Date: Oct 15, 2023</p>
                <div className="absolute bottom-20 right-8 rounded border-2 border-blue-500/80 bg-blue-500/10 px-1 py-0.5 text-xs text-blue-800">
                  Total
                </div>
                <p className="mt-6 text-2xl font-bold text-slate-900">$12,450.00</p>
              </div>
            </div>
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Extracted Fields</h2>
            <ul className="mt-4 space-y-4">
              {fields.map((f) => (
                <li
                  key={f.key}
                  className={`rounded-lg border border-slate-200 bg-slate-50/80 pl-3 ${f.border} border-l-4`}
                >
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {f.label}
                      </label>
                      <button type="button" className="text-slate-400 hover:text-slate-700" aria-label="Edit">
                        ✎
                      </button>
                    </div>
                    <input
                      type="text"
                      defaultValue={f.value}
                      className="mt-1 w-full rounded border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span
                      className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        f.confidence >= 90
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {f.confidence}% confidence
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Save changes
              </button>
            </div>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}
