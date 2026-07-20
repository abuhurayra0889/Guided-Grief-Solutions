// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/ops/notifications")({
  head: () => ({ meta: [{ title: "Notifications - GGS Admin" }] }),
  component: Page,
});

const rules = [
  { trigger: "Crisis flag raised", channel: "Slack #safety, SMS to on-call", on: true },
  { trigger: "Source down (tier 1)", channel: "Slack #content", on: true },
  { trigger: "Budget at 80%", channel: "Email Nidhi", on: true },
  { trigger: "Budget at 100%", channel: "Email Nidhi + auto-throttle", on: true },
  { trigger: "Hallucination guard tripped >5x/h", channel: "Slack #ai-ops", on: true },
  { trigger: "New 5-star review", channel: "Slack #wins", on: true },
  { trigger: "Article published", channel: "Slack #content", on: false },
  { trigger: "Daily digest", channel: "Email all admins", on: true },
];
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Operations</p>
        <h1 className="font-display text-4xl mt-1">Notifications</h1>
        <p className="text-muted-foreground mt-1">What triggers Slack and email alerts.</p>
      </div>
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {rules.map((r,i) => (
            <div key={i} className="p-4 flex items-center gap-4">
              <button className={`relative h-6 w-11 rounded-full transition-colors ${r.on ? "bg-primary" : "bg-secondary"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${r.on ? "left-5" : "left-0.5"}`} />
              </button>
              <div className="flex-1">
                <p className="font-medium">{r.trigger}</p>
                <p className="text-xs text-muted-foreground mt-0.5">→ {r.channel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
