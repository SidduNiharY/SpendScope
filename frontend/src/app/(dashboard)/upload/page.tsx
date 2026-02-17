"use client";

import { useMemo, useState } from "react";
import { UploadCloud, FileText, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const sizeText = useMemo(() => {
    if (!file) return "";
    const mb = file.size / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  }, [file]);

  async function mockUpload() {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }
    toast.info("Uploading (mock)…");
    setProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 120));
      setProgress(i);
    }
    toast.success("Upload complete ✅ (backend connect later)");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Upload UPI History</h1>
        <p className="text-sm text-muted-foreground">
          Upload CSV / Excel / PDF. We’ll connect this to the Spring Boot API later.
        </p>
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadCloud className="h-5 w-5" />
            Choose a file
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <label className="block cursor-pointer rounded-xl border bg-muted/30 p-6 hover:bg-muted/50 transition">
            <input
              type="file"
              accept=".csv,.xlsx,.xls,.pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <div className="flex items-center gap-3">
              <div className="rounded-lg border bg-background p-3">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">
                  {file ? file.name : "Click to select a file"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {file ? sizeText : "Max size depends on backend limits"}
                </div>
              </div>
            </div>
          </label>

          <div className="space-y-2">
            <Progress value={progress} />
            <div className="text-xs text-muted-foreground">{progress}%</div>
          </div>

          <div className="flex gap-2">
            <Button onClick={mockUpload}>Upload (Mock)</Button>
            <Button
              variant="outline"
              onClick={() => {
                setFile(null);
                setProgress(0);
                toast("Cleared.");
              }}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}