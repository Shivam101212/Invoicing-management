import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-slate-100 to-white px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/70 px-4 py-1.5 text-xs font-semibold text-blue-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            TRUSTED BY 10K+ COMPANIES
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-slate-900">
            Precision Invoicing for Modern Teams
            
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500">
            Algobright simplifies complex billing workflows with{" "}
            <span className="text-blue-600">
              elegant, professional templates
            </span>{" "}
            and <span className="text-blue-600">real-time previews</span>. Built
            for teams that demand accuracy and speed.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
              View Demo
            </button>
          </div>
        </div>

        {/* Right: invoice mockup */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm -rotate-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl transition-transform duration-300 hover:rotate-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-900 text-sm font-bold text-white">
                  A
                </div>
                <p className="mt-2 text-xs font-medium text-slate-500">
                  Algobright Inc.
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">INVOICE</p>
                <p className="text-xs text-slate-400">#INV-2024-001</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="h-2.5 w-3/4 rounded-full bg-slate-200" />
              <div className="h-2.5 w-1/2 rounded-full bg-slate-200" />
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">
                  Design System Kit
                </span>
                <span className="font-semibold text-slate-900">$1,200.00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">
                  Cloud Hosting (Annual)
                </span>
                <span className="font-semibold text-slate-900">$450.00</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
              <span className="text-xs font-medium text-slate-400">
                Total Due
              </span>
              <span className="text-2xl font-bold text-slate-900">
                $1,650.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
