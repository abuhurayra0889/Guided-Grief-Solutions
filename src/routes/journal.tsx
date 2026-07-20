import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/ggs/AppShell";
import { useAuth } from "@/lib/ggs/useAuth";
import { toast } from "sonner";
import { store, useStore } from "@/lib/ggs/mockStore";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/journal")({
  head: () => ({ meta: [{ title: "Journal - GGS" }] }),
  component: Journal,
});

function reflect(content: string): string {
  const lower = content.toLowerCase();
  if (/sleep|tired|exhaust|insomnia/.test(lower)) return "Sleep keeps surfacing in your entries. Grief is exhausting in a way that doesn't always show up during the day. There's nothing you have to do with that - just naming it counts.";
  if (/kids|children|son|daughter/.test(lower)) return "The kids are in your words again. You're holding them and yourself at the same time. That's not a small thing.";
  if (/lonely|alone|miss/.test(lower)) return "What you wrote about feeling alone is real, and you don't have to fix it tonight. If you'd like, I can suggest a grief support group near you.";
  if (/grateful|thank|love|hope/.test(lower)) return "There's something tender in what you wrote - a small light. I'll remember it next time we talk.";
  return "Thank you for writing this down. Saying it, even just to yourself, is a kind of caring for yourself.";
}

const MOODS = ["😔", "😐", "🙂", "😊", "💪"];

function Journal() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const entries = useStore((s) => s.journalEntries);
  const prompts = useStore((s) => s.journalPrompts.filter((p) => p.active));
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<string>("🙂");
  const [open, setOpen] = useState<string | null>(null);
  const [reflection, setReflection] = useState<string | null>(null);
  const [reflecting, setReflecting] = useState(false);

  useEffect(() => { if (!loading && !user) navigate({ to: "/auth" }); }, [user, loading, navigate]);

  const prompt = useMemo(() => prompts.length ? prompts[new Date().getDay() % prompts.length].prompt_text : "Write whatever feels true today.", [prompts]);

  const save = async () => {
    if (!content.trim()) return;
    const text = content;
    store.addJournalEntry({ content: text, mood, prompt_used: prompt });
    setContent("");
    toast.success("Saved.");
    setReflecting(true);
    setReflection("");
    await new Promise((r) => setTimeout(r, 700));
    const full = reflect(text);
    let acc = "";
    for (const w of full.split(/(\s+)/)) {
      acc += w;
      setReflection(acc);
      await new Promise((r) => setTimeout(r, 22));
    }
    setReflecting(false);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-4xl">My Journal</h1>
          <p className="text-muted-foreground mt-1">A private space, just for you.</p>
        </div>

        <div className="bg-secondary border border-border rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest text-primary inline-flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> Today's prompt</p>
          <p className="font-display text-2xl mt-1">{prompt}</p>
          <p className="text-xs text-muted-foreground mt-2">Suggested by your Journal Companion.</p>
        </div>

        {reflection !== null && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 fade-in">
            <p className="text-xs uppercase tracking-widest text-primary inline-flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> A reflection from your Companion</p>
            <p className="mt-2 leading-relaxed text-foreground">{reflection}{reflecting && <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 align-middle animate-pulse" />}</p>
          </div>
        )}

        <div className="bg-card border border-border rounded-2xl p-6">
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Begin writing…" rows={8}
            className="w-full bg-transparent resize-none focus:outline-none text-foreground leading-relaxed" />
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <div className="flex gap-1.5">
              {MOODS.map((m) => (
                <button key={m} onClick={() => setMood(m)}
                  className={`h-9 w-9 rounded-full text-lg grid place-items-center transition-all ${mood === m ? "bg-primary/10 ring-2 ring-primary" : "hover:bg-secondary"}`}>{m}</button>
              ))}
            </div>
            <button onClick={save} disabled={!content.trim()}
              className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark disabled:opacity-50">Save entry</button>
          </div>
        </div>

        {entries.length > 0 && (
          <div>
            <h2 className="font-display text-2xl mb-4">Past entries</h2>
            <ul className="space-y-3">
              {entries.map((e) => {
                const isOpen = open === e.id;
                return (
                  <li key={e.id} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{new Date(e.created_at).toLocaleDateString(undefined, { dateStyle: "medium" })}</span>
                      <span className="text-lg">{e.mood}</span>
                    </div>
                    <p className="mt-2 text-foreground leading-relaxed whitespace-pre-line">
                      {isOpen ? e.content : e.content.slice(0, 100) + (e.content.length > 100 ? "…" : "")}
                    </p>
                    {e.content.length > 100 && (
                      <button onClick={() => setOpen(isOpen ? null : e.id)} className="mt-2 text-sm text-primary hover:underline">
                        {isOpen ? "Collapse" : "Read full entry"}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </AppShell>
  );
}
