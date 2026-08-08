import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { seedCompanies, seedReviews } from '../data/seed';
import { averageReviews } from '../lib/averages';
import type { Company, CompanyAverages, Review, ReviewScores, User } from '../types';

const STORAGE_KEYS = {
  users: 'rme.users',
  session: 'rme.session',
  reviews: 'rme.reviews',
};

type AuthInput = {
  email: string;
  password: string;
  displayName?: string;
};

type ReviewInput = {
  companyId: string;
  title: string;
  body: string;
  role: string;
  employmentStatus: 'current' | 'former';
  wouldRecommend: boolean;
  scores: ReviewScores;
};

type AppContextValue = {
  ready: boolean;
  companies: Company[];
  reviews: Review[];
  user: User | null;
  searchCompanies: (query: string) => Company[];
  getCompany: (id: string) => Company | undefined;
  getCompanyReviews: (companyId: string) => Review[];
  getCompanyAverages: (companyId: string) => CompanyAverages;
  getMyReviews: () => Review[];
  signUp: (input: AuthInput) => Promise<string | null>;
  signIn: (input: AuthInput) => Promise<string | null>;
  signOut: () => Promise<void>;
  submitReview: (input: ReviewInput) => Promise<string | null>;
  updateReview: (reviewId: string, input: Omit<ReviewInput, 'companyId'>) => Promise<string | null>;
  deleteReview: (reviewId: string) => Promise<string | null>;
};

const AppContext = createContext<AppContextValue | null>(null);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const companies = seedCompanies;

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const [usersRaw, sessionRaw, reviewsRaw] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.users),
          AsyncStorage.getItem(STORAGE_KEYS.session),
          AsyncStorage.getItem(STORAGE_KEYS.reviews),
        ]);

        if (!mounted) return;

        const parsedUsers: User[] = usersRaw ? JSON.parse(usersRaw) : [];
        setUsers(parsedUsers);

        if (reviewsRaw) {
          setReviews(JSON.parse(reviewsRaw));
        } else {
          await AsyncStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(seedReviews));
        }

        if (sessionRaw) {
          const sessionUser = parsedUsers.find((item) => item.id === sessionRaw) ?? null;
          setUser(sessionUser);
        }
      } finally {
        if (mounted) setReady(true);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const persistUsers = async (next: User[]) => {
    setUsers(next);
    await AsyncStorage.setItem(STORAGE_KEYS.users, JSON.stringify(next));
  };

  const persistReviews = async (next: Review[]) => {
    setReviews(next);
    await AsyncStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(next));
  };

  const value = useMemo<AppContextValue>(() => {
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

    const getCompany = (id: string) => companies.find((company) => company.id === id);

    const getCompanyReviews = (companyId: string) =>
      reviews
        .filter((review) => review.companyId === companyId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const getCompanyAverages = (companyId: string) =>
      averageReviews(getCompanyReviews(companyId));

    const getMyReviews = () => {
      if (!user) return [];
      return reviews
        .filter((review) => review.userId === user.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    };

    const signUp = async ({ email, password, displayName }: AuthInput) => {
      const normalized = normalizeEmail(email);
      if (!normalized || !password || !displayName?.trim()) {
        return 'Name, email, and password are required.';
      }
      if (password.length < 6) {
        return 'Password must be at least 6 characters.';
      }
      if (users.some((item) => item.email === normalized)) {
        return 'An account with that email already exists.';
      }

      const nextUser: User = {
        id: `user-${Date.now()}`,
        email: normalized,
        displayName: displayName.trim(),
        password,
      };

      const nextUsers = [...users, nextUser];
      await persistUsers(nextUsers);
      setUser(nextUser);
      await AsyncStorage.setItem(STORAGE_KEYS.session, nextUser.id);
      return null;
    };

    const signIn = async ({ email, password }: AuthInput) => {
      const normalized = normalizeEmail(email);
      const match = users.find(
        (item) => item.email === normalized && item.password === password,
      );
      if (!match) {
        return 'Invalid email or password.';
      }
      setUser(match);
      await AsyncStorage.setItem(STORAGE_KEYS.session, match.id);
      return null;
    };

    const signOut = async () => {
      setUser(null);
      await AsyncStorage.removeItem(STORAGE_KEYS.session);
    };

    const submitReview = async (input: ReviewInput) => {
      if (!user) return 'Sign in to leave a review.';
      if (!input.title.trim() || !input.body.trim() || !input.role.trim()) {
        return 'Title, role, and review text are required.';
      }
      if (Object.values(input.scores).some((score) => score < 1 || score > 5)) {
        return 'All scores must be between 1 and 5.';
      }

      const existing = reviews.find(
        (review) => review.companyId === input.companyId && review.userId === user.id,
      );
      if (existing) {
        return 'You already reviewed this employer. Edit it from your profile.';
      }

      const nextReview: Review = {
        id: `rev-${Date.now()}`,
        companyId: input.companyId,
        userId: user.id,
        authorName: user.displayName,
        title: input.title.trim(),
        body: input.body.trim(),
        role: input.role.trim(),
        employmentStatus: input.employmentStatus,
        wouldRecommend: input.wouldRecommend,
        scores: input.scores,
        createdAt: new Date().toISOString(),
      };

      await persistReviews([nextReview, ...reviews]);
      return null;
    };

    const updateReview = async (
      reviewId: string,
      input: Omit<ReviewInput, 'companyId'>,
    ) => {
      if (!user) return 'Sign in to edit a review.';
      const target = reviews.find((review) => review.id === reviewId);
      if (!target || target.userId !== user.id) {
        return 'Review not found.';
      }
      if (!input.title.trim() || !input.body.trim() || !input.role.trim()) {
        return 'Title, role, and review text are required.';
      }

      const next = reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              title: input.title.trim(),
              body: input.body.trim(),
              role: input.role.trim(),
              employmentStatus: input.employmentStatus,
              wouldRecommend: input.wouldRecommend,
              scores: input.scores,
            }
          : review,
      );
      await persistReviews(next);
      return null;
    };

    const deleteReview = async (reviewId: string) => {
      if (!user) return 'Sign in to delete a review.';
      const target = reviews.find((review) => review.id === reviewId);
      if (!target || target.userId !== user.id) {
        return 'Review not found.';
      }
      await persistReviews(reviews.filter((review) => review.id !== reviewId));
      return null;
    };

    return {
      ready,
      companies,
      reviews,
      user,
      searchCompanies,
      getCompany,
      getCompanyReviews,
      getCompanyAverages,
      getMyReviews,
      signUp,
      signIn,
      signOut,
      submitReview,
      updateReview,
      deleteReview,
    };
  }, [ready, companies, reviews, user, users]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
}
