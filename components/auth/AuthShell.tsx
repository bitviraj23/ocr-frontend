import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  mode: "login" | "signup";
  children: ReactNode;
  showLeftPanel?: boolean;
};

function LeftPanel() {
  return (
    <aside className="hidden w-full max-w-sm border-r border-slate-200 bg-slate-50 p-10 md:block">
      <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
        New version 6.0
      </span>
      <h2 className="mt-8 text-4xl font-semibold leading-tight text-slate-900">
        Automate your <span className="text-blue-700">document workflows</span> with precision.
      </h2>
      <p className="mt-5 text-sm text-slate-600">
        Join over 5,000 companies using DocAuto AI to process invoices, contracts, and IDs in seconds.
      </p>
      <ul className="mt-8 space-y-3 text-sm text-slate-700">
        <li>99.9% extraction accuracy</li>
        <li>Enterprise-grade security</li>
        <li>Seamless ERP integrations</li>
      </ul>
    </aside>
  );
}

export default function AuthShell({
  mode,
  children,
  showLeftPanel = false,
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-center justify-between border-b border-slate-200 pb-4 text-sm">
          <nav className="hidden gap-6 text-slate-600 md:flex">
            <Link href="/">Product</Link>
            <Link href="/">Solutions</Link>
            <Link href="/">Pricing</Link>
          </nav>
          <div className="ml-auto text-slate-600">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href={mode === "login" ? "/signup" : "/login"}
              className="font-semibold text-slate-900"
            >
              {mode === "login" ? "Create an Account" : "Sign in"}
            </Link>
          </div>
        </header>

        <div className="mx-auto flex max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {showLeftPanel ? <LeftPanel /> : null}
          <section className="flex w-full items-center justify-center p-8 md:p-12">{children}</section>
        </div>
      </div>
    </main>
  );
}
