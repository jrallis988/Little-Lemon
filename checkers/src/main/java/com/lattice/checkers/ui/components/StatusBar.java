package com.lattice.checkers.ui.components;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Faction;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.model.Side;
import com.lattice.checkers.score.ScoreEvent;
import javafx.animation.FadeTransition;
import javafx.geometry.Pos;
import javafx.scene.Node;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.VBox;
import javafx.util.Duration;
import java.util.List;
import java.util.function.Consumer;

/**
 * Compact bottom HUD: turn, last move, score event, combo, controls.
 */
public final class StatusBar extends HBox {

    private final GameController controller;
    private final HBox playerRow;
    private final Label playerName;
    private final Label turnBadge;
    private final Label lastMove;
    private final Label eventBanner;
    private final Label eventPoints;
    private final Label comboLabel;
    private final VBox playerBox;

    public StatusBar(
            GameController controller,
            Runnable onRestart,
            Runnable onResign,
            Runnable onHint,
            Consumer<String> onNavigate,
            boolean reducedMotion
    ) {
        this.controller = controller;
        getStyleClass().add("status-bar");
        setAlignment(Pos.CENTER_LEFT);
        setSpacing(18);

        playerName = new Label();
        playerName.getStyleClass().add("status-player");
        turnBadge = new Label("YOUR TURN");
        turnBadge.getStyleClass().add("your-turn");
        playerRow = new HBox(8);
        playerRow.setAlignment(Pos.CENTER_LEFT);
        playerBox = new VBox(2, playerRow, turnBadge);
        playerBox.getStyleClass().add("status-section");

        lastMove = new Label("—");
        lastMove.getStyleClass().add("status-value");
        VBox moveBox = section("LAST MOVE", lastMove);

        eventBanner = new Label(" ");
        eventBanner.getStyleClass().add("score-banner");
        eventPoints = new Label(" ");
        eventPoints.getStyleClass().add("score-points");
        VBox eventBox = section("SCORE EVENT", new VBox(eventBanner, eventPoints));

        comboLabel = new Label("0 JUMP");
        comboLabel.getStyleClass().add("status-value");
        VBox comboBox = section("BEST COMBO", comboLabel);

        Button hint = barButton("HINT", onHint);
        Button restart = barButton("RESTART", onRestart);
        Button resign = barButton("RESIGN", onResign);
        Button menu = barButton("MENU", () -> {
            if (onNavigate != null) {
                onNavigate.accept("home");
            }
        });
        HBox controls = new HBox(8, hint, restart, resign, menu);
        controls.setAlignment(Pos.CENTER_RIGHT);
        HBox.setHgrow(controls, Priority.ALWAYS);

        getChildren().addAll(playerBox, moveBox, eventBox, comboBox, controls);
        refresh(reducedMotion);
    }

    public void refresh(boolean reducedMotion) {
        controller.state().ifPresent(state -> {
            Faction faction = Faction.of(state.sideToMove());
            playerBox.getStyleClass().setAll("status-section",
                    faction == Faction.FROG ? "status-frog" : "status-traffic");
            playerRow.getChildren().setAll(
                    new PieceView(new Piece(faction.side(), PieceRank.MAN), 11),
                    playerName
            );
            playerName.setText(faction.displayName() + "  ·  " + faction.playerLabel());
            turnBadge.setText(state.status().isTerminal() ? "MATCH OVER" : "YOUR TURN");
        });

        List<Move> log = controller.moveLog();
        if (log.isEmpty()) {
            lastMove.setText("—");
        } else {
            Move move = log.get(log.size() - 1);
            lastMove.setText(coord(move.from()) + "  →  " + coord(move.to()));
        }

        var last = controller.scoreState().lastEvent();
        if (last.isPresent()) {
            ScoreEvent event = last.get();
            eventBanner.setText(event.banner());
            eventPoints.setText("+" + event.points());
            if (!reducedMotion) {
                FadeTransition fade = new FadeTransition(Duration.millis(700), eventBanner);
                fade.setFromValue(0.35);
                fade.setToValue(1);
                fade.play();
            }
        } else {
            eventBanner.setText(" ");
            eventPoints.setText(" ");
        }

        int best = Math.max(
                controller.scoreState().bestCombo(Side.DARK),
                controller.scoreState().bestCombo(Side.LIGHT));
        comboLabel.setText(best + " JUMP");
    }

    private static VBox section(String title, Node value) {
        Label caption = new Label(title);
        caption.getStyleClass().add("hud-caption");
        VBox box = new VBox(2, caption, value);
        box.getStyleClass().add("status-section");
        return box;
    }

    private static Button barButton(String text, Runnable action) {
        Button button = new Button(text);
        button.getStyleClass().add("bar-button");
        button.setOnAction(e -> action.run());
        return button;
    }

    private static String coord(Position p) {
        return "" + (char) ('A' + p.col()) + (8 - p.row());
    }
}
