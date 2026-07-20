// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/ops/team")({
  head: () => ({ meta: [{ title: "Team - GGS Admin" }] }),
  component: Page,
});

const members = [
  { name: "Nidhi Sharma", email: "nidhi@ggs.io", role: "Owner", lastActive: "now", avatar: "NS" },
  { name: "Maya Patel", email: "maya@ggs.io", role: "Editor", lastActive: "12 min ago", avatar: "MP" },
  { name: "James Chen", email: "james@ggs.io", role: "Reviewer", lastActive: "2h ago", avatar: "JC" },
  { name: "Aisha Rahman", email: "aisha@ggs.io", role: "Support", lastActive: "yesterday", avatar: "AR" },
  { name: "Tom Becker", email: "tom@ggs.io", role: "Editor", lastActive: "3d ago", avatar: "TB" },
];
const roleTone: Record<string,any> = { Owner: "info", Editor: "ok", Reviewer: "warn", Support: "muted" };
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Operations</p>
        <h1 className="font-display text-4xl mt-1">Team</h1>
        <p className="text-muted-foreground mt-1">Staff with access to the Control Tower.</p>
      </div>
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">+ Invite</button>
        </div>
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {members.map(m => (
            <div key={m.email} className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/15 text-primary grid place-items-center font-medium text-sm">{m.avatar}</div>
              <div className="flex-1">
                <p className="font-medium">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.email}</p>
              </div>
              <Pill tone={roleTone[m.role]}>{m.role}</Pill>
              <span className="text-xs text-muted-foreground w-24 text-right">{m.lastActive}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
