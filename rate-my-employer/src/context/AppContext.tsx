import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  seedActivity,
  seedCompanies,
  seedEmployerResponses,
  seedInterviews,
  seedReviews,
  seedSalaries,
  seedTags,
  seedWorkplaces,
} from '../data/seed';
import { averageReviews } from '../lib/averages';
import { API_URL, checkApiHealth } from '../services/apiClient';
import * as authService from '../services/authService';
import * as reviewService from '../services/reviewService';
import type {
  ActivityItem,
  Company,
  CompanyAverages,
  ContentReport,
  EmployerResponse,
  EmploymentStatus,
  EmploymentType,
  ExperienceType,
  Interview,
  InterviewDifficulty,
  InterviewOffer,
  NotificationPrefs,
  ReportReason,
  Review,
  ReviewScores,
  Salary,
  Tag,
  User,
  Workplace,
} from '../types';

const STORAGE_KEYS = {
  users: 'rme.users.v2',
  session: 'rme.session.v2',
  accessToken: 'rme.accessToken.v2',
  reviews: 'rme.reviews.v2',
  interviews: 'rme.interviews.v2',
  salaries: 'rme.salaries.v2',
  onboarded: 'rme.onboarded.v2',
  guest: 'rme.guest.v2',
  saved: 'rme.saved.v2',
  recentSearches: 'rme.recentSearches.v2',
  notifications: 'rme.notifications.v2',
  reports: 'rme.reports.v2',
  activity: 'rme.activity.v2',
};

const defaultNotificationPrefs: NotificationPrefs = {
  replies: true,
  helpfulVotes: true,
  productUpdates: false,
};

type LocalAccount = User & { password: string };

export type WriteDraft = {
  experienceType: ExperienceType;
  companyId: string;
  workplaceId: string | null;
  role: string;
  employmentStatus: EmploymentStatus;
  employmentType: EmploymentType;
  overall: number;
  scores: ReviewScores;
  title: string;
  body: string;
  tagIds: string[];
  isAnonymous: boolean;
  interviewQuestions: string;
  interviewOutcome: 'positive' | 'neutral' | 'negative';
  interviewDifficulty: InterviewDifficulty;
  interviewOffer: InterviewOffer;
  interviewProcessLength: string;
};

