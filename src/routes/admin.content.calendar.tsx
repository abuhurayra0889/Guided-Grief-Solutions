// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/content/calendar")({
  head: () => ({ meta: [{ title: "Editorial calendar - GGS Admin" }] }),
  component: Page,
});

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const slots = [
  { day: 0, type: "article", title: "Anniversary dread - preparing the day", who: "Maya" },
  { day: 1, type: "email", title: "Two weeks in (cohort: Apr-22)", who: "auto" },
  { day: 2, type: "article", title: "First holiday alone - a script for hosts", who: "Nidhi" },
  { day: 3, type: "prompt", title: "Journal prompt: 'a Tuesday with him'", who: "Maya" },
  { day: 3, type: "email", title: "30-day milestone (cohort: Apr-08)", who: "auto" },
  { day: 4, type: "article", title: "Adult children who hover (re-publish)", who: "Nidhi" },
  { day: 5, type: "social", title: "Instagram: 'Aisle 7' essay teaser", who: "Maya" },
  { day: 6, type: "review", title: "Editorial review - May batch", who: "team" },
];
const tt: Record<string,any> = { article: "info", email: "ok", prompt: "warn", social: "muted", review: "muted" };
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Content Studio</p>
        <h1 className="font-display text-4xl mt-1">Editorial calendar</h1>
        <p className="text-muted-foreground mt-1">Week of May 11. Articles, emails, prompts, social.</p>
      </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((d, i) => (
            <div key={d} className="bg-card border border-border rounded-xl p-3 min-h-[200px]">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{d}</p>
              <div className="space-y-1.5">
                {slots.filter(s => s.day === i).map((s, j) => (
                  <div key={j} className="rounded-md border border-border p-2">
                    <Pill tone={tt[s.type]}>{s.type}</Pill>
                    <p className="text-xs mt-1.5 leading-snug">{s.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{s.who}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
