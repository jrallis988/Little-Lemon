"""Shipment manifest and SKU parsing for inventory reconciliation."""

from __future__ import annotations

import csv
import json
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Sequence


SKU_PATTERN = re.compile(r"^SKU-?\d{3,}$", re.IGNORECASE)


@dataclass
class ManifestLine:
    sku: str
    expected_qty: int
    received_qty: int = 0
    damaged_qty: int = 0
    carton_id: str = ""
    pallet_tag: str = ""
    notes: str = ""

    @property
    def variance(self) -> int:
        return self.received_qty - self.expected_qty

    @property
    def net_good(self) -> int:
        return max(0, self.received_qty - self.damaged_qty)


@dataclass
class Discrepancy:
    sku: str
    kind: str  # missing | shortage | overage | damaged
    expected: int
    received: int
    damaged: int
    detail: str


@dataclass
class DiscrepancyReport:
    shipment_id: str
    lines: List[ManifestLine] = field(default_factory=list)
    discrepancies: List[Discrepancy] = field(default_factory=list)
    unmatched_order_skus: List[str] = field(default_factory=list)

    @property
    def has_issues(self) -> bool:
        return bool(self.discrepancies or self.unmatched_order_skus)

    def summary(self) -> Dict[str, int]:
        counts = {"missing": 0, "shortage": 0, "overage": 0, "damaged": 0}
        for d in self.discrepancies:
            counts[d.kind] = counts.get(d.kind, 0) + 1
        return counts


@dataclass
class BackRoomLogEntry:
    sku: str
    qty: int
    zone: str
    associate: str
    seconds_to_process: int
    shipment_id: str = ""
    notes: str = ""


