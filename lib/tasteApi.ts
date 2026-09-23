import type {
  ActivityItem,
  ActivityKind,
  DiaryEntry,
  RatingValue,
  Review,
  TasteList,
} from '@/types/models';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export class TasteApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TasteApiError';
  }
}

export type FollowTargetKind = 'artist' | 'listener';

export type TasteSnapshot = {
  loggedIds: Record<string, true>;
  ratings: Record<string, RatingValue>;
  downloadedIds: Record<string, true>;
  repostedIds: Record<string, true>;
  followingIds: Record<string, FollowTargetKind>;
};

function requireConfigured() {
  if (!isSupabaseConfigured) {
    throw new TasteApiError(
      'Supabase is not configured. Add env keys and run Phase 2 + Phase 3 migrations.',
    );
  }
}

async function requireUserId(): Promise<string> {
  requireConfigured();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new TasteApiError(error.message);
  const id = data.session?.user?.id;
  if (!id) throw new TasteApiError('Sign in to save taste actions.');
  return id;
}

function asRating(value: unknown): RatingValue | null {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) return null;
  const allowed: RatingValue[] = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  return allowed.includes(n as RatingValue) ? (n as RatingValue) : null;
}

export async function fetchMyTasteSnapshot(): Promise<TasteSnapshot> {
  const empty: TasteSnapshot = {
    loggedIds: {},
    ratings: {},
    downloadedIds: {},
    repostedIds: {},
    followingIds: {},
  };
  if (!isSupabaseConfigured) return empty;

  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData.session?.user?.id;
  if (!userId) return empty;

  const [logs, downloads, reposts, follows] = await Promise.all([
    supabase.from('taste_logs').select('track_id, rating').eq('user_id', userId),
    supabase.from('track_downloads').select('track_id').eq('user_id', userId),
    supabase.from('track_reposts').select('track_id').eq('user_id', userId),
    supabase
      .from('follows')
      .select('target_id, target_kind')
      .eq('follower_id', userId),
  ]);

  if (logs.error) throw new TasteApiError(logs.error.message);
  if (downloads.error) throw new TasteApiError(downloads.error.message);
  if (reposts.error) throw new TasteApiError(reposts.error.message);
  if (follows.error) throw new TasteApiError(follows.error.message);

  const loggedIds: Record<string, true> = {};
  const ratings: Record<string, RatingValue> = {};
  for (const row of logs.data ?? []) {
    loggedIds[row.track_id] = true;
    const rating = asRating(row.rating);
    if (rating) ratings[row.track_id] = rating;
  }

  const downloadedIds: Record<string, true> = {};
  for (const row of downloads.data ?? []) downloadedIds[row.track_id] = true;

  const repostedIds: Record<string, true> = {};
  for (const row of reposts.data ?? []) repostedIds[row.track_id] = true;

  const followingIds: Record<string, FollowTargetKind> = {};
  for (const row of follows.data ?? []) {
    followingIds[row.target_id] = row.target_kind as FollowTargetKind;
  }

  return { loggedIds, ratings, downloadedIds, repostedIds, followingIds };
}

export async function upsertLog(trackId: string, rating?: RatingValue | null) {
  const userId = await requireUserId();
  const payload: Record<string, unknown> = {
    user_id: userId,
    track_id: trackId,
    logged_on: new Date().toISOString().slice(0, 10),
  };
  if (rating !== undefined) payload.rating = rating;

  const { error } = await supabase.from('taste_logs').upsert(payload, {
    onConflict: 'user_id,track_id',
  });
  if (error) throw new TasteApiError(error.message);
}

export async function deleteLog(trackId: string) {
  const userId = await requireUserId();
  const { error } = await supabase
    .from('taste_logs')
    .delete()
    .eq('user_id', userId)
    .eq('track_id', trackId);
  if (error) throw new TasteApiError(error.message);
}

export async function upsertReview(input: {
  trackId: string;
  rating: RatingValue;
  body: string;
}): Promise<Review> {
  const userId = await requireUserId();
  const body = input.body.trim();
  if (!body) throw new TasteApiError('Review text is required.');

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', userId)
    .maybeSingle();

  const { data, error } = await supabase
    .from('taste_reviews')
    .upsert(
      {
        user_id: userId,
        track_id: input.trackId,
        rating: input.rating,
        body,
      },
      { onConflict: 'user_id,track_id' },
    )
    .select('*')
    .single();

  if (error || !data) throw new TasteApiError(error?.message ?? 'Review failed.');

  // Keep diary in sync with the review rating.
  await upsertLog(input.trackId, input.rating);

  return {
    id: data.id,
    userId: data.user_id,
    displayName: profile?.display_name ?? 'Member',
    trackId: data.track_id,
    rating: asRating(data.rating) ?? input.rating,
    body: data.body,
    createdAt: data.created_at,
    likeCount: data.like_count ?? 0,
  };
}

