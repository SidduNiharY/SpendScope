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
import { loginApi } from "@/features/auth/auth.api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMut = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.success("Logged in ✅");
      router.push("/"); // dashboard
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed";
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
          <CardTitle>Welcome back</CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in to continue to your dashboard.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="siddu@gmail.com" />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />
          </div>

          <Button
            className="w-full"
            disabled={loginMut.isPending}
            onClick={() => loginMut.mutate({ email, password })}
          >
            {loginMut.isPending ? "Signing in..." : "Sign in"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Don’t have an account?{" "}
            <Link className="underline" href="/signup">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}