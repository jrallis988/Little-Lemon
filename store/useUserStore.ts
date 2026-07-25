import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

import {
  isSupabaseConfigured,
  signInWithPassword,
  signOut as supabaseSignOut,
  signUpWithRole,
  supabase,
} from '@/lib/supabase';
import type { AccountRole, UserProfile } from '@/types/models';

type UserState = {
  session: Session | null;
  profile: UserProfile | null;
  isHydrated: boolean;
  isLoading: boolean;
  error: string | null;

  hydrate: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
    role: AccountRole,
  ) => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
};

function profileFromSession(session: Session | null): UserProfile | null {
  if (!session?.user) return null;
  const meta = session.user.user_metadata ?? {};
  const role = (meta.role as AccountRole | undefined) ?? 'listener';
  return {
    id: session.user.id,
    email: session.user.email ?? '',
    displayName: (meta.display_name as string | undefined) ?? session.user.email ?? 'User',
    role,
    bio: (meta.bio as string | undefined) ?? null,
    avatarUrl: (meta.avatar_url as string | undefined) ?? null,
    scene: (meta.scene as string | undefined) ?? null,
    geography: (meta.geography as string | undefined) ?? null,
  };
}

export const useUserStore = create<UserState>((set) => ({
  session: null,
  profile: null,
  isHydrated: false,
  isLoading: false,
  error: null,

  hydrate: async () => {
    if (!isSupabaseConfigured) {
      set({ isHydrated: true, session: null, profile: null });
      return;
    }

    const { data } = await supabase.auth.getSession();
    set({
      session: data.session,
      profile: profileFromSession(data.session),
      isHydrated: true,
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        session,
        profile: profileFromSession(session),
      });
    });
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    if (!isSupabaseConfigured) {
      set({
        isLoading: false,
        error: 'Supabase is not configured. Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.',
      });
      return false;
    }

    const { data, error } = await signInWithPassword(email.trim(), password);
    if (error) {
      set({ isLoading: false, error: error.message });
      return false;
    }

    set({
      isLoading: false,
      session: data.session,
      profile: profileFromSession(data.session),
    });
    return true;
  },

  signUp: async (email, password, displayName, role) => {
    set({ isLoading: true, error: null });
    if (!isSupabaseConfigured) {
      set({
        isLoading: false,
        error: 'Supabase is not configured. Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.',
      });
      return false;
    }

    const { data, error } = await signUpWithRole({
      email: email.trim(),
      password,
      displayName: displayName.trim(),
      role,
    });

    if (error) {
      set({ isLoading: false, error: error.message });
      return false;
    }

    set({
      isLoading: false,
      session: data.session,
      profile: profileFromSession(data.session),
    });
    return true;
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    if (isSupabaseConfigured) {
      await supabaseSignOut();
    }
    set({
      isLoading: false,
      session: null,
      profile: null,
    });
  },

  clearError: () => set({ error: null }),
}));
