import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Search, BookOpen, ChevronDown, ChevronRight, FileText } from "lucide-react";
import type { RagChatMessage, RagCitation, RagEvidence, RagThinkingStep } from "@/lib/rag/types";

const SUGGESTED = [
  "Summarize the key points from the uploaded documents.",
  "What steps should I take in the first 30 days?",
  "What benefits or programs are mentioned in these files?",
];

type Props = {
  title: string;
  subtitle: string;
  initialQuery?: string;
  stateCode?: string | null;
  messages: RagChatMessage[];
  onMessagesChange: (messages: RagChatMessage[]) => void;
  onPersist: (messages: RagChatMessage[]) => Promise<void>;
  onAsk: (message: string, stateCode?: string | null) => Promise<{
    answer: string;
    citations: RagCitation[];
    evidence: RagEvidence[];
    followups: string[];
    thinking: RagThinkingStep[];
  }>;
};

export function RagChat({
  title,
  subtitle,
  initialQuery,
  stateCode,
  messages,
  onMessagesChange,
  onPersist,
  onAsk,
}: Props) {
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [stage, setStage] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const initialSent = useRef(false);

  useEffect(() => {
    if (initialQuery && !initialSent.current && messages.length === 0) {
      initialSent.current = true;
      send(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery, messages.length]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, stage]);

  const send = async (text: string) => {
    if (!text.trim() || streaming) return;

    const userMsg: RagChatMessage = { role: "user", content: text, ts: Date.now() };
    const afterUser = [...messages, userMsg];
    onMessagesChange(afterUser);
    setInput("");
    setStreaming(true);

    const placeholder: RagChatMessage = {
      role: "agent",
      content: "",
      ts: Date.now(),
      thinking: [],
      citations: [],
      evidence: [],
      followups: [],
    };
    onMessagesChange([...afterUser, placeholder]);

    try {
      const result = await onAsk(text, stateCode);

      for (let i = 0; i < result.thinking.length; i++) {
        setStage(i);
        onMessagesChange([
          ...afterUser,
          {
            ...placeholder,
            thinking: result.thinking.slice(0, i + 1),
          },
        ]);
        await new Promise((r) => setTimeout(r, 380 + Math.random() * 220));
      }

      const words = result.answer.split(/(\s+)/);
      let acc = "";
      for (const w of words) {
        acc += w;
        onMessagesChange([
          ...afterUser,
          {
            ...placeholder,
            content: acc,
            thinking: result.thinking,
          },
        ]);
        await new Promise((r) => setTimeout(r, 12 + Math.random() * 20));
      }

      const finalMsg: RagChatMessage = {
        role: "agent",
        content: result.answer,
        ts: Date.now(),
        thinking: result.thinking,
        citations: result.citations,
        evidence: result.evidence,
        followups: result.followups,
      };
      const finalMessages = [...afterUser, finalMsg];
      onMessagesChange(finalMessages);
      await onPersist(finalMessages);
    } catch (err) {
      const errText = err instanceof Error ? err.message : "Something went wrong.";
      const errorMsg: RagChatMessage = {
        role: "agent",
        content: `Sorry, I couldn't complete that request.\n\n${errText}`,
        ts: Date.now(),
      };
      const finalMessages = [...afterUser, errorMsg];
      onMessagesChange(finalMessages);
    } finally {
      setStage(-1);
      setStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <header className="pb-5 border-b border-border flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-3xl">{title}</h1>
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-primary px-2 py-0.5 rounded-full bg-primary/10">
              <Sparkles className="h-3 w-3" /> RAG
            </span>
          </div>
          <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto py-6 space-y-5">
        {messages.length === 0 && (
          <div className="text-muted-foreground text-sm fade-in">
            <p className="mb-3">Try one of these to get started:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-sm px-3 py-2 rounded-md bg-card border border-border hover:border-primary/40"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <RagMessage key={i} msg={m} onFollowup={send} />
        ))}

        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-border pt-4 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the uploaded documents…"
          disabled={streaming}
          className="flex-1 px-4 py-3 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
        />
        <button
          disabled={streaming || !input.trim()}
          className="px-4 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

function RagMessage({ msg, onFollowup }: { msg: RagChatMessage; onFollowup: (s: string) => void }) {
  const [openThinking, setOpenThinking] = useState(false);
  const [openEvidence, setOpenEvidence] = useState(false);
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
      <div className="h-8 w-8 rounded-full bg-primary grid place-items-center text-primary-foreground shrink-0 text-sm">
        📄
      </div>
      <div className="max-w-[80%] space-y-2">
        {msg.thinking && msg.thinking.length > 0 && (
          <button
            onClick={() => setOpenThinking((o) => !o)}
            className="text-[11px] inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            {openThinking ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            <Sparkles className="h-3 w-3 text-primary" />
            {msg.content ? "Thought process" : "Thinking…"}
          </button>
        )}
        {openThinking && msg.thinking && (
          <div className="border-l-2 border-border pl-3 ml-1 space-y-1">
            {msg.thinking.map((t, i) => (
              <div key={i} className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                {t.type === "search" ? (
                  <Search className="h-3 w-3" />
                ) : t.type === "lookup" ? (
                  <BookOpen className="h-3 w-3" />
                ) : (
                  <Sparkles className="h-3 w-3" />
                )}
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
            <div className="uppercase tracking-widest mb-1">Citations</div>
            <ul className="space-y-2">
              {msg.citations.map((c) => (
                <li key={c.chunk_id} className="rounded-md border border-border bg-card/50 p-2">
                  <div className="font-medium text-foreground flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-primary" /> {c.document_title}
                  </div>
                  {c.excerpt && <p className="mt-1 text-muted-foreground italic">"{c.excerpt}"</p>}
                  {c.evidence && <p className="mt-1 text-foreground/80">{c.evidence}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {msg.evidence && msg.evidence.length > 0 && (
          <div className="text-[11px]">
            <button
              onClick={() => setOpenEvidence((o) => !o)}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              {openEvidence ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              <FileText className="h-3 w-3" />
              Evidence ({msg.evidence.length} passages)
            </button>
            {openEvidence && (
              <ul className="mt-2 space-y-2">
                {msg.evidence.map((e) => (
                  <li key={e.chunk_id} className="rounded-md border border-border bg-secondary/40 p-2 text-muted-foreground">
                    <div className="font-medium text-foreground">{e.document_title}</div>
                    {e.citation_label && <div className="text-[10px] uppercase tracking-wide mt-0.5">{e.citation_label}</div>}
                    <p className="mt-1">{e.excerpt}</p>
                    <div className="mt-1 text-[10px]">
                      Similarity {(e.similarity * 100).toFixed(0)}% · Rerank {e.rerank_score.toFixed(1)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {msg.followups && msg.followups.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {msg.followups.map((f) => (
              <button
                key={f}
                onClick={() => onFollowup(f)}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary border border-border hover:border-primary/40 text-foreground"
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
