// Tiny localStorage-backed in-memory store for the GGS prototype demo.
// Each "table" is a mutable copy of its seed; all CRUD happens here.

import { useEffect, useState } from "react";
import {
  seedActionItems, seedJournalEntries, seedJournalPrompts, seedKbArticles,
  seedAdminUsers, seedEmailCaptures, seedNavigatorSessions, seedUrlMonitor, seedProfile,
  type ActionItem, type JournalEntry, type JournalPrompt, type KbArticle,
  type AdminUser, type EmailCapture, type NavigatorSession, type UrlMonitorRow, type DemoProfile,
} from "./mock";
import {
  seedAgents, seedAgentRuns, seedAiModels, seedIntegrations, seedMcpServers,
  seedMemoryNamespaces, seedMemoryRetrievals, seedKnowledgeSources,
  type Agent, type AgentRun, type AiModel, type Integration, type McpServer,
  type MemoryNamespace, type MemoryRetrieval, type KnowledgeSource,
} from "./agents";

const STORAGE_KEY = "ggs-demo-store-v2";

export type AuthRole = "user" | "admin" | null;

type StoreShape = {
  authRole: AuthRole;
  profile: DemoProfile;
  actionItems: ActionItem[];
  journalEntries: JournalEntry[];
  journalPrompts: JournalPrompt[];
  kbArticles: KbArticle[];
  adminUsers: AdminUser[];
  emailCaptures: EmailCapture[];
  navigatorSessions: NavigatorSession[];
  urlMonitor: UrlMonitorRow[];
  agents: Agent[];
  agentRuns: AgentRun[];
  aiModels: AiModel[];
  integrations: Integration[];
  mcpServers: McpServer[];
  memoryNamespaces: MemoryNamespace[];
  memoryRetrievals: MemoryRetrieval[];
  knowledgeSources: KnowledgeSource[];
};

const seed = (): StoreShape => ({
  authRole: null,
  profile: { ...seedProfile },
  actionItems: seedActionItems.map((x) => ({ ...x })),
  journalEntries: seedJournalEntries.map((x) => ({ ...x })),
  journalPrompts: seedJournalPrompts.map((x) => ({ ...x })),
  kbArticles: seedKbArticles.map((x) => ({ ...x })),
  adminUsers: seedAdminUsers.map((x) => ({ ...x })),
  emailCaptures: seedEmailCaptures.map((x) => ({ ...x })),
  navigatorSessions: seedNavigatorSessions.map((x) => ({ ...x })),
  urlMonitor: seedUrlMonitor.map((x) => ({ ...x })),
  agents: seedAgents.map((x) => ({ ...x })),
  agentRuns: seedAgentRuns.map((x) => ({ ...x })),
  aiModels: seedAiModels.map((x) => ({ ...x })),
  integrations: seedIntegrations.map((x) => ({ ...x })),
  mcpServers: seedMcpServers.map((x) => ({ ...x })),
  memoryNamespaces: seedMemoryNamespaces.map((x) => ({ ...x })),
  memoryRetrievals: seedMemoryRetrievals.map((x) => ({ ...x })),
  knowledgeSources: seedKnowledgeSources.map((x) => ({ ...x })),
});

let state: StoreShape = seed();
let hydrated = false;
const listeners = new Set<() => void>();

