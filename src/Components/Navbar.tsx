"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@context";

const NAV_LINKS = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleLogout() {
    logout();
    router.push("/"); // send them back to the homepage
  }

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center">
      <header
        className={`transition-all duration-300 ease-out border-b border-slate-200/60
          ${
            isScrolled
              ? "w-[80%] mt-4 rounded-full border bg-white/70 backdrop-blur-md shadow-sm"
              : "w-full bg-white"
          }`}
      >
        <nav className="flex items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="text-xl font-bold text-slate-900 tracking-tight"
          >
            Algobright
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }, index) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors ${
                    index === 0
                      ? "text-slate-900 underline underline-offset-4"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}
