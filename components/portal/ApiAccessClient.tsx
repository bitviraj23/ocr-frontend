"use client";

import { useMemo, useState } from "react";
import { getAuthState } from "@/lib/auth-storage";

function maskSecret(secret: string) {
  if (secret.length <= 6) return "••••••";
  return `${secret.slice(0, 3)}${"•".repeat(Math.min(10, secret.length - 6))}${secret.slice(-2)}`;
}

export default function ApiAccessClient() {
  const auth = getAuthState();
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState<null | "key" | "secret">(null);

  const apiKey = auth.apiKey ?? "";
  const apiSecret = auth.apiSecret ?? "";

  const masked = useMemo(() => {
    if (!apiSecret) return "";
    return revealed ? apiSecret : maskSecret(apiSecret);
  }, [apiSecret, revealed]);

  async function copy(text: string, which: "key" | "secret") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      // ignore; clipboard permission issues
    }
  }

  return (
    <main className="flex-1 overflow-auto p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">API &amp; Access Control</h1>
        <p className="mt-1 text-sm text-slate-500">
          Your API credentials for service access. Keep these private.
        </p>
      </div>

      {!apiKey || !apiSecret ? (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">API credentials not found</h2>
          <p className="mt-2 text-sm text-slate-600">
            We didn&apos;t receive your API key/secret during login. Update the backend to return these values, or
            add a dedicated endpoint to fetch them.
          </p>
        </section>
      ) : (
        <>
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Authentication keys</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-600">x-api-key</p>
                    <p className="mt-1 font-mono text-sm text-slate-900">{apiKey}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void copy(apiKey, "key")}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {copied === "key" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-[220px]">
                    <p className="text-sm font-medium text-slate-600">x-api-secret</p>
                    <p className="mt-1 font-mono text-sm text-slate-900">{masked}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRevealed((v) => !v)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      {revealed ? "Hide" : "Reveal"}
                    </button>
                    <button
                      type="button"
                      onClick={() => void copy(apiSecret, "secret")}
                      disabled={!revealed}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
                      title={revealed ? "Copy secret" : "Reveal first"}
                    >
                      {copied === "secret" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div
            className="mt-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
            role="alert"
          >
            <span className="text-lg" aria-hidden>
              ⚠
            </span>
            <p>
              <strong>Security reminder:</strong> Treat API keys like passwords. Don&apos;t expose them in client code.
            </p>
          </div>
        </>
      )}
    </main>
  );
}

