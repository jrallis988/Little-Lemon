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
import javafx.animation.ScaleTransition;
import javafx.geometry.Pos;
import javafx.scene.Node;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.Region;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
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
    private final Circle turnLamp;
    private final Label lastMove;
    private final Label eventBanner;
    private final Label eventPoints;
    private final Label comboLabel;
    private final VBox playerBox;
    private String lastBanner = "";

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
        setSpacing(16);

        Label currentCaption = caption("CURRENT PLAYER");
        playerName = new Label();
        playerName.getStyleClass().add("status-player");
        turnBadge = new Label("YOUR TURN");
        turnBadge.getStyleClass().add("your-turn");
        turnLamp = new Circle(5);
        turnLamp.getStyleClass().add("turn-lamp");
        HBox turnRow = new HBox(6, turnLamp, turnBadge);
        turnRow.setAlignment(Pos.CENTER_LEFT);
        playerRow = new HBox(8);
        playerRow.setAlignment(Pos.CENTER_LEFT);
        playerBox = new VBox(2, currentCaption, playerRow, turnRow);
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

        HBox controls = new HBox(8,
                barButton("HINT", ArcadeIcons.hint(), onHint),
                barButton("RESTART", ArcadeIcons.restart(), onRestart),
                barButton("RESIGN", ArcadeIcons.resign(), onResign),
                barButton("MENU", ArcadeIcons.menu(), () -> {
                    if (onNavigate != null) {
                        onNavigate.accept("home");
                    }
                })
        );
        controls.setAlignment(Pos.CENTER_RIGHT);
        Region spacer = new Region();
        HBox.setHgrow(spacer, Priority.ALWAYS);

        getChildren().addAll(playerBox, moveBox, eventBox, comboBox, spacer, controls);
        refresh(reducedMotion);
    }

    public void refresh(boolean reducedMotion) {
        controller.state().ifPresent(state -> {
            Faction faction = Faction.of(state.sideToMove());
            playerBox.getStyleClass().setAll("status-section",
                    faction == Faction.FROG ? "status-frog" : "status-traffic");
            playerRow.getChildren().setAll(
                    new PieceView(new Piece(faction.side(), PieceRank.MAN), 12),
                    playerName
            );
            playerName.setText(faction.displayName() + "  (" + faction.playerLabel() + ")");
            boolean over = state.status().isTerminal();
            turnBadge.setText(over ? "MATCH OVER" : "YOUR TURN");
            turnLamp.setFill(over
                    ? Color.web("#7E8798")
                    : faction == Faction.FROG ? Color.web("#7CDE3A") : Color.web("#F4A024"));
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
            if (!reducedMotion && !event.banner().equals(lastBanner)) {
                playEventPulse(eventBanner);
                playEventPulse(eventPoints);
            }
            lastBanner = event.banner();
        } else {
            eventBanner.setText(" ");
            eventPoints.setText(" ");
            lastBanner = "";
        }

        int best = Math.max(
                controller.scoreState().bestCombo(Side.DARK),
                controller.scoreState().bestCombo(Side.LIGHT));
        comboLabel.setText(best <= 0 ? "—" : best + " JUMP");
    }

    private static void playEventPulse(Node node) {
        FadeTransition fade = new FadeTransition(Duration.millis(420), node);
        fade.setFromValue(0.25);
        fade.setToValue(1);
        ScaleTransition scale = new ScaleTransition(Duration.millis(280), node);
        scale.setFromX(0.88);
        scale.setFromY(0.88);
        scale.setToX(1.06);
        scale.setToY(1.06);
        scale.setAutoReverse(true);
        scale.setCycleCount(2);
        fade.play();
        scale.play();
    }

    private static VBox section(String title, Node value) {
        VBox box = new VBox(2, caption(title), value);
        box.getStyleClass().add("status-section");
        return box;
    }

    private static Label caption(String text) {
        Label caption = new Label(text);
        caption.getStyleClass().add("hud-caption");
        return caption;
    }

    private static Button barButton(String text, Node icon, Runnable action) {
        Label label = new Label(text);
        label.getStyleClass().add("bar-button-label");
        VBox graphic = new VBox(4, icon, label);
        graphic.setAlignment(Pos.CENTER);
        graphic.setPrefWidth(52);
        Button button = new Button();
        button.setGraphic(graphic);
        button.getStyleClass().add("bar-button");
        button.setOnAction(e -> action.run());
        return button;
    }

    private static String coord(Position p) {
        return "" + (char) ('A' + p.col()) + (8 - p.row());
    }
}
