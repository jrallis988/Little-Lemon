import { Redirect, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { LoadingState } from '../src/design-system';
import { useBioCross } from '../src/state/BioCrossContext';

/**
 * Demo entry that marks onboarding complete then opens Home.
 * Useful for web previews and QA without walking the full onboarding path.
 */
export default function DemoHomeEntry() {
  const { completeOnboarding, onboarded, ready } = useBioCross();
  const [done, setDone] = useState(false);
  const params = useLocalSearchParams();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!ready) return;
      if (!onboarded) {
        await completeOnboarding();
      }
      if (!cancelled) setDone(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, onboarded, completeOnboarding, params]);

  if (!ready || !done) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <LoadingState message="Opening BioCross…" />
      </View>
    );
  }

  return <Redirect href="/(tabs)/home" />;
}
