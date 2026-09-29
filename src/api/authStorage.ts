import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const ACCESS_KEY = 'biocross_access_token';
const REFRESH_KEY = 'biocross_refresh_token';

/** SecureStore is unavailable on web — fall back to in-memory for dev preview. */
const memory: Record<string, string> = {};

async function setItem(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    memory[key] = value;
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return memory[key] ?? null;
  }
  return SecureStore.getItemAsync(key);
}

async function deleteItem(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    delete memory[key];
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

export const authStorage = {
  async saveTokens(accessToken: string, refreshToken?: string): Promise<void> {
    await setItem(ACCESS_KEY, accessToken);
    if (refreshToken) await setItem(REFRESH_KEY, refreshToken);
  },

  async getAccessToken(): Promise<string | null> {
    return getItem(ACCESS_KEY);
  },

  async getRefreshToken(): Promise<string | null> {
    return getItem(REFRESH_KEY);
  },

  async clearTokens(): Promise<void> {
    await deleteItem(ACCESS_KEY);
    await deleteItem(REFRESH_KEY);
  },
};

/** Test helper — reset in-memory web tokens between tests. */
export function __resetAuthStorageForTests(): void {
  delete memory[ACCESS_KEY];
  delete memory[REFRESH_KEY];
}
