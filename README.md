# Nickelodeon Web App (classic Nick.com energy)

Unofficial fan redesign inspired by mid-2000s / late-90s **Nick.com** — busy, colorful, and interactive on purpose.

## Thesis

Nickelodeon is for **kids**. Streaming and the internet both forgot that when everything got flattened into beige, minimal “content platforms.” Clean is fine for taxes. Kids need mess, motion, games on the homepage, polls, codes, and stuff you can mash.

Early Nick web design was “basic” by today’s polish standards — and **more fun** than most kids’ products shipping now.

## Run

```bash
npm install
npm run dev
```

Opens at [http://localhost:8081](http://localhost:8081).

Try clicking empty space (slime pops), smash the “Too basic?” button, and unlock codes like `SLIME` or `NICK2004`.

## Sections

| Route | Feel |
| --- | --- |
| `/` | Portal + Nick Jr. spotlight, News / Weekenders / Orbitz rails |
| `/games` | Arcade cards with Play Now |
| `/shows` | Toon + live-action hubs |
| `/video` | Chunk player + clip rail |
| `/fan` | Sticker lab, poll, web-lab toys |
| `/nick-jr` | Preschool destination |
| `/nick-news` | Kids current-events hub |
| `/weekenders` | Specials and weekend promos |
| `/orbitz` | Family vacation / partner travel |
| `/more` | Shop extras |

Primary nav: **Home**, Games, Shows, Video, Your World, More. Music is removed.

## Stack

React 19 + Vite + React Router. Custom CSS (lime field, orange splat, jagged yellow frame).

Not affiliated with Paramount or Nickelodeon.
