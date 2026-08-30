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
import type {
  ActivityItem,
  Company,
  CompanyAverages,
  EmployerResponse,
  EmploymentStatus,
  EmploymentType,
  ExperienceType,
  Interview,
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
  reviews: 'rme.reviews.v2',
  interviews: 'rme.interviews.v2',
  salaries: 'rme.salaries.v2',
  onboarded: 'rme.onboarded.v2',
  guest: 'rme.guest.v2',
  saved: 'rme.saved.v2',
  recentSearches: 'rme.recentSearches.v2',
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
};

type AppContextValue = {
  ready: boolean;
  hasOnboarded: boolean;
  isGuest: boolean;
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
  user: User | null;
  completeOnboarding: () => Promise<void>;
  continueAsGuest: () => Promise<void>;
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
  toggleSavedCompany: (companyId: string) => Promise<void>;
  addRecentSearch: (query: string) => Promise<void>;
  signUp: (input: {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
  }) => Promise<string | null>;
  signIn: (input: { email: string; password: string }) => Promise<string | null>;
  signOut: () => Promise<void>;
  submitWorkReview: (draft: WriteDraft) => Promise<string | null>;
  submitInterview: (draft: WriteDraft) => Promise<string | null>;
  deleteReview: (reviewId: string) => Promise<string | null>;
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
  const companies = seedCompanies;
  const workplaces = seedWorkplaces;
  const tags = seedTags;
  const activity = seedActivity;
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
        setIsGuest(map[STORAGE_KEYS.guest] === '1');
        if (map[STORAGE_KEYS.saved]) setSavedCompanyIds(JSON.parse(map[STORAGE_KEYS.saved]!));
        if (map[STORAGE_KEYS.recentSearches]) {
          setRecentSearches(JSON.parse(map[STORAGE_KEYS.recentSearches]!));
        }
        if (map[STORAGE_KEYS.session]) {
          const match = parsedUsers.find((item) => item.id === map[STORAGE_KEYS.session]);
          setUser(match ? toPublicUser(match) : null);
        }
      } finally {
        if (mounted) setReady(true);
      }
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
        if (accounts.some((item) => item.email === normalized)) {
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
        await persistAccounts([...accounts, nextUser]);
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
      signIn: async ({ email, password }) => {
        const match = accounts.find(
          (item) => item.email === normalizeEmail(email) && item.password === password,
        );
        if (!match) return 'Invalid email or password.';
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
        await AsyncStorage.multiRemove([STORAGE_KEYS.session, STORAGE_KEYS.guest]);
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
          body: draft.body.trim(),
          questions: draft.interviewQuestions
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean),
          helpfulCount: 0,
          createdAt: new Date().toISOString(),
        };
        await persistInterviews([next, ...interviews]);
        return null;
      },
      deleteReview: async (reviewId) => {
        if (!user) return 'Sign in to delete a review.';
        const target = reviews.find((item) => item.id === reviewId);
        if (!target || target.userId !== user.id) return 'Review not found.';
        await persistReviews(reviews.filter((item) => item.id !== reviewId));
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
