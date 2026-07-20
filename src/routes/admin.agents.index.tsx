import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { useStore, store } from "@/lib/ggs/mockStore";
import { Pill, StatusDot } from "@/components/ggs/Pill";
import { Pause, Play } from "lucide-react";

export const Route = createFileRoute("/admin/agents/")({
  head: () => ({ meta: [{ title: "Agents - GGS Control Tower" }] }),
  component: AgentsList,
});

function AgentsList() {
  const agents = useStore((s) => s.agents);

  const grouped = {
    "user-facing": agents.filter((a) => a.category === "user-facing"),
    knowledge: agents.filter((a) => a.category === "knowledge"),
    ops: agents.filter((a) => a.category === "ops"),
  };

  return (
    <AdminShell>
      <div className="space-y-8">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Agentic framework</p>
            <h1 className="font-display text-4xl mt-1">Agents</h1>
            <p className="text-muted-foreground mt-1">Six purpose-built agents power the GGS experience end to end.</p>
          </div>
          <div className="flex gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-md bg-card border border-border">{agents.filter(a => a.status === "active").length} active</span>
            <span className="px-3 py-1.5 rounded-md bg-card border border-border tabular-nums">{agents.reduce((s, a) => s + a.runs_7d, 0)} runs / 7d</span>
            <span className="px-3 py-1.5 rounded-md bg-card border border-border tabular-nums">${agents.reduce((s, a) => s + a.cost_7d, 0).toFixed(2)} / 7d</span>
          </div>
        </div>

        {(["user-facing", "knowledge", "ops"] as const).map((cat) => (
          <section key={cat}>
            <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">{cat.replace("-", " ")}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {grouped[cat].map((a) => (
                <Link key={a.id} to="/admin/agents/$agentId" params={{ agentId: a.id }}
                  className="group bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="h-11 w-11 rounded-lg bg-secondary grid place-items-center text-xl shrink-0">{a.emoji}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-lg">{a.name}</h3>
                          <Pill tone={a.status === "active" ? "ok" : "muted"}>
                            <StatusDot tone={a.status === "active" ? "ok" : "muted"} />{a.status}
                          </Pill>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{a.role}</p>
                      </div>
                    </div>
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); store.toggleAgentStatus(a.id); }}
                      className="text-muted-foreground hover:text-foreground p-1.5 rounded hover:bg-secondary">
                      {a.status === "active" ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{a.description}</p>
                  <div className="mt-4 grid grid-cols-4 gap-3 text-center">
                    <Stat label="Model" value={a.model.split("/")[1].replace("gemini-", "")} />
                    <Stat label="Runs 7d" value={a.runs_7d.toString()} />
                    <Stat label="Success" value={`${(a.success_rate * 100).toFixed(1)}%`} />
                    <Stat label="Cost 7d" value={`$${a.cost_7d.toFixed(2)}`} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AdminShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm font-medium tabular-nums mt-0.5 truncate">{value}</div>
    </div>
  );
}
