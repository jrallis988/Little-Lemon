#!/usr/bin/env python3
"""
PACE — FIND YOUR PACE campaign analysis
SIMULATED DATA only. Fictional portfolio project.
Answers marketing questions: what creative drove awareness,
engagement, consideration, and action — and what to do next.
"""

from __future__ import annotations

import json
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parent
DATA_PATH = ROOT / "campaign_data.csv"
OUT_PATH = ROOT / "insights.json"
PUBLIC_OUT = ROOT.parent / "public" / "insights.json"


def engagement_rate(row: pd.Series) -> float:
    denom = row["reach"] if row["reach"] else 0
    if denom == 0:
        return 0.0
    interactions = (
        row["likes"]
        + row["comments"]
        + row["shares"]
        + row["saves"]
    )
    return interactions / denom


def load() -> pd.DataFrame:
    df = pd.read_csv(DATA_PATH)
    df["engagement_rate"] = df.apply(engagement_rate, axis=1)
    df["ctr"] = df["ctr"].astype(float)
    df["completion_rate"] = df["completion_rate"].astype(float)
    return df


def summarize_group(g: pd.DataFrame) -> dict:
    video = g[g["views"] > 0]
    return {
        "pieces": int(len(g)),
        "total_reach": int(g["reach"].sum()),
        "avg_reach": round(float(g["reach"].mean()), 1),
        "avg_engagement_rate": round(float(g["engagement_rate"].mean()), 4),
        "avg_ctr": round(float(g["ctr"].mean()), 4),
        "avg_completion_rate": round(
            float(video["completion_rate"].mean()) if len(video) else 0.0, 4
        ),
        "total_saves": int(g["saves"].sum()),
        "total_shares": int(g["shares"].sum()),
        "total_link_clicks": int(g["link_clicks"].sum()),
        "total_watch_time_hours": round(float(g["watch_time_hours"].sum()), 1),
    }


def top_content(df: pd.DataFrame, n: int = 5) -> list[dict]:
    ranked = df.sort_values("engagement_rate", ascending=False).head(n)
    return [
        {
            "content_id": r.content_id,
            "title": r.title,
            "platform": r.platform,
            "format": r.format,
            "pillar": r.content_pillar,
            "approach": r.creative_approach,
            "engagement_rate": round(float(r.engagement_rate), 4),
            "reach": int(r.reach),
            "ctr": float(r.ctr),
            "saves": int(r.saves),
        }
        for r in ranked.itertuples()
    ]


def creative_approach_insights(df: pd.DataFrame) -> dict:
    """Nuanced: no universal winner — map approach to objective fit."""
    by = {
        name: summarize_group(group)
        for name, group in df.groupby("creative_approach")
    }
    return {
        "by_approach": by,
        "interpretation": {
            "engagement": "Community and People-led content lead engagement rate and shares.",
            "saves": "Educational / Training content drives the highest saves (utility).",
            "ctr": "Product-led pieces deliver stronger CTR and product-page intent.",
            "reach": "People-led video storytelling expands reach beyond product-only ads.",
        },
    }


