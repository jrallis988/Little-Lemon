"""Unit tests for Thomas core modules."""

from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

BASE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BASE))

from core.audit import CashCount, ShiftAuditor
from core.ingestion import ManifestIngestor
from core.logger import LocalLedger


class IngestionTests(unittest.TestCase):
    def setUp(self) -> None:
        self.ingestor = ManifestIngestor()
        self.samples = BASE / "samples"

    def test_parse_csv_and_reconcile(self) -> None:
        lines = self.ingestor.parse_manifest_file(self.samples / "inbound_manifest.csv")
        orders = self.ingestor.load_order_sheet(self.samples / "order_sheet.csv")
        report = self.ingestor.reconcile("inbound_manifest", lines, orders)
        kinds = {d.kind for d in report.discrepancies}
        self.assertIn("shortage", kinds)
        self.assertIn("overage", kinds)
        self.assertIn("damaged", kinds)
        self.assertIn("missing", kinds)
        self.assertTrue(report.has_issues)

    def test_parse_truck_log(self) -> None:
        lines = self.ingestor.parse_manifest_file(self.samples / "truck.log")
        self.assertGreaterEqual(len(lines), 5)
        damaged = [l for l in lines if l.damaged_qty]
        self.assertEqual(damaged[0].sku, "SKU-2003")

    def test_back_room_log(self) -> None:
        entry = self.ingestor.log_unboxed("sku2001", 5, "a1", "alex", 30)
        self.assertEqual(entry.sku, "SKU-2001")
        self.assertEqual(entry.zone, "A1")
        self.assertEqual(len(self.ingestor.back_room_trail()), 1)


class AuditTests(unittest.TestCase):
    def test_register_balance_ok(self) -> None:
        auditor = ShiftAuditor(drawer_float=200, deposit_tolerance=0.05)
        # expected = 200 + 150 - 0 = 350; count twenties*10 + fifties*3 = 200+150=350
        count = CashCount(fifties=3, twenties=10)
        result = auditor.balance_register("R1", sales_total=150, cash_count=count)
        self.assertEqual(result.expected, 350.0)
        self.assertEqual(result.variance, 0.0)
        self.assertTrue(result.within_tolerance)
        self.assertEqual(result.deposit_amount, 150.0)

    def test_register_variance(self) -> None:
        auditor = ShiftAuditor(drawer_float=200, deposit_tolerance=0.05)
        count = CashCount(hundreds=3)  # 300 vs expected 350
        result = auditor.balance_register("R2", sales_total=150, cash_count=count)
        self.assertFalse(result.within_tolerance)
        self.assertEqual(result.variance, -50.0)

    def test_expense_and_briefing(self) -> None:
        auditor = ShiftAuditor()
        auditor.track_expense("supply", "Security tags", 12.0, sku="SKU-1002", quantity=2)
        self.assertEqual(auditor.expense_total("supply"), 24.0)
        text = auditor.shift_briefing("A", "B")
        self.assertIn("SHIFT CHANGE BRIEFING", text)
        self.assertIn("Security tags", text)


class LedgerTests(unittest.TestCase):
    def test_encrypt_roundtrip(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            ledger = LocalLedger(root / "ledger.enc", root / ".key")
            ledger.append("test", {"n": 1}, actor="unit")
            ledger.append("test", {"n": 2}, actor="unit")
            events = ledger.list_events(event_type="test")
            self.assertEqual(len(events), 2)
            self.assertTrue(ledger.verify())
            # Raw file should not be plain JSON
            raw = (root / "ledger.enc").read_bytes()
            self.assertNotIn(b'"type": "test"', raw)
            export = ledger.export_plain(root / "out.json")
            data = json.loads(export.read_text())
            self.assertEqual(len(data), 2)


if __name__ == "__main__":
    unittest.main()
