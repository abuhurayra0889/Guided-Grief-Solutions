import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/ggs/AppShell";
import { useAuth } from "@/lib/ggs/useAuth";
import { usePublishedKbArticles } from "@/lib/ggs/queries";

export const Route = createFileRoute("/knowledge-base/")({
  head: () => ({ meta: [{ title: "Knowledge Base - GGS" }] }),
  component: KB,
});

const CATEGORIES = ["All", "Probate", "Benefits", "Financial", "Housing"];

function KB() {
  const { profile } = useAuth();
  const { data: articles = [], isLoading } = usePublishedKbArticles();
  const [stateFilter, setStateFilter] = useState<string>(profile?.state_code || "ALL");
  const [cat, setCat] = useState("All");

  const filtered = articles.filter((a) => {
    if (cat !== "All" && a.category !== cat) return false;
    if (stateFilter !== "ALL" && a.state_code !== stateFilter && a.state_code !== "US") return false;
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-4xl">Knowledge Base</h1>
          <p className="text-muted-foreground mt-1">State-by-state legal and financial guidance, written for surviving spouses.</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="px-3 py-2 rounded-md border border-border bg-card text-sm">
            <option value="ALL">All states</option>
            {Array.from(new Set(articles.map((a) => a.state_code).filter(Boolean))).map((s) => (
              <option key={s} value={s!}>{s}</option>
            ))}
          </select>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading articles…</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground">No articles match your filters yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((a) => (
              <Link key={a.id} to="/knowledge-base/$id" params={{ id: a.id }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors block">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20">{a.category}</span>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{a.state_code}</span>
                </div>
                <h2 className="font-display text-xl">{a.title}</h2>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{a.summary}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
