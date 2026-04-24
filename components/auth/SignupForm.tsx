"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { ApiError } from "@/lib/api";
import { signupCompany } from "@/lib/auth-api";

export default function SignupForm() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!accepted) {
      setError("Please accept Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      await signupCompany({ companyName, email, password });
      setSuccess("Registration successful. Pending Super-Admin approval.");
    } catch (submitError) {
      if (submitError instanceof ApiError) {
        setError(submitError.message);
      } else {
        setError("Unable to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-semibold text-slate-900">Company registration</h1>
      <p className="mt-2 text-sm text-slate-500">
        Start automating your document workflows today with AI-powered efficiency.
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Company Name</span>
          <input
            type="text"
            placeholder="e.g. Acme Corp"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none ring-blue-500 focus:ring-2"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Business Email</span>
          <input
            type="email"
            placeholder="alex@company.com"
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

        <label className="flex items-start gap-2 text-xs text-slate-600">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300"
          />
          I agree to the <Link href="#" className="text-blue-600 hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-500"
        >
          {loading ? "Creating account..." : "Get Started"}
        </button>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {success ? <p className="text-sm text-emerald-600">{success}</p> : null}
      </form>

      <div className="mt-8 text-center text-[10px] tracking-[0.25em] text-slate-400">
        TRUSTED BY INDUSTRY LEADERS
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-slate-500">
        <span className="rounded bg-slate-100 py-1">Acme Corp</span>
        <span className="rounded bg-slate-100 py-1">Blue Ocean</span>
        <span className="rounded bg-slate-100 py-1">Nexus</span>
      </div>
    </div>
  );
}
