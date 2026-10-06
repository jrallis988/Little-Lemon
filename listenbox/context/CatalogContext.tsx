import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { SEED_ALBUMS, getAlbumById as getSeedAlbum } from '@/data/seed';
import { readJson, removeKey, storageKeys, writeJson } from '@/lib/storage';
import type { Album, AlbumId } from '@/types/models';

type CatalogContextValue = {
  albums: Album[];
  isReady: boolean;
  getAlbum: (id: AlbumId) => Album | undefined;
  upsertAlbum: (album: Album) => void;
  upsertAlbums: (albums: Album[]) => void;
  clearExtras: () => Promise<void>;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

function mergeExtras(prev: Album[], items: Album[]): Album[] {
  const byId = new Map(prev.map((a) => [a.id, a]));
  for (const album of items) byId.set(album.id, album);
  return Array.from(byId.values());
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [extras, setExtras] = useState<Album[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = await readJson<Album[]>(storageKeys.catalogExtras);
      if (!cancelled) {
        if (Array.isArray(stored)) setExtras(stored);
        setIsReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    void writeJson(storageKeys.catalogExtras, extras);
  }, [extras, isReady]);

  const albums = useMemo(() => {
    const byId = new Map<string, Album>();
    for (const album of SEED_ALBUMS) byId.set(album.id, album);
    for (const album of extras) byId.set(album.id, album);
    return Array.from(byId.values());
  }, [extras]);

  const getAlbum = useCallback(
    (id: AlbumId) => extras.find((a) => a.id === id) ?? getSeedAlbum(id),
    [extras],
  );

  const upsertAlbum = useCallback((album: Album) => {
    setExtras((prev) => mergeExtras(prev, [album]));
  }, []);

  const upsertAlbums = useCallback((items: Album[]) => {
    setExtras((prev) => mergeExtras(prev, items));
  }, []);

  const clearExtras = useCallback(async () => {
    setExtras([]);
    await removeKey(storageKeys.catalogExtras);
  }, []);

  const value = useMemo(
    () => ({ albums, isReady, getAlbum, upsertAlbum, upsertAlbums, clearExtras }),
    [albums, isReady, getAlbum, upsertAlbum, upsertAlbums, clearExtras],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error('useCatalog must be used within CatalogProvider');
  }
  return ctx;
}
