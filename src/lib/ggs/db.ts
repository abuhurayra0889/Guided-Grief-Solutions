import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles">;
export type KbArticle = Tables<"kb_articles">;
export type ActionItem = Tables<"action_items">;
export type JournalEntry = Tables<"journal_entries">;
export type JournalPrompt = Tables<"journal_prompts">;
export type EmailCapture = Tables<"email_captures">;
export type UrlMonitorRow = Tables<"url_monitor">;
export type NavigatorSession = Tables<"navigator_sessions">;

export type NavigatorMessage = {
  role: "user" | "agent";
  content: string;
  ts: number;
  thinking?: { type: string; label: string }[];
  citations?: { id: string; title: string }[];
  followups?: string[];
};

function throwOnError(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

export async function fetchProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  throwOnError(error);
  return data;
}

export async function updateProfile(userId: string, patch: TablesUpdate<"profiles">) {
  const { data, error } = await supabase.from("profiles").update(patch).eq("id", userId).select().single();
  throwOnError(error);
  return data;
}

export async function fetchAllProfiles() {
  const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
  throwOnError(error);
  return data ?? [];
}

export async function fetchUserRoles(userId: string) {
  const { data, error } = await supabase.from("user_roles").select("*").eq("user_id", userId);
  throwOnError(error);
  return data ?? [];
}

export async function claimAdminIfFirst(userId: string) {
  const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" });
  if (error && !error.message.includes("duplicate")) throw new Error(error.message);
}

export async function fetchPublishedKbArticles() {
  const { data, error } = await supabase
    .from("kb_articles")
    .select("*")
    .eq("published", true)
    .order("updated_at", { ascending: false });
  throwOnError(error);
  return data ?? [];
}

export async function fetchAllKbArticles() {
  const { data, error } = await supabase.from("kb_articles").select("*").order("updated_at", { ascending: false });
  throwOnError(error);
  return data ?? [];
}

export async function fetchKbArticle(id: string) {
  const { data, error } = await supabase.from("kb_articles").select("*").eq("id", id).maybeSingle();
  throwOnError(error);
  return data;
}

export async function createKbArticle(article: TablesInsert<"kb_articles">) {
  const { data, error } = await supabase.from("kb_articles").insert(article).select().single();
  throwOnError(error);
  return data;
}

export async function updateKbArticle(id: string, patch: TablesUpdate<"kb_articles">) {
  const { data, error } = await supabase.from("kb_articles").update(patch).eq("id", id).select().single();
  throwOnError(error);
  return data;
}

export async function fetchUserActionItems(userId: string) {
  const { data, error } = await supabase
    .from("action_items")
    .select("*")
    .eq("user_id", userId)
    .eq("is_template", false)
    .order("created_at", { ascending: true });
  throwOnError(error);
  return data ?? [];
}

export async function toggleActionItemStatus(id: string, currentStatus: string) {
  const status = currentStatus === "done" ? "not_started" : "done";
  const { data, error } = await supabase.from("action_items").update({ status }).eq("id", id).select().single();
  throwOnError(error);
  return data;
}

export async function cloneActionTemplatesForUser(userId: string, urgentNeeds: string[], stateCode: string) {
  const existing = await fetchUserActionItems(userId);
  if (existing.length > 0) return existing;

  const { data: templates, error } = await supabase.from("action_items").select("*").eq("is_template", true);
  throwOnError(error);

  const matching = (templates ?? []).filter(
    (t) => urgentNeeds.includes("all_of_the_above") || (t.urgent_tag && urgentNeeds.includes(t.urgent_tag)),
  );
  if (matching.length === 0) return [];

  const rows: TablesInsert<"action_items">[] = matching.map((t) => ({
    user_id: userId,
    title: t.title,
    category: t.category,
    state_code: stateCode,
    status: "not_started",
    urgent_tag: t.urgent_tag,
    is_template: false,
  }));

  const { data: inserted, error: insertError } = await supabase.from("action_items").insert(rows).select();
  throwOnError(insertError);
  return inserted ?? [];
}

export async function fetchJournalEntries(userId: string) {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  throwOnError(error);
  return data ?? [];
}

export async function createJournalEntry(entry: TablesInsert<"journal_entries">) {
  const { data, error } = await supabase.from("journal_entries").insert(entry).select().single();
  throwOnError(error);
  return data;
}

export async function fetchActiveJournalPrompts() {
  const { data, error } = await supabase
    .from("journal_prompts")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: true });
  throwOnError(error);
  return data ?? [];
}

export async function fetchAllJournalPrompts() {
  const { data, error } = await supabase.from("journal_prompts").select("*").order("created_at", { ascending: false });
  throwOnError(error);
  return data ?? [];
}

export async function createJournalPrompt(prompt_text: string) {
  const { data, error } = await supabase
    .from("journal_prompts")
    .insert({ prompt_text, source: "curated", active: true })
    .select()
    .single();
  throwOnError(error);
  return data;
}

export async function toggleJournalPromptActive(id: string, active: boolean) {
  const { data, error } = await supabase.from("journal_prompts").update({ active: !active }).eq("id", id).select().single();
  throwOnError(error);
  return data;
}

export async function createEmailCapture(email: string, source: string) {
  const { data, error } = await supabase.from("email_captures").insert({ email, source }).select().single();
  throwOnError(error);
  return data;
}

export async function fetchEmailCaptures() {
  const { data, error } = await supabase.from("email_captures").select("*").order("created_at", { ascending: false });
  throwOnError(error);
  return data ?? [];
}

export async function fetchUrlMonitor() {
  const { data, error } = await supabase.from("url_monitor").select("*").order("created_at", { ascending: false });
  throwOnError(error);
  return data ?? [];
}

export async function createUrlMonitorRow(row: TablesInsert<"url_monitor">) {
  const { data, error } = await supabase.from("url_monitor").insert(row).select().single();
  throwOnError(error);
  return data;
}

export async function recheckUrlMonitor(id: string) {
  const { data, error } = await supabase
    .from("url_monitor")
    .update({ last_checked: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  throwOnError(error);
  return data;
}

export async function fetchLatestNavigatorSession(userId: string) {
  const { data, error } = await supabase
    .from("navigator_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  throwOnError(error);
  return data;
}

export async function saveNavigatorSession(userId: string, sessionId: string | null, messages: NavigatorMessage[]) {
  const payload = { messages, updated_at: new Date().toISOString() };
  if (sessionId) {
    const { data, error } = await supabase
      .from("navigator_sessions")
      .update(payload)
      .eq("id", sessionId)
      .select()
      .single();
    throwOnError(error);
    return data;
  }
  const { data, error } = await supabase
    .from("navigator_sessions")
    .insert({ user_id: userId, messages })
    .select()
    .single();
  throwOnError(error);
  return data;
}

export async function fetchAllNavigatorSessions() {
  const { data, error } = await supabase
    .from("navigator_sessions")
    .select("*")
    .order("updated_at", { ascending: false });
  throwOnError(error);
  return data ?? [];
}

export async function countJournalEntries() {
  const { count, error } = await supabase.from("journal_entries").select("*", { count: "exact", head: true });
  throwOnError(error);
  return count ?? 0;
}
