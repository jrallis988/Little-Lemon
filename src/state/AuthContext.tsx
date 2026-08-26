import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { biocrossApi, authStorage, apiConfig } from '../api';
import { ApiError } from '../api/errors';
import type { User } from '../domain/models';
import { biocrossRepository } from '../domain/repository';

interface AuthContextValue {
  authReady: boolean;
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
  onSessionChange,
}: {
  children: React.ReactNode;
  onSessionChange?: () => Promise<void>;
}) {
  const [authReady, setAuthReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const refreshSession = useCallback(async () => {
    const token = await authStorage.getAccessToken();
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }
    try {
      const me = await biocrossApi.getMe();
      setUser(me);
      setIsAuthenticated(true);
    } catch {
      await authStorage.clearTokens();
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshSession().finally(() => setAuthReady(true));
  }, [refreshSession]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const session = await biocrossApi.signIn(email.trim(), password);
      await authStorage.saveTokens(session.tokens.accessToken, session.tokens.refreshToken);
      setUser(session.user);
      setIsAuthenticated(true);
      if (onSessionChange) await onSessionChange();
    },
    [onSessionChange],
  );

  const signUp = useCallback(
    async (email: string, password: string, fullName: string) => {
      const session = await biocrossApi.signUp(email.trim(), password, fullName.trim());
      await authStorage.saveTokens(session.tokens.accessToken, session.tokens.refreshToken);
      setUser(session.user);
      setIsAuthenticated(true);
      if (onSessionChange) await onSessionChange();
    },
    [onSessionChange],
  );

  const signOut = useCallback(async () => {
    try {
      if (await authStorage.getAccessToken()) {
        await biocrossApi.signOut();
      }
    } catch {
      /* ignore network errors on sign-out */
    }
    await authStorage.clearTokens();
    await biocrossRepository.resetDemo();
    setIsAuthenticated(false);
    setUser(null);
    if (onSessionChange) await onSessionChange();
  }, [onSessionChange]);

  const value = useMemo<AuthContextValue>(
    () => ({
      authReady,
      isAuthenticated,
      user,
      signIn,
      signUp,
      signOut,
      refreshSession,
    }),
    [authReady, isAuthenticated, user, signIn, signUp, signOut, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function getDemoCredentials() {
  return { email: apiConfig.demoEmail, password: apiConfig.demoPassword };
}

export function formatAuthError(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return 'Something went wrong. Please try again.';
}
