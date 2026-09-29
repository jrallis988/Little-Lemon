package com.lattice.checkers.analysis;

import com.lattice.checkers.ai.AIDifficulty;
import com.lattice.checkers.ai.EvaluationFunction;
import com.lattice.checkers.history.GameHistory;
import com.lattice.checkers.history.MoveRecord;
import com.lattice.checkers.model.Side;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Detects notable moments from recorded history: first capture, promotions,
 * and the largest evaluation swing.
 */
public final class TurningPointDetector {

    private final EvaluationFunction evaluationFunction;

    public TurningPointDetector() {
        this(new EvaluationFunction(AIDifficulty.MEDIUM));
    }

    public TurningPointDetector(EvaluationFunction evaluationFunction) {
        this.evaluationFunction = Objects.requireNonNull(evaluationFunction);
    }

    public Optional<MoveRecord> firstCapture(GameHistory history) {
        Objects.requireNonNull(history);
        return history.records().stream()
                .filter(record -> record.captureCount() > 0)
                .findFirst();
    }

    public List<MoveRecord> promotions(GameHistory history) {
        Objects.requireNonNull(history);
        List<MoveRecord> promotions = new ArrayList<>();
        for (MoveRecord record : history.records()) {
            if (record.promoted()) {
                promotions.add(record);
            }
        }
        return List.copyOf(promotions);
    }

    public Optional<MoveRecord> primaryTurningPoint(GameHistory history) {
        Objects.requireNonNull(history);
        if (history.size() == 0) {
            return Optional.empty();
        }
        double previous = evaluationFunction.evaluate(history.reconstruct(0), Side.DARK);
        MoveRecord best = null;
        double bestAbs = -1;
        for (MoveRecord record : history.records()) {
            double now = evaluationFunction.evaluate(
                    history.reconstruct(record.plyIndex() + 1), Side.DARK);
            double swing = Math.abs(now - previous);
            if (swing > bestAbs) {
                bestAbs = swing;
                best = record;
            }
            previous = now;
        }
        if (bestAbs <= 0) {
            return firstCapture(history).or(() -> Optional.of(history.records().getLast()));
        }
        return Optional.ofNullable(best);
    }
}
