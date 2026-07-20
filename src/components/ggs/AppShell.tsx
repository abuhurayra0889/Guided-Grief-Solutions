import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, MessageCircle, NotebookPen, LogOut, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/ggs/useAuth";
import { DemoBadge } from "@/components/ggs/DemoBadge";

const items = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { to: "/navigator", label: "Navigator", icon: MessageCircle, exact: true },
  { to: "/navigator/rag-agent", label: "RAG Agent", icon: Sparkles },
  { to: "/journal", label: "My Journal", icon: NotebookPen },
];

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { profile, isAdmin, signOut } = useAuth();

  return (
    <div className="min-h-screen flex w-full bg-background">
      <aside className="w-64 shrink-0 border-r border-border bg-sidebar p-6 hidden md:flex flex-col gap-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-primary">
          <svg viewBox="0 0 64 32" className="w-11 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 28 L20 10 L32 22 L44 8 L60 28 Z" fill="currentColor" fillOpacity="0.18" />
            <path d="M4 28 L20 10 L32 22 L44 8 L60 28" />
          </svg>
          <span className="font-display text-xl text-foreground">GGS</span>
        </Link>
        <nav className="flex flex-col gap-1 flex-1">
          {items.map((it) => {
            const Icon = it.icon;
            const active = it.exact
              ? path === it.to
              : path === it.to || (it.to !== "/dashboard" && path.startsWith(it.to));
            return (
              <Link key={it.to} to={it.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  active ? "bg-sidebar-accent text-foreground font-medium" : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                }`}>
                <Icon className="h-4 w-4" /> {it.label}
              </Link>
            );
          })}
          {isAdmin && (
            <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground">
              <ShieldCheck className="h-4 w-4" /> Admin
            </Link>
          )}
        </nav>
        <div className="border-t border-border pt-4 space-y-3">
          {profile && (
            <div className="text-xs text-muted-foreground px-2">
              <div className="font-medium text-foreground truncate">{profile.full_name}</div>
              <div className="truncate">{profile.email}</div>
            </div>
          )}
          <button onClick={() => { signOut(); navigate({ to: "/" }); }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground w-full">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto p-6 md:p-10 fade-in">{children}</div>
      </main>
      <DemoBadge />
    </div>
  );
}
