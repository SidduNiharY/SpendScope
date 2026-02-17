import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RulesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rules</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Create mappings like: “Maruti petrol bunk → Fuel”. (Next step we’ll add forms + API.)
      </CardContent>
    </Card>
  );
}