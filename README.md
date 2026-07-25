# Vibe

**Real Friends. Real Moments. Real You.**

Vibe is a social utility and time-capsule platform for **teenagers ages 13–17**. Inspired by personality-driven classic social pages, it focuses on authentic peer connection inside a verified student ecosystem — without algorithmic bloat or cross-demographic noise.

## Core philosophy

- School-connected moments over vanity metrics  
- Verified teen peers (closed-loop)  
- Customizable personal pages + real-time “vibes”  
- Safety and privacy designed for student well-being  

## Product architecture

| Pillar | What it does |
|--------|----------------|
| **Verified Student Onboarding** | School picker, grade, school email / invite code / demo verify |
| **The Loop** | Discovery feed filtered by **Now · School · Nearby · Following** |
| **Start a Vibe** | Share what you’re up to (skating, studying, lunch, gaming…) |
| **Live vibe rooms** | Who’s here, updates, I’m here / Invite |
| **Photo sets & memory strips** | Multi-photo stories with captions/mood |
| **Groups & Circles** | Clubs, teams, hangouts, interest hubs |
| **Events & Music** | School-adjacent events + trending playlists |
| **Personality profiles** | About me, bulletin board, featured friends, now playing, interests, themes |
| **Safety** | Ghost Mode, school-only boundary, block/report, teen age gate (13–17) |

## Stack

- Next.js App Router · React · TypeScript · Tailwind CSS  
- Lucide icons · Supabase-ready schema + mock-data fallback  

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

### Demo login

| Field | Value |
|-------|--------|
| Email | `jordan@example.com` |
| Password | `demo1234` |

Invite code during onboarding: `VIBE2026`

## Key routes

| Path | Purpose |
|------|---------|
| `/` | Public landing |
| `/signup`, `/login`, `/onboarding` | Auth + verified student setup |
| `/home` | Loop feed |
| `/vibe/new`, `/vibe/[id]` | Start / join a live vibe |
| `/groups`, `/groups/[id]` | Circles & clubs |
| `/events`, `/music` | Events & music discovery |
| `/profile/[username]`, `/profile/edit` | Personal page + theme editor |
| `/friends`, `/messages`, `/search`, `/notifications`, `/settings` | Social + safety |

## Folder structure

```
app/                 # Routes (Loop, vibes, groups, profile, …)
components/
  loop/              # Loop filters, vibe cards
  groups/            # Group cards
  layout/            # Header + VibeBottomNav (Home / Groups / + / Messages / Me)
  profile/           # Profile modules, bulletin, music, photos
lib/
  mock/              # Seed data + vibe-social (schools, moments, groups)
  types.ts           # Domain models
supabase/schema.sql  # Postgres draft + RLS notes
```

## Design notes

- **Chrome:** navy/blue header, script “Vibe” wordmark  
- **Loop energy:** dark surfaces + flame orange CTAs (`#FF5C00`)  
- **Profiles:** light cards, collapsible modules, teen-safe fields only  

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```
