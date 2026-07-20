import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { useStore } from "@/lib/ggs/mockStore";

export const Route = createFileRoute("/admin/email-captures")({ component: Emails });

function Emails() {
  const rows = useStore((s) => s.emailCaptures);
  const exportCsv = () => {
    const csv = ["email,source,created_at", ...rows.map((r) => `${r.email},${r.source},${r.created_at}`)].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a"); a.href = url; a.download = "email_captures.csv"; a.click();
  };
  return (
    <AdminShell>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl">Email Captures</h1>
          <p className="text-muted-foreground">Leads from the landing page guide downloads.</p>
        </div>
        <button onClick={exportCsv} className="px-4 py-2 rounded-md border border-border hover:bg-secondary">Export CSV</button>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left p-3">Email</th><th className="text-left p-3">Source</th><th className="text-left p-3">Captured</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="p-3">{r.email}</td>
                <td className="p-3 text-muted-foreground">{r.source}</td>
                <td className="p-3">{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
