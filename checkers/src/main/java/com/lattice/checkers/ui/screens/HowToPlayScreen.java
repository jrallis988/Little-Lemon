package com.lattice.checkers.ui.screens;

import com.lattice.checkers.ui.components.HowToPlayOverlay;
import javafx.scene.layout.StackPane;
import java.util.function.Consumer;

/**
 * Standalone How to Play destination for the gallery and chrome.
 */
public final class HowToPlayScreen {

    private final StackPane root;

    public HowToPlayScreen() {
        this(null, true);
    }

    public HowToPlayScreen(Consumer<String> onNavigate, boolean reducedMotion) {
        HowToPlayOverlay overlay = new HowToPlayOverlay(() -> {
            if (onNavigate != null) {
                onNavigate.accept("home");
            }
        }, reducedMotion);
        root = new StackPane(overlay);
        root.getStyleClass().addAll("screen-root", "arcade-root");
        overlay.show();
    }

    public StackPane getRoot() {
        return root;
    }

    public static String screenId() {
        return "how-to-play";
    }

    public static String displayName() {
        return "How to Play";
    }
}
