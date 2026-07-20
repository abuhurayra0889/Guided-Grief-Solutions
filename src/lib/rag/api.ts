import { supabase } from "@/integrations/supabase/client";
import type { RagChatResponse, RagDocument } from "./types";

function getSupabaseUrl() {
  return import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
}

async function getAccessToken() {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

async function invokeFunction<T>(name: string, body: Record<string, unknown>): Promise<T> {
  const token = await getAccessToken();
  if (!token) throw new Error("You must be signed in.");

  const res = await fetch(`${getSupabaseUrl()}/functions/v1/${name}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = await res.json();
  if (!res.ok) {
    throw new Error(payload.error ?? `Request failed (${res.status})`);
  }
  return payload as T;
}

export async function ingestRagDocument(documentId: string) {
  return invokeFunction<{ ok: boolean; chunk_count?: number; skipped?: boolean }>("rag-ingest", {
    document_id: documentId,
  });
}

export async function chatWithRagDocuments(message: string, stateCode?: string | null) {
  return invokeFunction<RagChatResponse>("rag-chat", {
    message,
    state_code: stateCode ?? null,
  });
}

export async function fetchRagDocuments() {
  const { data, error } = await supabase
    .from("rag_documents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as RagDocument[];
}

export async function createRagDocumentRecord(input: {
  title: string;
  filename: string;
  storage_path: string;
  mime_type: string;
  file_size: number;
  state_code?: string;
  category?: string;
  description?: string;
  uploaded_by: string;
}) {
  const { data, error } = await supabase
    .from("rag_documents")
    .insert({
      title: input.title,
      filename: input.filename,
      storage_path: input.storage_path,
      mime_type: input.mime_type,
      file_size: input.file_size,
      state_code: input.state_code || null,
      category: input.category || null,
      description: input.description || null,
      uploaded_by: input.uploaded_by,
      status: "pending",
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as RagDocument;
}

export async function deleteRagDocument(doc: RagDocument) {
  const { error: storageErr } = await supabase.storage.from("rag-documents").remove([doc.storage_path]);
  if (storageErr) throw storageErr;

  const { error } = await supabase.from("rag_documents").delete().eq("id", doc.id);
  if (error) throw error;
}

export async function reprocessRagDocument(documentId: string) {
  const { error } = await supabase
    .from("rag_documents")
    .update({ status: "pending", error_message: null, updated_at: new Date().toISOString() })
    .eq("id", documentId);

  if (error) throw error;
  return ingestRagDocument(documentId);
}

export async function fetchRagChatSession(userId: string) {
  const { data, error } = await supabase
    .from("rag_chat_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function saveRagChatSession(input: {
  sessionId: string | null;
  userId: string;
  messages: unknown[];
}) {
  if (input.sessionId) {
    const { data, error } = await supabase
      .from("rag_chat_sessions")
      .update({ messages: input.messages, updated_at: new Date().toISOString() })
      .eq("id", input.sessionId)
      .select("*")
      .single();

    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from("rag_chat_sessions")
    .insert({ user_id: input.userId, messages: input.messages })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
