import { apiRequest } from "@/lib/api";

export type DashboardStats = {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  walletBalance: number;
  walletCurrency?: string;
};

export type ChartPoint = { month: string; value: number };

export type ActivityItem = {
  id: string;
  title: string;
  timeAgo: string;
  type: "user" | "system" | "billing";
};

export type DashboardPayload = {
  stats: DashboardStats;
  chart: ChartPoint[];
  activity: ActivityItem[];
};

export type CompanyRow = {
  id: string;
  name: string;
  email: string;
  status: "Pending" | "Approved";
  joinedDate: string;
};

export type CompaniesListPayload = {
  items: CompanyRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type CreateCompanyPayload = {
  name: string;
  email: string;
  password: string;
};

/** GET /admin/dashboard or /dashboard/summary — adjust to your Nest controller */
export async function fetchDashboard(): Promise<DashboardPayload> {
  return apiRequest<DashboardPayload>("/admin/dashboard", { method: "GET" });
}

/** GET /companies — paginated list */
export async function fetchCompanies(params?: { page?: number; pageSize?: number }): Promise<CompaniesListPayload> {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.pageSize) search.set("pageSize", String(params.pageSize));
  const q = search.toString();
  
  // The backend might return an array if pagination isn't implemented there yet.
  const response = await apiRequest<any>(`/companies${q ? `?${q}` : ""}`, { method: "GET" });
  
  let rawItems = [];
  if (Array.isArray(response)) {
    rawItems = response;
  } else if (response && Array.isArray(response.items)) {
    rawItems = response.items;
  }

  const items: CompanyRow[] = rawItems.map((c: any) => ({
    id: c._id || c.id,
    name: c.name,
    email: c.email,
    status: c.isApproved ? "Approved" : "Pending",
    joinedDate: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
  }));

  return {
    items,
    total: items.length,
    page: params?.page || 1,
    pageSize: params?.pageSize || items.length || 10,
  };
}

/** POST /companies */
export async function createCompany(body: CreateCompanyPayload) {
  // Docs: Super-Admin forced-create a pre-approved company
  return apiRequest<{ id: string }>("/super-admin/companies", { method: "POST", body });
}

export async function approveCompany(companyId: string) {
  // Docs: POST /companies/approve/:id
  await apiRequest<void>(`/companies/approve/${encodeURIComponent(companyId)}`, {
    method: "POST",
  });
}
