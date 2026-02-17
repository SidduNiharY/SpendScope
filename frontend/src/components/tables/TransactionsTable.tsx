"use client";

import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Txn = {
  date: string;
  merchant: string;
  amount: number;
  category: string;
  confidence: number;
};

const demo: Txn[] = [
  { date: "2026-02-16", merchant: "Maruti petrol bunk", amount: 200, category: "Fuel", confidence: 0.88 },
  { date: "2026-02-15", merchant: "Venkata retail stores", amount: 500, category: "Groceries", confidence: 0.76 },
  { date: "2026-02-14", merchant: "Prasad's IMax", amount: 1000, category: "Movies", confidence: 0.92 },
];

export default function TransactionsTable() {
  const columns = useMemo<ColumnDef<Txn>[]>(
    () => [
      { accessorKey: "date", header: "Date" },
      { accessorKey: "merchant", header: "Merchant" },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => `₹${row.original.amount}`,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <Badge variant="secondary">{row.original.category}</Badge>,
      },
      {
        accessorKey: "confidence",
        header: "Confidence",
        cell: ({ row }) => `${Math.round(row.original.confidence * 100)}%`,
      },
    ],
    []
  );

  const table = useReactTable({
    data: demo,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((r) => (
              <TableRow key={r.id}>
                {r.getVisibleCells().map((c) => (
                  <TableCell key={c.id}>
                    {flexRender(c.column.columnDef.cell, c.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}