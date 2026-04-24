import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-slate-950 px-6 py-24">
      <div className="mx-auto max-w-6xl rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 py-16 text-center text-white">
        <h2 className="text-3xl font-bold md:text-4xl">
          Reduce Manual Entry by 90%
        </h2>

        <p className="mt-4 text-blue-100/95">
          Join the world&apos;s most innovative teams and automate workflows today.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/signup" className="rounded-lg bg-white px-6 py-3 font-semibold text-slate-900">
            Start Free Trial
          </Link>

          <Link href="/login" className="rounded-lg border border-white px-6 py-3 font-semibold text-white">
            Talk to Sales
          </Link>
        </div>
      </div>
    </section>
  );
}