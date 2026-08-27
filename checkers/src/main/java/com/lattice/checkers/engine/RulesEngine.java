package com.lattice.checkers.engine;

import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Side;
import java.util.List;

/**
 * Public façade for American checkers rules.
 *
 * <p>UI and AI must go through this type (or {@link MoveGenerator}) rather than
 * embedding rule logic in JavaFX controllers.
 *
 * <p>Phase 1: contract only.
 */
public final class RulesEngine {

    private final MoveGenerator moveGenerator;
    private final CaptureDetector captureDetector;
    private final MoveValidator moveValidator;

    public RulesEngine() {
        this.captureDetector = new CaptureDetector();
        this.moveGenerator = new MoveGenerator(captureDetector);
        this.moveValidator = new MoveValidator(moveGenerator);
    }

    public List<Move> legalMoves(GameState state) {
        throw new UnsupportedOperationException("Phase 3: legal move generation");
    }

    public List<Move> legalMoves(GameState state, Side side) {
        throw new UnsupportedOperationException("Phase 3: legal move generation for side");
    }

    public boolean isLegal(GameState state, Move move) {
        throw new UnsupportedOperationException("Phase 3: move validation");
    }

    public GameState apply(GameState state, Move move) {
        throw new UnsupportedOperationException("Phase 3: apply move");
    }

    public boolean hasForcedCapture(GameState state) {
        throw new UnsupportedOperationException("Phase 3: mandatory capture detection");
    }

    public EngineDiagnostics diagnostics(GameState state) {
        throw new UnsupportedOperationException("Phase 11: engine diagnostics");
    }

    MoveGenerator moveGenerator() {
        return moveGenerator;
    }

    CaptureDetector captureDetector() {
        return captureDetector;
    }

    MoveValidator moveValidator() {
        return moveValidator;
    }
}
