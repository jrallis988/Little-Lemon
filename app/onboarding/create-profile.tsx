import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  AppHeader,
  BioCrossButton,
  HealthCard,
  InfoCallout,
  ProgressSegments,
  ScreenTitle,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { useBioCross } from '../../src/state/BioCrossContext';

export default function CreateProfileScreen() {
  const router = useRouter();
  const { user, updateUser } = useBioCross();
  const [fullName, setFullName] = useState(user?.fullName ?? 'James Rallis');
  const [dob, setDob] = useState('Apr 17, 1991');
  const [sex, setSex] = useState<'male' | 'female' | 'prefer_not_to_say'>(user?.biologicalSex ?? 'male');
  const [country, setCountry] = useState(user?.country ?? 'United States');
  const [showInfoCue, setShowInfoCue] = useState(true);
  const cueAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // First-time contextual cue pointing to the info control — animate once, then stop.
    Animated.sequence([
      Animated.timing(cueAnim, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.delay(1600),
      Animated.timing(cueAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start(() => setShowInfoCue(false));
  }, [cueAnim]);

  const continueNext = async () => {
    await updateUser({
      fullName,
      biologicalSex: sex,
      country,
      dateOfBirth: '1991-04-17',
    });
    router.push('/onboarding/health-profile');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader onBack={() => router.back()} />
      <ProgressSegments total={6} current={1} label="Step 1 of 6" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ScreenTitle
          title="Create Your Health Profile"
          subtitle="We’ll use this information to check supplements against your unique medical history and provide personalized safety insights."
        />

        <FieldCard
          icon="person-outline"
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          complete
        />
        <FieldCard icon="calendar-outline" label="Date of Birth" value={dob} onChangeText={setDob} complete />

        <HealthCard style={styles.card}>
          <View style={styles.sexHeader}>
            <Text style={styles.sexLabel}>What is your biological sex?</Text>
            <View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Why BioCross asks for biological sex"
                hitSlop={8}
              >
                <Ionicons name="information-circle-outline" size={18} color={colors.brand.blue} />
              </Pressable>
              {showInfoCue ? (
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.cue,
                    {
                      opacity: cueAnim,
                      transform: [
                        {
                          translateY: cueAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [6, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Text style={styles.cueText}>Tap for why we ask</Text>
                </Animated.View>
              ) : null}
            </View>
          </View>
          <View style={styles.sexRow}>
            {(
              [
                ['male', 'Male'],
                ['female', 'Female'],
                ['prefer_not_to_say', 'Prefer not to say'],
              ] as const
            ).map(([value, label]) => (
              <Pressable
                key={value}
                onPress={() => setSex(value)}
                style={[styles.sexChip, sex === value && styles.sexChipActive]}
                accessibilityRole="radio"
                accessibilityState={{ selected: sex === value }}
              >
                <Text style={[styles.sexChipText, sex === value && styles.sexChipTextActive]}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </HealthCard>

        <FieldCard icon="location-outline" label="Country" value={country} onChangeText={setCountry} chevron />

        <HealthCard style={styles.card}>
          <View style={styles.privacyRow}>
            <View style={styles.privacyIcon}>
              <Ionicons name="shield-checkmark-outline" size={18} color={colors.brand.blue} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.privacyTitle}>Your privacy matters</Text>
              <Text style={styles.privacyBody}>
                Your data is encrypted and never sold. You’re in control of your information.
              </Text>
            </View>
            <Ionicons name="lock-closed-outline" size={22} color={colors.brand.blue} />
          </View>
        </HealthCard>

        <InfoCallout
          icon="lock-closed"
          body="We use this information to personalize your safety checks."
          tone="privacy"
        />

        <View style={styles.footer}>
          <BioCrossButton label="Continue" onPress={continueNext} />
          <Pressable onPress={() => router.push('/onboarding/health-profile')} style={styles.later}>
            <Text style={styles.laterText}>I’ll do this later</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FieldCard({
  icon,
  label,
  value,
  onChangeText,
  complete,
  chevron,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  complete?: boolean;
  chevron?: boolean;
}) {
  return (
    <HealthCard style={styles.card}>
      <View style={styles.fieldRow}>
        <View style={styles.fieldIcon}>
          <Ionicons name={icon} size={18} color={colors.brand.blue} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.fieldLabel}>{label}</Text>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            accessibilityLabel={label}
          />
        </View>
        {complete ? <Ionicons name="checkmark-circle" size={22} color={colors.semantic.low} /> : null}
        {chevron ? <Ionicons name="chevron-down" size={18} color={colors.text.tertiary} /> : null}
      </View>
    </HealthCard>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  content: { paddingBottom: spacing.xxxl, paddingHorizontal: spacing.xl, gap: spacing.sm },
  card: { marginBottom: 4 },
  fieldRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  fieldIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldLabel: { color: colors.text.secondary, fontSize: typography.size.xs, fontWeight: '600' },
  input: {
    color: colors.text.primary,
    fontSize: typography.size.md,
    fontWeight: '700',
    paddingVertical: 2,
  },
  sexHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.sm },
  sexLabel: { fontWeight: '700', color: colors.text.primary, flex: 1 },
  sexRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sexChip: {
    borderWidth: 1,
    borderColor: colors.surface.borderStrong,
    borderRadius: radii.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.surface.card,
  },
  sexChipActive: {
    borderColor: colors.brand.blue,
    backgroundColor: colors.brand.blueLight,
  },
  sexChipText: { color: colors.text.primary, fontWeight: '600', fontSize: 13 },
  sexChipTextActive: { color: colors.brand.blue },
  cue: {
    position: 'absolute',
    top: 22,
    right: -4,
    backgroundColor: colors.brand.navy,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    width: 120,
  },
  cueText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  privacyRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  privacyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyTitle: { fontWeight: '700', color: colors.text.primary },
  privacyBody: { color: colors.text.secondary, fontSize: typography.size.sm, marginTop: 2, lineHeight: 18 },
  footer: { marginTop: spacing.lg, gap: spacing.sm },
  later: { alignItems: 'center', minHeight: 44, justifyContent: 'center' },
  laterText: { color: colors.brand.blue, fontWeight: '700' },
});
