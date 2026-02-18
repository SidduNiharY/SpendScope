"use client";

import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = pathname?.startsWith("/login") || pathname?.startsWith("/signup");

  return (
    // Full viewport height with stable header/footer
    <div className="min-h-dvh grid grid-rows-[auto_1fr_auto] bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-primary/8 via-background to-background" />
      <div className="absolute -z-20 top-[-260px] left-1/2 -translate-x-1/2 h-[520px] w-[900px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -z-20 bottom-[-320px] right-[-320px] h-[720px] w-[720px] rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute inset-0 -z-10 opacity-[0.16] [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)] bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:84px_84px]" />

      {/* HEADER (fixed in layout) */}
      <header className="border-b bg-background/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-foreground text-background flex items-center justify-center font-semibold shadow-sm">
              SS
            </div>
            <div className="leading-tight">
              <div className="font-semibold">SpendScope</div>
              <div className="text-xs text-muted-foreground">UPI Expense Analyzer</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <Link href="/features" className="hover:text-foreground transition">Features</Link>
            <Link href="/pricing" className="hover:text-foreground transition">Pricing</Link>
            <Link href="/support" className="hover:text-foreground transition">Support</Link>
          </nav>

          <div className="flex items-center gap-2">
            {!isAuth && (
              <Link
                href="/upload"
                className="hidden sm:inline-flex rounded-xl px-4 py-2 text-sm font-medium bg-foreground text-background shadow-sm hover:opacity-90 transition"
              >
                Dashboard
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* MAIN (this is the only scroll area if needed) */}
      <main className="overflow-y-auto">
        {children}
      </main>

      {/* FOOTER (fixed in layout) */}
      <footer className="border-t bg-background/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SpendScope. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition">Terms</Link>
            <Link href="/contact" className="hover:text-foreground transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}