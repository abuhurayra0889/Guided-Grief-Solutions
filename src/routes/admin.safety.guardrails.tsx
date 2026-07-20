// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/safety/guardrails")({
  head: () => ({ meta: [{ title: "Guardrails - GGS Admin" }] }),
  component: Page,
});

const rules = [
  { id: "g1", name: "Crisis keyword detection", desc: "Detects self-harm and crisis language; surfaces 988 hotline.", on: true, triggers: 12, severity: "critical" },
  { id: "g2", name: "Medical advice block", desc: "Refuses to diagnose or recommend medications; routes to clinician copy.", on: true, triggers: 47, severity: "high" },
  { id: "g3", name: "Legal advice block", desc: "Refuses probate / estate legal answers; routes to vetted attorney directory.", on: true, triggers: 89, severity: "high" },
  { id: "g4", name: "Profanity filter", desc: "Soft filter - passes through if user uses it, never originates.", on: true, triggers: 6, severity: "low" },
  { id: "g5", name: "Off-topic redirect", desc: "Redirects non-grief queries (weather, sports) back to wellness.", on: false, triggers: 134, severity: "low" },
  { id: "g6", name: "PII scrubber", desc: "Removes SSN/credit card patterns before logging.", on: true, triggers: 3, severity: "high" },
  { id: "g7", name: "Hallucination guard", desc: "Cross-checks named statistics against KB; refuses if no source.", on: true, triggers: 21, severity: "medium" },
];
const sevTone: Record<string,any> = { critical: "bad", high: "warn", medium: "info", low: "muted" };
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Safety & Trust</p>
        <h1 className="font-display text-4xl mt-1">Guardrails</h1>
        <p className="text-muted-foreground mt-1">Rule-based safety layer that wraps every agent response.</p>
      </div>
        <div className="space-y-3">
          {rules.map(r => (
            <div key={r.id} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
              <button className={`relative h-6 w-11 rounded-full transition-colors ${r.on ? "bg-primary" : "bg-secondary"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${r.on ? "left-5" : "left-0.5"}`} />
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{r.name}</span>
                  <Pill tone={sevTone[r.severity]}>{r.severity}</Pill>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{r.desc}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl tabular-nums">{r.triggers}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">7d triggers</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
