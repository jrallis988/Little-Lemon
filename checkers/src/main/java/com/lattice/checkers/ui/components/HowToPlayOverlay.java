package com.lattice.checkers.ui.components;

import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.StackPane;

/**
 * Modal How to Play overlay. Blocks the screen underneath without touching GameState.
 */
public final class HowToPlayOverlay extends StackPane {

    private final Runnable onClosed;
    private final boolean reducedMotion;
    private HowToPlayPanel panel;

    public HowToPlayOverlay(Runnable onClosed, boolean reducedMotion) {
        this.onClosed = onClosed;
        this.reducedMotion = reducedMotion;
        getStyleClass().add("how-to-play-overlay");
        setAlignment(Pos.CENTER);
        setVisible(false);
        setManaged(false);
        setPickOnBounds(true);
        setMaxSize(Double.MAX_VALUE, Double.MAX_VALUE);
        setOnMouseClicked(e -> {
            if (e.getTarget() == this) {
                hide();
            }
        });
        setOnKeyPressed(e -> {
            if (e.getCode() == KeyCode.ESCAPE) {
                hide();
            }
            e.consume();
        });
        setFocusTraversable(true);
    }

    public void show() {
        if (panel != null) {
            panel.dispose();
            getChildren().clear();
        }
        panel = new HowToPlayPanel(this::hide, reducedMotion);
        getChildren().setAll(panel);
        setVisible(true);
        setManaged(true);
        toFront();
        requestFocus();
    }

    public void hide() {
        if (panel != null) {
            panel.dispose();
            panel = null;
        }
        getChildren().clear();
        boolean wasShowing = isVisible();
        setVisible(false);
        setManaged(false);
        if (wasShowing && onClosed != null) {
            onClosed.run();
        }
    }

    public boolean isShowing() {
        return isVisible();
    }

    public static Button openButton(Runnable onOpen) {
        Button button = new Button("?  HOW TO PLAY");
        button.getStyleClass().add("how-to-play-button");
        button.setOnAction(e -> onOpen.run());
        return button;
    }
}
