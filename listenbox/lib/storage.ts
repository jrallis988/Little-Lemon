import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
  authUser: 'listenbox.auth.user',
  userLogs: 'listenbox.logs.user',
  catalogExtras: 'listenbox.catalog.extras',
} as const;

export async function readJson<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeJson(key: string, value: unknown): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeKey(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}
