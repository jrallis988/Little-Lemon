package com.lattice.checkers.ui.components;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Faction;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Side;
import com.lattice.checkers.score.ScoreState;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.layout.FlowPane;
import javafx.scene.layout.HBox;
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
        setAlignment(Pos.TOP_CENTER);
        setSpacing(10);
        setPrefWidth(196);

        PieceView emblem = new PieceView(new Piece(faction.side(), PieceRank.MAN), 22);
        Label name = new Label(faction.displayName());
        name.getStyleClass().add("hud-faction-name");
        Label player = new Label(faction.playerLabel());
        player.getStyleClass().add("hud-player-label");

        scoreLabel = new Label("0");
        scoreLabel.getStyleClass().add("hud-score");
        Label scoreCaption = new Label("MATCH SCORE");
        scoreCaption.getStyleClass().add("hud-caption");

        Label capturedTitle = new Label("CAPTURED");
        capturedTitle.getStyleClass().add("hud-caption");
        captured = new FlowPane();
        captured.setHgap(4);
        captured.setVgap(4);
        captured.getStyleClass().add("hud-captured");

        capturesStat = statRow("CAPTURES");
        kingsStat = statRow("KINGS");
        comboStat = statRow("BEST COMBO");
        movesStat = statRow("MOVES");

        VBox stats = new VBox(4, caption("STATS"), capturesStat, kingsStat, comboStat, movesStat);
        getChildren().addAll(
                new HBox(8, emblem, new VBox(2, name, player)),
                scoreLabel,
                scoreCaption,
                capturedTitle,
                captured,
                stats
        );
        refresh();
    }

    public void refresh() {
        ScoreState scores = controller.scoreState();
        Side side = faction.side();
        scoreLabel.setText(String.format("%,d", scores.score(side)));
        setStat(capturesStat, "CAPTURES", scores.captures(side));
        setStat(kingsStat, "KINGS", scores.kingsCreated(side));
        setStat(comboStat, "BEST COMBO", scores.bestCombo(side));
        setStat(movesStat, "MOVES", scores.moves(side));

        captured.getChildren().clear();
        int taken = controller.capturedCount(side);
        Side victim = side.opposite();
        for (int i = 0; i < taken; i++) {
            captured.getChildren().add(new PieceView(new Piece(victim, PieceRank.MAN), 10));
        }
        if (taken == 0) {
            Label empty = new Label("—");
            empty.getStyleClass().add("muted-copy");
            captured.getChildren().add(empty);
        }
    }

    private static Label caption(String text) {
        Label label = new Label(text);
        label.getStyleClass().add("hud-caption");
        return label;
    }

    private static Label statRow(String name) {
        Label label = new Label(name + "    0");
        label.getStyleClass().add("hud-stat");
        return label;
    }

    private static void setStat(Label label, String name, int value) {
        label.setText(name + "    " + value);
    }
}
