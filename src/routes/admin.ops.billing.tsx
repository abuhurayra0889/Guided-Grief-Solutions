// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/ops/billing")({
  head: () => ({ meta: [{ title: "Billing - GGS Admin" }] }),
  component: Page,
});

function Page() {
  const used = 218.42, budget = 500;
  const pct = (used / budget) * 100;
  const lines = [
    { name: "OpenAI gpt-5", calls: 12420, cost: 142.18 },
    { name: "OpenAI gpt-5-mini", calls: 48211, cost: 51.20 },
    { name: "Google gemini-2.5-flash", calls: 19302, cost: 18.42 },
    { name: "Embeddings (text-3-small)", calls: 81244, cost: 6.62 },
  ];
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Operations</p>
        <h1 className="font-display text-4xl mt-1">Billing</h1>
        <p className="text-muted-foreground mt-1">Plan, model spend, and budget alerts.</p>
      </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Plan</p>
            <p className="font-display text-2xl mt-2">Growth</p>
            <p className="text-xs text-muted-foreground mt-1">renews Jun 1</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">MTD spend</p>
            <p className="font-display text-2xl mt-2 tabular-nums">${used.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">of ${budget} budget</p>
            <div className="h-2 bg-secondary rounded-full mt-3 overflow-hidden">
              <div className={`h-full ${pct > 80 ? "bg-amber-500" : "bg-primary"}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Cost / active user</p>
            <p className="font-display text-2xl mt-2 tabular-nums">$0.42</p>
            <p className="text-xs text-emerald-600 mt-1">−$0.06 vs last month</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr>{["Model","Calls","Cost"].map(h=><th key={h} className="text-left p-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {lines.map(l => (
                <tr key={l.name} className="border-t border-border">
                  <td className="p-3 font-medium">{l.name}</td>
                  <td className="p-3 tabular-nums">{l.calls.toLocaleString()}</td>
                  <td className="p-3 tabular-nums">${l.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
