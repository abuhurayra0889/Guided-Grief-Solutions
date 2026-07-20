import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/ggs/AppShell";
import { ThumbsUp, ThumbsDown, ArrowLeft } from "lucide-react";
import { useKbArticle, usePublishedKbArticles } from "@/lib/ggs/queries";

export const Route = createFileRoute("/knowledge-base/$id")({
  head: () => ({ meta: [{ title: "Article - GGS" }] }),
  component: Article,
});

function Article() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { data: article, isLoading } = useKbArticle(id);
  const { data: allArticles = [] } = usePublishedKbArticles();
  const related = article
    ? allArticles.filter((a) => a.id !== id && a.category === article.category).slice(0, 4)
    : [];
  const [vote, setVote] = useState<null | "up" | "down">(null);

  if (isLoading) return <AppShell><p className="text-muted-foreground">Loading…</p></AppShell>;
  if (!article) return <AppShell><p className="text-muted-foreground">Article not found.</p></AppShell>;

  return (
    <AppShell>
      <div className="grid md:grid-cols-[1fr_240px] gap-10">
        <article>
          <Link to="/knowledge-base" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground">{article.category}</span>
            <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{article.state_code}</span>
            {article.attorney_reviewed && <span className="text-xs text-primary">✓ Attorney reviewed</span>}
          </div>
          <h1 className="font-display text-4xl md:text-5xl leading-tight">{article.title}</h1>
          <p className="mt-3 text-muted-foreground">Updated {new Date(article.updated_at).toLocaleDateString()}</p>
          <div className="mt-8 text-foreground leading-relaxed whitespace-pre-line">{article.body}</div>

          <div className="mt-10 border-t border-border pt-6 flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Was this helpful?</span>
            <button onClick={() => setVote("up")} className={`p-2 rounded-md border ${vote === "up" ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
              <ThumbsUp className="h-4 w-4" />
            </button>
            <button onClick={() => setVote("down")} className={`p-2 rounded-md border ${vote === "down" ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
              <ThumbsDown className="h-4 w-4" />
            </button>
            <button onClick={() => navigate({ to: "/navigator", search: { q: `Tell me more about: ${article.title}` } as any })}
              className="ml-auto text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark">
              Ask the Navigator
            </button>
          </div>
        </article>

        <aside className="border-l border-border pl-6 hidden md:block">
          <h3 className="font-display text-lg mb-3">Related</h3>
          <ul className="space-y-3">
            {related.map((r) => (
              <li key={r.id}>
                <Link to="/knowledge-base/$id" params={{ id: r.id }} className="text-sm hover:text-primary">{r.title}</Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </AppShell>
  );
}
