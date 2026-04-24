import type {
  ActivityItem,
  ChartPoint,
  CompanyRow,
  DashboardPayload,
  DashboardStats,
} from "@/lib/admin-api";

export const mockDashboardStats: DashboardStats = {
  totalUsers: 12482,
  activeUsers: 84103,
  totalRevenue: 45920,
  walletBalance: 42.88,
  walletCurrency: "₹",
};

export const mockChart: ChartPoint[] = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 55 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 70 },
  { month: "May", value: 62 },
  { month: "Jun", value: 85 },
  { month: "Jul", value: 92 },
];

export const mockActivity: ActivityItem[] = [
  { id: "1", title: "New user registered", timeAgo: "2 mins ago", type: "user" },
  { id: "2", title: "Data backup completed", timeAgo: "15 mins ago", type: "system" },
  { id: "3", title: "Invoice paid — Acme Ltd", timeAgo: "1 hour ago", type: "billing" },
  { id: "4", title: "Company profile updated", timeAgo: "3 hours ago", type: "user" },
];

export function mockDashboardPayload(): DashboardPayload {
  return {
    stats: mockDashboardStats,
    chart: mockChart,
    activity: mockActivity,
  };
}

export const mockCompanies: CompanyRow[] = [
  {
    id: "1",
    name: "Software Marketing Ltd",
    email: "hello@softwaremarketing.com",
    status: "Approved",
    joinedDate: "Jan 12, 2023",
  },
  {
    id: "2",
    name: "Acme Corp",
    email: "contact@acme.com",
    status: "Approved",
    joinedDate: "Feb 3, 2023",
  },
  {
    id: "3",
    name: "Nexus Labs",
    email: "info@nexuslabs.io",
    status: "Pending",
    joinedDate: "Mar 18, 2023",
  },
];
