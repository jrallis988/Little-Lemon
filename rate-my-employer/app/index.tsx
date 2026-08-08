import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { useApp } from '../src/context/AppContext';
import { colors } from '../src/theme';

/** Boot router: splash → onboarding → tabs */
export default function Index() {
  const { ready, hasOnboarded, user, isGuest } = useApp();

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.ink }}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (!hasOnboarded) {
    return <Redirect href="/splash" />;
  }

  if (!user && !isGuest) {
    return <Redirect href="/auth" />;
  }

  return <Redirect href="/(tabs)/explore" />;
}
