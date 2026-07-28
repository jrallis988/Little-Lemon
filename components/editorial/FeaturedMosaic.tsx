import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { FeatureCard } from '@/components/editorial/FeatureCard';
import { spacing } from '@/constants/theme';
import { FEATURE_TILES } from '@/lib/demoData';

/**
 * PureVolume featured mosaic — large hero + secondary + small tile row.
 */
export function FeaturedMosaic() {
  const { width } = useWindowDimensions();
  const isWide = width >= 720;
  const gutter = 8;

  const hero = FEATURE_TILES.find((t) => t.size === 'hero')!;
  const secondary = FEATURE_TILES.find((t) => t.size === 'secondary')!;
  const smalls = FEATURE_TILES.filter((t) => t.size === 'small');
  const promo = FEATURE_TILES.find((t) => t.size === 'promo')!;

  if (!isWide) {
    return (
      <View style={styles.root}>
        <FeatureCard tile={hero} minHeight={210} />
        <View style={{ height: gutter }} />
        <FeatureCard tile={secondary} minHeight={160} />
        <View style={{ height: gutter }} />
        <View style={styles.row}>
          {smalls.slice(0, 2).map((tile, i) => (
            <View
              key={tile.id}
              style={[styles.flex, i > 0 && { marginLeft: gutter }]}
            >
              <FeatureCard tile={tile} minHeight={120} />
            </View>
          ))}
        </View>
        <View style={{ height: gutter }} />
        <FeatureCard tile={promo} minHeight={110} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <View style={[styles.flex, { flex: 1.55, marginRight: gutter }]}>
          <FeatureCard tile={hero} minHeight={260} />
        </View>
        <View style={[styles.flex, { flex: 1 }]}>
          <FeatureCard tile={secondary} minHeight={260} />
        </View>
      </View>
      <View style={{ height: gutter }} />
      <View style={styles.row}>
        {[...smalls.slice(0, 2), promo].map((tile, i) => (
          <View
            key={tile.id}
            style={[styles.flex, i > 0 && { marginLeft: gutter }]}
          >
            <FeatureCard tile={tile} minHeight={140} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  flex: {
    flex: 1,
  },
});
