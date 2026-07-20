const OPENAI_BASE = "https://api.openai.com/v1";

function getApiKey() {
  const key = Deno.env.get("OPENAI_API_KEY");
  if (!key) throw new Error("OPENAI_API_KEY secret is not configured");
  return key;
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const res = await fetch(`${OPENAI_BASE}/embeddings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: texts,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI embeddings failed: ${err}`);
  }

  const data = await res.json();
  return data.data
    .sort((a: { index: number }, b: { index: number }) => a.index - b.index)
    .map((d: { embedding: number[] }) => d.embedding);
}

export async function embedQuery(text: string): Promise<number[]> {
  const [embedding] = await embedTexts([text]);
  return embedding;
}

export type RankedChunk = {
  index: number;
  score: number;
};

export async function rerankChunks(
  query: string,
  passages: { index: number; content: string; label: string }[],
  topK = 5,
): Promise<RankedChunk[]> {
  if (passages.length === 0) return [];
  if (passages.length <= topK) {
    return passages.map((p, i) => ({ index: p.index, score: 1 - i * 0.01 }));
  }

  const listing = passages
    .map((p) => `[${p.index}] (${p.label})\n${p.content.slice(0, 600)}`)
    .join("\n\n---\n\n");

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You rerank document passages by relevance to a user query. Return JSON: { \"rankings\": [{ \"index\": number, \"score\": number }] }. Scores 0-10. Include every passage index exactly once.",
        },
        {
          role: "user",
          content: `Query:\n${query}\n\nPassages:\n${listing}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI rerank failed: ${err}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(content) as { rankings?: RankedChunk[] };
  const rankings = (parsed.rankings ?? [])
    .filter((r) => typeof r.index === "number" && typeof r.score === "number")
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  if (rankings.length === 0) {
    return passages.slice(0, topK).map((p, i) => ({ index: p.index, score: 1 - i * 0.01 }));
  }
  return rankings;
}

export type CitationOutput = {
  chunk_id: string;
  document_title: string;
  excerpt: string;
  evidence: string;
};

export type ChatResult = {
  answer: string;
  citations: CitationOutput[];
  followups: string[];
};

export async function generateRagAnswer(
  query: string,
  contextBlocks: {
    chunk_id: string;
    document_title: string;
    citation_label: string;
    content: string;
  }[],
  stateCode?: string | null,
): Promise<ChatResult> {
  const context = contextBlocks
    .map(
      (b, i) =>
        `[${i + 1}] id=${b.chunk_id} | ${b.document_title} | ${b.citation_label}\n${b.content}`,
    )
    .join("\n\n---\n\n");

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a compassionate grief guidance assistant. Answer ONLY using the provided context passages.
If the context is insufficient, say so clearly.
User region: ${stateCode ?? "unknown"}.
Return JSON:
{
  "answer": "plain language answer with [1], [2] citation markers inline",
  "citations": [{ "chunk_id": "uuid", "document_title": "...", "excerpt": "short quote", "evidence": "why this supports the answer" }],
  "followups": ["question1", "question2"]
}
Every citation must reference a chunk_id from context.`,
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion:\n${query}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI chat failed: ${err}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(content) as ChatResult;
  return {
    answer: parsed.answer ?? "I couldn't generate an answer from the uploaded documents.",
    citations: Array.isArray(parsed.citations) ? parsed.citations : [],
    followups: Array.isArray(parsed.followups) ? parsed.followups.slice(0, 3) : [],
  };
}
