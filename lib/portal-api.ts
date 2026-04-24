import { apiRequest } from "@/lib/api";

export type BillingSummary = {
  documentsProcessed: number;
  balanceUsd: number;
  creditsRemaining: number;
};

export type BillingChartPoint = { month: string; value: number };

export type LeaderboardRow = { id: string; name: string; units: number; avatar?: string };

export type BillingInvoice = {
  id: string;
  invoiceLabel: string;
  date: string;
  status: "Paid" | "Pending" | "Failed";
  amount: string;
};

export type BillingPayload = {
  summary: BillingSummary;
  chart: BillingChartPoint[];
  leaderboard: LeaderboardRow[];
  invoices: BillingInvoice[];
};

export type ApiKeyRow = { id: string; name: string; maskedKey: string };

export type EmployeeRow = {
  id: string;
  name: string;
  role: string;
  status: "Active" | "Pending";
  avatar?: string;
};

export type EmployeesListPayload = {
  items: EmployeeRow[];
  total: number;
  page: number;
  pageSize: number;
};

/** GET /billing/overview — fetches dashboard + real invoices in parallel */
export async function fetchBillingOverview(): Promise<BillingPayload> {
  const [backendData, rawInvoices] = await Promise.all([
    apiRequest<any>("/usage/dashboard", { method: "GET" }),
    apiRequest<any[]>("/usage/invoices", { method: "GET" }).catch(() => []),
  ]);

  const summary: BillingSummary = {
    documentsProcessed: backendData.overall?.totalUnits || 0,
    balanceUsd: backendData.overall?.totalCost || 0,
    creditsRemaining: 10000 - (backendData.overall?.totalUnits || 0), // Mocked static credit allocation
  };

  const leaderboard: LeaderboardRow[] = (backendData.employees || []).map((emp: any) => ({
    id: emp._id,
    name: emp.name || emp.email || "Unknown User",
    units: emp.unitsUsed || 0,
  }));

  const chart: BillingChartPoint[] = [
    { month: "Jan", value: summary.documentsProcessed * 0.2 },
    { month: "Feb", value: summary.documentsProcessed * 0.4 },
    { month: "Mar", value: summary.documentsProcessed * 0.6 },
    { month: "Apr", value: summary.documentsProcessed },
  ];

  // Map real invoices from the backend; fall back to empty list if none yet
  const invoices: BillingInvoice[] = (rawInvoices || []).map((inv: any) => ({
    id: inv.id,
    invoiceLabel: inv.invoiceLabel,
    date: inv.date,
    status: (inv.status as BillingInvoice["status"]) ?? "Paid",
    amount: inv.amount,
  }));

  return { summary, chart, leaderboard, invoices };
}

/** GET /api-keys */
export async function fetchApiKeys() {
  return apiRequest<{ keys: ApiKeyRow[] }>("/api-keys", { method: "GET" });
}

export async function fetchEmployees(params?: { q?: string; page?: number; pageSize?: number }) {
  const search = new URLSearchParams();
  if (params?.q) search.set("q", params.q);
  if (params?.page) search.set("page", String(params.page));
  if (params?.pageSize) search.set("pageSize", String(params.pageSize));
  const q = search.toString();
  const raw = await apiRequest<any>(`/user${q ? `?${q}` : ""}`, { method: "GET" });

  // Backend returns { items: User[], total: number } with _id as Mongo ObjectId
  const items: EmployeeRow[] = (raw.items ?? []).map((u: any) => ({
    id: u._id?.toString() ?? u.id ?? crypto.randomUUID(),
    name: u.name ?? u.email ?? "Unknown",
    role: u.role ?? "Employee",
    status: u.isApproved ? "Active" : "Pending",
    avatar: u.avatar,
  }));

  return { items, total: raw.total ?? items.length, page: params?.page ?? 1, pageSize: params?.pageSize ?? 10 } as EmployeesListPayload;
}

export type CreateEmployeePayload = {
  name: string;
  email: string;
  role: string;
  password: string;
};

export async function createEmployee(body: CreateEmployeePayload) {
  // Docs: POST /user
  return apiRequest<{ id: string }>("/user", { method: "POST", body });
}

export async function approveEmployee(id: string) {
  // Docs: PATCH /user/approve/:id
  await apiRequest<Record<string, never> | null>(
    `/user/approve/${encodeURIComponent(id)}`,
    { method: "PATCH" }
  );
}
