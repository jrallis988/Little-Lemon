package com.lattice.checkers.ui.components;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Faction;
import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Side;
import com.lattice.checkers.score.ScoreState;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.layout.ColumnConstraints;
import javafx.scene.layout.FlowPane;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.VBox;

/**
 * Frog or Traffic side panel. Renders {@link ScoreState} and captured tokens from GameState.
 */
public final class FactionHud extends VBox {

    private final GameController controller;
    private final Faction faction;
    private final Label scoreLabel;
    private final FlowPane captured;
    private final Label capturesStat;
    private final Label kingsStat;
    private final Label comboStat;
    private final Label movesStat;

    public FactionHud(GameController controller, Faction faction) {
        this.controller = controller;
        this.faction = faction;
        getStyleClass().addAll("faction-hud", faction == Faction.FROG ? "hud-frog" : "hud-traffic");
        setAlignment(Pos.TOP_LEFT);
        setSpacing(12);
        setPrefWidth(214);
        setMinWidth(204);
        setMaxWidth(240);

        PieceView emblem = new PieceView(new Piece(faction.side(), PieceRank.MAN), 24);
        Label name = new Label(faction.displayName());
        name.getStyleClass().add("hud-faction-name");
        Label player = new Label(faction.playerLabel());
        player.getStyleClass().add("hud-player-label");
        HBox identity = new HBox(10, emblem, new VBox(2, name, player));
        identity.setAlignment(Pos.CENTER_LEFT);

        scoreLabel = new Label("0");
        scoreLabel.getStyleClass().add("hud-score");
        Label scoreCaption = new Label("MATCH SCORE");
        scoreCaption.getStyleClass().add("hud-caption");
        VBox scoreBlock = new VBox(0, scoreLabel, scoreCaption);
        scoreBlock.setAlignment(Pos.CENTER_LEFT);

        Label capturedTitle = new Label("CAPTURED");
        capturedTitle.getStyleClass().add("hud-caption");
        captured = new FlowPane();
        captured.setHgap(5);
        captured.setVgap(5);
        captured.getStyleClass().add("hud-captured");

        capturesStat = statValue();
        kingsStat = statValue();
        comboStat = statValue();
        movesStat = statValue();
        GridPane stats = new GridPane();
        stats.setHgap(12);
        stats.setVgap(6);
        ColumnConstraints labels = new ColumnConstraints();
        labels.setHgrow(Priority.ALWAYS);
        ColumnConstraints values = new ColumnConstraints();
        values.setMinWidth(28);
        stats.getColumnConstraints().addAll(labels, values);
        addStat(stats, 0, "CAPTURES", capturesStat);
        addStat(stats, 1, "KINGS", kingsStat);
        addStat(stats, 2, "BEST COMBO", comboStat);
        addStat(stats, 3, "MOVES", movesStat);

        VBox statsBlock = new VBox(8, caption("STATS"), stats);
        getChildren().addAll(identity, scoreBlock, capturedTitle, captured, statsBlock);
        refresh();
    }

    public void refresh() {
        ScoreState scores = controller.scoreState();
        Side side = faction.side();
        scoreLabel.setText(String.format("%,d", scores.score(side)));
        capturesStat.setText(String.valueOf(scores.captures(side)));
        kingsStat.setText(String.valueOf(scores.kingsCreated(side)));
        comboStat.setText(String.valueOf(scores.bestCombo(side)));
        movesStat.setText(String.valueOf(scores.moves(side)));

        boolean active = controller.state()
                .filter(state -> state.status() == GameStatus.IN_PROGRESS)
                .map(state -> state.sideToMove() == side)
                .orElse(false);
        getStyleClass().remove("hud-active");
        if (active) {
            getStyleClass().add("hud-active");
        }

        captured.getChildren().clear();
        int taken = controller.capturedCount(side);
        Side victim = side.opposite();
        for (int i = 0; i < taken; i++) {
            captured.getChildren().add(new PieceView(new Piece(victim, PieceRank.MAN), 11));
        }
        if (taken == 0) {
            Label empty = new Label("—");
            empty.getStyleClass().add("muted-copy");
            captured.getChildren().add(empty);
        }
    }

    private static void addStat(GridPane grid, int row, String name, Label value) {
        Label label = new Label(name);
        label.getStyleClass().add("hud-stat-label");
        grid.add(label, 0, row);
        grid.add(value, 1, row);
    }

    private static Label caption(String text) {
        Label label = new Label(text);
        label.getStyleClass().add("hud-caption");
        return label;
    }

    private static Label statValue() {
        Label label = new Label("0");
        label.getStyleClass().add("hud-stat");
        return label;
    }
}
