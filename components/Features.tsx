export default function Features() {
  const cards = [
    "Intelligent Data Extraction",
    "Automated Verification",
    "Seamless API Integration",
  ];

  return (
    <section id="features" className="bg-slate-100 px-6 py-24 text-slate-900">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="text-3xl font-bold md:text-4xl">
          Built for Enterprise-Grade Documentation
        </h2>

        <p className="mt-4 max-w-2xl text-slate-600">
          Our platform scales with your business, handling complex data extraction
          needs with unprecedented speed and precision.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((title) => (
            <div
              key={title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 h-10 w-10 rounded-lg bg-blue-100" />

              <h3 className="font-semibold text-lg">{title}</h3>

              <p className="mt-2 text-sm text-slate-600">
                Our advanced LLMs understand document context and extract data efficiently.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}