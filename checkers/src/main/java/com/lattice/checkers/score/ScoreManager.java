package com.lattice.checkers.score;

import com.lattice.checkers.model.Side;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Interprets legitimate checkers events into arcade score.
 * Does not decide the match winner.
 */
public final class ScoreManager {

    private final ScoreTable table;
    private final ScoreState state = new ScoreState();
    private Side comboSide;
    private int turnCombo;

    public ScoreManager() {
        this(ScoreTable.standard());
    }

    public ScoreManager(ScoreTable table) {
        this.table = Objects.requireNonNull(table);
    }

    public ScoreTable table() {
        return table;
    }

    public ScoreState state() {
        return state;
    }

    public void reset() {
        state.reset();
        comboSide = null;
        turnCombo = 0;
    }

    /**
     * Record one applied ply. {@code captures} / {@code kingCaptures} come from the engine move.
     * Continuation jumps stay on the same combo until {@code turnComplete} is true.
     */
    public List<ScoreEvent> recordPly(
            Side side,
            int manCaptures,
            int kingCaptures,
            boolean promoted,
            boolean turnComplete,
            boolean matchWon
    ) {
        List<ScoreEvent> events = new ArrayList<>();
        if (comboSide != side) {
            turnCombo = 0;
            comboSide = side;
        }

        int captures = manCaptures + kingCaptures;
        if (captures > 0) {
            for (int i = 0; i < kingCaptures; i++) {
                turnCombo++;
                int points = table.kingCapture();
                if (turnCombo > 1) {
                    points += table.extraJumpBonus();
                }
                state.addScore(side, points);
                state.addCaptures(side, 1);
                ScoreEventType type = turnCombo > 1 ? ScoreEventType.MULTI_JUMP : ScoreEventType.KING_CAPTURE;
                ScoreEvent event = new ScoreEvent(side, type, points, comboBanner(turnCombo, true), turnCombo);
                state.setLastEvent(event);
                events.add(event);
            }
            for (int i = 0; i < manCaptures; i++) {
                turnCombo++;
                int points = table.capture();
                if (turnCombo > 1) {
                    points += table.extraJumpBonus();
                }
                state.addScore(side, points);
                state.addCaptures(side, 1);
                ScoreEventType type = turnCombo > 1 ? ScoreEventType.MULTI_JUMP : ScoreEventType.CAPTURE;
                ScoreEvent event = new ScoreEvent(side, type, points, comboBanner(turnCombo, false), turnCombo);
                state.setLastEvent(event);
                events.add(event);
            }
            state.noteBestCombo(side, turnCombo);
            state.setCurrentCombo(turnCombo);
        }

        if (promoted) {
            state.addScore(side, table.kingPromotion());
            state.addKing(side);
            ScoreEvent event = new ScoreEvent(
                    side, ScoreEventType.KING_PROMOTION, table.kingPromotion(), "KING!", 0);
            state.setLastEvent(event);
            events.add(event);
        }

        if (turnComplete) {
            state.addMove(side);
            turnCombo = 0;
            comboSide = null;
            state.setCurrentCombo(0);
        }

        if (matchWon) {
            state.addScore(side, table.matchWin());
            ScoreEvent event = new ScoreEvent(
                    side, ScoreEventType.MATCH_WIN, table.matchWin(), "CROSS COMPLETE!", 0);
            state.setLastEvent(event);
            events.add(event);
        }

        return List.copyOf(events);
    }

    private static String comboBanner(int combo, boolean kingCapture) {
        if (combo >= 3) {
            return "TRIPLE JUMP!";
        }
        if (combo == 2) {
            return "DOUBLE JUMP!";
        }
        return kingCapture ? "KING CAPTURE!" : "JUMP!";
    }
}
