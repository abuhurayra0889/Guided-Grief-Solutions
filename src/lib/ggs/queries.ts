import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cloneActionTemplatesForUser,
  createEmailCapture,
  createJournalEntry,
  createJournalPrompt,
  createKbArticle,
  createUrlMonitorRow,
  fetchActiveJournalPrompts,
  fetchAllJournalPrompts,
  fetchAllKbArticles,
  fetchAllNavigatorSessions,
  fetchAllProfiles,
  fetchEmailCaptures,
  fetchJournalEntries,
  fetchLatestNavigatorSession,
  fetchPublishedKbArticles,
  fetchUrlMonitor,
  fetchUserActionItems,
  fetchKbArticle,
  recheckUrlMonitor,
  saveNavigatorSession,
  toggleActionItemStatus,
  toggleJournalPromptActive,
  updateKbArticle,
  countJournalEntries,
  type NavigatorMessage,
} from "./db";

export const queryKeys = {
  profile: (userId: string) => ["profile", userId] as const,
  kbArticles: (scope: "published" | "all") => ["kbArticles", scope] as const,
  kbArticle: (id: string) => ["kbArticle", id] as const,
  actionItems: (userId: string) => ["actionItems", userId] as const,
  journalEntries: (userId: string) => ["journalEntries", userId] as const,
  journalPrompts: (scope: "active" | "all") => ["journalPrompts", scope] as const,
  emailCaptures: () => ["emailCaptures"] as const,
  urlMonitor: () => ["urlMonitor"] as const,
  navigatorSession: (userId: string) => ["navigatorSession", userId] as const,
  profiles: () => ["profiles"] as const,
  navigatorSessions: () => ["navigatorSessions"] as const,
  journalEntryCount: () => ["journalEntryCount"] as const,
};

export function usePublishedKbArticles() {
  return useQuery({
    queryKey: queryKeys.kbArticles("published"),
    queryFn: fetchPublishedKbArticles,
  });
}

export function useAllKbArticles() {
  return useQuery({
    queryKey: queryKeys.kbArticles("all"),
    queryFn: fetchAllKbArticles,
  });
}

export function useKbArticle(id: string) {
  return useQuery({
    queryKey: queryKeys.kbArticle(id),
    queryFn: () => fetchKbArticle(id),
    enabled: !!id,
  });
}

export function useKbArticleMutations() {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["kbArticles"] });
    qc.invalidateQueries({ queryKey: ["kbArticle"] });
  };
  return {
    create: useMutation({
      mutationFn: createKbArticle,
      onSuccess: invalidate,
    }),
    togglePublished: useMutation({
      mutationFn: ({ id, published }: { id: string; published: boolean }) =>
        updateKbArticle(id, { published: !published, updated_at: new Date().toISOString() }),
      onSuccess: invalidate,
    }),
  };
}

export function useUserActionItems(userId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.actionItems(userId ?? ""),
    queryFn: () => fetchUserActionItems(userId!),
    enabled: !!userId,
  });
}

export function useActionItemMutations(userId: string | undefined) {
  const qc = useQueryClient();
  return {
    toggle: useMutation({
      mutationFn: ({ id, status }: { id: string; status: string }) => toggleActionItemStatus(id, status),
      onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.actionItems(userId ?? "") }),
    }),
    cloneTemplates: useMutation({
      mutationFn: ({ urgentNeeds, stateCode }: { urgentNeeds: string[]; stateCode: string }) =>
        cloneActionTemplatesForUser(userId!, urgentNeeds, stateCode),
      onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.actionItems(userId ?? "") }),
    }),
  };
}

export function useJournalEntries(userId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.journalEntries(userId ?? ""),
    queryFn: () => fetchJournalEntries(userId!),
    enabled: !!userId,
  });
}

export function useJournalEntryMutations(userId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (entry: { content: string; mood: string; prompt_used?: string }) =>
      createJournalEntry({ ...entry, user_id: userId! }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.journalEntries(userId ?? "") });
      qc.invalidateQueries({ queryKey: queryKeys.journalEntryCount() });
    },
  });
}

export function useActiveJournalPrompts() {
  return useQuery({
    queryKey: queryKeys.journalPrompts("active"),
    queryFn: fetchActiveJournalPrompts,
  });
}

export function useAllJournalPrompts() {
  return useQuery({
    queryKey: queryKeys.journalPrompts("all"),
    queryFn: fetchAllJournalPrompts,
  });
}

export function useJournalPromptMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["journalPrompts"] });
  return {
    create: useMutation({ mutationFn: createJournalPrompt, onSuccess: invalidate }),
    toggle: useMutation({
      mutationFn: ({ id, active }: { id: string; active: boolean }) => toggleJournalPromptActive(id, active),
      onSuccess: invalidate,
    }),
  };
}

export function useEmailCaptureMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ email, source }: { email: string; source: string }) => createEmailCapture(email, source),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.emailCaptures() }),
  });
}

export function useEmailCaptures() {
  return useQuery({ queryKey: queryKeys.emailCaptures(), queryFn: fetchEmailCaptures });
}

export function useUrlMonitor() {
  return useQuery({ queryKey: queryKeys.urlMonitor(), queryFn: fetchUrlMonitor });
}

export function useUrlMonitorMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: queryKeys.urlMonitor() });
  return {
    create: useMutation({ mutationFn: createUrlMonitorRow, onSuccess: invalidate }),
    recheck: useMutation({ mutationFn: recheckUrlMonitor, onSuccess: invalidate }),
  };
}

export function useNavigatorSession(userId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.navigatorSession(userId ?? ""),
    queryFn: () => fetchLatestNavigatorSession(userId!),
    enabled: !!userId,
  });
}

export function useNavigatorSessionMutations(userId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, messages }: { sessionId: string | null; messages: NavigatorMessage[] }) =>
      saveNavigatorSession(userId!, sessionId, messages),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.navigatorSession(userId ?? "") });
      qc.invalidateQueries({ queryKey: queryKeys.navigatorSessions() });
    },
  });
}

export function useProfiles() {
  return useQuery({ queryKey: queryKeys.profiles(), queryFn: fetchAllProfiles });
}

export function useNavigatorSessions() {
  return useQuery({ queryKey: queryKeys.navigatorSessions(), queryFn: fetchAllNavigatorSessions });
}

export function useJournalEntryCount() {
  return useQuery({ queryKey: queryKeys.journalEntryCount(), queryFn: countJournalEntries });
}
