import { sanitizeTextForDb } from "./sanitize.ts";

export async function extractText(bytes: Uint8Array, mimeType: string, filename: string): Promise<string> {
  const lower = filename.toLowerCase();

  if (
    mimeType.startsWith("text/") ||
    lower.endsWith(".txt") ||
    lower.endsWith(".md") ||
    lower.endsWith(".csv")
  ) {
    return sanitizeTextForDb(new TextDecoder("utf-8", { fatal: false }).decode(bytes));
  }

  if (mimeType === "application/pdf" || lower.endsWith(".pdf")) {
    return extractPdfText(bytes);
  }

  if (
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    lower.endsWith(".docx")
  ) {
    return extractDocxText(bytes);
  }

  throw new Error(`Unsupported file type: ${mimeType || filename}`);
}

function decodePdfString(raw: string): string {
  return raw
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\\\/g, "\\")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\b/g, "\b")
    .replace(/\\f/g, "\f")
    .replace(/\\\r?\n/g, "")
    .replace(/\\([0-7]{1,3})/g, (_, oct: string) => {
      const code = parseInt(oct, 8);
      return code <= 0xff ? String.fromCharCode(code) : "";
    });
}

function extractPdfText(bytes: Uint8Array): string {
  const raw = new TextDecoder("latin1").decode(bytes);
  const parts: string[] = [];

  const parenRegex = /\(((?:[^()\\]|\\.)*)\)/g;
  let match: RegExpExecArray | null;
  while ((match = parenRegex.exec(raw)) !== null) {
    const decoded = decodePdfString(match[1]).trim();
    if (decoded.length >= 4 && /[a-zA-Z]{3,}/.test(decoded)) {
      parts.push(decoded);
    }
  }

  const text = sanitizeTextForDb(parts.join("\n"));
  if (text.length < 50) {
    throw new Error("Could not extract enough text from PDF. Try uploading .txt or .md instead.");
  }
  return text;
}

async function extractDocxText(bytes: Uint8Array): Promise<string> {
  const { unzipSync, strFromU8 } = await import("https://esm.sh/fflate@0.8.2?target=deno");
  const files = unzipSync(bytes);
  const docXml = files["word/document.xml"];
  if (!docXml) throw new Error("Invalid DOCX: missing document.xml");

  const xml = strFromU8(docXml);
  const text = sanitizeTextForDb(
    xml
      .replace(/<w:tab[^/]*\/>/g, "\t")
      .replace(/<w:br[^/]*\/>/g, "\n")
      .replace(/<\/w:p>/g, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">"),
  );

  if (text.length < 20) throw new Error("Could not extract text from DOCX.");
  return text;
}
