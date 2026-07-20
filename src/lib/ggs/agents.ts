// Mock agentic-framework data for the Control Tower demo. Pure seeds - no backend.

export type AgentStatus = "active" | "paused" | "training";

export type AgentTool = {
  name: string;
  description: string;
  type: "kb_search" | "state_lookup" | "rss_fetch" | "summarize" | "moderation" | "email" | "embed" | "escalate" | "analytics";
};

export type Agent = {
  id: string;
  name: string;
  role: string;
  description: string;
  status: AgentStatus;
  model: string;
  fallback_model?: string;
  temperature: number;
  owner: string;
  category: "user-facing" | "knowledge" | "ops";
  tools: AgentTool[];
  knowledge_scopes: string[];
  personality: string;
  system_prompt: string;
  runs_7d: number;
  success_rate: number;
  avg_latency_ms: number;
  cost_7d: number;
  last_run: string;
  emoji: string;
};

export type AgentRun = {
  id: string;
  agent_id: string;
  trigger: string;
  user?: string;
  status: "success" | "failed" | "running";
  started_at: string;
  duration_ms: number;
  tokens_in: number;
  tokens_out: number;
  cost_usd: number;
};

export type AiModel = {
  id: string;
  provider: "Google" | "OpenAI" | "Anthropic";
  name: string;
  context_window: number;
  cost_per_1k_in: number;
  cost_per_1k_out: number;
  enabled: boolean;
  default_for?: string[];
};

export type Integration = {
  id: string;
  name: string;
  category: "email" | "comms" | "payments" | "storage" | "calendar" | "analytics" | "crm";
  description: string;
  connected: boolean;
  last_event?: string;
  events_30d: number;
};

export type McpServer = {
  id: string;
  name: string;
  transport: "http" | "stdio" | "sse";
  url: string;
  status: "online" | "offline" | "degraded";
  tools_exposed: string[];
  used_by: string[]; // agent ids
  last_ping: string;
};

export type MemoryNamespace = {
  id: string;
  name: string;
  vectors: number;
  dim: number;
  index: "hnsw" | "flat";
  last_updated: string;
};

export type MemoryRetrieval = {
  id: string;
  query: string;
  agent_id: string;
  namespace: string;
  top_k: number;
  top_score: number;
  ts: string;
};

export type KnowledgeSource = {
  id: string;
  name: string;
  url: string;
  source_type: "Federal" | "State" | "Nonprofit" | "Legal" | "Editorial";
  tier: 1 | 2;
  docs: number;
  last_synced: string;
  sync_status: "synced" | "syncing" | "error";
  curator_agent: string;
};

const ago = (mins: number) => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - mins);
  return d.toISOString();
};
const hoursAgo = (h: number) => ago(h * 60);
const daysAgo = (d: number) => ago(d * 60 * 24);

