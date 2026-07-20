// @ts-nocheck
// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/content/articles/$id")({
  head: () => ({ meta: [{ title: "Article - GGS Admin" }] }),
  component: Page,
});

const md = `# Triggered grief in public spaces

Going to the grocery store, sitting in his pew at church, walking past a restaurant - these moments can flatten you out of nowhere. This is not a setback. This is your nervous system finding him in the world.

## What's happening

Sensory cues - a song, an aisle, a smell - bypass your thinking brain and land directly in memory. The reaction feels disproportionate because it's not about the cereal. It's about every morning he poured it.

## A small-mission approach

Don't try to "do the whole store." Pick one item. Use the side entrance. Leave when you need to. You're not failing - you're rebuilding the route to the store before you rebuild the whole store.`;
const suggestions = [
  { type: "tone", text: "Soften 'flatten you' - consider 'arrive with weight' for a less clinical feel.", agent: "Knowledge Curator" },
  { type: "fact", text: "Add a citation to the sensory-memory mechanism (Damasio, 1999) for clinician trust.", agent: "Knowledge Curator" },
  { type: "link", text: "Cross-link to KB-031 (small-mission technique) - currently only referenced inline.", agent: "Knowledge Curator" },
];
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Content Studio</p>
        <h1 className="font-display text-4xl mt-1">Triggered grief in public spaces</h1>
        <p className="text-muted-foreground mt-1">KB-014 · published · used by Navigator 142 times in last 7d</p>
      </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
            <textarea defaultValue={md} className="w-full h-[420px] font-mono text-sm bg-transparent border-0 outline-0 resize-none" />
            <div className="border-t border-border pt-4 flex gap-2">
              <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">Save & publish</button>
              <button className="px-4 py-2 rounded-md border border-border text-sm">Save draft</button>
              <button className="px-4 py-2 rounded-md border border-border text-sm">Preview as Sarah</button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-display text-lg">AI suggestions</h3>
                <Pill tone="info">3 new</Pill>
              </div>
              <div className="space-y-3">
                {suggestions.map((s, i) => (
                  <div key={i} className="text-sm border-l-2 border-primary/40 pl-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.type} · {s.agent}</p>
                    <p>{s.text}</p>
                    <div className="flex gap-2 mt-1.5">
                      <button className="text-xs text-primary hover:underline">Apply</button>
                      <button className="text-xs text-muted-foreground hover:underline">Dismiss</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display text-lg mb-3">Usage</h3>
              <dl className="text-xs space-y-1.5">
                <div className="flex justify-between"><dt className="text-muted-foreground">Cited by Navigator</dt><dd>142 times / 7d</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Direct page views</dt><dd>1,240</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Helpful</dt><dd>92%</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Avg read time</dt><dd>3m 12s</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
