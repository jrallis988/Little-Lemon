import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { SEED_ALBUMS, getAlbumById as getSeedAlbum } from '@/data/seed';
import type { Album, AlbumId } from '@/types/models';

type CatalogContextValue = {
  albums: Album[];
  getAlbum: (id: AlbumId) => Album | undefined;
  upsertAlbum: (album: Album) => void;
  upsertAlbums: (albums: Album[]) => void;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [extras, setExtras] = useState<Album[]>([]);

  const albums = useMemo(() => {
    const byId = new Map<string, Album>();
    for (const album of SEED_ALBUMS) byId.set(album.id, album);
    for (const album of extras) byId.set(album.id, album);
    return Array.from(byId.values());
  }, [extras]);

  const getAlbum = useCallback(
    (id: AlbumId) => {
      return extras.find((a) => a.id === id) ?? getSeedAlbum(id);
    },
    [extras],
  );

  const upsertAlbum = useCallback((album: Album) => {
    setExtras((prev) => {
      const idx = prev.findIndex((a) => a.id === album.id);
      if (idx === -1) return [album, ...prev];
      const next = [...prev];
      next[idx] = album;
      return next;
    });
  }, []);

  const upsertAlbums = useCallback((items: Album[]) => {
    setExtras((prev) => {
      const byId = new Map(prev.map((a) => [a.id, a]));
      for (const album of items) byId.set(album.id, album);
      return Array.from(byId.values());
    });
  }, []);

  const value = useMemo(
    () => ({ albums, getAlbum, upsertAlbum, upsertAlbums }),
    [albums, getAlbum, upsertAlbum, upsertAlbums],
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
