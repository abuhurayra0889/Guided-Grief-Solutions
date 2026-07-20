import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/ggs/AdminShell";
import { useStore } from "@/lib/ggs/mockStore";

export const Route = createFileRoute("/admin/users")({ component: UsersPage });

function UsersPage() {
  const rows = useStore((s) => s.adminUsers);
  const [q, setQ] = useState("");
  const filtered = rows.filter((r) =>
    !q || r.full_name.toLowerCase().includes(q.toLowerCase()) || r.state_code.toLowerCase().includes(q.toLowerCase())
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
            <tr>{["Name","Email","State","Loss date","Stage","Joined","Last active","Status"].map((h) =>
              <th key={h} className="text-left p-3">{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="p-3 font-medium">{r.full_name}</td>
                <td className="p-3 text-muted-foreground">{r.email}</td>
                <td className="p-3">{r.state_code}</td>
                <td className="p-3">{new Date(r.loss_date).toLocaleDateString()}</td>
                <td className="p-3 capitalize">{r.grief_stage.replace(/_/g, " ")}</td>
                <td className="p-3">{new Date(r.created_at).toLocaleDateString()}</td>
                <td className="p-3 text-muted-foreground">{new Date(r.last_active).toLocaleDateString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${r.status === "active" ? "bg-primary/15 text-primary-dark" : "bg-secondary text-muted-foreground"}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