export async function fetchReviewsForTrack(trackId: string): Promise<Review[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('taste_reviews')
    .select('id, user_id, track_id, rating, body, like_count, created_at')
    .eq('track_id', trackId)
    .order('created_at', { ascending: false });
  if (error) throw new TasteApiError(error.message);
  if (!data?.length) return [];

  const userIds = [...new Set(data.map((r) => r.user_id))];
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, display_name')
    .in('id', userIds);
  const names = new Map((profiles ?? []).map((p) => [p.id, p.display_name]));

  return data.map((row) => ({
    id: row.id,
    userId: row.user_id,
    displayName: names.get(row.user_id) ?? 'Member',
    trackId: row.track_id,
    rating: asRating(row.rating) ?? 3,
    body: row.body,
    createdAt: row.created_at,
    likeCount: row.like_count ?? 0,
  }));
}

export async function createList(input: {
  title: string;
  description?: string;
  ranked?: boolean;
  trackIds?: string[];
}): Promise<TasteList> {
  const userId = await requireUserId();
  const title = input.title.trim();
  if (!title) throw new TasteApiError('List title is required.');

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', userId)
    .maybeSingle();

  const { data: list, error } = await supabase
    .from('taste_lists')
    .insert({
      user_id: userId,
      title,
      description: input.description?.trim() ?? '',
      ranked: Boolean(input.ranked),
    })
    .select('*')
    .single();
  if (error || !list) throw new TasteApiError(error?.message ?? 'List create failed.');

  const trackIds = input.trackIds ?? [];
  if (trackIds.length) {
    const items = trackIds.map((trackId, index) => ({
      list_id: list.id,
      track_id: trackId,
      position: index,
    }));
    const { error: itemsError } = await supabase.from('taste_list_items').insert(items);
    if (itemsError) throw new TasteApiError(itemsError.message);
  }

  return {
    id: list.id,
    userId: list.user_id,
    displayName: profile?.display_name ?? 'Member',
    title: list.title,
    description: list.description ?? '',
    trackIds,
    createdAt: list.created_at,
    ranked: list.ranked,
  };
}

export async function fetchListsForUser(userId: string): Promise<TasteList[]> {
  if (!isSupabaseConfigured) return [];
  const { data: lists, error } = await supabase
    .from('taste_lists')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw new TasteApiError(error.message);
  if (!lists?.length) return [];

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', userId)
    .maybeSingle();

  const listIds = lists.map((l) => l.id);
  const { data: items } = await supabase
    .from('taste_list_items')
    .select('list_id, track_id, position')
    .in('list_id', listIds)
    .order('position', { ascending: true });

  const byList = new Map<string, string[]>();
  for (const item of items ?? []) {
    const arr = byList.get(item.list_id) ?? [];
    arr.push(item.track_id);
    byList.set(item.list_id, arr);
  }

  return lists.map((list) => ({
    id: list.id,
    userId: list.user_id,
    displayName: profile?.display_name ?? 'Member',
    title: list.title,
    description: list.description ?? '',
    trackIds: byList.get(list.id) ?? [],
    createdAt: list.created_at,
    ranked: list.ranked,
  }));
}

export async function fetchDiaryForUser(userId: string): Promise<DiaryEntry[]> {
  if (!isSupabaseConfigured) return [];
  const { data: logs, error } = await supabase
    .from('taste_logs')
    .select('*')
    .eq('user_id', userId)
    .order('logged_on', { ascending: false });
  if (error) throw new TasteApiError(error.message);

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', userId)
    .maybeSingle();

  return (logs ?? []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    displayName: profile?.display_name ?? 'Member',
    trackId: row.track_id,
    loggedOn: row.logged_on,
    rating: asRating(row.rating),
    note: row.note,
  }));
}

export async function followTarget(
  targetId: string,
  targetKind: FollowTargetKind,
) {
  const userId = await requireUserId();
  const { error } = await supabase.from('follows').upsert({
    follower_id: userId,
    target_id: targetId,
    target_kind: targetKind,
  });
  if (error) throw new TasteApiError(error.message);
}

export async function unfollowTarget(targetId: string) {
  const userId = await requireUserId();
  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', userId)
    .eq('target_id', targetId);
  if (error) throw new TasteApiError(error.message);
}

export async function recordDownload(trackId: string) {
  const userId = await requireUserId();
  const { error } = await supabase.from('track_downloads').upsert({
    user_id: userId,
    track_id: trackId,
  });
  if (error) throw new TasteApiError(error.message);
}

export async function recordRepost(trackId: string) {
  const userId = await requireUserId();
  const { error } = await supabase.from('track_reposts').upsert({
    user_id: userId,
    track_id: trackId,
  });
  if (error) throw new TasteApiError(error.message);
}

export async function removeRepost(trackId: string) {
  const userId = await requireUserId();
  const { error } = await supabase
    .from('track_reposts')
    .delete()
    .eq('user_id', userId)
    .eq('track_id', trackId);
  if (error) throw new TasteApiError(error.message);
}

