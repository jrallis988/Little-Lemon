package com.lattice.checkers.ui.screens;

import com.lattice.checkers.analysis.MatchAnalyzer;
import com.lattice.checkers.analysis.MoveAnalysis;
import com.lattice.checkers.analysis.WhatIfSession;
import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.history.GameHistory;
import com.lattice.checkers.history.MoveRecord;
import com.lattice.checkers.model.Faction;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.ui.LatticeApplication;
import com.lattice.checkers.ui.components.BoardView;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.Region;
import javafx.scene.layout.VBox;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;

/**
 * Replay a recorded match and optionally explore a What If branch.
 * The main-line history is never overwritten.
 */
public final class MatchAnalysisScreen {

    private final VBox root;
    private final GameController controller;
    private BoardView boardView;
    private Label plyLabel;
    private Label moveLabel;
    private Label tagsLabel;
    private Label turningPointLabel;
    private Label whatIfStatus;
    private Slider slider;
    private Button start;
    private Button back;
    private Button next;
    private Button end;
    private Button exploreBtn;
    private Button resetBtn;
    private Button leaveBtn;
    private int ply;
    private GameHistory history;
    private List<MoveAnalysis> analyses = List.of();
    private WhatIfSession session;

    public MatchAnalysisScreen() {
        this(null, null, true);
    }

    public MatchAnalysisScreen(GameController controller, Consumer<String> onNavigate) {
        this(controller, onNavigate, true);
    }

