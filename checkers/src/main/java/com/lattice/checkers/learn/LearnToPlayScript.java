package com.lattice.checkers.learn;

import java.util.List;

/**
 * Scaffolding for a future guided tutorial. Does not run, mutate GameState,
 * or change legal moves. How to Play remains the player-facing help.
 */
public final class LearnToPlayScript {

    private LearnToPlayScript() {
    }

    public static List<LearnToPlayStep> steps() {
        return List.of(LearnToPlayStep.values());
    }

    public static String prompt(LearnToPlayStep step) {
        return switch (step) {
            case SELECT_PIECE -> "Select one of your pieces.";
            case MAKE_LEGAL_MOVE -> "Move it one square diagonally forward.";
            case MAKE_CAPTURE -> "Jump over an opposing piece.";
            case COMPLETE_MULTI_JUMP -> "Keep jumping with the same piece while another capture is available.";
            case BECOME_KING -> "Reach the far row to become a King.";
        };
    }
}
