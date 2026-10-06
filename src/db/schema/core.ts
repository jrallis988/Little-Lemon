/**
 * Artistic Fountain — core data model
 *
 * Design rules encoded in schema:
 * - Chronological discovery only (order by created_at / starts_at)
 * - No public vanity counters (no follower_count / like_count columns exposed in API)
 * - Verification is identity/venue safety, never clout
 * - Local scene fields (city, region, geo) are first-class
 */

import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  uuid,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ---------------------------------------------------------------------------
// Better Auth core tables (persisted accounts)
// ---------------------------------------------------------------------------

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const session = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (t) => [index('session_user_id_idx').on(t.userId)],
)

export const account = pgTable(
  'account',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => [index('account_user_id_idx').on(t.userId)],
)

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// ---------------------------------------------------------------------------
// Profiles (digital green room)
// ---------------------------------------------------------------------------

export const accountRoleEnum = pgEnum('account_role', [
  'comic',
  'venue',
  'booker',
  'organizer',
])

/** Safety / role verification only — never a status flex */
export const verificationKindEnum = pgEnum('verification_kind', [
  'identity',
  'venue',
  'booker',
])

export const collaborationTagEnum = pgEnum('collaboration_tag', [
  'looking_for_spots',
  'offering_spots',
  'co_producing',
  'need_ride',
  'offering_ride',
  'open_to_collab',
  'hosting_indie_room',
])

export const profiles = pgTable(
  'profiles',
  {
    userId: text('user_id')
      .primaryKey()
      .references(() => user.id, { onDelete: 'cascade' }),
    username: text('username').notNull(),
    stageName: text('stage_name').notNull(),
    bio: text('bio').notNull().default(''),
    homeCity: text('home_city').notNull(),
    homeRegion: text('home_region').notNull(),
    homeCountry: text('home_country').notNull().default('US'),
    /** Optional scene pin for local discovery */
    latitude: real('latitude'),
    longitude: real('longitude'),
    roles: accountRoleEnum('roles').array().notNull().default(['comic']),
    collaborationTags: collaborationTagEnum('collaboration_tags')
      .array()
      .notNull()
      .default([]),
    /** Identity / venue / booker safety badge — not a blue check */
    verificationKind: verificationKindEnum('verification_kind'),
    verifiedAt: timestamp('verified_at'),
    avatarUrl: text('avatar_url'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex('profiles_username_uidx').on(t.username),
    index('profiles_home_city_idx').on(t.homeCity),
    index('profiles_home_region_idx').on(t.homeRegion),
  ],
)

/**
 * Mutual / directional follows for networking.
 * Counts are intentionally omitted from public reads.
 */
export const connections = pgTable(
  'connections',
  {
    followerId: text('follower_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    followingId: text('following_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.followerId, t.followingId] }),
    index('connections_following_idx').on(t.followingId),
  ],
)

// ---------------------------------------------------------------------------
// Posts / clips / premises / flyers / lab memos
// ---------------------------------------------------------------------------

export const postKindEnum = pgEnum('post_kind', [
  'clip',
  'premise',
  'flyer',
  'lab_memo',
])

export const mediaKindEnum = pgEnum('media_kind', [
  'none',
  'video',
  'audio',
  'image',
])

export const visibilityEnum = pgEnum('visibility', [
  'public',
  'scene',
  'connections',
  'lab',
])

