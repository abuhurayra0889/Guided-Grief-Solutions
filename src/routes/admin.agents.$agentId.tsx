import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/ggs/AdminShell";
import { useStore, store } from "@/lib/ggs/mockStore";
import { Pill, StatusDot } from "@/components/ggs/Pill";
import { ExecutionTrace } from "@/components/ggs/agents/ExecutionTrace";
import { ArrowLeft, Pause, Play } from "lucide-react";

export const Route = createFileRoute("/admin/agents/$agentId")({
  head: () => ({ meta: [{ title: "Agent - GGS Control Tower" }] }),
  component: AgentDetail,
  notFoundComponent: () => (
    <AdminShell><p>Agent not found. <Link to="/admin/agents" className="text-primary">Back to agents</Link></p></AdminShell>
  ),
});

type Tab = "overview" | "tools" | "knowledge" | "prompt" | "runs" | "execution";

function AgentDetail() {
  const { agentId } = Route.useParams();
  const agent = useStore((s) => s.agents.find((a) => a.id === agentId));
  const runs = useStore((s) => s.agentRuns.filter((r) => r.agent_id === agentId));
  const [tab, setTab] = useState<Tab>("overview");

  if (!agent) throw notFound();

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "tools", label: "Tools" },
    { id: "knowledge", label: "Knowledge" },
    { id: "prompt", label: "Prompt" },
    { id: "runs", label: `Runs (${runs.length})` },
    { id: "execution", label: "Live execution" },
  ];

  return (
    <AdminShell>
      <div className="space-y-6">
        <Link to="/admin/agents" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> All agents
        </Link>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="flex items-start gap-4 min-w-0">
              <div className="h-14 w-14 rounded-xl bg-secondary grid place-items-center text-2xl shrink-0">{agent.emoji}</div>
              <div className="min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="font-display text-3xl">{agent.name}</h1>
                  <Pill tone={agent.status === "active" ? "ok" : "muted"}>
                    <StatusDot tone={agent.status === "active" ? "ok" : "muted"} />{agent.status}
                  </Pill>
                </div>
                <p className="text-muted-foreground mt-1">{agent.role}</p>
                <p className="text-sm mt-3 max-w-2xl">{agent.description}</p>
              </div>
            </div>
            <button onClick={() => store.toggleAgentStatus(agent.id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-foreground hover:bg-muted text-sm">
              {agent.status === "active" ? <><Pause className="h-3.5 w-3.5" /> Pause</> : <><Play className="h-3.5 w-3.5" /> Activate</>}
            </button>
          </div>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-5 gap-4 border-t border-border pt-5">
            <Metric label="Model" value={agent.model} />
            <Metric label="Runs / 7d" value={agent.runs_7d.toLocaleString()} />
            <Metric label="Success" value={`${(agent.success_rate * 100).toFixed(1)}%`} />
            <Metric label="Avg latency" value={`${agent.avg_latency_ms}ms`} />
            <Metric label="Cost / 7d" value={`$${agent.cost_7d.toFixed(2)}`} />
          </div>
        </div>

        <div className="border-b border-border flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-sm border-b-2 -mb-px transition-colors whitespace-nowrap ${
                tab === t.id ? "border-primary text-foreground font-medium" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>{t.label}</button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="grid md:grid-cols-2 gap-5">
            <Card title="Personality">{agent.personality}</Card>
            <Card title="Owner">{agent.owner}</Card>
            <Card title="Fallback model">{agent.fallback_model || "-"}</Card>
            <Card title="Temperature">{agent.temperature}</Card>
          </div>
        )}

        {tab === "tools" && (
          <div className="space-y-3">
            {agent.tools.map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.description}</div>
                </div>
                <Pill tone="info">{t.type}</Pill>
              </div>
            ))}
          </div>
        )}

        {tab === "knowledge" && (
          <div className="space-y-3">
            {agent.knowledge_scopes.map((k) => (
              <div key={k} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                <span className="font-mono text-sm">{k}</span>
                <Pill tone="ok"><StatusDot tone="ok" /> attached</Pill>
              </div>
            ))}
          </div>
        )}

        {tab === "prompt" && (
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">System prompt</p>
            <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">{agent.system_prompt}</pre>
          </div>
        )}

        {tab === "runs" && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground uppercase tracking-wider bg-secondary">
                <tr>
                  <th className="text-left px-4 py-3">Started</th>
                  <th className="text-left">Trigger</th>
                  <th className="text-left">User</th>
                  <th className="text-right">Duration</th>
                  <th className="text-right">Tokens</th>
                  <th className="text-right pr-4">Cost</th>
                  <th className="text-left pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((r) => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="px-4 py-2.5 text-muted-foreground">{new Date(r.started_at).toLocaleString()}</td>
                    <td className="font-mono text-xs">{r.trigger}</td>
                    <td>{r.user || "-"}</td>
                    <td className="text-right tabular-nums">{r.duration_ms}ms</td>
                    <td className="text-right tabular-nums">{(r.tokens_in + r.tokens_out).toLocaleString()}</td>
                    <td className="text-right pr-4 tabular-nums">${r.cost_usd.toFixed(3)}</td>
                    <td className="pr-4"><Pill tone={r.status === "success" ? "ok" : r.status === "failed" ? "bad" : "info"}>{r.status}</Pill></td>
                  </tr>
                ))}
                {runs.length === 0 && <tr><td colSpan={7} className="text-center py-8 text-muted-foreground">No runs yet</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {tab === "execution" && <ExecutionTrace agentId={agent.id} />}
      </div>
    </AdminShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="text-sm font-medium tabular-nums mt-1 truncate">{value}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{title}</p>
      <div className="mt-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
