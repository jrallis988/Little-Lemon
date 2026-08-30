package com.lattice.checkers.ui.screens;

import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;

/**
 * Match analysis, timeline, and What If? stub.
 */
public final class MatchAnalysisScreen {

    private final VBox root;

    public MatchAnalysisScreen() {
        VBox timeline = ScreenStub.panel(
                "Replay timeline",
                "Step backward and forward through BoardSnapshots. Events: first capture, promotions, turning points."
        );

        HBox lower = new HBox(12,
                ScreenStub.panel("Turning point", "Largest evaluation swing from real data"),
                ScreenStub.panel("What If?", "Branch from a ply without overwriting history")
        );

        VBox body = new VBox(16, timeline, lower);
        root = ScreenStub.page(
                "Match Analysis",
                "Inspect how the match unfolded — every statistic comes from recorded state.",
                "Phases 9–10",
                body
        );
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
}
