package com.lattice.checkers.ui.screens;

import com.lattice.checkers.analysis.MatchAnalyzer;
import com.lattice.checkers.analysis.MoveAnalysis;
import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.history.GameHistory;
import com.lattice.checkers.history.MoveRecord;
import com.lattice.checkers.model.Faction;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
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
import java.util.function.Consumer;

/**
 * Replay a recorded match on the Crossing board. Statistics come from GameHistory.
 */
public final class MatchAnalysisScreen {

    private final VBox root;
    private BoardView boardView;
    private Label plyLabel;
    private Label moveLabel;
    private Label tagsLabel;
    private Label turningPointLabel;
    private Slider slider;
    private int ply;
    private GameHistory history;
    private List<MoveAnalysis> analyses = List.of();

    public MatchAnalysisScreen() {
        this(null, null, true);
    }

    public MatchAnalysisScreen(GameController controller, Consumer<String> onNavigate) {
        this(controller, onNavigate, true);
    }

    public MatchAnalysisScreen(
            GameController controller, Consumer<String> onNavigate, boolean reducedMotion) {
        Label brand = new Label(LatticeApplication.WORDMARK);
        brand.getStyleClass().addAll("arcade-title", "board-wordmark");
        Label title = new Label("MATCH ANALYSIS");
        title.getStyleClass().add("screen-title");
        Label subtitle = new Label(
                "Replay the recorded match. Every statistic comes from the move log.");
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

        boardView = new BoardView(controller, ignored -> { }, reducedMotion);
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
            int next = value.intValue();
            if (next != ply) {
                ply = next;
                showPly();
            }
        });

        Button start = navButton("START", () -> jumpTo(0));
        Button back = navButton("BACK", () -> jumpTo(ply - 1));
        Button next = navButton("NEXT", () -> jumpTo(ply + 1));
        Button end = navButton("END", () -> jumpTo(history.size()));
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

        VBox whatIf = ScreenStub.panel(
                "WHAT IF?",
                "Branch from a ply without overwriting this match — next."
        );

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
        VBox.setVgrow(timeline, Priority.NEVER);

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
        if (history == null) {
            return;
        }
        ply = Math.max(0, Math.min(history.size(), target));
        if (slider != null && (int) slider.getValue() != ply) {
            slider.setValue(ply);
        }
        showPly();
    }

    private void showPly() {
        if (boardView == null || history == null) {
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
