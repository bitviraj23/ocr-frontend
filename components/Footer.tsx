export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 py-10 text-sm text-slate-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Fracto. All rights reserved.</p>
        <div className="flex flex-wrap gap-6">
          <a href="/super-admin/login" className="hover:text-white">
            Admin
          </a>
          <a href="/login" className="hover:text-white">
            Ingestion
          </a>
          <a href="/login" className="hover:text-white">
            Delivery
          </a>
          <a href="/login" className="hover:text-white">
            Billing
          </a>
          <a href="/login" className="hover:text-white">
            OCR Workspace
          </a>
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Terms
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}