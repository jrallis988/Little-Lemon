import { Redirect } from 'expo-router';
import { View } from 'react-native';
import { LoadingState } from '../src/design-system';
import { useBioCross } from '../src/state/BioCrossContext';

export default function Index() {
  const { ready, onboarded } = useBioCross();

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <LoadingState message="Starting BioCross…" />
      </View>
    );
  }

  if (!onboarded) {
    return <Redirect href="/onboarding/welcome" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