export const seedAgents: Agent[] = [
  {
    id: "grief-navigator",
    name: "Grief Navigator",
    role: "Primary widow-facing concierge",
    description:
      "A warm, plain-language conversational guide that answers questions about benefits, probate, and next steps - grounded in the curated knowledge base.",
    status: "active",
    model: "google/gemini-2.5-pro",
    fallback_model: "openai/gpt-5-mini",
    temperature: 0.6,
    owner: "Haley K.",
    category: "user-facing",
    emoji: "🕊️",
    tools: [
      { name: "kb.search", description: "Semantic search over curated KB", type: "kb_search" },
      { name: "state_rules.lookup", description: "Pull state-specific probate / benefit rules", type: "state_lookup" },
      { name: "escalate.human", description: "Hand off to a human navigator", type: "escalate" },
    ],
    knowledge_scopes: ["kb:public", "state-rules:50-state", "tier-1-sources"],
    personality:
      "Warm, plain-spoken, never clinical. Acknowledges grief before answering. Never gives legal advice - always cites sources.",
    system_prompt:
      "You are a Grief Navigator at Guided Grief Solutions. Speak like a friend who happens to know the system. Always: (1) acknowledge feeling first, (2) answer concretely with a numbered next step, (3) cite the KB article(s) you used, (4) offer one follow-up. Never invent legal procedure - if unsure, say so and recommend an attorney consult.",
    runs_7d: 412,
    success_rate: 0.974,
    avg_latency_ms: 1840,
    cost_7d: 18.42,
    last_run: ago(3),
  },
  {
    id: "knowledge-curator",
    name: "Knowledge Curator",
    role: "Ingests and structures source material",
    description:
      "Reads new articles from monitored sources, summarizes them, tags by state and topic, flags PII, and proposes drafts for the editorial team.",
    status: "active",
    model: "google/gemini-2.5-flash",
    temperature: 0.2,
    owner: "Editorial",
    category: "knowledge",
    emoji: "📚",
    tools: [
      { name: "rss.fetch", description: "Pull new items from monitored RSS feeds", type: "rss_fetch" },
      { name: "summarize.long", description: "Condense long-form content into KB-shaped drafts", type: "summarize" },
      { name: "embed.upsert", description: "Write embeddings into the vector store", type: "embed" },
      { name: "moderation.scan", description: "Flag unsafe / out-of-scope advice", type: "moderation" },
    ],
    knowledge_scopes: ["sources:tier-1", "sources:tier-2"],
    personality: "Precise, conservative, never speculates. Always preserves the citation chain.",
    system_prompt:
      "You are an editorial curator. Convert source articles into KB drafts. Output: title, 1-paragraph summary, body in plain English, tags (state[], category, audience). Flag legal claims for attorney review. Never publish - only propose.",
    runs_7d: 86,
    success_rate: 0.965,
    avg_latency_ms: 4200,
    cost_7d: 6.81,
    last_run: hoursAgo(4),
  },
  {
    id: "source-sentinel",
    name: "Source Sentinel",
    role: "Watches the URL registry for drift",
    description:
      "Pings every monitored source on a schedule, detects 404s and meaningful content drift, and opens review tasks when something changes.",
    status: "active",
    model: "google/gemini-2.5-flash-lite",
    temperature: 0.0,
    owner: "Ops",
    category: "knowledge",
    emoji: "🛰️",
    tools: [
      { name: "http.fetch", description: "Fetch and hash page content", type: "rss_fetch" },
      { name: "diff.semantic", description: "Compare content drift semantically", type: "summarize" },
      { name: "task.open", description: "File a review task for the editorial team", type: "escalate" },
    ],
    knowledge_scopes: ["url-monitor:all"],
    personality: "Silent unless something changes. Then specific.",
    system_prompt:
      "Monitor every source in the URL registry. If a page returns non-200, mark broken. If content changes meaningfully (semantic diff > 0.25), open a review task with a one-line rationale.",
    runs_7d: 1248,
    success_rate: 0.998,
    avg_latency_ms: 620,
    cost_7d: 2.14,
    last_run: ago(11),
  },
  {
    id: "journal-companion",
    name: "Journal Companion",
    role: "Reflects with users on journal entries",
    description:
      "Generates the daily prompt, reads new entries with consent, and offers a brief, non-clinical reflection plus a gentle pattern observation.",
    status: "active",
    model: "google/gemini-2.5-pro",
    temperature: 0.8,
    owner: "Care Team",
    category: "user-facing",
    emoji: "🌿",
    tools: [
      { name: "kb.search", description: "Surface a relevant grief resource if asked", type: "kb_search" },
      { name: "moderation.scan", description: "Detect crisis language and route to 988", type: "moderation" },
    ],
    knowledge_scopes: ["kb:grief-support", "user-journal:opted-in"],
    personality: "Tender. Never advice-giving unless asked. Mirrors the user's words back.",
    system_prompt:
      "You are the Journal Companion. After a user saves an entry, write a 2-3 sentence reflection that honors what they said. If you've seen a recurring theme across 3+ entries, mention it once, gently. If you detect crisis language, surface 988 immediately.",
    runs_7d: 198,
    success_rate: 0.991,
    avg_latency_ms: 1320,
    cost_7d: 7.08,
    last_run: ago(28),
  },
  {
    id: "insights-analyst",
    name: "Insights Analyst",
    role: "Generates ops digests and cohort trends",
    description:
      "Produces the weekly Control Tower digest: signups by state, top Navigator topics, content gaps, and journal mood trends - sent to the team Slack.",
    status: "active",
    model: "openai/gpt-5-mini",
    temperature: 0.3,
    owner: "Ops",
    category: "ops",
    emoji: "📊",
    tools: [
      { name: "analytics.query", description: "Read aggregate stats from the warehouse", type: "analytics" },
      { name: "summarize.long", description: "Distill the week into a digest", type: "summarize" },
      { name: "email.send", description: "Send the digest", type: "email" },
    ],
    knowledge_scopes: ["analytics:read"],
    personality: "Crisp. Numbers first.",
    system_prompt:
      "Every Monday 7am ET, generate a 5-bullet weekly digest: signups, active users, top 3 Navigator topics, top content gap, mood trend. Send to ops@ggs.",
    runs_7d: 1,
    success_rate: 1,
    avg_latency_ms: 8200,
    cost_7d: 0.42,
    last_run: daysAgo(2),
  },
  {
    id: "compliance-guardian",
    name: "Compliance Guardian",
    role: "Pre-publish check for content & PII",
    description:
      "Scans every piece of content before publish - KB articles, journal prompts, Navigator replies (sampled) - for PII leakage, unauthorized legal advice, and tone violations.",
    status: "active",
    model: "openai/gpt-5-mini",
    temperature: 0.0,
    owner: "Legal",
    category: "ops",
    emoji: "🛡️",
    tools: [
      { name: "moderation.scan", description: "Detect PII, unsafe advice, tone breaks", type: "moderation" },
      { name: "task.open", description: "Block publish + open a review task", type: "escalate" },
    ],
    knowledge_scopes: ["policy:editorial", "policy:legal-disclaimer"],
    personality: "Strict. Quiet. Either approves or holds.",
    system_prompt:
      "Approve only if: no PII, no unauthorized legal advice, tone matches editorial guide. Otherwise, hold and write a one-paragraph reason.",
    runs_7d: 142,
    success_rate: 1,
    avg_latency_ms: 980,
    cost_7d: 1.96,
    last_run: ago(52),
  },
];

