"use client";

import { useCallback, useEffect, useState } from "react";
import AddCompanyModal from "@/components/admin/AddCompanyModal";
import { approveCompany, fetchCompanies, type CompanyRow } from "@/lib/admin-api";
import { mockCompanies } from "@/lib/admin-mock";

export default function CompaniesPageClient() {
  const [rows, setRows] = useState<CompanyRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchCompanies({ page: 1, pageSize: 10 });
      setRows(res.items);
      setTotal(res.total);
    } catch (error: any) {
      alert(`Integration Error: ${error.message}`);
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const approvedCount = rows.filter((r) => r.status === "Approved").length;

  return (
    <>
      <main className="flex-1 p-6 md:p-8">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Company Management</h1>
            <p className="mt-1 text-sm text-slate-500">Manage organizations and access.</p>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            + Add New Company
          </button>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Companies</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{total.toLocaleString("en-US")}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Approved Companies</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{approvedCount}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Retention Rate</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">84%</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[84%] rounded-full bg-blue-600" />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Company List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3">Company Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Joined Date</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                      Loading…
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80">
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
                            {row.name.slice(0, 1)}
                          </span>
                          <span className="font-medium text-slate-900">{row.name}</span>
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-600">{row.email}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            row.status === "Approved"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-900"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-600">{row.joinedDate}</td>
                      <td className="px-5 py-3 text-right">
                        {row.status === "Pending" ? (
                          <button
                            type="button"
                            onClick={async () => {
                              try {
                                await approveCompany(row.id);
                                setRows((prev) =>
                                  prev.map((r) =>
                                    r.id === row.id ? { ...r, status: "Approved" } : r
                                  )
                                );
                              } catch {
                                // TODO: show toast/message
                              }
                            }}
                            className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-500"
                          >
                            Approve
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                          >
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-5 py-3 text-sm text-slate-500">
            <span>
              Showing 1 to {rows.length} of {total.toLocaleString("en-US")} entries
            </span>
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
        </div>
      </main>

      <AddCompanyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={(row) => {
          setRows((prev) => [row, ...prev]);
          setTotal((t) => t + 1);
        }}
      />
    </>
  );
}
