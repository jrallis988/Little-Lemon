package com.lattice.checkers.ui.screens;

import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;

/**
 * AI vs AI simulation lab stub.
 */
public final class AiLabScreen {

    private final VBox root;

    public AiLabScreen() {
        HBox matchup = new HBox(12,
                ScreenStub.panel("Left profile", "AGGRESSOR — captures & pressure"),
                ScreenStub.panel("Right profile", "STRATEGIST — position & mobility")
        );

        VBox telemetry = ScreenStub.panel(
                "Live engine feed",
                "Move · Evaluation · Search depth · Positions evaluated · Decision time"
        );

        VBox body = new VBox(16,
                matchup,
                telemetry,
                ScreenStub.chipRow("Watch", "Pause", "Step")
        );

        root = ScreenStub.page(
                "AI Lab",
                "Watch two AI profiles play each other and inspect search telemetry.",
                "Phase 12",
                body
        );
    }

    public VBox getRoot() {
        return root;
    }

    public static String screenId() {
        return "ai-lab";
    }

    public static String displayName() {
        return "AI Lab";
    }
}
