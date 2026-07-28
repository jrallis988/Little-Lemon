import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '@/constants/theme';
import {
  addToSpotify,
  canOpenOnSpotify,
  openOnSpotify,
  type SpotifyOutboundTarget,
} from '@/lib/spotify';

type SpotifyOutboundActionsProps = {
  target: SpotifyOutboundTarget;
  /** Show Add to Spotify (track hand-off). Default true when target is a track. */
  showAdd?: boolean;
  compact?: boolean;
};

/**
 * Outbound Spotify CTAs — listening happens in Spotify, never in-app.
 */
export function SpotifyOutboundActions({
  target,
  showAdd,
  compact = false,
}: SpotifyOutboundActionsProps) {
  const [busy, setBusy] = useState<'open' | 'add' | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const available = canOpenOnSpotify(target);
  const allowAdd = showAdd ?? target.kind === 'track';

  if (!available) return null;

  async function onOpen() {
    setBusy('open');
    setHint(null);
    try {
      await openOnSpotify(target);
    } finally {
      setBusy(null);
    }
  }

  async function onAdd() {
    setBusy('add');
    try {
      const result = await addToSpotify(target);
      setHint(result.message);
    } finally {
      setBusy(null);
    }
  }

  return (
    <View style={[styles.wrap, compact && styles.wrapCompact]}>
      <View style={[styles.row, compact && styles.rowCompact]}>
        <Pressable
          style={[styles.primary, compact && styles.primaryCompact]}
          onPress={onOpen}
          disabled={busy != null}
          accessibilityRole="link"
          accessibilityLabel={`Open ${target.label} on Spotify`}
        >
          {busy === 'open' ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryText}>Open on Spotify</Text>
          )}
        </Pressable>
        {allowAdd ? (
          <Pressable
            style={[styles.secondary, compact && styles.secondaryCompact]}
            onPress={onAdd}
            disabled={busy != null}
            accessibilityRole="button"
            accessibilityLabel={`Add ${target.label} on Spotify`}
          >
            {busy === 'add' ? (
              <ActivityIndicator color={colors.link} />
            ) : (
              <Text style={styles.secondaryText}>Add to Spotify</Text>
            )}
          </Pressable>
        ) : null}
      </View>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      {!compact ? (
        <Text style={styles.note}>
          Listening happens on Spotify. StaticVolume is for discovery, logging,
          and supporting independent artists — not streaming.
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  wrapCompact: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  rowCompact: {
    gap: 6,
  },
  primary: {
    flexGrow: 1,
    flexBasis: '48%',
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  primaryCompact: {
    paddingVertical: 8,
    minHeight: 36,
  },
  primaryText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  secondary: {
    flexGrow: 1,
    flexBasis: '48%',
    borderWidth: 1,
    borderColor: '#1DB954',
    backgroundColor: colors.surface,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  secondaryCompact: {
    paddingVertical: 8,
    minHeight: 36,
  },
  secondaryText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: '#128C3C',
  },
  hint: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 16,
  },
  note: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textDim,
    lineHeight: 16,
  },
});
