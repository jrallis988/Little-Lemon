import { createPostgresStore } from './postgres.js';
import { createSqliteStore } from './sqlite.js';
import type { DataStore } from './types.js';

export type { DataStore } from './types.js';
export { publicUser, mergeProfileItem, emptyProfile, defaultPreferences } from './types.js';

export async function createStore(): Promise<DataStore> {
  const url = process.env.DATABASE_URL?.trim();
  if (url && (url.startsWith('postgres://') || url.startsWith('postgresql://'))) {
    const store = createPostgresStore(url);
    await store.ready();
    return store;
  }
  const file = process.env.SQLITE_PATH ?? './data/biocross.db';
  const store = createSqliteStore(file);
  await store.ready();
  return store;
}
