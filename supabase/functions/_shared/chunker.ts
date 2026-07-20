const MAX_CHARS = 1200;
const OVERLAP = 150;

export function chunkText(text: string): string[] {
  const normalized = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  if (!normalized) return [];

  const paragraphs = normalized.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = "";

  const flush = () => {
    const piece = current.trim();
    if (piece) chunks.push(piece);
    current = "";
  };

  for (const para of paragraphs) {
    if (para.length > MAX_CHARS) {
      flush();
      for (let i = 0; i < para.length; i += MAX_CHARS - OVERLAP) {
        chunks.push(para.slice(i, i + MAX_CHARS));
      }
      continue;
    }

    const next = current ? `${current}\n\n${para}` : para;
    if (next.length <= MAX_CHARS) {
      current = next;
    } else {
      flush();
      current = para;
    }
  }
  flush();
  return chunks;
}

export async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
