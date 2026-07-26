#!/usr/bin/env python3
"""Thomas — retail-focused, local-first virtual assistant.

Entry point for back-room inventory reconciliation, shipment processing,
and store shift audits. All operational data stays on the local machine.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

# Allow `python main.py` from thomas-assistant/ without installing a package
BASE_DIR = Path(__file__).resolve().parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from ui.terminal import ThomasTerminal, load_store_profile  # noqa: E402


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="thomas",
        description="Thomas — local-first retail ops assistant",
    )
    parser.add_argument(
        "--profile",
        default=str(BASE_DIR / "config" / "store_profile.json"),
        help="Path to store_profile.json",
    )
    parser.add_argument(
        "--command",
        "-c",
        action="append",
        default=[],
        help="Run a single command non-interactively (repeatable)",
    )
    parser.add_argument(
        "--demo",
        action="store_true",
        help="Run a short local demo against sample manifests",
    )
    return parser


def run_demo(terminal: ThomasTerminal) -> int:
    samples = BASE_DIR / "samples"
    commands = [
        "status",
        f"ingest {samples / 'inbound_manifest.csv'} {samples / 'order_sheet.csv'}",
        "discrepancies",
        "unbox SKU-2001 12 A1 jordan 90",
        "unbox SKU-3001 4 DAMAGED jordan 45",
        "trail",
        "expense supply 8.50 Packing tape restock sku=SKU-1001",
        "briefing jordan morgan",
        "ledger",
    ]
    terminal.show_banner()
    for raw in commands:
        terminal._out(f"thomas> {raw}")
        # Demo cash prompts need canned answers for balance/safe — skipped here
        terminal.dispatch(raw)
        terminal._out("")
    return 0


def run_scripted(terminal: ThomasTerminal, commands: list[str]) -> int:
    terminal.show_banner()
    for raw in commands:
        terminal.dispatch(raw)
    return 0


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    profile_path = Path(args.profile).resolve()
    if not profile_path.exists():
        print(f"Store profile not found: {profile_path}", file=sys.stderr)
        return 1

    profile = load_store_profile(profile_path)
    terminal = ThomasTerminal(profile=profile, base_dir=BASE_DIR)

    if args.demo:
        return run_demo(terminal)
    if args.command:
        return run_scripted(terminal, args.command)
    return terminal.run()


if __name__ == "__main__":
    raise SystemExit(main())
