// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/insights/cohorts")({
  head: () => ({ meta: [{ title: "Cohorts - GGS Admin" }] }),
  component: Page,
});

const weeks = ["Mar 04", "Mar 11", "Mar 18", "Mar 25", "Apr 01", "Apr 08", "Apr 15", "Apr 22"];
const data = [
  [100, 78, 64, 58, 51, 47, 44, 42],
  [100, 82, 71, 64, 58, 54, 51, null],
  [100, 76, 62, 55, 49, 46, null, null],
  [100, 81, 70, 62, 56, null, null, null],
  [100, 79, 67, 60, null, null, null, null],
  [100, 84, 72, null, null, null, null, null],
  [100, 80, null, null, null, null, null, null],
  [100, null, null, null, null, null, null, null],
];
const cellColor = (v: any) => {
  if (v === null) return "bg-secondary/30";
  if (v >= 80) return "bg-primary text-primary-foreground";
  if (v >= 60) return "bg-primary/60 text-primary-foreground";
  if (v >= 40) return "bg-primary/30";
  return "bg-primary/15";
};
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Insights</p>
        <h1 className="font-display text-4xl mt-1">Retention cohorts</h1>
        <p className="text-muted-foreground mt-1">Weekly signup cohorts → % active each week after.</p>
      </div>
        <div className="bg-card border border-border rounded-xl p-6 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left p-2 text-muted-foreground uppercase tracking-wider">Cohort</th>
                {weeks.map((_, i) => <th key={i} className="p-2 text-muted-foreground">W{i}</th>)}
              </tr>
            </thead>
            <tbody>
              {weeks.map((w, i) => (
                <tr key={w}>
                  <td className="p-2 font-medium whitespace-nowrap">{w}</td>
                  {data[i].map((v, j) => (
                    <td key={j} className="p-1">
                      <div className={`tabular-nums text-center py-2 rounded ${cellColor(v)}`}>{v !== null ? `${v}%` : "-"}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
