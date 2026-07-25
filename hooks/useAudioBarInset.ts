import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '@/constants/theme';
import { useAudioStore } from '@/store/useAudioStore';

/**
 * Bottom padding so scroll content clears the sticky GlobalAudioBar
 * on tab shells and stack routes (artist / track).
 */
export function useAudioBarInset(extra = 0): number {
  const insets = useSafeAreaInsets();
  const hasTrack = useAudioStore((s) => s.currentTrack != null);
  const bar = hasTrack
    ? spacing.audioBar + Math.max(insets.bottom, spacing.sm)
    : Math.max(insets.bottom, spacing.sm);
  return bar + spacing.xxl + extra;
}
