import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          Fracto
        </Link>

        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#pipeline" className="hover:text-white transition-colors">
            Pipeline
          </a>
          <a href="#process" className="hover:text-white transition-colors">
            Process
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white">
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Start Free
          </Link>
        </div>
      </nav>
    </header>
  );
}