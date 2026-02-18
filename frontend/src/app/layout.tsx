import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/components/providers";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "SpendScope",
  description: "Upload UPI history, auto-categorize, and visualize spending.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}