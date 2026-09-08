package com.lattice.checkers.engine;

import com.lattice.checkers.model.Side;

/**
 * Read-only engine snapshot for Developer Mode. Values must come from live state.
 *
 * @param sideToMove         current player
 * @param legalMoveCount     number of legal moves
 * @param captureCount       number of available capturing moves
 * @param forcedCapture      whether captures are mandatory this turn
 * @param selectedMoveLabel  human-readable selected move, or empty
 */
public record EngineDiagnostics(
        Side sideToMove,
        int legalMoveCount,
        int captureCount,
        boolean forcedCapture,
        String selectedMoveLabel
) {
}