export const seedAgentRuns: AgentRun[] = [
  { id: "r1", agent_id: "grief-navigator", trigger: "user chat", user: "Sarah Mitchell", status: "success", started_at: ago(3), duration_ms: 1742, tokens_in: 812, tokens_out: 246, cost_usd: 0.014 },
  { id: "r2", agent_id: "grief-navigator", trigger: "user chat", user: "Patricia Johnson", status: "success", started_at: ago(18), duration_ms: 2103, tokens_in: 690, tokens_out: 312, cost_usd: 0.018 },
  { id: "r3", agent_id: "grief-navigator", trigger: "user chat", user: "Linda Chen", status: "success", started_at: ago(42), duration_ms: 1890, tokens_in: 720, tokens_out: 198, cost_usd: 0.013 },
  { id: "r4", agent_id: "knowledge-curator", trigger: "scheduled", status: "success", started_at: hoursAgo(4), duration_ms: 4200, tokens_in: 4120, tokens_out: 980, cost_usd: 0.061 },
  { id: "r5", agent_id: "source-sentinel", trigger: "scheduled", status: "success", started_at: ago(11), duration_ms: 580, tokens_in: 0, tokens_out: 0, cost_usd: 0.001 },
  { id: "r6", agent_id: "source-sentinel", trigger: "scheduled", status: "failed", started_at: hoursAgo(2), duration_ms: 12000, tokens_in: 0, tokens_out: 0, cost_usd: 0 },
  { id: "r7", agent_id: "journal-companion", trigger: "entry.saved", user: "Sarah Mitchell", status: "success", started_at: ago(28), duration_ms: 1320, tokens_in: 412, tokens_out: 168, cost_usd: 0.009 },
  { id: "r8", agent_id: "compliance-guardian", trigger: "kb.publish", status: "success", started_at: ago(52), duration_ms: 980, tokens_in: 1840, tokens_out: 84, cost_usd: 0.011 },
  { id: "r9", agent_id: "insights-analyst", trigger: "weekly cron", status: "success", started_at: daysAgo(2), duration_ms: 8200, tokens_in: 6800, tokens_out: 1200, cost_usd: 0.082 },
];

