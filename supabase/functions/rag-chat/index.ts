import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { embedQuery, generateRagAnswer, rerankChunks } from "../_shared/openai.ts";

type MatchRow = {
  chunk_id: string;
  document_id: string;
  content: string;
  citation_label: string;
  document_title: string;
  state_code: string | null;
  category: string | null;
  similarity: number;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return jsonResponse({ error: "Unauthorized" }, 401);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceKey);

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData.user) return jsonResponse({ error: "Unauthorized" }, 401);

    const { message, state_code } = await req.json();
    if (!message?.trim()) return jsonResponse({ error: "message is required" }, 400);

    const query = message.trim();
    const queryEmbedding = await embedQuery(query);

    const { data: matches, error: matchErr } = await admin.rpc("match_rag_chunks", {
      query_embedding: queryEmbedding,
      match_count: 20,
      filter_state: state_code ?? null,
    });

    if (matchErr) throw new Error(matchErr.message);

    const candidates = (matches ?? []) as MatchRow[];
    if (candidates.length === 0) {
      return jsonResponse({
        answer:
          "I don't have any indexed documents to answer that yet. An admin can upload files from the RAG Documents page.",
        citations: [],
        evidence: [],
        followups: [],
        thinking: [
          { type: "search", label: `Searching uploaded documents · "${query.slice(0, 40)}"` },
          { type: "lookup", label: "No matching passages found" },
        ],
      });
    }

    const passages = candidates.map((c, index) => ({
      index,
      content: c.content,
      label: c.citation_label ?? c.document_title,
    }));

    const ranked = await rerankChunks(query, passages, 5);
    const topChunks = ranked
      .map((r) => ({ rank: r, chunk: candidates[r.index] }))
      .filter((x) => x.chunk);

    const contextBlocks = topChunks.map(({ chunk }) => ({
      chunk_id: chunk.chunk_id,
      document_title: chunk.document_title,
      citation_label: chunk.citation_label ?? chunk.document_title,
      content: chunk.content,
    }));

    const result = await generateRagAnswer(query, contextBlocks, state_code);

    const citations = result.citations.length
      ? result.citations
      : topChunks.map(({ chunk }) => ({
          chunk_id: chunk.chunk_id,
          document_title: chunk.document_title,
          excerpt: chunk.content.slice(0, 200),
          evidence: `Retrieved with ${(chunk.similarity * 100).toFixed(0)}% semantic similarity after reranking.`,
        }));

    const evidence = topChunks.map(({ chunk, rank }) => ({
      chunk_id: chunk.chunk_id,
      document_id: chunk.document_id,
      document_title: chunk.document_title,
      citation_label: chunk.citation_label,
      excerpt: chunk.content.slice(0, 280),
      similarity: chunk.similarity,
      rerank_score: rank.score,
    }));

    return jsonResponse({
      answer: result.answer,
      citations,
      evidence,
      followups: result.followups,
      thinking: [
        { type: "search", label: `Searching uploaded documents · "${query.slice(0, 40)}${query.length > 40 ? "…" : ""}"` },
        { type: "lookup", label: `Retrieved ${candidates.length} passages, reranked to top ${topChunks.length}` },
        { type: "compose", label: "Composing answer with citations and evidence" },
      ],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Chat failed";
    console.error({ ragChatError: message });
    return jsonResponse({ error: message }, 500);
  }
});
