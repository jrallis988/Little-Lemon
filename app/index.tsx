import { Redirect } from 'expo-router';
import { View } from 'react-native';
import { LoadingState } from '../src/design-system';
import { useAuth } from '../src/state/AuthContext';
import { useBioCross } from '../src/state/BioCrossContext';

export default function Index() {
  const { authReady, isAuthenticated } = useAuth();
  const { ready, onboarded } = useBioCross();

  if (!authReady || !ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <LoadingState message="Starting BioCross…" />
      </View>
    );
  }

  // Guest demo path — onboarding without account
  if (!isAuthenticated && !onboarded) {
    return <Redirect href="/onboarding/welcome" />;
  }

  if (!isAuthenticated && onboarded) {
    return <Redirect href="/auth/sign-in" />;
  }

  if (!onboarded) {
    return <Redirect href="/onboarding/create-profile" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
