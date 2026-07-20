import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  chatWithRagDocuments,
  createRagDocumentRecord,
  deleteRagDocument,
  fetchRagChatSession,
  fetchRagDocuments,
  ingestRagDocument,
  reprocessRagDocument,
  saveRagChatSession,
} from "./api";
import type { RagChatMessage, RagDocument } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { RAG_STORAGE_BUCKET } from "./types";

export const ragQueryKeys = {
  documents: ["rag", "documents"] as const,
  chatSession: (userId: string) => ["rag", "chatSession", userId] as const,
};

export function useRagDocuments() {
  return useQuery({
    queryKey: ragQueryKeys.documents,
    queryFn: fetchRagDocuments,
  });
}

export function useRagDocumentMutations() {
  const qc = useQueryClient();

  const invalidate = () => qc.invalidateQueries({ queryKey: ragQueryKeys.documents });

  const upload = useMutation({
    mutationFn: async (input: {
      file: File;
      title: string;
      state_code?: string;
      category?: string;
      description?: string;
      userId: string;
    }) => {
      const docId = crypto.randomUUID();
      const storagePath = `${docId}/${input.file.name}`;

      const { error: uploadErr } = await supabase.storage
        .from(RAG_STORAGE_BUCKET)
        .upload(storagePath, input.file, { upsert: false, contentType: input.file.type });

      if (uploadErr) throw uploadErr;

      const doc = await createRagDocumentRecord({
        title: input.title,
        filename: input.file.name,
        storage_path: storagePath,
        mime_type: input.file.type || "application/octet-stream",
        file_size: input.file.size,
        state_code: input.state_code,
        category: input.category,
        description: input.description,
        uploaded_by: input.userId,
      });

      await ingestRagDocument(doc.id);
      return doc;
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (doc: RagDocument) => deleteRagDocument(doc),
    onSuccess: invalidate,
  });

  const reprocess = useMutation({
    mutationFn: (documentId: string) => reprocessRagDocument(documentId),
    onSuccess: invalidate,
  });

  return { upload, remove, reprocess };
}

export function useRagChatSession(userId?: string) {
  return useQuery({
    queryKey: ragQueryKeys.chatSession(userId ?? ""),
    queryFn: () => fetchRagChatSession(userId!),
    enabled: !!userId,
  });
}

export function useRagChatMutations(userId?: string) {
  const qc = useQueryClient();

  const saveSession = useMutation({
    mutationFn: (input: { sessionId: string | null; messages: RagChatMessage[] }) =>
      saveRagChatSession({ sessionId: input.sessionId, userId: userId!, messages: input.messages }),
    onSuccess: () => {
      if (userId) qc.invalidateQueries({ queryKey: ragQueryKeys.chatSession(userId) });
    },
  });

  const ask = useMutation({
    mutationFn: (input: { message: string; stateCode?: string | null }) =>
      chatWithRagDocuments(input.message, input.stateCode),
  });

  return { saveSession, ask };
}
