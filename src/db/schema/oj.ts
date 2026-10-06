/**
 * OJ monetization tables (Postgres) — ready for Neon/Hyperdrive.
 * UI currently uses the in-memory catalog + local membership store;
 * wire these when DATABASE_URL is available.
 */

import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { user } from './core'

export const ojAccessEnum = pgEnum('oj_access', ['public', 'supporters'])
export const ojMediaKindEnum = pgEnum('oj_media_kind', [
  'video',
  'audio',
  'animation',
  'text',
])

export const ojCreators = pgTable(
  'oj_creators',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
    username: text('username').notNull(),
    displayName: text('display_name').notNull(),
    bio: text('bio').notNull().default(''),
    city: text('city').notNull().default(''),
    tierName: text('tier_name').notNull().default('Backstage'),
    tierPriceCents: integer('tier_price_cents').notNull().default(900),
    avatarUrl: text('avatar_url'),
    bannerHue: integer('banner_hue').notNull().default(200),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [uniqueIndex('oj_creators_username_idx').on(t.username)],
)

export const ojPosts = pgTable(
  'oj_posts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    creatorId: uuid('creator_id')
      .notNull()
      .references(() => ojCreators.id, { onDelete: 'cascade' }),
    kind: ojMediaKindEnum('kind').notNull(),
    access: ojAccessEnum('access').notNull().default('public'),
    title: text('title').notNull(),
    body: text('body').notNull().default(''),
    mediaUrl: text('media_url'),
    posterUrl: text('poster_url'),
    durationLabel: text('duration_label'),
    tipTotalCents: integer('tip_total_cents').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    index('oj_posts_created_at_idx').on(t.createdAt),
    index('oj_posts_creator_created_idx').on(t.creatorId, t.createdAt),
  ],
)

export const ojSubscriptions = pgTable(
  'oj_subscriptions',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    fanUserId: text('fan_user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    creatorId: uuid('creator_id')
      .notNull()
      .references(() => ojCreators.id, { onDelete: 'cascade' }),
    status: text('status').notNull().default('active'),
    stripeSubId: text('stripe_sub_id'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex('oj_subscriptions_fan_creator_idx').on(t.fanUserId, t.creatorId),
  ],
)

export const ojTips = pgTable(
  'oj_tips',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    fanUserId: text('fan_user_id').references(() => user.id, {
      onDelete: 'set null',
    }),
    creatorId: uuid('creator_id')
      .notNull()
      .references(() => ojCreators.id, { onDelete: 'cascade' }),
    postId: uuid('post_id').references(() => ojPosts.id, {
      onDelete: 'set null',
    }),
    amountCents: integer('amount_cents').notNull(),
    stripePaymentId: text('stripe_payment_id'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [index('oj_tips_creator_created_idx').on(t.creatorId, t.createdAt)],
)
