# Schema reference

Source of truth: `src/db/schema/core.ts`  
Dialect: PostgreSQL via Drizzle

## Entity relationship (simplified)

```
user 1──1 profiles
user 1──* posts 1──* lab_notes
user 1──* events (as host)
venues 1──* events
events *──* user (event_signups)
user *──* user (connections)
communities 1──* community_members / community_messages
conversations 1──* direct_messages
```

## Tables

### Auth (Better Auth)
| Table | Purpose |
|-------|---------|
| `user` | Account identity |
| `session` | Sessions |
| `account` | Credentials / OAuth links |
| `verification` | Email verify tokens |

### Profiles
| Table | Purpose |
|-------|---------|
| `profiles` | Digital green room: stage name, home scene, collab tags, safety verification |
| `connections` | Networking graph; **no count columns** |

### Posts / clips
| Table | Purpose |
|-------|---------|
| `posts` | `clip`, `premise`, `flyer`, `lab_memo` — indexed by `created_at` |
| `lab_notes` | Peer notes on lab posts |

### Shows / mics
| Table | Purpose |
|-------|---------|
| `venues` | Rooms; `is_verified_venue` for booker/venue safety |
| `events` | Open mics & shows ordered by `starts_at` |
| `event_signups` | Slot claims |

### Communities
| Table | Purpose |
|-------|---------|
| `communities` | Regional Green Rooms, indie crews, lab circles |
| `community_members` | Membership + host/mod roles |
| `community_messages` | Chronological room chat |

### Messaging
| Table | Purpose |
|-------|---------|
| `conversations` | DM threads |
| `conversation_participants` | Thread members |
| `direct_messages` | Chronological DMs |

### Safety
| Table | Purpose |
|-------|---------|
| `blocks` | Hard blocks |
| `reports` | Abuse reports |

## Explicit non-goals in schema

- No `like_count`, `follower_count`, `view_count`, or `engagement_score` columns
- No sponsored / promoted post flags
- No ranking weight / boost fields
