import { useEffect, useState } from 'react';

export type AssetState = 'loading' | 'ready' | 'missing';

/** Probe whether a static export file exists (image or other asset via fetch). */
export function useExportAsset(url: string | null | undefined): AssetState {
  const [state, setState] = useState<AssetState>(url ? 'loading' : 'missing');

  useEffect(() => {
    if (!url) {
      setState('missing');
      return;
    }

    let cancelled = false;
    setState('loading');

    const isImage = /\.(png|jpe?g|webp|gif|svg)$/i.test(url);

    if (isImage) {
      const img = new Image();
      img.onload = () => {
        if (!cancelled) setState('ready');
      };
      img.onerror = () => {
        if (!cancelled) setState('missing');
      };
      img.src = url;
    } else {
      fetch(url, { method: 'HEAD' })
        .then((res) => {
          if (!cancelled) setState(res.ok ? 'ready' : 'missing');
        })
        .catch(() => {
          if (!cancelled) setState('missing');
        });
    }

    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}

export function useExportMap(urls: Record<string, string>): Record<string, AssetState> {
  const [map, setMap] = useState<Record<string, AssetState>>(() =>
    Object.fromEntries(Object.keys(urls).map((k) => [k, 'loading' as AssetState])),
  );

  useEffect(() => {
    let cancelled = false;
    const entries = Object.entries(urls);

    Promise.all(
      entries.map(
        ([key, url]) =>
          new Promise<[string, AssetState]>((resolve) => {
            if (/\.(png|jpe?g|webp|gif|svg)$/i.test(url)) {
              const img = new Image();
              img.onload = () => resolve([key, 'ready']);
              img.onerror = () => resolve([key, 'missing']);
              img.src = url;
            } else {
              fetch(url, { method: 'HEAD' })
                .then((res) => resolve([key, res.ok ? 'ready' : 'missing']))
                .catch(() => resolve([key, 'missing']));
            }
          }),
      ),
    ).then((results) => {
      if (!cancelled) setMap(Object.fromEntries(results));
    });

    return () => {
      cancelled = true;
    };
  }, [urls]);

  return map;
}
