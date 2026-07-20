import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/ggs/AdminShell";
import { useAuth } from "@/lib/ggs/useAuth";
import { useRagDocumentMutations, useRagDocuments } from "@/lib/rag/queries";
import { RAG_ALLOWED_EXTENSIONS } from "@/lib/rag/types";
import { toast } from "sonner";
import { Upload, RefreshCw, Trash2, FileText, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/rag-documents")({
  head: () => ({ meta: [{ title: "RAG Documents - GGS Admin" }] }),
  component: RagDocumentsAdmin,
});

const CATEGORIES = ["Probate", "Benefits", "Financial", "Housing", "General"];

function RagDocumentsAdmin() {
  const { user } = useAuth();
  const { data: docs = [], isLoading } = useRagDocuments();
  const { upload, remove, reprocess } = useRagDocumentMutations();
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    title: "",
    state_code: "NJ",
    category: "General",
    description: "",
  });

  const onFileChange = (f: File | null) => {
    setFile(f);
    if (f && !form.title) {
      setForm((prev) => ({ ...prev, title: f.name.replace(/\.[^.]+$/, "") }));
    }
  };

  const validateFile = (f: File) => {
    const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
    if (!RAG_ALLOWED_EXTENSIONS.includes(ext)) {
      toast.error(`Unsupported file type. Allowed: ${RAG_ALLOWED_EXTENSIONS.join(", ")}`);
      return false;
    }
    if (f.size > 50 * 1024 * 1024) {
      toast.error("File must be under 50 MB.");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!user) return toast.error("Sign in required.");
    if (!file) return toast.error("Choose a file to upload.");
    if (!form.title.trim()) return toast.error("Title is required.");
    if (!validateFile(file)) return;

    try {
      await upload.mutateAsync({
        file,
        title: form.title.trim(),
        state_code: form.state_code.trim().toUpperCase().slice(0, 2) || undefined,
        category: form.category,
        description: form.description.trim() || undefined,
        userId: user.id,
      });
      toast.success("Uploaded and indexed.");
      setFile(null);
      setForm({ title: "", state_code: "NJ", category: "General", description: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    }
  };

  return (
    <AdminShell>
      <div className="flex items-end justify-between mb-6 gap-4">
        <div>
          <h1 className="font-display text-4xl">RAG Documents</h1>
          <p className="text-muted-foreground">
            Upload files to Supabase Storage. OpenAI embeddings are generated server-side and stored in pgvector.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-display text-xl flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" /> Upload document
          </h2>

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-md border border-border bg-background"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="State (e.g. NJ)"
              value={form.state_code}
              onChange={(e) => setForm({ ...form, state_code: e.target.value.toUpperCase().slice(0, 2) })}
              className="px-4 py-2.5 rounded-md border border-border bg-background"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-4 py-2.5 rounded-md border border-border bg-background"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <textarea
            placeholder="Description (optional)"
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-md border border-border bg-background"
          />

          <label className="flex flex-col gap-2 cursor-pointer">
            <span className="text-sm text-muted-foreground">File (.txt, .md, .csv, .pdf, .docx)</span>
            <input
              type="file"
              accept={RAG_ALLOWED_EXTENSIONS.join(",")}
              onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
              className="text-sm"
            />
            {file && (
              <span className="text-xs text-muted-foreground">
                {file.name} · {(file.size / 1024).toFixed(1)} KB
              </span>
            )}
          </label>

          <button
            onClick={submit}
            disabled={upload.isPending}
            className="w-full px-4 py-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {upload.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Upload & index
          </button>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 text-sm text-muted-foreground space-y-3">
          <h2 className="font-display text-xl text-foreground">How it works</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Raw files are stored in the <code className="text-xs">rag-documents</code> Supabase bucket.</li>
            <li>The <code className="text-xs">rag-ingest</code> edge function extracts text, chunks, and embeds via OpenAI.</li>
            <li>Embeddings live in <code className="text-xs">rag_chunks</code> (pgvector).</li>
            <li>Users chat at <code className="text-xs">/navigator/rag-agent</code> with reranking and citations.</li>
          </ol>
          <p className="text-xs border-t border-border pt-3">
            Set <code className="text-xs">OPENAI_API_KEY</code> in Supabase Edge Function secrets before indexing.
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              {["Title", "File", "State", "Status", "Chunks", "Updated", "Actions"].map((h) => (
                <th key={h} className="text-left p-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-muted-foreground">
                  Loading…
                </td>
              </tr>
            )}
            {!isLoading && docs.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-muted-foreground">
                  No documents uploaded yet.
                </td>
              </tr>
            )}
            {docs.map((d) => (
              <tr key={d.id} className="border-t border-border">
                <td className="p-3 font-medium">{d.title}</td>
                <td className="p-3 text-muted-foreground">{d.filename}</td>
                <td className="p-3">{d.state_code ?? "—"}</td>
                <td className="p-3">
                  <StatusBadge status={d.status} error={d.error_message} />
                </td>
                <td className="p-3">{d.chunk_count}</td>
                <td className="p-3">{new Date(d.updated_at).toLocaleString()}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={async () => {
                        try {
                          await reprocess.mutateAsync(d.id);
                          toast.success("Re-indexing started.");
                        } catch (err) {
                          toast.error(err instanceof Error ? err.message : "Re-index failed.");
                        }
                      }}
                      disabled={reprocess.isPending}
                      className="text-primary hover:underline text-xs inline-flex items-center gap-1"
                    >
                      <RefreshCw className="h-3 w-3" /> Re-index
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm(`Delete "${d.title}"?`)) return;
                        try {
                          await remove.mutateAsync(d);
                          toast.success("Deleted.");
                        } catch (err) {
                          toast.error(err instanceof Error ? err.message : "Delete failed.");
                        }
                      }}
                      className="text-destructive hover:underline text-xs inline-flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

function StatusBadge({ status, error }: { status: string; error: string | null }) {
  const styles: Record<string, string> = {
    ready: "text-primary",
    processing: "text-amber-600",
    pending: "text-muted-foreground",
    failed: "text-destructive",
  };
  return (
    <span className="inline-flex items-center gap-1">
      <FileText className="h-3 w-3" />
      <span className={styles[status] ?? "text-muted-foreground"}>{status}</span>
      {error && status === "failed" && (
        <span className="text-[10px] text-destructive/80" title={error}>
          (see error)
        </span>
      )}
    </span>
  );
}
