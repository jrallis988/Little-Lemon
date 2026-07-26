"""Distraction-free text-first command interface for Thomas."""

from __future__ import annotations

import json
import shlex
from pathlib import Path
from typing import Any, Dict, List, Optional

from core.audit import CashCount, ShiftAuditor
from core.ingestion import ManifestIngestor
from core.logger import LocalLedger
from ui.components import (
    Banner,
    ConfirmPrompt,
    HighContrastTable,
    StatusLine,
    large_menu,
)


HELP_TEXT = """
Commands (keyboard-first):
  help                         Show this help
  status                       Store profile + ledger health
  ingest <manifest> [order]    Parse shipment; optional order sheet
  discrepancies                Show last discrepancy report
  unbox <sku> <qty> <zone>     Log unboxed items to staging zone
  trail                        Show back-room audit trail
  balance <reg> <sales> ...    Balance register (cash counts follow)
  safe <deposit_slips> ...     Count safe
  expense <cat> <amt> <desc>   Log store-use supply expense
  briefing <from> <to>         Generate shift-change briefing
  ledger [type] [limit]        List local ledger events
  menu                         Show large-target touch menu
  quit / exit                  Leave Thomas
""".strip()


class ThomasTerminal:
    """Interactive REPL optimized for quick ops entry."""

    def __init__(
        self,
        profile: Dict[str, Any],
        base_dir: Path,
        input_fn=input,
        output_fn=print,
    ):
        self.profile = profile
        self.base_dir = Path(base_dir)
        self.input_fn = input_fn
        self.output_fn = output_fn
        self.status = StatusLine()
        self.confirm = ConfirmPrompt(input_fn=input_fn, output_fn=output_fn)
        self.ingestor = ManifestIngestor(sku_map=profile.get("sku_map", {}))
        self.auditor = ShiftAuditor(
            drawer_float=float(profile.get("drawer_float", 200)),
            safe_float=float(profile.get("safe_float", 500)),
            deposit_tolerance=float(profile.get("deposit_tolerance", 0.05)),
        )
        ledger_path = self.base_dir / profile.get("ledger_path", "data/ledger.enc")
        key_path = self.base_dir / profile.get("key_path", "data/.thomas.key")
        self.ledger = LocalLedger(ledger_path, key_path)
        self.last_report = None
        self._running = False

    def _out(self, text: str = "") -> None:
        self.output_fn(text)

    def show_banner(self) -> None:
        banner = Banner(
            store_number=str(self.profile.get("store_number", "")),
            store_name=str(self.profile.get("store_name", "")),
        )
        self._out(banner.render())
        self._out(self.status.info("Local-first mode · no cloud sync"))
        self._out("Type 'help' or 'menu'. Shortcuts are single tokens.\n")

    def show_menu(self) -> None:
        self._out(
            large_menu(
                [
                    ("1", "ingest   — load truck manifest"),
                    ("2", "unbox    — log staging zone"),
                    ("3", "balance  — register drawer"),
                    ("4", "safe     — safe count"),
                    ("5", "expense  — store-use supplies"),
                    ("6", "briefing — shift change notes"),
                    ("7", "trail    — back-room log"),
                    ("8", "ledger   — encrypted audit trail"),
                    ("q", "quit"),
                ]
            )
        )

    def run(self) -> int:
        self._running = True
        self.show_banner()
        while self._running:
            try:
                raw = self.input_fn("thomas> ").strip()
            except (EOFError, KeyboardInterrupt):
                self._out("")
                break
            if not raw:
                continue
            try:
                self.dispatch(raw)
            except Exception as exc:  # keep session alive during ops hours
                self._out(self.status.fail(str(exc)))
        self._out(self.status.ok("Session closed. Data remains local."))
        return 0

    def dispatch(self, raw: str) -> None:
        parts = shlex.split(raw)
        cmd = parts[0].lower()
        args = parts[1:]

        # Large-target numeric shortcuts
        shortcuts = {
            "1": "ingest",
            "2": "unbox",
            "3": "balance",
            "4": "safe",
            "5": "expense",
            "6": "briefing",
            "7": "trail",
            "8": "ledger",
            "q": "quit",
        }
        cmd = shortcuts.get(cmd, cmd)

        handlers = {
            "help": lambda: self._out(HELP_TEXT),
            "?": lambda: self._out(HELP_TEXT),
            "menu": self.show_menu,
            "status": self.cmd_status,
            "ingest": lambda: self.cmd_ingest(args),
            "discrepancies": self.cmd_discrepancies,
            "unbox": lambda: self.cmd_unbox(args),
            "trail": self.cmd_trail,
            "balance": lambda: self.cmd_balance(args),
            "safe": lambda: self.cmd_safe(args),
            "expense": lambda: self.cmd_expense(args),
            "briefing": lambda: self.cmd_briefing(args),
            "ledger": lambda: self.cmd_ledger(args),
            "quit": self._stop,
            "exit": self._stop,
        }
        handler = handlers.get(cmd)
        if not handler:
            self._out(self.status.warn(f"Unknown command '{cmd}'. Type help."))
            return
        handler()

    def _stop(self) -> None:
        self._running = False

    def cmd_status(self) -> None:
        ok = self.ledger.verify()
        events = len(self.ledger.list_events())
        self._out(
            self.status.ok(
                f"Store {self.profile.get('store_number')} · ledger intact={ok} · events={events}"
            )
        )
        zones = ", ".join(self.profile.get("staging_zones", []))
        self._out(f"Staging zones: {zones}")
        self._out(f"SKU map entries: {len(self.profile.get('sku_map', {}))}")

    def cmd_ingest(self, args: List[str]) -> None:
        if not args:
            path = self.input_fn("Manifest path: ").strip()
        else:
            path = args[0]
        if not path:
            raise ValueError("Manifest path required")
        manifest_path = Path(path)
        if not manifest_path.is_absolute():
            manifest_path = (self.base_dir / manifest_path).resolve()

        lines = self.ingestor.parse_manifest_file(manifest_path)
        order_sheet = None
        if len(args) > 1:
            order_path = Path(args[1])
            if not order_path.is_absolute():
                order_path = (self.base_dir / order_path).resolve()
            order_sheet = self.ingestor.load_order_sheet(order_path)

        shipment_id = manifest_path.stem
        report = self.ingestor.reconcile(shipment_id, lines, order_sheet)
        self.last_report = report
        self.ledger.append(
            "manifest_ingest",
            {
                "shipment_id": shipment_id,
                "line_count": len(lines),
                "summary": report.summary(),
                "has_issues": report.has_issues,
            },
            actor="terminal",
        )

        self._out(self.status.ok(f"Ingested {len(lines)} lines from {manifest_path.name}"))
        summary = report.summary()
        table = HighContrastTable(["Issue", "Count"])
        for kind, count in summary.items():
            table.add_row([kind, count])
        self._out(table.render())
        if report.has_issues:
            self._out(self.status.warn("Discrepancies present — run 'discrepancies'"))
        else:
            self._out(self.status.ok("No discrepancies flagged"))

    def cmd_discrepancies(self) -> None:
        if not self.last_report:
            self._out(self.status.warn("No report yet. Run ingest first."))
            return
        table = HighContrastTable(["SKU", "Kind", "Exp", "Recv", "Dmg", "Detail"])
        for d in self.last_report.discrepancies:
            table.add_row([d.sku, d.kind, d.expected, d.received, d.damaged, d.detail])
        self._out(table.render())

    def cmd_unbox(self, args: List[str]) -> None:
        if len(args) < 3:
            raise ValueError("Usage: unbox <sku> <qty> <zone> [associate] [seconds]")
        sku, qty_s, zone = args[0], args[1], args[2]
        associate = args[3] if len(args) > 3 else "associate"
        seconds = int(args[4]) if len(args) > 4 else 0
        zones = {z.upper() for z in self.profile.get("staging_zones", [])}
        if zones and zone.upper() not in zones:
            raise ValueError(f"Unknown zone '{zone}'. Valid: {', '.join(sorted(zones))}")

        entry = self.ingestor.log_unboxed(
            sku=sku,
            qty=int(qty_s),
            zone=zone,
            associate=associate,
            seconds_to_process=seconds,
            shipment_id=self.last_report.shipment_id if self.last_report else "",
        )
        self.ledger.append("back_room_unbox", entry.__dict__, actor=associate)
        self._out(
            self.status.ok(
                f"Logged {entry.qty} x {entry.sku} → zone {entry.zone} ({entry.associate})"
            )
        )

    def cmd_trail(self) -> None:
        trail = self.ingestor.back_room_trail()
        table = HighContrastTable(["SKU", "Qty", "Zone", "Associate", "Sec", "Shipment"])
        for row in trail:
            table.add_row(
                [
                    row["sku"],
                    row["qty"],
                    row["zone"],
                    row["associate"],
                    row["seconds_to_process"],
                    row["shipment_id"] or "-",
                ]
            )
        self._out(table.render())

    def _read_cash_count(self) -> CashCount:
        self._out("Enter denomination counts (blank = 0). Large keys, explicit totals.")
        fields = [
            "hundreds",
            "fifties",
            "twenties",
            "tens",
            "fives",
            "ones",
            "quarters",
            "dimes",
            "nickels",
            "pennies",
        ]
        values = {}
        for name in fields:
            raw = self.input_fn(f"  {name}: ").strip()
            values[name] = int(raw) if raw else 0
        count = CashCount(**values)
        self._out(self.status.info(f"Cash total: ${count.total():.2f}"))
        if not self.confirm.confirm(f"accept cash total ${count.total():.2f}"):
            raise ValueError("Cash count cancelled")
        return count

    def cmd_balance(self, args: List[str]) -> None:
        if len(args) < 2:
            raise ValueError("Usage: balance <register_id> <sales_total> [payouts]")
        register_id = args[0]
        sales = float(args[1])
        payouts = float(args[2]) if len(args) > 2 else 0.0
        cash = self._read_cash_count()
        result = self.auditor.balance_register(register_id, sales, cash, payouts=payouts)
        self.ledger.append("register_balance", result.to_dict(), actor="terminal")
        msg = (
            f"{result.register_id}: var ${result.variance:+.2f} · "
            f"deposit ${result.deposit_amount:.2f}"
        )
        self._out(self.status.ok(msg) if result.within_tolerance else self.status.fail(msg))

    def cmd_safe(self, args: List[str]) -> None:
        slips = float(args[0]) if args else 0.0
        cash = self._read_cash_count()
        result = self.auditor.count_safe(cash, deposit_slips=slips)
        self.ledger.append(
            "safe_count",
            {
                "expected": result.expected,
                "counted": result.counted,
                "variance": result.variance,
                "within_tolerance": result.within_tolerance,
                "deposit_slips": result.deposit_slips,
            },
            actor="terminal",
        )
        msg = f"Safe var ${result.variance:+.2f}"
        self._out(self.status.ok(msg) if result.within_tolerance else self.status.fail(msg))

    def cmd_expense(self, args: List[str]) -> None:
        if len(args) < 3:
            raise ValueError("Usage: expense <category> <amount> <description...> [sku=]")
        category = args[0]
        amount = float(args[1])
        # Allow trailing sku=SKU-1001
        sku = ""
        desc_parts = []
        for token in args[2:]:
            if token.lower().startswith("sku="):
                sku = token.split("=", 1)[1]
            else:
                desc_parts.append(token)
        description = " ".join(desc_parts)
        entry = self.auditor.track_expense(category, description, amount, sku=sku)
        self.ledger.append("expense", entry.to_dict(), actor=entry.associate or "terminal")
        self._out(
            self.status.ok(
                f"Logged expense ${entry.amount:.2f} — {entry.description} [{entry.category}]"
            )
        )

    def cmd_briefing(self, args: List[str]) -> None:
        if len(args) < 2:
            raise ValueError("Usage: briefing <outgoing> <incoming>")
        text = self.auditor.shift_briefing(args[0], args[1])
        self.ledger.append(
            "shift_briefing",
            {"outgoing": args[0], "incoming": args[1]},
            actor=args[0],
        )
        self._out(text)

    def cmd_ledger(self, args: List[str]) -> None:
        event_type = args[0] if args else None
        limit = int(args[1]) if len(args) > 1 else 20
        events = self.ledger.list_events(event_type=event_type, limit=limit)
        table = HighContrastTable(["Time", "Type", "Actor", "ID"])
        for ev in events:
            table.add_row([ev.get("ts", "")[:19], ev.get("type"), ev.get("actor"), ev.get("id")])
        self._out(table.render())


def load_store_profile(path: Path) -> Dict[str, Any]:
    with path.open(encoding="utf-8") as fh:
        return json.load(fh)
