import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, BookOpen, Globe, MessageSquare, Mail, ArrowLeft, LogOut,
  Bot, Cpu, BarChart3, Database, Plug, Server, Library, Inbox, Flag,
  ShieldCheck, ShieldAlert, FileText, GitBranch, FileEdit, Send, Calendar,
  TrendingUp, Layers, Filter, Sparkles, Activity,
  UserCog, KeyRound, Receipt, Bell, History,
} from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/ggs/useAuth";
import { DemoBadge } from "@/components/ggs/DemoBadge";

type Item = { to: string; label: string; icon: any; exact?: boolean };
type Group = { label: string; items: Item[] };

const groups: Group[] = [
  {
    label: "Operations",
    items: [
      { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
      { to: "/admin/users", label: "Users", icon: Users },
      { to: "/admin/email-captures", label: "Email captures", icon: Mail },
    ],
  },
  {
    label: "Conversations",
    items: [
      { to: "/admin/conversations", label: "Inbox", icon: Inbox, exact: true },
      { to: "/admin/conversations/flagged", label: "Flagged", icon: Flag },
    ],
  },
  {
    label: "Agentic framework",
    items: [
      { to: "/admin/agents", label: "Agents", icon: Bot },
      { to: "/admin/ai-models", label: "AI models", icon: Cpu },
      { to: "/admin/ai-usage", label: "AI usage", icon: BarChart3 },
      { to: "/admin/memory", label: "Memory", icon: Database },
    ],
  },
  {
    label: "Safety & Trust",
    items: [
      { to: "/admin/safety/guardrails", label: "Guardrails", icon: ShieldCheck },
      { to: "/admin/safety/escalations", label: "Escalations", icon: ShieldAlert },
      { to: "/admin/safety/audit-log", label: "Audit log", icon: FileText },
      { to: "/admin/safety/policies", label: "Policies", icon: GitBranch },
    ],
  },
  {
    label: "Content Studio",
    items: [
      { to: "/admin/content/articles", label: "Articles", icon: FileEdit, exact: true },
      { to: "/admin/journal-prompts", label: "Journal prompts", icon: MessageSquare },
      { to: "/admin/content/email-templates", label: "Email templates", icon: Send },
      { to: "/admin/content/calendar", label: "Calendar", icon: Calendar },
    ],
  },
  {
    label: "Insights",
    items: [
      { to: "/admin/insights", label: "Overview", icon: TrendingUp, exact: true },
      { to: "/admin/insights/cohorts", label: "Cohorts", icon: Layers },
      { to: "/admin/insights/funnel", label: "Funnel", icon: Filter },
      { to: "/admin/insights/themes", label: "Themes", icon: Sparkles },
      { to: "/admin/insights/sentiment", label: "Sentiment", icon: Activity },
    ],
  },
  {
    label: "Knowledge",
    items: [
      { to: "/admin/knowledge-base", label: "Knowledge base", icon: BookOpen },
      { to: "/admin/knowledge-sources", label: "Sources", icon: Library },
      { to: "/admin/url-monitor", label: "URL monitor", icon: Globe },
    ],
  },
  {
    label: "Integrations",
    items: [
      { to: "/admin/integrations", label: "Integrations", icon: Plug },
      { to: "/admin/mcp-servers", label: "MCP servers", icon: Server },
    ],
  },
  {
    label: "Ops Workbench",
    items: [
      { to: "/admin/ops/team", label: "Team", icon: UserCog },
      { to: "/admin/ops/roles", label: "Roles", icon: ShieldCheck },
      { to: "/admin/ops/billing", label: "Billing", icon: Receipt },
      { to: "/admin/ops/api-keys", label: "API keys", icon: KeyRound },
      { to: "/admin/ops/notifications", label: "Notifications", icon: Bell },
      { to: "/admin/ops/changelog", label: "Changelog", icon: History },
    ],
  },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { signOut } = useAuth();
  return (
    <div className="min-h-screen flex w-full bg-background">
      <aside className="w-64 shrink-0 border-r border-border bg-sidebar p-5 hidden md:flex flex-col gap-5 overflow-y-auto">
        <div className="flex items-center gap-2 text-primary px-1">
          <svg viewBox="0 0 64 32" className="w-11 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 28 L20 10 L32 22 L44 8 L60 28 Z" fill="currentColor" fillOpacity="0.18" />
            <path d="M4 28 L20 10 L32 22 L44 8 L60 28" />
          </svg>
          <div>
            <div className="font-display text-lg leading-none text-foreground">GGS</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Control Tower</div>
          </div>
        </div>
        <nav className="flex flex-col gap-4 flex-1">
          {groups.map((g) => (
            <div key={g.label}>
              <div className="px-3 mb-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">{g.label}</div>
              <div className="flex flex-col gap-0.5">
                {g.items.map((it) => {
                  const Icon = it.icon;
                  const active = it.exact ? path === it.to : path === it.to || path.startsWith(it.to + "/");
                  return (
                    <Link key={it.to} to={it.to}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        active ? "bg-sidebar-accent text-foreground font-medium" : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                      }`}>
                      <Icon className="h-4 w-4" /> {it.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="border-t border-border pt-4 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to app
          </Link>
          <button onClick={() => { signOut(); navigate({ to: "/" }); }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground w-full">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto p-6 md:p-10 fade-in">{children}</div>
      </main>
      <DemoBadge />
    </div>
  );
}
