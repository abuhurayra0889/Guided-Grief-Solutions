import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/ggs/AppShell";
import { RagChat } from "@/components/rag/RagChat";
import { useAuth } from "@/lib/ggs/useAuth";
import { useRagChatMutations, useRagChatSession } from "@/lib/rag/queries";
import type { RagChatMessage } from "@/lib/rag/types";

type SearchParams = { q?: string };

export const Route = createFileRoute("/navigator/rag-agent")({
  head: () => ({ meta: [{ title: "RAG Agent - GGS" }] }),
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  component: RagAgent,
});

function RagAgent() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const { data: session } = useRagChatSession(user?.id);
  const { saveSession, ask } = useRagChatMutations(user?.id);
  const [messages, setMessages] = useState<RagChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (session && !hydrated) {
      setSessionId(session.id);
      setMessages((session.messages as RagChatMessage[]) ?? []);
      setHydrated(true);
    } else if (!session && !hydrated && user) {
      setHydrated(true);
    }
  }, [session, hydrated, user]);

  const persist = async (next: RagChatMessage[]) => {
    if (!user) return;
    const saved = await saveSession.mutateAsync({ sessionId, messages: next });
    setSessionId(saved.id);
  };

  return (
    <AppShell>
      <RagChat
        title="RAG Agent"
        subtitle="Chat with AI grounded in admin-uploaded documents — with reranking, citations, and evidence."
        initialQuery={hydrated ? q : undefined}
        stateCode={profile?.state_code}
        messages={messages}
        onMessagesChange={setMessages}
        onPersist={persist}
        onAsk={async (message, stateCode) => {
          const result = await ask.mutateAsync({ message, stateCode });
          return result;
        }}
      />
    </AppShell>
  );
}
