"""
Biomedical literature lookup via NCBI E-utilities (PubMed).

Used to decide whether an ingredient has sufficient indexed human research
before any safety/mechanism evaluation is attempted.
"""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from typing import Any

from .data_gaps import (
    PROTOTYPE_INDEXED_INGREDIENTS,
    IngredientLiteratureStatus,
    LiteratureCoverage,
    normalize_ingredient_name,
)

NCBI_ESEARCH = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
NCBI_ESUMMARY = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
MIN_INDEXED_FOR_EVALUATION = int(os.environ.get("SUPPLEMENT_MIN_PUBMED_HITS", "3"))


@dataclass
class LiteratureHit:
    pmid: str
    title: str
    pubdate: str | None = None
    source: str | None = None
    url: str | None = None


@dataclass
class LiteratureQueryResult:
    query: str
    total_count: int
    hits: list[LiteratureHit] = field(default_factory=list)
    provider: str = "pubmed"
    used_fallback: bool = False


def _ncbi_params(**extra: Any) -> dict[str, str]:
    params = {"retmode": "json", **{k: str(v) for k, v in extra.items()}}
    email = os.environ.get("NCBI_EMAIL")
    api_key = os.environ.get("NCBI_API_KEY")
    if email:
        params["email"] = email
    if api_key:
        params["api_key"] = api_key
    tool = os.environ.get("NCBI_TOOL", "supplement-research-platform")
    params["tool"] = tool
    return params


def _http_get_json(url: str, params: dict[str, str], *, timeout: float = 20.0) -> dict[str, Any]:
    full = f"{url}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(full, headers={"User-Agent": "supplement-research-platform/0.3"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def build_pubmed_query(ingredient: str, *, human_only: bool = True) -> str:
    name = normalize_ingredient_name(ingredient)
    # Prefer human clinical literature signals over pure chemistry papers.
    clauses = [f'("{name}"[Title/Abstract])']
    if human_only:
        clauses.append('(humans[MeSH Terms] OR clinical trial[Publication Type] OR review[Publication Type])')
    return " AND ".join(clauses)


def search_pubmed(
    ingredient: str,
    *,
    retmax: int = 5,
    human_only: bool = True,
) -> LiteratureQueryResult:
    """
    Query PubMed for an ingredient. Falls back to prototype index counts when
    NCBI is unreachable (offline / rate-limited) so local demos still work.
    """
    query = build_pubmed_query(ingredient, human_only=human_only)
    try:
        search = _http_get_json(
            NCBI_ESEARCH,
            _ncbi_params(db="pubmed", term=query, retmax=retmax),
        )
        result = search.get("esearchresult") or {}
        total = int(result.get("count") or 0)
        ids = result.get("idlist") or []
        hits: list[LiteratureHit] = []
        if ids:
            summary = _http_get_json(
                NCBI_ESUMMARY,
                _ncbi_params(db="pubmed", id=",".join(ids)),
            )
            uids = (summary.get("result") or {}).get("uids") or ids
            for pmid in uids:
                doc = (summary.get("result") or {}).get(pmid) or {}
                if not isinstance(doc, dict):
                    continue
                hits.append(
                    LiteratureHit(
                        pmid=str(pmid),
                        title=str(doc.get("title") or "").strip(),
                        pubdate=doc.get("pubdate"),
                        source=doc.get("source"),
                        url=f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/",
                    )
                )
        return LiteratureQueryResult(
            query=query,
            total_count=total,
            hits=hits,
            provider="pubmed",
            used_fallback=False,
        )
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError, KeyError, ValueError):
        # Offline / blocked network — prototype fallback with explicit flag.
        key = normalize_ingredient_name(ingredient)
        count = 0
        for proto_key, proto_count in PROTOTYPE_INDEXED_INGREDIENTS.items():
            if proto_key in key or key in proto_key:
                count = max(count, proto_count)
                break
        return LiteratureQueryResult(
            query=query,
            total_count=count,
            hits=[],
            provider="prototype_fallback",
            used_fallback=True,
        )


def literature_status_for_ingredient(ingredient: str) -> IngredientLiteratureStatus:
    """Map PubMed (or fallback) coverage into the data-gap gate status."""
    result = search_pubmed(ingredient)
    if result.total_count >= MIN_INDEXED_FOR_EVALUATION:
        return IngredientLiteratureStatus(
            name=ingredient,
            coverage=LiteratureCoverage.INDEXED,
            indexed_record_count=result.total_count,
            notes=(
                f"{result.provider}: {result.total_count} indexed records "
                f"(threshold {MIN_INDEXED_FOR_EVALUATION})."
            ),
            sources_checked=[result.provider, "pubmed"],
        )
    return IngredientLiteratureStatus(
        name=ingredient,
        coverage=LiteratureCoverage.INSUFFICIENT,
        indexed_record_count=result.total_count,
        notes=(
            f"{result.provider}: only {result.total_count} indexed records "
            f"(need ≥ {MIN_INDEXED_FOR_EVALUATION})."
        ),
        sources_checked=[result.provider, "pubmed"],
    )


def citations_for_ingredient(ingredient: str, *, limit: int = 3) -> list[dict[str, Any]]:
    result = search_pubmed(ingredient, retmax=limit)
    return [
        {
            "pmid": hit.pmid,
            "title": hit.title,
            "pubdate": hit.pubdate,
            "source": hit.source,
            "url": hit.url,
        }
        for hit in result.hits[:limit]
    ]


def query_literature(term: str, *, retmax: int = 10) -> dict[str, Any]:
    """General literature search for /literature API."""
    result = search_pubmed(term, retmax=retmax, human_only=True)
    return {
        "query": result.query,
        "total_count": result.total_count,
        "provider": result.provider,
        "used_fallback": result.used_fallback,
        "hits": [
            {
                "pmid": h.pmid,
                "title": h.title,
                "pubdate": h.pubdate,
                "source": h.source,
                "url": h.url,
            }
            for h in result.hits
        ],
    }
