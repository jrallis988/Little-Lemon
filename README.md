# Planet Fitness Ecosystem

Production-oriented acquisition website + member utility app shell.

## Architectural boundaries

| Surface | Owns | Route root |
|---------|------|------------|
| **Web** | Club locator, pricing, promos, Summer Pass, join checkout | `/` `(web)` |
| **App** | Check-in, keytag, Crowd Meter, workouts, billing, account | `/app` `(member)` |

## Directory map

```text
app/
  layout.tsx                 # fonts + globals only
  (web)/                     # Screens 01–20 acquisition chrome
    layout.tsx               # SiteHeader + SiteFooter
    page.tsx                 # Home (locator + pricing + promos)
    join/                    # Multi-step checkout
    gyms/[slug]/             # Club detail pages
    screens/                 # Master screen registry UI
  (member)/app/              # Screens 21–85 member shell
    layout.tsx               # Mobile MemberShell + tab bar
    login|check-in|keytag|workouts|billing|…
  api/                       # clubs + memberships APIs
components/
  member/                    # App UI primitives
  *.tsx                      # Web acquisition components
lib/
  screens.ts                 # Master 01–85 registry
```

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Website: http://localhost:3000  
- Member app: http://localhost:3000/app  
- Screen registry: http://localhost:3000/screens  

## Priority foundation (done)

1. Route-group separation for web vs member app  
2. Web layout templates (header/footer/consent)  
3. Interactive club locator + multi-step join checkout  
4. Member shell with core utility scaffolds  

## Next build waves

- App auth/session (real)  
- Check-in state machine + offline keytag  
- Stripe Checkout / Elements  
- Live club inventory API  
- Screens 66–85 edge cases  
