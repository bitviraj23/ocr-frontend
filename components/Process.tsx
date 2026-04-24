export default function Process() {
  const steps = ["Document Ingestion", "AI Processing", "Data Output"];

  return (
    <section id="process" className="bg-slate-100 py-24 text-center text-slate-900">
      <h2 className="text-3xl font-bold md:text-4xl">
        Ingest. Process. Deliver.
      </h2>

      <div className="mx-auto mt-12 grid max-w-6xl gap-10 px-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step} className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-blue-100" />
            <h3 className="font-semibold">
              {i + 1}. {step}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              AI automatically extracts and processes structured data.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}