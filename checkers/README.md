# Lattice

American checkers for the desktop — play, analyze, and inspect the engine.

> **Status:** Playable Human vs Human board with American checkers rules.
> AI, Focus/X-Ray, analysis, and Developer Mode are still stubbed for later phases.

## Why this exists

Lattice is a portfolio project demonstrating Java craft beyond a playable board:

- Object-oriented separation of **engine** and **UI**
- Complete American checkers rules with JUnit coverage
- Profile-driven minimax AI (Aggressor / Defender / Strategist) — *next*
- Match history, analysis, and “What If?” branching — *later*
- Developer Mode and AI Lab — *later*

It is built to look and behave like a product, not a tutorial assignment.

## Technology

| Layer | Choice |
| --- | --- |
| Language | Java 21 |
| UI | JavaFX 21.0.12 |
| Build | Maven |
| Tests | JUnit 5 |

No unnecessary frameworks.

## Architecture (summary)

```
UI (JavaFX)
  → GameController
    → RulesEngine
      → GameState

GameState
  → AI Engine (Minimax + EvaluationFunction + AIProfile)
```

Full package map, class contracts, and phase plan:
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

Visual system (single identity, no themes):
[docs/VISUAL_IDENTITY.md](docs/VISUAL_IDENTITY.md)

## Repository layout

```
checkers/
├── pom.xml
├── README.md
├── docs/
│   ├── ARCHITECTURE.md
│   └── VISUAL_IDENTITY.md
└── src/
    ├── main/java/com/lattice/checkers/
    │   ├── model/
    │   ├── engine/
    │   ├── ai/
    │   ├── history/
    │   ├── analysis/
    │   ├── controller/
    │   └── ui/
    ├── main/resources/com/lattice/checkers/
    └── test/java/com/lattice/checkers/
```

## Planned screens

1. Home — Play / Analysis / AI Lab  
2. New Game — human vs human or computer + AI profile  
3. Game Board — primary play surface (Focus, X-Ray, Developer as modes)  
4. Match Complete — result and basic stats  
5. Match Analysis — timeline, turning points, What If?  
6. AI Lab — AI vs AI with live search stats  

## How to build (Phase 1)

Requires JDK 21+ and Maven 3.8+.

```bash
cd checkers
mvn -q test
mvn javafx:run          # opens gallery + navigable screen stubs
```

Export PNG previews of every screen stub:

```bash
mvn -q -DskipTests compile
java --module-path "$HOME/.m2/repository/org/openjfx/javafx-controls/21.0.12:..." \
  --add-modules javafx.controls,javafx.graphics,javafx.swing \
  -cp target/classes com.lattice.checkers.ui.ScreenExport target/screen-previews
```

Or from the app chrome: **All screens** opens the gallery.

## Status honesty

| Capability | Now |
| --- | --- |
| Maven + package architecture | Yes |
| American checkers rules engine | Yes (mandatory captures, multi-jump, kings, win/resign) |
| Human vs Human playable board | Yes |
| Polished Graphite Lattice UI | In progress (single visual system) |
| AI / Focus / X-Ray / Analysis / AI Lab | Not yet |
| Screenshots | See PR / artifacts |
