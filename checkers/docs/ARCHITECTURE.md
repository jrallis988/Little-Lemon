# Lattice — Architecture (Phase 1)

> Status: **Phase 1 complete** — project scaffold, package layout, and class contracts.
> Rules, AI, UI, and tests are intentionally **not** implemented yet.

## Product

**Lattice** is a desktop American checkers application built to demonstrate
serious Java engineering: a rules engine separable from the UI, a profile-driven
AI, match analysis, and developer-facing instrumentation.

Three product pillars:

| Pillar | Intent |
| --- | --- |
| **Play** | Complete American checkers with a polished board experience |
| **Analyze** | Replay, turning points, and “What If?” branches from real game data |
| **Understand** | Developer Mode, X-Ray, and AI Lab expose how the engine decides |

One visual system only — no selectable themes or skins. See [VISUAL_IDENTITY.md](VISUAL_IDENTITY.md).

## Layer diagram

```
JAVA APPLICATION
       │
       ▼
      UI  (JavaFX screens / components / theme)
       │
       ▼
 GAME CONTROLLER  (orchestrates turns, modes, history)
       │
       ▼
 RULES ENGINE  (MoveGenerator · CaptureDetector · validation)
       │
       ▼
   GAME STATE  (Board · Piece · Move · Player · status)
       │
       ▼
   AI ENGINE  (profiles · EvaluationFunction · Minimax + α-β)
```

Independently:

```
GAME STATE ──► HISTORY (snapshots / move records)
           ──► ANALYSIS (match stats / turning points / X-Ray)
           ──► AI LAB (AI vs AI simulation using the same engine)
```

**Hard boundary:** packages `model`, `engine`, `ai`, `history`, and `analysis`
must not depend on JavaFX. The UI talks only through `controller` (and read-only
view of engine diagnostics). Engine and AI are unit-testable with JUnit alone.

## Package map

```
com.lattice.checkers
├── model/          Immutable-leaning domain types and mutable GameState
├── engine/         American checkers rules — no UI knowledge
├── ai/             Search, evaluation profiles, search telemetry
├── history/        Move log, board snapshots, replay reconstruction
├── analysis/       Match analytics, X-Ray annotations, What If branches
├── controller/     Application façade between UI and domain
└── ui/             JavaFX application, screens, components, theme
```

## Major types (contracts)

### `model`

| Type | Kind | Responsibility |
| --- | --- | --- |
| `Position` | record | Board coordinate `(row, col)` with bounds helpers |
| `Side` | enum | `DARK` / `LIGHT` — players distinguished by shape+label, not color alone |
| `PieceRank` | enum | `MAN` / `KING` |
| `Piece` | record | Side + rank |
| `Move` | record | From/to path; multi-jump as ordered landing sequence |
| `Player` | class | Human or AI participant + optional `AIProfile` |
| `PlayerKind` | enum | `HUMAN` / `COMPUTER` |
| `GameStatus` | enum | `IN_PROGRESS`, `DARK_WINS`, `LIGHT_WINS`, `RESIGNED`, … |
| `Board` | class | 8×8 occupancy; cloneable for search/history |
| `GameState` | class | Board + side to move + status + capture context |

### `engine`

| Type | Responsibility |
| --- | --- |
| `RulesEngine` | Public façade: legal moves, apply move, win/resign/restart |
| `MoveGenerator` | Generate all legal moves for a side (honors mandatory capture) |
| `CaptureDetector` | Detect jump opportunities and multi-jump continuations |
| `MoveValidator` | Accept/reject a candidate move against current state |
| `EngineDiagnostics` | Snapshot of turn stats for Developer Mode |

### `ai`

| Type | Responsibility |
| --- | --- |
| `AIProfile` | Named weight set: `AGGRESSOR`, `DEFENDER`, `STRATEGIST` |
| `EvaluationFunction` | Score a position using profile weights |
| `MinimaxSearch` | Depth-limited minimax with alpha-beta pruning |
| `CheckersAI` | Choose a move; expose `SearchStats` |
| `SearchStats` | Depth, nodes, evaluation, decision time |

### `history` / `analysis`

| Type | Responsibility |
| --- | --- |
| `BoardSnapshot` | Immutable board+side capture for reconstruction |
| `MoveRecord` | Move + optional metadata (capture, promotion) |
| `GameHistory` | Append-only main line; supports branching for What If |
| `MatchAnalyzer` | Derived stats only — no fabricated analytics |
| `TurningPointDetector` | Largest evaluation swings / exchanges |
| `XRayAnalyzer` | Labels: THREATENED, PROTECTED, FORCED_CAPTURE, KING_PATH, VULNERABLE |
| `WhatIfSession` | Branch from a snapshot without mutating original history |

### `controller` / `ui`

| Type | Responsibility |
| --- | --- |
| `GameController` | New game, select/move, resign, restart, mode toggles |
| `AppMode` | Flags: Focus, X-Ray, Developer |
| `LatticeApplication` | JavaFX entry point |
| Screens | Home, New Game, Board, Match Complete, Analysis, AI Lab |

## AI profiles (behavioral, not cosmetic)

Profiles differ by **evaluation weights**, not by randomness:

| Profile | Emphasizes |
| --- | --- |
| `AGGRESSOR` | Captures, pressure, attacking mobility |
| `DEFENDER` | Piece preservation, protected structure |
| `STRATEGIST` | Central control, mobility, promotion paths |

Difficulty (search depth / time) can still vary, but style comes from weights.

## Testing strategy (later phases)

JUnit 5 covers `engine` first: movement, illegal moves, mandatory/multi-jump
captures, kings, edges, win/no-moves, state reconstruction, AI move legality.
UI is exercised manually; engine must never require a display.

## Implementation phases

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | Project setup & architecture | **This deliverable** |
| 2 | Board, pieces, game-state model | Pending |
| 3 | Complete rules engine | Pending |
| 4 | JUnit tests for rules | Pending |
| 5 | Basic JavaFX playable board | Pending |
| 6 | Final game interface | Pending |
| 7 | Computer opponent | Pending |
| 8 | Focus & X-Ray | Pending |
| 9 | History & replay | Pending |
| 10 | Match analysis & What If? | Pending |
| 11 | Developer Mode | Pending |
| 12 | AI Lab | Pending |
| 13 | Accessibility, polish, final testing | Pending |

## Technology

| Choice | Version / note |
| --- | --- |
| JDK | 21 (LTS) |
| JavaFX | 21.0.12 (LTS, matched to JDK 21) |
| Build | Maven 3.8+ |
| Tests | JUnit 5 |
| Extra frameworks | None |

## Design principles

1. **Engine first** — rules live in `engine`, never in JavaFX handlers.
2. **Small types** — prefer records/enums; avoid god classes.
3. **Honest analytics** — every label and statistic comes from computed state.
4. **One identity** — a single visual system; kings are stacked discs.
5. **Accessible by default** — keyboard, contrast, non-color cues, reduced motion.
