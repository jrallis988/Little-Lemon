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
  seedCompanies,
  seedEmployerResponses,
  seedReviews,
  seedSalaries,
  seedTags,
} from '../data/seed';
import { averageReviews } from '../lib/averages';
import type {
  Company,
  CompanyAverages,
  EmployerResponse,
  EmploymentStatus,
  EmploymentType,
  ExploreFilter,
  FeedItem,
  Review,
  ReviewScores,
  Salary,
  Tag,
  User,
} from '../types';

const STORAGE_KEYS = {
  users: 'rme.users',
  session: 'rme.session',
  reviews: 'rme.reviews',
  salaries: 'rme.salaries',
  onboarded: 'rme.onboarded',
  guest: 'rme.guest',
  saved: 'rme.saved',
  recentSearches: 'rme.recentSearches',
};

type LocalAccount = User & { password: string };

export type ContributeDraft = {
  companyId: string;
  companyName?: string;
  isNewCompany?: boolean;
  role: string;
  employmentStatus: EmploymentStatus;
  employmentType: EmploymentType;
  scores: ReviewScores;
  title: string;
  body: string;
  pros: string;
  cons: string;
  isAnonymous: boolean;
  tagIds: string[];
  includeSalary: boolean;
  baseAnnual: string;
  bonusAnnual: string;
  yearsExperience: string;
};

type AppContextValue = {
  ready: boolean;
  hasOnboarded: boolean;
  isGuest: boolean;
  companies: Company[];
  reviews: Review[];
  salaries: Salary[];
  tags: Tag[];
  employerResponses: EmployerResponse[];
  savedCompanyIds: string[];
  recentSearches: string[];
  user: User | null;
  completeOnboarding: () => Promise<void>;
  continueAsGuest: () => Promise<void>;
  searchCompanies: (query: string) => Company[];
  getCompany: (id: string) => Company | undefined;
  getCompanyReviews: (companyId: string) => Review[];
  getCompanySalaries: (companyId: string) => Salary[];
  getCompanyAverages: (companyId: string) => CompanyAverages;
  getReview: (id: string) => Review | undefined;
  getEmployerResponse: (reviewId: string) => EmployerResponse | undefined;
  getTagsForReview: (review: Review) => Tag[];
  getFeed: (filter: ExploreFilter) => FeedItem[];
  getTrendingCompanies: () => Company[];
  getMyReviews: () => Review[];
  getMySalaries: () => Salary[];
  toggleSavedCompany: (companyId: string) => Promise<void>;
  addRecentSearch: (query: string) => Promise<void>;
  signUp: (input: { email: string; password: string; displayName?: string }) => Promise<string | null>;
  signIn: (input: { email: string; password: string }) => Promise<string | null>;
  signOut: () => Promise<void>;
  verifyWorkEmail: (workEmail: string) => Promise<string | null>;
  submitContribute: (draft: ContributeDraft) => Promise<string | null>;
  submitSalaryOnly: (input: {
    companyId: string;
    role: string;
    employmentType: EmploymentType;
    baseAnnual: number;
    bonusAnnual?: number;
    equityAnnual?: number;
    yearsExperience?: number;
    currency?: string;
  }) => Promise<string | null>;
  deleteReview: (reviewId: string) => Promise<string | null>;
  voteReview: (reviewId: string, direction: 'up' | 'down') => void;
  addCompany: (input: { name: string; industry: string; location: string }) => Company;
};

const AppContext = createContext<AppContextValue | null>(null);

