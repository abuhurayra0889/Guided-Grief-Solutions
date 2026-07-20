// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/content/email-templates")({
  head: () => ({ meta: [{ title: "Email templates - GGS Admin" }] }),
  component: Page,
});

const items = [
  { name: "Welcome - day 1", trigger: "On signup", sent: 312, open: 78, click: 41, status: "live" },
  { name: "Onboarding - day 3", trigger: "+72h", sent: 287, open: 64, click: 32, status: "live" },
  { name: "First journal nudge - day 5", trigger: "+5d, no journal yet", sent: 198, open: 71, click: 38, status: "live" },
  { name: "Two weeks in", trigger: "+14d", sent: 240, open: 59, click: 24, status: "live" },
  { name: "30 days - milestone", trigger: "+30d", sent: 188, open: 67, click: 29, status: "live" },
  { name: "Holiday support - Thanksgiving", trigger: "Seasonal", sent: 0, open: null, click: null, status: "draft" },
  { name: "Anniversary check-in", trigger: "Loss-date anniversary", sent: 12, open: 92, click: 58, status: "live" },
];
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Content Studio</p>
        <h1 className="font-display text-4xl mt-1">Email templates</h1>
        <p className="text-muted-foreground mt-1">Lifecycle and event-triggered emails.</p>
      </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr>{["Template","Trigger","Sent","Open","Click","Status"].map(h=><th key={h} className="text-left p-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {items.map((e,i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium">{e.name}</td>
                  <td className="p-3 text-muted-foreground">{e.trigger}</td>
                  <td className="p-3 tabular-nums">{e.sent}</td>
                  <td className="p-3 tabular-nums">{e.open !== null ? `${e.open}%` : "-"}</td>
                  <td className="p-3 tabular-nums">{e.click !== null ? `${e.click}%` : "-"}</td>
                  <td className="p-3"><Pill tone={e.status === "live" ? "ok" : "muted"}>{e.status}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
