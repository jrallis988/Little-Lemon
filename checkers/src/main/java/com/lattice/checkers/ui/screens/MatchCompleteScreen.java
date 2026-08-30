package com.lattice.checkers.ui.screens;

import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;

/**
 * Post-match result stub.
 */
public final class MatchCompleteScreen {

    private final VBox root;

    public MatchCompleteScreen() {
        HBox stats = new HBox(12,
                ScreenStub.panel("Result", "Dark wins · Light resigns · No moves"),
                ScreenStub.panel("Captures", "Derived from the recorded game history"),
                ScreenStub.panel("Kings", "Promotions counted from real plies")
        );

        VBox body = new VBox(16,
                stats,
                ScreenStub.panel("Next", "Open Match Analysis · Rematch · Home")
        );

        root = ScreenStub.page(
                "Match Complete",
                "Result summary and basic statistics after a finished game.",
                "Phases 6 / 10",
                body
        );
    }

    public VBox getRoot() {
        return root;
    }

    public static String screenId() {
        return "match-complete";
    }

    public static String displayName() {
        return "Match Complete";
    }
}
