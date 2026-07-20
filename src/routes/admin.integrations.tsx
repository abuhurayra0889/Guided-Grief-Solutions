import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { useStore, store } from "@/lib/ggs/mockStore";
import { Pill, StatusDot } from "@/components/ggs/Pill";
import { Plug, Mail, MessageCircle, CreditCard, FolderOpen, Calendar, BarChart3, Hash } from "lucide-react";

export const Route = createFileRoute("/admin/integrations")({
  head: () => ({ meta: [{ title: "Integrations - GGS" }] }),
  component: Integrations,
});

const ICONS: Record<string, any> = {
  email: Mail, comms: MessageCircle, payments: CreditCard, storage: FolderOpen,
  calendar: Calendar, analytics: BarChart3, crm: Hash,
};

function Integrations() {
  const integrations = useStore((s) => s.integrations);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Agentic framework</p>
          <h1 className="font-display text-4xl mt-1">Integrations</h1>
          <p className="text-muted-foreground mt-1">External services that agents and the platform talk to.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((i) => {
            const Icon = ICONS[i.category] || Plug;
            return (
              <div key={i.id} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-lg bg-secondary grid place-items-center shrink-0">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium">{i.name}</h3>
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{i.category}</p>
                    </div>
                  </div>
                  <Pill tone={i.connected ? "ok" : "muted"}>
                    <StatusDot tone={i.connected ? "ok" : "muted"} />{i.connected ? "connected" : "off"}
                  </Pill>
                </div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{i.description}</p>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {i.connected ? `${i.events_30d.toLocaleString()} events / 30d` : "Not connected"}
                  </div>
                  <button onClick={() => store.toggleIntegration(i.id)}
                    className={`text-xs px-3 py-1.5 rounded-md ${i.connected ? "bg-secondary text-foreground hover:bg-muted" : "bg-primary text-primary-foreground hover:bg-primary-dark"}`}>
                    {i.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminShell>
  );
}
