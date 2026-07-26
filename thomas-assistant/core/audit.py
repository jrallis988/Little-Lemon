"""Shift reconciliation, register balancing, and expense tracking."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional


DENOMINATIONS = (
    ("hundreds", 100.00),
    ("fifties", 50.00),
    ("twenties", 20.00),
    ("tens", 10.00),
    ("fives", 5.00),
    ("ones", 1.00),
    ("quarters", 0.25),
    ("dimes", 0.10),
    ("nickels", 0.05),
    ("pennies", 0.01),
)


@dataclass
class CashCount:
    hundreds: int = 0
    fifties: int = 0
    twenties: int = 0
    tens: int = 0
    fives: int = 0
    ones: int = 0
    quarters: int = 0
    dimes: int = 0
    nickels: int = 0
    pennies: int = 0

    def total(self) -> float:
        total = 0.0
        for name, value in DENOMINATIONS:
            total += getattr(self, name) * value
        return round(total, 2)

    def as_dict(self) -> Dict[str, int]:
        return {name: getattr(self, name) for name, _ in DENOMINATIONS}


@dataclass
class ExpenseEntry:
    category: str
    sku: str
    description: str
    amount: float
    quantity: int = 1
    associate: str = ""
    timestamp: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

    def to_dict(self) -> Dict[str, Any]:
        return {
            "category": self.category,
            "sku": self.sku,
            "description": self.description,
            "amount": round(self.amount, 2),
            "quantity": self.quantity,
            "associate": self.associate,
            "timestamp": self.timestamp,
        }


@dataclass
class BalanceResult:
    register_id: str
    expected: float
    counted: float
    variance: float
    within_tolerance: bool
    deposit_amount: float
    leave_float: float
    notes: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return {
            "register_id": self.register_id,
            "expected": self.expected,
            "counted": self.counted,
            "variance": self.variance,
            "within_tolerance": self.within_tolerance,
            "deposit_amount": self.deposit_amount,
            "leave_float": self.leave_float,
            "notes": self.notes,
        }


@dataclass
class SafeCountResult:
    expected: float
    counted: float
    variance: float
    within_tolerance: bool
    deposit_slips: float
    notes: str = ""


class ShiftAuditor:
    """End-of-day balancing, supply expenses, and shift-change briefings."""

    def __init__(
        self,
        drawer_float: float = 200.00,
        safe_float: float = 500.00,
        deposit_tolerance: float = 0.05,
    ):
        self.drawer_float = float(drawer_float)
        self.safe_float = float(safe_float)
        self.deposit_tolerance = float(deposit_tolerance)
        self.expenses: List[ExpenseEntry] = []
        self.register_results: List[BalanceResult] = []
        self.safe_result: Optional[SafeCountResult] = None
        self.exceptions: List[str] = []

    @staticmethod
    def sum_cash_count(count: CashCount | Dict[str, int]) -> float:
        if isinstance(count, dict):
            count = CashCount(**{k: int(count.get(k, 0)) for k, _ in DENOMINATIONS})
        return count.total()

    def balance_register(
        self,
        register_id: str,
        sales_total: float,
        cash_count: CashCount | Dict[str, int],
        payouts: float = 0.0,
        notes: str = "",
    ) -> BalanceResult:
        """Reconcile drawer: float + sales - payouts vs physical count."""
        counted = self.sum_cash_count(cash_count)
        expected = round(self.drawer_float + float(sales_total) - float(payouts), 2)
        variance = round(counted - expected, 2)
        within = abs(variance) <= self.deposit_tolerance
        leave_float = self.drawer_float
        deposit_amount = round(max(0.0, counted - leave_float), 2)

        result = BalanceResult(
            register_id=register_id,
            expected=expected,
            counted=counted,
            variance=variance,
            within_tolerance=within,
            deposit_amount=deposit_amount,
            leave_float=leave_float,
            notes=notes,
        )
        self.register_results.append(result)
        if not within:
            self.exceptions.append(
                f"Register {register_id}: variance ${variance:+.2f} (tol ${self.deposit_tolerance:.2f})"
            )
        return result

    def count_safe(
        self,
        cash_count: CashCount | Dict[str, int],
        deposit_slips: float = 0.0,
        notes: str = "",
    ) -> SafeCountResult:
        counted = self.sum_cash_count(cash_count)
        expected = round(self.safe_float + float(deposit_slips), 2)
        variance = round(counted - expected, 2)
        within = abs(variance) <= self.deposit_tolerance
        self.safe_result = SafeCountResult(
            expected=expected,
            counted=counted,
            variance=variance,
            within_tolerance=within,
            deposit_slips=round(float(deposit_slips), 2),
            notes=notes,
        )
        if not within:
            self.exceptions.append(
                f"Safe: variance ${variance:+.2f} (tol ${self.deposit_tolerance:.2f})"
            )
        return self.safe_result

    def track_expense(
        self,
        category: str,
        description: str,
        amount: float,
        sku: str = "",
        quantity: int = 1,
        associate: str = "",
    ) -> ExpenseEntry:
        entry = ExpenseEntry(
            category=category.strip().lower(),
            sku=sku,
            description=description,
            amount=float(amount),
            quantity=int(quantity),
            associate=associate,
        )
        self.expenses.append(entry)
        return entry

    def expense_total(self, category: Optional[str] = None) -> float:
        items = self.expenses
        if category:
            items = [e for e in items if e.category == category.lower()]
        return round(sum(e.amount * e.quantity for e in items), 2)

    def add_exception(self, note: str) -> None:
        text = note.strip()
        if text:
            self.exceptions.append(text)

    def shift_briefing(
        self,
        outgoing: str,
        incoming: str,
        extra_notes: Optional[List[str]] = None,
    ) -> str:
        """Concise shift-change notes — no corporate jargon."""
        lines = [
            "SHIFT CHANGE BRIEFING",
            f"From: {outgoing}  →  To: {incoming}",
            f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}",
            "",
            "REGISTERS",
        ]
        if not self.register_results:
            lines.append("  (none balanced yet)")
        else:
            for r in self.register_results:
                flag = "OK" if r.within_tolerance else "CHECK"
                lines.append(
                    f"  [{flag}] {r.register_id}: counted ${r.counted:.2f} "
                    f"expected ${r.expected:.2f} var ${r.variance:+.2f} "
                    f"deposit ${r.deposit_amount:.2f}"
                )

        lines.append("")
        lines.append("SAFE")
        if self.safe_result is None:
            lines.append("  (not counted)")
        else:
            s = self.safe_result
            flag = "OK" if s.within_tolerance else "CHECK"
            lines.append(
                f"  [{flag}] counted ${s.counted:.2f} expected ${s.expected:.2f} "
                f"var ${s.variance:+.2f}"
            )

        lines.append("")
        lines.append("STORE-USE / SUPPLIES")
        if not self.expenses:
            lines.append("  (none logged)")
        else:
            for e in self.expenses:
                lines.append(
                    f"  - {e.description} x{e.quantity}: ${e.amount * e.quantity:.2f} ({e.category})"
                )
            lines.append(f"  Total overhead logged: ${self.expense_total():.2f}")

        lines.append("")
        lines.append("EXCEPTIONS")
        notes = list(self.exceptions)
        if extra_notes:
            notes.extend(extra_notes)
        if not notes:
            lines.append("  None")
        else:
            for note in notes:
                lines.append(f"  ! {note}")

        lines.append("")
        lines.append("End of briefing.")
        return "\n".join(lines)
