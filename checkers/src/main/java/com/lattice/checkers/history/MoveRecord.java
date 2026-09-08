package com.lattice.checkers.history;

import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Side;
import java.util.Objects;

/**
 * One recorded ply with enough metadata for analysis and UI timelines.
 *
 * @param plyIndex     zero-based ply number
 * @param side         side that moved
 * @param move         applied move
 * @param notation     display notation (filled in later phases)
 * @param captureCount pieces captured on this ply
 * @param promoted     whether the moving piece became a king
 * @param after        position after the move
 */
public record MoveRecord(
        int plyIndex,
        Side side,
        Move move,
        String notation,
        int captureCount,
        boolean promoted,
        BoardSnapshot after
) {
    public MoveRecord {
        Objects.requireNonNull(side, "side");
        Objects.requireNonNull(move, "move");
        Objects.requireNonNull(notation, "notation");
        Objects.requireNonNull(after, "after");
        if (plyIndex < 0) {
            throw new IllegalArgumentException("plyIndex must be >= 0");
        }
        if (captureCount < 0) {
            throw new IllegalArgumentException("captureCount must be >= 0");
        }
    }
}
