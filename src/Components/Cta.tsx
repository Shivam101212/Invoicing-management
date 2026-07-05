export default function Cta() {
  return (
    <section className="bg-white px-6 py-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-20 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-slate-300 sm:text-4xl">
          Ready to transform your billing process?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-slate-500">
          Join thousands of modern teams using Algobright for error-free,
          professional invoicing.
        </p>
        <button className="mt-8 rounded-lg cursor-pointer bg-blue-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800">
          Create Your First Invoice
        </button>
      </div>
    </section>
  );
}
