import type { ProfileRow } from '@/lib/dbTypes';
import {
  brandNewArtists,
  EVERYBODY_LISTENING,
  FEATURE_TILES,
  FEATURED_SPOTLIGHT,
  getTrackById,
  RECENTLY_FEATURED,
} from '@/lib/demoData';
import { profileRowToUser } from '@/lib/catalogQuery';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type { Track, UserProfile } from '@/types/models';

export type EditorialSlotName =
  | 'featured_hero'
  | 'mosaic'
  | 'recently_featured'
  | 'just_found'
  | 'everybody_listening';

export type EditorialSlot = {
  id: string;
  slot: EditorialSlotName;
  targetKind: 'artist' | 'track';
  targetId: string;
  title: string | null;
  subtitle: string | null;
  blurb: string | null;
  sortOrder: number;
};

export type HomeEditorial = {
  justFound: UserProfile[];
  everybodyListeningIds: string[];
  recentlyFeaturedIds: string[];
  source: 'editorial' | 'demo';
};

function mapSlot(row: {
  id: string;
  slot: string;
  target_kind: string;
  target_id: string;
  title: string | null;
  subtitle: string | null;
  blurb: string | null;
  sort_order: number;
}): EditorialSlot {
  return {
    id: row.id,
    slot: row.slot as EditorialSlotName,
    targetKind: row.target_kind as 'artist' | 'track',
    targetId: row.target_id,
    title: row.title,
    subtitle: row.subtitle,
    blurb: row.blurb,
    sortOrder: row.sort_order,
  };
}

export async function fetchEditorialSlots(
  slot?: EditorialSlotName,
): Promise<EditorialSlot[]> {
  if (!isSupabaseConfigured) return [];
  try {
    let req = supabase
      .from('editorial_slots')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });
    if (slot) req = req.eq('slot', slot);
    const { data, error } = await req;
    if (error || !data) return [];
    return data.map(mapSlot);
  } catch {
    return [];
  }
}

export async function fetchHomeEditorial(): Promise<HomeEditorial> {
  const slots = await fetchEditorialSlots();
  if (!slots.length) {
    return {
      justFound: brandNewArtists(4),
      everybodyListeningIds: [...EVERYBODY_LISTENING],
      recentlyFeaturedIds: [...RECENTLY_FEATURED],
      source: 'demo',
    };
  }

  const justFoundIds = slots
    .filter((s) => s.slot === 'just_found' && s.targetKind === 'artist')
    .map((s) => s.targetId);

  let justFound: UserProfile[] = [];
  if (justFoundIds.length && isSupabaseConfigured) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .in('id', justFoundIds)
      .is('disabled_at', null);
    justFound = ((data as ProfileRow[]) ?? []).map(profileRowToUser);
  }
  if (!justFound.length) {
    // Resolve demo seed artist ids from slot target ids when possible
    justFound = brandNewArtists(4);
  }

  return {
    justFound,
    everybodyListeningIds: slots
      .filter((s) => s.slot === 'everybody_listening' && s.targetKind === 'track')
      .map((s) => s.targetId)
      .concat(EVERYBODY_LISTENING)
      .filter((id, i, arr) => arr.indexOf(id) === i)
      .slice(0, 8),
    recentlyFeaturedIds: slots
      .filter((s) => s.slot === 'recently_featured' && s.targetKind === 'track')
      .map((s) => s.targetId)
      .concat(RECENTLY_FEATURED)
      .filter((id, i, arr) => arr.indexOf(id) === i)
      .slice(0, 8),
    source: 'editorial',
  };
}

export async function upsertEditorialSlot(input: {
  slot: EditorialSlotName;
  targetKind: 'artist' | 'track';
  targetId: string;
  title?: string;
  subtitle?: string;
  blurb?: string;
  sortOrder?: number;
}): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.');
  }
  const { data: session } = await supabase.auth.getSession();
  const userId = session.session?.user?.id;
  if (!userId) throw new Error('Sign in as an editor.');

  const { error } = await supabase.from('editorial_slots').insert({
    slot: input.slot,
    target_kind: input.targetKind,
    target_id: input.targetId,
    title: input.title ?? null,
    subtitle: input.subtitle ?? null,
    blurb: input.blurb ?? null,
    sort_order: input.sortOrder ?? 0,
    published: true,
    created_by: userId,
  });
  if (error) throw new Error(error.message);
}

export function demoFeaturedFallback(): {
  spotlightTrackId: string;
  mosaicCount: number;
} {
  return {
    spotlightTrackId: FEATURED_SPOTLIGHT.trackId,
    mosaicCount: FEATURE_TILES.length,
  };
}

export function resolveTrackIds(ids: string[]): Track[] {
  return ids
    .map((id) => getTrackById(id))
    .filter((t): t is Track => t != null);
}
