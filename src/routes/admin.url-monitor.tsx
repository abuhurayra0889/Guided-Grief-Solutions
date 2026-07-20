import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/ggs/AdminShell";
import { toast } from "sonner";
import { useUrlMonitor, useUrlMonitorMutations } from "@/lib/ggs/queries";
import { RefreshCw } from "lucide-react";

export const Route = createFileRoute("/admin/url-monitor")({ component: UrlMonitor });

const FREQ = ["Daily", "Weekly", "Monthly", "Quarterly", "As needed"];
const STATUS_COLORS: Record<string, string> = {
  active: "bg-primary/15 text-primary-dark",
  pending: "bg-accent/30 text-accent-foreground",
  broken: "bg-destructive/15 text-destructive",
};

function UrlMonitor() {
  const { data: rows = [] } = useUrlMonitor();
  const { create, recheck } = useUrlMonitorMutations();
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "pending" | "broken">("all");
  const [form, setForm] = useState({
    url: "", source_type: "Federal Agency", jurisdiction: "Federal",
    topics: "", update_frequency: "Monthly", rss_available: false, rss_url: "",
    confidence: "high" as string, notes: "",
    status: "pending" as string,
  });

  const filtered = rows.filter((r) => statusFilter === "all" ? true : r.status === statusFilter);

  const submit = async () => {
    if (!form.url) return toast.error("URL is required.");
    try {
      await create.mutateAsync({
        url: form.url,
        source_type: form.source_type,
        jurisdiction: form.jurisdiction,
        topics: form.topics,
        update_frequency: form.update_frequency,
        rss_available: form.rss_available,
        rss_url: form.rss_url || null,
        confidence: form.confidence,
        notes: form.notes || null,
        status: form.status,
      });
      toast.success("Added to registry.");
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add URL.");
    }
  };

  const onRecheck = async (id: string) => {
    try {
      await recheck.mutateAsync(id);
      toast.success("Re-checked just now.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Recheck failed.");
    }
  };

  return (
    <AdminShell>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="font-display text-4xl">URL Monitor Registry</h1>
          <p className="text-muted-foreground">External sources feeding the monitoring pipeline.</p>
        </div>
        <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark">Add URL</button>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-sm text-foreground mb-5">
        This registry feeds the automated monitoring pipeline. URLs marked <span className="font-medium">Active</span> are checked on their scheduled frequency. <span className="font-medium">Broken</span> URLs are flagged for human review.
      </div>

      <div className="flex gap-2 mb-4">
        {(["all", "active", "pending", "broken"] as const).map((v) => (
          <button key={v} onClick={() => setStatusFilter(v)}
            className={`px-3 py-1.5 rounded-full text-sm border capitalize ${statusFilter === v ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"}`}>
            {v === "all" ? "All" : v}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[1000px]">
          <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
            <tr>{["URL", "Source", "Jurisdiction", "Topics", "Frequency", "RSS", "Status", "Confidence", "Last checked", "Actions"].map((h) =>
              <th key={h} className="text-left p-3 whitespace-nowrap">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-border align-top">
                <td className="p-3 max-w-[260px] truncate">
                  <a href={r.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{r.url}</a>
                  {r.notes && <p className="text-[11px] text-muted-foreground mt-1 whitespace-normal">{r.notes}</p>}
                </td>
                <td className="p-3">{r.source_type}</td>
                <td className="p-3">{r.jurisdiction}</td>
                <td className="p-3">{r.topics}</td>
                <td className="p-3">{r.update_frequency}</td>
                <td className="p-3">{r.rss_available ? "Yes" : "-"}</td>
                <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_COLORS[r.status ?? "pending"]}`}>{r.status}</span></td>
                <td className="p-3 capitalize">{r.confidence}</td>
                <td className="p-3 text-muted-foreground">{r.last_checked ? new Date(r.last_checked).toLocaleDateString() : "-"}</td>
                <td className="p-3">
                  <button onClick={() => onRecheck(r.id)} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                    <RefreshCw className="h-3 w-3" /> Recheck
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-foreground/30 grid place-items-center p-4 z-50" onClick={() => setOpen(false)}>
          <div className="bg-card rounded-2xl p-6 w-full max-w-2xl space-y-3" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-2xl">Add URL to registry</h2>
            <input placeholder="https://…" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-border bg-background" />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Source type" value={form.source_type} onChange={(e) => setForm({ ...form, source_type: e.target.value })} className="px-4 py-2.5 rounded-md border border-border bg-background" />
              <input placeholder="Jurisdiction" value={form.jurisdiction} onChange={(e) => setForm({ ...form, jurisdiction: e.target.value })} className="px-4 py-2.5 rounded-md border border-border bg-background" />
            </div>
            <input placeholder="Primary topics" value={form.topics} onChange={(e) => setForm({ ...form, topics: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-border bg-background" />
            <div className="grid grid-cols-2 gap-3">
              <select value={form.update_frequency} onChange={(e) => setForm({ ...form, update_frequency: e.target.value })} className="px-4 py-2.5 rounded-md border border-border bg-background">
                {FREQ.map((f) => <option key={f}>{f}</option>)}
              </select>
              <select value={form.confidence} onChange={(e) => setForm({ ...form, confidence: e.target.value })} className="px-4 py-2.5 rounded-md border border-border bg-background">
                <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.rss_available} onChange={(e) => setForm({ ...form, rss_available: e.target.checked })} /> RSS / API available
            </label>
            {form.rss_available && (
              <input placeholder="RSS URL" value={form.rss_url} onChange={(e) => setForm({ ...form, rss_url: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-border bg-background" />
            )}
            <textarea placeholder="Notes" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-border bg-background" />
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 text-muted-foreground">Cancel</button>
              <button onClick={submit} className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Save</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
