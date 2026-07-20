import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminShell } from "@/components/ggs/AdminShell";
import { useStore } from "@/lib/ggs/mockStore";
import { seedUsageDaily } from "@/lib/ggs/agents";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/ai-usage")({
  head: () => ({ meta: [{ title: "AI Usage - GGS" }] }),
  component: AiUsage,
});

function AiUsage() {
  const agents = useStore((s) => s.agents);
  const [filter, setFilter] = useState<string>("all");

  const series = useMemo(() => {
    const days: Record<string, any> = {};
    for (const row of seedUsageDaily) {
      if (filter !== "all" && row.agent !== filter) continue;
      if (!days[row.date]) days[row.date] = { date: row.date.slice(5), requests: 0, tokens: 0, cost: 0 };
      days[row.date].requests += row.requests;
      days[row.date].tokens += row.tokens;
      days[row.date].cost += row.cost;
    }
    return Object.values(days);
  }, [filter]);

  const byAgent = useMemo(() => {
    const m: Record<string, { name: string; requests: number; cost: number }> = {};
    for (const r of seedUsageDaily) {
      const ag = agents.find((a) => a.id === r.agent);
      if (!ag) continue;
      if (!m[r.agent]) m[r.agent] = { name: ag.name, requests: 0, cost: 0 };
      m[r.agent].requests += r.requests;
      m[r.agent].cost += r.cost;
    }
    return Object.values(m);
  }, [agents]);

  const totals = series.reduce(
    (acc: any, d: any) => ({ requests: acc.requests + d.requests, tokens: acc.tokens + d.tokens, cost: acc.cost + d.cost }),
    { requests: 0, tokens: 0, cost: 0 },
  );

  return (
    <AdminShell>
      <div className="space-y-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Agentic framework</p>
            <h1 className="font-display text-4xl mt-1">AI usage</h1>
            <p className="text-muted-foreground mt-1">14-day rolling view across all agents.</p>
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-card border border-border rounded-md text-sm">
            <option value="all">All agents</option>
            {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Stat label="Requests" value={totals.requests.toLocaleString()} />
          <Stat label="Tokens" value={totals.tokens.toLocaleString()} />
          <Stat label="Spend" value={`$${totals.cost.toFixed(2)}`} />
        </div>

        <Card title="Requests per day">
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={series}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Line type="monotone" dataKey="requests" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-5">
          <Card title="Spend per day (USD)">
            <div style={{ width: "100%", height: 240 }}>
              <ResponsiveContainer>
                <BarChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  <Bar dataKey="cost" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Requests by agent (14d)">
            <div style={{ width: "100%", height: 240 }}>
              <ResponsiveContainer>
                <BarChart data={byAgent} layout="vertical" margin={{ left: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} width={120} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  <Bar dataKey="requests" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="font-display text-3xl mt-2 tabular-nums">{value}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">{title}</p>
      {children}
    </div>
  );
}
