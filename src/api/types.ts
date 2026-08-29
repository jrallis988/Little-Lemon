import type {
  AppPreferences,
  ExtractedHealthItem,
  HealthProfile,
  HealthProfileItem,
  SafetyAlert,
  Supplement,
  SupplementCheck,
  UploadedDocument,
  User,
} from '../domain/models';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface AuthSession {
  user: User;
  tokens: AuthTokens;
}

export interface ApiEnvelope<T> {
  data: T;
}

export interface ProfileUpdatePayload {
  profile: HealthProfile;
}

export interface RunAnalysisRequest {
  supplementId: string;
}

export interface BarcodeLookupResponse {
  supplement: Supplement | null;
}

export interface SearchSupplementsResponse {
  supplements: Supplement[];
}

export interface UploadDocumentRequest {
  fileName: string;
}

export interface ExtractedItemsResponse {
  items: ExtractedHealthItem[];
}

export interface ProfileItemMutation {
  item: HealthProfileItem;
}

export type RemoteResource =
  | { path: '/auth/sign-in'; method: 'POST'; body: SignInRequest; response: AuthSession }
  | { path: '/auth/sign-up'; method: 'POST'; body: SignUpRequest; response: AuthSession }
  | { path: '/auth/sign-out'; method: 'POST'; body: undefined; response: { ok: true } }
  | { path: '/auth/me'; method: 'GET'; body: undefined; response: User }
  | { path: '/profile'; method: 'GET'; body: undefined; response: HealthProfile }
  | { path: '/profile'; method: 'PUT'; body: ProfileUpdatePayload; response: HealthProfile }
  | { path: '/profile/items'; method: 'POST'; body: ProfileItemMutation; response: HealthProfile }
  | { path: '/profile/items/:id'; method: 'DELETE'; body: undefined; response: HealthProfile }
  | { path: '/profile/items/:id/confirm'; method: 'POST'; body: undefined; response: HealthProfile }
  | { path: '/checks'; method: 'GET'; body: undefined; response: SupplementCheck[] }
  | { path: '/checks/:id'; method: 'GET'; body: undefined; response: SupplementCheck }
  | { path: '/checks/analyze'; method: 'POST'; body: RunAnalysisRequest; response: SupplementCheck }
  | { path: '/supplements/search'; method: 'GET'; body: undefined; response: SearchSupplementsResponse }
  | { path: '/supplements/barcode/:code'; method: 'GET'; body: undefined; response: BarcodeLookupResponse }
  | { path: '/alerts'; method: 'GET'; body: undefined; response: SafetyAlert[] }
  | { path: '/alerts/:id/read'; method: 'POST'; body: undefined; response: SafetyAlert }
  | { path: '/preferences'; method: 'GET'; body: undefined; response: AppPreferences }
  | { path: '/preferences'; method: 'PUT'; body: AppPreferences; response: AppPreferences }
  | { path: '/documents'; method: 'GET'; body: undefined; response: UploadedDocument[] }
  | { path: '/documents/upload'; method: 'POST'; body: UploadDocumentRequest; response: UploadedDocument }
  | { path: '/documents/:id/extracted'; method: 'GET'; body: undefined; response: ExtractedItemsResponse }
  | { path: '/onboarding/complete'; method: 'POST'; body: undefined; response: User };