    public MatchAnalysisScreen(
            GameController controller, Consumer<String> onNavigate, boolean reducedMotion) {
        this.controller = controller;
        Label brand = new Label(LatticeApplication.WORDMARK);
        brand.getStyleClass().addAll("arcade-title", "board-wordmark");
        Label title = new Label("MATCH ANALYSIS");
        title.getStyleClass().add("screen-title");
        Label subtitle = new Label(
                "Replay the recorded match, or try a different line. The original game stays intact.");
        subtitle.getStyleClass().add("screen-subtitle");
        subtitle.setWrapText(true);

        VBox header = new VBox(6, brand, title, subtitle);
        header.setAlignment(Pos.CENTER_LEFT);

        if (controller == null || controller.history().initial().isEmpty()) {
            Label empty = ScreenStub.muted("Play a match first, then open analysis from Match Complete.");
            Button home = navButton("HOME", () -> {
                if (onNavigate != null) {
                    onNavigate.accept("home");
                }
            });
            root = new VBox(18, header, empty, home);
            root.setPadding(new Insets(28, 36, 28, 36));
            root.getStyleClass().addAll("screen-root", "analysis-root");
            return;
        }

        history = controller.history();
        MatchAnalyzer analyzer = new MatchAnalyzer();
        MatchAnalyzer.MatchReport report = analyzer.analyze(history);
        analyses = analyzer.moveAnalyses(history);
        ply = history.size();

        boardView = new BoardView(controller, ignored -> refreshExploreHud(), reducedMotion);
        boardView.setInputEnabled(false);

        plyLabel = new Label();
        plyLabel.getStyleClass().add("panel-heading");
        moveLabel = new Label();
        moveLabel.getStyleClass().add("analysis-move");
        moveLabel.setWrapText(true);
        tagsLabel = new Label();
        tagsLabel.getStyleClass().add("muted-copy");
        tagsLabel.setWrapText(true);

        slider = new Slider(0, history.size(), ply);
        slider.setMajorTickUnit(1);
        slider.setMinorTickCount(0);
        slider.setSnapToTicks(true);
        slider.setBlockIncrement(1);
        slider.valueProperty().addListener((obs, old, value) -> {
            if (session != null) {
                return;
            }
            int nextPly = value.intValue();
            if (nextPly != ply) {
                ply = nextPly;
                showPly();
            }
        });

        start = navButton("START", () -> jumpTo(0));
        back = navButton("BACK", () -> jumpTo(ply - 1));
        next = navButton("NEXT", () -> jumpTo(ply + 1));
        end = navButton("END", () -> jumpTo(history.size()));
        HBox stepper = new HBox(8, start, back, next, end);
        stepper.setAlignment(Pos.CENTER);

        VBox timeline = new VBox(10, plyLabel, moveLabel, tagsLabel, slider, stepper);
        timeline.getStyleClass().add("preview-panel");
        timeline.setPadding(new Insets(16));

        VBox stats = ScreenStub.panel(
                "MATCH STATS",
                "Moves  " + report.totalMoves()
                        + "\nFrogger captures  " + report.capturesDark()
                        + "\nTraffic captures  " + report.capturesLight()
                        + "\nFrogger kings  " + report.kingsDark()
                        + "\nTraffic kings  " + report.kingsLight()
        );

        turningPointLabel = new Label();
        turningPointLabel.getStyleClass().add("muted-copy");
        turningPointLabel.setWrapText(true);
        VBox turning = new VBox(6,
                labeled("TURNING POINT"),
                turningPointLabel
        );
        turning.getStyleClass().add("preview-panel");
        turning.setPadding(new Insets(16));
        report.turningPoint().ifPresentOrElse(
                record -> turningPointLabel.setText(
                        "Ply " + (record.plyIndex() + 1) + "  ·  "
                                + Faction.of(record.side()).displayName() + "  "
                                + record.notation()),
                () -> turningPointLabel.setText("No swing yet — the opening is still even.")
        );

        whatIfStatus = new Label(
                "Try a different move from this ply. The recorded match stays intact.");
        whatIfStatus.getStyleClass().add("muted-copy");
        whatIfStatus.setWrapText(true);
        exploreBtn = navButton("EXPLORE THIS PLY", this::startExplore);
        exploreBtn.getStyleClass().add("primary-cta");
        resetBtn = navButton("RESET BRANCH", this::resetExplore);
        leaveBtn = navButton("BACK TO REPLAY", this::leaveExplore);
        resetBtn.setVisible(false);
        resetBtn.setManaged(false);
        leaveBtn.setVisible(false);
        leaveBtn.setManaged(false);
        HBox whatIfActions = new HBox(8, exploreBtn, resetBtn, leaveBtn);
        whatIfActions.setAlignment(Pos.CENTER_LEFT);
        VBox whatIf = new VBox(8, labeled("WHAT IF?"), whatIfStatus, whatIfActions);
        whatIf.getStyleClass().add("preview-panel");
        whatIf.setPadding(new Insets(16));

        Button complete = navButton("MATCH COMPLETE", () -> {
            if (onNavigate != null) {
                onNavigate.accept("match-complete");
            }
        });
        Button home = navButton("HOME", () -> {
            if (onNavigate != null) {
                onNavigate.accept("home");
            }
        });
        HBox nav = new HBox(10, complete, home);
        nav.setAlignment(Pos.CENTER_LEFT);

        VBox sidebar = new VBox(12, timeline, stats, turning, whatIf, nav);
        sidebar.setPrefWidth(320);
        sidebar.setMinWidth(280);

        Region spacer = new Region();
        HBox.setHgrow(spacer, Priority.ALWAYS);
        HBox stage = new HBox(20, boardView, sidebar, spacer);
        stage.setAlignment(Pos.TOP_CENTER);
        HBox.setHgrow(sidebar, Priority.NEVER);

        root = new VBox(16, header, stage);
        root.setPadding(new Insets(20, 28, 24, 28));
        root.getStyleClass().addAll("screen-root", "analysis-root");
        showPly();
    }

    public VBox getRoot() {
        return root;
    }

    public static String screenId() {
        return "match-analysis";
    }

    public static String displayName() {
        return "Match Analysis";
    }

    private void jumpTo(int target) {
        if (history == null || session != null) {
            return;
        }
        ply = Math.max(0, Math.min(history.size(), target));
        if (slider != null && (int) slider.getValue() != ply) {
            slider.setValue(ply);
        }
        showPly();
    }

