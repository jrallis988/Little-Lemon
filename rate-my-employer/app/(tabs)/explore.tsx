import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CompanyCard } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function ExploreScreen() {
  const router = useRouter();
  const { ready, companies, getCompanyReviews, user } = useApp();

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.ink} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={companies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.hero}>
            <Text style={styles.brand}>Rate My Employer</Text>
            <Text style={styles.tagline}>
              Crowdsourced workplace ratings — know the culture before you accept.
            </Text>
            <Pressable
              style={styles.cta}
              onPress={() => router.push(user ? '/(tabs)/profile' : '/auth')}
            >
              <Text style={styles.ctaText}>
                {user ? `Hi, ${user.displayName}` : 'Sign in to contribute'}
              </Text>
            </Pressable>
            <Text style={styles.sectionLabel}>Featured employers</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(Math.min(index, 6) * 40).springify()}>
            <CompanyCard company={item} reviews={getCompanyReviews(item.id)} />
          </Animated.View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl },
  hero: { marginBottom: spacing.lg, gap: spacing.md },
  brand: {
    fontFamily: typography.display,
    fontSize: 36,
    lineHeight: 40,
    color: colors.ink,
  },
  tagline: {
    fontFamily: typography.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.inkMuted,
    maxWidth: 340,
  },
  cta: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: radii.sm,
  },
  ctaText: {
    fontFamily: typography.bodyBold,
    fontSize: 14,
    color: colors.ink,
  },
  sectionLabel: {
    marginTop: spacing.sm,
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
});
