// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/safety/policies")({
  head: () => ({ meta: [{ title: "Policies - GGS Admin" }] }),
  component: Page,
});

const versions = [
  { v: "v13", who: "Nidhi", when: "today, 8:50am", note: "Softened tone in financial topics. Added 988 reminder to crisis branch.", current: true },
  { v: "v12", who: "Maya", when: "Apr 22", note: "Added explicit 'no diagnosis' clause for medical questions." },
  { v: "v11", who: "Nidhi", when: "Apr 14", note: "Renamed agent voice from 'companion' to 'guide'." },
  { v: "v10", who: "Maya", when: "Apr 02", note: "Initial production system prompt." },
];
const diff = [
  { type: "ctx", text: "You are the Grief Navigator. You speak with warmth and presence." },
  { type: "del", text: "When a user mentions financial stress, suggest they call their bank." },
  { type: "add", text: "When a user mentions financial stress, acknowledge the weight of it first. Only after, offer a small, named next step (e.g., 'one bill at a time')." },
  { type: "ctx", text: "Never diagnose. Never prescribe. Always respect their pace." },
  { type: "add", text: "If the user expresses self-harm ideation, surface 988 within the first reply." },
];
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Safety & Trust</p>
        <h1 className="font-display text-4xl mt-1">Policies</h1>
        <p className="text-muted-foreground mt-1">Versioned system prompts and content policies. Diff-tracked.</p>
      </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            {versions.map(v => (
              <div key={v.v} className={`p-4 rounded-xl border ${v.current ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg">{v.v}</span>
                  {v.current && <Pill tone="ok">live</Pill>}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{v.who} · {v.when}</p>
                <p className="text-sm mt-2">{v.note}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
            <h3 className="font-display text-xl mb-4">v12 → v13 diff</h3>
            <div className="font-mono text-sm space-y-1">
              {diff.map((d,i) => (
                <div key={i} className={`px-3 py-1.5 rounded ${d.type === "add" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : d.type === "del" ? "bg-rose-500/10 text-rose-700 dark:text-rose-300 line-through" : "text-muted-foreground"}`}>
                  <span className="mr-2">{d.type === "add" ? "+" : d.type === "del" ? "−" : " "}</span>{d.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
