import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { SCREEN_BY_ID, type ScreenId } from './screens';

type DeviceSettings = {
  wlanProtocol: 'NONE' | 'WEP' | 'EAP-TLS' | 'PEAP';
  wirelessIp: string;
  subnetMask: string;
  gateway: string;
  wpaUsername: string;
  wpaPassword: string;
  offsetX: number;
  offsetY: number;
  darkness: number;
  printStatus: 'idle' | 'printing' | 'paused' | 'error';
  jobProgress: number;
  jobLabel: string;
  jobTotal: number;
  jobDone: number;
};

type NavigationContextValue = {
  screenId: ScreenId;
  history: ScreenId[];
  settings: DeviceSettings;
  goTo: (id: ScreenId) => void;
  goBack: () => void;
  goHome: () => void;
  canGoBack: boolean;
  updateSettings: (patch: Partial<DeviceSettings>) => void;
  title: string;
};

const DEFAULT_SETTINGS: DeviceSettings = {
  wlanProtocol: 'PEAP',
  wirelessIp: '10.42.18.64',
  subnetMask: '255.255.255.0',
  gateway: '10.42.18.1',
  wpaUsername: 'ops.floor4',
  wpaPassword: '',
  offsetX: 0,
  offsetY: -2,
  darkness: 18,
  printStatus: 'idle',
  jobProgress: 0,
  jobLabel: 'SHIP-LABEL-4x6',
  jobTotal: 120,
  jobDone: 0,
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [screenId, setScreenId] = useState<ScreenId>('home');
  const [history, setHistory] = useState<ScreenId[]>([]);
  const [settings, setSettings] = useState<DeviceSettings>(DEFAULT_SETTINGS);

  const goTo = useCallback((id: ScreenId) => {
    setScreenId((current) => {
      if (current === id) return current;
      setHistory((h) => [...h, current]);
      return id;
    });
  }, []);

  const goBack = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) {
        setScreenId('home');
        return h;
      }
      const next = [...h];
      const prev = next.pop()!;
      setScreenId(prev);
      return next;
    });
  }, []);

  const goHome = useCallback(() => {
    setHistory([]);
    setScreenId('home');
  }, []);

  const updateSettings = useCallback((patch: Partial<DeviceSettings>) => {
    setSettings((s) => ({ ...s, ...patch }));
  }, []);

  const value = useMemo<NavigationContextValue>(
    () => ({
      screenId,
      history,
      settings,
      goTo,
      goBack,
      goHome,
      canGoBack: history.length > 0 || screenId !== 'home',
      updateSettings,
      title: SCREEN_BY_ID[screenId].title,
    }),
    [screenId, history, settings, goTo, goBack, goHome, updateSettings],
  );

  return (
    <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