    private void showPly() {
        if (boardView == null || history == null || session != null) {
            return;
        }
        GameState state = history.reconstruct(ply);
        Move last = history.recordAt(ply - 1).map(MoveRecord::move).orElse(null);
        boardView.showReplay(state, last);

        if (ply == 0) {
            plyLabel.setText("OPENING  ·  0 / " + history.size());
            moveLabel.setText("Start position. Frogger moves first.");
            tagsLabel.setText(" ");
            return;
        }
        MoveRecord record = history.recordAt(ply - 1).orElseThrow();
        plyLabel.setText("PLY  " + ply + "  /  " + history.size());
        moveLabel.setText(Faction.of(record.side()).displayName() + "  " + record.notation());
        String tags = analyses.stream()
                .filter(analysis -> analysis.record().plyIndex() == record.plyIndex())
                .findFirst()
                .map(analysis -> analysis.tags().isEmpty()
                        ? "Quiet move"
                        : String.join("  ·  ", analysis.tags()))
                .orElse(" ");
        tagsLabel.setText(tags);
    }

    private void startExplore() {
        if (controller == null || history == null) {
            return;
        }
        GameState at = history.reconstruct(ply);
        session = new WhatIfSession(
                history.snapshotAt(ply),
                at,
                controller.rulesEngine()
        );
        setReplayEnabled(false);
        exploreBtn.setVisible(false);
        exploreBtn.setManaged(false);
        resetBtn.setVisible(true);
        resetBtn.setManaged(true);
        leaveBtn.setVisible(true);
        leaveBtn.setManaged(true);
        boardView.showExplore(explorePlay());
        refreshExploreHud();
    }

    private void resetExplore() {
        if (session == null) {
            return;
        }
        session.reset();
        boardView.showExplore(explorePlay());
        refreshExploreHud();
    }

    private void leaveExplore() {
        session = null;
        setReplayEnabled(true);
        exploreBtn.setVisible(true);
        exploreBtn.setManaged(true);
        resetBtn.setVisible(false);
        resetBtn.setManaged(false);
        leaveBtn.setVisible(false);
        leaveBtn.setManaged(false);
        whatIfStatus.setText("Try a different move from this ply. The recorded match stays intact.");
        showPly();
    }

    private void refreshExploreHud() {
        if (session == null) {
            return;
        }
        int branch = session.branchPly();
        plyLabel.setText("WHAT IF  ·  ply " + ply + "  +  " + branch);
        session.lastRecord().ifPresentOrElse(
                record -> {
                    moveLabel.setText(Faction.of(record.side()).displayName() + "  " + record.notation());
                    tagsLabel.setText(record.captureCount() > 0
                            ? "Branch capture"
                            : record.promoted() ? "Branch promotion" : "Branch move");
                },
                () -> {
                    moveLabel.setText(Faction.of(session.current().sideToMove()).displayName()
                            + " to move — try a different line.");
                    tagsLabel.setText("Recorded match is unchanged.");
                }
        );
        whatIfStatus.setText(session.current().status().isTerminal()
                ? "This branch is over. Reset or return to replay."
                : "Playing a branch. Reset anytime — the original match is safe.");
    }

    private void setReplayEnabled(boolean enabled) {
        slider.setDisable(!enabled);
        start.setDisable(!enabled);
        back.setDisable(!enabled);
        next.setDisable(!enabled);
        end.setDisable(!enabled);
    }

    private BoardView.ExplorePlay explorePlay() {
        return new BoardView.ExplorePlay() {
            @Override
            public GameState state() {
                return session.current();
            }

            @Override
            public Optional<Position> selected() {
                return session.selected();
            }

            @Override
            public List<Position> legalDestinations() {
                return session.legalDestinations();
            }

            @Override
            public List<Move> legalMoves() {
                return session.legalMoves();
            }

            @Override
            public List<Move> legalMovesFromSelection() {
                return session.legalMovesFromSelection();
            }

            @Override
            public boolean hasForcedCapture() {
                return session.hasForcedCapture();
            }

            @Override
            public Optional<Move> lastMove() {
                return session.lastMove();
            }

            @Override
            public boolean lastPromoted() {
                return session.lastPromoted();
            }

            @Override
            public int branchPly() {
                return session.branchPly();
            }

            @Override
            public void selectSquare(Position position) {
                session.selectSquare(position);
            }
        };
    }

    private static Label labeled(String text) {
        Label label = new Label(text);
        label.getStyleClass().add("panel-heading");
        return label;
    }

    private static Button navButton(String text, Runnable action) {
        Button button = new Button(text);
        button.getStyleClass().add("action-button");
        button.setOnAction(e -> action.run());
        return button;
    }
}