def build_insights(df: pd.DataFrame) -> dict:
    overall = {
        "total_pieces": int(len(df)),
        "total_reach": int(df["reach"].sum()),
        "total_impressions": int(df["impressions"].sum()),
        "total_views": int(df["views"].sum()),
        "avg_engagement_rate": round(float(df["engagement_rate"].mean()), 4),
        "avg_ctr": round(float(df["ctr"].mean()), 4),
        "avg_completion_rate": round(
            float(df.loc[df["views"] > 0, "completion_rate"].mean()), 4
        ),
        "total_link_clicks": int(df["link_clicks"].sum()),
        "total_saves": int(df["saves"].sum()),
        "total_shares": int(df["shares"].sum()),
        "total_watch_time_hours": round(float(df["watch_time_hours"].sum()), 1),
        "disclaimer": "SIMULATED DATA — fictional PACE portfolio project.",
    }

    by_platform = {
        name: summarize_group(group) for name, group in df.groupby("platform")
    }
    by_format = {
        name: summarize_group(group) for name, group in df.groupby("format")
    }
    by_pillar = {
        name: summarize_group(group)
        for name, group in df.groupby("content_pillar")
    }
    by_stage = {
        name: summarize_group(group)
        for name, group in df.groupby("campaign_stage")
    }

    strongest_platform = max(
        by_platform.items(), key=lambda x: x[1]["avg_engagement_rate"]
    )[0]
    strongest_pillar = max(
        by_pillar.items(), key=lambda x: x[1]["avg_engagement_rate"]
    )[0]
    best_ctr_pillar = max(by_pillar.items(), key=lambda x: x[1]["avg_ctr"])[0]
    best_saves_pillar = max(
        by_pillar.items(), key=lambda x: x[1]["total_saves"]
    )[0]

    recommendations = [
        {
            "title": "Increase people-led creative",
            "evidence": "People-led reels and TikToks led reach and emotional engagement (IG-005, TT-004, IG-009).",
            "action": "Prioritize runner-in-product storytelling for awareness flights.",
        },
        {
            "title": "Produce more educational short-form",
            "evidence": f"Training pillar led saves ({by_pillar.get('Training', {}).get('total_saves', 0):,}) — utility content is bookmarked.",
            "action": "Ship weekly pacing / recovery tips on Reels and TikTok.",
        },
        {
            "title": "Test stronger TikTok hooks",
            "evidence": "Outcome-led hook ('I ran 50 miles…') beat product intro on 3s retention, watch time, completion, and shares.",
            "action": "Open with result or tension before product name.",
        },
        {
            "title": "Keep athlete-focused YouTube thumbnails",
            "evidence": "Athlete thumbnails lifted CTR and qualified views vs product-only frames in Test 03.",
            "action": "Default to face + motion for long-form and Shorts packaging.",
        },
        {
            "title": "Reduce repetitive product-only graphics",
            "evidence": "Product-led stills trailed people/community on engagement while still winning CTR on convert-stage carousels.",
            "action": "Reserve polished product grids for consideration/convert; lead awareness with people and community.",
        },
        {
            "title": "Expand community storytelling",
            "evidence": f"Community pillar and challenge formats drove shares; strongest engagement platform pattern favors participatory creative ({strongest_platform}).",
            "action": "Scale group-run recaps, challenges, and RSVP Stories into evergreen.",
        },
    ]

    return {
        "meta": {
            "project": "PACE — FIND YOUR PACE",
            "data_label": "SIMULATED DATA",
            "note": "All metrics are fictional and created for portfolio demonstration of social strategy, measurement, and creative optimization.",
        },
        "overall": overall,
        "by_platform": by_platform,
        "by_format": by_format,
        "by_pillar": by_pillar,
        "by_stage": by_stage,
        "creative_performance": creative_approach_insights(df),
        "top_content": top_content(df),
        "highlights": {
            "strongest_platform": strongest_platform,
            "strongest_pillar_engagement": strongest_pillar,
            "strongest_pillar_ctr": best_ctr_pillar,
            "strongest_pillar_saves": best_saves_pillar,
            "best_performing_content": top_content(df, 1)[0],
        },
        "recommendations": recommendations,
        "records": df.to_dict(orient="records"),
    }


def main() -> None:
    df = load()
    insights = build_insights(df)
    text = json.dumps(insights, indent=2)
    OUT_PATH.write_text(text)
    PUBLIC_OUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUT.write_text(text)
    print(f"Wrote {OUT_PATH}")
    print(f"Wrote {PUBLIC_OUT}")
    print(
        f"Reach={insights['overall']['total_reach']:,} | "
        f"Avg ER={insights['overall']['avg_engagement_rate']:.2%} | "
        f"Best platform={insights['highlights']['strongest_platform']}"
    )


if __name__ == "__main__":
    main()
