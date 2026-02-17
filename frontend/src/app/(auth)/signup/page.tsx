"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/theme-toggle";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { signupApi } from "@/features/auth/auth.api";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupMut = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Account created ✅");
      router.push("/"); // or "/upload"
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed";
      toast.error(msg);
    },
  });

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-end mb-3">
        <ThemeToggle />
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <p className="text-sm text-muted-foreground">
            Start tracking and categorizing your UPI spending.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Siddu" />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="siddu@gmail.com" />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Create a password" />
          </div>

          <Button
            className="w-full"
            disabled={signupMut.isPending}
            onClick={() => signupMut.mutate({ name, email, password })}
          >
            {signupMut.isPending ? "Creating..." : "Create account"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link className="underline" href="/login">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}