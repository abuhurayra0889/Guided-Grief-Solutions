import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/ggs/useAuth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin - GGS Control Tower" }] }),
  component: AdminGuard,
});

function AdminGuard() {
  const { user, isAdmin, signInAs } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Demo: auto-promote anyone who lands on /admin to admin role.
    // (In a real build this would be a roles check.)
    if (!user) signInAs("admin");
    else if (!isAdmin) signInAs("admin");
  }, [user, isAdmin, signInAs, navigate]);

  return <Outlet />;
}
