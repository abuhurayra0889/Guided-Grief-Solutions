// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/insights/")({
  head: () => ({ meta: [{ title: "Insights - GGS Admin" }] }),
  component: Page,
});

function Stat({ label, value, delta, hint }: any) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <p className="font-display text-3xl tabular-nums">{value}</p>
        {delta && <span className={`text-xs ${delta.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}>{delta}</span>}
      </div>
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Insights</p>
        <h1 className="font-display text-4xl mt-1">North-star overview</h1>
        <p className="text-muted-foreground mt-1">What an executive opens on Monday morning.</p>
      </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Active widows" value="312" delta="+8.2%" hint="vs last week" />
          <Stat label="Day-7 retention" value="64%" delta="+3.1%" hint="signup cohort Apr-22" />
          <Stat label="Journal entries / user" value="3.4" delta="+0.2" hint="weekly avg" />
          <Stat label="Calm-end sessions" value="71%" delta="+1.8%" hint="ended in 'calm' sentiment" />
          <Stat label="Avg session length" value="14 min" delta="+2 min" />
          <Stat label="Crisis flags" value="6" delta="−2" hint="all resolved" />
          <Stat label="NPS" value="71" delta="+4" hint="last 30d" />
          <Stat label="Cost per active user" value="$0.42" delta="−$0.06" hint="model spend" />
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-display text-xl mb-4">Active widows - last 8 weeks</h3>
          <div className="flex items-end gap-2 h-40">
            {[42, 58, 71, 88, 142, 198, 248, 312].map((v,i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary/40" style={{ height: `${(v / 312) * 100}%` }} />
                <span className="text-[10px] text-muted-foreground tabular-nums">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
