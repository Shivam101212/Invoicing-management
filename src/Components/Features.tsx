import { FileEdit, Zap, ShieldCheck } from "lucide-react";

export default function Features() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            The Precise Billing Editor
          </h2>
          <p className="mt-3 text-slate-500">
            Craft every detail of your billing experience with tools designed for accuracy.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-12 space-y-6">
          {/* Row 1 — 65% / 35% */}
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Real-time Visual Editing */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:w-[65%]">
              <FileEdit className="h-6 w-6 text-blue-600" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Real-time Visual Editing
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                See exactly what your client sees. Our WYSIWYG editor allows you to
                adjust layouts, colors, and line items with instantaneous previews.
              </p>

              {/* Editor mockup — image placeholder */}
              <div className="mt-6 h-56 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <img
                  src="/images/editor-preview.png"
                  alt="Real-time visual editor preview"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Instant Exports */}
            <div className="rounded-2xl bg-slate-900 p-8 md:w-[35%]">
              <Zap className="h-6 w-6 text-slate-400" />
              <h3 className="mt-4 text-lg font-semibold text-white">Instant Exports</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Export to PDF, XML, or direct payment links in seconds. Standardized
                formats ensure global compliance.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["PDF", "e-Invoice", "UBL"].map((format) => (
                  <span
                    key={format}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 — 32% / 68% */}
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Audit Trails */}
            <div className="rounded-2xl bg-blue-100/60 p-8 md:w-[32%]">
              <ShieldCheck className="h-6 w-6 text-slate-700" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Audit Trails</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Every change is tracked. Maintain a cryptographic record of every
                invoice lifecycle for total tax compliance.
              </p>
            </div>

            {/* Global Compliance */}
            <div className="flex flex-col gap-6 rounded-2xl bg-slate-100 p-8 sm:flex-row sm:items-center md:w-[68%]">
              <div className="sm:w-1/2">
                <h3 className="text-lg font-semibold text-slate-900">Global Compliance</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Built-in VAT, GST, and Sales Tax calculation engines that update
                  based on regional laws automatically.
                </p>
                <a
                  href="#"
                  className="mt-3 inline-block text-sm font-medium text-slate-900 underline underline-offset-2"
                >
                  Learn about global standards
                </a>
              </div>

              {/* World map — image placeholder */}
              <div className="h-40 w-full overflow-hidden rounded-lg border border-slate-200 bg-white sm:w-1/2">
                <img
                  src="/images/global-compliance-map.png"
                  alt="Global compliance map"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
