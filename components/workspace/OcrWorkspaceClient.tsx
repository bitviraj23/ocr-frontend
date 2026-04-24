"use client";

import { useCallback, useRef, useState } from "react";
import { extractTextFormData } from "@/lib/workspace-api";

const DEMO_TEXT = `INVOICE #INV-88421
Date: October 24, 2023
Client: Global Logistics Corp

Item Description          Qty   Unit    Price     Total
Cloud Compute Nodes          4   ea   $450.00  $1,800.00
Database Storage (TB)        2   TB   $200.00    $400.00
Network Security Firewall    1   ea   $850.00    $850.00

Subtotal:                                      $3,050.00
Tax (8.5%):                                     $259.25
Total Amount Due:                             $3,309.25`;

export default function OcrWorkspaceClient() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [stats, setStats] = useState({ chars: 0, words: 0, confidence: 99.4 });

  const onFile = useCallback((file: File | null) => {
    if (!file) return;
    setFileName(file.name);
    setError("");
    setResult(null);
  }, []);

  const extract = useCallback(async () => {
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const file = fileRef.current?.files?.[0];
      if (!file) {
        setError("Choose a file first.");
        setLoading(false);
        return;
      }
      const fd = new FormData();
      fd.append("file", file);
      const res = await extractTextFormData(fd);
      const text = res.text ?? "";
      setResult(text);
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      setStats({
        chars: text.length,
        words,
        confidence: res.confidence ?? 99.4,
      });
    } catch {
      setResult(DEMO_TEXT);
      setStats({ chars: DEMO_TEXT.length, words: DEMO_TEXT.trim().split(/\s+/).length, confidence: 99.4 });
      setError(
        "API unavailable — showing demo output. Wire NEXT_PUBLIC_API_URL to your Nest POST /usage/ocr endpoint."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex-1">
      <div className="border-b border-slate-200 bg-white px-6 py-3">
        <div className="relative max-w-xl">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="search"
            placeholder="Search"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none ring-blue-500 focus:ring-2"
          />
        </div>
      </div>

      <main className="p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Processing environment</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">OCR Workspace</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Upload high-resolution documents for precision structural extraction.
        </p>

        <section className="mt-8 rounded-2xl border-2 border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-slate-900">Drop your documents here</p>
          <p className="mt-2 text-sm text-slate-500">
            Supports PDF, JPG, PNG, and TIFF. High resolution recommended for complex data tables.
          </p>
          <label className="mt-6 inline-block">
            <span className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500">
              Browse Local Files
            </span>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.tiff,.tif"
              className="sr-only"
              onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            />
          </label>
          {fileName ? <p className="mt-3 text-sm text-slate-600">Selected: {fileName}</p> : null}
          <div className="mt-8 flex justify-center gap-4 text-2xl text-slate-400" aria-hidden>
            <span title="Image">🖼</span>
            <span title="PDF">📄</span>
            <span title="Document">📝</span>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">AI-Powered Extraction</h2>
              <p className="mt-2 max-w-xl text-sm text-blue-100">
                Our neural engine handles handwritten notes and complex financial grids with 99.8% accuracy.
              </p>
            </div>
            <span className="hidden text-5xl opacity-30 md:block" aria-hidden>
              ⚡
            </span>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => void extract()}
              disabled={loading}
              className="rounded-xl bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-blue-700 shadow-md hover:bg-blue-50 disabled:opacity-60"
            >
              {loading ? "Extracting…" : "🤖 Extract text"}
            </button>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-slate-900">Extraction Results</h2>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold uppercase text-blue-800">
                Ready
              </span>
            </div>
            <div className="flex gap-3 text-sm">
              <button
                type="button"
                className="font-medium text-blue-600 hover:underline"
                onClick={() => result && navigator.clipboard.writeText(result)}
              >
                Copy to Clipboard
              </button>
              <button type="button" className="text-slate-500 hover:text-slate-800" aria-label="Download">
                ⬇
              </button>
            </div>
          </div>
          {error ? <p className="mt-3 text-sm text-amber-700">{error}</p> : null}
          <pre className="mt-4 max-h-96 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-800 md:text-sm">
            {result ?? "Run extraction to see structured output here."}
          </pre>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <div className="flex flex-wrap gap-4">
              <span>Characters: {stats.chars}</span>
              <span>Words: {stats.words}</span>
              <span>Confidence: {stats.confidence}%</span>
            </div>
            <span className="flex items-center gap-1 font-medium text-slate-600">
              <span aria-hidden>✨</span> Auto-formatted
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
