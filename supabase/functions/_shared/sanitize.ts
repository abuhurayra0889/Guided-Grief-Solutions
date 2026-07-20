/** Strip characters that break PostgREST JSON → PostgreSQL inserts (e.g. lone UTF-16 surrogates from PDF bytes). */
export function sanitizeTextForDb(text: string): string {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);

    // Skip lone surrogates (PostgreSQL json parser rejects these)
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = text.charCodeAt(i + 1);
      if (next >= 0xdc00 && next <= 0xdfff) {
        out += text[i] + text[i + 1];
        i++;
      }
      continue;
    }
    if (code >= 0xdc00 && code <= 0xdfff) continue;

    if (code === 0) continue;
    if (code === 0x09 || code === 0x0a || code === 0x0d) {
      out += text[i];
      continue;
    }
    if (code < 0x20 || code === 0x7f) continue;

    out += text[i];
  }

  return out.replace(/\s{2,}/g, " ").trim();
}

export function formatPgVector(values: number[]): string {
  return `[${values.map((v) => (Number.isFinite(v) ? v : 0)).join(",")}]`;
}
