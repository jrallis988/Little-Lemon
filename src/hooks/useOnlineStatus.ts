import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Network from 'expo-network';

export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    let mounted = true;

    const refresh = async () => {
      try {
        if (Platform.OS === 'web' && typeof navigator !== 'undefined') {
          if (mounted) setOnline(navigator.onLine);
          return;
        }
        const state = await Network.getNetworkStateAsync();
        if (mounted) setOnline(Boolean(state.isConnected && state.isInternetReachable !== false));
      } catch {
        if (mounted) setOnline(true);
      }
    };

    refresh();

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const on = () => setOnline(true);
      const off = () => setOnline(false);
      window.addEventListener('online', on);
      window.addEventListener('offline', off);
      return () => {
        mounted = false;
        window.removeEventListener('online', on);
        window.removeEventListener('offline', off);
      };
    }

    const id = setInterval(refresh, 8000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return online;
}
