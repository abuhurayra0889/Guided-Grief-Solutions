// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/ops/roles")({
  head: () => ({ meta: [{ title: "Roles - GGS Admin" }] }),
  component: Page,
});

const perms = [
  { cap: "Read conversations", Owner: true, Editor: true, Reviewer: true, Support: true },
  { cap: "Take over chat", Owner: true, Editor: false, Reviewer: false, Support: true },
  { cap: "Publish article", Owner: true, Editor: true, Reviewer: false, Support: false },
  { cap: "Edit guardrails", Owner: true, Editor: false, Reviewer: false, Support: false },
  { cap: "Publish system prompt", Owner: true, Editor: false, Reviewer: false, Support: false },
  { cap: "View billing", Owner: true, Editor: false, Reviewer: false, Support: false },
  { cap: "Invite member", Owner: true, Editor: false, Reviewer: false, Support: false },
  { cap: "Read audit log", Owner: true, Editor: true, Reviewer: true, Support: false },
  { cap: "Acknowledge escalation", Owner: true, Editor: true, Reviewer: true, Support: true },
];
const roleNames = ["Owner", "Editor", "Reviewer", "Support"];
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Operations</p>
        <h1 className="font-display text-4xl mt-1">Roles & permissions</h1>
        <p className="text-muted-foreground mt-1">Who can do what across the Control Tower.</p>
      </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left p-3">Capability</th>
                {roleNames.map(r => <th key={r} className="text-center p-3">{r}</th>)}
              </tr>
            </thead>
            <tbody>
              {perms.map((p: any) => (
                <tr key={p.cap} className="border-t border-border">
                  <td className="p-3 font-medium">{p.cap}</td>
                  {roleNames.map(r => (
                    <td key={r} className="p-3 text-center">
                      {p[r] ? <span className="text-emerald-600">✓</span> : <span className="text-muted-foreground/40">-</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
