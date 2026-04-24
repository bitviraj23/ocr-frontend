export default function Pipeline() {
  return (
    <section id="pipeline" className="bg-white px-6 py-24 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 rounded-2xl bg-slate-50 p-10 shadow-sm md:flex-row">
        <div className="flex-1">
          <h2 className="text-3xl font-bold md:text-4xl">
            Total Visibility Into Your Data Pipeline
          </h2>

          <p className="mt-4 text-slate-600">
            Monitor document processing in real-time. Our intuitive dashboard
            provides deep insights into extraction performance.
          </p>

          <ul className="mt-6 space-y-3 text-slate-700">
            <li>✔ 99% extraction accuracy guaranteed</li>
            <li>✔ Reduce manual validation time by 80%</li>
            <li>✔ Automated exception routing workflows</li>
          </ul>
        </div>

        <div className="flex-1">
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="space-y-3">
              <div className="h-10 w-2/3 rounded bg-slate-200" />
              <div className="h-24 rounded bg-slate-100" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 rounded bg-blue-100" />
                <div className="h-16 rounded bg-indigo-100" />
              </div>
              <div className="h-24 rounded bg-slate-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}