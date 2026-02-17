"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const nav = [
  { href: "/",
    label: "Dashboard" },
  { href: "/upload",
    label: "Upload" },
  { href: "/transactions",
    label: "Transactions" },
  { href: "/rules",
    label: "Rules" },
  { href: "/insights",
    label: "Insights" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-background p-4">
      <div className="text-lg font-semibold">UPI Expense</div>
      <div className="text-sm text-muted-foreground">Analyzer</div>
      <Separator className="my-4" />

      <nav className="space-y-1">
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "block rounded-md px-3 py-2 text-sm",
                active ? "bg-muted font-medium" : "hover:bg-muted/60",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Separator className="my-4" />
      <div className="text-xs text-muted-foreground">
        Prototype • Next.js + shadcn
      </div>
    </aside>
  );
}