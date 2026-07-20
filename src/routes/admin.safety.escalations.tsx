// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/safety/escalations")({
  head: () => ({ meta: [{ title: "Escalations - GGS Admin" }] }),
  component: Page,
});

const items = [
  { when: "12 min ago", user: "Linda K.", agent: "Grief Navigator", reason: "Crisis language detected", action: "988 hotline shown", outcome: "User acknowledged" },
  { when: "2h ago", user: "Patricia G.", agent: "Grief Navigator", reason: "Probate legal question", action: "Routed to attorney directory", outcome: "Clicked through" },
  { when: "5h ago", user: "Diane P.", agent: "Grief Navigator", reason: "Medical (sleep meds) question", action: "Refused, routed to clinician copy", outcome: "Continued chat" },
  { when: "yesterday", user: "Joan R.", agent: "Journal Companion", reason: "Mention of overdose history", action: "Human handoff (Slack #safety)", outcome: "Reviewed by Maya" },
  { when: "2d ago", user: "Beverly H.", agent: "Grief Navigator", reason: "Hallucination guard tripped", action: "Response withheld, fallback used", outcome: "User satisfied" },
  { when: "3d ago", user: "Maria L.", agent: "Grief Navigator", reason: "Crisis language detected", action: "988 hotline shown + human handoff", outcome: "Resolved" },
];
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Safety & Trust</p>
        <h1 className="font-display text-4xl mt-1">Escalations</h1>
        <p className="text-muted-foreground mt-1">Every time an agent handed off to a human or surfaced a hotline.</p>
      </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr>{["When","User","Agent","Reason","Action","Outcome"].map(h=><th key={h} className="text-left p-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {items.map((i, idx) => (
                <tr key={idx} className="border-t border-border">
                  <td className="p-3 text-muted-foreground">{i.when}</td>
                  <td className="p-3 font-medium">{i.user}</td>
                  <td className="p-3">{i.agent}</td>
                  <td className="p-3">{i.reason}</td>
                  <td className="p-3 text-muted-foreground">{i.action}</td>
                  <td className="p-3"><Pill tone="ok">{i.outcome}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
