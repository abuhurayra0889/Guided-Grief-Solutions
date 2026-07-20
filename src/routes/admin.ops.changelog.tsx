// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/ops/changelog")({
  head: () => ({ meta: [{ title: "Changelog - GGS Admin" }] }),
  component: Page,
});

const items = [
  { v: "0.18", date: "May 7", who: "Maya", title: "Anniversary-dread email template", body: "New lifecycle email triggered 14 days before loss-date anniversary. A/B test enabled." },
  { v: "0.17", date: "May 5", who: "Nidhi", title: "System prompt v13 published", body: "Softer financial-stress branch. Crisis branch now surfaces 988 in first reply." },
  { v: "0.16", date: "May 3", who: "James", title: "Insights Analyst agent - themes clustering", body: "Weekly auto-clustered themes available on Insights → Themes." },
  { v: "0.15", date: "Apr 30", who: "Maya", title: "8 new KB articles", body: "Triggered grief in public spaces (KB-014), 3am wakes worksheet (KB-029), and 6 more." },
  { v: "0.14", date: "Apr 28", who: "Nidhi", title: "Take-over chat for Support role", body: "Support staff can now silently take over a Navigator session and respond as the agent." },
  { v: "0.13", date: "Apr 24", who: "Nidhi", title: "Cost / active user metric", body: "New executive metric on Insights overview, broken down by model on Billing." },
];
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Operations</p>
        <h1 className="font-display text-4xl mt-1">Changelog</h1>
        <p className="text-muted-foreground mt-1">Internal release notes - what shipped and when.</p>
      </div>
        <div className="space-y-4">
          {items.map(i => (
            <div key={i.v} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <span className="font-display text-lg">v{i.v}</span>
                <span className="text-xs text-muted-foreground">{i.date} · {i.who}</span>
              </div>
              <h3 className="font-medium mt-2">{i.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{i.body}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
