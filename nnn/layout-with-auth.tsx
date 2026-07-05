// app/layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        {/* Everything inside AuthProvider can now use the useAuth() hook */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
