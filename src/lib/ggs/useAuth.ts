// Mock useAuth - no Supabase. Backed by mockStore.
import { store, useStore } from "./mockStore";
import type { DemoProfile } from "./mock";

export type Profile = DemoProfile;

export function useAuth() {
  const role = useStore((s) => s.authRole);
  const profile = useStore((s) => s.profile);
  const isSignedIn = role !== null;
  const user = isSignedIn ? { id: profile.id, email: profile.email } : null;

  return {
    user,
    profile: isSignedIn ? profile : null,
    isAdmin: role === "admin",
    loading: false,
    signInAs: (r: "user" | "admin") => store.signIn(r),
    signOut: () => store.signOut(),
    refresh: async () => {},
  };
}
