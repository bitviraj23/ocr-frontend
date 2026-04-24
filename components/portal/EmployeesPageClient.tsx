"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AddEmployeeModal from "@/components/portal/AddEmployeeModal";
import { approveEmployee, fetchEmployees, type EmployeeRow } from "@/lib/portal-api";
import { mockEmployees } from "@/lib/portal-mock";

export default function EmployeesPageClient() {
  const [rows, setRows] = useState<EmployeeRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchEmployees({ q: q || undefined, page, pageSize: 10 });
      setRows(res.items);
      setTotal(res.total);
    } catch {
      const filtered = mockEmployees.filter(
        (e) => !q || e.name.toLowerCase().includes(q.toLowerCase()) || e.role.toLowerCase().includes(q.toLowerCase())
      );
      setRows(filtered);
      setTotal(1284);
    } finally {
      setLoading(false);
    }
  }, [q, page]);

  useEffect(() => {
    void load();
  }, [load]);

  const newHires = useMemo(() => rows.filter((r) => r.status === "Pending").length, [rows]);

  async function handleApprove(id: string) {
    try {
      await approveEmployee(id);
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Active" as const } : r)));
    } catch {
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Active" as const } : r)));
    }
  }

  return (
    <>
      <main className="flex-1 overflow-auto p-6 md:p-8">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Employee Management</h1>
            <p className="mt-1 text-sm text-slate-500">Invite, approve, and manage your team.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
              <option>All roles</option>
              <option>Active</option>
              <option>Pending</option>
            </select>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Add Employee
            </button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Employees</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{total.toLocaleString("en-US")}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">New Hires</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{newHires}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search employees…"
              className="w-full max-w-sm rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-slate-500">
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
                      <td className="px-5 py-3 text-slate-600">{row.role}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            row.status === "Active"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-violet-100 text-violet-800"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button type="button" className="text-slate-500 hover:text-slate-800" aria-label="Edit">
                            ✎
                          </button>
                          {row.status === "Pending" ? (
                            <button
                              type="button"
                              onClick={() => void handleApprove(row.id)}
                              className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-500"
                            >
                              Approve
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-5 py-3 text-sm text-slate-500">
            <span>Page {page}</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded-lg text-sm font-medium ${
                    page === p ? "bg-blue-600 text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <AddEmployeeModal
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
