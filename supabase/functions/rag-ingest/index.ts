import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { chunkText, sha256 } from "../_shared/chunker.ts";
import { embedTexts } from "../_shared/openai.ts";
import { extractText } from "../_shared/extract-text.ts";
import { formatPgVector, sanitizeTextForDb } from "../_shared/sanitize.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  let documentId: string | null = null;

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return jsonResponse({ error: "Unauthorized" }, 401);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceKey);

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData.user) return jsonResponse({ error: "Unauthorized" }, 401);

    const { data: roleRow } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleRow) return jsonResponse({ error: "Admin access required" }, 403);

    const { document_id } = await req.json();
    if (!document_id) return jsonResponse({ error: "document_id is required" }, 400);
    documentId = document_id;

    const { data: doc, error: docErr } = await admin
      .from("rag_documents")
      .select("*")
      .eq("id", document_id)
      .single();

    if (docErr || !doc) return jsonResponse({ error: "Document not found" }, 404);

    await admin
      .from("rag_documents")
      .update({ status: "processing", error_message: null, updated_at: new Date().toISOString() })
      .eq("id", document_id);

    const { data: fileData, error: downloadErr } = await admin.storage
      .from("rag-documents")
      .download(doc.storage_path);

    if (downloadErr || !fileData) {
      await admin
        .from("rag_documents")
        .update({
          status: "failed",
          error_message: downloadErr?.message ?? "Download failed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", document_id);
      return jsonResponse({ error: "Failed to download file" }, 500);
    }

    const bytes = new Uint8Array(await fileData.arrayBuffer());
    let text: string;
    try {
      text = await extractText(bytes, doc.mime_type ?? "", doc.filename);
    } catch (extractErr) {
      const msg = extractErr instanceof Error ? extractErr.message : "Text extraction failed";
      await admin
        .from("rag_documents")
        .update({ status: "failed", error_message: msg, updated_at: new Date().toISOString() })
        .eq("id", document_id);
      return jsonResponse({ error: msg }, 422);
    }

    const contentHash = await sha256(text);
    if (doc.content_hash === contentHash && doc.status === "ready" && doc.chunk_count > 0) {
      return jsonResponse({ ok: true, skipped: true, chunk_count: doc.chunk_count });
    }

    const pieces = chunkText(text).map((piece) => sanitizeTextForDb(piece)).filter(Boolean);
    if (pieces.length === 0) {
      await admin
        .from("rag_documents")
        .update({
          status: "failed",
          error_message: "No text content found in file",
          updated_at: new Date().toISOString(),
        })
        .eq("id", document_id);
      return jsonResponse({ error: "No text content found" }, 422);
    }

    await admin.from("rag_chunks").delete().eq("document_id", document_id);

    const batchSize = 20;
    let inserted = 0;

    for (let start = 0; start < pieces.length; start += batchSize) {
      const batch = pieces.slice(start, start + batchSize);
      const embeddings = await embedTexts(batch);

      const rows = batch.map((content, i) => {
        const idx = start + i;
        return {
          document_id,
          chunk_index: idx,
          content,
          token_count: Math.ceil(content.length / 4),
          content_hash: crypto.randomUUID(),
          embedding: formatPgVector(embeddings[i]),
          citation_label: sanitizeTextForDb(`${doc.title} · section ${idx + 1}`),
          is_active: true,
        };
      });

      const { error: insertErr } = await admin.from("rag_chunks").insert(rows);
      if (insertErr) {
        console.error({ ragIngestInsertError: insertErr.message, batchStart: start, batchSize: batch.length });
        throw new Error(insertErr.message);
      }
      inserted += rows.length;
    }

    await admin
      .from("rag_documents")
      .update({
        status: "ready",
        content_hash: contentHash,
        chunk_count: inserted,
        error_message: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", document_id);

    return jsonResponse({ ok: true, chunk_count: inserted });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Ingest failed";
    console.error({ ragIngestError: message, documentId });

    if (documentId) {
      try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const admin = createClient(supabaseUrl, serviceKey);
        await admin
          .from("rag_documents")
          .update({
            status: "failed",
            error_message: message,
            updated_at: new Date().toISOString(),
          })
          .eq("id", documentId);
      } catch {
        /* best-effort status update */
      }
    }

    return jsonResponse({ error: message }, 500);
  }
});
