"use client";

import { useEffect, useState } from "react";
import { fetchBillingOverview, type BillingPayload } from "@/lib/portal-api";
import { mockBilling } from "@/lib/portal-mock";

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

export default function BillingClient() {
  const [data, setData] = useState<BillingPayload>(mockBilling);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetchBillingOverview();
        if (mounted) setData(res);
      } catch {
        if (mounted) setData(mockBilling);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="flex-1 overflow-auto p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Billing &amp; Usage</h1>
        <p className="mt-1 text-sm text-slate-500">Monitor spend, credits, and billing history in one place.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Documents processed</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatInt(data.summary.documentsProcessed)}
              </p>
            </div>
            <span className="rounded-lg bg-slate-100 p-2 text-slate-600">🗄</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Account balance</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                ${data.summary.balanceUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <span className="rounded-lg bg-blue-100 p-2 text-blue-700">M</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Credits remaining</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatInt(data.summary.creditsRemaining)}
              </p>
            </div>
            <span className="rounded-lg bg-indigo-100 p-2 text-indigo-700">D</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <UsageChart data={data.chart} />
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Usage leaderboard</h3>
          <ul className="mt-4 space-y-3">
            {data.leaderboard.map((row) => (
              <li
                key={row.id}
                className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
                    {row.name.slice(0, 1)}
                  </span>
                  <span className="truncate font-medium text-slate-900">{row.name}</span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-slate-600">
                  {formatInt(row.units)} units
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-4 w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            View all users
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Recent billing history</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Invoice</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80">
                  <td className="px-5 py-3 font-medium text-slate-900">{inv.invoiceLabel}</td>
                  <td className="px-5 py-3 text-slate-600">{inv.date}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        inv.status === "Paid"
                          ? "bg-blue-100 text-blue-800"
                          : inv.status === "Pending"
                            ? "bg-amber-100 text-amber-900"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-medium text-slate-900">{inv.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

