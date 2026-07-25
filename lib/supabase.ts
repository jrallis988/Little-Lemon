import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupportedStorage } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import type { AccountRole } from '@/types/models';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

const memoryStore = new Map<string, string>();

const MemoryStorageAdapter: SupportedStorage = {
  getItem: (key) => memoryStore.get(key) ?? null,
  setItem: (key, value) => {
    memoryStore.set(key, value);
  },
  removeItem: (key) => {
    memoryStore.delete(key);
  },
};

function isBrowserLike(): boolean {
  return typeof window !== 'undefined';
}

/**
 * SecureStore has a 2048-byte value limit; large auth sessions fall back to AsyncStorage.
 * Web uses AsyncStorage in the browser; SSR / Node falls back to in-memory storage.
 */
const ExpoSecureStoreAdapter: SupportedStorage = {
  getItem: async (key) => {
    if (!isBrowserLike()) {
      return MemoryStorageAdapter.getItem(key);
    }
    if (Platform.OS === 'web') {
      return AsyncStorage.getItem(key);
    }
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return AsyncStorage.getItem(key);
    }
  },
  setItem: async (key, value) => {
    if (!isBrowserLike()) {
      MemoryStorageAdapter.setItem(key, value);
      return;
    }
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(key, value);
      return;
    }
    try {
      if (value.length > 2048) {
        await AsyncStorage.setItem(key, value);
        return;
      }
      await SecureStore.setItemAsync(key, value);
    } catch {
      await AsyncStorage.setItem(key, value);
    }
  },
  removeItem: async (key) => {
    if (!isBrowserLike()) {
      MemoryStorageAdapter.removeItem(key);
      return;
    }
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(key);
      return;
    }
    try {
      await SecureStore.deleteItemAsync(key);
    } catch {
      /* ignore */
    }
    await AsyncStorage.removeItem(key);
  },
};

export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

export type SignUpPayload = {
  email: string;
  password: string;
  displayName: string;
  role: AccountRole;
};

export async function signUpWithRole({
  email,
  password,
  displayName,
  role,
}: SignUpPayload) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        role,
      },
    },
  });
}

export async function signInWithPassword(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}
