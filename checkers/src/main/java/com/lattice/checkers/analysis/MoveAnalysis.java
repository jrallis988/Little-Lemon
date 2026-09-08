package com.lattice.checkers.analysis;

import com.lattice.checkers.history.MoveRecord;
import com.lattice.checkers.model.Move;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Per-move analysis derived from history and evaluation — never fabricated.
 *
 * @param record              recorded ply
 * @param evaluationDelta     change in evaluation after the move, if available
 * @param missedOpportunities alternate strong moves the player skipped
 * @param tags                qualitative tags (e.g. FIRST_CAPTURE) from detectors
 */
public record MoveAnalysis(
        MoveRecord record,
        Optional<Double> evaluationDelta,
        List<Move> missedOpportunities,
        List<String> tags
) {
    public MoveAnalysis {
        Objects.requireNonNull(record, "record");
        Objects.requireNonNull(evaluationDelta, "evaluationDelta");
        Objects.requireNonNull(missedOpportunities, "missedOpportunities");
        Objects.requireNonNull(tags, "tags");
        missedOpportunities = List.copyOf(missedOpportunities);
        tags = List.copyOf(tags);
    }
}