export const seedAiModels: AiModel[] = [
  { id: "google/gemini-2.5-pro", provider: "Google", name: "Gemini 2.5 Pro", context_window: 2000000, cost_per_1k_in: 0.00125, cost_per_1k_out: 0.005, enabled: true, default_for: ["grief-navigator", "journal-companion"] },
  { id: "google/gemini-2.5-flash", provider: "Google", name: "Gemini 2.5 Flash", context_window: 1000000, cost_per_1k_in: 0.00015, cost_per_1k_out: 0.0006, enabled: true, default_for: ["knowledge-curator"] },
  { id: "google/gemini-2.5-flash-lite", provider: "Google", name: "Gemini 2.5 Flash Lite", context_window: 1000000, cost_per_1k_in: 0.00005, cost_per_1k_out: 0.0002, enabled: true, default_for: ["source-sentinel"] },
  { id: "openai/gpt-5", provider: "OpenAI", name: "GPT-5", context_window: 256000, cost_per_1k_in: 0.0025, cost_per_1k_out: 0.01, enabled: true },
  { id: "openai/gpt-5-mini", provider: "OpenAI", name: "GPT-5 Mini", context_window: 256000, cost_per_1k_in: 0.0005, cost_per_1k_out: 0.002, enabled: true, default_for: ["insights-analyst", "compliance-guardian"] },
  { id: "openai/gpt-5-nano", provider: "OpenAI", name: "GPT-5 Nano", context_window: 128000, cost_per_1k_in: 0.0001, cost_per_1k_out: 0.0004, enabled: false },
];

export const seedIntegrations: Integration[] = [
  { id: "sendgrid", name: "SendGrid", category: "email", description: "Transactional email - onboarding, weekly digest, action reminders.", connected: true, last_event: ago(12), events_30d: 1842 },
  { id: "twilio", name: "Twilio", category: "comms", description: "SMS reminders for time-sensitive deadlines (probate filing, SSA appts).", connected: true, last_event: hoursAgo(3), events_30d: 318 },
  { id: "stripe", name: "Stripe", category: "payments", description: "Premium concierge tier billing.", connected: false, events_30d: 0 },
  { id: "google-drive", name: "Google Drive", category: "storage", description: "User document vault - death certificates, wills, policies.", connected: true, last_event: ago(48), events_30d: 96 },
  { id: "calendly", name: "Calendly", category: "calendar", description: "Schedule attorney consults and care-team check-ins.", connected: true, last_event: hoursAgo(7), events_30d: 41 },
  { id: "notion", name: "Notion", category: "storage", description: "Editorial workspace - drafts from Knowledge Curator land here.", connected: true, last_event: hoursAgo(4), events_30d: 86 },
  { id: "slack", name: "Slack", category: "comms", description: "Team alerts, weekly digest, escalations.", connected: true, last_event: ago(28), events_30d: 412 },
  { id: "posthog", name: "PostHog", category: "analytics", description: "Product analytics - funnels, retention, feature usage.", connected: false, events_30d: 0 },
];

export const seedMcpServers: McpServer[] = [
  { id: "mcp-kb", name: "ggs-knowledge-mcp", transport: "http", url: "https://mcp.ggs.internal/knowledge", status: "online", tools_exposed: ["kb.search", "kb.get", "kb.cite"], used_by: ["grief-navigator", "journal-companion"], last_ping: ago(2) },
  { id: "mcp-state", name: "state-rules-mcp", transport: "http", url: "https://mcp.ggs.internal/state-rules", status: "online", tools_exposed: ["state_rules.lookup", "state_rules.deadlines"], used_by: ["grief-navigator"], last_ping: ago(4) },
  { id: "mcp-monitor", name: "url-monitor-mcp", transport: "http", url: "https://mcp.ggs.internal/monitor", status: "online", tools_exposed: ["http.fetch", "diff.semantic", "task.open"], used_by: ["source-sentinel"], last_ping: ago(11) },
  { id: "mcp-comms", name: "comms-mcp", transport: "sse", url: "https://mcp.ggs.internal/comms", status: "degraded", tools_exposed: ["email.send", "sms.send", "slack.post"], used_by: ["insights-analyst"], last_ping: hoursAgo(1) },
  { id: "mcp-vault", name: "doc-vault-mcp", transport: "http", url: "https://mcp.ggs.internal/vault", status: "online", tools_exposed: ["doc.upload", "doc.list", "doc.share"], used_by: [], last_ping: ago(38) },
];

