import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { useStore } from "@/lib/ggs/mockStore";
import { Pill } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/ai-models")({
  head: () => ({ meta: [{ title: "AI Models - GGS" }] }),
  component: AiModels,
});

function AiModels() {
  const models = useStore((s) => s.aiModels);
  const agents = useStore((s) => s.agents);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Agentic framework</p>
          <h1 className="font-display text-4xl mt-1">AI models</h1>
          <p className="text-muted-foreground mt-1">All models exposed through the Lovable AI Gateway. Each agent picks a primary and a fallback.</p>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase tracking-wider bg-secondary">
              <tr>
                <th className="text-left px-4 py-3">Model</th>
                <th className="text-left">Provider</th>
                <th className="text-right">Context</th>
                <th className="text-right">$ / 1k in</th>
                <th className="text-right">$ / 1k out</th>
                <th className="text-left pl-6">Default for</th>
                <th className="text-left pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => {
                const defaultsFor = agents.filter((a) => a.model === m.id).map((a) => a.name);
                return (
                  <tr key={m.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <div className="font-medium">{m.name}</div>
                      <div className="font-mono text-[11px] text-muted-foreground">{m.id}</div>
                    </td>
                    <td>{m.provider}</td>
                    <td className="text-right tabular-nums">{(m.context_window / 1000).toLocaleString()}k</td>
                    <td className="text-right tabular-nums">${m.cost_per_1k_in.toFixed(5)}</td>
                    <td className="text-right tabular-nums">${m.cost_per_1k_out.toFixed(5)}</td>
                    <td className="pl-6">
                      <div className="flex flex-wrap gap-1">
                        {defaultsFor.length ? defaultsFor.map((n) => <Pill key={n} tone="info">{n}</Pill>) : <span className="text-muted-foreground text-xs">-</span>}
                      </div>
                    </td>
                    <td className="pr-4"><Pill tone={m.enabled ? "ok" : "muted"}>{m.enabled ? "enabled" : "disabled"}</Pill></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-secondary border border-border rounded-xl p-5 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Routing strategy:</strong> Each agent has a primary model and an optional fallback. If the primary returns a 429 (rate limit) or 5xx, the gateway transparently retries on the fallback. All requests are logged with model, latency, and cost.</p>
        </div>
      </div>
    </AdminShell>
  );
}
