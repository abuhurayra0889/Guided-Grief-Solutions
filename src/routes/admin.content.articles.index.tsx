// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/content/articles/")({
  head: () => ({ meta: [{ title: "Articles - GGS Admin" }] }),
  component: Page,
});

const items = [
  { id: "a-014", title: "Triggered grief in public spaces", status: "published", author: "Maya", edited: "2d ago", views: 1240, helpful: 92 },
  { id: "a-022", title: "Sensory memory and his belongings", status: "published", author: "Nidhi", edited: "5d ago", views: 980, helpful: 88 },
  { id: "a-031", title: "Small-mission exposure for grocery anxiety", status: "in_review", author: "Maya", edited: "today", views: 0, helpful: null },
  { id: "a-040", title: "First holiday alone - a script for hosts", status: "draft", author: "Nidhi", edited: "today", views: 0, helpful: null },
  { id: "a-018", title: "Probate basics (non-legal)", status: "published", author: "Maya", edited: "1w ago", views: 612, helpful: 78 },
  { id: "a-025", title: "Adult children who hover", status: "published", author: "Nidhi", edited: "2w ago", views: 421, helpful: 90 },
  { id: "a-029", title: "3am wakes - a sleep worksheet", status: "published", author: "Maya", edited: "3w ago", views: 1102, helpful: 94 },
  { id: "a-038", title: "Anniversary dread - preparing the day", status: "in_review", author: "Maya", edited: "yesterday", views: 0, helpful: null },
];
const stTone: Record<string,any> = { published: "ok", in_review: "warn", draft: "muted" };
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Content Studio</p>
        <h1 className="font-display text-4xl mt-1">Articles</h1>
        <p className="text-muted-foreground mt-1">Everything in the GGS knowledge library.</p>
      </div>
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">+ New article</button>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr>{["Title","Status","Author","Edited","Views","Helpful",""].map(h=><th key={h} className="text-left p-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {items.map(a => (
                <tr key={a.id} className="border-t border-border">
                  <td className="p-3 font-medium">{a.title}</td>
                  <td className="p-3"><Pill tone={stTone[a.status]}>{a.status.replace("_"," ")}</Pill></td>
                  <td className="p-3">{a.author}</td>
                  <td className="p-3 text-muted-foreground">{a.edited}</td>
                  <td className="p-3 tabular-nums">{a.views.toLocaleString()}</td>
                  <td className="p-3 tabular-nums">{a.helpful !== null ? `${a.helpful}%` : "-"}</td>
                  <td className="p-3"><a href={`/admin/content/articles/${a.id}`} className="text-primary text-xs hover:underline">Edit →</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
