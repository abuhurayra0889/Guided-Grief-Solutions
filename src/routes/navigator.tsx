import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/ggs/AppShell";
import { Send, Sparkles, Search, BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import { useStore } from "@/lib/ggs/mockStore";

type SearchParams = { q?: string };

export const Route = createFileRoute("/navigator")({
  head: () => ({ meta: [{ title: "Navigator - GGS" }] }),
  validateSearch: (s: Record<string, unknown>): SearchParams => ({ q: typeof s.q === "string" ? s.q : undefined }),
  component: Navigator,
});

type ThinkingStep = { type: "search" | "lookup" | "compose"; label: string };
type Citation = { id: string; title: string };

type Msg = {
  role: "user" | "agent";
  content: string;
  ts: number;
  thinking?: ThinkingStep[];
  citations?: Citation[];
  followups?: string[];
};

const SUGGESTED = [
  "What are my Social Security survivor benefits?",
  "How does NJ probate work, step by step?",
  "What should I focus on in the first 30 days?",
];

function buildReply(input: string, kb: { id: string; title: string; state_code: string; category: string }[]): { text: string; cites: Citation[]; thinking: ThinkingStep[]; followups: string[] } {
  const t = input.toLowerCase();
  let text = "";
  let topics: string[] = [];

  if (t.includes("social security") || t.includes("ssa") || t.includes("survivor benefit")) {
    topics = ["benefits", "ssa"];
    text = "I'm glad you're asking - many widows wait too long on this one.\n\nAs a surviving spouse, you may be eligible for monthly Social Security survivor benefits if your spouse paid into Social Security. The basics:\n\n1. You can apply as early as age 60 (50 if disabled, any age if caring for a child under 16).\n2. The benefit amount is based on your spouse's earnings record - usually 71%–100% of what they would have received.\n3. You cannot apply online for survivor benefits - call SSA at 1-800-772-1213 to schedule an appointment, or visit a local office.\n\nWhat to bring: certified death certificate, your marriage certificate, your spouse's SSN, and your own ID.";
  } else if (t.includes("probate") || t.includes("estate") || t.includes("surrogate")) {
    topics = ["probate", "nj"];
    text = "Probate sounds bigger than it usually is. In New Jersey, the typical timeline is 9–18 months and the first step is the smallest one.\n\nHere's the path:\n\n1. Locate the original will (a copy will be rejected - Surrogate's Court only accepts the original).\n2. Schedule an appointment with your county Surrogate's Court within ~60 days.\n3. Bring the will, a certified death certificate, photo ID, and a check ($100–$200) for the filing fee.\n4. The Surrogate will swear you in as Executor and issue Letters Testamentary on the spot.\n\nThose Letters are what every bank, insurer, and agency will ask for from this point forward.";
  } else if (t.includes("first 30") || t.includes("first month") || t.includes("first thing") || t.includes("start") || t.includes("focus")) {
    topics = ["urgent", "first-30"];
    text = "The first 30 days are mostly about three things - and you don't have to do them all this week.\n\n1. Get 10–15 certified copies of the death certificate. Every institution will want one.\n2. Notify Social Security (call, don't wait for the funeral home to do it). If your spouse was a veteran, also notify the VA.\n3. Locate the original will and any trust documents. If there's a will, you'll be filing with your county Surrogate's Court soon.\n\nDon't rush to close accounts or cancel anything yet - refunds, automatic deposits, and final paychecks may still arrive.";
  } else if (t.includes("life insurance")) {
    topics = ["financial", "insurance"];
    text = "Most life insurance claims pay within 30–60 days once the insurer has the paperwork.\n\nWhat to do:\n\n1. Call the carrier directly and ask for the bereavement / claims line.\n2. They'll send you a claim form. You'll return it with a certified death certificate.\n3. If you can't find a policy, check old tax returns or run a free search at the NAIC's Life Insurance Policy Locator.\n\nTip: ask whether you can take the payout as a lump sum or as a structured annuity - it has tax implications worth thinking through with an advisor.";
  } else if (t.includes("help") || t.includes("don't know") || t.includes("dont know") || t.includes("overwhelm") || t.includes("can't") || t.includes("cant")) {
    topics = ["overwhelm"];
    text = "That's not just understandable - it's the right response to what you're going through. Let's slow down.\n\nCan you tell me the one thing that feels most urgent right now? Just one. We'll start there, and the rest can wait.\n\nIf nothing feels urgent and you just need a quiet plan for this week, I can put one together for you.";
  } else {
    topics = ["general"];
    text = "Good question. Based on where you are, here's what I'd look at first:\n\n1. Make sure you have 10–15 certified copies of the death certificate.\n2. Notify Social Security and any pension provider within the first 30 days.\n3. Locate the original will and contact your county Surrogate's Court.\n\nWhich of these would you like to dig into first?";
  }

  // Pick citations from KB based on simple keyword match
  const cites = kb
    .filter((a) => topics.some((tp) => a.category.toLowerCase().includes(tp.slice(0, 4)) || a.title.toLowerCase().includes(tp.slice(0, 4))))
    .slice(0, 3)
    .map((a) => ({ id: a.id, title: a.title }));

  const thinking: ThinkingStep[] = [
    { type: "search", label: `Searching knowledge base · "${input.slice(0, 40)}${input.length > 40 ? "…" : ""}"` },
    { type: "lookup", label: "Pulling state-specific rules" },
    { type: "compose", label: "Drafting a clear, plain-language reply" },
  ];

  const followups =
    topics.includes("ssa") ? ["What documents do I need for the SSA appointment?", "Can I get a one-time death benefit too?"] :
    topics.includes("probate") ? ["What happens after Letters Testamentary?", "How do I notify creditors?"] :
    topics.includes("first-30") ? ["Walk me through getting certified death certificates", "How do I notify Social Security?"] :
    ["Tell me more about probate", "What benefits am I entitled to?"];

  return { text, cites: cites.length ? cites : kb.slice(0, 2).map((a) => ({ id: a.id, title: a.title })), thinking, followups };
}

function Navigator() {
  const { q } = Route.useSearch();
  const kb = useStore((s) => s.kbArticles);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [stage, setStage] = useState<number>(-1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (q) send(q); /* eslint-disable-next-line */ }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, stage]);

  const send = async (text: string) => {
    if (!text.trim() || streaming) return;
    const userMsg: Msg = { role: "user", content: text, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setStreaming(true);

    const { text: replyText, cites, thinking, followups } = buildReply(text, kb);

    // Stage thinking steps
    const placeholder: Msg = { role: "agent", content: "", ts: Date.now(), thinking: [], citations: [], followups: [] };
    setMessages((m) => [...m, placeholder]);

    for (let i = 0; i < thinking.length; i++) {
      setStage(i);
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { ...copy[copy.length - 1], thinking: thinking.slice(0, i + 1) };
        return copy;
      });
      await new Promise((r) => setTimeout(r, 420 + Math.random() * 280));
    }

    // Stream tokens
    const words = replyText.split(/(\s+)/);
    let acc = "";
    for (const w of words) {
      acc += w;
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { ...copy[copy.length - 1], content: acc };
        return copy;
      });
      await new Promise((r) => setTimeout(r, 14 + Math.random() * 24));
    }

    setMessages((m) => {
      const copy = [...m];
      copy[copy.length - 1] = { ...copy[copy.length - 1], citations: cites, followups };
      return copy;
    });
    setStage(-1);
    setStreaming(false);
  };

  return (
    <AppShell>
      <div className="flex flex-col h-[calc(100vh-5rem)]">
        <header className="pb-5 border-b border-border flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-3xl">Your GGS Navigator</h1>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-primary px-2 py-0.5 rounded-full bg-primary/10">
                <Sparkles className="h-3 w-3" /> AI agent
              </span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">Powered by the Grief Navigator agent - grounded in our curated knowledge base.</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto py-6 space-y-5">
          {messages.length === 0 && (
            <div className="text-muted-foreground text-sm fade-in">
              <p className="mb-3">Try one of these to get started:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    className="text-left text-sm px-3 py-2 rounded-md bg-card border border-border hover:border-primary/40">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <Message key={i} msg={m} onFollowup={send} />
          ))}

          <div ref={endRef} />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="border-t border-border pt-4 flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question…"
            disabled={streaming}
            className="flex-1 px-4 py-3 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60" />
          <button disabled={streaming || !input.trim()}
            className="px-4 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark disabled:opacity-50">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </AppShell>
  );
}

