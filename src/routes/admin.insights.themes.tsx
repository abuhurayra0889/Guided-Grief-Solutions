// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/insights/themes")({
  head: () => ({ meta: [{ title: "Themes - GGS Admin" }] }),
  component: Page,
});

const items = [
  { theme: "Loneliness - evenings", count: 142, dir: "up", change: "+18%", sentiment: "anxious" },
  { theme: "Financial paperwork", count: 98, dir: "up", change: "+22%", sentiment: "anxious" },
  { theme: "Sleep / 3am wakes", count: 87, dir: "flat", change: "0%", sentiment: "anxious" },
  { theme: "Adult children", count: 71, dir: "down", change: "−6%", sentiment: "calm" },
  { theme: "Anniversary dread", count: 64, dir: "up", change: "+34%", sentiment: "anxious" },
  { theme: "Returning to work", count: 52, dir: "up", change: "+9%", sentiment: "calm" },
  { theme: "Selling the house", count: 41, dir: "flat", change: "+1%", sentiment: "anxious" },
  { theme: "Faith / meaning", count: 38, dir: "up", change: "+12%", sentiment: "calm" },
  { theme: "Holiday planning", count: 29, dir: "up", change: "+44%", sentiment: "anxious" },
];
const arrow = (d: any) => d === "up" ? "▲" : d === "down" ? "▼" : "→";
const dirTone = (d: any) => d === "up" ? "text-emerald-600" : d === "down" ? "text-rose-600" : "text-muted-foreground";
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Insights</p>
        <h1 className="font-display text-4xl mt-1">Conversation themes</h1>
        <p className="text-muted-foreground mt-1">Auto-clustered by the Insights Analyst agent · last 7 days.</p>
      </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(t => (
            <div key={t.theme} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start justify-between">
                <span className="font-medium">{t.theme}</span>
                <Pill tone={t.sentiment === "calm" ? "ok" : "warn"}>{t.sentiment}</Pill>
              </div>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="font-display text-3xl tabular-nums">{t.count}</span>
                <span className={`text-sm ${dirTone(t.dir)}`}>{arrow(t.dir)} {t.change}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">conversations this week</p>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
