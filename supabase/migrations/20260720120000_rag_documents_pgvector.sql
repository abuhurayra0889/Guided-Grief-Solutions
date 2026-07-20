-- Isolated RAG module: documents, chunks, embeddings, chat sessions
CREATE EXTENSION IF NOT EXISTS vector;

-- Raw file registry (files live in storage bucket rag-documents)
CREATE TABLE public.rag_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  mime_type TEXT,
  file_size BIGINT,
  state_code TEXT,
  category TEXT,
  description TEXT,
  content_hash TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'ready', 'failed')),
  chunk_count INT NOT NULL DEFAULT 0,
  error_message TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.rag_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES public.rag_documents(id) ON DELETE CASCADE,
  chunk_index INT NOT NULL,
  content TEXT NOT NULL,
  token_count INT,
  content_hash TEXT NOT NULL,
  embedding vector(1536),
  citation_label TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (document_id, chunk_index)
);

CREATE TABLE public.rag_chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  messages JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX rag_documents_status_idx ON public.rag_documents(status);
CREATE INDEX rag_documents_state_idx ON public.rag_documents(state_code);
CREATE INDEX rag_chunks_document_idx ON public.rag_chunks(document_id) WHERE is_active = TRUE;
CREATE INDEX rag_chunks_embedding_idx ON public.rag_chunks
  USING hnsw (embedding vector_cosine_ops);

ALTER TABLE public.rag_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rag_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rag_chat_sessions ENABLE ROW LEVEL SECURITY;

-- Admins manage documents; authenticated users read ready documents/chunks
CREATE POLICY "admins manage rag_documents"
  ON public.rag_documents FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "authenticated read ready rag_documents"
  ON public.rag_documents FOR SELECT
  USING (status = 'ready' AND auth.uid() IS NOT NULL);

CREATE POLICY "admins manage rag_chunks"
  ON public.rag_chunks FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "authenticated read active rag_chunks"
  ON public.rag_chunks FOR SELECT
  USING (
    is_active = TRUE
    AND auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.rag_documents d
      WHERE d.id = rag_chunks.document_id AND d.status = 'ready'
    )
  );

CREATE POLICY "own rag chat sessions"
  ON public.rag_chat_sessions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admin read rag chat sessions"
  ON public.rag_chat_sessions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for raw uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'rag-documents',
  'rag-documents',
  false,
  52428800,
  ARRAY[
    'text/plain',
    'text/markdown',
    'text/csv',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "admins upload rag documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'rag-documents'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "admins update rag documents storage"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'rag-documents'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "admins delete rag documents storage"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'rag-documents'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "authenticated read rag documents storage"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'rag-documents'
    AND auth.uid() IS NOT NULL
  );

-- Vector search RPC (service role / edge functions use this)
CREATE OR REPLACE FUNCTION public.match_rag_chunks(
  query_embedding vector(1536),
  match_count INT DEFAULT 20,
  filter_state TEXT DEFAULT NULL
)
RETURNS TABLE (
  chunk_id UUID,
  document_id UUID,
  content TEXT,
  citation_label TEXT,
  document_title TEXT,
  state_code TEXT,
  category TEXT,
  similarity FLOAT
)
LANGUAGE sql STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    c.id AS chunk_id,
    c.document_id,
    c.content,
    c.citation_label,
    d.title AS document_title,
    d.state_code,
    d.category,
    1 - (c.embedding <=> query_embedding) AS similarity
  FROM public.rag_chunks c
  INNER JOIN public.rag_documents d ON d.id = c.document_id
  WHERE c.is_active = TRUE
    AND c.embedding IS NOT NULL
    AND d.status = 'ready'
    AND (
      filter_state IS NULL
      OR d.state_code IS NULL
      OR d.state_code IN (filter_state, 'US')
    )
  ORDER BY c.embedding <=> query_embedding
  LIMIT match_count;
$$;

GRANT EXECUTE ON FUNCTION public.match_rag_chunks(vector, INT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.match_rag_chunks(vector, INT, TEXT) TO service_role;