function Message({ msg, onFollowup }: { msg: Msg; onFollowup: (s: string) => void }) {
  const [openThinking, setOpenThinking] = useState(false);
  const isUser = msg.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end slide-up">
        <div className="max-w-[75%] rounded-2xl rounded-br-sm px-4 py-3 text-sm bg-primary text-primary-foreground whitespace-pre-line">
          {msg.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 slide-up">
      <div className="h-8 w-8 rounded-full bg-primary grid place-items-center text-primary-foreground shrink-0 text-sm">🕊️</div>
      <div className="max-w-[80%] space-y-2">
        {msg.thinking && msg.thinking.length > 0 && (
          <button onClick={() => setOpenThinking((o) => !o)}
            className="text-[11px] inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
            {openThinking ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            <Sparkles className="h-3 w-3 text-primary" />
            {msg.content ? "Thought process" : "Thinking…"}
          </button>
        )}
        {openThinking && msg.thinking && (
          <div className="border-l-2 border-border pl-3 ml-1 space-y-1">
            {msg.thinking.map((t, i) => (
              <div key={i} className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                {t.type === "search" ? <Search className="h-3 w-3" /> : t.type === "lookup" ? <BookOpen className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
                {t.label}
              </div>
            ))}
          </div>
        )}

        {msg.content && (
          <div className="rounded-2xl rounded-bl-sm px-4 py-3 text-sm bg-surface border border-border whitespace-pre-line leading-relaxed">
            {msg.content}
          </div>
        )}

        {msg.citations && msg.citations.length > 0 && (
          <div className="text-[11px] text-muted-foreground">
            <div className="uppercase tracking-widest mb-1">Sources</div>
            <ul className="space-y-1">
              {msg.citations.map((c) => (
                <li key={c.id}>
                  <Link to="/knowledge-base/$id" params={{ id: c.id }}
                    className="inline-flex items-center gap-1 text-primary hover:underline">
                    <BookOpen className="h-3 w-3" /> {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {msg.followups && msg.followups.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {msg.followups.map((f) => (
              <button key={f} onClick={() => onFollowup(f)}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary border border-border hover:border-primary/40 text-foreground">
                {f}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
