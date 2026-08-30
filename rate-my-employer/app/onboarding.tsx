import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '../src/components';
import { useApp } from '../src/context/AppContext';
import { ONBOARDING_SLIDES } from '../src/data/seed';
import { colors, radii, spacing, typography } from '../src/theme';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useApp();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const finish = async () => {
    await completeOnboarding();
    router.replace('/auth');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.top}>
        <Text style={styles.brand}>RME</Text>
        <PrimaryButton label="Skip" variant="ghost" onPress={finish} style={styles.skip} />
      </View>

      <FlatList
        ref={listRef}
        data={ONBOARDING_SLIDES}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.iconWrap}>
              <Ionicons name={item.icon} size={36} color={colors.blue} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />

      <View style={styles.dots}>
        {ONBOARDING_SLIDES.map((slide, i) => (
          <View key={slide.key} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.footer}>
        {index < ONBOARDING_SLIDES.length - 1 ? (
          <PrimaryButton
            label="Next"
            onPress={() => listRef.current?.scrollToIndex({ index: index + 1, animated: true })}
          />
        ) : (
          <PrimaryButton label="Get Started" onPress={finish} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  top: {
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontFamily: typography.bodyBold,
    fontSize: 18,
    color: colors.navy,
  },
  skip: { paddingVertical: 8, paddingHorizontal: 12 },
  slide: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    gap: spacing.md,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: radii.lg,
    backgroundColor: colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: typography.display,
    fontSize: 30,
    color: colors.ink,
  },
  body: {
    fontFamily: typography.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.inkMuted,
    maxWidth: 320,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: spacing.md,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.blue, width: 22 },
  footer: { padding: spacing.lg },
});
