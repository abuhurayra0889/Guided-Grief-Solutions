// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/insights/funnel")({
  head: () => ({ meta: [{ title: "Funnel - GGS Admin" }] }),
  component: Page,
});

const steps = [
  { name: "Visited landing", n: 4820, pct: 100 },
  { name: "Started signup", n: 1244, pct: 25.8 },
  { name: "Completed onboarding", n: 892, pct: 18.5 },
  { name: "First Navigator chat", n: 681, pct: 14.1 },
  { name: "First journal entry", n: 442, pct: 9.2 },
  { name: "Day-7 active", n: 287, pct: 5.9 },
];
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Insights</p>
        <h1 className="font-display text-4xl mt-1">Activation funnel</h1>
        <p className="text-muted-foreground mt-1">Last 30 days. Where widows fall off.</p>
      </div>
        <div className="space-y-3">
          {steps.map((s, i) => (
            <div key={s.name} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground tabular-nums">{i+1}</span>
                  <span className="font-medium">{s.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="tabular-nums">{s.n.toLocaleString()}</span>
                  <span className="tabular-nums text-muted-foreground w-14 text-right">{s.pct}%</span>
                </div>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary/60" style={{ width: `${s.pct}%` }} />
              </div>
              {i > 0 && (
                <p className="text-[11px] text-muted-foreground mt-2">
                  Drop-off from previous step: {((1 - s.n / steps[i-1].n) * 100).toFixed(1)}%
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
