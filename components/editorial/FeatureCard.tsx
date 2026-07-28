import { Link, type Href } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts } from '@/constants/theme';
import { getArtistById, getTrackById, type FeatureTile } from '@/lib/demoData';

const TONE_COLORS: Record<FeatureTile['tone'], [string, string, string]> = {
  ash: ['#4A4A4A', '#2A2A2A', '#151515'],
  rust: ['#3A3A3A', '#222222', '#111111'],
  slate: ['#555555', '#333333', '#1A1A1A'],
  ember: ['#404040', '#282828', '#141414'],
  ink: ['#2C2C2C', '#1A1A1A', '#0D0D0D'],
  steel: ['#484848', '#2E2E2E', '#181818'],
};

type FeatureCardProps = {
  tile: FeatureTile;
  style?: ViewStyle;
  minHeight?: number;
};

/**
 * PureVolume mosaic tile — full-bleed artwork when available, bottom title overlay.
 */
export function FeatureCard({ tile, style, minHeight = 140 }: FeatureCardProps) {
  const tones = TONE_COLORS[tile.tone];
  const href = (
    tile.trackId ? `/track/${tile.trackId}` : `/artist/${tile.artistId}`
  ) as Href;
  const cardStyle = StyleSheet.flatten([styles.card, { minHeight }, style]);
  const track = tile.trackId ? getTrackById(tile.trackId) : undefined;
  const artist = getArtistById(tile.artistId);
  const art = track?.artworkUrl || artist?.avatarUrl || null;

  return (
    <Link href={href} asChild>
      <Pressable style={cardStyle}>
        {art ? (
          <Image source={{ uri: art }} style={StyleSheet.absoluteFill} />
        ) : (
          <>
            <LinearGradient colors={tones} style={StyleSheet.absoluteFill} />
            <View style={styles.monogramWrap}>
              <Text style={styles.monogram}>{tile.title.charAt(0)}</Text>
            </View>
          </>
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.45)', 'rgba(0,0,0,0.88)']}
          style={styles.overlay}
        >
          <Text style={styles.title} numberOfLines={2}>
            {tile.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {tile.subtitle}
          </Text>
        </LinearGradient>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    overflow: 'hidden',
    backgroundColor: '#222',
    position: 'relative',
  },
  monogramWrap: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monogram: {
    fontFamily: fonts.condensedBold,
    fontSize: 80,
    color: 'rgba(255,255,255,0.08)',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 28,
    paddingBottom: 10,
    gap: 2,
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 18,
    color: '#FFFFFF',
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: '#DDDDDD',
    fontStyle: 'italic',
  },
});