type AppContextValue = {
  ready: boolean;
  hasOnboarded: boolean;
  isGuest: boolean;
  apiOnline: boolean | null;
  apiMode: string | null;
  apiUrl: string;
  refreshApiStatus: () => Promise<void>;
  companies: Company[];
  workplaces: Workplace[];
  reviews: Review[];
  interviews: Interview[];
  salaries: Salary[];
  tags: Tag[];
  activity: ActivityItem[];
  employerResponses: EmployerResponse[];
  savedCompanyIds: string[];
  recentSearches: string[];
  notificationPrefs: NotificationPrefs;
  reports: ContentReport[];
  user: User | null;
  completeOnboarding: () => Promise<void>;
  continueAsGuest: () => Promise<void>;
  markActivityRead: (id?: string) => Promise<void>;
  searchCompanies: (query: string) => Company[];
  getCompany: (id: string) => Company | undefined;
  getWorkplacesForCompany: (companyId: string) => Workplace[];
  getWorkplace: (id: string) => Workplace | undefined;
  searchWorkplaces: (companyId: string, query: string) => Workplace[];
  getCompanyReviews: (companyId: string, workplaceId?: string | null) => Review[];
  getCompanyInterviews: (companyId: string, workplaceId?: string | null) => Interview[];
  getCompanySalaries: (companyId: string, workplaceId?: string | null) => Salary[];
  getCompanyAverages: (companyId: string, workplaceId?: string | null) => CompanyAverages;
  getReview: (id: string) => Review | undefined;
  getInterview: (id: string) => Interview | undefined;
  getTagsForReview: (review: Review) => Tag[];
  getTrendingCompanies: () => Company[];
  getMyReviews: () => Review[];
  getMyInterviews: () => Interview[];
  toggleSavedCompany: (companyId: string) => Promise<void>;
  addRecentSearch: (query: string) => Promise<void>;
  signUp: (input: {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
  }) => Promise<string | null>;
  signIn: (input: { email: string; password: string }) => Promise<string | null>;
  signInWithGoogle: (idToken: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  requestPasswordReset: (
    email: string,
  ) => Promise<{ error?: string; message?: string; resetToken?: string }>;
  resetPassword: (input: {
    email: string;
    token: string;
    password: string;
  }) => Promise<string | null>;
  updateProfile: (input: {
    displayName: string;
    username?: string;
    headline?: string;
  }) => Promise<string | null>;
  changePassword: (input: {
    currentPassword: string;
    nextPassword: string;
  }) => Promise<string | null>;
  updateNotificationPrefs: (prefs: Partial<NotificationPrefs>) => Promise<void>;
  submitReport: (input: {
    targetType: ContentReport['targetType'];
    targetId: string;
    reason: ReportReason;
    details?: string;
  }) => Promise<string | null>;
  submitWorkReview: (draft: WriteDraft) => Promise<string | null>;
  submitInterview: (draft: WriteDraft) => Promise<string | null>;
  updateReview: (
    reviewId: string,
    input: {
      title: string;
      body: string;
      pros?: string;
      cons?: string;
      role: string;
      overall: number;
      scores: ReviewScores;
      employmentStatus: EmploymentStatus;
      employmentType: EmploymentType;
      tagIds: string[];
      isAnonymous: boolean;
    },
  ) => Promise<string | null>;
  updateInterview: (
    interviewId: string,
    input: {
      role: string;
      rating: number;
      outcome: Interview['outcome'];
      difficulty?: InterviewDifficulty;
      offerResult?: InterviewOffer;
      processLength?: string;
      body: string;
      questions: string[];
      isAnonymous: boolean;
    },
  ) => Promise<string | null>;
  deleteReview: (reviewId: string) => Promise<string | null>;
  deleteInterview: (interviewId: string) => Promise<string | null>;
  voteReview: (reviewId: string, direction: 'up' | 'down') => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export const defaultScores: ReviewScores = {
  overall: 0,
  culture: 0,
  pay: 0,
  management: 0,
  workLife: 0,
  careerGrowth: 0,
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function toPublicUser(account: LocalAccount): User {
  const { password: _password, ...user } = account;
  return user;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [accounts, setAccounts] = useState<LocalAccount[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [interviews, setInterviews] = useState<Interview[]>(seedInterviews);
  const [salaries, setSalaries] = useState<Salary[]>(seedSalaries);
  const [savedCompanyIds, setSavedCompanyIds] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [notificationPrefs, setNotificationPrefs] =
    useState<NotificationPrefs>(defaultNotificationPrefs);
  const [reports, setReports] = useState<ContentReport[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>(seedActivity);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  const [apiMode, setApiMode] = useState<string | null>(null);
  const companies = seedCompanies;
  const workplaces = seedWorkplaces;
  const tags = seedTags;
  const employerResponses = seedEmployerResponses;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const entries = await AsyncStorage.multiGet(Object.values(STORAGE_KEYS));
        if (!mounted) return;
        const map = Object.fromEntries(entries);
        const parsedUsers: LocalAccount[] = map[STORAGE_KEYS.users]
          ? JSON.parse(map[STORAGE_KEYS.users]!)
          : [];
        setAccounts(parsedUsers);
        if (map[STORAGE_KEYS.reviews]) setReviews(JSON.parse(map[STORAGE_KEYS.reviews]!));
        if (map[STORAGE_KEYS.interviews]) setInterviews(JSON.parse(map[STORAGE_KEYS.interviews]!));
        if (map[STORAGE_KEYS.salaries]) setSalaries(JSON.parse(map[STORAGE_KEYS.salaries]!));
        setHasOnboarded(map[STORAGE_KEYS.onboarded] === '1');
        if (map[STORAGE_KEYS.saved]) setSavedCompanyIds(JSON.parse(map[STORAGE_KEYS.saved]!));
        if (map[STORAGE_KEYS.recentSearches]) {
          setRecentSearches(JSON.parse(map[STORAGE_KEYS.recentSearches]!));
        }
        if (map[STORAGE_KEYS.notifications]) {
          setNotificationPrefs({
            ...defaultNotificationPrefs,
            ...JSON.parse(map[STORAGE_KEYS.notifications]!),
          });
        }
        if (map[STORAGE_KEYS.reports]) setReports(JSON.parse(map[STORAGE_KEYS.reports]!));
        if (map[STORAGE_KEYS.activity]) setActivity(JSON.parse(map[STORAGE_KEYS.activity]!));
        const guest = map[STORAGE_KEYS.guest] === '1';
        const sessionId = map[STORAGE_KEYS.session];
        const sessionUser = sessionId
          ? parsedUsers.find((item) => item.id === sessionId)
          : undefined;
        if (sessionUser) {
          setUser(toPublicUser(sessionUser));
          setIsGuest(false);
        } else {
          setUser(null);
          setIsGuest(guest);
        }
      } finally {
        if (mounted) setReady(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const health = await checkApiHealth();
      if (!mounted) return;
      setApiOnline(health.ok);
      setApiMode(health.mode ?? null);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo<AppContextValue>(() => {
    const persistAccounts = async (next: LocalAccount[]) => {
      setAccounts(next);
      await AsyncStorage.setItem(STORAGE_KEYS.users, JSON.stringify(next));
    };
    const persistReviews = async (next: Review[]) => {
      setReviews(next);
      await AsyncStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(next));
    };
    const persistInterviews = async (next: Interview[]) => {
      setInterviews(next);
      await AsyncStorage.setItem(STORAGE_KEYS.interviews, JSON.stringify(next));
    };
    const persistReports = async (next: ContentReport[]) => {
      setReports(next);
      await AsyncStorage.setItem(STORAGE_KEYS.reports, JSON.stringify(next));
    };
    const persistActivity = async (next: ActivityItem[]) => {
      setActivity(next);
      await AsyncStorage.setItem(STORAGE_KEYS.activity, JSON.stringify(next));
    };

    const getCompany = (id: string) =>
      companies.find((company) => company.id === id || company.slug === id);

    const getWorkplace = (id: string) => workplaces.find((item) => item.id === id);

    const getWorkplacesForCompany = (companyId: string) =>
      workplaces.filter((item) => item.companyId === companyId);

    const searchCompanies = (query: string) => {
      const q = query.trim().toLowerCase();
      if (!q) return companies;
      return companies.filter(
        (company) =>
          company.name.toLowerCase().includes(q) ||
          company.industry.toLowerCase().includes(q) ||
          company.location.toLowerCase().includes(q),
      );
    };

    const searchWorkplaces = (companyId: string, query: string) => {
      const list = getWorkplacesForCompany(companyId);
      const q = query.trim().toLowerCase();
      if (!q) return list;
      return list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q) ||
          item.zip.includes(q) ||
          (item.storeCode ?? '').toLowerCase().includes(q),
      );
    };

    const matchesWorkplace = (workplaceId: string | null | undefined, filter?: string | null) => {
      if (!filter) return true;
      return workplaceId === filter;
    };

    const getCompanyReviews = (companyId: string, workplaceId?: string | null) =>
      reviews
        .filter(
          (review) =>
            review.companyId === companyId && matchesWorkplace(review.workplaceId, workplaceId),
        )
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const getCompanyInterviews = (companyId: string, workplaceId?: string | null) =>
      interviews
        .filter(
          (item) =>
            item.companyId === companyId && matchesWorkplace(item.workplaceId, workplaceId),
        )
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const getCompanySalaries = (companyId: string, workplaceId?: string | null) =>
      salaries
        .filter(
          (item) =>
            item.companyId === companyId && matchesWorkplace(item.workplaceId, workplaceId),
        )
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const getCompanyAverages = (companyId: string, workplaceId?: string | null) => {
      const scopedReviews = getCompanyReviews(companyId, workplaceId);
      const averages = averageReviews(scopedReviews);
      const interviewCount = getCompanyInterviews(companyId, workplaceId).length;
      const salaryCount = getCompanySalaries(companyId, workplaceId).length;
      return {
        ...averages,
        salaryCount,
        interviewCount,
        experienceCount: averages.reviewCount + interviewCount,
      };
    };

    return {
      ready,
      hasOnboarded,
      isGuest,
      apiOnline,
      apiMode,
      apiUrl: API_URL,
      refreshApiStatus: async () => {
        const health = await checkApiHealth();
        setApiOnline(health.ok);
        setApiMode(health.mode ?? null);
      },
      companies,
      workplaces,
      reviews,
      interviews,
      salaries,
      tags,
      activity,
      employerResponses,
      savedCompanyIds,
      recentSearches,
      notificationPrefs,
      reports,
      user,
      completeOnboarding: async () => {
        setHasOnboarded(true);
        await AsyncStorage.setItem(STORAGE_KEYS.onboarded, '1');
      },
      continueAsGuest: async () => {
        setIsGuest(true);
        setUser(null);
        setHasOnboarded(true);
        await AsyncStorage.multiSet([
          [STORAGE_KEYS.guest, '1'],
          [STORAGE_KEYS.onboarded, '1'],
        ]);
        await AsyncStorage.removeItem(STORAGE_KEYS.session);
      },
      markActivityRead: async (id) => {
        const next = activity.map((item) => {
          if (id && item.id !== id) return item;
          return { ...item, read: true };
        });
        await persistActivity(next);
      },
      searchCompanies,
      getCompany,
      getWorkplacesForCompany,
      getWorkplace,
      searchWorkplaces,
      getCompanyReviews,
      getCompanyInterviews,
      getCompanySalaries,
      getCompanyAverages,
      getReview: (id) => reviews.find((item) => item.id === id),
      getInterview: (id) => interviews.find((item) => item.id === id),
      getTagsForReview: (review) => tags.filter((tag) => review.tagIds?.includes(tag.id)),
      getTrendingCompanies: () =>
        [...companies]
          .map((company) => ({
            company,
            score:
              getCompanyReviews(company.id).length * 2 +
              getCompanyInterviews(company.id).length +
              getCompanySalaries(company.id).length,
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 6)
          .map((item) => item.company),
      getMyReviews: () => {
        if (!user) return [];
        return reviews
          .filter((review) => review.userId === user.id)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      },
      getMyInterviews: () => {
        if (!user) return [];
        return interviews
          .filter((item) => item.userId === user.id)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      },
      toggleSavedCompany: async (companyId) => {
        const next = savedCompanyIds.includes(companyId)
          ? savedCompanyIds.filter((id) => id !== companyId)
          : [...savedCompanyIds, companyId];
        setSavedCompanyIds(next);
        await AsyncStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(next));
      },
      addRecentSearch: async (query) => {
        const q = query.trim();
        if (!q) return;
        const next = [q, ...recentSearches.filter((item) => item !== q)].slice(0, 8);
        setRecentSearches(next);
        await AsyncStorage.setItem(STORAGE_KEYS.recentSearches, JSON.stringify(next));
      },
      signUp: async ({ email, password, displayName, username }) => {
        const normalized = normalizeEmail(email);
        if (!normalized || !password || !(displayName?.trim() || username?.trim())) {
          return 'Name, email, and password are required.';
        }
        if (password.length < 6) return 'Password must be at least 6 characters.';

        try {
          const session = await authService.signUp({
            email: normalized,
            password,
            displayName: (displayName || username || 'RME User').trim(),
            username: username?.trim(),
          });
          const now = new Date().toISOString();
          const nextUser: LocalAccount = {
            id: session.user.id,
            email: session.user.email,
            displayName: session.user.displayName,
            username: session.user.username,
            role: session.user.role,
            password,
            createdAt: session.user.createdAt ?? now,
            updatedAt: session.user.updatedAt ?? now,
          };
          const stored = await AsyncStorage.getItem(STORAGE_KEYS.users);
          const existing: LocalAccount[] = stored ? JSON.parse(stored) : accounts;
          const nextAccounts = [
            ...existing.filter((item) => item.email !== normalized && item.id !== nextUser.id),
            nextUser,
          ];
          await persistAccounts(nextAccounts);
          setUser(toPublicUser(nextUser));
          setIsGuest(false);
          setHasOnboarded(true);
          await AsyncStorage.multiSet([
            [STORAGE_KEYS.session, nextUser.id],
            [STORAGE_KEYS.accessToken, session.accessToken],
            [STORAGE_KEYS.guest, '0'],
            [STORAGE_KEYS.onboarded, '1'],
          ]);
          return null;
        } catch {
          // Fall through to local accounts when API is offline.
        }

        const stored = await AsyncStorage.getItem(STORAGE_KEYS.users);
        const existing: LocalAccount[] = stored ? JSON.parse(stored) : accounts;
        if (existing.some((item) => item.email === normalized)) {
          return 'An account with that email already exists.';
        }
        const now = new Date().toISOString();
        const nextUser: LocalAccount = {
          id: `user-${Date.now()}`,
          email: normalized,
          displayName: (displayName || username || 'RME User').trim(),
          username: username?.trim(),
          role: 'user',
          password,
          createdAt: now,
          updatedAt: now,
        };
        const nextAccounts = [...existing, nextUser];
        await persistAccounts(nextAccounts);
        setUser(toPublicUser(nextUser));
        setIsGuest(false);
        setHasOnboarded(true);
        await AsyncStorage.multiSet([
          [STORAGE_KEYS.session, nextUser.id],
          [STORAGE_KEYS.guest, '0'],
          [STORAGE_KEYS.onboarded, '1'],
        ]);
        return null;
      },
      signInWithGoogle: async (idToken) => {
        if (!idToken.trim()) return 'Google sign-in token is required.';
        try {
          const session = await authService.signInWithGoogle(idToken.trim());
          const now = new Date().toISOString();
          const nextUser: LocalAccount = {
            id: session.user.id,
            email: session.user.email,
            displayName: session.user.displayName,
            username: session.user.username,
            role: session.user.role,
            password: '',
            createdAt: session.user.createdAt ?? now,
            updatedAt: session.user.updatedAt ?? now,
          };
          const stored = await AsyncStorage.getItem(STORAGE_KEYS.users);
          const existing: LocalAccount[] = stored ? JSON.parse(stored) : accounts;
          const nextAccounts = [
            ...existing.filter(
              (item) => item.email !== nextUser.email && item.id !== nextUser.id,
            ),
            nextUser,
          ];
          await persistAccounts(nextAccounts);
          setUser(toPublicUser(nextUser));
          setIsGuest(false);
          setHasOnboarded(true);
          await AsyncStorage.multiSet([
            [STORAGE_KEYS.session, nextUser.id],
            [STORAGE_KEYS.accessToken, session.accessToken],
            [STORAGE_KEYS.guest, '0'],
            [STORAGE_KEYS.onboarded, '1'],
          ]);
          return null;
        } catch (error) {
          return error instanceof Error ? error.message : 'Google sign-in failed.';
        }
      },
      signIn: async ({ email, password }) => {
        const normalized = normalizeEmail(email);
        if (!normalized || !password) return 'Email and password are required.';

        try {
          const session = await authService.signIn(normalized, password);
          const now = new Date().toISOString();
          const nextUser: LocalAccount = {
            id: session.user.id,
            email: session.user.email,
            displayName: session.user.displayName,
            username: session.user.username,
            role: session.user.role,
            password,
            createdAt: session.user.createdAt ?? now,
            updatedAt: session.user.updatedAt ?? now,
          };
          const stored = await AsyncStorage.getItem(STORAGE_KEYS.users);
          const existing: LocalAccount[] = stored ? JSON.parse(stored) : accounts;
          const nextAccounts = [
            ...existing.filter((item) => item.email !== normalized && item.id !== nextUser.id),
            nextUser,
          ];
          await persistAccounts(nextAccounts);
          setUser(toPublicUser(nextUser));
          setIsGuest(false);
          setHasOnboarded(true);
          await AsyncStorage.multiSet([
            [STORAGE_KEYS.session, nextUser.id],
            [STORAGE_KEYS.accessToken, session.accessToken],
            [STORAGE_KEYS.guest, '0'],
            [STORAGE_KEYS.onboarded, '1'],
          ]);
          return null;
        } catch {
          // Fall through to local accounts when API is offline.
        }

        const stored = await AsyncStorage.getItem(STORAGE_KEYS.users);
        const existing: LocalAccount[] = stored ? JSON.parse(stored) : accounts;
        const match = existing.find(
          (item) => item.email === normalized && item.password === password,
        );
        if (!match) return 'Invalid email or password.';
        if (existing !== accounts) setAccounts(existing);
        setUser(toPublicUser(match));
        setIsGuest(false);
        setHasOnboarded(true);
        await AsyncStorage.multiSet([
          [STORAGE_KEYS.session, match.id],
          [STORAGE_KEYS.guest, '0'],
          [STORAGE_KEYS.onboarded, '1'],
        ]);
        return null;
      },
      signOut: async () => {
        setUser(null);
        setIsGuest(false);
        await AsyncStorage.multiSet([[STORAGE_KEYS.guest, '0']]);
        await AsyncStorage.multiRemove([STORAGE_KEYS.session, STORAGE_KEYS.accessToken]);
      },
      requestPasswordReset: async (email) => {
        const normalized = normalizeEmail(email);
        if (!normalized) return { error: 'Email is required.' };
        try {
          const result = await authService.requestPasswordReset(normalized);
          return {
            message: result.message,
            resetToken: result.resetToken,
          };
        } catch {
          const stored = await AsyncStorage.getItem(STORAGE_KEYS.users);
          const existing: LocalAccount[] = stored ? JSON.parse(stored) : accounts;
          const match = existing.find((item) => item.email === normalized);
          if (!match) {
            return { message: 'If that email exists, a reset code was issued.' };
          }
          const token = `local-${Date.now().toString(36)}`;
          await AsyncStorage.setItem(
            `rme.reset.${normalized}`,
            JSON.stringify({ token, expiresAt: Date.now() + 1000 * 60 * 30 }),
          );
          return {
            message: 'If that email exists, a reset code was issued.',
            resetToken: token,
          };
        }
      },
      resetPassword: async ({ email, token, password }) => {
        const normalized = normalizeEmail(email);
        if (!normalized || !token || !password) {
          return 'Email, reset code, and new password are required.';
        }
        if (password.length < 6) return 'Password must be at least 6 characters.';

        let apiError: string | null = null;
        try {
          await authService.resetPassword({ email: normalized, token, password });
          const stored = await AsyncStorage.getItem(STORAGE_KEYS.users);
          const existing: LocalAccount[] = stored ? JSON.parse(stored) : accounts;
          const nextAccounts = existing.map((account) =>
            account.email === normalized
              ? { ...account, password, updatedAt: new Date().toISOString() }
              : account,
          );
          await persistAccounts(nextAccounts);
          await AsyncStorage.removeItem(`rme.reset.${normalized}`);
          return null;
        } catch (error) {
          apiError = error instanceof Error ? error.message : 'Reset failed.';
        }

        const raw = await AsyncStorage.getItem(`rme.reset.${normalized}`);
        if (!raw) return apiError ?? 'Invalid or expired reset token.';
        const entry = JSON.parse(raw) as { token: string; expiresAt: number };
        if (entry.token !== token || entry.expiresAt < Date.now()) {
          return apiError ?? 'Invalid or expired reset token.';
        }
        const stored = await AsyncStorage.getItem(STORAGE_KEYS.users);
        const existing: LocalAccount[] = stored ? JSON.parse(stored) : accounts;
        if (!existing.some((item) => item.email === normalized)) {
          return 'User not found.';
        }
        const nextAccounts = existing.map((account) =>
          account.email === normalized
            ? { ...account, password, updatedAt: new Date().toISOString() }
            : account,
        );
        await persistAccounts(nextAccounts);
        await AsyncStorage.removeItem(`rme.reset.${normalized}`);
        return null;
      },
      updateProfile: async ({ displayName, username, headline }) => {
        if (!user) return 'Sign in to edit your profile.';
        const name = displayName.trim();
        if (!name) return 'Display name is required.';
        const stored = await AsyncStorage.getItem(STORAGE_KEYS.users);
        const existing: LocalAccount[] = stored ? JSON.parse(stored) : accounts;
        const nextAccounts = existing.map((account) => {
          if (account.id !== user.id) return account;
          return {
            ...account,
            displayName: name,
            username: username?.trim() || undefined,
            headline: headline?.trim() || null,
            updatedAt: new Date().toISOString(),
          };
        });
        await persistAccounts(nextAccounts);
        const match = nextAccounts.find((item) => item.id === user.id);
        if (match) setUser(toPublicUser(match));
        return null;
      },
      changePassword: async ({ currentPassword, nextPassword }) => {
        if (!user) return 'Sign in to change your password.';
        if (!currentPassword || !nextPassword) return 'Both passwords are required.';
        if (nextPassword.length < 6) return 'New password must be at least 6 characters.';
        const stored = await AsyncStorage.getItem(STORAGE_KEYS.users);
        const existing: LocalAccount[] = stored ? JSON.parse(stored) : accounts;
        const match = existing.find((item) => item.id === user.id);
        if (!match || match.password !== currentPassword) {
          return 'Current password is incorrect.';
        }
        const nextAccounts = existing.map((account) =>
          account.id === user.id
            ? { ...account, password: nextPassword, updatedAt: new Date().toISOString() }
            : account,
        );
        await persistAccounts(nextAccounts);
        return null;
      },
      updateNotificationPrefs: async (prefs) => {
        const next = { ...notificationPrefs, ...prefs };
        setNotificationPrefs(next);
        await AsyncStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(next));
      },
      submitReport: async ({ targetType, targetId, reason, details }) => {
        if (!targetId) return 'Nothing to report.';
        const report: ContentReport = {
          id: `report-${Date.now()}`,
          targetType,
          targetId,
          reason,
          details: (details ?? '').trim(),
          reporterUserId: user?.id ?? null,
          createdAt: new Date().toISOString(),
        };
        await persistReports([report, ...reports]);
        return null;
      },
      submitWorkReview: async (draft) => {
        if (!user) return 'Sign in to submit a review.';
        if (!draft.companyId || !draft.role.trim() || !draft.body.trim()) {
          return 'Employer, role, and review text are required.';
        }
        if (!draft.overall) return 'Add an overall rating.';
        const next: Review = {
          id: `rev-${Date.now()}`,
          companyId: draft.companyId,
          workplaceId: draft.workplaceId,
          userId: user.id,
          authorName: draft.isAnonymous ? 'Anonymous' : user.displayName,
          title: draft.title.trim() || `${draft.role} experience`,
          body: draft.body.trim(),
          role: draft.role.trim(),
          employmentStatus: draft.employmentStatus,
          employmentType: draft.employmentType,
          wouldRecommend: draft.overall >= 3,
          scores: {
            ...draft.scores,
            overall: draft.overall,
          },
          tagIds: draft.tagIds,
          isAnonymous: draft.isAnonymous,
          helpfulCount: 0,
          createdAt: new Date().toISOString(),
        };
        await persistReviews([next, ...reviews]);
        void reviewService
          .createReview({
            companyId: next.companyId,
            workplaceId: next.workplaceId,
            title: next.title,
            body: next.body,
            role: next.role,
            employmentStatus: next.employmentStatus,
            employmentType: next.employmentType,
            wouldRecommend: next.wouldRecommend,
            scores: next.scores,
            tagIds: next.tagIds,
            isAnonymous: next.isAnonymous,
            authorName: next.authorName,
            userId: next.userId,
          })
          .catch(() => undefined);
        return null;
      },
      submitInterview: async (draft) => {
        if (!user) return 'Sign in to submit an interview.';
        if (!draft.companyId || !draft.role.trim() || !draft.body.trim()) {
          return 'Employer, role, and interview story are required.';
        }
        const next: Interview = {
          id: `int-${Date.now()}`,
          companyId: draft.companyId,
          workplaceId: draft.workplaceId,
          userId: user.id,
          authorName: draft.isAnonymous ? 'Anonymous' : user.displayName,
          role: draft.role.trim(),
          rating: draft.overall || 3,
          outcome: draft.interviewOutcome,
          difficulty: draft.interviewDifficulty,
          offerResult: draft.interviewOffer,
          processLength: draft.interviewProcessLength || undefined,
          body: draft.body.trim(),
          questions: draft.interviewQuestions
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean),
          isAnonymous: draft.isAnonymous,
          helpfulCount: 0,
          createdAt: new Date().toISOString(),
        };
        await persistInterviews([next, ...interviews]);
        void reviewService
          .createInterview({
            companyId: next.companyId,
            workplaceId: next.workplaceId,
            role: next.role,
            rating: next.rating,
            outcome: next.outcome,
            body: next.body,
            questions: next.questions,
            authorName: next.authorName,
            userId: next.userId,
          })
          .catch(() => undefined);
        return null;
      },
      updateReview: async (reviewId, input) => {
        if (!user) return 'Sign in to edit a review.';
        const target = reviews.find((item) => item.id === reviewId);
        if (!target || target.userId !== user.id) return 'Review not found.';
        if (!input.role.trim() || !input.body.trim()) {
          return 'Role and review text are required.';
        }
        if (!input.overall) return 'Add an overall rating.';
        const next = reviews.map((item) => {
          if (item.id !== reviewId) return item;
          return {
            ...item,
            title: input.title.trim() || `${input.role.trim()} experience`,
            body: input.body.trim(),
            pros: input.pros?.trim() || undefined,
            cons: input.cons?.trim() || undefined,
            role: input.role.trim(),
            employmentStatus: input.employmentStatus,
            employmentType: input.employmentType,
            wouldRecommend: input.overall >= 3,
            scores: { ...input.scores, overall: input.overall },
            tagIds: input.tagIds,
            isAnonymous: input.isAnonymous,
            authorName: input.isAnonymous ? 'Anonymous' : user.displayName,
            updatedAt: new Date().toISOString(),
          };
        });
        await persistReviews(next);
        const updated = next.find((item) => item.id === reviewId);
        if (updated) {
          void reviewService
            .updateReviewRemote(reviewId, {
              title: updated.title,
              body: updated.body,
              role: updated.role,
              employmentStatus: updated.employmentStatus,
              employmentType: updated.employmentType,
              wouldRecommend: updated.wouldRecommend,
              scores: updated.scores,
              tagIds: updated.tagIds,
              isAnonymous: updated.isAnonymous,
              authorName: updated.authorName,
            })
            .catch(() => undefined);
        }
        return null;
      },
      updateInterview: async (interviewId, input) => {
        if (!user) return 'Sign in to edit an interview.';
        const target = interviews.find((item) => item.id === interviewId);
        if (!target || target.userId !== user.id) return 'Interview not found.';
        if (!input.role.trim() || !input.body.trim()) {
          return 'Role and interview story are required.';
        }
        if (!input.rating) return 'Add an interview rating.';
        const next = interviews.map((item) => {
          if (item.id !== interviewId) return item;
          return {
            ...item,
            role: input.role.trim(),
            rating: input.rating,
            outcome: input.outcome,
            difficulty: input.difficulty,
            offerResult: input.offerResult,
            processLength: input.processLength?.trim() || undefined,
            body: input.body.trim(),
            questions: input.questions.map((q) => q.trim()).filter(Boolean),
            isAnonymous: input.isAnonymous,
            authorName: input.isAnonymous ? 'Anonymous' : user.displayName,
            updatedAt: new Date().toISOString(),
          };
        });
        await persistInterviews(next);
        return null;
      },
      deleteReview: async (reviewId) => {
        if (!user) return 'Sign in to delete a review.';
        const target = reviews.find((item) => item.id === reviewId);
        if (!target || target.userId !== user.id) return 'Review not found.';
        await persistReviews(reviews.filter((item) => item.id !== reviewId));
        return null;
      },
      deleteInterview: async (interviewId) => {
        if (!user) return 'Sign in to delete an interview.';
        const target = interviews.find((item) => item.id === interviewId);
        if (!target || target.userId !== user.id) return 'Interview not found.';
        await persistInterviews(interviews.filter((item) => item.id !== interviewId));
        return null;
      },
      voteReview: (reviewId, direction) => {
        setReviews((prev) =>
          prev.map((review) => {
            if (review.id !== reviewId) return review;
            if (direction === 'up') {
              return { ...review, helpfulCount: (review.helpfulCount ?? 0) + 1 };
            }
            return { ...review, notHelpfulCount: (review.notHelpfulCount ?? 0) + 1 };
          }),
        );
      },
    };
  }, [
    ready,
    hasOnboarded,
    isGuest,
    apiOnline,
    apiMode,
    companies,
    workplaces,
    reviews,
    interviews,
    salaries,
    tags,
    activity,
    employerResponses,
    savedCompanyIds,
    recentSearches,
    notificationPrefs,
    reports,
    user,
    accounts,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
