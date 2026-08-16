# Greenroom

**The social network for comedians.**

Share bits, claim open-mic slots, workshop unfinished premises, and follow comics who actually work rooms.

## Product pillars

| Pillar | What it does |
|--------|----------------|
| **Lineup** | Feed of bits, setlists, show calls, clips, and workshop posts |
| **Open mics** | Venues + upcoming nights with claimable slots |
| **Profiles** | Stage name, styles, credits, years on stage |
| **Compose** | Drop a bit / workshop / setlist to the lineup |
| **Search** | Find comics by city, style, or room |

## Stack

- Next.js App Router · React · TypeScript · Tailwind CSS
- Lucide icons · local demo auth · seeded mock data
- Mobile-first PWA shell (installable via `manifest.webmanifest`)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo login

| Field | Value |
|-------|--------|
| Email | `maya.kill@greenroom.app` |
| Password | `demo1234` |

## Key routes

| Path | Purpose |
|------|---------|
| `/` | Brand landing |
| `/signup`, `/login` | Demo auth |
| `/lineup` | Main feed |
| `/mics` | Open mics & venues |
| `/post/new` | Composer |
| `/u/[username]` | Comic profile |
| `/search`, `/messages`, `/notifications`, `/settings` | Social utilities |

## Design

Nightlife club direction: stage black, spotlight amber, marquee coral. Display type is Bebas Neue; UI is Instrument Sans; bit copy uses Literata.

## Next steps

- Persist posts and mic claims (Supabase / API)
- Real auth + DMs
- Native shell (Expo) wrapping the same product surfaces
