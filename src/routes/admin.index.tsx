import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/ggs/AdminShell";
import { useStore } from "@/lib/ggs/mockStore";

export const Route = createFileRoute("/admin/")({
  component: Overview,
});

function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-display text-3xl mt-2">{value}</p>
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

function Overview() {
  const users = useStore((s) => s.adminUsers);
  const articles = useStore((s) => s.kbArticles);
  const sessions = useStore((s) => s.navigatorSessions);
  const journalCount = useStore((s) => s.journalEntries.length);
  const broken = useStore((s) => s.urlMonitor.filter((m) => m.status === "broken").length);
  const captures = useStore((s) => s.emailCaptures.length);

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Control Tower</p>
          <h1 className="font-display text-4xl mt-1">Overview</h1>
          <p className="text-muted-foreground mt-1">Operational snapshot across the GGS platform.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Total widows" value={users.length} hint={`${users.filter((u) => u.status === "active").length} active`} />
          <Stat label="Articles published" value={articles.filter((a) => a.published).length} hint={`${articles.length - articles.filter((a) => a.published).length} drafts`} />
          <Stat label="Navigator sessions" value={sessions.length} hint="last 7 days" />
          <Stat label="Email captures" value={captures} hint="all sources" />
          <Stat label="Journal entries" value={journalCount} />
          <Stat label="Sources monitored" value={useStore((s) => s.urlMonitor.length)} />
          <Stat label="Sources broken" value={broken} hint={broken > 0 ? "needs review" : "all healthy"} />
          <Stat label="Tier 1 sources" value={useStore((s) => s.urlMonitor.filter((m) => m.tier === 1).length)} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl">Recent signups</h2>
              <Link to="/admin/users" className="text-xs text-primary hover:underline">View all →</Link>
            </div>
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground uppercase tracking-wider">
                <tr><th className="text-left pb-2">Name</th><th className="text-left">State</th><th className="text-left">Loss</th><th className="text-left">Joined</th></tr>
              </thead>
              <tbody>
                {users.slice(0, 6).map((u) => (
                  <tr key={u.id} className="border-t border-border">
                    <td className="py-2">{u.full_name}</td>
                    <td>{u.state_code}</td>
                    <td>{new Date(u.loss_date).toLocaleDateString()}</td>
                    <td>{new Date(u.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl">Recent Navigator sessions</h2>
              <Link to="/admin/url-monitor" className="text-xs text-primary hover:underline">URL monitor →</Link>
            </div>
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground uppercase tracking-wider">
                <tr><th className="text-left pb-2">User</th><th className="text-left">Topic</th><th className="text-left">Msgs</th><th className="text-left">Active</th></tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s.id} className="border-t border-border">
                    <td className="py-2">{s.user_name}</td>
                    <td className="text-muted-foreground">{s.topic}</td>
                    <td>{s.messages}</td>
                    <td>{new Date(s.last_active).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