class ManifestIngestor:
    """Parse inbound truck logs and reconcile against store order sheets."""

    def __init__(self, sku_map: Optional[Dict[str, Any]] = None):
        self.sku_map = sku_map or {}
        self.back_room_log: List[BackRoomLogEntry] = []

    def normalize_sku(self, raw: str) -> str:
        cleaned = raw.strip().upper().replace(" ", "")
        if cleaned.startswith("SKU") and not cleaned.startswith("SKU-"):
            cleaned = "SKU-" + cleaned[3:].lstrip("-")
        if not cleaned.startswith("SKU-"):
            cleaned = f"SKU-{cleaned}" if cleaned.isdigit() else cleaned
        return cleaned

    def known_sku(self, sku: str) -> bool:
        return not self.sku_map or sku in self.sku_map

    def parse_manifest_file(self, path: str | Path) -> List[ManifestLine]:
        path = Path(path)
        if not path.exists():
            raise FileNotFoundError(f"Manifest not found: {path}")

        suffix = path.suffix.lower()
        if suffix == ".json":
            return self._parse_json(path)
        if suffix in {".csv", ".tsv"}:
            delimiter = "\t" if suffix == ".tsv" else ","
            return self._parse_csv(path, delimiter=delimiter)
        if suffix in {".txt", ".log"}:
            return self._parse_text_log(path)
        raise ValueError(f"Unsupported manifest format: {suffix}")

    def _parse_json(self, path: Path) -> List[ManifestLine]:
        payload = json.loads(path.read_text(encoding="utf-8"))
        rows = payload.get("lines", payload) if isinstance(payload, dict) else payload
        return [self._row_to_line(row) for row in rows]

    def _parse_csv(self, path: Path, delimiter: str = ",") -> List[ManifestLine]:
        with path.open(newline="", encoding="utf-8") as fh:
            reader = csv.DictReader(fh, delimiter=delimiter)
            return [self._row_to_line(row) for row in reader]

    def _parse_text_log(self, path: Path) -> List[ManifestLine]:
        """Parse simple truck logs: SKU qty [carton] [pallet] [damaged=N]."""
        lines: List[ManifestLine] = []
        for raw in path.read_text(encoding="utf-8").splitlines():
            text = raw.strip()
            if not text or text.startswith("#"):
                continue
            parts = text.split()
            if len(parts) < 2:
                continue
            sku = self.normalize_sku(parts[0])
            qty = int(parts[1])
            carton = parts[2] if len(parts) > 2 and not parts[2].startswith("damaged=") else ""
            pallet = parts[3] if len(parts) > 3 and not parts[3].startswith("damaged=") else ""
            damaged = 0
            for token in parts[2:]:
                if token.lower().startswith("damaged="):
                    damaged = int(token.split("=", 1)[1])
            lines.append(
                ManifestLine(
                    sku=sku,
                    expected_qty=qty,
                    received_qty=qty,
                    damaged_qty=damaged,
                    carton_id=carton,
                    pallet_tag=pallet,
                )
            )
        return lines

    def _row_to_line(self, row: Dict[str, Any]) -> ManifestLine:
        def pick(*keys: str, default: Any = "") -> Any:
            for key in keys:
                if key in row and row[key] not in (None, ""):
                    return row[key]
                lower = {k.lower(): v for k, v in row.items()}
                if key.lower() in lower and lower[key.lower()] not in (None, ""):
                    return lower[key.lower()]
            return default

        sku = self.normalize_sku(str(pick("sku", "SKU", "item", default="UNKNOWN")))
        expected = int(pick("expected_qty", "ordered", "order_qty", "qty", default=0))
        received = int(pick("received_qty", "received", "actual", default=expected))
        damaged = int(pick("damaged_qty", "damaged", default=0))
        return ManifestLine(
            sku=sku,
            expected_qty=expected,
            received_qty=received,
            damaged_qty=damaged,
            carton_id=str(pick("carton_id", "carton", default="")),
            pallet_tag=str(pick("pallet_tag", "pallet", default="")),
            notes=str(pick("notes", "note", default="")),
        )

    def load_order_sheet(self, path: str | Path) -> Dict[str, int]:
        path = Path(path)
        orders: Dict[str, int] = {}
        suffix = path.suffix.lower()
        if suffix == ".json":
            data = json.loads(path.read_text(encoding="utf-8"))
            items = data.get("items", data) if isinstance(data, dict) else data
            for item in items:
                sku = self.normalize_sku(str(item.get("sku", item.get("SKU", ""))))
                qty = int(item.get("qty", item.get("quantity", 0)))
                orders[sku] = orders.get(sku, 0) + qty
            return orders

        with path.open(newline="", encoding="utf-8") as fh:
            reader = csv.DictReader(fh)
            for row in reader:
                sku = self.normalize_sku(str(row.get("sku") or row.get("SKU") or ""))
                qty = int(row.get("qty") or row.get("quantity") or 0)
                if sku:
                    orders[sku] = orders.get(sku, 0) + qty
        return orders

    def reconcile(
        self,
        shipment_id: str,
        manifest_lines: Sequence[ManifestLine],
        order_sheet: Optional[Dict[str, int]] = None,
    ) -> DiscrepancyReport:
        """Flag missing SKUs, overages, shortages, and damaged freight."""
        report = DiscrepancyReport(shipment_id=shipment_id, lines=list(manifest_lines))
        seen: Dict[str, ManifestLine] = {}

        for line in manifest_lines:
            if line.sku in seen:
                existing = seen[line.sku]
                existing.expected_qty += line.expected_qty
                existing.received_qty += line.received_qty
                existing.damaged_qty += line.damaged_qty
            else:
                seen[line.sku] = ManifestLine(
                    sku=line.sku,
                    expected_qty=line.expected_qty,
                    received_qty=line.received_qty,
                    damaged_qty=line.damaged_qty,
                    carton_id=line.carton_id,
                    pallet_tag=line.pallet_tag,
                    notes=line.notes,
                )

        for sku, line in seen.items():
            if line.received_qty == 0 and line.expected_qty > 0:
                report.discrepancies.append(
                    Discrepancy(
                        sku=sku,
                        kind="missing",
                        expected=line.expected_qty,
                        received=0,
                        damaged=line.damaged_qty,
                        detail=f"Expected {line.expected_qty}, none received",
                    )
                )
            elif line.received_qty < line.expected_qty:
                report.discrepancies.append(
                    Discrepancy(
                        sku=sku,
                        kind="shortage",
                        expected=line.expected_qty,
                        received=line.received_qty,
                        damaged=line.damaged_qty,
                        detail=f"Short {line.expected_qty - line.received_qty}",
                    )
                )
            elif line.received_qty > line.expected_qty:
                report.discrepancies.append(
                    Discrepancy(
                        sku=sku,
                        kind="overage",
                        expected=line.expected_qty,
                        received=line.received_qty,
                        damaged=line.damaged_qty,
                        detail=f"Over by {line.received_qty - line.expected_qty}",
                    )
                )
            if line.damaged_qty > 0:
                report.discrepancies.append(
                    Discrepancy(
                        sku=sku,
                        kind="damaged",
                        expected=line.expected_qty,
                        received=line.received_qty,
                        damaged=line.damaged_qty,
                        detail=f"{line.damaged_qty} unit(s) damaged — hold off sales floor",
                    )
                )

        if order_sheet:
            for sku, ordered_qty in order_sheet.items():
                if sku not in seen:
                    report.unmatched_order_skus.append(sku)
                    report.discrepancies.append(
                        Discrepancy(
                            sku=sku,
                            kind="missing",
                            expected=ordered_qty,
                            received=0,
                            damaged=0,
                            detail="On order sheet but absent from inbound manifest",
                        )
                    )

        return report

    def log_unboxed(
        self,
        sku: str,
        qty: int,
        zone: str,
        associate: str,
        seconds_to_process: int,
        shipment_id: str = "",
        notes: str = "",
    ) -> BackRoomLogEntry:
        entry = BackRoomLogEntry(
            sku=self.normalize_sku(sku),
            qty=qty,
            zone=zone.upper(),
            associate=associate,
            seconds_to_process=seconds_to_process,
            shipment_id=shipment_id,
            notes=notes,
        )
        self.back_room_log.append(entry)
        return entry

    def back_room_trail(self) -> List[Dict[str, Any]]:
        return [
            {
                "sku": e.sku,
                "qty": e.qty,
                "zone": e.zone,
                "associate": e.associate,
                "seconds_to_process": e.seconds_to_process,
                "shipment_id": e.shipment_id,
                "notes": e.notes,
            }
            for e in self.back_room_log
        ]