type ActivityRow = {
  kind: ActivityKind;
  id: string;
  userId: string;
  displayName: string;
  trackId: string;
  createdAt: string;
  rating?: RatingValue | null;
  excerpt?: string | null;
  listTitle?: string | null;
};

export async function fetchFollowingActivity(
  limit = 40,
): Promise<ActivityItem[]> {
  if (!isSupabaseConfigured) return [];
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData.session?.user?.id;
  if (!userId) return [];

  const { data: follows, error: followsError } = await supabase
    .from('follows')
    .select('target_id, target_kind')
    .eq('follower_id', userId);
  if (followsError) throw new TasteApiError(followsError.message);

  const peopleIds = (follows ?? [])
    .filter((f) => f.target_kind === 'listener' || f.target_kind === 'artist')
    .map((f) => f.target_id)
    .filter((id) => /^[0-9a-f-]{36}$/i.test(id));

  if (!peopleIds.length) return [];

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, display_name')
    .in('id', peopleIds);
  const names = new Map((profiles ?? []).map((p) => [p.id, p.display_name]));

  const [logs, reviews, lists, downloads, reposts] = await Promise.all([
    supabase
      .from('taste_logs')
      .select('id, user_id, track_id, rating, created_at')
      .in('user_id', peopleIds)
      .order('created_at', { ascending: false })
      .limit(limit),
    supabase
      .from('taste_reviews')
      .select('id, user_id, track_id, rating, body, created_at')
      .in('user_id', peopleIds)
      .order('created_at', { ascending: false })
      .limit(limit),
    supabase
      .from('taste_lists')
      .select('id, user_id, title, created_at, updated_at')
      .in('user_id', peopleIds)
      .order('updated_at', { ascending: false })
      .limit(limit),
    supabase
      .from('track_downloads')
      .select('user_id, track_id, created_at')
      .in('user_id', peopleIds)
      .order('created_at', { ascending: false })
      .limit(limit),
    supabase
      .from('track_reposts')
      .select('user_id, track_id, created_at')
      .in('user_id', peopleIds)
      .order('created_at', { ascending: false })
      .limit(limit),
  ]);

  const rows: ActivityRow[] = [];

  for (const row of logs.data ?? []) {
    rows.push({
      kind: 'logged',
      id: `log-${row.id}`,
      userId: row.user_id,
      displayName: names.get(row.user_id) ?? 'Member',
      trackId: row.track_id,
      createdAt: row.created_at,
      rating: asRating(row.rating),
    });
  }
  for (const row of reviews.data ?? []) {
    rows.push({
      kind: 'reviewed',
      id: `review-${row.id}`,
      userId: row.user_id,
      displayName: names.get(row.user_id) ?? 'Member',
      trackId: row.track_id,
      createdAt: row.created_at,
      rating: asRating(row.rating),
      excerpt: row.body,
    });
  }
  for (const row of lists.data ?? []) {
    rows.push({
      kind: 'listed',
      id: `list-${row.id}`,
      userId: row.user_id,
      displayName: names.get(row.user_id) ?? 'Member',
      trackId: '',
      createdAt: row.updated_at ?? row.created_at,
      listTitle: row.title,
    });
  }
  for (const row of downloads.data ?? []) {
    rows.push({
      kind: 'downloaded',
      id: `dl-${row.user_id}-${row.track_id}-${row.created_at}`,
      userId: row.user_id,
      displayName: names.get(row.user_id) ?? 'Member',
      trackId: row.track_id,
      createdAt: row.created_at,
    });
  }
  for (const row of reposts.data ?? []) {
    rows.push({
      kind: 'reposted',
      id: `rp-${row.user_id}-${row.track_id}-${row.created_at}`,
      userId: row.user_id,
      displayName: names.get(row.user_id) ?? 'Member',
      trackId: row.track_id,
      createdAt: row.created_at,
    });
  }

  return rows
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit)
    .map((row) => ({
      id: row.id,
      kind: row.kind,
      userId: row.userId,
      displayName: row.displayName,
      trackId: row.trackId,
      createdAt: row.createdAt,
      rating: row.rating,
      excerpt: row.excerpt,
      listTitle: row.listTitle,
    }));
}

export async function countSignalsForTrack(trackId: string): Promise<{
  downloads: number;
  reposts: number;
}> {
  if (!isSupabaseConfigured) {
    return { downloads: 0, reposts: 0 };
  }
  const [d, r] = await Promise.all([
    supabase
      .from('track_downloads')
      .select('*', { count: 'exact', head: true })
      .eq('track_id', trackId),
    supabase
      .from('track_reposts')
      .select('*', { count: 'exact', head: true })
      .eq('track_id', trackId),
  ]);
  return {
    downloads: d.count ?? 0,
    reposts: r.count ?? 0,
  };
}
