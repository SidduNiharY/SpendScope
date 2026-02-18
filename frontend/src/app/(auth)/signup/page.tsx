"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail, Lock, User } from "lucide-react";

import { signupApi } from "@/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function passwordScore(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0..4
}

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);

  const nameOk = useMemo(() => name.trim().length === 0 || name.trim().length >= 2, [name]);
  const emailOk = useMemo(() => email.trim().length === 0 || isValidEmail(email.trim()), [email]);
  const pwScore = useMemo(() => passwordScore(password), [password]);
  const pwOk = useMemo(() => password.length === 0 || password.length >= 8, [password]);
  const confirmOk = useMemo(() => confirm.length === 0 || confirm === password, [confirm, password]);

  const canSubmit = useMemo(() => {
    const n = name.trim();
    const e = email.trim();
    return n.length >= 2 && isValidEmail(e) && password.length >= 8 && confirm === password;
  }, [name, email, password, confirm]);

  const signupMut = useMutation({
    mutationFn: signupApi,
    onMutate: () => setFormError(null),
    onSuccess: () => {
      toast.success("Account created ✅");
      router.replace("/login");
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || "Signup failed. Please try again.";
      setFormError(msg);
      toast.error(msg);
    },
  });

  function onSubmit() {
    if (!canSubmit || signupMut.isPending) return;
    signupMut.mutate({ fullName: name.trim(), email: email.trim(), password } as any);
  }

  const pwLabel = pwScore <= 1 ? "Weak" : pwScore === 2 ? "Okay" : pwScore === 3 ? "Good" : "Strong";

  return (
    <div className="space-y-4">
      {/* Header (compact) */}
      <div className="space-y-0.5">
        <h2 className="text-xl font-semibold tracking-tight">Create your account</h2>
        <p className="text-sm text-muted-foreground">
          Start tracking and categorizing your UPI spending.
        </p>
      </div>

      {/* Error (compact) */}
      {formError && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm">
          <div className="font-medium text-destructive">Couldn’t create account</div>
          <div className="text-muted-foreground mt-0.5">{formError}</div>
        </div>
      )}

      <div className="space-y-3">
        {/* Name + Email in one row on desktop */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Siddu"
                autoComplete="name"
                className="h-10 pl-10 rounded-xl bg-background/70 backdrop-blur border focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:border-primary/25 transition"
                onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              />
            </div>
            {!nameOk && <p className="text-[11px] text-destructive">At least 2 characters.</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="siddu@gmail.com"
                autoComplete="email"
                className="h-10 pl-10 rounded-xl bg-background/70 backdrop-blur border focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:border-primary/25 transition"
                onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              />
            </div>
            {!emailOk && <p className="text-[11px] text-destructive">Enter a valid email.</p>}
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPw ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              className="h-10 pl-10 pr-16 rounded-xl bg-background/70 backdrop-blur border focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:border-primary/25 transition"
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

          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground">8+ chars recommended.</p>
            <p className="text-[11px] text-muted-foreground">
              Strength: <span className="text-foreground font-medium">{pwLabel}</span>
            </p>
          </div>

          {!pwOk && <p className="text-[11px] text-destructive">Min 8 characters.</p>}

          {/* thinner bar */}
          <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(pwScore / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirm password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter password"
              autoComplete="new-password"
              className="h-10 pl-10 pr-16 rounded-xl bg-background/70 backdrop-blur border focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:border-primary/25 transition"
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 transition"
            >
              {showConfirm ? (
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
          {!confirmOk && <p className="text-[11px] text-destructive">Passwords don’t match.</p>}
        </div>

        {/* Submit */}
        <Button
          className="w-full h-10 rounded-xl text-sm shadow-sm hover:shadow-md transition active:scale-[0.99] bg-foreground text-background hover:opacity-95"
          disabled={!canSubmit || signupMut.isPending}
          onClick={onSubmit}
        >
          {signupMut.isPending ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </span>
          ) : (
            "Create account"
          )}
        </Button>

        <div className="text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <Link className="text-primary font-medium hover:underline underline-offset-4" href="/login">
            Sign in
          </Link>
        </div>

        <div className="text-[11px] text-muted-foreground text-center leading-relaxed">
          By creating an account, you agree to our Terms & Privacy Policy.
        </div>
      </div>
    </div>
  );
}