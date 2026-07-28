import { StyleSheet, Text, View } from 'react-native';

import { colors, portalBox, spacing, fonts } from '@/constants/theme';
import type { UserProfile } from '@/types/models';

type ArtistArchiveMetaProps = {
  artist: UserProfile;
  totalDownloads: number;
  totalReposts: number;
  trackCount: number;
};

/**
 * Terminal-inspired archive dossier — raw metrics, no marketing fluff.
 */
export function ArtistArchiveMeta({
  artist,
  totalDownloads,
  totalReposts,
  trackCount,
}: ArtistArchiveMetaProps) {
  const tags = artist.genreTags?.length
    ? artist.genreTags.join(' / ')
    : artist.scene ?? 'N/A';
  const status = artist.status ?? 'INDEPENDENT';
  const years = artist.activeYears ?? 'N/A';
  const origin = artist.geography ?? 'N/A';
  const scene = artist.sceneDescription ?? artist.bio ?? 'N/A';

  const isCatalog = artist.catalogKind === 'catalog';
  const lines = [
    { key: 'ORIGIN', value: origin },
    { key: 'GENRE', value: tags.toUpperCase() },
    { key: 'ACTIVE YEARS', value: years },
    { key: 'STATUS', value: isCatalog ? 'CATALOG' : status },
    { key: 'SCENE', value: scene.toUpperCase() },
    ...(isCatalog
      ? [
          {
            key: 'SPOTIFY',
            value: artist.spotifyArtistId
              ? `ID ${artist.spotifyArtistId}`
              : 'SEARCH HAND-OFF',
          },
          { key: 'LISTEN', value: 'OPEN ON SPOTIFY (OUTBOUND)' },
        ]
      : [
          { key: 'TOTAL DOWNLOADS', value: totalDownloads.toLocaleString() },
          { key: 'TOTAL REPOSTS', value: totalReposts.toLocaleString() },
        ]),
    { key: 'TRACKS INDEXED', value: String(trackCount) },
    { key: 'FOLLOWERS', value: (artist.followerCount ?? 0).toLocaleString() },
  ];

  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ARCHIVE // ARTIST DOSSIER</Text>
      </View>
      {lines.map((line) => (
        <View key={line.key} style={styles.row}>
          <Text style={styles.key}>{line.key}:</Text>
          <Text style={styles.value}>{line.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    ...portalBox,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: colors.toolbar,
    borderBottomWidth: 1,
    borderBottomColor: colors.accentLine,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  headerText: {
    fontFamily: fonts.sans,
    fontSize: 9,
    letterSpacing: 0.8,
    color: colors.phosphor,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  key: {
    fontFamily: fonts.sans,
    fontSize: 9,
    letterSpacing: 0.4,
    color: colors.phosphorDim,
    textTransform: 'uppercase',
    minWidth: 120,
  },
  value: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 9,
    letterSpacing: 0.2,
    color: colors.text,
    textTransform: 'uppercase',
  },
});
