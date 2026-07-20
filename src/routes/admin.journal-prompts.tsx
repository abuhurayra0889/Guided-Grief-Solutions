import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/ggs/AdminShell";
import { store, useStore } from "@/lib/ggs/mockStore";

export const Route = createFileRoute("/admin/journal-prompts")({ component: Prompts });

function Prompts() {
  const rows = useStore((s) => s.journalPrompts);
  const [text, setText] = useState("");

  return (
    <AdminShell>
      <h1 className="font-display text-4xl mb-1">Journal Prompts</h1>
      <p className="text-muted-foreground mb-6">Daily reflection prompts shown to users.</p>

      <div className="flex gap-2 mb-5 max-w-2xl">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New prompt…" className="flex-1 px-4 py-2.5 rounded-md border border-border bg-card" />
        <button onClick={() => { if (text.trim()) { store.addJournalPrompt(text.trim()); setText(""); } }}
          className="px-4 py-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark">Add</button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left p-3">Prompt</th><th className="text-left p-3">Stage</th><th className="text-left p-3">Source</th><th className="text-left p-3">Active</th><th className="text-left p-3">Actions</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="p-3">{r.prompt_text}</td>
                <td className="p-3 text-muted-foreground capitalize">{r.grief_stage?.replace(/_/g, " ") || "Any"}</td>
                <td className="p-3 capitalize">{r.source}</td>
                <td className="p-3">{r.active ? "Yes" : "No"}</td>
                <td className="p-3">
                  <button onClick={() => store.toggleJournalPrompt(r.id)} className="text-primary hover:underline">
                    {r.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
