import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/ggs/useAuth";
import { ShieldCheck, User } from "lucide-react";
import { DemoBadge } from "@/components/ggs/DemoBadge";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Enter Demo - GGS" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, signInAs } = useAuth();

  useEffect(() => { if (user) navigate({ to: "/dashboard" }); }, [user, navigate]);

  const enterAsUser = () => { signInAs("user"); navigate({ to: "/dashboard" }); };
  const enterAsAdmin = () => { signInAs("admin"); navigate({ to: "/admin" }); };

  return (
    <div className="min-h-screen grid place-items-center bg-secondary/40 p-6">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-10 fade-in shadow-sm">
        <Link to="/" className="flex items-center gap-2 mb-8 justify-center text-primary">
          <svg viewBox="0 0 64 32" className="w-12 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 28 L20 10 L32 22 L44 8 L60 28 Z" fill="currentColor" fillOpacity="0.18" />
            <path d="M4 28 L20 10 L32 22 L44 8 L60 28" />
          </svg>
        </Link>
        <h1 className="font-display text-3xl text-center">Welcome to the GGS demo</h1>
        <p className="text-muted-foreground text-center mt-3 text-sm leading-relaxed">
          This is a click-through prototype. Choose a role below to explore the experience - no account required.
        </p>

        <div className="mt-8 space-y-3">
          <button onClick={enterAsUser}
            className="w-full flex items-center gap-4 p-5 rounded-xl border border-border hover:border-primary/60 hover:bg-secondary/40 transition-colors text-left">
            <div className="h-11 w-11 rounded-full bg-primary/10 grid place-items-center text-primary"><User className="h-5 w-5" /></div>
            <div className="flex-1">
              <p className="font-display text-lg leading-tight">Enter as Sarah</p>
              <p className="text-xs text-muted-foreground">A widow in NJ, 47 days into her journey</p>
            </div>
          </button>
          <button onClick={enterAsAdmin}
            className="w-full flex items-center gap-4 p-5 rounded-xl border border-border hover:border-primary/60 hover:bg-secondary/40 transition-colors text-left">
            <div className="h-11 w-11 rounded-full bg-primary text-primary-foreground grid place-items-center"><ShieldCheck className="h-5 w-5" /></div>
            <div className="flex-1">
              <p className="font-display text-lg leading-tight">Enter as Admin</p>
              <p className="text-xs text-muted-foreground">GGS Control Tower - operations dashboard</p>
            </div>
          </button>
        </div>

        <p className="mt-8 text-[11px] text-muted-foreground text-center">
          Mock data only. Nothing is sent to a real database.
        </p>
      </div>
      <DemoBadge />
    </div>
  );
}
