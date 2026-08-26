import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { getThemeColors, type ThemeColors, type ThemeMode } from '../design-system/themes';
import { useBioCross } from './BioCrossContext';

interface ThemeContextValue {
  colors: ThemeColors;
  mode: ThemeMode;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { preferences } = useBioCross();
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const pref = preferences?.appearance ?? 'light';
    if (pref === 'system') {
      setMode(systemScheme === 'dark' ? 'dark' : 'light');
    } else {
      setMode(pref);
    }
  }, [preferences?.appearance, systemScheme]);

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (preferences?.appearance === 'system') {
        setMode(colorScheme === 'dark' ? 'dark' : 'light');
      }
    });
    return () => sub.remove();
  }, [preferences?.appearance]);

  const value = useMemo(
    () => ({
      colors: getThemeColors(mode),
      mode,
      isDark: mode === 'dark',
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return { colors: getThemeColors('light'), mode: 'light' as ThemeMode, isDark: false };
  }
  return ctx;
}
