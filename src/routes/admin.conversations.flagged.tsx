// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/conversations/flagged")({
  head: () => ({ meta: [{ title: "Flagged - GGS Admin" }] }),
  component: Page,
});

const sessions = [
  { id: "c-001", user: "Sarah M.", agent: "Grief Navigator", topic: "Grocery shopping triggers", last: "I keep avoiding aisle 7…", sentiment: "anxious", flagged: false, msgs: 14, mins: 22, tokens: 4120, when: "12 min ago" },
  { id: "c-002", user: "Maria L.", agent: "Journal Companion", topic: "First holiday alone", last: "Reflecting on Thanksgiving plans.", sentiment: "calm", flagged: false, msgs: 8, mins: 11, tokens: 2310, when: "1h ago" },
  { id: "c-003", user: "Patricia G.", agent: "Grief Navigator", topic: "Estate paperwork overwhelm", last: "I don't know where to start with probate.", sentiment: "anxious", flagged: false, msgs: 21, mins: 34, tokens: 6890, when: "2h ago" },
  { id: "c-004", user: "Linda K.", agent: "Grief Navigator", topic: "Sleep - 3am wakes", last: "Some nights I wonder why I'm still here.", sentiment: "crisis", flagged: true, msgs: 6, mins: 9, tokens: 1820, when: "3h ago" },
  { id: "c-005", user: "Joan R.", agent: "Journal Companion", topic: "Letter to him", last: "Today I told him about Maya's recital.", sentiment: "calm", flagged: false, msgs: 4, mins: 14, tokens: 1290, when: "5h ago" },
  { id: "c-006", user: "Eleanor T.", agent: "Grief Navigator", topic: "Adult kids checking in too much", last: "They mean well but I need space.", sentiment: "calm", flagged: false, msgs: 11, mins: 17, tokens: 3210, when: "8h ago" },
  { id: "c-007", user: "Beverly H.", agent: "Grief Navigator", topic: "Anniversary dread", last: "Two weeks until it would have been 40 years.", sentiment: "anxious", flagged: false, msgs: 19, mins: 28, tokens: 5010, when: "yesterday" },
  { id: "c-008", user: "Carol W.", agent: "Journal Companion", topic: "Mood - lighter today", last: "I laughed at something on the radio.", sentiment: "calm", flagged: false, msgs: 3, mins: 6, tokens: 720, when: "yesterday" },
  { id: "c-009", user: "Diane P.", agent: "Grief Navigator", topic: "Anger at his doctor", last: "I keep replaying the day of the diagnosis.", sentiment: "anxious", flagged: true, msgs: 16, mins: 25, tokens: 4480, when: "2d ago" },
  { id: "c-010", user: "Rosa N.", agent: "Grief Navigator", topic: "Moving - keep the house?", last: "The kids want me to downsize.", sentiment: "calm", flagged: false, msgs: 24, mins: 41, tokens: 7340, when: "2d ago" },
];
const tone = (s: any) => s === "calm" ? "ok" : s === "anxious" ? "warn" : "bad";
const flagged = sessions.filter(s => s.flagged || s.sentiment === "crisis");
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Conversations</p>
        <h1 className="font-display text-4xl mt-1">Flagged queue</h1>
        <p className="text-muted-foreground mt-1">Sessions the safety classifier raised for human review.</p>
      </div>
        <div className="space-y-3">
          {flagged.map(s => (
            <div key={s.id} className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-rose-500/15 grid place-items-center text-rose-600">!</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{s.user}</span>
                  <Pill tone={tone(s.sentiment)}>{s.sentiment}</Pill>
                  <span className="text-xs text-muted-foreground">{s.when}</span>
                </div>
                <p className="text-sm">{s.last}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.agent} · {s.topic}</p>
              </div>
              <a href={`/admin/conversations/${s.id}`} className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">Review</a>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