export const seedMemoryNamespaces: MemoryNamespace[] = [
  { id: "kb-public", name: "kb:public", vectors: 1842, dim: 768, index: "hnsw", last_updated: hoursAgo(4) },
  { id: "state-rules", name: "state-rules:50-state", vectors: 4120, dim: 768, index: "hnsw", last_updated: daysAgo(1) },
  { id: "tier-1", name: "sources:tier-1", vectors: 6480, dim: 768, index: "hnsw", last_updated: hoursAgo(8) },
  { id: "tier-2", name: "sources:tier-2", vectors: 12940, dim: 768, index: "hnsw", last_updated: hoursAgo(6) },
  { id: "user-journal", name: "user-journal:opted-in", vectors: 384, dim: 768, index: "flat", last_updated: ago(28) },
  { id: "policy", name: "policy:editorial+legal", vectors: 142, dim: 768, index: "flat", last_updated: daysAgo(7) },
];

export const seedMemoryRetrievals: MemoryRetrieval[] = [
  { id: "mr1", query: "NJ probate filing deadlines", agent_id: "grief-navigator", namespace: "state-rules:50-state", top_k: 5, top_score: 0.892, ts: ago(3) },
  { id: "mr2", query: "Social Security survivor benefits eligibility", agent_id: "grief-navigator", namespace: "kb:public", top_k: 5, top_score: 0.914, ts: ago(18) },
  { id: "mr3", query: "Bergen County Surrogate Court", agent_id: "grief-navigator", namespace: "kb:public", top_k: 3, top_score: 0.871, ts: ago(42) },
  { id: "mr4", query: "joint bank account transfer", agent_id: "grief-navigator", namespace: "kb:public", top_k: 5, top_score: 0.804, ts: hoursAgo(2) },
  { id: "mr5", query: "VA DIC eligibility surviving spouse", agent_id: "knowledge-curator", namespace: "sources:tier-1", top_k: 8, top_score: 0.928, ts: hoursAgo(4) },
  { id: "mr6", query: "sleep grief insomnia widow", agent_id: "journal-companion", namespace: "kb:public", top_k: 3, top_score: 0.762, ts: ago(28) },
];

export const seedKnowledgeSources: KnowledgeSource[] = [
  { id: "ks1", name: "SSA - Survivor Benefits", url: "https://www.ssa.gov/benefits/survivors/", source_type: "Federal", tier: 1, docs: 84, last_synced: hoursAgo(3), sync_status: "synced", curator_agent: "knowledge-curator" },
  { id: "ks2", name: "VA - Family & Caregiver", url: "https://www.va.gov/family-and-caregiver-benefits/", source_type: "Federal", tier: 1, docs: 62, last_synced: hoursAgo(6), sync_status: "synced", curator_agent: "knowledge-curator" },
  { id: "ks3", name: "Medicare.gov", url: "https://www.medicare.gov/", source_type: "Federal", tier: 1, docs: 121, last_synced: hoursAgo(8), sync_status: "synced", curator_agent: "knowledge-curator" },
  { id: "ks4", name: "NJ Courts - Surrogate", url: "https://www.njcourts.gov/selfhelp/probate", source_type: "State", tier: 1, docs: 38, last_synced: daysAgo(1), sync_status: "synced", curator_agent: "knowledge-curator" },
  { id: "ks5", name: "NY Surrogate's Court", url: "https://www.nycourts.gov/courts/nyc/surrogates/", source_type: "State", tier: 1, docs: 41, last_synced: daysAgo(1), sync_status: "synced", curator_agent: "knowledge-curator" },
  { id: "ks6", name: "Modern Widows Club", url: "https://modernwidowsclub.org", source_type: "Nonprofit", tier: 2, docs: 96, last_synced: hoursAgo(12), sync_status: "synced", curator_agent: "knowledge-curator" },
  { id: "ks7", name: "Soaring Spirits", url: "https://soaringspirits.org", source_type: "Nonprofit", tier: 2, docs: 54, last_synced: daysAgo(2), sync_status: "synced", curator_agent: "knowledge-curator" },
  { id: "ks8", name: "Nolo - Probate Guides", url: "https://www.nolo.com/legal-encyclopedia/probate", source_type: "Legal", tier: 2, docs: 188, last_synced: hoursAgo(18), sync_status: "syncing", curator_agent: "knowledge-curator" },
  { id: "ks9", name: "AARP - Caregiving & Loss", url: "https://www.aarp.org/caregiving/grief-loss/", source_type: "Editorial", tier: 2, docs: 142, last_synced: daysAgo(3), sync_status: "synced", curator_agent: "knowledge-curator" },
  { id: "ks10", name: "FindLaw - Estates", url: "https://www.findlaw.com/estate.html", source_type: "Legal", tier: 2, docs: 220, last_synced: daysAgo(4), sync_status: "error", curator_agent: "knowledge-curator" },
];

