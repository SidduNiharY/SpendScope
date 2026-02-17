import TransactionsTable from "@/components/tables/TransactionsTable";

export default function TransactionsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Transactions</h1>
        <p className="text-sm text-muted-foreground">
          View extracted transactions and predicted categories.
        </p>
      </div>
      <TransactionsTable />
    </div>
  );
}