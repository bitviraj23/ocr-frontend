"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { superAdminLogin } from "@/lib/auth-api";
import { ApiError } from "@/lib/api";
import { extractToken, setAuthState } from "@/lib/auth-storage";
import { useRouter } from "next/navigation";

export default function SuperAdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await superAdminLogin({ email, password });
      const token = extractToken(res);
      if (token) {
        const apiKey = res.apiKey ?? res.api_key ?? null;
        const apiSecret = res.apiSecret ?? res.api_secret ?? null;
        setAuthState({ token, role: "SUPER_ADMIN", apiKey, apiSecret });
        router.replace("/dashboard");
        return;
      }
      setSuccess("Super-admin login successful.");
    } catch (submitError) {
      if (submitError instanceof ApiError) {
        setError(submitError.message);
      } else {
        setError("Unable to sign in as super-admin.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <p className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-700">
        Restricted
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-slate-900">Super Admin Login</h1>
      <p className="mt-2 text-sm text-slate-500">
        Use elevated credentials to access platform-wide controls.
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Admin Email</span>
          <input
            type="email"
            placeholder="admin@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none ring-blue-500 focus:ring-2"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none ring-blue-500 focus:ring-2"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white transition hover:bg-red-500 disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign in as Super Admin"}
        </button>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {success ? <p className="text-sm text-emerald-600">{success}</p> : null}
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Standard user?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Go to login
        </Link>
      </p>
    </div>
  );
}
