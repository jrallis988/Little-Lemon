/** Shared API domain types (mirrors mobile src/domain/models.ts). */

export type ConfirmationStatus = 'confirmed' | 'pending_review' | 'skipped' | 'missing' | 'not_reviewed';
export type ProfileItemCategory =
  | 'condition'
  | 'medication'
  | 'supplement'
  | 'allergy'
  | 'procedure'
  | 'lab_result'
  | 'lifestyle'
  | 'recent_change'
  | 'basic';

export type RiskLevel = 'low' | 'caution' | 'high' | 'more_info';
export type FindingSeverity = 'low' | 'caution' | 'high' | 'info' | 'more_info';
export type EvidenceStrength = 'established' | 'moderate' | 'limited' | 'emerging';
export type AlertType = 'recall' | 'interaction' | 'research' | 'system' | 'regulatory';
export type AlertPriority = 'urgent' | 'personalized' | 'informational';
export type DocumentStatus = 'uploading' | 'processing' | 'extracted' | 'reviewed' | 'failed';
export type ExtractedItemStatus = 'ready' | 'needs_detail' | 'skipped' | 'added';

export interface User {
  id: string;
  email: string;
  fullName: string;
  dateOfBirth?: string;
  biologicalSex?: 'male' | 'female' | 'prefer_not_to_say';
  country?: string;
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface UserRecord extends User {
  passwordHash: string;
}

export interface HealthProfileItem {
  id: string;
  category: ProfileItemCategory;
  name: string;
  details?: string;
  status: ConfirmationStatus;
  sourceDocumentId?: string;
  confirmedAt?: string;
  extractedAt?: string;
  metadata?: Record<string, string | number | boolean | undefined>;
}

export interface HealthProfile {
  id: string;
  userId: string;
  readiness: 'strong' | 'good' | 'needs_attention' | 'getting_started';
  readinessNote: string;
  lastUpdatedAt: string;
  items: HealthProfileItem[];
}

export interface Ingredient {
  id: string;
  name: string;
  amount?: string;
  isActive: boolean;
}

export interface Supplement {
  id: string;
  name: string;
  brand?: string;
  dosage?: string;
  form?: string;
  barcode?: string;
  ingredients: Ingredient[];
}

export interface EvidenceSource {
  id: string;
  source: string;
  publication?: string;
  publicationDate?: string;
  studyType?: string;
  relevantFinding: string;
  evidenceStrength: EvidenceStrength;
  linkOrIdentifier?: string;
  retrievedAt: string;
}

export interface SafetyFinding {
  id: string;
  severity: FindingSeverity;
  title: string;
  summary: string;
  whatWeFound: string;
  whyItMatters: string;
  triggeredByProfileItemId?: string;
  triggeredByProfileItemLabel?: string;
  ingredientId?: string;
  ingredientName?: string;
  evidenceIds: string[];
  discussWithProvider: string;
  category: 'interaction' | 'condition' | 'ingredient' | 'dosage' | 'alert' | 'general';
}

export interface SupplementCheck {
  id: string;
  userId: string;
  supplement: Supplement;
  checkedAt: string;
  riskLevel: RiskLevel;
  headline: string;
  summary: string;
  findings: SafetyFinding[];
  evidence: EvidenceSource[];
  tips: string[];
  disclaimer: string;
  profileSnapshotNote: string;
  newerInfoAvailable?: boolean;
  rulesetVersion?: string;
}

export interface SafetyAlert {
  id: string;
  type: AlertType;
  priority: AlertPriority;
  title: string;
  description: string;
  date: string;
  source?: string;
  personalizedLabel?: string;
  isRead: boolean;
  relatedSupplementId?: string;
}

export interface AppPreferences {
  goals: string[];
  dietary: string[];
  lifestyle: string[];
  safetyAlertsEnabled: boolean;
  insightsEnabled: boolean;
  appearance: 'light' | 'dark' | 'system';
  language: string;
}

export interface UploadedDocument {
  id: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  pageCount?: number;
  uploadedAt: string;
  status: DocumentStatus;
  uri?: string;
}

export interface ExtractedHealthItem {
  id: string;
  documentId: string;
  category: ProfileItemCategory;
  name: string;
  details?: string;
  status: ExtractedItemStatus;
  needsDetailReason?: string;
}

export interface PasswordResetToken {
  token: string;
  userId: string;
  expiresAt: string;
}
