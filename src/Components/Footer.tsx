import { Globe, AtSign } from "lucide-react";

const FOOTER_LINKS = ["Product", "Pricing", "Security", "Contact", "Privacy Policy"];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        {/* Brand */}
        <div>
          <p className="text-lg font-bold text-slate-900">Algobright</p>
          <p className="mt-1 text-sm text-slate-500">
            © 2024 Algobright. Precision Invoicing.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-col items-center gap-3 sm:flex-row sm:gap-8">
          {FOOTER_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Globe className="h-5 w-5 text-slate-700" />
          <AtSign className="h-5 w-5 text-slate-700" />
        </div>
      </div>
    </footer>
  );
}
