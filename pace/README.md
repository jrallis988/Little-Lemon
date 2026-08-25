# PACE — Find Your Pace

Fictional self-initiated portfolio case study: social strategy + creative performance for a contemporary performance-running brand launching **PACE ONE**.

> All campaign metrics are **SIMULATED DATA**. PACE is not a real client.

## What this demonstrates

- Social strategy, objectives, audiences, pillars, platform roles
- Campaign journey + four-week calendar
- Creative system boards across Instagram, TikTok, YouTube
- Measurement framework tied to objectives
- Python / Pandas analysis of a ~32-piece simulated dataset
- Performance interpretation, A/B tests, scorecards, optimization
- Interactive React performance explorer

**Core thesis:** data → insight → creative decision

## Stack

- React + TypeScript + Vite
- Recharts
- Modern CSS
- Python + Pandas (`analysis/analyze.py`)

## Develop

```bash
cd pace
npm install
npm run analyze   # regenerates insights.json from CSV
npm run dev       # http://localhost:5173
```

## Build

```bash
npm run build
npm run preview
```

Production assets land in `dist/` (relative base path for portfolio embedding).

## Structure

```
pace/
├── analysis/
│   ├── campaign_data.csv
│   ├── analyze.py
│   └── insights.json
├── public/
├── src/
│   ├── components/
│   ├── data/
│   └── styles/
└── dist/          # after build
```