// AI Usage daily series (last 14 days)
export type UsageDay = { date: string; requests: number; tokens: number; cost: number; agent: string };
export const seedUsageDaily: UsageDay[] = (() => {
  const out: UsageDay[] = [];
  const agents = ["grief-navigator", "knowledge-curator", "source-sentinel", "journal-companion", "compliance-guardian"];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const date = d.toISOString().slice(0, 10);
    for (const a of agents) {
      const base =
        a === "grief-navigator" ? 55 + Math.random() * 30
        : a === "source-sentinel" ? 170 + Math.random() * 40
        : a === "knowledge-curator" ? 12 + Math.random() * 6
        : a === "journal-companion" ? 25 + Math.random() * 15
        : 18 + Math.random() * 8;
      const requests = Math.round(base);
      const tokens = Math.round(requests * (a === "knowledge-curator" ? 5200 : a === "grief-navigator" ? 1100 : 600));
      const cost = +(tokens / 1000 * (a === "grief-navigator" ? 0.0035 : a === "knowledge-curator" ? 0.0008 : 0.0003)).toFixed(2);
      out.push({ date, agent: a, requests, tokens, cost });
    }
  }
  return out;
})();

// Scripted execution traces - one per agent (used by Live Execution viewer)
export type TraceStep = {
  id: string;
  type: "plan" | "tool" | "reason" | "respond" | "guard";
  title: string;
  detail: string;
  delay_ms: number;
  tokens?: number;
  payload?: Record<string, unknown>;
};

