import { useState } from "react";
import { Brain, Play, Wrench, Shield, Sparkles, MessageSquare, ChevronDown, ChevronRight } from "lucide-react";
import { traceScripts, type TraceStep } from "@/lib/ggs/agents";
import { Pill } from "@/components/ggs/Pill";

const iconFor = (t: TraceStep["type"]) => {
  switch (t) {
    case "plan": return Brain;
    case "tool": return Wrench;
    case "guard": return Shield;
    case "reason": return Sparkles;
    case "respond": return MessageSquare;
  }
};

export function ExecutionTrace({ agentId }: { agentId: string }) {
  const script = traceScripts[agentId];
  const [running, setRunning] = useState(false);
  const [shown, setShown] = useState<TraceStep[]>([]);
  const [final, setFinal] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  if (!script) {
    return <p className="text-sm text-muted-foreground">No demo trace available for this agent yet.</p>;
  }

  const run = async () => {
    setRunning(true);
    setShown([]);
    setFinal("");
    for (const step of script.steps) {
      await new Promise((r) => setTimeout(r, step.delay_ms));
      setShown((s) => [...s, step]);
    }
    // Stream final tokens
    const text = script.final;
    const words = text.split(/(\s+)/);
    let acc = "";
    for (const w of words) {
      acc += w;
      setFinal(acc);
      await new Promise((r) => setTimeout(r, 18 + Math.random() * 28));
    }
    setRunning(false);
  };

  return (
    <div className="space-y-5">
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Sample task</p>
            <p className="font-mono text-sm mt-1 text-foreground">{script.prompt}</p>
          </div>
          <button onClick={run} disabled={running}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark disabled:opacity-50">
            <Play className="h-4 w-4" /> {running ? "Running…" : shown.length ? "Run again" : "Run sample task"}
          </button>
        </div>
      </div>

      {shown.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Live execution trace</p>
          <ol className="relative border-l border-border ml-2 space-y-3">
            {shown.map((step) => {
              const Icon = iconFor(step.type)!;
              const open = expanded[step.id];
              const hasDetail = !!step.payload;
              return (
                <li key={step.id} className="pl-5 relative slide-up">
                  <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-card border-2 border-primary grid place-items-center">
                    <Icon className="h-2.5 w-2.5 text-primary" />
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Pill tone={step.type === "guard" ? "warn" : step.type === "tool" ? "info" : "muted"}>{step.type}</Pill>
                    <span className="font-mono text-sm text-foreground">{step.title}</span>
                    {step.tokens && <span className="text-[11px] text-muted-foreground tabular-nums">{step.tokens} tok</span>}
                    <span className="text-[11px] text-muted-foreground tabular-nums">{step.delay_ms}ms</span>
                    {hasDetail && (
                      <button onClick={() => setExpanded((e) => ({ ...e, [step.id]: !open }))}
                        className="ml-auto text-muted-foreground hover:text-foreground">
                        {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{step.detail}</p>
                  {open && hasDetail && (
                    <pre className="mt-2 p-3 rounded-md bg-muted text-[11px] font-mono overflow-x-auto">
{JSON.stringify(step.payload, null, 2)}
                    </pre>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {final && (
        <div className="bg-secondary border border-primary/20 rounded-xl p-5">
          <p className="text-[10px] uppercase tracking-widest text-primary mb-2">Final response</p>
          <p className="whitespace-pre-line text-sm leading-relaxed">{final}{running && <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-pulse" />}</p>
        </div>
      )}
    </div>
  );
}
