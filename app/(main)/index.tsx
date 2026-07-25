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
import { colors, spacing, typography } from '@/constants/theme';
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
 * hero banner → sub-nav → split feed (player + sidebar charts).
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
        {/* 0 — Brand masthead */}
        <View style={styles.masthead}>
          <Text style={styles.brand}>STATICVOLUME</Text>
          <Text style={styles.tagline}>
            HUMAN-CURATED DISCOVERY · DOWNLOADS COUNT · NO LIKES
          </Text>
        </View>

        {/* 1 — Large-format featured hero */}
        <FeaturedHero spotlight={FEATURED_SPOTLIGHT} track={spotlightTrack} />

        {/* 2 — Sticky PureVolume sub-nav */}
        <EditorialSubNav active={tab} onChange={setTab} />

        {/* 3 — Split feed */}
        <View style={[styles.split, isWide && styles.splitWide]}>
          <View style={[styles.mainCol, isWide && styles.mainColWide]}>
            {tab === 'Featured' ? (
              <View style={styles.panel}>
                <Text style={styles.panelKicker}>NOW PLAYING ON THE WIRE</Text>
                <Text style={styles.panelTitle}>FEATURED TRANSMISSION</Text>
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
                <Text style={styles.moreLabel}>MORE ON THE HOMEPAGE</Text>
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
            ) : null}

            {tab === 'Top Songs' ? (
              <View style={styles.panel}>
                <Text style={styles.panelKicker}>CHARTS</Text>
                <Text style={styles.panelTitle}>TOP SONGS</Text>
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
            ) : null}

            {tab === 'Top Downloads' ? (
              <View style={styles.panel}>
                <Text style={styles.panelKicker}>CHARTS</Text>
                <Text style={styles.panelTitle}>TOP DOWNLOADS</Text>
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
            ) : null}

            {tab === 'Browse Artists' ? (
              <View style={styles.panel}>
                <Text style={styles.panelKicker}>DIRECTORY</Text>
                <Text style={styles.panelTitle}>BROWSE ARTISTS</Text>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    gap: 4,
  },
  brand: {
    ...typography.brand,
    fontSize: 22,
    letterSpacing: 3,
    color: colors.phosphor,
  },
  tagline: {
    ...typography.monoTiny,
    color: colors.textDim,
  },
  split: {
    flexDirection: 'column',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  splitWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  mainCol: {
    flex: 1,
  },
  mainColWide: {
    flex: 1.65,
  },
  sideCol: {
    flex: 1,
  },
  sideColWide: {
    flex: 1,
    maxWidth: 320,
  },
  panel: {
    backgroundColor: colors.backgroundElevated,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  panelKicker: {
    ...typography.monoTiny,
    color: colors.copper,
    marginBottom: spacing.xs,
  },
  panelTitle: {
    ...typography.headline,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  panelNote: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  playerBlock: {
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
  },
  moreLabel: {
    ...typography.monoTiny,
    color: colors.textDim,
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
});
