import { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { WaveformPlayer } from '@/components/audio/WaveformPlayer';
import { EditorialSidebar } from '@/components/editorial/EditorialSidebar';
import {
  EditorialSubNav,
  type EditorialTab,
} from '@/components/editorial/EditorialSubNav';
import { FeaturedHero } from '@/components/editorial/FeaturedHero';
import { TrackChartRow } from '@/components/editorial/TrackChartRow';
import { BandCard } from '@/components/ui/BandCard';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, portalBox, spacing, typography } from '@/constants/theme';
import { useAudioBarInset } from '@/hooks/useAudioBarInset';
import {
  DEMO_ARTISTS,
  DEMO_COMMENTS,
  DEMO_TRACKS,
  EDITORS_PICKS,
  FEATURED_SPOTLIGHT,
  RECENTLY_FEATURED,
  TRENDING_TRACKS,
  getTrackById,
  tracksByDownloads,
  tracksByReposts,
} from '@/lib/demoData';

const SPLIT_BREAKPOINT = 780;

/**
 * PureVolume-inspired editorial homepage:
 * bordered hero → portal toolbar → split bordered feed + sidebar.
 */
export default function EditorialScreen() {
  const [tab, setTab] = useState<EditorialTab>('Featured');
  const { width } = useWindowDimensions();
  const bottomInset = useAudioBarInset(spacing.tabBar);
  const isWide = width >= SPLIT_BREAKPOINT;

  const spotlightTrack =
    getTrackById(FEATURED_SPOTLIGHT.trackId) ?? DEMO_TRACKS[0];
  const spotlightComments = DEMO_COMMENTS.filter(
    (c) => c.trackId === spotlightTrack.id,
  );

  const sidebarSections = useMemo(
    () => [
      {
        title: "EDITOR'S PICKS",
        tracks: EDITORS_PICKS.map((id) => getTrackById(id)).filter(
          (t): t is NonNullable<typeof t> => t != null,
        ),
      },
      {
        title: 'TRENDING',
        tracks: TRENDING_TRACKS.map((id) => getTrackById(id)).filter(
          (t): t is NonNullable<typeof t> => t != null,
        ),
      },
      {
        title: 'RECENTLY FEATURED',
        tracks: RECENTLY_FEATURED.map((id) => getTrackById(id)).filter(
          (t): t is NonNullable<typeof t> => t != null,
        ),
      },
    ],
    [],
  );

  const topSongs = useMemo(() => tracksByReposts(), []);
  const topDownloads = useMemo(() => tracksByDownloads(), []);

  return (
    <StaticBackground>
      <ScrollView
        stickyHeaderIndices={[2]}
        contentContainerStyle={{ paddingBottom: bottomInset }}
      >
        <View style={styles.masthead}>
          <Text style={styles.brand}>STATICVOLUME</Text>
          <Text style={styles.tagline}>
            HUMAN-CURATED DISCOVERY · DOWNLOADS COUNT · NO LIKES
          </Text>
        </View>

        <FeaturedHero spotlight={FEATURED_SPOTLIGHT} track={spotlightTrack} />

        <EditorialSubNav active={tab} onChange={setTab} />

        <View style={[styles.split, isWide && styles.splitWide]}>
          <View style={[styles.mainCol, isWide && styles.mainColWide]}>
            {tab === 'Featured' ? (
              <View style={styles.panel}>
                <View style={styles.panelHeader}>
                  <Text style={styles.panelKicker}>NOW PLAYING ON THE WIRE</Text>
                  <Text style={styles.panelTitle}>FEATURED TRANSMISSION</Text>
                </View>
                <View style={styles.panelBody}>
                  <View style={styles.playerBlock}>
                    <WaveformPlayer
                      track={spotlightTrack}
                      comments={spotlightComments}
                    />
                  </View>
                  <Text style={styles.panelNote}>
                    Primary engagement: downloads & reposts. Play counts remain
                    private to the artist.
                  </Text>
                  <View style={styles.subHeader}>
                    <Text style={styles.moreLabel}>MORE ON THE HOMEPAGE</Text>
                  </View>
                  {DEMO_TRACKS.filter((t) => t.id !== spotlightTrack.id)
                    .slice(0, 3)
                    .map((track, index) => (
                      <TrackChartRow
                        key={track.id}
                        track={track}
                        rank={index + 2}
                        metric="downloads"
                      />
                    ))}
                </View>
              </View>
            ) : null}

            {tab === 'Top Songs' ? (
              <View style={styles.panel}>
                <View style={styles.panelHeader}>
                  <Text style={styles.panelKicker}>CHARTS</Text>
                  <Text style={styles.panelTitle}>TOP SONGS</Text>
                </View>
                <View style={styles.panelBody}>
                  <Text style={styles.panelNote}>
                    Ranked by reposts — scene propagation, not private plays.
                  </Text>
                  {topSongs.map((track, index) => (
                    <TrackChartRow
                      key={track.id}
                      track={track}
                      rank={index + 1}
                      metric="reposts"
                    />
                  ))}
                </View>
              </View>
            ) : null}

            {tab === 'Top Downloads' ? (
              <View style={styles.panel}>
                <View style={styles.panelHeader}>
                  <Text style={styles.panelKicker}>CHARTS</Text>
                  <Text style={styles.panelTitle}>TOP DOWNLOADS</Text>
                </View>
                <View style={styles.panelBody}>
                  <Text style={styles.panelNote}>
                    Download count is the primary public engagement signal.
                  </Text>
                  {topDownloads.map((track, index) => (
                    <TrackChartRow
                      key={track.id}
                      track={track}
                      rank={index + 1}
                      metric="downloads"
                    />
                  ))}
                </View>
              </View>
            ) : null}

            {tab === 'Browse Artists' ? (
              <View style={styles.panel}>
                <View style={styles.panelHeader}>
                  <Text style={styles.panelKicker}>DIRECTORY</Text>
                  <Text style={styles.panelTitle}>BROWSE ARTISTS</Text>
                </View>
                <View style={styles.panelBody}>
                  <Text style={styles.panelNote}>
                    Scene & geography live on each profile — no global rankings.
                  </Text>
                  {DEMO_ARTISTS.map((artist) => (
                    <BandCard
                      key={artist.id}
                      id={artist.id}
                      name={artist.displayName}
                      scene={artist.scene}
                      geography={artist.geography}
                      downloadCount={
                        DEMO_TRACKS.find((t) => t.artistId === artist.id)
                          ?.downloadCount ?? 0
                      }
                    />
                  ))}
                </View>
              </View>
            ) : null}
          </View>

          <View style={[styles.sideCol, isWide && styles.sideColWide]}>
            <EditorialSidebar sections={sidebarSections} />
          </View>
        </View>
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  masthead: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 2,
  },
  brand: {
    ...typography.brand,
    fontSize: 20,
    letterSpacing: 2,
    color: colors.accentLine,
  },
  tagline: {
    ...typography.monoTiny,
    color: colors.textDim,
    letterSpacing: 0.6,
  },
  split: {
    flexDirection: 'column',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  splitWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  mainCol: {
    flex: 1,
  },
  mainColWide: {
    flex: 1.7,
  },
  sideCol: {
    flex: 1,
  },
  sideColWide: {
    flex: 1,
    maxWidth: 280,
  },
  panel: {
    ...portalBox,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  panelHeader: {
    backgroundColor: colors.toolbar,
    borderBottomWidth: 1,
    borderBottomColor: colors.accentLine,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    gap: 2,
  },
  panelBody: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  panelKicker: {
    fontFamily: 'SpaceMono',
    fontSize: 8,
    letterSpacing: 0.8,
    color: colors.copper,
    textTransform: 'uppercase',
  },
  panelTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
    letterSpacing: 0.5,
    color: colors.text,
    textTransform: 'uppercase',
  },
  panelNote: {
    fontFamily: 'SpaceMono',
    fontSize: 10,
    letterSpacing: 0.1,
    lineHeight: 15,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    textTransform: 'none',
  },
  playerBlock: {
    marginBottom: spacing.sm,
    paddingBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.sm,
  },
  subHeader: {
    backgroundColor: colors.toolbar,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 0,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    marginTop: spacing.xs,
  },
  moreLabel: {
    fontFamily: 'SpaceMono',
    fontSize: 8,
    letterSpacing: 0.8,
    color: colors.accentLine,
    textTransform: 'uppercase',
  },
});
