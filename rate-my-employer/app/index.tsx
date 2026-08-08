import { Redirect } from 'expo-router';

/** Default entry → Explore tab */
export default function Index() {
  return <Redirect href="/(tabs)/explore" />;
}
