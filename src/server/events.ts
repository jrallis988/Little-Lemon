import { and, asc, eq, gte } from 'drizzle-orm'
import { db } from '#/db/index'
import { events, profiles, venues } from '#/db/schema'
import type { EventKind } from '#/domain/invariants'

export async function listUpcomingMics(opts: {
  city?: string
  region?: string
  kind?: EventKind
  from?: Date
  limit?: number
}) {
  const limit = Math.min(opts.limit ?? 40, 80)
  const filters = [gte(events.startsAt, opts.from ?? new Date())]
  if (opts.city) filters.push(eq(events.city, opts.city))
  if (opts.region) filters.push(eq(events.region, opts.region))
  if (opts.kind) filters.push(eq(events.kind, opts.kind))

  return db
    .select({
      id: events.id,
      kind: events.kind,
      title: events.title,
      description: events.description,
      startsAt: events.startsAt,
      city: events.city,
      region: events.region,
      neighborhood: events.neighborhood,
      slotsOpen: events.slotsOpen,
      venueName: venues.name,
      hostUsername: profiles.username,
    })
    .from(events)
    .leftJoin(venues, eq(events.venueId, venues.id))
    .innerJoin(profiles, eq(events.hostId, profiles.userId))
    .where(and(...filters))
    .orderBy(asc(events.startsAt))
    .limit(limit)
}
