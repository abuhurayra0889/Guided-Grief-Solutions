import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/ggs/AdminShell";
import { useProfiles } from "@/lib/ggs/queries";

export const Route = createFileRoute("/admin/users")({ component: UsersPage });

function UsersPage() {
  const { data: rows = [], isLoading } = useProfiles();
  const [q, setQ] = useState("");
  const filtered = rows.filter((r) =>
    !q || r.full_name?.toLowerCase().includes(q.toLowerCase()) || r.state_code?.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AdminShell>
      <h1 className="font-display text-4xl mb-1">Users</h1>
      <p className="text-muted-foreground mb-6">Everyone signed up to GGS.</p>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or state…"
        className="mb-4 w-full max-w-sm px-4 py-2 rounded-md border border-border bg-card" />
      <div className="bg-card border border-border rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
            <tr>{["Name", "Email", "State", "Loss date", "Stage", "Joined"].map((h) =>
              <th key={h} className="text-left p-3">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6} className="p-3 text-muted-foreground">Loading…</td></tr>
            ) : filtered.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="p-3 font-medium">{r.full_name}</td>
                <td className="p-3 text-muted-foreground">{r.email}</td>
                <td className="p-3">{r.state_code}</td>
                <td className="p-3">{r.loss_date ? new Date(r.loss_date).toLocaleDateString() : "-"}</td>
                <td className="p-3 capitalize">{r.grief_stage?.replace(/_/g, " ") || "-"}</td>
                <td className="p-3">{new Date(r.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
