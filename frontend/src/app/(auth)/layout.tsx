export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between p-10 border-r bg-muted/30">
        <div>
          <div className="text-xl font-semibold">UPI Expense Analyzer</div>
          <p className="text-sm text-muted-foreground mt-2">
            Upload UPI history → AI categorization → Insights dashboard.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          Prototype UI • Next.js + shadcn
        </div>
      </div>

      <div className="flex items-center justify-center p-6">{children}</div>
    </div>
  );
}