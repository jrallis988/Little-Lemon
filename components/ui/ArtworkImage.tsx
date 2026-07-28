import { Image, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts } from '@/constants/theme';

type ArtworkImageProps = {
  uri?: string | null;
  label?: string;
  style?: StyleProp<ViewStyle>;
  /** Fallback monogram letter */
  monogram?: string;
  rounded?: boolean;
};

/**
 * Catalog / artist artwork with monogram fallback.
 * Sources: iTunes artwork CDN, Cover Art Archive, Unsplash stock (emerging placeholders).
 */
export function ArtworkImage({
  uri,
  label,
  style,
  monogram,
  rounded = false,
}: ArtworkImageProps) {
  const letter = (monogram || label || '?').charAt(0).toUpperCase();

  if (uri) {
    return (
      <View style={[styles.frame, rounded && styles.rounded, style]}>
        <Image
          source={{ uri }}
          style={styles.image}
          accessibilityLabel={label ?? 'Artwork'}
        />
      </View>
    );
  }

  return (
    <View style={[styles.frame, styles.fallback, rounded && styles.rounded, style]}>
      <Text style={styles.monogram}>{letter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    overflow: 'hidden',
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rounded: {
    borderRadius: 999,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  monogram: {
    fontFamily: fonts.sansBold,
    fontSize: 16,
    color: colors.textDim,
  },
});
