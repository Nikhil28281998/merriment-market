import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { hasSupabaseEnv, supabase } from "@/lib/supabase";

type UserRole = "customer" | "vendor";

type SignUpPayload = {
  email: string;
  password: string;
  metadata: Record<string, string>;
};

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: UserRole;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null; user: User | null }>;
  signUp: (payload: SignUpPayload) => Promise<{ error: string | null; needsEmailVerification: boolean }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readRole = (user: User | null): UserRole => {
  const role = user?.user_metadata?.role;
  return role === "vendor" ? "vendor" : "customer";
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      role: readRole(user),
      isAuthenticated: Boolean(session),
      signIn: async (email, password) => {
        if (!supabase) return { error: "Supabase is not configured.", user: null };
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        return { error: error?.message ?? null, user: data.user ?? null };
      },
      signUp: async ({ email, password, metadata }) => {
        if (!supabase) return { error: "Supabase is not configured.", needsEmailVerification: false };
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata,
            emailRedirectTo: window.location.origin,
          },
        });

        const needsEmailVerification = !data.session;
        return { error: error?.message ?? null, needsEmailVerification };
      },
      signInWithGoogle: async () => {
        if (!supabase) return { error: "Supabase is not configured." };
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: window.location.origin,
          },
        });
        return { error: error?.message ?? null };
      },
      signOut: async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
      },
    }),
    [user, session, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const isSupabaseConfigured = () => hasSupabaseEnv;
