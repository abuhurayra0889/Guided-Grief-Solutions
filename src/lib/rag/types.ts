export type RagDocumentStatus = "pending" | "processing" | "ready" | "failed";

export type RagDocument = {
  id: string;
  title: string;
  filename: string;
  storage_path: string;
  mime_type: string | null;
  file_size: number | null;
  state_code: string | null;
  category: string | null;
  description: string | null;
  content_hash: string | null;
  status: RagDocumentStatus;
  chunk_count: number;
  error_message: string | null;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
};

export type RagCitation = {
  chunk_id: string;
  document_title: string;
  excerpt: string;
  evidence: string;
};

export type RagEvidence = {
  chunk_id: string;
  document_id: string;
  document_title: string;
  citation_label: string | null;
  excerpt: string;
  similarity: number;
  rerank_score: number;
};

export type RagThinkingStep = {
  type: "search" | "lookup" | "compose";
  label: string;
};

export type RagChatResponse = {
  answer: string;
  citations: RagCitation[];
  evidence: RagEvidence[];
  followups: string[];
  thinking: RagThinkingStep[];
  error?: string;
};

export type RagChatMessage = {
  role: "user" | "agent";
  content: string;
  ts: number;
  thinking?: RagThinkingStep[];
  citations?: RagCitation[];
  evidence?: RagEvidence[];
  followups?: string[];
};

export type RagChatSession = {
  id: string;
  user_id: string;
  messages: RagChatMessage[];
  created_at: string;
  updated_at: string;
};

export const RAG_STORAGE_BUCKET = "rag-documents";

export const RAG_ALLOWED_EXTENSIONS = [".txt", ".md", ".csv", ".pdf", ".docx"];

export const RAG_ALLOWED_MIME = [
  "text/plain",
  "text/markdown",
  "text/csv",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
