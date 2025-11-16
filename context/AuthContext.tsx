'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getSupabase, getSiteUrl } from '@/lib/supabase';
import { isAdminCheck } from '@/lib/auth';

type AuthState = {
  user: import('@supabase/supabase-js').User | null;
  isAdmin: boolean;
  loading: boolean;
  profile: { email?: string; name?: string; avatar_url?: string } | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthState['user']>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<AuthState['profile']>(null);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const {
          data: { session },
        } = await getSupabase().auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        const email = currentUser?.email ?? currentUser?.user_metadata?.email;
        const admin = await isAdminCheck(currentUser?.id || null, email);
        setIsAdmin(admin);
        setProfile(
          currentUser
            ? {
                email: email || undefined,
                name:
                  currentUser.user_metadata?.full_name || currentUser.user_metadata?.name,
                avatar_url: currentUser.user_metadata?.avatar_url,
              }
            : null
        );
        if (typeof document !== 'undefined') {
          const secure = window.location.protocol === 'https:' ? '; Secure' : '';
          if (admin) {
            document.cookie = `is_admin=true; Path=/; SameSite=Lax${secure}`;
          } else {
            document.cookie = `is_admin=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
          }
        }
      } catch {
        setUser(null);
        setIsAdmin(false);
        setProfile(null);
      }
      setLoading(false);
    };
    init();

    try {
      const { data: sub } = getSupabase().auth.onAuthStateChange(() => {
        init();
      });
      return () => {
        sub.subscription.unsubscribe();
      };
    } catch {
      return () => {};
    }
  }, []);

  const signInWithGoogle = async () => {
    await getSupabase().auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getSiteUrl()}/admin`,
      },
    });
  };

  const signOut = async () => {
    await getSupabase().auth.signOut();
    if (typeof document !== 'undefined') {
      const secure = window.location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `is_admin=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
    }
  };

  const value = useMemo<AuthState>(
    () => ({ user, isAdmin, loading, profile, signInWithGoogle, signOut, refresh: async () => {} }),
    [user, isAdmin, loading, profile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}