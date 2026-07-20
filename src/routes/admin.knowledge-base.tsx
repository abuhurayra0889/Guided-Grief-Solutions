import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/ggs/AdminShell";
import { toast } from "sonner";
import { store, useStore } from "@/lib/ggs/mockStore";

export const Route = createFileRoute("/admin/knowledge-base")({ component: KBAdmin });

const CATS = ["Probate", "Benefits", "Financial", "Housing"];

function KBAdmin() {
  const rows = useStore((s) => s.kbArticles);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", state_code: "NJ", category: "Probate", summary: "", body: "", attorney_reviewed: false });

  const create = (publish: boolean) => {
    if (!form.title.trim()) return toast.error("Title is required.");
    store.addKbArticle({ ...form, published: publish });
    toast.success(publish ? "Published." : "Saved as draft.");
    setOpen(false);
    setForm({ title: "", state_code: "NJ", category: "Probate", summary: "", body: "", attorney_reviewed: false });
  };

  return (
    <AdminShell>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl">Knowledge Base</h1>
          <p className="text-muted-foreground">CMS for state-specific guidance articles.</p>
        </div>
        <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark">Add new article</button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
            <tr>{["Title","State","Category","Reviewed","Updated","Status","Actions"].map((h) =>
              <th key={h} className="text-left p-3">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="p-3 font-medium">{r.title}</td>
                <td className="p-3">{r.state_code}</td>
                <td className="p-3">{r.category}</td>
                <td className="p-3">{r.attorney_reviewed ? "✓" : "-"}</td>
                <td className="p-3">{new Date(r.updated_at).toLocaleDateString()}</td>
                <td className="p-3">{r.published ? <span className="text-primary">Published</span> : <span className="text-muted-foreground">Draft</span>}</td>
                <td className="p-3">
                  <button onClick={() => store.togglePublished(r.id)} className="text-primary hover:underline text-xs">
                    {r.published ? "Unpublish" : "Publish"}
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
            <h2 className="font-display text-2xl">New article</h2>
            <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-border bg-background" />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="State (e.g. NJ)" value={form.state_code} onChange={(e) => setForm({ ...form, state_code: e.target.value.toUpperCase().slice(0, 2) })} className="px-4 py-2.5 rounded-md border border-border bg-background" />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-4 py-2.5 rounded-md border border-border bg-background">
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <textarea placeholder="Summary (2 sentences)" maxLength={300} rows={2} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-border bg-background" />
            <textarea placeholder="Body" rows={6} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-border bg-background" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.attorney_reviewed} onChange={(e) => setForm({ ...form, attorney_reviewed: e.target.checked })} />
              Attorney reviewed
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 text-muted-foreground">Cancel</button>
              <button onClick={() => create(false)} className="px-4 py-2 rounded-md border border-border">Save draft</button>
              <button onClick={() => create(true)} className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Publish</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
