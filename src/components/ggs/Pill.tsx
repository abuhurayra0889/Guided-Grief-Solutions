import type { ReactNode } from "react";

type Tone = "ok" | "warn" | "bad" | "info" | "muted";

const toneClasses: Record<Tone, string> = {
  ok: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  warn: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  bad: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
  info: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
  muted: "bg-muted text-muted-foreground border-border",
};

export function Pill({ tone = "muted", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}

export function StatusDot({ tone = "ok" }: { tone?: Tone }) {
  const map: Record<Tone, string> = {
    ok: "bg-emerald-500",
    warn: "bg-amber-500",
    bad: "bg-rose-500",
    info: "bg-sky-500",
    muted: "bg-muted-foreground",
  };
  return <span className={`inline-block h-2 w-2 rounded-full ${map[tone]}`} />;
}
