"""API and domain tests for the supplement research platform."""

from __future__ import annotations

import os
from pathlib import Path

import pytest

# Auth disabled for most API smoke tests; dedicated auth tests re-enable it.
os.environ["SUPPLEMENT_AUTH_DISABLED"] = "true"
os.environ["SUPPLEMENT_OCR_MODE"] = "demo"
os.environ["SUPPLEMENT_DB_PATH"] = "/tmp/supplement_pytest.db"
os.environ["SUPPLEMENT_OBJECT_ROOT"] = "/tmp/supplement_pytest_objects"

from fastapi.testclient import TestClient  # noqa: E402

from supplement_checker.access_control import apply_verification_state  # noqa: E402
from supplement_checker.auth import AuthError, login, register  # noqa: E402
from supplement_checker.compare_engine import compare_profile_to_ingredients  # noqa: E402
from supplement_checker.data_gaps import DATA_GAP_UI_MESSAGE  # noqa: E402
from supplement_checker.legal_notice import (  # noqa: E402
    GAPS_AND_KNOWLEDGE_LIMITS_NOTICE,
    build_terms_acceptance,
)
from supplement_checker.profile_ingestion import (  # noqa: E402
    example_profile,
    profile_to_storage_dict,
)
from supplement_checker.storage import reset_store_for_tests  # noqa: E402
from supplement_checker.vision_ocr import extract_label_from_bytes  # noqa: E402


@pytest.fixture()
def store(tmp_path: Path):
    db = tmp_path / "test.db"
    return reset_store_for_tests(db)


@pytest.fixture()
def client(store):
    # Re-import app after store reset so get_store() is bound to fixture DB.
    from supplement_checker.api import main as api_main

    return TestClient(api_main.app)


def test_legal_notice_contains_required_language():
    assert "NOT a medical device" in GAPS_AND_KNOWLEDGE_LIMITS_NOTICE
    assert "PubMed" in GAPS_AND_KNOWLEDGE_LIMITS_NOTICE
    with pytest.raises(Exception):
        build_terms_acceptance(accepted=False)


def test_ocr_demo_extraction():
    result = extract_label_from_bytes(b"", filename="label.jpg")
    assert result.provider == "demo"
    assert len(result.ingredients) >= 4


def test_compare_data_gap_hard_stop():
    profile = apply_verification_state(example_profile())
    out = compare_profile_to_ingredients(
        profile,
        [
            {"name": "Vitamin D3 (cholecalciferol)", "amount": 125, "unit": "mcg"},
            {"name": "Proprietary NeuroBlend X-9", "amount": 500, "unit": "mg"},
        ],
        use_live_literature=False,
    )
    assert out["data_gaps"]
    assert out["data_gaps"][0]["ui_message"] == DATA_GAP_UI_MESSAGE
    assert out["data_gaps"][0]["safety_evaluation"] is None
    assert out["findings"]


def test_storage_persists_profile(store):
    profile = apply_verification_state(example_profile())
    store.save_profile(profile, user_id="u1")
    loaded = store.get_profile(profile.profile_id)
    assert loaded is not None
    assert loaded.profile_verified is True
    assert loaded.display_name == "Demo User"


def test_auth_register_login(store):
    previous = os.environ.get("SUPPLEMENT_AUTH_DISABLED")
    os.environ["SUPPLEMENT_AUTH_DISABLED"] = "false"
    try:
        created = register(
            email="clinician@example.com",
            password="securepass",
            display_name="Clinician",
            store=store,
        )
        assert created["access_token"]
        again = login(
            email="clinician@example.com",
            password="securepass",
            store=store,
        )
        assert again["user"]["email"] == "clinician@example.com"
        with pytest.raises(AuthError):
            login(email="clinician@example.com", password="wrongpass", store=store)
    finally:
        if previous is None:
            os.environ.pop("SUPPLEMENT_AUTH_DISABLED", None)
        else:
            os.environ["SUPPLEMENT_AUTH_DISABLED"] = previous


def test_api_gates_and_scan_compare(client):
    os.environ["SUPPLEMENT_AUTH_DISABLED"] = "true"
    assert client.get("/health").json()["version"].startswith("0.4")
    assert client.get("/legal/notice").json()["skippable"] is False

    headers = {"X-Client-Id": "pytest-client"}
    assert (
        client.post(
            "/legal/accept",
            headers=headers,
            json={"accepted": True, "client_id": "pytest-client"},
        ).status_code
        == 200
    )

    created = client.post(
        "/profiles",
        headers=headers,
        json={
            "client_id": "pytest-client",
            "profile": profile_to_storage_dict(example_profile()),
        },
    )
    assert created.status_code == 201, created.text
    pid = created.json()["profile"]["profile_id"]

    locked = client.post(f"/labels/scan/{pid}", headers=headers)
    assert locked.status_code == 403

    assert client.post(f"/profiles/{pid}/verify", headers=headers).status_code == 200
    scan = client.post(f"/labels/scan/{pid}", headers=headers)
    assert scan.status_code == 200, scan.text
    ingredients = scan.json()["ingredients"]
    assert ingredients

    cmp = client.post(
        f"/compare/{pid}",
        headers=headers,
        json={
            "ingredients": ingredients
            + [{"name": "Mystery Blend Ultra", "amount": 1, "unit": "g"}],
            "use_live_literature": False,
        },
    )
    assert cmp.status_code == 200, cmp.text
    body = cmp.json()
    assert body["evaluation_blocked_for_gaps"] is True
    assert body["findings"]


def test_dashboard_served(client):
    res = client.get("/dashboard")
    assert res.status_code == 200
    assert "ClearDose Research" in res.text
    css = client.get("/dashboard/assets/styles.css")
    assert css.status_code == 200
    assert "--accent" in css.text
