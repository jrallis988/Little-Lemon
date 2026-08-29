import { apiConfig, isRemoteApi } from './config';
import { ApiError } from './errors';
import { authStorage } from './authStorage';
import { mockApiRequest } from './mockServer';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  auth?: boolean;
  query?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(path: string, query?: RequestOptions['query']): string {
  const base = apiConfig.baseUrl;
  const url = new URL(`${base}${path.startsWith('/') ? path : `/${path}`}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function remoteRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = true, query } = options;
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = await authStorage.getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), apiConfig.timeoutMs);

  try {
    const res = await fetch(buildUrl(path, query), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    clearTimeout(timer);

    const text = await res.text();
    const json = text ? (JSON.parse(text) as { data?: T; message?: string }) : {};

    if (!res.ok) {
      throw ApiError.fromResponse(res.status, json);
    }
    return (json.data ?? json) as T;
  } catch (err) {
    clearTimeout(timer);
    if (err instanceof ApiError) throw err;
    if (err instanceof Error && err.name === 'AbortError') {
      throw new ApiError('Request timed out. Please try again.', 'network');
    }
    throw ApiError.offline();
  }
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = true } = options;

  if (!isRemoteApi()) {
    const token = auth ? await authStorage.getAccessToken() : undefined;
    const mockPath =
      method === 'GET' && options.query?.q !== undefined
        ? `${path}?q=${encodeURIComponent(String(options.query.q))}`
        : path;
    return mockApiRequest<T>(method, mockPath, body, token ?? undefined);
  }

  return remoteRequest<T>(path, options);
}

export const biocrossApi = {
  signIn: (email: string, password: string) =>
    apiRequest<import('./types').AuthSession>('/auth/sign-in', {
      method: 'POST',
      body: { email, password },
      auth: false,
    }),

  signUp: (email: string, password: string, fullName: string) =>
    apiRequest<import('./types').AuthSession>('/auth/sign-up', {
      method: 'POST',
      body: { email, password, fullName },
      auth: false,
    }),

  signOut: () => apiRequest<{ ok: true }>('/auth/sign-out', { method: 'POST' }),

  getMe: () => apiRequest<import('../domain/models').User>('/auth/me'),

  updateUser: (patch: Partial<import('../domain/models').User>) =>
    apiRequest<import('../domain/models').User>('/user', { method: 'PUT', body: patch }),

  getProfile: () => apiRequest<import('../domain/models').HealthProfile>('/profile'),

  saveProfile: (profile: import('../domain/models').HealthProfile) =>
    apiRequest<import('../domain/models').HealthProfile>('/profile', {
      method: 'PUT',
      body: { profile },
    }),

  addProfileItem: (item: import('../domain/models').HealthProfileItem) =>
    apiRequest<import('../domain/models').HealthProfile>('/profile/items', {
      method: 'POST',
      body: { item },
    }),

  removeProfileItem: (itemId: string) =>
    apiRequest<import('../domain/models').HealthProfile>(`/profile/items/${itemId}`, {
      method: 'DELETE',
    }),

  confirmProfileItem: (itemId: string) =>
    apiRequest<import('../domain/models').HealthProfile>(`/profile/items/${itemId}/confirm`, {
      method: 'POST',
    }),

  getChecks: () => apiRequest<import('../domain/models').SupplementCheck[]>('/checks'),

  getCheckById: (id: string) =>
    apiRequest<import('../domain/models').SupplementCheck>(`/checks/${id}`),

  runAnalysis: (supplementId: string) =>
    apiRequest<import('../domain/models').SupplementCheck>('/checks/analyze', {
      method: 'POST',
      body: { supplementId },
    }),

  searchSupplements: (q: string) =>
    apiRequest<{ supplements: import('../domain/models').Supplement[] }>('/supplements/search', {
      query: { q },
    }),

  lookupBarcode: (code: string) =>
    apiRequest<{ supplement: import('../domain/models').Supplement | null }>(
      `/supplements/barcode/${encodeURIComponent(code)}`,
    ),

  getAlerts: () => apiRequest<import('../domain/models').SafetyAlert[]>('/alerts'),

  markAlertRead: (id: string) =>
    apiRequest<import('../domain/models').SafetyAlert>(`/alerts/${id}/read`, { method: 'POST' }),

  getPreferences: () => apiRequest<import('../domain/models').AppPreferences>('/preferences'),

  savePreferences: (prefs: import('../domain/models').AppPreferences) =>
    apiRequest<import('../domain/models').AppPreferences>('/preferences', {
      method: 'PUT',
      body: prefs,
    }),

  getDocuments: () => apiRequest<import('../domain/models').UploadedDocument[]>('/documents'),

  uploadDocument: (fileName: string) =>
    apiRequest<import('../domain/models').UploadedDocument>('/documents/upload', {
      method: 'POST',
      body: { fileName },
    }),

  getExtractedItems: (documentId: string) =>
    apiRequest<{ items: import('../domain/models').ExtractedHealthItem[] }>(
      `/documents/${documentId}/extracted`,
    ),

  completeOnboarding: () =>
    apiRequest<import('../domain/models').User>('/onboarding/complete', { method: 'POST' }),
};
