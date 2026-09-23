"""
Vision OCR for supplement label images.

Production: multimodal vision LLM (OpenAI / Anthropic / Gemini).
Local/dev: structured demo extraction when no API key is configured,
or when SUPPLEMENT_OCR_MODE=demo.
"""

from __future__ import annotations

import base64
import json
import os
import re
from typing import Any

from pydantic import BaseModel, Field


class ExtractedIngredient(BaseModel):
    name: str
    amount: float | None = None
    unit: str | None = None
    daily_value_pct: float | None = None
    form: str | None = None


class LabelExtractionResult(BaseModel):
    product_name: str | None = None
    serving_size: str | None = None
    ingredients: list[ExtractedIngredient] = Field(default_factory=list)
    raw_text: str | None = None
    provider: str = "demo"
    confidence: float | None = None


DEMO_LABEL_INGREDIENTS = [
    ExtractedIngredient(
        name="Vitamin D3 (cholecalciferol)",
        amount=125,
        unit="mcg",
        daily_value_pct=625,
        form="cholecalciferol",
    ),
    ExtractedIngredient(
        name="Iron (ferrous bisglycinate)",
        amount=18,
        unit="mg",
        daily_value_pct=100,
        form="ferrous bisglycinate",
    ),
    ExtractedIngredient(
        name="Caffeine (from green tea extract)",
        amount=50,
        unit="mg",
        form="green tea extract",
    ),
    ExtractedIngredient(
        name="Fish oil (omega-3)",
        amount=1000,
        unit="mg",
        form="triglyceride",
    ),
]


def _ocr_mode() -> str:
    mode = (os.environ.get("SUPPLEMENT_OCR_MODE") or "").strip().lower()
    if mode in {"demo", "openai", "anthropic"}:
        return mode
    if os.environ.get("OPENAI_API_KEY"):
        return "openai"
    if os.environ.get("ANTHROPIC_API_KEY"):
        return "anthropic"
    return "demo"


def extract_label_from_bytes(
    image_bytes: bytes,
    *,
    filename: str | None = None,
    content_type: str | None = None,
) -> LabelExtractionResult:
    """Extract structured Supplement Facts from a label image."""
    mode = _ocr_mode()
    if mode == "openai":
        return _extract_openai(image_bytes, content_type=content_type)
    if mode == "anthropic":
        return _extract_anthropic(image_bytes, content_type=content_type)
    return _extract_demo(filename=filename)


def extract_label_from_path(path: str | os.PathLike[str]) -> LabelExtractionResult:
    from pathlib import Path

    file_path = Path(path)
    return extract_label_from_bytes(file_path.read_bytes(), filename=file_path.name)


def _extract_demo(*, filename: str | None = None) -> LabelExtractionResult:
    return LabelExtractionResult(
        product_name="Demo Multivitamin",
        serving_size="1 capsule",
        ingredients=list(DEMO_LABEL_INGREDIENTS),
        raw_text=f"demo extraction for {filename or 'label image'}",
        provider="demo",
        confidence=0.5,
    )


def _guess_media_type(content_type: str | None) -> str:
    if content_type and content_type.startswith("image/"):
        return content_type
    return "image/jpeg"


def _parse_ingredient_payload(payload: dict[str, Any], *, provider: str) -> LabelExtractionResult:
    ingredients: list[ExtractedIngredient] = []
    for item in payload.get("ingredients") or []:
        if not isinstance(item, dict):
            continue
        name = str(item.get("name") or "").strip()
        if not name:
            continue
        ingredients.append(
            ExtractedIngredient(
                name=name,
                amount=_as_float(item.get("amount")),
                unit=(str(item["unit"]) if item.get("unit") is not None else None),
                daily_value_pct=_as_float(item.get("daily_value_pct")),
                form=(str(item["form"]) if item.get("form") is not None else None),
            )
        )
    return LabelExtractionResult(
        product_name=payload.get("product_name"),
        serving_size=payload.get("serving_size"),
        ingredients=ingredients,
        raw_text=payload.get("raw_text"),
        provider=provider,
        confidence=_as_float(payload.get("confidence")),
    )


def _as_float(value: Any) -> float | None:
    if value is None or value == "":
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _extract_json_object(text: str) -> dict[str, Any]:
    text = text.strip()
    try:
        data = json.loads(text)
        if isinstance(data, dict):
            return data
    except json.JSONDecodeError:
        pass
    match = re.search(r"\{.*\}", text, flags=re.DOTALL)
    if not match:
        raise ValueError("Vision model did not return JSON")
    data = json.loads(match.group(0))
    if not isinstance(data, dict):
        raise ValueError("Vision model JSON was not an object")
    return data


OCR_PROMPT = """
Extract Supplement Facts from this label image.
Return ONLY valid JSON with this shape:
{
  "product_name": string|null,
  "serving_size": string|null,
  "confidence": number,
  "raw_text": string,
  "ingredients": [
    {
      "name": string,
      "amount": number|null,
      "unit": string|null,
      "daily_value_pct": number|null,
      "form": string|null
    }
  ]
}
If a proprietary blend has no clear amounts, still list named components when visible.
Do not invent ingredients that are not on the label.
""".strip()


def _extract_openai(
    image_bytes: bytes,
    *,
    content_type: str | None = None,
) -> LabelExtractionResult:
    import urllib.error
    import urllib.request

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return _extract_demo()

    b64 = base64.b64encode(image_bytes).decode("ascii")
    media = _guess_media_type(content_type)
    body = {
        "model": os.environ.get("OPENAI_VISION_MODEL", "gpt-4o-mini"),
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": OCR_PROMPT},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:{media};base64,{b64}"},
                    },
                ],
            }
        ],
        "response_format": {"type": "json_object"},
        "max_tokens": 1200,
    }
    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
        raise RuntimeError(f"OpenAI vision OCR failed: {exc}") from exc

    content = payload["choices"][0]["message"]["content"]
    return _parse_ingredient_payload(_extract_json_object(content), provider="openai")


def _extract_anthropic(
    image_bytes: bytes,
    *,
    content_type: str | None = None,
) -> LabelExtractionResult:
    import urllib.error
    import urllib.request

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return _extract_demo()

    b64 = base64.b64encode(image_bytes).decode("ascii")
    media = _guess_media_type(content_type)
    body = {
        "model": os.environ.get("ANTHROPIC_VISION_MODEL", "claude-sonnet-4-20250514"),
        "max_tokens": 1200,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": media,
                            "data": b64,
                        },
                    },
                    {"type": "text", "text": OCR_PROMPT},
                ],
            }
        ],
    }
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=json.dumps(body).encode("utf-8"),
        headers={
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
        raise RuntimeError(f"Anthropic vision OCR failed: {exc}") from exc

    parts = payload.get("content") or []
    text = "".join(p.get("text", "") for p in parts if isinstance(p, dict))
    return _parse_ingredient_payload(_extract_json_object(text), provider="anthropic")


def extraction_to_dicts(result: LabelExtractionResult) -> list[dict[str, Any]]:
    return [item.model_dump() for item in result.ingredients]
