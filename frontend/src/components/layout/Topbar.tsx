"use client";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

export default function Topbar() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-background/80 backdrop-blur">
      <div>
        <div className="text-sm font-medium">UPI Expense Analyzer</div>
        <div className="text-xs text-muted-foreground">
          Upload → Categorize → Insights
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="outline" size="sm">
          Help
        </Button>
      </div>
    </header>
  );
}