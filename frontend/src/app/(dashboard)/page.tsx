import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>Total Spend</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">₹ —</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Top Category</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">—</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Top Merchant</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">—</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Upload a UPI history file to see charts and categorized transactions.
        </CardContent>
      </Card>
    </div>
  );
}