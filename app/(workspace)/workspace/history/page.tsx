import RequireRole from "@/components/auth/RequireRole";

const rows = [
  { id: "1", file: "invoice_q4.pdf", date: "Oct 24, 2023", status: "Complete" },
  { id: "2", file: "scan_001.png", date: "Oct 22, 2023", status: "Complete" },
  { id: "3", file: "contract_draft.pdf", date: "Oct 20, 2023", status: "Failed" },
];

export default function ExtractionHistoryPage() {
  return (
    <RequireRole
      allowedRoles={["ADMIN", "USER"]}
      redirectTo={{ whenMissingOrWrong: "/login" }}
    >
      <div className="flex-1">
        <div className="border-b border-slate-200 bg-white px-6 py-3">
          <p className="text-sm text-slate-500">Past runs</p>
        </div>
        <main className="p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-900">Extraction History</h1>
          <p className="mt-2 text-sm text-slate-600">
            Review previous OCR jobs and outputs.
          </p>
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3">File</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-medium text-slate-900">{r.file}</td>
                    <td className="px-5 py-3 text-slate-600">{r.date}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          r.status === "Complete"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </RequireRole>
  );
}