const defaultScores: ReviewScores = {
  overall: 3,
  culture: 3,
  pay: 3,
  management: 3,
  workLife: 3,
  careerGrowth: 3,
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
  const [salaries, setSalaries] = useState<Salary[]>(seedSalaries);
  const [companies, setCompanies] = useState<Company[]>(seedCompanies);
  const [savedCompanyIds, setSavedCompanyIds] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const tags = seedTags;
  const employerResponses = seedEmployerResponses;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const entries = await AsyncStorage.multiGet([
          STORAGE_KEYS.users,
          STORAGE_KEYS.session,
          STORAGE_KEYS.reviews,
          STORAGE_KEYS.salaries,
          STORAGE_KEYS.onboarded,
          STORAGE_KEYS.guest,
          STORAGE_KEYS.saved,
          STORAGE_KEYS.recentSearches,
        ]);
        if (!mounted) return;
        const map = Object.fromEntries(entries);

        const parsedUsers: LocalAccount[] = map[STORAGE_KEYS.users]
          ? JSON.parse(map[STORAGE_KEYS.users]!)
          : [];
        setAccounts(parsedUsers);

        if (map[STORAGE_KEYS.reviews]) setReviews(JSON.parse(map[STORAGE_KEYS.reviews]!));
        else await AsyncStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(seedReviews));

        if (map[STORAGE_KEYS.salaries]) setSalaries(JSON.parse(map[STORAGE_KEYS.salaries]!));
        else await AsyncStorage.setItem(STORAGE_KEYS.salaries, JSON.stringify(seedSalaries));

        setHasOnboarded(map[STORAGE_KEYS.onboarded] === '1');
        setIsGuest(map[STORAGE_KEYS.guest] === '1');
        if (map[STORAGE_KEYS.saved]) setSavedCompanyIds(JSON.parse(map[STORAGE_KEYS.saved]!));
        if (map[STORAGE_KEYS.recentSearches]) {
          setRecentSearches(JSON.parse(map[STORAGE_KEYS.recentSearches]!));
        }

        if (map[STORAGE_KEYS.session]) {
          const sessionUser =
            parsedUsers.find((item) => item.id === map[STORAGE_KEYS.session]) ?? null;
          setUser(sessionUser ? toPublicUser(sessionUser) : null);
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
    const persistSalaries = async (next: Salary[]) => {
      setSalaries(next);
      await AsyncStorage.setItem(STORAGE_KEYS.salaries, JSON.stringify(next));
    };

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

    const getCompany = (id: string) =>
      companies.find((company) => company.id === id || company.slug === id);

    const getCompanyReviews = (companyId: string) =>
      reviews
        .filter((review) => review.companyId === companyId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const getCompanySalaries = (companyId: string) =>
      salaries
        .filter((salary) => salary.companyId === companyId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const getCompanyAverages = (companyId: string) => {
      const averages = averageReviews(getCompanyReviews(companyId));
      return { ...averages, salaryCount: getCompanySalaries(companyId).length };
    };

    const getReview = (id: string) => reviews.find((review) => review.id === id);

    const getEmployerResponse = (reviewId: string) =>
      employerResponses.find((item) => item.reviewId === reviewId);

    const getTagsForReview = (review: Review) =>
      tags.filter((tag) => review.tagIds?.includes(tag.id));

    const getTrendingCompanies = () =>
      [...companies]
        .map((company) => ({
          company,
          score: getCompanyReviews(company.id).length * 2 + getCompanySalaries(company.id).length,
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
        .map((item) => item.company);

    const getFeed = (filter: ExploreFilter): FeedItem[] => {
      const reviewItems: FeedItem[] = reviews
        .map((review) => {
          const company = getCompany(review.companyId);
          if (!company) return null;
          return { kind: 'review' as const, id: `feed-r-${review.id}`, review, company };
        })
        .filter(Boolean) as FeedItem[];

      const salaryItems: FeedItem[] = salaries
        .map((salary) => {
          const company = getCompany(salary.companyId);
          if (!company) return null;
          return { kind: 'salary' as const, id: `feed-s-${salary.id}`, salary, company };
        })
        .filter(Boolean) as FeedItem[];

      let items = [...reviewItems, ...salaryItems].sort((a, b) => {
        const aDate = a.kind === 'review' ? a.review.createdAt : a.salary.createdAt;
        const bDate = b.kind === 'review' ? b.review.createdAt : b.salary.createdAt;
        return bDate.localeCompare(aDate);
      });

      if (filter === 'tech') {
        items = items.filter((item) =>
          ['Technology', 'Agency', 'Media'].includes(item.company.industry),
        );
      } else if (filter === 'retail') {
        items = items.filter((item) =>
          ['Retail', 'Food & Bev', 'Hospitality'].includes(item.company.industry),
        );
      } else if (filter === 'remote') {
        items = items.filter((item) => item.company.location.toLowerCase().includes('remote'));
      } else if (filter === 'trending') {
        items = items.slice(0, 8);
      }

      return items;
    };

    const getMyReviews = () => {
      if (!user) return [];
      return reviews
        .filter((review) => review.userId === user.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    };

    const getMySalaries = () => {
      if (!user) return [];
      return salaries
        .filter((salary) => salary.userId === user.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    };

    return {
      ready,
      hasOnboarded,
      isGuest,
      companies,
      reviews,
      salaries,
      tags,
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
        await AsyncStorage.multiSet([
          [STORAGE_KEYS.guest, '1'],
          [STORAGE_KEYS.onboarded, '1'],
        ]);
        setHasOnboarded(true);
        await AsyncStorage.removeItem(STORAGE_KEYS.session);
      },
      searchCompanies,
      getCompany,
      getCompanyReviews,
      getCompanySalaries,
      getCompanyAverages,
      getReview,
      getEmployerResponse,
      getTagsForReview,
      getFeed,
      getTrendingCompanies,
      getMyReviews,
      getMySalaries,
      toggleSavedCompany: async (companyId: string) => {
        const next = savedCompanyIds.includes(companyId)
          ? savedCompanyIds.filter((id) => id !== companyId)
          : [...savedCompanyIds, companyId];
        setSavedCompanyIds(next);
        await AsyncStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(next));
      },
      addRecentSearch: async (query: string) => {
        const q = query.trim();
        if (!q) return;
        const next = [q, ...recentSearches.filter((item) => item !== q)].slice(0, 8);
        setRecentSearches(next);
        await AsyncStorage.setItem(STORAGE_KEYS.recentSearches, JSON.stringify(next));
      },
      signUp: async ({ email, password, displayName }) => {
        const normalized = normalizeEmail(email);
        if (!normalized || !password || !displayName?.trim()) {
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
          displayName: displayName.trim(),
          role: 'user',
          password,
          isVerifiedEmployee: false,
          createdAt: now,
          updatedAt: now,
        };
        await persistAccounts([...accounts, nextUser]);
        setUser(toPublicUser(nextUser));
        setIsGuest(false);
        await AsyncStorage.multiSet([
          [STORAGE_KEYS.session, nextUser.id],
          [STORAGE_KEYS.guest, '0'],
          [STORAGE_KEYS.onboarded, '1'],
        ]);
        setHasOnboarded(true);
        return null;
      },
      signIn: async ({ email, password }) => {
        const normalized = normalizeEmail(email);
        const match = accounts.find(
          (item) => item.email === normalized && item.password === password,
        );
        if (!match) return 'Invalid email or password.';
        setUser(toPublicUser(match));
        setIsGuest(false);
        await AsyncStorage.multiSet([
          [STORAGE_KEYS.session, match.id],
          [STORAGE_KEYS.guest, '0'],
          [STORAGE_KEYS.onboarded, '1'],
        ]);
        setHasOnboarded(true);
        return null;
      },
      signOut: async () => {
        setUser(null);
        setIsGuest(false);
        await AsyncStorage.multiRemove([STORAGE_KEYS.session, STORAGE_KEYS.guest]);
      },
      verifyWorkEmail: async (workEmail: string) => {
        if (!user) return 'Sign in first to verify work status.';
        const normalized = normalizeEmail(workEmail);
        if (!normalized.includes('@') || normalized.endsWith('@gmail.com') || normalized.endsWith('@yahoo.com')) {
          return 'Use a corporate work email domain.';
        }
        const domain = normalized.split('@')[1];
        const updatedAccounts = accounts.map((account) =>
          account.id === user.id
            ? {
                ...account,
                isVerifiedEmployee: true,
                workEmailDomain: domain,
                updatedAt: new Date().toISOString(),
              }
            : account,
        );
        await persistAccounts(updatedAccounts);
        const next = updatedAccounts.find((account) => account.id === user.id)!;
        setUser(toPublicUser(next));
        return null;
      },
      submitContribute: async (draft) => {
        if (!user) return 'Sign in to contribute a review.';
        if (!draft.companyId) return 'Select a company.';
        if (!draft.role.trim() || !draft.body.trim()) {
          return 'Role and review text are required.';
        }
        if (
          reviews.some(
            (review) => review.companyId === draft.companyId && review.userId === user.id,
          )
        ) {
          return 'You already reviewed this employer.';
        }

        const nextReview: Review = {
          id: `rev-${Date.now()}`,
          companyId: draft.companyId,
          userId: user.id,
          authorName: draft.isAnonymous ? 'Anonymous' : user.displayName,
          title: draft.title.trim() || `${draft.role} experience`,
          body: draft.body.trim(),
          pros: draft.pros.trim() || undefined,
          cons: draft.cons.trim() || undefined,
          role: draft.role.trim(),
          employmentStatus: draft.employmentStatus,
          employmentType: draft.employmentType,
          wouldRecommend: draft.scores.overall >= 3,
          scores: draft.scores,
          tagIds: draft.tagIds,
          isAnonymous: draft.isAnonymous,
          helpfulCount: 0,
          createdAt: new Date().toISOString(),
        };
        await persistReviews([nextReview, ...reviews]);

        if (draft.includeSalary && draft.baseAnnual) {
          const base = Number(draft.baseAnnual);
          if (!Number.isNaN(base) && base > 0) {
            const nextSalary: Salary = {
              id: `sal-${Date.now()}`,
              companyId: draft.companyId,
              userId: user.id,
              role: draft.role.trim(),
              employmentType: draft.employmentType,
              baseAnnual: base,
              bonusAnnual: draft.bonusAnnual ? Number(draft.bonusAnnual) : null,
              currency: 'USD',
              yearsExperience: draft.yearsExperience ? Number(draft.yearsExperience) : null,
              createdAt: new Date().toISOString(),
            };
            await persistSalaries([nextSalary, ...salaries]);
          }
        }
        return null;
      },
      submitSalaryOnly: async (input) => {
        if (!user) return 'Sign in to submit salary data.';
        if (!input.companyId || !input.role.trim() || !input.baseAnnual) {
          return 'Company, role, and base salary are required.';
        }
        const nextSalary: Salary = {
          id: `sal-${Date.now()}`,
          companyId: input.companyId,
          userId: user.id,
          role: input.role.trim(),
          employmentType: input.employmentType,
          baseAnnual: input.baseAnnual,
          bonusAnnual: input.bonusAnnual ?? null,
          equityAnnual: input.equityAnnual ?? null,
          currency: input.currency ?? 'USD',
          yearsExperience: input.yearsExperience ?? null,
          createdAt: new Date().toISOString(),
        };
        await persistSalaries([nextSalary, ...salaries]);
        return null;
      },
      deleteReview: async (reviewId) => {
        if (!user) return 'Sign in to delete a review.';
        const target = reviews.find((review) => review.id === reviewId);
        if (!target || target.userId !== user.id) return 'Review not found.';
        await persistReviews(reviews.filter((review) => review.id !== reviewId));
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
      addCompany: ({ name, industry, location }) => {
        const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const company: Company = {
          id: slug || `company-${Date.now()}`,
          name: name.trim(),
          slug: slug || `company-${Date.now()}`,
          industry: industry.trim() || 'Other',
          location: location.trim() || 'Remote',
          size: 'Unknown',
          summary: 'Newly added employer — reviews coming soon.',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setCompanies((prev) => [company, ...prev]);
        return company;
      },
    };
  }, [
    ready,
    hasOnboarded,
    isGuest,
    companies,
    reviews,
    salaries,
    tags,
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

export { defaultScores };
