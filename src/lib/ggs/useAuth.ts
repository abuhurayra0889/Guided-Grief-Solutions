import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { claimAdminIfFirst, fetchProfile, fetchUserRoles, updateProfile, type Profile } from "./db";
import { queryKeys } from "./queries";

export type { Profile };

export function profileNeedsOnboarding(profile: Profile | null | undefined) {
  return !profile?.grief_stage || !profile?.loss_date;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setAuthLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const user: User | null = session?.user ?? null;
  const userId = user?.id;

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: queryKeys.profile(userId ?? ""),
    queryFn: () => fetchProfile(userId!),
    enabled: !!userId,
  });

  const { data: roles = [] } = useQuery({
    queryKey: ["userRoles", userId],
    queryFn: () => fetchUserRoles(userId!),
    enabled: !!userId,
  });

  const isAdmin = roles.some((r) => r.role === "admin");
  const loading = authLoading || (!!userId && profileLoading);

  const refresh = async () => {
    if (!userId) return;
    await queryClient.invalidateQueries({ queryKey: queryKeys.profile(userId) });
    await queryClient.invalidateQueries({ queryKey: ["userRoles", userId] });
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) throw error;
    await refresh();
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await refresh();
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    queryClient.clear();
  };

  const saveProfile = async (patch: Parameters<typeof updateProfile>[1]) => {
    if (!userId) throw new Error("Not signed in");
    const data = await updateProfile(userId, patch);
    await queryClient.invalidateQueries({ queryKey: queryKeys.profile(userId) });
    return data;
  };

  const tryClaimAdmin = async () => {
    if (!userId) return;
    await claimAdminIfFirst(userId);
    await queryClient.invalidateQueries({ queryKey: ["userRoles", userId] });
  };

  return {
    user,
    profile: profile ?? null,
    isAdmin,
    loading,
    signUp,
    signIn,
    signOut,
    saveProfile,
    tryClaimAdmin,
    refresh,
  };
}
