package com.lattice.checkers.score;

import com.lattice.checkers.model.Side;

/**
 * One scored action. {@code banner} is UI copy such as {@code JUMP!} or {@code DOUBLE JUMP!}.
 */
public record ScoreEvent(
        Side side,
        ScoreEventType type,
        int points,
        String banner,
        int comboLength
) {
}
