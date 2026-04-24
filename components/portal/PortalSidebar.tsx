"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthState } from "@/lib/auth-storage";

const items = [
  { href: "/billing", label: "Billing", sub: "Usage & invoices" },
  { href: "/api-access", label: "API Keys", sub: "Access control" },
  { href: "/employees", label: "Employees", sub: "Team management" },
];

export default function PortalSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearAuthState();
    router.push("/login");
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-6">
        <Link href="/billing" className="text-lg font-bold tracking-tight text-slate-900">
          Fracto
        </Link>
        <p className="mt-1 text-xs text-slate-500">Organization portal</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2.5 transition-colors ${
                active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-xs text-slate-500">{item.sub}</p>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-100 px-3 py-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
