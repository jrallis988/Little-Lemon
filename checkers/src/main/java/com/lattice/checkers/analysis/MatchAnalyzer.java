package com.lattice.checkers.analysis;

import com.lattice.checkers.history.GameHistory;
import com.lattice.checkers.history.MoveRecord;
import com.lattice.checkers.model.Side;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Post-match analytics. Every statistic is computed from {@link GameHistory}.
 */
public final class MatchAnalyzer {

    private final TurningPointDetector turningPointDetector;

    public MatchAnalyzer() {
        this(new TurningPointDetector());
    }

    public MatchAnalyzer(TurningPointDetector turningPointDetector) {
        this.turningPointDetector = Objects.requireNonNull(turningPointDetector);
    }

    public MatchReport analyze(GameHistory history) {
        Objects.requireNonNull(history);
        int capturesDark = 0;
        int capturesLight = 0;
        int kingsDark = 0;
        int kingsLight = 0;
        for (MoveRecord record : history.records()) {
            if (record.side() == Side.DARK) {
                capturesDark += record.captureCount();
                if (record.promoted()) {
                    kingsDark++;
                }
            } else {
                capturesLight += record.captureCount();
                if (record.promoted()) {
                    kingsLight++;
                }
            }
        }
        Optional<MoveRecord> turningPoint = turningPointDetector.primaryTurningPoint(history);
        Optional<MoveRecord> firstCapture = turningPointDetector.firstCapture(history);
        return new MatchReport(
                history.size(),
                capturesDark,
                capturesLight,
                kingsDark,
                kingsLight,
                firstCapture,
                turningPoint,
                turningPointDetector.promotions(history)
        );
    }

    public List<MoveAnalysis> moveAnalyses(GameHistory history) {
        Objects.requireNonNull(history);
        Optional<MoveRecord> firstCapture = turningPointDetector.firstCapture(history);
        Optional<MoveRecord> turningPoint = turningPointDetector.primaryTurningPoint(history);
        List<MoveAnalysis> analyses = new ArrayList<>();
        for (MoveRecord record : history.records()) {
            List<String> tags = new ArrayList<>();
            if (record.captureCount() > 0) {
                tags.add("CAPTURE");
            }
            if (record.promoted()) {
                tags.add("PROMOTION");
            }
            if (firstCapture.isPresent() && firstCapture.get().plyIndex() == record.plyIndex()) {
                tags.add("FIRST_CAPTURE");
            }
            if (turningPoint.isPresent() && turningPoint.get().plyIndex() == record.plyIndex()) {
                tags.add("TURNING_POINT");
            }
            analyses.add(new MoveAnalysis(record, Optional.empty(), List.of(), tags));
        }
        return List.copyOf(analyses);
    }

    public TurningPointDetector turningPointDetector() {
        return turningPointDetector;
    }

    public record MatchReport(
            int totalMoves,
            int capturesDark,
            int capturesLight,
            int kingsDark,
            int kingsLight,
            Optional<MoveRecord> firstCapture,
            Optional<MoveRecord> turningPoint,
            List<MoveRecord> promotions
    ) {
        public MatchReport {
            firstCapture = firstCapture == null ? Optional.empty() : firstCapture;
            turningPoint = turningPoint == null ? Optional.empty() : turningPoint;
            promotions = promotions == null ? List.of() : List.copyOf(promotions);
        }
    }
}
