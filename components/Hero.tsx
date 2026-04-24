import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -left-28 -top-20 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 py-24 md:flex-row">
        <div className="flex-1">
          <p className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
            AI Document Intelligence
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Unlock the Value <br />
            in Your Documents <br />
            with AI
          </h1>

          <p className="mt-6 max-w-xl text-slate-300">
            Reduce manual entry by 90% and achieve 99% extraction accuracy.
            Intelligently process any document type with our high-performance AI engine.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500"
            >
              Get Started Free
            </Link>

            <Link
              href="/login"
              className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Book a Demo
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <div className="h-8 w-8 rounded-full bg-slate-300" />
              <div className="h-8 w-8 rounded-full bg-slate-400" />
            </div>
            Trusted by 500+ global enterprises
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-xl rounded-2xl border border-white/15 bg-slate-900 p-5 shadow-2xl shadow-blue-900/20">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Live Dashboard</p>
              <span className="rounded bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300">Healthy</span>
            </div>
            <div className="space-y-3">
              <div className="h-16 rounded-lg bg-slate-800" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-20 rounded-lg bg-slate-800" />
                <div className="h-20 rounded-lg bg-slate-800" />
                <div className="h-20 rounded-lg bg-slate-800" />
              </div>
              <div className="h-36 rounded-lg bg-gradient-to-r from-blue-600/50 to-indigo-500/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}