function load() {
  if (typeof window === "undefined") return;
  if (hydrated) return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = { ...seed(), ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
  listeners.forEach((fn) => fn());
}

export const store = {
  get: () => { load(); return state; },
  reset: () => { state = seed(); persist(); },
  subscribe: (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; },

  // Auth
  signIn: (role: "user" | "admin") => { load(); state.authRole = role; persist(); },
  signOut: () => { load(); state.authRole = null; persist(); },

  // Profile
  updateProfile: (patch: Partial<DemoProfile>) => { load(); state.profile = { ...state.profile, ...patch }; persist(); },

  // Action items
  toggleAction: (id: string) => {
    load();
    state.actionItems = state.actionItems.map((a) =>
      a.id === id ? { ...a, status: a.status === "done" ? "not_started" : "done" } : a
    );
    persist();
  },

  // Journal
  addJournalEntry: (entry: Omit<JournalEntry, "id" | "created_at">) => {
    load();
    const e: JournalEntry = { ...entry, id: `j-${Date.now()}`, created_at: new Date().toISOString() };
    state.journalEntries = [e, ...state.journalEntries];
    persist();
    return e;
  },
  addJournalPrompt: (text: string) => {
    load();
    state.journalPrompts = [
      { id: `p-${Date.now()}`, prompt_text: text, source: "curated", active: true, grief_stage: null },
      ...state.journalPrompts,
    ];
    persist();
  },
  toggleJournalPrompt: (id: string) => {
    load();
    state.journalPrompts = state.journalPrompts.map((p) => p.id === id ? { ...p, active: !p.active } : p);
    persist();
  },

  // KB
  addKbArticle: (a: Omit<KbArticle, "id" | "updated_at">) => {
    load();
    state.kbArticles = [
      { ...a, id: `k-${Date.now()}`, updated_at: new Date().toISOString() },
      ...state.kbArticles,
    ];
    persist();
  },
  togglePublished: (id: string) => {
    load();
    state.kbArticles = state.kbArticles.map((a) =>
      a.id === id ? { ...a, published: !a.published, updated_at: new Date().toISOString() } : a
    );
    persist();
  },

  // Email captures
  addEmailCapture: (email: string, source: string) => {
    load();
    state.emailCaptures = [
      { id: `e-${Date.now()}`, email, source, created_at: new Date().toISOString() },
      ...state.emailCaptures,
    ];
    persist();
  },

  // URL monitor
  addUrlRow: (row: Omit<UrlMonitorRow, "id" | "last_checked">) => {
    load();
    state.urlMonitor = [
      { ...row, id: `m-${Date.now()}`, last_checked: null },
      ...state.urlMonitor,
    ];
    persist();
  },
  recheckUrl: (id: string) => {
    load();
    state.urlMonitor = state.urlMonitor.map((r) =>
      r.id === id
        ? { ...r, last_checked: new Date().toISOString(), status: r.status === "broken" ? "broken" : "active" }
        : r
    );
    persist();
  },

  // Agents / framework
  toggleAgentStatus: (id: string) => {
    load();
    state.agents = state.agents.map((a) =>
      a.id === id ? { ...a, status: a.status === "active" ? "paused" : "active" } : a
    );
    persist();
  },
  recordAgentRun: (agent_id: string, trigger: string) => {
    load();
    const newRun: AgentRun = { id: `r-${Date.now()}`, agent_id, trigger, status: "success", started_at: new Date().toISOString(), duration_ms: 1500 + Math.round(Math.random() * 1500), tokens_in: 600, tokens_out: 220, cost_usd: 0.012 };
    state.agentRuns = [newRun, ...state.agentRuns].slice(0, 50);
    state.agents = state.agents.map((a) => a.id === agent_id ? { ...a, last_run: new Date().toISOString(), runs_7d: a.runs_7d + 1 } : a);
    persist();
  },
  toggleIntegration: (id: string) => {
    load();
    state.integrations = state.integrations.map((i) =>
      i.id === id ? { ...i, connected: !i.connected, last_event: !i.connected ? new Date().toISOString() : i.last_event } : i
    );
    persist();
  },
  resyncSource: (id: string) => {
    load();
    state.knowledgeSources = state.knowledgeSources.map((s) =>
      s.id === id ? { ...s, last_synced: new Date().toISOString(), sync_status: "synced" } : s
    );
    persist();
  },
};

// React hook to subscribe to the store
export function useStore<T>(selector: (s: StoreShape) => T): T {
  const [snap, setSnap] = useState<T>(() => selector(store.get()));
  useEffect(() => {
    setSnap(selector(store.get()));
    return store.subscribe(() => setSnap(selector(store.get())));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return snap;
}
