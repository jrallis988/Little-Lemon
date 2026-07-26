import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '@/constants/theme';

/** Bottom padding for scroll content above the tab bar / safe area. */
export function useBottomInset(extra = 0): number {
  const insets = useSafeAreaInsets();
  return Math.max(insets.bottom, spacing.sm) + spacing.xxl + extra;
}
