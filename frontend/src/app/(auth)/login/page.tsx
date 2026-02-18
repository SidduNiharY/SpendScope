"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";

import { loginApi } from "@/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const emailOk = useMemo(() => email.trim().length === 0 || isValidEmail(email.trim()), [email]);
  const canSubmit = useMemo(() => {
    const e = email.trim();
    const p = password.trim();
    return e.length > 0 && p.length > 0 && isValidEmail(e);
  }, [email, password]);

  const loginMut = useMutation({
    mutationFn: loginApi,
    onMutate: () => setFormError(null),
    onSuccess: () => {
      toast.success("Logged in ✅");
      router.replace("/upload");
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || "Login failed. Please try again.";
      setFormError(msg);
      toast.error(msg);
    },
  });

  function onSubmit() {
    if (!canSubmit || loginMut.isPending) return;
    loginMut.mutate({ email: email.trim(), password: password.trim() } as any);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
        <p className="text-sm text-muted-foreground">
          Sign in to access your dashboard and uploads.
        </p>
      </div>

      {formError && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm">
          <div className="font-medium text-destructive">Couldn’t sign you in</div>
          <div className="text-muted-foreground mt-1">{formError}</div>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="siddu@gmail.com"
              autoComplete="email"
              className="h-11 pl-10 rounded-xl bg-background/70 backdrop-blur border focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/30 transition"
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            />
          </div>
          {!emailOk && <p className="text-xs text-destructive">Please enter a valid email address.</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs text-primary hover:underline underline-offset-4">
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              className="h-11 pl-10 pr-16 rounded-xl bg-background/70 backdrop-blur border focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/30 transition"
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 transition"
            >
              {showPw ? (
                <span className="inline-flex items-center gap-1">
                  <EyeOff className="h-3.5 w-3.5" /> Hide
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" /> Show
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 accent-[hsl(var(--primary))]"
            />
            Remember me
          </label>
          <span className="text-xs text-muted-foreground">Secure cookie session</span>
        </div>

        <Button
          className="w-full h-11 rounded-xl text-base shadow-sm hover:shadow-md transition active:scale-[0.99] bg-foreground text-background hover:opacity-95"
          disabled={!canSubmit || loginMut.isPending}
          onClick={onSubmit}
        >
          {loginMut.isPending ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </Button>

        <div className="text-sm text-muted-foreground text-center">
          Don’t have an account?{" "}
          <Link className="text-primary font-medium hover:underline underline-offset-4" href="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}