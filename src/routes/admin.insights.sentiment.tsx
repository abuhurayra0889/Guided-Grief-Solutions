// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/insights/sentiment")({
  head: () => ({ meta: [{ title: "Sentiment - GGS Admin" }] }),
  component: Page,
});

const series = [
  { week: "W-7", calm: 58, anxious: 34, crisis: 8 },
  { week: "W-6", calm: 60, anxious: 33, crisis: 7 },
  { week: "W-5", calm: 62, anxious: 32, crisis: 6 },
  { week: "W-4", calm: 64, anxious: 30, crisis: 6 },
  { week: "W-3", calm: 66, anxious: 29, crisis: 5 },
  { week: "W-2", calm: 68, anxious: 28, crisis: 4 },
  { week: "W-1", calm: 70, anxious: 26, crisis: 4 },
  { week: "W-0", calm: 71, anxious: 26, crisis: 3 },
];
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Insights</p>
        <h1 className="font-display text-4xl mt-1">Sentiment trend</h1>
        <p className="text-muted-foreground mt-1">Session-end sentiment, last 8 weeks.</p>
      </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-end gap-3 h-64">
            {series.map(s => (
              <div key={s.week} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col-reverse rounded-t-md overflow-hidden h-full">
                  <div className="bg-emerald-500" style={{ height: `${s.calm}%` }} title={`calm ${s.calm}%`} />
                  <div className="bg-amber-500" style={{ height: `${s.anxious}%` }} title={`anxious ${s.anxious}%`} />
                  <div className="bg-rose-500" style={{ height: `${s.crisis}%` }} title={`crisis ${s.crisis}%`} />
                </div>
                <span className="text-[10px] text-muted-foreground mt-2">{s.week}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-6 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-emerald-500" /> Calm</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-amber-500" /> Anxious</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-rose-500" /> Crisis</span>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