export const traceScripts: Record<string, { prompt: string; steps: TraceStep[]; final: string }> = {
  "grief-navigator": {
    prompt: "I'm in NJ. My husband passed 6 weeks ago. Where do I even start with probate?",
    steps: [
      { id: "s1", type: "guard", title: "moderation.scan", detail: "Check for crisis language", delay_ms: 220, tokens: 18 },
      { id: "s2", type: "plan", title: "Plan", detail: "Acknowledge → identify state → fetch NJ probate steps → cite KB → offer follow-up", delay_ms: 480, tokens: 64 },
      { id: "s3", type: "tool", title: "kb.search", detail: 'Query: "NJ probate first steps surviving spouse"', delay_ms: 540, payload: { hits: 3, top_score: 0.89, ids: ["k2", "k3", "k1"] } },
      { id: "s4", type: "tool", title: "state_rules.lookup", detail: 'state="NJ", topic="probate"', delay_ms: 410, payload: { county_path: "Surrogate's Court", filing_window_days: 60, fee_range_usd: [100, 200] } },
      { id: "s5", type: "reason", title: "Synthesize", detail: "Compose warm, plain-language reply with 3-step plan + citations", delay_ms: 720, tokens: 312 },
      { id: "s6", type: "respond", title: "Stream response", detail: "Begin streaming tokens to client", delay_ms: 280, tokens: 246 },
    ],
    final:
      "I'm so sorry. Six weeks in, the fog is real - and probate is one of those things where the next step is usually smaller than it feels.\n\nHere's where to start in New Jersey:\n\n1. Locate the original will (not a copy - the Surrogate's Court will only accept the original).\n2. Schedule an appointment with your county Surrogate's Court. NJ expects filing within ~60 days.\n3. Bring the will, a certified death certificate, photo ID, and a check for the filing fee (usually $100–$200).\n\nThe Surrogate will swear you in as Executor and give you Letters Testamentary, which are what banks and agencies will ask for.\n\nSources I used: Bergen County Surrogate's Court - Practical Tips, NJ Probate Step-by-Step.\n\nWould you like me to walk through what happens after Letters Testamentary?",
  },
  "knowledge-curator": {
    prompt: "scheduled run - ssa.gov/news/rss",
    steps: [
      { id: "s1", type: "tool", title: "rss.fetch", detail: "Pull new items from SSA RSS", delay_ms: 380, payload: { new_items: 2 } },
      { id: "s2", type: "plan", title: "Plan", detail: "Summarize each → tag → moderate → propose KB drafts", delay_ms: 320, tokens: 48 },
      { id: "s3", type: "reason", title: "Summarize item 1", detail: '"COLA increase 2026 - survivor benefit impact"', delay_ms: 1100, tokens: 612 },
      { id: "s4", type: "reason", title: "Summarize item 2", detail: '"New online application path for widows 60+"', delay_ms: 1080, tokens: 588 },
      { id: "s5", type: "tool", title: "moderation.scan", detail: "Check both drafts for unauthorized advice", delay_ms: 240, tokens: 60, payload: { passed: true } },
      { id: "s6", type: "tool", title: "embed.upsert", detail: "Write 2 docs into kb:public namespace", delay_ms: 300, payload: { vectors_added: 2 } },
      { id: "s7", type: "respond", title: "Open editorial review", detail: "Notion: 2 drafts created in 'KB Inbox'", delay_ms: 200 },
    ],
    final: "2 new drafts created and routed to editorial. Tagged: state=US, category=Benefits.",
  },
  "source-sentinel": {
    prompt: "scheduled run - full URL registry sweep",
    steps: [
      { id: "s1", type: "plan", title: "Plan", detail: "Sweep 24 sources, hash content, semantic diff vs last snapshot", delay_ms: 200 },
      { id: "s2", type: "tool", title: "http.fetch", detail: "Parallel fetch - 24 URLs", delay_ms: 580, payload: { ok: 23, errors: 1 } },
      { id: "s3", type: "tool", title: "diff.semantic", detail: "Compute drift scores", delay_ms: 320, payload: { drifted: 1, broken: 1 } },
      { id: "s4", type: "tool", title: "task.open", detail: 'NJ Courts - Surrogate page changed (drift 0.34) → review task #482', delay_ms: 180 },
      { id: "s5", type: "respond", title: "Done", detail: "1 review task opened, 1 broken URL flagged", delay_ms: 120 },
    ],
    final: "Sweep complete. 1 review task opened (NJ Courts content drift), 1 broken URL (FindLaw - Estates).",
  },
  "journal-companion": {
    prompt: "Sarah saved an entry mentioning sleep for the 3rd time",
    steps: [
      { id: "s1", type: "guard", title: "moderation.scan", detail: "No crisis language detected", delay_ms: 180, tokens: 22 },
      { id: "s2", type: "tool", title: "memory.recall", detail: "Last 5 entries by user", delay_ms: 240, payload: { recurring: ["sleep", "kids"] } },
      { id: "s3", type: "reason", title: "Compose reflection", detail: "Mirror language + name pattern gently", delay_ms: 620, tokens: 168 },
      { id: "s4", type: "respond", title: "Render reflection", detail: "Show empathic 2-3 sentence response in journal UI", delay_ms: 140 },
    ],
    final:
      "Three entries this week have come back to sleep. That feels worth naming - grief is exhausting in a way that doesn't always show up during the day. There's nothing you have to do with that. Just noticing.",
  },
  "insights-analyst": {
    prompt: "Monday 7am - weekly digest",
    steps: [
      { id: "s1", type: "tool", title: "analytics.query", detail: "Pull 7-day signups, sessions, topics, mood", delay_ms: 340 },
      { id: "s2", type: "reason", title: "Summarize", detail: "5 bullets, numbers first", delay_ms: 1800, tokens: 1200 },
      { id: "s3", type: "tool", title: "email.send", detail: "Send to ops@ggs + post to #ggs-ops", delay_ms: 220 },
    ],
    final:
      "Week of May 1: 12 new signups (NJ leading), 412 Navigator sessions, top topic = SSA survivor benefits (38% of chats), top content gap = pension survivor rules in TX, mood index +4% w/w.",
  },
  "compliance-guardian": {
    prompt: "KB article 'Bergen County Surrogate Court' submitted for publish",
    steps: [
      { id: "s1", type: "tool", title: "moderation.scan", detail: "PII / unauthorized legal advice / tone check", delay_ms: 420, tokens: 84 },
      { id: "s2", type: "reason", title: "Decision", detail: "Pass - no PII, advice scoped to procedural facts, tone matches editorial guide", delay_ms: 240 },
      { id: "s3", type: "respond", title: "Approve", detail: "Returns approval token; article goes live", delay_ms: 140 },
    ],
    final: "Approved. No issues found.",
  },
};

// User-facing nudge: a short, agent-generated card for the dashboard
export const todayNudge = {
  agent_id: "grief-navigator",
  message:
    "Sarah, your Bergen County Surrogate appointment is the biggest thing on your list this week. When you're ready, I can walk you through exactly what to bring.",
  cta: "Walk me through it",
};
