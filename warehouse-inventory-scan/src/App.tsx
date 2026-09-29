import { DeviceShell } from './components/DeviceShell';
import { NavigationProvider, useNavigation } from './navigation/NavigationContext';
import { SCREEN_COMPONENTS } from './screens';

function ScreenRouter() {
  const { screenId } = useNavigation();
  const Screen = SCREEN_COMPONENTS[screenId];
  return (
    <DeviceShell>
      <Screen />
    </DeviceShell>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <ScreenRouter />
    </NavigationProvider>
  );
}
