export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    // Fill the MAIN area height
    <div className="h-full">
      {/* Center content vertically within main */}
      <div className="h-full flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-6xl">
          <div className="rounded-3xl border bg-background/60 backdrop-blur-xl shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* LEFT */}
              <section className="hidden lg:block p-10 border-r">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-sm shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Secure UPI insights
                  </div>

                  <div className="space-y-4">
                    <h1 className="text-4xl font-semibold tracking-tight leading-tight">
                      Understand your spending with{" "}
                      <span className="text-primary">clarity</span>.
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Upload your UPI history → auto-categorize → get charts, totals, and trends.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { t: "Upload", d: "CSV / Excel / PDF" },
                      { t: "Categorize", d: "AI + Rules" },
                      { t: "Insights", d: "Charts & totals" },
                    ].map((x) => (
                      <div key={x.t} className="rounded-2xl border bg-background/80 p-4 shadow-sm">
                        <div className="font-medium">{x.t}</div>
                        <div className="text-sm text-muted-foreground mt-1">{x.d}</div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border bg-background/70 p-4">
                    <div className="text-sm font-medium">Privacy-first by design</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Cookie-based sessions • No localStorage tokens • Minimal permissions
                    </div>
                  </div>
                </div>
              </section>

              {/* RIGHT */}
              <section className="p-6 sm:p-10 flex justify-center">
                <div className="w-full max-w-md">
                  <div className="rounded-3xl border bg-background/85 backdrop-blur-xl shadow-lg overflow-hidden">
                    <div className="h-1.5 bg-gradient-to-r from-primary/70 via-primary/30 to-transparent" />
                    <div className="p-7">{children}</div>
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground text-center">
                    Secure login • Cookie-based session • No localStorage tokens
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}