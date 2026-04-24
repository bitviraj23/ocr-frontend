import type {
  ApiKeyRow,
  BillingInvoice,
  BillingPayload,
  EmployeeRow,
  LeaderboardRow,
} from "@/lib/portal-api";

export const mockBilling: BillingPayload = {
  summary: {
    documentsProcessed: 842501,
    balanceUsd: 2450.0,
    creditsRemaining: 157499,
  },
  chart: [
    { month: "Jan", value: 32 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 38 },
    { month: "Apr", value: 52 },
    { month: "May", value: 48 },
    { month: "Jun", value: 61 },
  ],
  leaderboard: [
    { id: "1", name: "Alex Rivera", units: 1540 },
    { id: "2", name: "Jordan Lee", units: 1280 },
    { id: "3", name: "Sam Patel", units: 980 },
    { id: "4", name: "Taylor Chen", units: 842 },
  ],
  invoices: [
    { id: "inv-1", invoiceLabel: "INV-2024-001", date: "Oct 12, 2024", status: "Paid", amount: "$120.00" },
    { id: "inv-2", invoiceLabel: "INV-2024-002", date: "Sep 28, 2024", status: "Paid", amount: "$89.50" },
    { id: "inv-3", invoiceLabel: "INV-2024-003", date: "Sep 01, 2024", status: "Pending", amount: "$240.00" },
  ],
};

export const mockApiKeys: ApiKeyRow[] = [
  { id: "1", name: "Production", maskedKey: "sk_live_••••••••••••8f2a" },
  { id: "2", name: "Staging", maskedKey: "sk_test_••••••••••••4c91" },
  { id: "3", name: "Local dev", maskedKey: "sk_test_••••••••••••1b7e" },
];

export const mockEmployees: EmployeeRow[] = [
  { id: "1", name: "Morgan Blake", role: "Product Manager", status: "Active" },
  { id: "2", name: "Riley Stone", role: "Engineer", status: "Active" },
  { id: "3", name: "Casey Wu", role: "Designer", status: "Pending" },
  { id: "4", name: "Jamie Fox", role: "Analyst", status: "Active" },
];
