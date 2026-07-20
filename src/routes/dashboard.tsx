import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/ggs/useAuth";
import { AppShell } from "@/components/ggs/AppShell";
import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { store, useStore } from "@/lib/ggs/mockStore";
import { todayNudge } from "@/lib/ggs/agents";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Your Space - GGS" }] }),
  component: Dashboard,
});

const STAGE_LABELS: Record<string, string> = {
  just_happened: "Just happened",
  finding_footing: "Finding my footing",
  rebuilding: "Rebuilding",
  moving_forward: "Moving forward",
};

function Dashboard() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const actions = useStore((s) => s.actionItems);
  const entries = useStore((s) => s.journalEntries.slice(0, 2));
  const [quickQ, setQuickQ] = useState("");

  useEffect(() => { if (!loading && !user) navigate({ to: "/auth" }); }, [user, loading, navigate]);

  if (!profile) return <AppShell><p className="text-muted-foreground">Loading…</p></AppShell>;

  const top = actions.filter((a) => a.status !== "done").slice(0, 4).concat(actions.filter((a) => a.status === "done").slice(0, 1));
  const done = actions.filter((a) => a.status === "done").length;
  const pct = actions.length ? Math.round((done / actions.length) * 100) : 0;
  const days = Math.max(0, Math.floor((Date.now() - new Date(profile.loss_date).getTime()) / 86400000));

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="bg-card border border-border rounded-2xl p-7">
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <h1 className="font-display text-4xl mt-1">{profile.full_name.split(" ")[0]}.</h1>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-secondary text-foreground">{days} days since</span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary-dark">{STAGE_LABELS[profile.grief_stage]}</span>
            <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground">{profile.state_code}</span>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Your journey</span>
              <span className="text-foreground font-medium">{pct}% complete</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center shrink-0 text-base">🕊️</div>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-primary inline-flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> Today from your Navigator</p>
            <p className="mt-1.5 text-foreground leading-relaxed">{todayNudge.message}</p>
            <button onClick={() => navigate({ to: "/navigator", search: { q: todayNudge.cta } as any })}
              className="mt-3 text-sm text-primary hover:underline inline-flex items-center gap-1">
              {todayNudge.cta} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-7">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl">Your next steps</h2>
              <span className="text-xs text-muted-foreground">{done}/{actions.length}</span>
            </div>
            <ul className="space-y-3">
              {top.map((a) => (
                <li key={a.id} className="flex items-start gap-3">
                  <button onClick={() => store.toggleAction(a.id)}
                    className={`mt-0.5 h-5 w-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      a.status === "done" ? "bg-primary border-primary text-primary-foreground" : "border-border hover:border-primary"
                    }`}>
                    {a.status === "done" && <Check className="h-3.5 w-3.5" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${a.status === "done" ? "line-through text-muted-foreground" : "text-foreground"}`}>{a.title}</p>
                    <span className="text-[10px] uppercase tracking-wider text-primary/70">{a.category}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-2xl p-7">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl">Recent journal</h2>
              <Link to="/journal" className="text-sm text-primary hover:underline">Write today's entry →</Link>
            </div>
            <ul className="space-y-3">
              {entries.map((e) => (
                <li key={e.id} className="border-l-2 border-accent pl-3">
                  <p className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleDateString()} · {e.mood}</p>
                  <p className="text-sm text-foreground">{e.content.slice(0, 90)}{e.content.length > 90 ? "…" : ""}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-7">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center"><MessageCircle className="h-5 w-5" /></div>
            <div className="flex-1">
              <h2 className="font-display text-2xl">Ask your Navigator</h2>
              <p className="text-sm text-muted-foreground">Anything - benefits, probate, what to do next.</p>
              <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/navigator", search: { q: quickQ } as any }); }}
                className="mt-4 flex gap-2">
                <input value={quickQ} onChange={(e) => setQuickQ(e.target.value)} placeholder="What's on your mind?"
                  className="flex-1 px-4 py-3 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-ring" />
                <button className="px-4 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark inline-flex items-center gap-1">
                  Ask <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