export const posts = pgTable(
  'posts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    authorId: text('author_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    kind: postKindEnum('kind').notNull(),
    title: text('title'),
    body: text('body').notNull().default(''),
    mediaKind: mediaKindEnum('media_kind').notNull().default('none'),
    mediaUrl: text('media_url'),
    mediaDurationMs: integer('media_duration_ms'),
    posterUrl: text('poster_url'),
    /** Scene context for localized chronological discovery */
    city: text('city'),
    region: text('region'),
    latitude: real('latitude'),
    longitude: real('longitude'),
    visibility: visibilityEnum('visibility').notNull().default('public'),
    /** Optional link to a show/mic flyer */
    eventId: uuid('event_id'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => [
    /** Chronological feed — the only ranking key */
    index('posts_created_at_idx').on(t.createdAt),
    index('posts_author_created_idx').on(t.authorId, t.createdAt),
    index('posts_city_created_idx').on(t.city, t.createdAt),
    index('posts_region_created_idx').on(t.region, t.createdAt),
    index('posts_kind_created_idx').on(t.kind, t.createdAt),
  ],
)

/** Craft feedback for Material Lab — not vanity likes */
export const labNotes = pgTable(
  'lab_notes',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    authorId: text('author_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    body: text('body').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    index('lab_notes_post_created_idx').on(t.postId, t.createdAt),
  ],
)

// ---------------------------------------------------------------------------
// Venues, shows, open mics
// ---------------------------------------------------------------------------

export const eventKindEnum = pgEnum('event_kind', [
  'open_mic',
  'showcase',
  'indie_room',
  'headliner',
  'workshop',
])

export const venues = pgTable(
  'venues',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    city: text('city').notNull(),
    region: text('region').notNull(),
    neighborhood: text('neighborhood'),
    address: text('address'),
    latitude: real('latitude'),
    longitude: real('longitude'),
    vibeNotes: text('vibe_notes').notNull().default(''),
    /** Owned / claimed by a venue or booker account when verified */
    claimedByUserId: text('claimed_by_user_id').references(() => user.id, {
      onDelete: 'set null',
    }),
    isVerifiedVenue: boolean('is_verified_venue').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => [
    index('venues_city_idx').on(t.city),
    index('venues_region_idx').on(t.region),
  ],
)

export const events = pgTable(
  'events',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    venueId: uuid('venue_id').references(() => venues.id, {
      onDelete: 'set null',
    }),
    hostId: text('host_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    kind: eventKindEnum('kind').notNull(),
    title: text('title').notNull(),
    description: text('description').notNull().default(''),
    startsAt: timestamp('starts_at').notNull(),
    endsAt: timestamp('ends_at'),
    city: text('city').notNull(),
    region: text('region').notNull(),
    neighborhood: text('neighborhood'),
    address: text('address'),
    latitude: real('latitude'),
    longitude: real('longitude'),
    signupInfo: text('signup_info'),
    slotsTotal: integer('slots_total'),
    slotsOpen: integer('slots_open'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => [
    index('events_starts_at_idx').on(t.startsAt),
    index('events_city_starts_idx').on(t.city, t.startsAt),
    index('events_region_starts_idx').on(t.region, t.startsAt),
    index('events_kind_starts_idx').on(t.kind, t.startsAt),
  ],
)

export const eventSignups = pgTable(
  'event_signups',
  {
    eventId: uuid('event_id')
      .notNull()
      .references(() => events.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    note: text('note'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.eventId, t.userId] }),
    index('event_signups_user_idx').on(t.userId),
  ],
)

// ---------------------------------------------------------------------------
// Communities — regional Green Rooms + logistics spaces
// ---------------------------------------------------------------------------

export const communityKindEnum = pgEnum('community_kind', [
  'regional_green_room',
  'indie_room_crew',
  'lab_circle',
])

export const communities = pgTable(
  'communities',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull(),
    name: text('name').notNull(),
    kind: communityKindEnum('kind').notNull(),
    city: text('city'),
    region: text('region'),
    description: text('description').notNull().default(''),
    createdById: text('created_by_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex('communities_slug_uidx').on(t.slug),
    index('communities_region_idx').on(t.region),
    index('communities_city_idx').on(t.city),
  ],
)

export const communityMemberRoleEnum = pgEnum('community_member_role', [
  'member',
  'moderator',
  'host',
])

export const communityMembers = pgTable(
  'community_members',
  {
    communityId: uuid('community_id')
      .notNull()
      .references(() => communities.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    role: communityMemberRoleEnum('role').notNull().default('member'),
    joinedAt: timestamp('joined_at').notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.communityId, t.userId] }),
    index('community_members_user_idx').on(t.userId),
  ],
)

export const communityMessages = pgTable(
  'community_messages',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    communityId: uuid('community_id')
      .notNull()
      .references(() => communities.id, { onDelete: 'cascade' }),
    authorId: text('author_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    body: text('body').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    index('community_messages_room_created_idx').on(
      t.communityId,
      t.createdAt,
    ),
  ],
)

// ---------------------------------------------------------------------------
// Direct messages (logistics, spot swaps, rides)
// ---------------------------------------------------------------------------

export const conversations = pgTable('conversations', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const conversationParticipants = pgTable(
  'conversation_participants',
  {
    conversationId: uuid('conversation_id')
      .notNull()
      .references(() => conversations.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    joinedAt: timestamp('joined_at').notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.conversationId, t.userId] }),
    index('conversation_participants_user_idx').on(t.userId),
  ],
)

export const directMessages = pgTable(
  'direct_messages',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    conversationId: uuid('conversation_id')
      .notNull()
      .references(() => conversations.id, { onDelete: 'cascade' }),
    authorId: text('author_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    body: text('body').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    index('direct_messages_conversation_created_idx').on(
      t.conversationId,
      t.createdAt,
    ),
  ],
)

// ---------------------------------------------------------------------------
// Safety
// ---------------------------------------------------------------------------

export const blocks = pgTable(
  'blocks',
  {
    blockerId: text('blocker_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    blockedId: text('blocked_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.blockerId, t.blockedId] })],
)

export const reports = pgTable('reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  reporterId: text('reporter_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  targetUserId: text('target_user_id').references(() => user.id, {
    onDelete: 'set null',
  }),
  targetPostId: uuid('target_post_id').references(() => posts.id, {
    onDelete: 'set null',
  }),
  reason: text('reason').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ---------------------------------------------------------------------------
// Relations (for drizzle query API)
// ---------------------------------------------------------------------------

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(user, {
    fields: [profiles.userId],
    references: [user.id],
  }),
}))

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(user, {
    fields: [posts.authorId],
    references: [user.id],
  }),
  labNotes: many(labNotes),
}))

export const eventsRelations = relations(events, ({ one, many }) => ({
  host: one(user, {
    fields: [events.hostId],
    references: [user.id],
  }),
  venue: one(venues, {
    fields: [events.venueId],
    references: [venues.id],
  }),
  signups: many(eventSignups),
}))

export const communitiesRelations = relations(communities, ({ many }) => ({
  members: many(communityMembers),
  messages: many(communityMessages),
}))
