import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { useStore, store } from "@/lib/ggs/mockStore";
import { Pill, StatusDot } from "@/components/ggs/Pill";
import { RefreshCw, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/knowledge-sources")({
  head: () => ({ meta: [{ title: "Knowledge Sources - GGS" }] }),
  component: KnowledgeSources,
});

function KnowledgeSources() {
  const sources = useStore((s) => s.knowledgeSources);
  const totalDocs = sources.reduce((s, x) => s + x.docs, 0);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Knowledge</p>
          <h1 className="font-display text-4xl mt-1">Sources</h1>
          <p className="text-muted-foreground mt-1">Curated, ingested, and indexed by the Knowledge Curator agent.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Stat label="Sources" value={sources.length.toString()} />
          <Stat label="Tier 1" value={sources.filter(s => s.tier === 1).length.toString()} hint="federal & state" />
          <Stat label="Indexed docs" value={totalDocs.toLocaleString()} />
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase tracking-wider bg-secondary">
              <tr>
                <th className="text-left px-4 py-3">Source</th>
                <th className="text-left">Type</th>
                <th className="text-left">Tier</th>
                <th className="text-right">Docs</th>
                <th className="text-left pl-6">Status</th>
                <th className="text-left">Last synced</th>
                <th className="text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="font-medium">{s.name}</div>
                    <a href={s.url} target="_blank" rel="noreferrer" className="text-[11px] text-muted-foreground hover:text-primary inline-flex items-center gap-1 truncate max-w-xs">
                      {s.url} <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td>{s.source_type}</td>
                  <td><Pill tone={s.tier === 1 ? "ok" : "muted"}>T{s.tier}</Pill></td>
                  <td className="text-right tabular-nums">{s.docs}</td>
                  <td className="pl-6">
                    <Pill tone={s.sync_status === "synced" ? "ok" : s.sync_status === "syncing" ? "info" : "bad"}>
                      <StatusDot tone={s.sync_status === "synced" ? "ok" : s.sync_status === "syncing" ? "info" : "bad"} />
                      {s.sync_status}
                    </Pill>
                  </td>
                  <td className="text-muted-foreground text-xs">{new Date(s.last_synced).toLocaleString()}</td>
                  <td className="text-right pr-4">
                    <button onClick={() => { store.resyncSource(s.id); toast.success(`Re-syncing ${s.name}`); }}
                      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-secondary hover:bg-muted">
                      <RefreshCw className="h-3 w-3" /> Re-sync
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="font-display text-3xl mt-2 tabular-nums">{value}</div>
      {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
    </div>
  );
}
