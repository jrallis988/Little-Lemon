/**
 * In-process mock API server for development and demo builds.
 * Mirrors the remote BioCross API contract so the client layer stays identical.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  analyzeSupplement,
  findSupplementByBarcode,
  findSupplementByQuery,
} from '../domain/analysis';
import {
  DEMO_ALERTS,
  DEMO_CHECKS,
  DEMO_DOCUMENT,
  DEMO_EXTRACTED_ITEMS,
  DEMO_HEALTH_PROFILE,
  DEMO_PREFERENCES,
  DEMO_USER,
  SUPPLEMENT_CATALOG,
} from '../domain/fixtures';
import type {
  AppPreferences,
  ExtractedHealthItem,
  HealthProfile,
  HealthProfileItem,
  SafetyAlert,
  SupplementCheck,
  UploadedDocument,
  User,
} from '../domain/models';
import { ApiError } from './errors';
import type {
  AuthSession,
  SignInRequest,
  SignUpRequest,
} from './types';
import { apiConfig } from './config';

const STORE_PREFIX = '@biocross/mock-api/';

interface MockSessionRecord {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

interface MockUserRecord extends User {
  passwordHash: string;
}

interface MockStore {
  users: MockUserRecord[];
  sessions: MockSessionRecord[];
  profiles: Record<string, HealthProfile>;
  checks: Record<string, SupplementCheck[]>;
  alerts: Record<string, SafetyAlert[]>;
  preferences: Record<string, AppPreferences>;
  documents: Record<string, UploadedDocument[]>;
  extracted: ExtractedHealthItem[];
  onboarded: Record<string, boolean>;
}

function hashPassword(password: string): string {
  return `mock:${password}`;
}

function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function token(): string {
  return `tok_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function defaultStore(): MockStore {
  const demoUser: MockUserRecord = {
    ...DEMO_USER,
    passwordHash: hashPassword(apiConfig.demoPassword),
  };
  demoUser.email = apiConfig.demoEmail;

  return {
    users: [demoUser],
    sessions: [],
    profiles: { [demoUser.id]: DEMO_HEALTH_PROFILE },
    checks: { [demoUser.id]: [...DEMO_CHECKS] },
    alerts: { [demoUser.id]: [...DEMO_ALERTS] },
    preferences: { [demoUser.id]: { ...DEMO_PREFERENCES } },
    documents: { [demoUser.id]: [DEMO_DOCUMENT] },
    extracted: [...DEMO_EXTRACTED_ITEMS],
    onboarded: { [demoUser.id]: DEMO_USER.onboardingCompleted },
  };
}

let cache: MockStore | null = null;

async function loadStore(): Promise<MockStore> {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(`${STORE_PREFIX}state`);
    cache = raw ? (JSON.parse(raw) as MockStore) : defaultStore();
  } catch {
    cache = defaultStore();
  }
  return cache;
}

async function saveStore(store: MockStore): Promise<void> {
  cache = store;
  await AsyncStorage.setItem(`${STORE_PREFIX}state`, JSON.stringify(store));
}

function stripUser(record: MockUserRecord): User {
  const { passwordHash: _, ...user } = record;
  return user;
}

function resolveSession(store: MockStore, accessToken?: string): MockSessionRecord {
  if (!accessToken) throw new ApiError('Sign in required.', 'unauthorized', 401);
  const session = store.sessions.find((s) => s.accessToken === accessToken);
  if (!session) throw new ApiError('Session expired. Please sign in again.', 'unauthorized', 401);
  if (session.expiresAt < Date.now()) {
    throw new ApiError('Session expired. Please sign in again.', 'unauthorized', 401);
  }
  return session;
}

function userById(store: MockStore, userId: string): MockUserRecord {
  const user = store.users.find((u) => u.id === userId);
  if (!user) throw new ApiError('User not found.', 'not_found', 404);
  return user;
}

function createSession(store: MockStore, userId: string): AuthSession {
  const accessToken = token();
  const refreshToken = token();
  const expiresIn = 60 * 60 * 24 * 7;
  store.sessions.push({
    userId,
    accessToken,
    refreshToken,
    expiresAt: Date.now() + expiresIn * 1000,
  });
  const user = stripUser(userById(store, userId));
  user.onboardingCompleted = store.onboarded[userId] ?? user.onboardingCompleted;
  return {
    user,
    tokens: { accessToken, refreshToken, expiresIn },
  };
}

export async function mockApiRequest<T>(
  method: string,
  path: string,
  body: unknown,
  accessToken?: string,
): Promise<T> {
  await delay(method === 'GET' ? 120 : 280);
  const store = await loadStore();

  // --- Auth (no token required) ---
  if (method === 'POST' && path === '/auth/sign-in') {
    const { email, password } = body as SignInRequest;
    const user = store.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.passwordHash !== hashPassword(password)) {
      throw new ApiError('Invalid email or password.', 'validation', 401);
    }
    const session = createSession(store, user.id);
    await saveStore(store);
    return session as T;
  }

  if (method === 'POST' && path === '/auth/sign-up') {
    const { email, password, fullName } = body as SignUpRequest;
    if (!email || !password || password.length < 8) {
      throw new ApiError('Password must be at least 8 characters.', 'validation', 400);
    }
    if (store.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new ApiError('An account with this email already exists.', 'validation', 409);
    }
    const id = `user-${Date.now()}`;
    const newUser: MockUserRecord = {
      id,
      email,
      fullName,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
      passwordHash: hashPassword(password),
    };
    store.users.push(newUser);
    store.profiles[id] = {
      id: `profile-${id}`,
      userId: id,
      readiness: 'getting_started',
      readinessNote: 'Add medications, conditions, and allergies for stronger safety checks.',
      lastUpdatedAt: new Date().toISOString(),
      items: [],
    };
    store.checks[id] = [];
    store.alerts[id] = [];
    store.preferences[id] = { ...DEMO_PREFERENCES };
    store.documents[id] = [];
    store.onboarded[id] = false;
    const session = createSession(store, id);
    await saveStore(store);
    return session as T;
  }

  const session = resolveSession(store, accessToken);
  const userId = session.userId;

  if (method === 'POST' && path === '/auth/sign-out') {
    store.sessions = store.sessions.filter((s) => s.accessToken !== accessToken);
    await saveStore(store);
    return { ok: true } as T;
  }

  if (method === 'GET' && path === '/auth/me') {
    const user = stripUser(userById(store, userId));
    user.onboardingCompleted = store.onboarded[userId] ?? user.onboardingCompleted;
    return user as T;
  }

  if (method === 'GET' && path === '/profile') {
    return (store.profiles[userId] ?? defaultStore().profiles[DEMO_USER.id]) as T;
  }

  if (method === 'PUT' && path === '/profile') {
    const payload = body as { profile: HealthProfile };
    store.profiles[userId] = { ...payload.profile, lastUpdatedAt: new Date().toISOString() };
    await saveStore(store);
    return store.profiles[userId] as T;
  }

  if (method === 'POST' && path === '/profile/items') {
    const { item } = body as { item: HealthProfileItem };
    const profile = store.profiles[userId];
    const merged = [...profile.items];
    const idx = merged.findIndex((m) => m.id === item.id || (m.name === item.name && m.category === item.category));
    if (idx >= 0) merged[idx] = item;
    else merged.push(item);
    store.profiles[userId] = {
      ...profile,
      items: merged,
      readiness: 'strong',
      lastUpdatedAt: new Date().toISOString(),
    };
    await saveStore(store);
    return store.profiles[userId] as T;
  }

  const deleteItemMatch = path.match(/^\/profile\/items\/([^/]+)$/);
  if (method === 'DELETE' && deleteItemMatch) {
    const itemId = deleteItemMatch[1];
    const profile = store.profiles[userId];
    store.profiles[userId] = {
      ...profile,
      items: profile.items.filter((i) => i.id !== itemId),
      lastUpdatedAt: new Date().toISOString(),
    };
    await saveStore(store);
    return store.profiles[userId] as T;
  }

  const confirmItemMatch = path.match(/^\/profile\/items\/([^/]+)\/confirm$/);
  if (method === 'POST' && confirmItemMatch) {
    const itemId = confirmItemMatch[1];
    const profile = store.profiles[userId];
    store.profiles[userId] = {
      ...profile,
      items: profile.items.map((i) =>
        i.id === itemId
          ? { ...i, status: 'confirmed' as const, confirmedAt: new Date().toISOString() }
          : i,
      ),
      lastUpdatedAt: new Date().toISOString(),
    };
    await saveStore(store);
    return store.profiles[userId] as T;
  }

  if (method === 'GET' && path === '/checks') {
    return (store.checks[userId] ?? []) as T;
  }

  const checkMatch = path.match(/^\/checks\/([^/]+)$/);
  if (method === 'GET' && checkMatch) {
    const check = (store.checks[userId] ?? []).find((c) => c.id === checkMatch[1]);
    if (!check) throw new ApiError('Check not found.', 'not_found', 404);
    return check as T;
  }

  if (method === 'POST' && path === '/checks/analyze') {
    const { supplementId } = body as { supplementId: string };
    const supplement = SUPPLEMENT_CATALOG.find((s) => s.id === supplementId);
    if (!supplement) throw new ApiError('Supplement not found.', 'not_found', 404);
    const profile = store.profiles[userId];
    const check = analyzeSupplement(supplement, profile, userId);
    store.checks[userId] = [check, ...(store.checks[userId] ?? []).filter((c) => c.id !== check.id)];
    await saveStore(store);
    return check as T;
  }

  if (method === 'GET' && path.startsWith('/supplements/search')) {
    const q = new URL(`http://x${path}`).searchParams.get('q') ?? '';
    return { supplements: findSupplementByQuery(q) } as T;
  }

  const barcodeMatch = path.match(/^\/supplements\/barcode\/(.+)$/);
  if (method === 'GET' && barcodeMatch) {
    const code = decodeURIComponent(barcodeMatch[1]);
    return { supplement: findSupplementByBarcode(code) ?? null } as T;
  }

  if (method === 'GET' && path === '/alerts') {
    return (store.alerts[userId] ?? []) as T;
  }

  const alertReadMatch = path.match(/^\/alerts\/([^/]+)\/read$/);
  if (method === 'POST' && alertReadMatch) {
    const alertId = alertReadMatch[1];
    store.alerts[userId] = (store.alerts[userId] ?? []).map((a) =>
      a.id === alertId ? { ...a, isRead: true } : a,
    );
    await saveStore(store);
    const updated = store.alerts[userId].find((a) => a.id === alertId);
    if (!updated) throw new ApiError('Alert not found.', 'not_found', 404);
    return updated as T;
  }

  if (method === 'GET' && path === '/preferences') {
    return (store.preferences[userId] ?? DEMO_PREFERENCES) as T;
  }

  if (method === 'PUT' && path === '/preferences') {
    store.preferences[userId] = body as AppPreferences;
    await saveStore(store);
    return store.preferences[userId] as T;
  }

  if (method === 'GET' && path === '/documents') {
    return (store.documents[userId] ?? []) as T;
  }

  if (method === 'POST' && path === '/documents/upload') {
    const { fileName } = body as { fileName: string };
    const doc: UploadedDocument = {
      id: `doc-${Date.now()}`,
      fileName,
      mimeType: fileName.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
      sizeBytes: 1_200_000,
      pageCount: 12,
      uploadedAt: new Date().toISOString(),
      status: 'extracted',
    };
    store.documents[userId] = [doc, ...(store.documents[userId] ?? [])];
    const extracted = DEMO_EXTRACTED_ITEMS.map((i) => ({
      ...i,
      id: `${i.id}-${doc.id}`,
      documentId: doc.id,
    }));
    store.extracted = [...extracted, ...store.extracted];
    await saveStore(store);
    return doc as T;
  }

  const extractedMatch = path.match(/^\/documents\/([^/]+)\/extracted$/);
  if (method === 'GET' && extractedMatch) {
    const documentId = extractedMatch[1];
    return { items: store.extracted.filter((i) => i.documentId === documentId) } as T;
  }

  if (method === 'POST' && path === '/onboarding/complete') {
    store.onboarded[userId] = true;
    const user = userById(store, userId);
    user.onboardingCompleted = true;
    await saveStore(store);
    return stripUser(user) as T;
  }

  if (method === 'PUT' && path === '/user') {
    const patch = body as Partial<User>;
    const idx = store.users.findIndex((u) => u.id === userId);
    store.users[idx] = { ...store.users[idx], ...patch };
    await saveStore(store);
    return stripUser(store.users[idx]) as T;
  }

  throw new ApiError(`Mock route not found: ${method} ${path}`, 'not_found', 404);
}

/** Reset mock server state — useful for demo / tests. */
export async function resetMockApiStore(): Promise<void> {
  cache = defaultStore();
  await AsyncStorage.setItem(`${STORE_PREFIX}state`, JSON.stringify(cache));
}

export async function updateMockUser(user: User): Promise<User> {
  const store = await loadStore();
  const idx = store.users.findIndex((u) => u.id === user.id);
  if (idx >= 0) {
    store.users[idx] = { ...store.users[idx], ...user };
    store.onboarded[user.id] = user.onboardingCompleted;
    await saveStore(store);
  }
  return user;
}

export async function getMockExtractedItems(): Promise<ExtractedHealthItem[]> {
  const store = await loadStore();
  return store.extracted;
}

export async function saveMockExtractedItems(items: ExtractedHealthItem[]): Promise<void> {
  const store = await loadStore();
  store.extracted = items;
  await saveStore(store);
}
