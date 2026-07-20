import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { useStore } from "@/lib/ggs/mockStore";
import { Pill, StatusDot } from "@/components/ggs/Pill";
import { Server } from "lucide-react";

export const Route = createFileRoute("/admin/mcp-servers")({
  head: () => ({ meta: [{ title: "MCP Servers - GGS" }] }),
  component: McpServers,
});

function McpServers() {
  const servers = useStore((s) => s.mcpServers);
  const agents = useStore((s) => s.agents);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Agentic framework</p>
          <h1 className="font-display text-4xl mt-1">MCP servers</h1>
          <p className="text-muted-foreground mt-1">Model Context Protocol servers that expose tools to agents.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {servers.map((s) => (
            <div key={s.id} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-lg bg-secondary grid place-items-center shrink-0">
                    <Server className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-mono text-sm">{s.name}</h3>
                    <p className="font-mono text-[11px] text-muted-foreground truncate">{s.url}</p>
                  </div>
                </div>
                <Pill tone={s.status === "online" ? "ok" : s.status === "degraded" ? "warn" : "bad"}>
                  <StatusDot tone={s.status === "online" ? "ok" : s.status === "degraded" ? "warn" : "bad"} />
                  {s.status}
                </Pill>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="uppercase tracking-wider text-muted-foreground mb-1">Transport</div>
                  <Pill tone="info">{s.transport}</Pill>
                </div>
                <div>
                  <div className="uppercase tracking-wider text-muted-foreground mb-1">Last ping</div>
                  <div className="text-foreground tabular-nums">{new Date(s.last_ping).toLocaleTimeString()}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Tools exposed ({s.tools_exposed.length})</div>
                <div className="flex flex-wrap gap-1.5">
                  {s.tools_exposed.map((t) => (
                    <span key={t} className="font-mono text-[11px] px-2 py-0.5 rounded bg-secondary border border-border">{t}</span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Used by</div>
                <div className="flex flex-wrap gap-1.5">
                  {s.used_by.length === 0 && <span className="text-xs text-muted-foreground">- No agents attached</span>}
                  {s.used_by.map((id) => {
                    const a = agents.find((x) => x.id === id);
                    return a ? <Pill key={id} tone="muted">{a.emoji} {a.name}</Pill> : null;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
