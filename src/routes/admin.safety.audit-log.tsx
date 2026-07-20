// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/safety/audit-log")({
  head: () => ({ meta: [{ title: "Audit log - GGS Admin" }] }),
  component: Page,
});

const entries = [
  { t: "2026-05-08 09:42:11", actor: "agent:navigator", event: "response.sent", target: "session c-001", hash: "a3f9…b212" },
  { t: "2026-05-08 09:41:58", actor: "agent:navigator", event: "kb.retrieve", target: "KB-014, KB-022, KB-031", hash: "8e02…ff44" },
  { t: "2026-05-08 09:41:55", actor: "user:sarah.m", event: "message.sent", target: "session c-001", hash: "1d7c…aa01" },
  { t: "2026-05-08 09:32:04", actor: "admin:maya", event: "guardrail.toggle", target: "off-topic-redirect → off", hash: "55ab…3c91" },
  { t: "2026-05-08 09:18:22", actor: "agent:safety", event: "escalation.flagged", target: "session c-004", hash: "2b88…6e12" },
  { t: "2026-05-08 09:17:18", actor: "agent:navigator", event: "policy.violation", target: "medical-advice attempt blocked", hash: "f0e1…9a32" },
  { t: "2026-05-08 08:50:03", actor: "admin:nidhi", event: "policy.publish", target: "system-prompt v12 → v13", hash: "7c44…11ee" },
  { t: "2026-05-08 08:12:44", actor: "system", event: "model.swap", target: "navigator: gpt-5 → gpt-5-mini (cost)", hash: "3a90…bc58" },
];
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Safety & Trust</p>
        <h1 className="font-display text-4xl mt-1">Audit log</h1>
        <p className="text-muted-foreground mt-1">Immutable record of every prompt, response, and admin action.</p>
      </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden font-mono text-xs">
          <table className="w-full">
            <thead className="bg-secondary uppercase tracking-wider text-muted-foreground">
              <tr>{["Timestamp","Actor","Event","Target","Hash"].map(h=><th key={h} className="text-left p-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {entries.map((e,i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 text-muted-foreground tabular-nums">{e.t}</td>
                  <td className="p-3">{e.actor}</td>
                  <td className="p-3 text-primary">{e.event}</td>
                  <td className="p-3">{e.target}</td>
                  <td className="p-3 text-muted-foreground">{e.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
