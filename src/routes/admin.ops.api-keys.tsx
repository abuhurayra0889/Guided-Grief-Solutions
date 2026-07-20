// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/ops/api-keys")({
  head: () => ({ meta: [{ title: "API keys - GGS Admin" }] }),
  component: Page,
});

const keys = [
  { name: "OpenAI (production)", type: "outbound", masked: "sk-…a91f", rotated: "Apr 12", status: "active" },
  { name: "Google AI", type: "outbound", masked: "AIza…XQ20", rotated: "Mar 28", status: "active" },
  { name: "SendGrid", type: "outbound", masked: "SG.…8b1c", rotated: "Feb 14", status: "rotate-soon" },
  { name: "Webhook - Slack #safety", type: "inbound", masked: "whk_…42de", rotated: "Apr 02", status: "active" },
  { name: "Public API - partners", type: "inbound", masked: "pk_…5ff0", rotated: "Jan 19", status: "rotate-soon" },
];
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Operations</p>
        <h1 className="font-display text-4xl mt-1">API keys</h1>
        <p className="text-muted-foreground mt-1">Outbound provider keys and inbound webhook secrets.</p>
      </div>
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {keys.map(k => (
            <div key={k.name} className="p-4 flex items-center gap-4">
              <div className="flex-1">
                <p className="font-medium">{k.name}</p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{k.masked}</p>
              </div>
              <Pill tone="muted">{k.type}</Pill>
              <span className="text-xs text-muted-foreground w-32 text-right">rotated {k.rotated}</span>
              <Pill tone={k.status === "active" ? "ok" : "warn"}>{k.status}</Pill>
              <button className="text-xs text-primary hover:underline">Rotate</button>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
