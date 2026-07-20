import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth, profileNeedsOnboarding } from "@/lib/ggs/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in - GGS" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, profile, loading, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: profileNeedsOnboarding(profile) ? "/onboarding" : "/dashboard" });
    }
  }, [user, profile, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        if (!fullName.trim()) {
          toast.error("Please enter your name.");
          return;
        }
        await signUp(email, password, fullName.trim());
        toast.success("Account created. Complete your profile next.");
        navigate({ to: "/onboarding" });
      } else {
        await signIn(email, password);
        toast.success("Welcome back.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-secondary/40 p-6">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-10 fade-in shadow-sm">
        <Link to="/" className="flex items-center gap-2 mb-8 justify-center text-primary">
          <svg viewBox="0 0 64 32" className="w-12 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 28 L20 10 L32 22 L44 8 L60 28 Z" fill="currentColor" fillOpacity="0.18" />
            <path d="M4 28 L20 10 L32 22 L44 8 L60 28" />
          </svg>
        </Link>
        <h1 className="font-display text-3xl text-center">{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
        <p className="text-muted-foreground text-center mt-3 text-sm leading-relaxed">
          {mode === "signin" ? "Sign in to continue your journey." : "A private space for your next steps after loss."}
        </p>

        <form onSubmit={submit} className="mt-8 space-y-3">
          {mode === "signup" && (
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              required
              className="w-full px-4 py-3 rounded-md border border-border bg-background"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-md border border-border bg-background"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-md border border-border bg-background"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full px-5 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark disabled:opacity-50"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-muted-foreground">
          {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-primary hover:underline"
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
