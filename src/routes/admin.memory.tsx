import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { useStore } from "@/lib/ggs/mockStore";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/memory")({
  head: () => ({ meta: [{ title: "Memory - GGS" }] }),
  component: Memory,
});

function Memory() {
  const namespaces = useStore((s) => s.memoryNamespaces);
  const retrievals = useStore((s) => s.memoryRetrievals);
  const agents = useStore((s) => s.agents);

  const totalVectors = namespaces.reduce((s, n) => s + n.vectors, 0);

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Agentic framework</p>
          <h1 className="font-display text-4xl mt-1">Memory & embeddings</h1>
          <p className="text-muted-foreground mt-1">Vector namespaces backing every agent's recall.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Stat label="Namespaces" value={namespaces.length.toString()} />
          <Stat label="Total vectors" value={totalVectors.toLocaleString()} />
          <Stat label="Embedding model" value="text-embedding-004" />
        </div>

        <section>
          <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Namespaces</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground uppercase tracking-wider bg-secondary">
                <tr>
                  <th className="text-left px-4 py-3">Namespace</th>
                  <th className="text-right">Vectors</th>
                  <th className="text-right">Dim</th>
                  <th className="text-left pl-6">Index</th>
                  <th className="text-left pr-4">Last updated</th>
                </tr>
              </thead>
              <tbody>
                {namespaces.map((n) => (
                  <tr key={n.id} className="border-t border-border">
                    <td className="px-4 py-3 font-mono text-xs">{n.name}</td>
                    <td className="text-right tabular-nums">{n.vectors.toLocaleString()}</td>
                    <td className="text-right tabular-nums">{n.dim}</td>
                    <td className="pl-6"><Pill tone="info">{n.index}</Pill></td>
                    <td className="text-muted-foreground pr-4">{new Date(n.last_updated).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Recent retrievals</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground uppercase tracking-wider bg-secondary">
                <tr>
                  <th className="text-left px-4 py-3">Time</th>
                  <th className="text-left">Agent</th>
                  <th className="text-left">Query</th>
                  <th className="text-left">Namespace</th>
                  <th className="text-right pr-4">Top score</th>
                </tr>
              </thead>
              <tbody>
                {retrievals.map((r) => {
                  const a = agents.find((x) => x.id === r.agent_id);
                  return (
                    <tr key={r.id} className="border-t border-border">
                      <td className="px-4 py-2.5 text-muted-foreground">{new Date(r.ts).toLocaleString()}</td>
                      <td>{a?.name || r.agent_id}</td>
                      <td className="font-mono text-xs">"{r.query}"</td>
                      <td className="font-mono text-xs text-muted-foreground">{r.namespace}</td>
                      <td className="text-right pr-4 tabular-nums">
                        <span className="inline-flex items-center gap-1.5">
                          <StatusDot tone={r.top_score > 0.85 ? "ok" : r.top_score > 0.75 ? "info" : "warn"} />
                          {r.top_score.toFixed(3)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="font-display text-2xl mt-2 tabular-nums truncate">{value}</div>
    </div>
  );
}
