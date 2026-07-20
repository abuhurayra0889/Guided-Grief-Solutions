// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { Pill, StatusDot } from "@/components/ggs/Pill";

export const Route = createFileRoute("/admin/conversations/$id")({
  head: () => ({ meta: [{ title: "Conversation - GGS Admin" }] }),
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
const transcript = [
  { who: "Sarah", text: "I tried to go to the grocery store today. I had to leave.", t: "10:14" },
  { who: "agent", text: "That took courage to even try. What happened in the store?", t: "10:14" },
  { who: "Sarah", text: "I walked into aisle 7 - the cereal aisle - and I saw his Cheerios. I just stood there.", t: "10:15" },
  { who: "agent", text: "Aisle 7 is doing a lot right now. It's holding mornings, routines, his voice asking if you wanted coffee. That's not weakness - that's love with nowhere to land.", t: "10:15" },
  { who: "Sarah", text: "I felt so embarrassed. People were looking.", t: "10:17" },
  { who: "agent", text: "What if next time you went with one small mission - just bread and milk - through the side entrance? You can rebuild the route to the store before you rebuild the whole store.", t: "10:17" },
];
const trace = [
  { step: "Classify intent", detail: "trigger / avoidance / public-space anxiety", ms: 320 },
  { step: "Search KB", detail: "3 hits in 'Triggered grief in public', tier 1", ms: 480 },
  { step: "Recall memory", detail: "Sarah · day 47 · husband Tom · anxiety pattern", ms: 110 },
  { step: "Compose response", detail: "model: gpt-5-mini · tokens 412 · cost $0.0021", ms: 1340 },
  { step: "Safety check", detail: "no crisis markers · passed", ms: 90 },
];
function Page() {
  return (
    <AdminShell>
      <div className="space-y-6">
        
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Conversation</p>
        <h1 className="font-display text-4xl mt-1">Sarah M. · Grocery shopping triggers</h1>
        <p className="text-muted-foreground mt-1">Grief Navigator · session c-001 · 22 min · 4,120 tokens</p>
      </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 space-y-4">
            {transcript.map((m, i) => (
              <div key={i} className={`flex ${m.who === "agent" ? "" : "justify-end"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${m.who === "agent" ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground"}`}>
                  <p>{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.who === "agent" ? "text-muted-foreground" : "text-primary-foreground/70"}`}>{m.t}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-border pt-4 flex gap-2">
              <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">Take over chat</button>
              <button className="px-4 py-2 rounded-md border border-border text-sm">Add private note</button>
              <button className="px-4 py-2 rounded-md border border-border text-sm">Flag for review</button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display text-lg mb-3">Reasoning trace</h3>
              <div className="space-y-2">
                {trace.map((s, i) => (
                  <div key={i} className="text-xs border-l-2 border-primary/40 pl-3">
                    <p className="font-medium">{s.step} <span className="text-muted-foreground tabular-nums">· {s.ms}ms</span></p>
                    <p className="text-muted-foreground">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display text-lg mb-3">Citations</h3>
              <ul className="text-xs space-y-2 text-muted-foreground">
                <li>• Triggered grief in public spaces (KB-014)</li>
                <li>• Sensory memory & loved one's belongings (KB-022)</li>
                <li>• "Small mission" exposure technique (KB-031)</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display text-lg mb-3">Session</h3>
              <dl className="text-xs space-y-1.5">
                <div className="flex justify-between"><dt className="text-muted-foreground">Model</dt><dd>gpt-5-mini</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Cost</dt><dd>$0.0124</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Sentiment</dt><dd><Pill tone="warn">anxious</Pill></dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Safety</dt><dd><Pill tone="ok">passed</Pill></dd></div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
