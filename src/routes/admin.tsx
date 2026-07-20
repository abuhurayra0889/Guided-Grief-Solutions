import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/ggs/useAuth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin - GGS Control Tower" }] }),
  component: AdminGuard,
});

function AdminGuard() {
  const { user, isAdmin, loading, tryClaimAdmin, refresh } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/auth" });
      return;
    }
    if (isAdmin) {
      setChecking(false);
      return;
    }

    (async () => {
      try {
        await tryClaimAdmin();
        await refresh();
      } finally {
        setChecking(false);
      }
    })();
  }, [user, isAdmin, loading, navigate, tryClaimAdmin, refresh]);

  useEffect(() => {
    if (!checking && user && !isAdmin) navigate({ to: "/dashboard" });
  }, [checking, user, isAdmin, navigate]);

  if (loading || checking || !user || !isAdmin) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Checking access…</div>;
  }

  return <Outlet />;
}
