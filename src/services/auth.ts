import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export type OAuthProvider = 'google' | 'azure' | 'github';

export async function signInWithEmail(email: string, password: string) {
  if (!supabase) {
    return {
      user: {
        id: 'user-demo',
        email,
        fullName: email.split('@')[0] ?? 'Demo User',
      },
      demo: true as const,
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return { user: data.user, demo: false as const };
}

export async function signUpWithEmail(email: string, password: string, fullName: string) {
  if (!supabase) {
    return {
      user: { id: 'user-demo', email, fullName },
      demo: true as const,
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) throw error;
  return { user: data.user, demo: false as const };
}

export async function signInWithOAuth(provider: OAuthProvider) {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable OAuth.',
    );
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/app`,
    },
  });
  if (error) throw error;
}

export async function signOut() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function authModeLabel(): string {
  return isSupabaseConfigured ? 'Supabase Auth' : 'Demo Auth';
}
