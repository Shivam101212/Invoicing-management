// app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@context/AuthContext";

export default function DashboardPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If someone isn't logged in and tries to visit this page directly,
    // send them back to the login screen.
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  // While the redirect check runs, don't flash the protected content
  if (!isLoggedIn) return null;

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Welcome to your Dashboard</h1>
        <p className="mt-2 text-sm text-slate-500">You're logged in. This page is protected.</p>
      </div>
    </section>
  );
}
